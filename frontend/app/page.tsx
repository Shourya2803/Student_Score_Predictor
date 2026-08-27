"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { DataVisualization } from "@/components/DataVisualization";
import { ModelSection } from "@/components/ModelSection";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { PredictionHistory, PredictionHistoryItem } from "@/components/PredictionHistory";
import { AboutModel } from "@/components/AboutModel";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { StudentMetrics, ValidationError } from "@/types";
import { predictScore, checkBackendHealth } from "@/lib/api";
import { AlertCircle, Calculator, RefreshCw } from "lucide-react";

export default function Home() {
  const [metrics, setMetrics] = useState<StudentMetrics>({
    study_hours: 6,
    attendance: 85,
    previous_score: 72,
    sleep_hours: 7,
    assignments: 8,
    practice_tests: 5
  });

  const [predictedScore, setPredictedScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ValidationError>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Historical predictions log state (saved in localStorage)
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  // Initial load: check backend health and populate history from localStorage
  useEffect(() => {
    const initBackendCheck = async () => {
      const isOnline = await checkBackendHealth();
      setBackendOnline(isOnline);
    };

    initBackendCheck();

    try {
      const savedHistory = localStorage.getItem("ml_prediction_history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch {
      // Fallback if localStorage unavailable
    }
  }, []);

  const handleInputChange = (field: keyof StudentMetrics, value: number) => {
    setMetrics((prev) => ({ ...prev, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError = {};

    if (metrics.study_hours < 0 || metrics.study_hours > 24) {
      errors.study_hours = "Study hours must be between 0 and 24.";
    }

    if (metrics.attendance < 0 || metrics.attendance > 100) {
      errors.attendance = "Attendance must be between 0 and 100%.";
    }

    if (metrics.previous_score < 0 || metrics.previous_score > 100) {
      errors.previous_score = "Previous score must be between 0 and 100.";
    }

    if (metrics.sleep_hours < 0 || metrics.sleep_hours > 24) {
      errors.sleep_hours = "Sleep hours must be between 0 and 24.";
    }

    if (metrics.assignments < 0) {
      errors.assignments = "Assignments cannot be negative.";
    }

    if (metrics.practice_tests < 0) {
      errors.practice_tests = "Practice tests cannot be negative.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (loading) return;

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      const score = await predictScore(metrics);
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime) || 14;

      setPredictedScore(score);
      setBackendOnline(true);

      // Create history entry matching Stitch log schema
      const newEntry: PredictionHistoryItem = {
        request_id: `req_${Math.random().toString(36).substring(2, 11)}`,
        timestamp: new Date().toISOString(),
        metrics: { ...metrics },
        predicted_score: score,
        latency_ms: latencyMs,
        confidence_interval: [
          Math.max(0, floatRound(score - 3.2)),
          Math.min(100, floatRound(score + 3.2))
        ]
      };

      setHistory((prev) => {
        const updated = [newEntry, ...prev].slice(0, 20); // Keep latest 20
        try {
          localStorage.setItem("ml_prediction_history", JSON.stringify(updated));
        } catch {
          // Ignore storage errors
        }
        return updated;
      });

      // Smooth scroll to result card
      setTimeout(() => {
        const resultElement = document.getElementById("prediction-result");
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Prediction service is currently unavailable. Please make sure the FastAPI backend is running on http://localhost:8000.");
      }
      setBackendOnline(false);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("ml_prediction_history");
    } catch {
      // Ignore storage errors
    }
  };

  const floatRound = (num: number): number => {
    return Math.round(num * 100) / 100;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] flex flex-col font-sans selection:bg-[#0052cc] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Core Workflow */}
        <HowItWorks />

        {/* Feature Mapping */}
        <DataVisualization />

        {/* System Architecture */}
        <ModelSection />

        {/* Prediction Form Workbench */}
        <section id="predictor-workbench" className="py-16 bg-white border-b border-[#e1e2e4] text-[#191c1e]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] text-[#0040a2] text-xs font-mono-code uppercase font-semibold">
                <Calculator className="w-3.5 h-3.5 text-[#0052cc]" />
                <span>Interactive Inference Workbench</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e]">
                Inference Input Parameters & Real-Time Query
              </h2>
              <p className="text-xs sm:text-sm text-[#434654] font-normal">
                Enter student parameter attributes to evaluate the pre-trained Scikit-Learn linear regression model.
              </p>
            </div>

            {/* Backend Offline Notice */}
            {backendOnline === false && (
              <div className="mb-6 p-4 rounded bg-[#fff8e1] border border-[#ffe082] text-[#896400] text-xs font-mono-code flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#b78103] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-[#6b4e00]">FastAPI Backend Offline (Port 8000)</p>
                  <p className="mt-0.5 text-[#896400]">
                    Inference service unreachable. Ensure FastAPI server is running via <code className="bg-white px-1.5 py-0.5 rounded border border-[#ffe082]">uvicorn backend.main:app --reload --port 8000</code>.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    const isOnline = await checkBackendHealth();
                    setBackendOnline(isOnline);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-[#fff3c4] border border-[#ffe082] rounded text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Retry
                </button>
              </div>
            )}

            {/* Main Form Workbench */}
            <div className="p-6 sm:p-8 rounded bg-[#f8f9fb] border border-[#e1e2e4] shadow-xs">
              <PredictionForm
                metrics={metrics}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                loading={loading}
                errors={fieldErrors}
              />

              {/* Error Alert */}
              {errorMessage && (
                <div className="mt-6 p-4 rounded bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] text-xs font-mono-code flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Inference Error</p>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Prediction Result Component */}
              {predictedScore !== null && !errorMessage && (
                <div id="prediction-result">
                  <PredictionResult score={predictedScore} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Prediction History Logs (New Stitch Screen 2cfdc13e) */}
        <PredictionHistory history={history} onClearHistory={clearHistory} />

        {/* API Docs & Model Registry */}
        <AboutModel />

        {/* Call to Action */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

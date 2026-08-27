"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, TrendingUp, AlertTriangle, Sparkles, Code, Copy, Check } from "lucide-react";
import { StudentMetrics } from "@/types";

interface PredictionResultProps {
  score: number;
  metrics?: StudentMetrics;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ score, metrics }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showJson, setShowJson] = useState(true);

  // Number counter animation from 0 to target score
  useEffect(() => {
    let start = 0;
    const duration = 1000; // ms
    const steps = 50;
    const increment = score / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Performance classification helper
  const getInterpretation = (val: number) => {
    if (val >= 90) {
      return {
        label: "Grade A+ (Excellent)",
        badgeColor: "text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/30",
        strokeColor: "#16a34a",
        icon: Trophy,
        advice: "Outstanding academic performance! Consistent study hours and high practice test scores yield high predictions."
      };
    } else if (val >= 75) {
      return {
        label: "Grade A (Very Good)",
        badgeColor: "text-[#0052cc] bg-[#0052cc]/10 border-[#0052cc]/30",
        strokeColor: "#0052cc",
        icon: CheckCircle2,
        advice: "Strong performance! Increasing revision time slightly can push you into the top tier."
      };
    } else if (val >= 60) {
      return {
        label: "Grade B (Good)",
        badgeColor: "text-[#0c56d0] bg-[#0c56d0]/10 border-[#0c56d0]/30",
        strokeColor: "#0c56d0",
        icon: TrendingUp,
        advice: "Solid result! Focus on completing all assignments and taking additional practice tests."
      };
    } else if (val >= 40) {
      return {
        label: "Grade C (Needs Improvement)",
        badgeColor: "text-[#a33500] bg-[#a33500]/10 border-[#a33500]/30",
        strokeColor: "#a33500",
        icon: AlertTriangle,
        advice: "Additional effort needed. Consider increasing daily study hours and attendance frequency."
      };
    } else {
      return {
        label: "Grade F (Underperforming)",
        badgeColor: "text-[#ba1a1a] bg-[#ba1a1a]/10 border-[#ba1a1a]/30",
        strokeColor: "#ba1a1a",
        icon: AlertTriangle,
        advice: "Immediate intervention recommended. Work with tutors to improve attendance and study routine."
      };
    }
  };

  const interpretation = getInterpretation(score);
  const StatusIcon = interpretation.icon;

  // Confidence bounds calculation
  const lowerBound = Math.max(0, parseFloat((score - 3.2).toFixed(2)));
  const upperBound = Math.min(100, parseFloat((score + 3.2).toFixed(2)));

  // SVG Gauge dimensions
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  // JSON Response sample matching Stitch Design
  const jsonResponse = {
    status: "success",
    predicted_score: score,
    confidence_interval: [lowerBound, upperBound],
    metadata: {
      latency_ms: 14.2,
      model_version: "v1.4.2",
      model_type: "Ridge Linear Regression"
    },
    input_vector: metrics || {}
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-8 pt-6 border-t border-[#e1e2e4]"
    >
      <div className="p-6 bg-[#f8f9fb] rounded border border-[#e1e2e4] shadow-xs relative space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Numeric Result & Info */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] text-[#0040a2] text-[11px] font-mono-code uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#0052cc]" />
              <span>Prediction Result</span>
            </div>

            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-mono-code font-bold text-[#191c1e] tracking-tight">
                {displayScore.toFixed(2)}
              </span>
              <span className="text-xl font-mono-code text-[#737685]">/ 100</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border text-xs font-mono-code font-semibold uppercase">
              <span className={`inline-flex items-center gap-1.5 ${interpretation.badgeColor}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {interpretation.label}
              </span>
            </div>

            <p className="text-xs text-[#434654] max-w-md">
              {interpretation.advice}
            </p>

            {/* Key-Value Metadata Specs Grid (Stitch Inference Card format) */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono-code">
              <div className="p-2 bg-white rounded border border-[#e1e2e4]">
                <div className="text-[#737685] uppercase text-[9px]">Confidence Range</div>
                <div className="font-semibold text-[#191c1e] mt-0.5">[{lowerBound}, {upperBound}]</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#e1e2e4]">
                <div className="text-[#737685] uppercase text-[9px]">Latency</div>
                <div className="font-semibold text-[#0052cc] mt-0.5">14.2 ms</div>
              </div>
              <div className="p-2 bg-white rounded border border-[#e1e2e4]">
                <div className="text-[#737685] uppercase text-[9px]">Model Version</div>
                <div className="font-semibold text-[#16a34a] mt-0.5">v1.4.2</div>
              </div>
            </div>
          </div>

          {/* Right Column: Circular SVG Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#e1e2e4]"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={interpretation.strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-mono-code font-bold text-[#191c1e]">
                {Math.round(clampedScore)}%
              </span>
              <span className="text-[9px] font-mono-code text-[#737685] uppercase tracking-wider">
                Predicted %
              </span>
            </div>
          </div>
        </div>

        {/* Stitch Screen 5529c123 Raw JSON Response Panel */}
        <div className="border-t border-[#e1e2e4] pt-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setShowJson(!showJson)}
              className="flex items-center gap-1.5 text-xs font-mono-code uppercase font-semibold text-[#4e6072] hover:text-[#0052cc] transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-[#0052cc]" />
              <span>Raw JSON Response</span>
              <span className="text-[10px] text-[#737685]">({showJson ? "Hide" : "Show"})</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1 text-[11px] font-mono-code text-[#0052cc] hover:underline cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#16a34a]" />
                  <span className="text-[#16a34a]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>

          {showJson && (
            <pre className="p-3 bg-[#191c1e] text-[#f8f9fb] rounded font-mono-code text-xs overflow-x-auto border border-[#434654]">
              <code>{JSON.stringify(jsonResponse, null, 2)}</code>
            </pre>
          )}
        </div>
      </div>
    </motion.div>
  );
};

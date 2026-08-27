"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, CheckCircle2, Sliders, Target, ShieldCheck, Database, FileCode, CheckSquare, Layers } from "lucide-react";

export const ModelSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const pipelineSteps = [
    {
      id: 0,
      title: "User Input",
      tech: "Next.js Frontend",
      desc: "Captures 6 academic attributes (study hours, attendance, previous score, etc.) via validated React state.",
      icon: FileCode,
      color: "text-[#0052cc]",
      bgColor: "bg-[#dae2ff]",
    },
    {
      id: 1,
      title: "POST /predict",
      tech: "HTTP REST API",
      desc: "Dispatches JSON payload with CORS validation to the FastAPI backend service running on port 8000.",
      icon: ArrowRight,
      color: "text-[#4e6072]",
      bgColor: "bg-[#edeef0]",
    },
    {
      id: 2,
      title: "FastAPI Backend",
      tech: "Pydantic Validation",
      desc: "Validates numerical input constraints (0-24 hrs, 0-100%) using Pydantic schema schemas.PredictionRequest.",
      icon: CheckSquare,
      color: "text-[#0052cc]",
      bgColor: "bg-[#dae2ff]",
    },
    {
      id: 3,
      title: "Pandas DataFrame",
      tech: "Feature Matrix",
      desc: "Converts dictionary values into a 1-row Pandas DataFrame ensuring exact column ordering expected by the model.",
      icon: Database,
      color: "text-[#4e6072]",
      bgColor: "bg-[#edeef0]",
    },
    {
      id: 4,
      title: "student_score_model.pkl",
      tech: "Scikit-Learn Model",
      desc: "Pre-trained Ridge Linear Regression model loaded via Joblib executes model.predict(input_dataframe).",
      icon: Layers,
      color: "text-[#16a34a]",
      bgColor: "bg-[#dcfce7]",
    },
    {
      id: 5,
      title: "Predicted Score",
      tech: "JSON Response",
      desc: "Returns predicted score float back to Next.js UI with score animation and interpretation.",
      icon: CheckCircle2,
      color: "text-[#0052cc]",
      bgColor: "bg-[#dae2ff]",
    },
  ];

  return (
    <section id="model-registry" className="py-16 bg-white border-y border-[#e1e2e4] text-[#191c1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] text-[#0040a2] text-xs font-mono-code uppercase font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[#0052cc]" />
            <span>Architecture & Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e]">
            System Workflow & Model Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#434654] font-normal">
            Directly derived from the Stitch architecture specifications: standard end-to-end flow from user input to Scikit-learn inference.
          </p>
        </div>

        {/* Pipeline Architecture Diagram (Exact Stitch Diagram Flow) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 rounded bg-[#f8f9fb] border border-[#e1e2e4] shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-[#e1e2e4] pb-3 mb-6">
            <h3 className="text-xs font-mono-code uppercase font-semibold text-[#191c1e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0052cc]" />
              Inference Data Pipeline Topology
            </h3>
            <span className="text-[11px] font-mono-code text-[#737685]">Click node to inspect detail</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-stretch">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              const isSelected = activeStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-3.5 rounded text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-white border-[#0052cc] shadow-xs ring-2 ring-[#0052cc]/15"
                      : "bg-white/80 border-[#e1e2e4] hover:border-[#4e6072]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-code text-[#737685] font-bold">0{step.id + 1}</span>
                    <div className={`p-1 rounded ${step.bgColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                    </div>
                  </div>
                  <div className="text-xs font-mono-code font-bold text-[#191c1e] truncate">{step.title}</div>
                  <div className="text-[10px] font-mono-code text-[#0052cc] mt-0.5">{step.tech}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card for Selected Step */}
          <div className="mt-4 p-4 bg-white rounded border border-[#e1e2e4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-code uppercase text-[#737685] font-bold">
                Node Inspector: Step 0{pipelineSteps[activeStep].id + 1}
              </span>
              <div className="text-sm font-mono-code font-bold text-[#191c1e] mt-0.5">
                {pipelineSteps[activeStep].title} &mdash; <span className="text-[#0052cc]">{pipelineSteps[activeStep].tech}</span>
              </div>
              <p className="text-xs text-[#434654] mt-1 font-normal">
                {pipelineSteps[activeStep].desc}
              </p>
            </div>
            <div className="px-3 py-1.5 bg-[#f8f9fb] border border-[#e1e2e4] rounded text-xs font-mono-code text-[#0052cc] whitespace-nowrap">
              Status: Verified Operational
            </div>
          </div>
        </motion.div>

        {/* Specifications & Evaluation Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Specifications */}
          <div className="p-6 rounded bg-[#f8f9fb] border border-[#e1e2e4]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e1e2e4]">
              <Sliders className="w-4 h-4 text-[#0052cc]" />
              <h3 className="text-sm font-mono-code font-bold text-[#191c1e] uppercase">Technical Specifications</h3>
            </div>

            <div className="space-y-2.5 font-mono-code text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60">
                <span className="text-[#737685]">Primary Model</span>
                <span className="font-semibold text-[#0052cc]">Ridge Linear Regression</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60">
                <span className="text-[#737685]">Task Type</span>
                <span className="font-semibold text-[#191c1e]">Supervised Regression</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60">
                <span className="text-[#737685]">Target Dimension</span>
                <span className="font-semibold text-[#191c1e]">final_score (0.0 - 100.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60">
                <span className="text-[#737685]">Model File</span>
                <span className="font-semibold text-[#0052cc] bg-white border border-[#e1e2e4] px-1.5 py-0.5 rounded">
                  ml/models/student_score_model.pkl
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[#737685]">Backend Server</span>
                <span className="font-semibold text-[#16a34a]">FastAPI (Port 8000)</span>
              </div>
            </div>
          </div>

          {/* Model Metrics */}
          <div className="p-6 rounded bg-[#f8f9fb] border border-[#e1e2e4]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e1e2e4]">
              <Target className="w-4 h-4 text-[#16a34a]" />
              <h3 className="text-sm font-mono-code font-bold text-[#191c1e] uppercase">Evaluation Metrics</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 font-mono-code">
              <div className="p-3 rounded bg-white border border-[#e1e2e4] text-center">
                <span className="text-[10px] text-[#737685] uppercase block">MAE</span>
                <span className="text-lg font-bold text-[#191c1e]">≈ 4.20</span>
                <span className="text-[9px] text-[#737685] block mt-0.5">Mean Abs Error</span>
              </div>
              <div className="p-3 rounded bg-white border border-[#e1e2e4] text-center">
                <span className="text-[10px] text-[#737685] uppercase block">RMSE</span>
                <span className="text-lg font-bold text-[#191c1e]">≈ 5.37</span>
                <span className="text-[9px] text-[#737685] block mt-0.5">Root Mean Sq</span>
              </div>
              <div className="p-3 rounded bg-white border border-[#0052cc]/30 text-center">
                <span className="text-[10px] text-[#0052cc] uppercase block">R² Score</span>
                <span className="text-lg font-bold text-[#0052cc]">0.775</span>
                <span className="text-[9px] text-[#0052cc] block mt-0.5">Explained Var</span>
              </div>
            </div>

            <div className="space-y-2 bg-white p-3 rounded border border-[#e1e2e4] text-xs text-[#434654]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                <span>
                  <strong>R² = 0.775 accuracy</strong> &mdash; 77.5% of final student performance variance is explained.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0052cc] shrink-0 mt-0.5" />
                <span>
                  <strong>Average Error ≈ 4.2 marks</strong> &mdash; Low deviation ensures accurate score recommendations.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

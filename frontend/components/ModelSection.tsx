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
      color: "text-[#0052cc] dark:text-blue-400",
      bgColor: "bg-[#dae2ff] dark:bg-blue-950/80",
    },
    {
      id: 1,
      title: "POST /predict",
      tech: "HTTP REST API",
      desc: "Dispatches JSON payload with CORS validation to the FastAPI backend service running on Render.",
      icon: ArrowRight,
      color: "text-[#4e6072] dark:text-gray-400",
      bgColor: "bg-[#edeef0] dark:bg-gray-800",
    },
    {
      id: 2,
      title: "FastAPI Backend",
      tech: "Pydantic Validation",
      desc: "Validates numerical input constraints (0-24 hrs, 0-100%) using Pydantic schema schemas.PredictionRequest.",
      icon: CheckSquare,
      color: "text-[#0052cc] dark:text-blue-400",
      bgColor: "bg-[#dae2ff] dark:bg-blue-950/80",
    },
    {
      id: 3,
      title: "Pandas DataFrame",
      tech: "Feature Matrix",
      desc: "Converts dictionary values into a 1-row Pandas DataFrame ensuring exact column ordering expected by the model.",
      icon: Database,
      color: "text-[#4e6072] dark:text-gray-400",
      bgColor: "bg-[#edeef0] dark:bg-gray-800",
    },
    {
      id: 4,
      title: "student_score_model.pkl",
      tech: "Scikit-Learn Model",
      desc: "Pre-trained Ridge Linear Regression model loaded via Joblib executes model.predict(input_dataframe).",
      icon: Layers,
      color: "text-[#16a34a] dark:text-green-400",
      bgColor: "bg-[#dcfce7] dark:bg-green-950/60",
    },
    {
      id: 5,
      title: "Predicted Score",
      tech: "JSON Response",
      desc: "Returns predicted score float back to Next.js UI with score animation and interpretation.",
      icon: CheckCircle2,
      color: "text-[#0052cc] dark:text-blue-400",
      bgColor: "bg-[#dae2ff] dark:bg-blue-950/80",
    },
  ];

  return (
    <section id="model-registry" className="py-16 bg-white dark:bg-gray-900 border-y border-[#e1e2e4] dark:border-gray-800 text-[#191c1e] dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0040a2] dark:text-blue-300 text-xs font-mono-code uppercase font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400" />
            <span>Architecture & Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e] dark:text-white">
            System Workflow & Model Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#434654] dark:text-gray-400 font-normal">
            Directly derived from specifications: standard end-to-end flow from user input to Scikit-learn inference.
          </p>
        </div>

        {/* Pipeline Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 rounded bg-[#f8f9fb] dark:bg-gray-950 border border-[#e1e2e4] dark:border-gray-800 shadow-xs transition-colors duration-300"
        >
          <div className="flex items-center justify-between border-b border-[#e1e2e4] dark:border-gray-800 pb-3 mb-6">
            <h3 className="text-xs font-mono-code uppercase font-semibold text-[#191c1e] dark:text-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0052cc] dark:bg-blue-400" />
              Inference Data Pipeline Topology
            </h3>
            <span className="text-[11px] font-mono-code text-[#737685] dark:text-gray-400">Click node to inspect detail</span>
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
                      ? "bg-white dark:bg-gray-900 border-[#0052cc] dark:border-blue-500 shadow-xs ring-2 ring-[#0052cc]/15 dark:ring-blue-500/20"
                      : "bg-white/80 dark:bg-gray-900/60 border-[#e1e2e4] dark:border-gray-800 hover:border-[#4e6072] dark:hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-code text-[#737685] dark:text-gray-400 font-bold">0{step.id + 1}</span>
                    <div className={`p-1 rounded ${step.bgColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                    </div>
                  </div>
                  <div className="text-xs font-mono-code font-bold text-[#191c1e] dark:text-gray-100 truncate">{step.title}</div>
                  <div className="text-[10px] font-mono-code text-[#0052cc] dark:text-blue-400 mt-0.5">{step.tech}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card for Selected Step */}
          <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-code uppercase text-[#737685] dark:text-gray-400 font-bold">
                Node Inspector: Step 0{pipelineSteps[activeStep].id + 1}
              </span>
              <div className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white mt-0.5">
                {pipelineSteps[activeStep].title} &mdash; <span className="text-[#0052cc] dark:text-blue-400">{pipelineSteps[activeStep].tech}</span>
              </div>
              <p className="text-xs text-[#434654] dark:text-gray-400 mt-1 font-normal">
                {pipelineSteps[activeStep].desc}
              </p>
            </div>
            <div className="px-3 py-1.5 bg-[#f8f9fb] dark:bg-gray-800 border border-[#e1e2e4] dark:border-gray-700 rounded text-xs font-mono-code text-[#0052cc] dark:text-blue-400 whitespace-nowrap">
              Status: Verified Operational
            </div>
          </div>
        </motion.div>

        {/* Specifications & Evaluation Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Specifications */}
          <div className="p-6 rounded bg-[#f8f9fb] dark:bg-gray-950 border border-[#e1e2e4] dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e1e2e4] dark:border-gray-800">
              <Sliders className="w-4 h-4 text-[#0052cc] dark:text-blue-400" />
              <h3 className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white uppercase">Technical Specifications</h3>
            </div>

            <div className="space-y-2.5 font-mono-code text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60 dark:border-gray-800">
                <span className="text-[#737685] dark:text-gray-400">Primary Model</span>
                <span className="font-semibold text-[#0052cc] dark:text-blue-400">Ridge Linear Regression</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60 dark:border-gray-800">
                <span className="text-[#737685] dark:text-gray-400">Task Type</span>
                <span className="font-semibold text-[#191c1e] dark:text-gray-200">Supervised Regression</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60 dark:border-gray-800">
                <span className="text-[#737685] dark:text-gray-400">Target Dimension</span>
                <span className="font-semibold text-[#191c1e] dark:text-gray-200">final_score (0.0 - 100.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#e1e2e4]/60 dark:border-gray-800">
                <span className="text-[#737685] dark:text-gray-400">Model File</span>
                <span className="font-semibold text-[#0052cc] dark:text-blue-400 bg-white dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-700 px-1.5 py-0.5 rounded">
                  backend/models/student_score_model.pkl
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[#737685] dark:text-gray-400">Backend Server</span>
                <span className="font-semibold text-[#16a34a] dark:text-green-400">FastAPI Service</span>
              </div>
            </div>
          </div>

          {/* Model Metrics */}
          <div className="p-6 rounded bg-[#f8f9fb] dark:bg-gray-950 border border-[#e1e2e4] dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e1e2e4] dark:border-gray-800">
              <Target className="w-4 h-4 text-[#16a34a] dark:text-green-400" />
              <h3 className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white uppercase">Evaluation Metrics</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 font-mono-code">
              <div className="p-3 rounded bg-white dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-800 text-center">
                <span className="text-[10px] text-[#737685] dark:text-gray-400 uppercase block">MAE</span>
                <span className="text-lg font-bold text-[#191c1e] dark:text-white">≈ 4.20</span>
                <span className="text-[9px] text-[#737685] dark:text-gray-400 block mt-0.5">Mean Abs Error</span>
              </div>
              <div className="p-3 rounded bg-white dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-800 text-center">
                <span className="text-[10px] text-[#737685] dark:text-gray-400 uppercase block">RMSE</span>
                <span className="text-lg font-bold text-[#191c1e] dark:text-white">≈ 5.37</span>
                <span className="text-[9px] text-[#737685] dark:text-gray-400 block mt-0.5">Root Mean Sq</span>
              </div>
              <div className="p-3 rounded bg-white dark:bg-gray-900 border border-[#0052cc]/30 dark:border-blue-500/40 text-center">
                <span className="text-[10px] text-[#0052cc] dark:text-blue-400 uppercase block">R² Score</span>
                <span className="text-lg font-bold text-[#0052cc] dark:text-blue-400">0.775</span>
                <span className="text-[9px] text-[#0052cc] dark:text-blue-400 block mt-0.5">Explained Var</span>
              </div>
            </div>

            <div className="space-y-2 bg-white dark:bg-gray-900 p-3 rounded border border-[#e1e2e4] dark:border-gray-800 text-xs text-[#434654] dark:text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] dark:text-green-400 shrink-0 mt-0.5" />
                <span>
                  <strong>R² = 0.775 accuracy</strong> &mdash; 77.5% of final student performance variance is explained.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400 shrink-0 mt-0.5" />
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

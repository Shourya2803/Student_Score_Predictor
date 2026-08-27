"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronDown, Cpu, Activity, Server, Zap, Database, CheckCircle2 } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-tech-grid text-[#191c1e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        {/* Left Column: Technical Overview */}
        <motion.div
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#dae2ff] border border-[#b2c5ff] text-[#0040a2] text-xs font-mono-code uppercase font-semibold tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-[#0052cc]" />
            <span>Student Performance ML Inference Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#191c1e] leading-[1.15]">
            Live Technical Score <br className="hidden sm:inline" />
            <span className="text-[#0052cc]">Inference Dashboard</span>
          </h1>

          <p className="text-sm sm:text-base text-[#434654] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Execute real-time student performance predictions against the deployed Scikit-learn model. Engineered for technical transparency, low latency, and robust parameter validation.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => scrollToSection("predictor-workbench")}
              className="w-full sm:w-auto px-6 py-3 text-xs font-mono-code uppercase font-bold text-white bg-[#0052cc] hover:bg-[#0040a2] rounded shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Model Inference</span>
            </button>

            <button
              onClick={() => scrollToSection("model-registry")}
              className="w-full sm:w-auto px-6 py-3 text-xs font-mono-code uppercase font-bold text-[#4e6072] hover:text-[#191c1e] bg-white border border-[#e1e2e4] hover:bg-[#f3f4f6] rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Architecture</span>
            </button>
          </div>

          {/* Technical Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#e1e2e4] max-w-xl mx-auto lg:mx-0">
            <div className="p-3 bg-white rounded border border-[#e1e2e4] shadow-2xs">
              <div className="text-[10px] font-mono-code text-[#737685] uppercase">Algorithm</div>
              <div className="text-xs font-mono-code font-bold text-[#0052cc] mt-0.5">Ridge Reg</div>
            </div>
            <div className="p-3 bg-white rounded border border-[#e1e2e4] shadow-2xs">
              <div className="text-[10px] font-mono-code text-[#737685] uppercase">Features</div>
              <div className="text-xs font-mono-code font-bold text-[#191c1e] mt-0.5">6 Parameters</div>
            </div>
            <div className="p-3 bg-white rounded border border-[#e1e2e4] shadow-2xs">
              <div className="text-[10px] font-mono-code text-[#737685] uppercase">Target</div>
              <div className="text-xs font-mono-code font-bold text-[#191c1e] mt-0.5">Score (0-100)</div>
            </div>
            <div className="p-3 bg-white rounded border border-[#e1e2e4] shadow-2xs">
              <div className="text-[10px] font-mono-code text-[#737685] uppercase">Version</div>
              <div className="text-xs font-mono-code font-bold text-[#16a34a] mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                v1.4.2
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Technical Metrics Panel (Replacing 3D Scene) */}
        <motion.div
          className="lg:col-span-5 bg-white rounded-xl border border-[#e1e2e4] shadow-sm p-6 space-y-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#e1e2e4]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#0052cc]" />
              <span className="text-xs font-mono-code font-bold text-[#191c1e] uppercase">
                Model Pipeline Status
              </span>
            </div>
            <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#dcfce7] text-[#16a34a] border border-[#16a34a]/30 font-semibold">
              Active Endpoint
            </span>
          </div>

          <div className="space-y-3 font-mono-code text-xs">
            <div className="p-3 rounded bg-[#f8f9fb] border border-[#e1e2e4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#0052cc]" />
                <span className="text-[#434654]">Inference Service</span>
              </div>
              <span className="font-bold text-[#191c1e]">FastAPI + Scikit-Learn</span>
            </div>

            <div className="p-3 rounded bg-[#f8f9fb] border border-[#e1e2e4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#0052cc]" />
                <span className="text-[#434654]">Average Latency</span>
              </div>
              <span className="font-bold text-[#16a34a]">~14 ms</span>
            </div>

            <div className="p-3 rounded bg-[#f8f9fb] border border-[#e1e2e4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#0052cc]" />
                <span className="text-[#434654]">Validation Protocol</span>
              </div>
              <span className="font-bold text-[#191c1e]">Strict Pydantic Schema</span>
            </div>
          </div>

          <div className="p-3 rounded bg-[#dae2ff]/40 border border-[#b2c5ff]/50 text-xs text-[#0040a2] flex items-start gap-2 font-mono-code">
            <CheckCircle2 className="w-4 h-4 text-[#0052cc] shrink-0 mt-0.5" />
            <p>
              Pre-trained model <code className="font-bold text-[#0052cc]">model.joblib</code> is loaded in memory and ready to accept live parameter payloads.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full text-center z-10 pt-4">
        <button
          onClick={() => scrollToSection("predictor-workbench")}
          className="inline-flex items-center gap-1.5 text-[#737685] hover:text-[#0052cc] transition-colors cursor-pointer text-xs font-mono-code uppercase tracking-wider"
        >
          <span>Scroll to Live Workbench</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

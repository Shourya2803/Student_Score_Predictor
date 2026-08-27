"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, ArrowUp } from "lucide-react";

export const CTA: React.FC = () => {
  const scrollToPredict = () => {
    const el = document.getElementById("predictor-workbench");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-white dark:bg-[#080c14] border-b border-[#e1e2e4] dark:border-gray-800 text-[#191c1e] dark:text-gray-100 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-12 rounded bg-[#f8f9fb] dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-800 shadow-xs transition-colors duration-300"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0040a2] dark:text-blue-300 text-xs font-mono-code uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400" />
            <span>Interactive ML Workbench</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#191c1e] dark:text-white tracking-tight mb-3">
            Execute Real-Time Model Inference
          </h2>

          <p className="text-xs sm:text-sm text-[#434654] dark:text-gray-400 max-w-xl mx-auto mb-6 font-normal">
            Input student parameters to query our Scikit-Learn backend model instantly.
          </p>

          <div className="flex justify-center">
            <button
              onClick={scrollToPredict}
              className="px-6 py-3 text-xs font-mono-code font-bold uppercase tracking-wider text-white bg-[#0052cc] hover:bg-[#0040a2] dark:bg-blue-600 dark:hover:bg-blue-700 rounded shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Prediction Engine</span>
              <ArrowUp className="w-3.5 h-3.5 rotate-45" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

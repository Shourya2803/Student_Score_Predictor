"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, LineChart, Cpu, Award } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const stages = [
    {
      number: "01",
      title: "Data Collection",
      description: "Gathering core academic and lifestyle metrics including study hours, attendance rate, and practice test frequency.",
      icon: Database,
      tag: "Input Features",
    },
    {
      number: "02",
      title: "Vector Processing",
      description: "Preprocessing and constructing normalized numerical feature matrices for FastAPI backend validation.",
      icon: LineChart,
      tag: "Pydantic Schema",
    },
    {
      number: "03",
      title: "ML Execution",
      description: "Passing feature vectors to our trained Scikit-learn Linear Regression model to calculate weights.",
      icon: Cpu,
      tag: "Scikit-Learn Model",
    },
    {
      number: "04",
      title: "Score Output",
      description: "Generating an accurate, continuous final score estimation out of 100 with clear performance interpretations.",
      icon: Award,
      tag: "Inference Payload",
    }
  ];

  return (
    <section id="dashboard" className="py-16 bg-[#f8f9fb] dark:bg-[#0b0f19] border-b border-[#e1e2e4] dark:border-gray-800 text-[#191c1e] dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0040a2] dark:text-blue-300 text-xs font-mono-code uppercase font-semibold">
            <span>Core Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e] dark:text-white">
            From Feature Data to Score Prediction
          </h2>
          <p className="text-xs sm:text-sm text-[#434654] dark:text-gray-400 font-normal">
            Four seamless stages transforming raw student parameters into instant linear regression inference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded bg-white dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-800 shadow-2xs flex flex-col justify-between transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono-code font-bold text-[#c3c6d6] dark:text-gray-700">
                      {stage.number}
                    </span>
                    <div className="p-2 rounded bg-[#f8f9fb] dark:bg-gray-800 border border-[#e1e2e4] dark:border-gray-700 text-[#0052cc] dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="inline-block text-[10px] font-mono-code font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0040a2] dark:text-blue-300 mb-2">
                    {stage.tag}
                  </span>

                  <h4 className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white mb-1">
                    {stage.title}
                  </h4>

                  <p className="text-xs text-[#434654] dark:text-gray-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e1e2e4] dark:border-gray-800 flex items-center justify-between text-[11px] font-mono-code text-[#737685] dark:text-gray-500">
                  <span>Stage {stage.number} of 04</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0052cc] dark:bg-blue-400"></span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

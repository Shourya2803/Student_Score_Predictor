"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarCheck,
  Award,
  Moon,
  FileCheck,
  FileText,
  Activity
} from "lucide-react";

export const DataVisualization: React.FC = () => {
  const featureCards = [
    {
      title: "Study Hours",
      demoVal: "6.5 hrs",
      range: "0 - 24 hrs",
      icon: BookOpen,
      desc: "Daily or weekly dedicated study time.",
      weight: "+3.82 weight"
    },
    {
      title: "Attendance",
      demoVal: "88%",
      range: "0 - 100%",
      icon: CalendarCheck,
      desc: "Regular classroom lecture attendance.",
      weight: "+2.45 weight"
    },
    {
      title: "Previous Score",
      demoVal: "75 / 100",
      range: "0 - 100 marks",
      icon: Award,
      desc: "Historical academic performance benchmark.",
      weight: "+1.95 weight"
    },
    {
      title: "Sleep Hours",
      demoVal: "7.5 hrs",
      range: "0 - 24 hrs",
      icon: Moon,
      desc: "Daily restorative sleep for cognitive retention.",
      weight: "+0.85 weight"
    },
    {
      title: "Assignments",
      demoVal: "9 completed",
      range: ">= 0 count",
      icon: FileCheck,
      desc: "Continuous coursework and homework practice.",
      weight: "+1.12 weight"
    },
    {
      title: "Practice Tests",
      demoVal: "6 tests",
      range: ">= 0 count",
      icon: FileText,
      desc: "Mock exam preparation and test readiness.",
      weight: "+1.40 weight"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-[#e1e2e4] text-[#191c1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] text-[#0040a2] text-xs font-mono-code uppercase font-semibold">
            <Activity className="w-3.5 h-3.5 text-[#0052cc]" />
            <span>Feature Mapping & Coefficients</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e]">
            Input Feature Vector Specification
          </h2>
          <p className="text-xs sm:text-sm text-[#434654] font-normal">
            Every feature contributes proportionally to the final linear model prediction score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-5 rounded bg-[#f8f9fb] border border-[#e1e2e4] hover:border-[#0052cc] shadow-2xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded bg-white border border-[#e1e2e4] text-[#0052cc]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono-code text-[#737685] bg-white px-2 py-0.5 rounded border border-[#e1e2e4]">
                      {card.range}
                    </span>
                  </div>

                  <h3 className="text-sm font-mono-code font-bold text-[#191c1e] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#434654] mb-3">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e1e2e4] flex items-center justify-between font-mono-code">
                  <div>
                    <span className="text-[9px] text-[#737685] uppercase block">Sample Value</span>
                    <span className="text-xs font-bold text-[#191c1e]">{card.demoVal}</span>
                  </div>
                  <span className="text-[11px] text-[#16a34a] font-semibold bg-[#dcfce7] border border-[#16a34a]/30 px-2 py-0.5 rounded">
                    {card.weight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

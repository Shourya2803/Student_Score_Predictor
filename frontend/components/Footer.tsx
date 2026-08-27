"use client";

import React from "react";
import { Cpu } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Dashboard", id: "dashboard" },
    { label: "Predictor", id: "predictor-workbench" },
    { label: "Architecture", id: "model-registry" },
    { label: "API Docs", id: "api-docs" },
  ];

  return (
    <footer className="w-full bg-[#f8f9fb] border-t border-[#e1e2e4] py-8 text-[#191c1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono-code">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#0052cc] text-white">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-[#191c1e] tracking-tight">
            Predictive ML Infrastructure &bull; v1.0.4
          </span>
        </div>

        {/* Technical Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#4e6072]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-[#0052cc] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-[11px] text-[#737685]">
          FastAPI Backend &bull; Scikit-Learn Engine &bull; Stitch Precision Standard
        </div>
      </div>
    </footer>
  );
};

"use client";

import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";

interface HeaderProps {
  apiStatus: "checking" | "online" | "offline";
}

export const Header: React.FC<HeaderProps> = ({ apiStatus }) => {
  return (
    <header className="w-full max-w-4xl mx-auto text-center mb-8 pt-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>ML Score Predictor Engine v1.0</span>
      </div>

      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-indigo-400">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Student Score Predictor
        </h1>
      </div>

      <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-4">
        Predict a student&apos;s final score using academic and lifestyle information.
      </p>

      {/* Backend Status indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs">
        <span className="text-slate-400">API Status:</span>
        {apiStatus === "checking" && (
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Connecting...
          </span>
        )}
        {apiStatus === "online" && (
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            FastAPI Online (http://localhost:8000)
          </span>
        )}
        {apiStatus === "offline" && (
          <span className="flex items-center gap-1.5 text-rose-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            Backend Disconnected
          </span>
        )}
      </div>
    </header>
  );
};

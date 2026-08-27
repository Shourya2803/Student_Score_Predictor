"use client";

import React, { useState } from "react";
import { Info, HelpCircle, CheckCircle2, GitBranch, Terminal, Copy, Check } from "lucide-react";

export const AboutModel: React.FC = () => {
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"curl" | "python" | "javascript">("curl");

  const evaluatedModels = [
    {
      name: "Linear Regression (Ridge)",
      status: "Production Model",
      desc: "Optimal balance of accuracy (MAE ≈ 4.2), high interpretability, and zero overfitting risk.",
      selected: true,
    },
    {
      name: "Decision Tree Regressor",
      status: "Evaluated",
      desc: "Higher variance on small sample sizes with prone overfitting on edge cases.",
      selected: false,
    },
    {
      name: "Random Forest Regressor",
      status: "Evaluated",
      desc: "Slight marginal gain in R² but introduced unnecessary computational overhead.",
      selected: false,
    },
  ];

  const codeSnippets = {
    curl: `curl -X 'POST' \\
  'https://student-score-predictor-v4mi.onrender.com/predict' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "study_hours": 6.0,
    "attendance": 85.0,
    "previous_score": 72.0,
    "sleep_hours": 7.0,
    "assignments": 8.0,
    "practice_tests": 5.0
  }'`,
    python: `import requests

url = "https://student-score-predictor-v4mi.onrender.com/predict"
payload = {
    "study_hours": 6.0,
    "attendance": 85.0,
    "previous_score": 72.0,
    "sleep_hours": 7.0,
    "assignments": 8.0,
    "practice_tests": 5.0
}
response = requests.post(url, json=payload)
print("Predicted Score:", response.json()["predicted_score"])`,
    javascript: `const response = await fetch("https://student-score-predictor-v4mi.onrender.com/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    study_hours: 6.0,
    attendance: 85.0,
    previous_score: 72.0,
    sleep_hours: 7.0,
    assignments: 8.0,
    practice_tests: 5.0
  })
});
const data = await response.json();
console.log("Predicted Score:", data.predicted_score);`
  };

  const handleCopy = (code: string, lang: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <section id="api-docs" className="py-16 bg-[#f8f9fb] dark:bg-[#0b0f19] border-b border-[#e1e2e4] dark:border-gray-800 text-[#191c1e] dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0040a2] dark:text-blue-300 text-xs font-mono-code uppercase font-semibold">
            <Info className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400" />
            <span>API Docs & Registry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e] dark:text-white">
            REST Endpoint & Model Registry
          </h2>
          <p className="text-xs sm:text-sm text-[#434654] dark:text-gray-400 font-normal">
            Exact request/response schemas for live backend inference integration.
          </p>
        </div>

        {/* API Code Snippets Inspector Card */}
        <div className="mb-10 p-6 bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800 shadow-xs transition-colors duration-300">
          <div className="flex items-center justify-between border-b border-[#e1e2e4] dark:border-gray-800 pb-3 mb-4">
            <div className="flex items-center gap-2 font-mono-code text-xs">
              <Terminal className="w-4 h-4 text-[#0052cc] dark:text-blue-400" />
              <span className="font-bold text-[#191c1e] dark:text-white">POST /predict</span>
              <span className="text-[#16a34a] dark:text-green-400 bg-[#dcfce7] dark:bg-green-950/60 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                HTTP 200 OK
              </span>
            </div>

            <div className="flex items-center gap-2">
              {(["curl", "python", "javascript"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-code uppercase font-semibold cursor-pointer transition-colors ${
                    activeLang === lang
                      ? "bg-[#0052cc] dark:bg-blue-600 text-white"
                      : "bg-[#f3f4f6] dark:bg-gray-800 text-[#4e6072] dark:text-gray-300 hover:bg-[#e1e2e4] dark:hover:bg-gray-700"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 bg-[#191c1e] dark:bg-gray-950 text-[#f8f9fb] dark:text-gray-100 rounded font-mono-code text-xs overflow-x-auto border border-[#434654] dark:border-gray-800">
              <code>{codeSnippets[activeLang]}</code>
            </pre>
            <button
              onClick={() => handleCopy(codeSnippets[activeLang], activeLang)}
              className="absolute top-3 right-3 p-1.5 bg-[#434654] dark:bg-gray-800 hover:bg-[#737685] text-white rounded text-xs font-mono-code flex items-center gap-1 cursor-pointer"
            >
              {copiedLang === activeLang ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16a34a] dark:text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Model Selection Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e1e2e4] dark:border-gray-800">
              <HelpCircle className="w-4 h-4 text-[#0052cc] dark:text-blue-400" />
              <h3 className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white uppercase">Algorithm Description</h3>
            </div>
            <p className="text-xs text-[#434654] dark:text-gray-400 leading-relaxed mb-4">
              The model computes a weighted sum across six numerical inputs. Ridge regularization is applied to penalize extreme feature weights and ensure stability against slight parameter variations.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
              <div className="p-2.5 bg-[#f8f9fb] dark:bg-gray-950 rounded border border-[#e1e2e4] dark:border-gray-800">
                <div className="text-[10px] text-[#737685] dark:text-gray-400 uppercase">Inputs</div>
                <div className="font-bold text-[#191c1e] dark:text-gray-100 mt-0.5">6 Features</div>
              </div>
              <div className="p-2.5 bg-[#f8f9fb] dark:bg-gray-950 rounded border border-[#e1e2e4] dark:border-gray-800">
                <div className="text-[10px] text-[#737685] dark:text-gray-400 uppercase">Output Target</div>
                <div className="font-bold text-[#0052cc] dark:text-blue-400 mt-0.5">predicted_score</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e1e2e4] dark:border-gray-800">
              <GitBranch className="w-4 h-4 text-[#0052cc] dark:text-blue-400" />
              <h3 className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white uppercase">Evaluated Model Candidates</h3>
            </div>

            <div className="space-y-2 font-mono-code text-xs">
              {evaluatedModels.map((item) => (
                <div
                  key={item.name}
                  className={`p-3 rounded border transition-all ${
                    item.selected
                      ? "bg-[#dae2ff]/50 dark:bg-blue-950/40 border-[#0052cc] dark:border-blue-500"
                      : "bg-[#f8f9fb] dark:bg-gray-950 border-[#e1e2e4] dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#191c1e] dark:text-white flex items-center gap-1.5">
                      {item.selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] dark:text-green-400" />}
                      {item.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.selected
                          ? "bg-[#16a34a] dark:bg-green-600 text-white"
                          : "bg-[#e1e2e4] dark:bg-gray-800 text-[#4e6072] dark:text-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#434654] dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

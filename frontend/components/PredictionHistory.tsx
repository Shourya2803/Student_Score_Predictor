"use client";

import React, { useState } from "react";
import { History, Trash2, Code2, Clock, CheckCircle2, ChevronDown, ChevronUp, Copy, Check, Filter } from "lucide-react";
import { StudentMetrics } from "@/types";

export interface PredictionHistoryItem {
  request_id: string;
  timestamp: string;
  metrics: StudentMetrics;
  predicted_score: number;
  latency_ms: number;
  confidence_interval: [number, number];
}

interface PredictionHistoryProps {
  history: PredictionHistoryItem[];
  onClearHistory: () => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({ history, onClearHistory }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState<string>("");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopyJson = (item: PredictionHistoryItem) => {
    const payload = {
      request_id: item.request_id,
      timestamp: item.timestamp,
      model: {
        name: "student_score_model",
        version: "v1.0.4",
        algorithm: "Ridge Linear Regression"
      },
      input_metrics: item.metrics,
      prediction: {
        score: item.predicted_score,
        confidence_interval: item.confidence_interval,
        performance_tier:
          item.predicted_score >= 85
            ? "Excellent"
            : item.predicted_score >= 70
            ? "Proficient"
            : item.predicted_score >= 50
            ? "Average"
            : "Needs Improvement"
      },
      metadata: {
        latency_ms: item.latency_ms,
        status: "HTTP 200 OK"
      }
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(item.request_id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHistory = history.filter((item) =>
    item.request_id.toLowerCase().includes(filterTerm.toLowerCase()) ||
    item.predicted_score.toString().includes(filterTerm) ||
    item.metrics.study_hours.toString().includes(filterTerm)
  );

  return (
    <section id="history" className="py-16 bg-[#f8f9fb] dark:bg-[#0b0f19] border-b border-[#e1e2e4] dark:border-gray-800 text-[#191c1e] dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0040a2] dark:text-blue-300 text-xs font-mono-code uppercase font-semibold mb-2">
              <History className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400" />
              <span>Inference Request History</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e] dark:text-white">
              Historical Predictions Log
            </h2>
            <p className="text-xs sm:text-sm text-[#434654] dark:text-gray-400 font-normal mt-0.5">
              Review recent POST /predict execution logs, request UUIDs, and feature vectors.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-[#e1e2e4] dark:border-gray-700 hover:border-rose-200 text-rose-600 dark:text-rose-400 text-xs font-mono-code font-bold cursor-pointer transition-colors self-start md:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History ({history.length})</span>
            </button>
          )}
        </div>

        {/* Filter Input */}
        {history.length > 0 && (
          <div className="mb-6 max-w-sm flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800">
            <Filter className="w-4 h-4 text-[#737685] dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search request ID or score..."
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              className="w-full text-xs font-mono-code bg-transparent outline-none text-[#191c1e] dark:text-white placeholder-[#737685] dark:placeholder-gray-500"
            />
          </div>
        )}

        {/* History Table / Empty State */}
        {filteredHistory.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800">
            <History className="w-8 h-8 text-[#c3c6d6] dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-sm font-mono-code font-bold text-[#191c1e] dark:text-white">No Prediction History</h3>
            <p className="text-xs text-[#737685] dark:text-gray-400 mt-1 max-w-sm mx-auto">
              {history.length === 0
                ? "Execute a score prediction in the workbench above to log inference payloads."
                : "No matching request logs found for your search term."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 font-mono-code">
            {filteredHistory.map((item) => {
              const isExpanded = expandedId === item.request_id;
              const formattedDate = new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              });

              return (
                <div
                  key={item.request_id}
                  className="bg-white dark:bg-gray-900 rounded border border-[#e1e2e4] dark:border-gray-800 overflow-hidden shadow-2xs transition-colors duration-300"
                >
                  <div
                    onClick={() => toggleExpand(item.request_id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#f8f9fb] dark:hover:bg-gray-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded bg-[#dae2ff] dark:bg-blue-950/80 text-[#0052cc] dark:text-blue-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#191c1e] dark:text-white flex items-center gap-2">
                          <span>{item.request_id}</span>
                          <span className="text-[10px] bg-[#dcfce7] dark:bg-green-950/60 text-[#16a34a] dark:text-green-400 border border-[#16a34a]/30 dark:border-green-800 px-1.5 py-0.5 rounded font-semibold">
                            200 OK
                          </span>
                        </div>
                        <div className="text-[11px] text-[#737685] dark:text-gray-400 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{formattedDate}</span>
                          <span>&bull;</span>
                          <span>{item.latency_ms} ms latency</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <div className="text-[10px] text-[#737685] dark:text-gray-400 uppercase">Predicted Score</div>
                        <div className="text-base font-extrabold text-[#0052cc] dark:text-blue-400">
                          {item.predicted_score.toFixed(1)} <span className="text-xs text-[#737685] dark:text-gray-400">/ 100</span>
                        </div>
                      </div>
                      <div className="text-[#737685] dark:text-gray-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Request & Response Payload Inspector */}
                  {isExpanded && (
                    <div className="p-4 border-t border-[#e1e2e4] dark:border-gray-800 bg-[#f8f9fb] dark:bg-gray-950 text-xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-[#191c1e] dark:text-white flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400" />
                          JSON Request & Response Payload
                        </span>
                        <button
                          onClick={() => handleCopyJson(item)}
                          className="px-2 py-1 bg-white dark:bg-gray-800 border border-[#e1e2e4] dark:border-gray-700 hover:border-[#0052cc] text-[#191c1e] dark:text-gray-200 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === item.request_id ? (
                            <>
                              <Check className="w-3 h-3 text-[#16a34a] dark:text-green-400" />
                              <span>Copied Payload</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#737685] dark:text-gray-400" />
                              <span>Copy JSON</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-[10px] text-[#737685] dark:text-gray-400 uppercase mb-1 font-bold">Input Feature Parameters</div>
                          <div className="p-3 bg-white dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-800 rounded grid grid-cols-2 gap-2 text-[11px]">
                            <div><span className="text-[#737685] dark:text-gray-400">Study Hours:</span> <span className="font-bold text-gray-900 dark:text-gray-100">{item.metrics.study_hours} hrs</span></div>
                            <div><span className="text-[#737685] dark:text-gray-400">Attendance:</span> <span className="font-bold text-gray-900 dark:text-gray-100">{item.metrics.attendance}%</span></div>
                            <div><span className="text-[#737685] dark:text-gray-400">Previous Score:</span> <span className="font-bold text-gray-900 dark:text-gray-100">{item.metrics.previous_score}</span></div>
                            <div><span className="text-[#737685] dark:text-gray-400">Sleep Hours:</span> <span className="font-bold text-gray-900 dark:text-gray-100">{item.metrics.sleep_hours} hrs</span></div>
                            <div><span className="text-[#737685] dark:text-gray-400">Assignments:</span> <span className="font-bold text-gray-900 dark:text-gray-100">{item.metrics.assignments}</span></div>
                            <div><span className="text-[#737685] dark:text-gray-400">Practice Tests:</span> <span className="font-bold text-gray-900 dark:text-gray-100">{item.metrics.practice_tests}</span></div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-[#737685] dark:text-gray-400 uppercase mb-1 font-bold">Inference Output Metrics</div>
                          <div className="p-3 bg-white dark:bg-gray-900 border border-[#e1e2e4] dark:border-gray-800 rounded space-y-1.5 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-[#737685] dark:text-gray-400">Model Version:</span>
                              <span className="font-bold text-[#0052cc] dark:text-blue-400">v1.0.4 (Ridge)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#737685] dark:text-gray-400">95% CI Range:</span>
                              <span className="font-bold text-gray-900 dark:text-gray-100">[{item.confidence_interval[0]}, {item.confidence_interval[1]}]</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#737685] dark:text-gray-400">Inference Latency:</span>
                              <span className="font-bold text-[#16a34a] dark:text-green-400">{item.latency_ms} ms</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

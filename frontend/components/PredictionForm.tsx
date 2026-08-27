"use client";

import React from "react";
import { StudentMetrics, ValidationError } from "@/types";
import {
  BookOpen,
  CalendarCheck,
  Award,
  Moon,
  FileCheck,
  FileText,
  Calculator,
  Loader2
} from "lucide-react";

interface PredictionFormProps {
  metrics: StudentMetrics;
  onChange: (field: keyof StudentMetrics, value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  errors: ValidationError;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  metrics,
  onChange,
  onSubmit,
  loading,
  errors
}) => {
  const fields = [
    {
      id: "study_hours",
      label: "Study Hours",
      icon: BookOpen,
      placeholder: "6.0",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Range: 0.0 - 24.0 hrs/day",
      value: metrics.study_hours
    },
    {
      id: "attendance",
      label: "Attendance Rate",
      icon: CalendarCheck,
      placeholder: "85.0",
      min: 0,
      max: 100,
      step: 1,
      hint: "Range: 0.0 - 100.0 %",
      value: metrics.attendance
    },
    {
      id: "previous_score",
      label: "Previous Score",
      icon: Award,
      placeholder: "72.0",
      min: 0,
      max: 100,
      step: 1,
      hint: "Range: 0.0 - 100.0 marks",
      value: metrics.previous_score
    },
    {
      id: "sleep_hours",
      label: "Sleep Hours",
      icon: Moon,
      placeholder: "7.0",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Range: 0.0 - 24.0 hrs/day",
      value: metrics.sleep_hours
    },
    {
      id: "assignments",
      label: "Assignments Completed",
      icon: FileCheck,
      placeholder: "8",
      min: 0,
      step: 1,
      hint: "Range: >= 0 count",
      value: metrics.assignments
    },
    {
      id: "practice_tests",
      label: "Practice Tests",
      icon: FileText,
      placeholder: "5",
      min: 0,
      step: 1,
      hint: "Range: >= 0 count",
      value: metrics.practice_tests
    }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex items-center justify-between border-b border-[#e1e2e4] dark:border-gray-800 pb-3 mb-2">
        <h3 className="text-xs font-mono-code uppercase font-semibold text-[#191c1e] dark:text-gray-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0052cc] dark:bg-blue-400" />
          Model Input Feature Vector
        </h3>
        <span className="text-[11px] font-mono-code text-[#737685] dark:text-gray-400">6/6 Enforced</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          const key = field.id as keyof StudentMetrics;
          const errorMsg = errors[field.id];

          return (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label
                htmlFor={field.id}
                className="flex items-center justify-between text-xs font-mono-code text-[#4e6072] dark:text-gray-300"
              >
                <span className="flex items-center gap-1.5 font-semibold text-[#191c1e] dark:text-gray-100">
                  <Icon className="w-3.5 h-3.5 text-[#0052cc] dark:text-blue-400" />
                  {field.label}
                </span>
                <span className="text-[10px] text-[#737685] dark:text-gray-400">{field.hint}</span>
              </label>

              <div className="relative">
                <input
                  id={field.id}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  placeholder={field.placeholder}
                  value={field.value === 0 && field.value.toString() === "" ? "" : field.value}
                  onChange={(e) => {
                    const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                    onChange(key, isNaN(val) ? 0 : val);
                  }}
                  disabled={loading}
                  className={`w-full px-3.5 py-2.5 bg-[#f8f9fb] dark:bg-gray-900 border rounded text-xs font-mono-code text-[#191c1e] dark:text-white placeholder-[#c3c6d6] dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-800 transition-all ${
                    errorMsg
                      ? "border-[#ba1a1a] dark:border-red-600 focus:ring-2 focus:ring-[#ba1a1a]/20"
                      : "border-[#e1e2e4] dark:border-gray-700 focus:border-[#0052cc] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#0052cc]/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>

              {errorMsg && (
                <span className="text-[11px] text-[#ba1a1a] dark:text-red-400 font-mono-code font-medium">
                  ⚠ {errorMsg}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-[#0052cc] hover:bg-[#0040a2] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-mono-code uppercase font-semibold text-xs rounded shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Executing Inference Pipeline...</span>
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4" />
              <span>Execute Model Inference</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

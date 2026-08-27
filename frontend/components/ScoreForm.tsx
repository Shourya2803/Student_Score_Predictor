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

interface ScoreFormProps {
  metrics: StudentMetrics;
  onChange: (field: keyof StudentMetrics, value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  errors: ValidationError;
}

export const ScoreForm: React.FC<ScoreFormProps> = ({
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
      placeholder: "e.g. 6",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Range: 0 - 24 hours/day",
      value: metrics.study_hours
    },
    {
      id: "attendance",
      label: "Attendance (%)",
      icon: CalendarCheck,
      placeholder: "e.g. 85",
      min: 0,
      max: 100,
      step: 1,
      hint: "Range: 0 - 100%",
      value: metrics.attendance
    },
    {
      id: "previous_score",
      label: "Previous Score",
      icon: Award,
      placeholder: "e.g. 72",
      min: 0,
      max: 100,
      step: 1,
      hint: "Range: 0 - 100 marks",
      value: metrics.previous_score
    },
    {
      id: "sleep_hours",
      label: "Sleep Hours",
      icon: Moon,
      placeholder: "e.g. 7",
      min: 0,
      max: 24,
      step: 0.5,
      hint: "Range: 0 - 24 hours/day",
      value: metrics.sleep_hours
    },
    {
      id: "assignments",
      label: "Assignments Completed",
      icon: FileCheck,
      placeholder: "e.g. 8",
      min: 0,
      step: 1,
      hint: "Minimum 0 completed",
      value: metrics.assignments
    },
    {
      id: "practice_tests",
      label: "Practice Tests",
      icon: FileText,
      placeholder: "e.g. 5",
      min: 0,
      step: 1,
      hint: "Minimum 0 tests taken",
      value: metrics.practice_tests
    }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => {
          const Icon = field.icon;
          const key = field.id as keyof StudentMetrics;
          const errorMsg = errors[field.id];

          return (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label
                htmlFor={field.id}
                className="flex items-center gap-2 text-sm font-medium text-slate-300"
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                <span>{field.label}</span>
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
                  className={`w-full px-4 py-2.5 bg-slate-800/90 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errorMsg
                      ? "border-rose-500/80 focus:ring-rose-500/50"
                      : "border-slate-700/80 focus:border-indigo-500/80 focus:ring-indigo-500/30"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>

              {errorMsg ? (
                <span className="text-xs text-rose-400 font-medium pl-1">
                  {errorMsg}
                </span>
              ) : (
                <span className="text-xs text-slate-400 pl-1">
                  {field.hint}
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
          className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 border border-indigo-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-indigo-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Predicting...</span>
            </>
          ) : (
            <>
              <Calculator className="w-5 h-5" />
              <span>Predict Score</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

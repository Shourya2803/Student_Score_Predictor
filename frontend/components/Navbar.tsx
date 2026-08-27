"use client";

import React, { useState, useEffect } from "react";
import { Server, Menu, X, ArrowRight, RefreshCw, Cpu, Layers, FileText, History, Calculator } from "lucide-react";
import { checkBackendHealth } from "@/lib/api";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");

  const verifyHealth = async () => {
    setBackendStatus("checking");
    const isReady = await checkBackendHealth();
    setBackendStatus(isReady ? "online" : "offline");
  };

  useEffect(() => {
    verifyHealth();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Dashboard", id: "dashboard", icon: Cpu },
    { label: "Predictor", id: "predictor-workbench", icon: Calculator },
    { label: "Architecture", id: "model-registry", icon: Layers },
    { label: "API Docs", id: "api-docs", icon: FileText },
    { label: "History", id: "history", icon: History },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e1e2e4] py-2.5 shadow-xs"
          : "bg-[#f8f9fb]/90 backdrop-blur-sm border-b border-[#e1e2e4]/80 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand + Infrastructure Badges */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("dashboard")}
            className="flex items-center gap-2 text-[#191c1e] font-bold text-base tracking-tight group cursor-pointer"
          >
            <div className="w-7 h-7 rounded bg-[#0052cc] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0040a2] transition-colors">
              <Server className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left font-mono-code">
              <span className="leading-none text-[#191c1e] font-extrabold text-sm">ML Infra</span>
              <span className="text-[10px] text-[#4e6072] uppercase tracking-wider mt-0.5">Score Engine</span>
            </div>
          </button>

          {/* Health Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#edeef0] border border-[#e1e2e4] text-[11px] font-mono-code">
            <span className="flex items-center gap-1.5 text-[#16a34a] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              Frontend: Online
            </span>
            <span className="text-[#c3c6d6]">|</span>
            {backendStatus === "checking" && (
              <span className="text-[#4e6072] flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Backend: Checking...
              </span>
            )}
            {backendStatus === "online" && (
              <span className="text-[#0052cc] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0052cc]" />
                Backend: Ready
              </span>
            )}
            {backendStatus === "offline" && (
              <button
                onClick={verifyHealth}
                className="text-[#ba1a1a] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                title="Click to retry backend connection"
              >
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                Backend: Offline (Retry)
              </button>
            )}
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center gap-1 text-xs font-mono-code uppercase tracking-wider text-[#434654] hover:text-[#0052cc] transition-colors cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Run Inference CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollToSection("predictor-workbench")}
            className="px-4 py-2 text-xs font-mono-code font-bold uppercase tracking-wider text-white bg-[#0052cc] hover:bg-[#0040a2] rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Run Inference</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4e6072] hover:text-[#191c1e] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e1e2e4] px-4 py-4 space-y-2 shadow-md">
          <div className="sm:hidden flex items-center justify-between gap-2 px-3 py-1.5 rounded bg-[#f3f4f6] border border-[#e1e2e4] text-xs font-mono-code mb-2">
            <span className="flex items-center gap-1.5 text-[#16a34a] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              Frontend: Online
            </span>
            <span className="text-[#c3c6d6]">|</span>
            <span className={backendStatus === "online" ? "text-[#0052cc]" : "text-[#ba1a1a]"}>
              Backend: {backendStatus}
            </span>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center gap-2.5 w-full text-left text-xs font-mono-code text-[#191c1e] hover:text-[#0052cc] py-2 transition-colors border-b border-[#f3f4f6]"
              >
                <Icon className="w-4 h-4 text-[#4e6072]" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => scrollToSection("predictor-workbench")}
            className="w-full mt-2 py-2.5 text-center text-xs font-mono-code uppercase font-bold text-white bg-[#0052cc] hover:bg-[#0040a2] rounded shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Run Inference</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};

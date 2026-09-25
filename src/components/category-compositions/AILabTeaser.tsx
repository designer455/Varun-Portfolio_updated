"use client";

import { ArrowRight, Terminal, Code2, Network, Bot, Sparkles } from "lucide-react";
import MagneticButton from "../MagneticButton";

interface AILabTeaserProps {
  onEnterLab?: () => void;
}

export default function AILabTeaser({ onEnterLab }: AILabTeaserProps) {
  const pipelineSteps = [
    {
      id: "creative",
      label: "CREATIVE DIRECTION",
      tech: "Visual Systems · UI/UX · Brand Logic",
      icon: Sparkles,
      color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    },
    {
      id: "ai",
      label: "AGENTIC INTELLIGENCE",
      tech: "Claude 3.7 · Gemini 2.0 · Deepseek",
      icon: Bot,
      color: "text-[#CCFF00] border-[#CCFF00]/30 bg-[#CCFF00]/10",
    },
    {
      id: "mcp",
      label: "MCP PROTOCOL SERVERS",
      tech: "Context Providers · Live Telemetry",
      icon: Network,
      color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    },
    {
      id: "ship",
      label: "AUTONOMOUS SHIP",
      tech: "Next.js · React 19 · Production Deploy",
      icon: Code2,
      color: "text-sky-400 border-sky-400/30 bg-sky-400/10",
    },
  ];

  const handleEnter = () => {
    if (onEnterLab) {
      onEnterLab();
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#0C111D] via-[#070D18] to-[#030712] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
      
      {/* Background Grid Pattern & Ambient Pulse */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#CCFF00]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#CCFF00]" />
            <span className="text-xs font-mono font-bold tracking-wider text-white">
              MCP_AI_ORCHESTRATION_ENGINE // PROTOCOL v2.4
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#15803D] animate-ping" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#CCFF00]">
              AGENT SUBSYSTEM READY
            </span>
          </div>
        </div>

        {/* Pipeline Architecture Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="group relative rounded-xl border border-white/10 bg-[#0C111D]/80 p-4 backdrop-blur-md transition-all duration-300 hover:border-[#CCFF00]/40 hover:bg-[#111827]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-zinc-500">
                    PHASE 0{idx + 1}
                  </span>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${step.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                <h5 className="text-xs font-bold tracking-tight text-white uppercase group-hover:text-[#CCFF00] transition-colors">
                  {step.label}
                </h5>
                <p className="mt-1 text-[11px] font-mono text-zinc-400">
                  {step.tech}
                </p>
              </div>
            );
          })}
        </div>

        {/* Manifesto & Gateway CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4 border-t border-white/10">
          <div className="max-w-xl">
            <h4 className="text-lg font-bold font-display uppercase tracking-tight text-white">
              Bridging the gap between aesthetic direction and autonomous software.
            </h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Full interactive system demonstration arriving in Milestone 3.6. Explore automated workflows and custom client integrations today.
            </p>
          </div>

          <MagneticButton
            onClick={handleEnter}
            data-cursor="explore"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#CCFF00] bg-[#CCFF00] px-6 py-3 text-xs font-mono font-black tracking-wider uppercase text-[#030712] shadow-[0_0_25px_rgba(204,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:bg-white hover:border-white cursor-pointer group flex-shrink-0"
          >
            <span>ENTER AI LAB</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
        </div>

      </div>
    </div>
  );
}

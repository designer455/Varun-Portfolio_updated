"use client";

import React, { useState } from "react";
import { WorkflowLayer } from "@/data/aiTools";
import AILabWorkflow from "./AILabWorkflow";
import ToolExplorer from "./ToolExplorer";
import MCPShowcase from "./MCPShowcase";
import AILabProjects from "./AILabProjects";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function AILab() {
  const [activeLayer, setActiveLayer] = useState<WorkflowLayer>("CREATIVE");

  return (
    <section
      id="ailab"
      className="py-24 sm:py-32 bg-[#030712] relative overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience (Restrained) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#CCFF00]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ========================================================
            1. AI LAB INTRO
        ======================================================== */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00] flex items-center gap-1.5">
              <Cpu size={14} />
              AI × DESIGN × DEVELOPMENT
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-none">
            AI LAB
          </h2>
          <p className="text-lg sm:text-xl font-display font-medium text-zinc-300 uppercase tracking-wide mt-2">
            CREATIVE INTELLIGENCE FOR DIGITAL BUILDING
          </p>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Bridging 4+ years of professional graphic and publication design with frontier language models,
            custom Model Context Protocol (MCP) servers, and full-stack web engineering.
            A laboratory dedicated to turning autonomous agentic workflows into robust, production-grade applications.
          </p>
        </div>

        {/* ========================================================
            2. INTERACTIVE WORKFLOW (CREATIVE → AI → MCP → BUILD → SHIP)
        ======================================================== */}
        <AILabWorkflow
          activeLayer={activeLayer}
          onSelectLayer={setActiveLayer}
        />

        {/* ========================================================
            3. INTERACTIVE TOOL EXPLORER
        ======================================================== */}
        <ToolExplorer
          activeLayer={activeLayer}
          onSelectLayer={setActiveLayer}
        />

        {/* ========================================================
            4. SIGNATURE MCP SYSTEMS ARCHITECTURE
        ======================================================== */}
        <MCPShowcase />

        {/* ========================================================
            5. REAL VERIFIED ENGINEERING & AI PROJECTS
        ======================================================== */}
        <AILabProjects />

        {/* ========================================================
            6. LAB COLLABORATION CTA
        ======================================================== */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#0C111D] border border-white/15 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-mono text-[#CCFF00] uppercase font-bold tracking-widest block mb-2">
              BUILD WITH AI-POWERED ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
              Ready to integrate intelligent systems into your product?
            </h3>
            <p className="text-sm text-zinc-400 font-sans mt-2 leading-relaxed">
              Whether you need bespoke MCP server integrations, production Next.js engineering, or comprehensive brand visual systems, let&apos;s build something exceptional.
            </p>
          </div>

          <div className="shrink-0">
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-display font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(204,255,0,0.3)] hover:shadow-[0_0_35px_rgba(204,255,0,0.5)] cursor-pointer"
              >
                <span>INITIATE PROJECT</span>
                <ArrowUpRight size={16} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

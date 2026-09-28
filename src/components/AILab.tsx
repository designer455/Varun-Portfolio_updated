"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";
import { AI_TOOLS } from "@/data/aiTools";
import { MCP_SYSTEMS } from "@/data/mcpSystems";
import { CREATIVE_TOOLS } from "@/data/creativeTools";
import { WEB_TECHNOLOGIES } from "@/data/webTechnologies";
import { DEPLOYMENT_TOOLS } from "@/data/deploymentTools";
import MagneticButton from "./MagneticButton";

export default function AILab() {
  return (
    <section
      id="ailab"
      className="py-24 sm:py-32 bg-[#030712] relative overflow-hidden border-t border-white/10"
    >
      {/* Subtle ambient lighting (restrained, no bright blob) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#CCFF00]/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ========================================================
            AI LAB HEADER
        ======================================================== */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00]">
              TOOLKIT & SYSTEMS
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-white uppercase leading-none">
            AI LAB
          </h2>
          <p className="text-base sm:text-lg font-display font-medium text-zinc-300 mt-3 tracking-wide">
            A curated showcase of artificial intelligence, MCP systems, creative suites, and modern web technologies.
          </p>
          <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
            Bridging visual craftsmanship with agentic reasoning models, custom Model Context Protocol microservices, and full-stack software development.
          </p>
        </div>

        {/* ========================================================
            SUBSECTION 01: AI TOOLS (7 EXACT TOOLS)
        ======================================================== */}
        <div className="mb-24 sm:mb-28">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#CCFF00] uppercase font-bold tracking-wider">
                01 // REASONING & RUNTIMES
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white uppercase tracking-tight">
              AI TOOLS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Frontier reasoning models and autonomous coding environments powering daily development workflows.
            </p>
          </div>

          {/* 7-Tool Balanced Layout: 4 cols on large screens, with the remaining 3 items centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {AI_TOOLS.map((tool) => (
              <div
                key={tool.id}
                data-cursor="inspect"
                className="group relative rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/15 transition-colors p-2">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={36}
                      height={36}
                      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-base font-display font-semibold text-white tracking-wide">
                    {tool.name}
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-400 font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-400 uppercase tracking-wider">ACTIVE STACK</span>
                  <span className="text-[#CCFF00] opacity-80 group-hover:opacity-100 transition-opacity">●</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUBSECTION 02: MCP SYSTEMS (GMAIL & DRIVE MCP)
        ======================================================== */}
        <div className="mb-24 sm:mb-28">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#CCFF00] uppercase font-bold tracking-wider">
                02 // AGENTIC INFRASTRUCTURE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white uppercase tracking-tight">
              MCP SYSTEMS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Custom Model Context Protocol systems I build and deploy to connect language models with production data sources.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {MCP_SYSTEMS.map((mcp) => (
              <div
                key={mcp.id}
                data-cursor="inspect"
                className="group rounded-3xl bg-[#0C111D] border border-white/10 hover:border-white/20 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Logo, Title & MCP Badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-2.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={mcp.logo}
                          alt={`${mcp.name} logo`}
                          width={40}
                          height={40}
                          className="w-9 h-9 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">
                          {mcp.name}
                        </h4>
                        <span className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-mono text-[#CCFF00] font-semibold uppercase tracking-wider">
                          <Terminal size={12} />
                          {mcp.badge}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-400">
                      <ShieldCheck size={12} className="text-[#15803D]" />
                      <span>{mcp.authentication}</span>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                    {mcp.description}
                  </p>

                  {/* Verified Capabilities */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase font-bold text-zinc-400 tracking-wider block mb-3">
                      VERIFIED CAPABILITIES
                    </span>
                    <ul className="space-y-2">
                      {mcp.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle2 size={14} className="text-[#CCFF00] shrink-0 mt-0.5 opacity-90" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Setup Flow (4 Steps) */}
                  <div className="mb-8 pt-5 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase font-bold text-zinc-400 tracking-wider block mb-3">
                      CONNECTION STEPS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mcp.setupSteps.map((stepItem) => (
                        <div
                          key={stepItem.step}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold text-[#CCFF00]">
                              {stepItem.step}
                            </span>
                            <span className="text-xs font-display font-medium text-white">
                              {stepItem.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {stepItem.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
                    <span className="text-zinc-400">ENDPOINT: </span>
                    <span className="text-zinc-300">{mcp.serverUrl}</span>
                  </div>

                  <MagneticButton>
                    <a
                      href={mcp.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="explore"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-[#CCFF00] hover:text-black border border-white/15 hover:border-[#CCFF00] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer"
                    >
                      <span>{mcp.ctaText}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUBSECTION 03: CREATIVE TOOLS (4 EXACT SUITES)
        ======================================================== */}
        <div className="mb-24 sm:mb-28">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#CCFF00] uppercase font-bold tracking-wider">
                03 // VISUAL DIRECTION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white uppercase tracking-tight">
              CREATIVE TOOLS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              The tools behind the visual work, brand systems, and editorial publication design.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CREATIVE_TOOLS.map((tool) => (
              <div
                key={tool.id}
                data-cursor="inspect"
                className="group relative rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/15 transition-colors p-2">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={36}
                      height={36}
                      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-base font-display font-semibold text-white tracking-wide">
                    {tool.name}
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-400 font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-400 uppercase tracking-wider">CREATIVE</span>
                  <span className="text-zinc-400 group-hover:text-white transition-colors">4+ YEARS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUBSECTION 04: WEB & DEVELOPMENT (8 TECHNOLOGIES + SHOPIFY)
        ======================================================== */}
        <div className="mb-20 sm:mb-24">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#CCFF00] uppercase font-bold tracking-wider">
                04 // DIGITAL ENGINEERING
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white uppercase tracking-tight">
              WEB & DEVELOPMENT
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Technologies I use to build scalable web applications, dynamic CMS solutions, and commercial storefronts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {WEB_TECHNOLOGIES.map((tech) => (
              <div
                key={tech.id}
                data-cursor="inspect"
                className="group relative rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/15 transition-colors p-2">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={36}
                      height={36}
                      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-base font-display font-semibold text-white tracking-wide">
                    {tech.name}
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-400 font-sans leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-400 uppercase tracking-wider">ENGINEERING</span>
                  <span className="text-[#15803D] font-bold">READY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SUBSECTION 05: DEPLOYMENT & INFRASTRUCTURE
        ======================================================== */}
        <div className="mb-20 sm:mb-24">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#CCFF00] uppercase font-bold tracking-wider">
                05 // DEPLOYMENT & INFRASTRUCTURE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white uppercase tracking-tight">
              DEPLOYMENT & INFRASTRUCTURE
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Platforms and workflows I use to take web applications from local development to scalable production.
            </p>

            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-zinc-400 mt-4">
              <span className="text-zinc-500 uppercase tracking-wider">WORKFLOW:</span>
              <span className="text-zinc-300">Design &amp; Code</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-200 font-medium">GitHub</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-200 font-medium">Vercel / Hostinger</span>
              <span className="text-zinc-600">→</span>
              <span className="text-[#CCFF00] font-medium">Live Production</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {DEPLOYMENT_TOOLS.map((tool) => (
              <div
                key={tool.id}
                data-cursor="inspect"
                className="group relative rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/15 transition-colors p-2.5">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={36}
                      height={36}
                      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-base font-display font-semibold text-white tracking-wide">
                    {tool.name}
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-400 font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-400 uppercase tracking-wider">PRODUCTION</span>
                  <span className="text-[#CCFF00] opacity-80 group-hover:opacity-100 transition-opacity">● LIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            COLLABORATION CTA (CLEAN EDITORIAL BANNER)
        ======================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C111D] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-mono text-[#CCFF00] uppercase font-bold tracking-widest block mb-2">
              BUILD WITH ME
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white uppercase tracking-tight">
              Ready to create something intelligent and visually distinctive?
            </h3>
            <p className="text-sm text-zinc-400 font-sans mt-2 leading-relaxed">
              Whether you need full-stack web engineering, custom MCP server architecture, or high-end brand visual systems, let&apos;s build together.
            </p>
          </div>

          <div className="shrink-0">
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] cursor-pointer"
              >
                <span>GET IN TOUCH →</span>
              </a>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}

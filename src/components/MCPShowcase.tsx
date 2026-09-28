"use client";

import React from "react";
import { Network, ShieldCheck, ArrowRight, Server, Database, KeyRound, Globe, ExternalLink } from "lucide-react";

export default function MCPShowcase() {
  const mcpFlowStages = [
    {
      label: "AI CLIENT",
      title: "Frontier LLM Interface",
      detail: "ChatGPT Custom Actions / Claude Code / Agentic Runtimes",
      icon: <Globe className="w-4 h-4 text-[#CCFF00]" />,
    },
    {
      label: "MCP PROTOCOL",
      title: "Model Context Bridge",
      detail: "Streamable HTTP & SSE Transports via JSON-RPC 2.0",
      icon: <Network className="w-4 h-4 text-[#CCFF00]" />,
    },
    {
      label: "SERVER ENGINE",
      title: "Custom MCP Microservice",
      detail: "Node.js 22 / TypeScript with OAuth 2.0 & PKCE S256",
      icon: <Server className="w-4 h-4 text-[#CCFF00]" />,
    },
    {
      label: "SERVICES & DATA",
      title: "External APIs & APIs",
      detail: "Google Drive v3 API / Google Web Search Service",
      icon: <Database className="w-4 h-4 text-[#CCFF00]" />,
    },
  ];

  return (
    <div className="w-full mt-20 pt-16 border-t border-white/10">
      {/* MCP Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-[#15803D]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00]">
            SIGNATURE ARCHITECTURE // CORE DIFFERENTIATOR
          </span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
          Model Context Protocol (MCP) Systems
        </h3>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Standard language models lack access to private files and live search without secure bridges.
          By engineering custom remote MCP servers with strict OAuth 2.0/2.1 authentication and cryptographic tenant isolation,
          AI models interact directly with real-world enterprise infrastructure.
        </p>
      </div>

      {/* Connected Architectural Diagram */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0C111D] border border-white/15 relative overflow-hidden mb-12 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-zinc-400">
          <span className="uppercase tracking-widest text-zinc-300 font-bold">
            REMOTE MCP SYSTEM PIPELINE
          </span>
          <span className="text-[#CCFF00] font-mono">SPECIFICATION: JSON-RPC 2.0</span>
        </div>

        {/* 4-Step Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {mcpFlowStages.map((stage, idx) => (
            <div key={idx} className="relative flex flex-col justify-between">
              <div className="p-4 rounded-xl bg-[#030712] border border-white/10 h-full flex flex-col justify-between group hover:border-[#CCFF00]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#CCFF00] px-2 py-0.5 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/20">
                      {stage.label}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/5">{stage.icon}</div>
                  </div>
                  <h5 className="font-display font-bold text-white text-sm uppercase tracking-wide">
                    {stage.title}
                  </h5>
                  <p className="text-xs font-sans text-zinc-400 mt-1 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                  NODE 0{idx + 1}
                </div>
              </div>

              {idx < mcpFlowStages.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-zinc-600">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Real MCP Implementations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project 1: Google Drive MCP v2 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0C111D] border border-white/15 flex flex-col justify-between relative group hover:border-[#CCFF00]/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold uppercase">
                PRODUCTION REMOTE SERVER
              </span>
              <span className="text-[11px] font-mono text-zinc-400">v2.0.0</span>
            </div>

            <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight group-hover:text-[#CCFF00] transition-colors">
              Digitons Google Drive MCP Server v2
            </h4>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Multi-User Isolation · OAuth 2.0 PKCE S256 · Hostinger Node.js 22
            </p>

            <p className="text-sm text-zinc-300 font-sans mt-3 leading-relaxed">
              Engineered a multi-user remote Model Context Protocol server specifically for ChatGPT Custom Actions.
              Every authenticated user operates strictly within their own Google account via isolated cryptographic credentials,
              enabling natural language search and file inspection with zero tenant data bleed.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono text-zinc-300">
              <div className="p-2 rounded-lg bg-[#030712] border border-white/5 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#CCFF00] shrink-0" />
                <span>Zero-Trust Token Store</span>
              </div>
              <div className="p-2 rounded-lg bg-[#030712] border border-white/5 flex items-center gap-1.5">
                <KeyRound size={14} className="text-[#CCFF00] shrink-0" />
                <span>PKCE S256 Flow</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">STACK: Node.js 22 · Express · MCP SDK</span>
            <a
              href="https://github.com/designer455/digitons-google-drive-mcp-v2"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#CCFF00] hover:underline"
            >
              <span>View Repository</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Project 2: Google Search MCP */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0C111D] border border-white/15 flex flex-col justify-between relative group hover:border-[#CCFF00]/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold uppercase">
                PRODUCTION PROTOCOL ENGINE
              </span>
              <span className="text-[11px] font-mono text-zinc-400">v1.0.0</span>
            </div>

            <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight group-hover:text-[#CCFF00] transition-colors">
              Digitons Google Search MCP Server
            </h4>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Streamable HTTP · OAuth 2.1 · SERP Comparison Engine
            </p>

            <p className="text-sm text-zinc-300 font-sans mt-3 leading-relaxed">
              Provides live Google Web Search, site-scoped query tools, and SEO keyword comparison interfaces directly to AI assistants.
              Supports both primary Google Web Search Service APIs and fallback Custom Search APIs with Bearer token authorization.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono text-zinc-300">
              <div className="p-2 rounded-lg bg-[#030712] border border-white/5 flex items-center gap-1.5">
                <Globe size={14} className="text-[#CCFF00] shrink-0" />
                <span>Live SERP Comparisons</span>
              </div>
              <div className="p-2 rounded-lg bg-[#030712] border border-white/5 flex items-center gap-1.5">
                <Network size={14} className="text-[#CCFF00] shrink-0" />
                <span>Streamable HTTP</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">STACK: TypeScript · Node.js · MCP SDK</span>
            <a
              href="https://github.com/designer455/digitons-google-search-mcp"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#CCFF00] hover:underline"
            >
              <span>View Repository</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

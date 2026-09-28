"use client";

import React, { useState, useMemo } from "react";
import { AI_TOOLS_DATA, WorkflowLayer } from "@/data/aiTools";
import { CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react";

interface ToolExplorerProps {
  activeLayer: WorkflowLayer;
  onSelectLayer: (layer: WorkflowLayer) => void;
}

export default function ToolExplorer({
  activeLayer,
  onSelectLayer,
}: ToolExplorerProps) {
  // Filter tools matching current layer
  const filteredTools = useMemo(() => {
    return AI_TOOLS_DATA.filter((tool) => tool.category === activeLayer);
  }, [activeLayer]);

  // Selected tool within active layer (defaults to first tool in layer)
  const [selectedToolId, setSelectedToolId] = useState<string>(
    filteredTools[0]?.id || "photoshop"
  );

  // Sync selected tool when layer changes
  const activeTool = useMemo(() => {
    const found = filteredTools.find((t) => t.id === selectedToolId);
    return found || filteredTools[0] || AI_TOOLS_DATA[0];
  }, [filteredTools, selectedToolId]);

  return (
    <div className="w-full mt-10">
      {/* Explorer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-mono text-[#CCFF00] tracking-widest uppercase font-bold flex items-center gap-1.5 mb-1">
            <Sparkles size={13} />
            INTERACTIVE TOOL ECOSYSTEM
          </span>
          <h4 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
            Verified Production Toolset
          </h4>
        </div>

        {/* Quick Layer Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#0C111D] border border-white/10 rounded-xl">
          {(["CREATIVE", "AI", "MCP", "BUILD", "SHIP"] as WorkflowLayer[]).map(
            (layer) => (
              <button
                key={layer}
                type="button"
                onClick={() => {
                  onSelectLayer(layer);
                  const firstOfLayer = AI_TOOLS_DATA.find(
                    (t) => t.category === layer
                  );
                  if (firstOfLayer) setSelectedToolId(firstOfLayer.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeLayer === layer
                    ? "bg-[#CCFF00] text-black shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {layer}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Grid: Tool Cards (Left) + Refined Details Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tool Selection List (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredTools.map((tool) => {
            const isSelected = activeTool.id === tool.id;

            return (
              <button
                key={tool.id}
                type="button"
                data-cursor="inspect"
                onClick={() => setSelectedToolId(tool.id)}
                className={`group relative flex flex-col p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? "bg-[#0C111D] border-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.12)]"
                    : "bg-[#0C111D]/50 border-white/10 hover:border-white/20 hover:bg-[#0C111D]/80"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 uppercase">
                    {tool.category}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isSelected ? "bg-[#CCFF00]" : "bg-white/20"
                    }`}
                  />
                </div>

                <h5 className="font-display font-bold text-white text-base tracking-wide group-hover:text-[#CCFF00] transition-colors">
                  {tool.name}
                </h5>
                <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-2 leading-relaxed">
                  {tool.tagline}
                </p>

                <div className="flex items-center gap-1 mt-3 text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span>View Details</span>
                  <ChevronRight size={13} className="text-[#CCFF00]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Refined Side Details Panel (5 Cols) */}
        <div className="lg:col-span-5 sticky top-28 bg-[#0C111D] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Backlight */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#CCFF00]/5 blur-3xl pointer-events-none" />

          {/* Panel Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest font-bold">
                TOOL SPECIFICATION // {activeTool.category}
              </span>
              <h4 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight mt-0.5">
                {activeTool.name}
              </h4>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              STAGE {activeLayer}
            </div>
          </div>

          {/* Tagline & Description */}
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                ROLE & ARCHITECTURE
              </span>
              <p className="text-zinc-200 font-sans">{activeTool.description}</p>
            </div>

            {/* Verified Usage */}
            <div className="p-3.5 rounded-xl bg-[#030712] border border-white/10">
              <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider font-bold block mb-1">
                VERIFIED REAL-WORLD APPLICATION
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {activeTool.verifiedUsage}
              </p>
            </div>

            {/* Core Highlights */}
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                KEY CAPABILITIES
              </span>
              <div className="space-y-1.5">
                {activeTool.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-zinc-300"
                  >
                    <CheckCircle2 size={13} className="text-[#CCFF00] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Layers size={13} className="text-zinc-400" />
              STATUS: PRODUCTION VERIFIED
            </span>
            <span className="text-zinc-400">OBSIDIAN LAB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

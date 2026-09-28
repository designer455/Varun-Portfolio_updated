"use client";

import React, { useState } from "react";
import { WorkflowLayer, WORKFLOW_LAYERS } from "@/data/aiTools";
import WorkflowNode from "./WorkflowNode";
import { ArrowRight, ChevronRight } from "lucide-react";

interface AILabWorkflowProps {
  activeLayer: WorkflowLayer;
  onSelectLayer: (layer: WorkflowLayer) => void;
}

export default function AILabWorkflow({
  activeLayer,
  onSelectLayer,
}: AILabWorkflowProps) {
  const [hoveredLayer, setHoveredLayer] = useState<WorkflowLayer | null>(null);

  const activeIndex = WORKFLOW_LAYERS.findIndex((l) => l.id === activeLayer);
  const activeLayerData = WORKFLOW_LAYERS[activeIndex] || WORKFLOW_LAYERS[0];

  return (
    <div className="w-full">
      {/* Node Graph Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
            WORKFLOW ARCHITECTURE
          </span>
          <h4 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <span>{activeLayerData.name}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono text-[#CCFF00] font-normal">
              STAGE {activeLayerData.stepNumber} OF 05
            </span>
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans leading-relaxed">
          {activeLayerData.description}
        </p>
      </div>

      {/* Interactive 5-Stage Node Chain */}
      <div className="relative">
        {/* Desktop Pipeline Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2 relative z-10">
          {WORKFLOW_LAYERS.map((layer, index) => {
            const isActive = activeLayer === layer.id;
            const isHovered = hoveredLayer === layer.id;

            return (
              <div key={layer.id} className="relative flex items-center">
                <div className="w-full">
                  <WorkflowNode
                    id={layer.id}
                    name={layer.name}
                    subtitle={layer.subtitle}
                    stepNumber={layer.stepNumber}
                    isActive={isActive}
                    isHovered={isHovered}
                    onClick={() => onSelectLayer(layer.id)}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  />
                </div>

                {/* Desktop Flow Arrow between nodes */}
                {index < WORKFLOW_LAYERS.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center -mr-2 -ml-2 z-20 pointer-events-none">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        activeIndex > index
                          ? "bg-[#CCFF00]/10 border-[#CCFF00]/40 text-[#CCFF00]"
                          : "bg-[#030712] border-white/10 text-zinc-600"
                      }`}
                    >
                      <ChevronRight size={14} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Flow Guide */}
        <div className="flex items-center justify-between mt-3 px-2 lg:hidden text-[11px] font-mono text-zinc-500">
          <span>CREATIVE</span>
          <ArrowRight size={12} className="text-[#CCFF00]" />
          <span>AI</span>
          <ArrowRight size={12} className="text-[#CCFF00]" />
          <span>MCP</span>
          <ArrowRight size={12} className="text-[#CCFF00]" />
          <span>BUILD</span>
          <ArrowRight size={12} className="text-[#CCFF00]" />
          <span>SHIP</span>
        </div>
      </div>
    </div>
  );
}

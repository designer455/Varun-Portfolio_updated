"use client";

import React from "react";
import { WorkflowLayer } from "@/data/aiTools";
import { Palette, Bot, Network, Code2, Rocket } from "lucide-react";

interface WorkflowNodeProps {
  id: WorkflowLayer;
  name: string;
  subtitle: string;
  stepNumber: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function WorkflowNode({
  id,
  name,
  subtitle,
  stepNumber,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: WorkflowNodeProps) {
  const getIcon = () => {
    switch (id) {
      case "CREATIVE":
        return <Palette className="w-4 h-4" />;
      case "AI":
        return <Bot className="w-4 h-4" />;
      case "MCP":
        return <Network className="w-4 h-4" />;
      case "BUILD":
        return <Code2 className="w-4 h-4" />;
      case "SHIP":
        return <Rocket className="w-4 h-4" />;
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      data-cursor="explore"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex flex-col items-start p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] cursor-pointer ${
        isActive
          ? "bg-[#0C111D] border-2 border-[#CCFF00] shadow-[0_0_30px_rgba(204,255,0,0.15)] -translate-y-1"
          : isHovered
          ? "bg-[#0C111D]/80 border border-white/30 -translate-y-0.5"
          : "bg-[#0C111D]/40 border border-white/10 hover:border-white/20"
      }`}
    >
      {/* Top Header: Step Indicator & Category Icon */}
      <div className="flex items-center justify-between w-full mb-3">
        <span
          className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
            isActive
              ? "bg-[#CCFF00] text-black"
              : "bg-white/5 text-zinc-400 border border-white/10"
          }`}
        >
          {stepNumber}
        </span>
        <div
          className={`p-1.5 rounded-lg transition-colors ${
            isActive
              ? "text-[#CCFF00] bg-[#CCFF00]/10"
              : "text-zinc-400 group-hover:text-white bg-white/5"
          }`}
        >
          {getIcon()}
        </div>
      </div>

      {/* Node Title & Subtitle */}
      <div className="w-full">
        <h4
          className={`font-display font-bold text-sm sm:text-base tracking-wide uppercase transition-colors ${
            isActive ? "text-white" : "text-zinc-200 group-hover:text-white"
          }`}
        >
          {name}
        </h4>
        <p className="text-xs font-mono text-zinc-400 mt-0.5 tracking-tight truncate">
          {subtitle}
        </p>
      </div>

      {/* Active Indicator Bar */}
      <div
        className={`w-full h-1 mt-4 rounded-full transition-all duration-300 ${
          isActive
            ? "bg-[#CCFF00]"
            : isHovered
            ? "bg-white/40"
            : "bg-white/10"
        }`}
      />
    </button>
  );
}

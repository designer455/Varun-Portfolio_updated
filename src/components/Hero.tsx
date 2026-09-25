"use client";

import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import CharacterCanvas from "./CharacterCanvas";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[100dvh] md:h-screen md:min-h-0 overflow-hidden select-none bg-[#030712] flex flex-col justify-between md:block"
      aria-label="Introduction & Interactive Hero"
    >
      {/* 
        Layer 3: Ambient Studio Glow
      */}
      <div className="absolute inset-0 ambient-glow-hero pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00]/[0.025] rounded-full blur-3xl pointer-events-none z-0" />

      {/* 
        Layer 5: 360° Interactive Character Canvas
        Desktop: Bottom-anchored centered background character with dynamic eye/head tracking
        Mobile: Cleanly positioned in lower half with zero text overlap
      */}
      <div className="relative flex-1 w-full min-h-0 flex items-end justify-center pointer-events-none order-2 md:order-none md:absolute md:inset-0 md:w-full md:h-full z-10">
        <CharacterCanvas />
      </div>

      {/* 
        Layer 6 & 7: Hero Typography, Positioning & Metadata
        Mobile: Positioned at top below navigation pill
        Desktop: Positioned at bottom-left with massive editorial presence
      */}
      <div className="relative z-20 flex flex-col items-start px-6 pt-20 sm:pt-24 sm:px-10 md:pt-0 md:px-0 md:absolute md:bottom-14 md:left-14 lg:left-18 order-1 md:order-none pointer-events-auto shrink-0 max-w-2xl">
        
        {/* Status Chip / Capability Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/80 font-medium">
            AI-POWERED CREATIVE TECHNOLOGIST
          </span>
        </div>

        {/* Primary Name Headline */}
        <h1 className="text-display-xl font-display text-white uppercase tracking-tight leading-[0.95] mb-2 drop-shadow-md">
          Varun Chauhan
        </h1>

        {/* Core Positioning Subheading */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-3 text-sm sm:text-base md:text-lg font-mono font-bold tracking-wider uppercase text-[#ccff00]">
          <span>AI</span>
          <span className="text-white/30">×</span>
          <span>DESIGN</span>
          <span className="text-white/30">×</span>
          <span>DEVELOPMENT</span>
        </div>

        {/* Concise Supporting Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-md mb-6 font-normal">
          Crafting high-impact digital products, brand identities, and autonomous creative workflows with modern code and generative AI.
        </p>

        {/* Layer 8: Primary & Secondary CTAs with Magnetic Physics */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Primary CTA: Explore Work */}
          <MagneticButton
            asAnchor
            href="#portfolio"
            data-cursor="explore"
            strength={16}
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#ccff00] text-black font-mono font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#d8ff33] active:scale-95 transition-all shadow-[0_0_24px_rgba(204,255,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MagneticButton>

          {/* Secondary CTA: Let's Connect */}
          <MagneticButton
            asAnchor
            href="#contact"
            data-cursor="link"
            strength={12}
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/20 text-white font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          >
            <span>LET&apos;S CONNECT</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-60 group-hover:opacity-100"
            />
          </MagneticButton>
        </div>
      </div>

      {/* 
        Honest Descriptive Pillar HUD:
        CREATIVE · INTELLIGENCE · ENGINEERING
        Desktop only, bottom right
      */}
      <aside
        className="hidden md:flex absolute bottom-14 right-14 z-20 items-center gap-3 px-4 py-2 rounded-full bg-[#0c111d]/70 backdrop-blur-md border border-white/10 text-white/70 text-[11px] font-mono tracking-widest uppercase shadow-lg pointer-events-auto"
        aria-label="Capabilities Overview"
      >
        <span className="flex items-center gap-1.5 text-white/90 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
          CREATIVE
        </span>
        <span className="text-white/25">·</span>
        <span className="text-white/90 font-medium">INTELLIGENCE</span>
        <span className="text-white/25">·</span>
        <span className="text-white/90 font-medium">ENGINEERING</span>
      </aside>

      {/* 
        Layer 9: Minimal Scroll Indicator (Bottom Center)
      */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 text-white/40 pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase font-medium">
          SCROLL TO EXPLORE
        </span>
        <ArrowDown size={12} className="animate-bounce text-[#ccff00]/60" />
      </div>

      {/* Bottom Fade Gradient into dark theme sections */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-b from-transparent via-[#030712]/70 to-[#030712] pointer-events-none z-10" />
    </section>
  );
}

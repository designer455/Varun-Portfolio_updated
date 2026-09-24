"use client";

import React, { useState } from "react";
import { ArrowUpRight, Eye, Compass } from "lucide-react";
import CharacterCanvas from "./CharacterCanvas";

export default function Hero() {
  const [trackerState, setTrackerState] = useState<{
    isCenter: boolean;
    angleDeg: number;
    direction: string;
  }>({
    isCenter: true,
    angleDeg: 0,
    direction: "CENTER",
  });

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[100dvh] md:h-screen md:min-h-0 overflow-hidden select-none bg-black flex flex-col justify-between md:block"
    >
      {/* 
        CRITICAL CONSTRAINT 1: Motionless Canvas
        On mobile: Sits cleanly in lower half below text (no overlap)
        On desktop: Full-screen background layout (unchanged)
        NO CSS 3D transforms (no perspective, rotateX, rotateY).
      */}
      <div className="relative flex-1 w-full min-h-0 flex items-end justify-center pointer-events-none order-2 md:order-none md:absolute md:inset-0 md:w-full md:h-full">
        <CharacterCanvas onStateChange={setTrackerState} />
      </div>

      {/* Subtle Studio Ambient Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* 
        Hero Typography & Interactive Controls:
        Mobile (< md): Top under header (pt-22 px-6), text then character below
        Desktop (md+): Absolute bottom-left overlay (unchanged)
      */}
      <div className="relative z-20 flex flex-col items-start px-6 pt-22 sm:pt-26 sm:px-12 md:pt-0 md:px-0 md:absolute md:bottom-12 md:left-16 order-1 md:order-none pointer-events-auto shrink-0">
        {/* "Hi, I'm" in clean, spaced modern sans-serif */}
        <span className="text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-white/80 font-medium mb-1 drop-shadow-sm">
          Hi, I'm
        </span>

        {/* Name in large, elegant cursive script (Dancing Script) */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-cursive text-white leading-[1.05] mb-2 sm:mb-3 md:mb-4 select-none"
          style={{
            textShadow: "0 8px 24px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.35)",
          }}
        >
          Varun Chauhan
        </h1>

        {/* Compact bio about Varun Chauhan */}
        <p className="max-w-[320px] sm:max-w-[360px] text-xs sm:text-sm text-white/90 leading-relaxed font-sans mb-4 sm:mb-5 md:mb-6 font-normal drop-shadow-sm">
          I am Varun Chauhan, a Senior Graphic &amp; Web Designer. I turn complex brand concepts into stunning website interfaces, print media, and social creatives.
        </p>

        {/* Two stylish white pill buttons: Resume and Let's Talk */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Resume: Solid White Pill with Arrow Icon */}
          <a
            href="/CV-Varun_Chauhan.pdf"
            download
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.25)] cursor-pointer"
          >
            <span>Resume</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Let's Talk: Frosted Glass / White Border Pill */}
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-[20px] border border-white/40 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <span>Let's Talk</span>
          </a>
        </div>
      </div>

      {/* Subtle Live Tracking Telemetry HUD */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-12 z-20 flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 text-[10px] sm:text-[11px] font-mono tracking-wider shadow-lg">
        {trackerState.isCenter ? (
          <>
            <Eye size={12} className="text-[#ccff00] animate-pulse" />
            <span className="text-[#ccff00] font-semibold">EYE CONTACT</span>
          </>
        ) : (
          <>
            <Compass size={12} className="text-white/70" />
            <span>
              {trackerState.direction} ({trackerState.angleDeg}°)
            </span>
          </>
        )}
      </div>

      {/* Bottom Fade Gradient into dark theme sections (#030712) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-28 bg-gradient-to-b from-transparent via-[#030712]/60 to-[#030712] pointer-events-none z-10" />
    </section>
  );
}

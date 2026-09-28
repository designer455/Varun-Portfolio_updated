"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function AmbientBackground() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    // Detect if fine pointer (mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      // Controlled parallax within 5-10px
      targetPos.current = { x: nx * 8, y: ny * 8 };
    };

    const updateParallax = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full will-change-transform"
      >
        {/* ========================================================
            LAYER 1: VERY FAINT AMBIENT HAZE (Slow 28s pulsation)
        ======================================================== */}
        <div className="absolute top-1/4 left-1/5 w-[550px] h-[400px] rounded-full bg-[#CCFF00]/[0.015] blur-[150px] animate-[pulse_24s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[450px] rounded-full bg-white/[0.012] blur-[160px] animate-[pulse_32s_ease-in-out_infinite_2s]" />

        {/* ========================================================
            LAYER 2: SVG GEOMETRIC ELEMENTS & MICRO-MARKS
        ======================================================== */}
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle micro dot grid pattern */}
            <pattern
              id="ambient-grid-dots"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="0.8" fill="rgba(255, 255, 255, 0.03)" />
            </pattern>
          </defs>

          {/* Full background micro-dot matrix */}
          <rect width="1000" height="1000" fill="url(#ambient-grid-dots)" />

          {/* Faint Hairline Circles */}
          <circle
            cx="180"
            cy="250"
            r="160"
            fill="none"
            stroke="rgba(255, 255, 255, 0.025)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="820"
            cy="700"
            r="220"
            fill="none"
            stroke="rgba(204, 255, 0, 0.018)"
            strokeWidth="1"
            strokeDasharray="6 12"
          />

          {/* Thin Coordinate Lines */}
          <line
            x1="120"
            y1="0"
            x2="120"
            y2="1000"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
          />
          <line
            x1="880"
            y1="0"
            x2="880"
            y2="1000"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
          />

          {/* Tiny Plus (+) Architectural Markers */}
          <g stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1">
            {/* Marker 1: Top-left */}
            <path d="M 120 180 m -4 0 l 8 0 m -4 -4 l 0 8" />
            {/* Marker 2: Top-right */}
            <path d="M 880 260 m -4 0 l 8 0 m -4 -4 l 0 8" />
            {/* Marker 3: Mid-left */}
            <path d="M 120 640 m -4 0 l 8 0 m -4 -4 l 0 8" />
            {/* Marker 4: Bottom-right */}
            <path d="M 880 780 m -4 0 l 8 0 m -4 -4 l 0 8" />
          </g>

          {/* Tiny Lime Accent Crosshairs */}
          <g stroke="rgba(204, 255, 0, 0.03)" strokeWidth="1">
            <path d="M 500 120 m -6 0 l 12 0 m -6 -6 l 0 12" />
            <path d="M 500 860 m -6 0 l 12 0 m -6 -6 l 0 12" />
          </g>
        </svg>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  // Position & physics references (ZERO React state for coordinates)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const currentCursorType = useRef<string>("default");
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;

    if (prefersReducedMotion || isTouch) {
      return;
    }

    const handlePointerMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Detect hover target attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const customTarget = target.closest<HTMLElement>("[data-cursor]");
        if (customTarget) {
          currentCursorType.current = customTarget.getAttribute("data-cursor") || "hover";
        } else if (target.closest("a, button, [role='button'], input, textarea, select")) {
          currentCursorType.current = "link";
        } else {
          currentCursorType.current = "default";
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // 60-120 FPS requestAnimationFrame loop
    const animate = () => {
      if (dotRef.current && ringRef.current && textRef.current) {
        // Dot moves instantaneously with hardware cursor
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;

        // Smooth trailing aura ring with lerp factor ~0.16
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

        const type = currentCursorType.current;
        let scale = 1;
        let textContent = "";
        let isPill = false;

        switch (type) {
          case "view":
            scale = 1.9;
            textContent = "VIEW →";
            isPill = true;
            break;
          case "explore":
            scale = 1.9;
            textContent = "EXPLORE";
            isPill = true;
            break;
          case "project":
            scale = 1.8;
            textContent = "OPEN ↗";
            isPill = true;
            break;
          case "link":
            scale = 1.45;
            break;
          case "magnetic":
            scale = 1.35;
            break;
          default:
            scale = 1;
            break;
        }

        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        // Text display inside aura pill
        textRef.current.textContent = textContent;
        textRef.current.style.opacity = isPill ? "1" : "0";

        // Dot hide/fade when expanded
        dotRef.current.style.opacity = isVisible.current ? (isPill ? "0" : "1") : "0";
        ringRef.current.style.opacity = isVisible.current ? "1" : "0";
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none select-none motion-reduce:hidden" aria-hidden="true">
      {/* Precision Hardware Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-150"
        style={{
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(204, 255, 0, 0.4)",
          willChange: "transform",
        }}
      />

      {/* Trailing Physics Aura Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 border border-white/60 bg-white/[0.04] backdrop-blur-[2px] rounded-full pointer-events-none z-[9998] opacity-0 flex items-center justify-center transition-colors duration-200"
        style={{
          boxShadow: "0 0 14px rgba(255, 255, 255, 0.15)",
          willChange: "transform",
        }}
      >
        <span
          ref={textRef}
          className="text-[8px] font-mono font-bold tracking-widest text-[#ccff00] uppercase opacity-0 transition-opacity duration-200 select-none pointer-events-none"
        />
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handlePointerMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, .interactive-hover'
        );
        isHovered.current = !!interactive;
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

    // 60fps Smooth Trailing Loop
    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Immediate position for inner dot
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;

        // Smooth trailing lerp for outer aura ring (factor ~0.18)
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

        const scale = isHovered.current ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        const opacity = isVisible.current ? 1 : 0;
        dotRef.current.style.opacity = `${opacity}`;
        ringRef.current.style.opacity = `${opacity}`;
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

  if (isTouchDevice) return null;

  return (
    <>
      {/* Sharp Glowing Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-200"
        style={{
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.4)",
          willChange: "transform",
        }}
      />

      {/* Smooth Trailing Aura Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 border border-white/70 bg-white/[0.04] rounded-full pointer-events-none z-[9998] opacity-0 backdrop-blur-[1px] transition-[width,height,background-color,border-color] duration-200"
        style={{
          boxShadow: "0 0 16px rgba(255, 255, 255, 0.25)",
          willChange: "transform",
        }}
      />
    </>
  );
}

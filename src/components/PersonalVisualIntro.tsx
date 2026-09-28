"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function PersonalVisualIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Intersection observer for section entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle Parallax depth on desktop pointer movement
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || window.innerWidth < 1024) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates from -1 to 1
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      setMouseOffset({ x: normX, y: normY });
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  // Parallax offsets (max 6-16px)
  const img1Parallax = reducedMotion
    ? ""
    : `translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -8}px, 0)`;

  const img2Parallax = reducedMotion
    ? ""
    : `translate3d(${mouseOffset.x * 14}px, ${mouseOffset.y * 14}px, 0)`;

  return (
    <section
      id="personal-intro"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="py-16 sm:py-24 lg:py-28 bg-[#030712] relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle ambient lighting (restrained, no bright blob) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#CCFF00]/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Eyebrow Label */}
        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-12">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00]">
            BEHIND THE WORK
          </span>
        </div>

        {/* ========================================================
            FLOATING EDITORIAL COMPOSITION (2 IMAGES ONLY)
        ======================================================== */}
        <div className="relative flex items-center justify-center min-h-[340px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[480px] mb-10 sm:mb-14">
          
          {/* IMAGE 1: PRIMARY VISUAL (Floating_img_1.webp) */}
          <div
            data-cursor="view"
            style={{
              transform: reducedMotion
                ? "none"
                : `${img1Parallax} rotate(-2.5deg)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out",
            }}
            className={`relative z-10 w-[220px] sm:w-[270px] md:w-[310px] lg:w-[340px] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-[#0C111D] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-white/25 -translate-x-5 sm:-translate-x-8 md:-translate-x-12 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-6"
            }`}
          >
            <div className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#030712]">
              <Image
                src="/assets/about/Floating_img_1.webp"
                alt="Varun Chauhan standing in a green park in a white shirt and dark trousers"
                fill
                sizes="(max-width: 640px) 220px, (max-width: 768px) 270px, (max-width: 1024px) 310px, 340px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* IMAGE 2: SECONDARY FLOATING VISUAL (Floating_img_2.jpeg) */}
          <div
            data-cursor="view"
            style={{
              transform: reducedMotion
                ? "none"
                : `${img2Parallax} rotate(3deg)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out 0.15s",
            }}
            className={`absolute z-20 w-[170px] sm:w-[200px] md:w-[230px] lg:w-[260px] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-[#0C111D] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[#CCFF00]/40 translate-x-12 sm:translate-x-16 md:translate-x-24 translate-y-10 sm:translate-y-14 md:translate-y-16 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-8"
            }`}
          >
            <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#030712]">
              <Image
                src="/assets/about/Floating_img_2.jpeg"
                alt="Varun Chauhan smiling portrait in a blue patterned shirt"
                fill
                sizes="(max-width: 640px) 170px, (max-width: 768px) 200px, (max-width: 1024px) 230px, 260px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

        {/* ========================================================
            PERSONAL STORYTELLING & HUMAN INTRODUCTION
        ======================================================== */}
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
            HI, I&apos;M VARUN.
          </h2>

          {/* Positioning Line */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-[#CCFF00] font-bold uppercase">
            <span>AI</span>
            <span className="text-zinc-600">×</span>
            <span>DESIGN</span>
            <span className="text-zinc-600">×</span>
            <span>DEVELOPMENT</span>
          </div>

          {/* Personal Statement (Concise, verified, human) */}
          <p className="mt-6 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
            I am a multidisciplinary designer and creative technologist with 4+ years of professional experience.
            I started in visual design and brand architecture, grew into full-stack web development, and expanded into autonomous AI and Model Context Protocol systems.
          </p>

          {/* Creed / Supporting Idea */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-mono text-zinc-400">
            <span>Designing visuals.</span>
            <span className="text-zinc-600">·</span>
            <span>Building experiences.</span>
            <span className="text-zinc-600">·</span>
            <span>Exploring AI.</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-200">Shipping real products.</span>
          </div>

          {/* Work Transition CTA */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <MagneticButton>
              <a
                href="#work"
                data-cursor="explore"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-display font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:shadow-[0_0_35px_rgba(204,255,0,0.45)] cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowUpRight size={16} />
              </a>
            </MagneticButton>
          </div>

        </div>

      </div>
    </section>
  );
}

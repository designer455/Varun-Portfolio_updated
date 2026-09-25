"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { ArrowRight, Layers } from "lucide-react";
import { PRESENTATION_CATEGORIES } from "@/data/categoryMapping";
import { Project } from "@/data/projects";

// Compositions
import WebComposition from "./category-compositions/WebComposition";
import BrandingComposition from "./category-compositions/BrandingComposition";
import SocialComposition from "./category-compositions/SocialComposition";
import EditorialComposition from "./category-compositions/EditorialComposition";
import EmailComposition from "./category-compositions/EmailComposition";
import AILabTeaser from "./category-compositions/AILabTeaser";
import MagneticButton from "./MagneticButton";

interface CategoryStoryProps {
  onSelectProject: (project: Project) => void;
  onOpenPdf: (pdfUrl: string) => void;
  onExploreVault: (categorySlug: string) => void;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function CategoryStory({
  onSelectProject,
  onOpenPdf,
  onExploreVault,
}: CategoryStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Update progress on scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalDistance = rect.height - window.innerHeight;
            if (totalDistance > 0) {
              const currentScroll = -rect.top;
              const progress = Math.max(0, Math.min(1, currentScroll / totalDistance));
              setScrollProgress(progress);

              // Map progress to category index: 6 categories across [0..1]
              // 0: 0.00 - 0.16, 1: 0.16 - 0.33, 2: 0.33 - 0.50, 3: 0.50 - 0.66, 4: 0.66 - 0.83, 5: 0.83 - 1.00
              const idx = Math.min(5, Math.floor(progress * 6));
              setActiveCategoryIndex(idx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Click on a category pill in the navigation: smooth scroll to that slot in the timeline
  const navigateToCategory = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const totalDistance = rect.height - window.innerHeight;
    // Target normalized timeline center point for that index (slot centers at (idx + 0.5)/6)
    const targetProgress = (index + 0.5) / 6;
    const targetScrollY = containerTop + targetProgress * totalDistance;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts: { duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }, []);

  // Categories data
  const categories = PRESENTATION_CATEGORIES;

  // Calculate entry/exit interpolation for each category card
  const getCategoryStyle = useCallback(
    (index: number) => {
      if (prefersReducedMotion) {
        return { opacity: 1, transform: "none", pointerEvents: "auto" as const };
      }

      // Slot boundaries (6 slots: 0 to 5)
      const slotSize = 1 / 6;
      const slotStart = index * slotSize;
      const slotCenter = slotStart + slotSize / 2;

      // Normalized delta: 0 = dead-center of this slot; +/-1.0 = boundary with adjacent slots
      // We extend to ±1.5 so outgoing + incoming cards overlap throughout the crossfade
      const delta = (scrollProgress - slotCenter) / (slotSize / 2);

      let opacity = 0;
      let translateY = 0;
      let scale = 1;
      let isVisible = false;

      if (delta <= -1.5 || delta >= 1.5) {
        // Far outside — completely hidden
        opacity = 0;
        translateY = delta < 0 ? 24 : -24;
        scale = delta < 0 ? 1.02 : 0.98;
        isVisible = false;
      } else if (delta < -0.25) {
        // Incoming transition: delta [-1.5 .. -0.25]
        const t = (delta + 1.5) / 1.25; // 0 -> 1
        opacity = Math.max(0, Math.min(1, t));
        translateY = 24 * (1 - t);
        scale = 1.02 - 0.02 * t;
        isVisible = opacity > 0.02;
      } else if (delta <= 0.25) {
        // Active plateau in center focus: delta [-0.25 .. +0.25]
        opacity = 1;
        translateY = 0;
        scale = 1;
        isVisible = true;
      } else {
        // Outgoing transition: delta [0.25 .. 1.5]
        const t = (delta - 0.25) / 1.25; // 0 -> 1
        opacity = Math.max(0, Math.min(1, 1 - t));
        translateY = -24 * t;
        scale = 1 - 0.02 * t;
        isVisible = opacity > 0.02;
      }

      return {
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        pointerEvents: isVisible && opacity > 0.5 ? ("auto" as const) : ("none" as const),
        visibility: isVisible ? ("visible" as const) : ("hidden" as const),
        transition: "opacity 160ms ease-out, transform 160ms cubic-bezier(0.16, 1, 0.3, 1)",
      };
    },
    [scrollProgress, prefersReducedMotion]
  );

  return (
    <section id="work" className="relative bg-[#030712] text-white">
      {/* Anchor for compatibility */}
      <div id="portfolio" className="absolute -top-24" />

      {/* Reduced Motion Static Stack Fallback */}
      {prefersReducedMotion ? (
        <div className="py-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="border-b border-white/10 pb-16">
              <div className="mb-8">
                <span className="text-xs font-mono text-[#CCFF00] font-bold">
                  {cat.number} {"//"} {cat.title}
                </span>
                <h3 className="text-3xl font-bold uppercase mt-2">{cat.tagline}</h3>
                <p className="text-sm text-zinc-400 mt-2">{cat.description}</p>
              </div>
              <div>
                {cat.slug === "web" && <WebComposition heroProject={cat.heroProject} onSelectProject={onSelectProject} />}
                {cat.slug === "branding" && (
                  <BrandingComposition heroProject={cat.heroProject} secondaryProjects={cat.secondaryProjects} onSelectProject={onSelectProject} />
                )}
                {cat.slug === "social" && (
                  <SocialComposition heroProject={cat.heroProject} secondaryProjects={cat.secondaryProjects} onSelectProject={onSelectProject} />
                )}
                {cat.slug === "editorial" && (
                  <EditorialComposition heroProject={cat.heroProject} secondaryProjects={cat.secondaryProjects} onSelectProject={onSelectProject} onOpenPdf={onOpenPdf} />
                )}
                {cat.slug === "email" && (
                  <EmailComposition heroProject={cat.heroProject} secondaryProjects={cat.secondaryProjects} onSelectProject={onSelectProject} />
                )}
                {cat.slug === "ailab" && <AILabTeaser onEnterLab={() => onExploreVault("ailab")} />}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Cinematic Pinned Timeline Container */
        <div ref={containerRef} className="relative h-[600vh] w-full">
          
          {/* Sticky 100dvh Stage */}
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-3 sm:pb-5 px-3 sm:px-8 z-20">
            
            {/* Top Navigation & Timeline Progress Header */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3 pt-1 pb-1 shrink-0 z-30 pointer-events-auto">
              {/* Category Pill Sub-Nav (Complete scrollbar suppression) */}
              <nav
                aria-label="Category Navigation"
                className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar rounded-full border border-white/10 bg-[#0C111D]/90 p-1 sm:p-1.5 backdrop-blur-xl shadow-2xl max-w-[88vw] sm:max-w-none"
              >
                {categories.map((cat, idx) => {
                  const isActive = activeCategoryIndex === idx;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => navigateToCategory(idx)}
                      data-cursor="explore"
                      className={`group flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#CCFF00] ${
                        isActive
                          ? "bg-[#CCFF00] text-[#030712] font-black shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={isActive ? "text-[#030712]/70" : "text-zinc-500"}>
                        {cat.number}
                      </span>
                      <span className="uppercase">{cat.slug}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Minimal Story Progress Indicator (01 / 06 + micro line) */}
              <div className="hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-[#0C111D]/80 px-3.5 py-1.5 backdrop-blur-md shrink-0">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#CCFF00]">
                  0{activeCategoryIndex + 1}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">/ 06</span>
                <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#CCFF00] transition-all duration-200"
                    style={{ width: `${Math.min(100, Math.max(8, scrollProgress * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Central Visual Stage — All Categories Swap Inside Same Viewport */}
            <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-1.5 min-h-0 overflow-hidden">
              {categories.map((cat, idx) => {
                const style = getCategoryStyle(idx);
                return (
                  <div
                    key={cat.id}
                    id={cat.id}
                    style={style}
                    className="absolute inset-0 flex flex-col justify-between overflow-y-auto no-scrollbar py-1 sm:py-3 px-1"
                  >
                    {/* Compact Editorial Header */}
                    <div className="mb-2 sm:mb-4 flex items-center justify-between gap-3 shrink-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                          <span className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/20 px-1.5 sm:px-2 py-0.5 rounded">
                            {cat.number} {"// ARCHIVE"}
                          </span>
                          <span className="text-[9px] sm:text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1">
                            <Layers className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#15803D]" />
                            {cat.projectCount} Works
                          </span>
                        </div>
                        <h2 className="text-base sm:text-2xl lg:text-3xl font-black font-display uppercase tracking-tight text-white leading-tight truncate">
                          {cat.title}
                        </h2>
                        <p className="hidden sm:block text-xs text-zinc-400 font-medium line-clamp-1 mt-0.5">
                          {cat.tagline}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <MagneticButton
                          onClick={() => onExploreVault(cat.slug)}
                          data-cursor="explore"
                          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                        >
                          <span className="hidden sm:inline">EXPLORE ALL</span>
                          <span className="sm:hidden">ALL</span>
                          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#CCFF00]" />
                        </MagneticButton>
                      </div>
                    </div>

                    {/* Dedicated Visual Artwork Slot */}
                    <div className="flex-1 min-h-0 flex flex-col justify-start sm:justify-center overflow-y-auto no-scrollbar">
                      {cat.slug === "web" && (
                        <WebComposition
                          heroProject={cat.heroProject}
                          onSelectProject={onSelectProject}
                        />
                      )}
                      {cat.slug === "branding" && (
                        <BrandingComposition
                          heroProject={cat.heroProject}
                          secondaryProjects={cat.secondaryProjects}
                          onSelectProject={onSelectProject}
                        />
                      )}
                      {cat.slug === "social" && (
                        <SocialComposition
                          heroProject={cat.heroProject}
                          secondaryProjects={cat.secondaryProjects}
                          onSelectProject={onSelectProject}
                        />
                      )}
                      {cat.slug === "editorial" && (
                        <EditorialComposition
                          heroProject={cat.heroProject}
                          secondaryProjects={cat.secondaryProjects}
                          onSelectProject={onSelectProject}
                          onOpenPdf={onOpenPdf}
                        />
                      )}
                      {cat.slug === "email" && (
                        <EmailComposition
                          heroProject={cat.heroProject}
                          secondaryProjects={cat.secondaryProjects}
                          onSelectProject={onSelectProject}
                        />
                      )}
                      {cat.slug === "ailab" && (
                        <AILabTeaser onEnterLab={() => onExploreVault("ailab")} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Subtle Indicator */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 shrink-0 text-[10px] font-mono text-zinc-500">
              <span className="hidden sm:inline">
                SCROLL TO NAVIGATE CATEGORY TIMELINE
              </span>
              <span className="sm:hidden text-zinc-400">
                SWIPE / SCROLL TO EXPLORE
              </span>
              <span className="text-zinc-400">
                VARUN CHAUHAN {"//"} CREATIVE TECH
              </span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

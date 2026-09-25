"use client";

import { ArrowRight, Layers } from "lucide-react";
import { CategoryDefinition } from "@/data/categoryMapping";
import MagneticButton from "./MagneticButton";

export interface CategoryHeroProps {
  category: CategoryDefinition;
  children: React.ReactNode;
  onExplore?: (categorySlug: string) => void;
  className?: string;
}

export default function CategoryHero({
  category,
  children,
  onExplore,
  className = "",
}: CategoryHeroProps) {
  const handleExplore = () => {
    if (onExplore) {
      onExplore(category.slug);
    } else {
      const vaultEl = document.getElementById("vault");
      if (vaultEl) {
        vaultEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id={category.id}
      className={`relative min-h-[90vh] py-16 sm:py-24 border-b border-white/5 overflow-hidden flex flex-col justify-center ${className}`}
    >
      {/* Category Ambient Glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#CCFF00]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#15803D]/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Category Header Row */}
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            {/* Meta Category Indicator */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-black tracking-widest text-[#CCFF00] px-2.5 py-1 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/20">
                {category.number} {"// ARCHIVE"}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                <Layers className="w-3.5 h-3.5 text-[#15803D]" />
                <span>{category.projectCount} Verified Works</span>
              </div>
            </div>

            {/* Category Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-[1.05]">
              {category.title}
            </h2>

            {/* Tagline & Description */}
            <p className="mt-3 text-base sm:text-lg text-zinc-300 font-medium">
              {category.tagline}
            </p>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-xl">
              {category.description}
            </p>
          </div>

          {/* Explore CTA */}
          <div className="flex-shrink-0">
            <MagneticButton
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase text-white backdrop-blur-sm transition-all duration-300 hover:border-[#CCFF00] hover:text-[#CCFF00] hover:bg-[#CCFF00]/10 group"
            >
              <span>EXPLORE {category.slug.toUpperCase()}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#CCFF00]" />
            </MagneticButton>
          </div>
        </div>

        {/* Custom Visual Slot (Unique Composition per Category) */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { ArrowUpRight, Printer } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectPreview from "../ProjectPreview";

interface BrandingCompositionProps {
  heroProject: Project;
  secondaryProjects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function BrandingComposition({
  heroProject,
  secondaryProjects,
  onSelectProject,
}: BrandingCompositionProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 min-h-0">
        
        {/* Dominant Hero Identity Visual (7 Cols) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectProject(heroProject)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectProject(heroProject);
            }
          }}
          data-cursor="view"
          className="group relative lg:col-span-7 rounded-xl sm:rounded-2xl border border-white/15 bg-[#0C111D] overflow-hidden flex-1 min-h-[280px] sm:min-h-[420px] lg:min-h-[500px] transition-all duration-500 hover:border-[#CCFF00]/40 hover:shadow-[0_0_40px_rgba(204,255,0,0.08)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
        >
          {heroProject.image && (
            <div className="relative h-full w-full">
              <Image
                src={heroProject.image}
                alt={heroProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 via-45% to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
            </div>
          )}

          {/* Top Brand Spec Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="rounded-full border border-white/20 bg-[#030712]/80 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#CCFF00] backdrop-blur-md">
              PRIMARY BRAND ARCHITECTURE
            </span>
            <span className="rounded-full border border-white/10 bg-black/60 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-300 backdrop-blur-md flex items-center gap-1 sm:gap-1.5">
              <Printer className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#15803D]" />
              CMYK + SPOT UV READY
            </span>
          </div>

          {/* Bottom Hero Caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#CCFF00]">
                  PRINT MEDIA &amp; PACKAGING
                </span>
                <h3 className="mt-0.5 sm:mt-1 text-lg sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                  {heroProject.title} — Comprehensive Brand Suite
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-300 max-w-lg line-clamp-2">
                  Identity guidelines, stationery collateral, corporate typography, and packaging die-cuts engineered for tactile luxury.
                </p>
              </div>

              <div className="flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-all duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#030712] group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Editorial Collateral (5 Cols: 2x2 Grid, Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 lg:col-span-5 gap-3 sm:gap-4">
          {secondaryProjects.map((project, idx) => (
            <ProjectPreview
              key={project.id}
              project={project}
              aspectRatio="square"
              onSelect={onSelectProject}
              badge={`COLLATERAL 0${idx + 1}`}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

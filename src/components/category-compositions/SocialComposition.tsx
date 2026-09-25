"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, TrendingUp, Share2 } from "lucide-react";
import { Project } from "@/data/projects";

interface SocialCompositionProps {
  heroProject: Project;
  secondaryProjects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function SocialComposition({
  heroProject,
  secondaryProjects,
  onSelectProject,
}: SocialCompositionProps) {
  const [activeItem, setActiveItem] = useState<Project>(heroProject);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center min-h-0">
        
        {/* Left: Campaign Meta and Secondary Thumbnails (4 Cols, hidden on mobile) */}
        <div className="hidden md:block lg:col-span-4 space-y-4 order-2 lg:order-1">
          <div className="rounded-xl border border-white/10 bg-[#0C111D] p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#CCFF00]">
              <TrendingUp className="h-4 w-4" />
              <span>HIGH CONVERSION ENGAGEMENT</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Creative strategy, multi-format social storytelling, and high-frequency campaign graphics engineered for algorithmic velocity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {secondaryProjects.map((project, idx) => {
              const isSelected = activeItem.id === project.id;
              return (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setActiveItem(project);
                    onSelectProject(project);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveItem(project);
                      onSelectProject(project);
                    }
                  }}
                  data-cursor="open"
                  className={`group relative aspect-square overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.2)] scale-102"
                      : "border-white/10 hover:border-white/30 bg-[#0C111D]"
                  }`}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-white uppercase">
                    DROP 0{idx + 2}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Immersive Large Central Showcase (8 Cols, full width on mobile) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectProject(activeItem)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelectProject(activeItem);
            }
          }}
          data-cursor="view"
          className="group relative w-full lg:col-span-8 rounded-xl sm:rounded-2xl border border-white/15 bg-[#0C111D] overflow-hidden aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-[#CCFF00]/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CCFF00] order-1 lg:order-2"
        >
          {activeItem.image && (
            <div className="relative h-full w-full">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
          )}

          {/* Social Platform Meta Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-[#030712]/80 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#CCFF00] backdrop-blur-md">
              <Share2 className="h-3 w-3" />
              OMNICHANNEL CAMPAIGN FEATURE
            </span>
          </div>

          {/* Bottom Reveal Bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#CCFF00]">
                {activeItem.category}
              </span>
              <h3 className="mt-1 text-2xl sm:text-3xl font-black font-display uppercase text-white tracking-tight">
                {activeItem.title}
              </h3>
              <p className="mt-1 text-xs text-zinc-300 font-mono">
                Click to inspect full high-resolution artwork
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-all duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#030712] group-hover:scale-110">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

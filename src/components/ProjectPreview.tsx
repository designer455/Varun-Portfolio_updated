"use client";

import Image from "next/image";
import { FileText, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

export interface ProjectPreviewProps {
  project: Project;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  showMetadata?: boolean;
  onSelect?: (project: Project) => void;
  className?: string;
  priority?: boolean;
  badge?: string;
}

export default function ProjectPreview({
  project,
  aspectRatio = "portrait",
  showMetadata = true,
  onSelect,
  className = "",
  priority = false,
  badge,
}: ProjectPreviewProps) {
  const isPdfOnly = !project.image && Boolean(project.pdf);

  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/10]",
  }[aspectRatio];

  const handleClick = () => {
    if (onSelect) {
      onSelect(project);
    } else if (isPdfOnly && project.pdf) {
      window.open(project.pdf, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      data-cursor="open"
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#0C111D] transition-all duration-500 hover:border-[#CCFF00]/40 hover:shadow-[0_0_30px_rgba(204,255,0,0.08)] focus:outline-none focus:ring-2 focus:ring-[#CCFF00] cursor-pointer ${aspectClass} ${className}`}
    >
      {/* Visual Media */}
      {project.image ? (
        <div className="relative h-full w-full overflow-hidden bg-black/60">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle dark gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
        </div>
      ) : (
        /* PDF Publication Fallback */
        <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0C111D] via-[#070D18] to-[#030712]">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#CCFF00] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:border-[#CCFF00]/40">
            <FileText className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#CCFF00]/80">
            PDF Publication
          </span>
          <p className="mt-2 text-sm font-semibold tracking-tight text-white line-clamp-2 px-2">
            {project.title}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
            <span>Open Publication</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#CCFF00]" />
          </div>
        </div>
      )}

      {/* Floating Badge (if provided) */}
      {badge && (
        <div className="absolute top-3 left-3 z-10 rounded-full border border-white/15 bg-[#030712]/80 px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-300 backdrop-blur-md">
          {badge}
        </div>
      )}

      {/* Bottom Metadata Bar */}
      {showMetadata && project.image && (
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 transition-transform duration-300">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-mono tracking-wider uppercase text-[#CCFF00]">
                {project.category}
              </p>
              <h4 className="mt-0.5 text-sm font-bold tracking-tight text-white drop-shadow-md">
                {project.title}
              </h4>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-[#CCFF00] group-hover:text-[#CCFF00]">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

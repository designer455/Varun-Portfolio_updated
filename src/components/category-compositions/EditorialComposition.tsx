"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, FileText, Newspaper } from "lucide-react";
import { Project } from "@/data/projects";

interface EditorialCompositionProps {
  heroProject: Project;
  secondaryProjects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenPdf: (pdfUrl: string) => void;
}

export default function EditorialComposition({
  heroProject,
  secondaryProjects,
  onSelectProject,
  onOpenPdf,
}: EditorialCompositionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Luxury Editorial Magazine Spread (7 Cols) */}
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
          className="group relative lg:col-span-7 rounded-xl sm:rounded-2xl border border-white/15 bg-[#0C111D] overflow-hidden min-h-[260px] xs:min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#CCFF00]/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
        >
          {heroProject.image && (
            <div className="relative h-full w-full">
              <Image
                src={heroProject.image}
                alt={heroProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
          )}

          {/* Top Publication Issue Tag */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-[#030712]/80 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#CCFF00] backdrop-blur-md flex items-center gap-1.5">
              <Newspaper className="h-3 w-3" />
              FULL-PAGE EDITORIAL SPREAD
            </span>
          </div>

          {/* Bottom Editorial Caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#CCFF00]">
                  COMMERCIAL PRINT RUN
                </span>
                <h3 className="mt-0.5 sm:mt-1 text-lg sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                  {heroProject.title} — High-Circulation Print Ad
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-300 max-w-md line-clamp-2">
                  Typography-driven editorial design engineered to command full visual dominance within premium print journals.
                </p>
              </div>

              <div className="flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-all duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#030712] group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Companion Publication Issues Archive (5 Cols, hidden on mobile) */}
        <div className="hidden md:flex lg:col-span-5 flex-col justify-between space-y-4">
          <div className="rounded-xl border border-white/10 bg-[#0C111D] p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#CCFF00]">
              <BookOpen className="h-4 w-4" />
              <span>PUBLICATION EDITIONS</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Verified corporate advertisements and print booklet publications archived for direct inspection.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            {secondaryProjects.map((project, idx) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (project.image) {
                    onSelectProject(project);
                  } else if (project.pdf) {
                    onOpenPdf(project.pdf);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (project.image) onSelectProject(project);
                    else if (project.pdf) onOpenPdf(project.pdf);
                  }
                }}
                data-cursor="open"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#0C111D] p-4 transition-all duration-300 hover:border-[#CCFF00]/40 hover:bg-[#111827] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#CCFF00] group-hover:border-[#CCFF00]/40 transition-colors">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                      EDITION 0{idx + 1} {"// AD"}
                    </span>
                    <h5 className="text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                      {project.title}
                    </h5>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span className="hidden sm:inline">VIEW PDF</span>
                  <ArrowUpRight className="h-4 w-4 text-[#CCFF00]" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

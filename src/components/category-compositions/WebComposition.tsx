"use client";

import Image from "next/image";
import { Globe, ExternalLink, ShieldCheck, ArrowUpRight } from "lucide-react";
import { LIVE_WEBSITES } from "@/data/categoryMapping";
import { Project } from "@/data/projects";

interface WebCompositionProps {
  heroProject: Project;
  onSelectProject: (project: Project) => void;
}

export default function WebComposition({
  heroProject,
  onSelectProject,
}: WebCompositionProps) {

  return (
    <div className="h-full flex flex-col gap-3 sm:gap-6">
      {/* Immersive Browser Window Showcase */}
      <div
        className="group relative rounded-xl sm:rounded-2xl border border-white/15 bg-[#0C111D] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:border-[#CCFF00]/40"
      >
        {/* Browser Chrome Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#070D18] px-3 sm:px-4 py-2 sm:py-3">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* URL Pill */}
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#030712] px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono text-zinc-300 w-full max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <ShieldCheck className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-[#15803D] flex-shrink-0" />
            <span className="text-zinc-500 text-[10px] sm:text-[11px] hidden xs:inline">https://</span>
            <span className="truncate text-white font-medium text-[10px] sm:text-xs">varunchauhan.design/preview/landing-page</span>
          </div>

          {/* View Mode Toggle / Inspect Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProject(heroProject)}
              data-cursor="view"
              className="flex items-center gap-1 sm:gap-1.5 rounded-md border border-white/15 bg-white/5 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-white transition-colors hover:border-[#CCFF00] hover:text-[#CCFF00] cursor-pointer"
            >
              <span>EXPAND</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Browser Viewport with Scrollable Preview */}
        <div
          onClick={() => onSelectProject(heroProject)}
          data-cursor="view"
          className="relative h-[220px] xs:h-[260px] sm:h-[380px] lg:h-[460px] w-full overflow-y-auto no-scrollbar bg-[#030712] cursor-pointer group/viewport"
        >
          {heroProject.image && (
            <div className="relative w-full min-h-[1200px]">
              <Image
                src={heroProject.image}
                alt={heroProject.title}
                width={1920}
                height={8603}
                priority
                className="w-full h-auto object-cover object-top transition-transform duration-700 ease-out group-hover/viewport:scale-[1.01]"
              />
            </div>
          )}

          {/* Floating Interaction Hint */}
          <div className="pointer-events-none absolute bottom-3 right-3 sm:bottom-4 sm:right-4 rounded-full border border-white/20 bg-[#030712]/90 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono text-zinc-300 backdrop-blur-md shadow-xl flex items-center gap-1.5 sm:gap-2">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>Click to inspect full resolution</span>
          </div>
        </div>
      </div>

      {/* Live Verified Deployments Grid */}
      <div>
        <div className="mb-2 sm:mb-4 flex items-center justify-between">
          <h4 className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-zinc-400">
            {"// LIVE CLIENT PLATFORMS & PORTALS"}
          </h4>
          <span className="text-[9px] sm:text-[11px] font-mono text-zinc-500">
            PRODUCED & MAINTAINED
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {LIVE_WEBSITES.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="group flex flex-col justify-between rounded-lg sm:rounded-xl border border-white/10 bg-[#0C111D] p-2.5 sm:p-4 transition-all duration-300 hover:border-[#CCFF00]/40 hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(204,255,0,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-[#15803D] bg-[#15803D]/10 px-1.5 sm:px-2 py-0.5 rounded border border-[#15803D]/20">
                    {site.badge}
                  </span>
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-500 transition-colors group-hover:text-[#CCFF00]" />
                </div>
                <h5 className="mt-1.5 sm:mt-3 text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors truncate">
                  {site.name}
                </h5>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-zinc-400 line-clamp-1">
                  {site.role}
                </p>
              </div>

              <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/5 flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-mono text-zinc-400 group-hover:text-white">
                <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#CCFF00] shrink-0" />
                <span className="truncate">{site.url.replace(/^https?:\/\//, "")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

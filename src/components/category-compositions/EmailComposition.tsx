"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, ArrowUpRight, CheckCircle2, Inbox } from "lucide-react";
import { Project } from "@/data/projects";

interface EmailCompositionProps {
  heroProject: Project;
  secondaryProjects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function EmailComposition({
  heroProject,
  secondaryProjects,
  onSelectProject,
}: EmailCompositionProps) {
  const [selectedEmail, setSelectedEmail] = useState<Project>(heroProject);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Email Client Inbox Window Showcase (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#0C111D] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
          
          {/* Email Client Header Bar */}
          <div className="border-b border-white/10 bg-[#070D18] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFF00]/10 text-[#CCFF00]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-wide">
                      {selectedEmail.title}
                    </span>
                    <span className="rounded bg-[#15803D]/20 text-[#15803D] text-[9px] font-mono px-2 py-0.5 border border-[#15803D]/30 font-bold">
                      DELIVERABILITY OPTIMIZED
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400">
                    From: Varun Chauhan &lt;creative@varunchauhan.design&gt;
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectProject(selectedEmail)}
                data-cursor="view"
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-pointer"
              >
                <span>INSPECT FULL</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Email Viewport with Smooth Scroll Preview */}
          <div
            onClick={() => onSelectProject(selectedEmail)}
            data-cursor="view"
            className="relative h-[480px] sm:h-[580px] w-full overflow-y-auto no-scrollbar bg-[#030712] p-4 sm:p-6 cursor-pointer group"
          >
            {selectedEmail.image && (
              <div className="max-w-xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-white/5">
                <Image
                  src={selectedEmail.image}
                  alt={selectedEmail.title}
                  width={1200}
                  height={2400}
                  className="w-full h-auto object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
              </div>
            )}

            {/* Scroll Hint */}
            <div className="pointer-events-none sticky bottom-4 left-0 right-0 flex justify-center">
              <span className="rounded-full border border-white/15 bg-[#030712]/90 px-3 py-1 text-[11px] font-mono text-zinc-400 backdrop-blur-md shadow-xl flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                Scroll preview or click to open full lightbox
              </span>
            </div>
          </div>

        </div>

        {/* Right: Campaign Meta & Quick-Select Drops (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-white/10 bg-[#0C111D] p-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#CCFF00]">
              <Inbox className="h-4 w-4" />
              <span>CAMPAIGN ARCHITECTURE SPEC</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Engineered for 600px desktop email standards, fluid mobile responsiveness, and high conversion click-through rates across Outlook, Apple Mail, and Gmail.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
              SELECT CAMPAIGN TO PREVIEW:
            </h5>

            {[heroProject, ...secondaryProjects].slice(0, 4).map((project, idx) => {
              const isCurrent = selectedEmail.id === project.id;
              return (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedEmail(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedEmail(project);
                    }
                  }}
                  data-cursor="open"
                  className={`group flex items-center justify-between rounded-xl border p-4 transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "border-[#CCFF00] bg-[#111827] shadow-[0_0_20px_rgba(204,255,0,0.1)]"
                      : "border-white/10 bg-[#0C111D] hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="48px"
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#CCFF00]">
                        DROP 0{idx + 1}
                      </span>
                      <h6 className="text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                        {project.title}
                      </h6>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#CCFF00]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

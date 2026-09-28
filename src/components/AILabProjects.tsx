"use client";

import React from "react";
import { AI_PROJECTS_DATA } from "@/data/aiProjects";
import { ArrowUpRight, CheckCircle2, Terminal } from "lucide-react";

export default function AILabProjects() {
  return (
    <div className="w-full mt-20 pt-16 border-t border-white/10">
      {/* Section Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-[#15803D]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00]">
            VERIFIED CODEBASE & ARCHITECTURES
          </span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
          Featured Engineering & AI Projects
        </h3>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Production systems, protocol servers, and full-stack applications engineered and deployed by Varun Chauhan.
          All projects reflect verifiable local repositories and production architectures.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Header: Category Badge + Status */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-[#CCFF00] px-2 py-0.5 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/20 uppercase">
                  {project.category}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                  {project.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h4 className="font-display font-bold text-lg text-white group-hover:text-[#CCFF00] transition-colors leading-snug">
                {project.name}
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-1 line-clamp-1">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-xs text-zinc-300 font-sans mt-3 leading-relaxed">
                {project.description}
              </p>

              {/* Architecture / Highlights */}
              {project.architecture && (
                <div className="mt-3 p-2.5 rounded-lg bg-[#030712] border border-white/5 text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5 text-zinc-300 mb-1">
                    <Terminal size={12} className="text-[#CCFF00]" />
                    <span className="text-[10px] uppercase font-bold">Architecture Pipeline:</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Key Features */}
              <div className="mt-4 space-y-1.5">
                {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-zinc-400">
                    <CheckCircle2 size={12} className="text-[#CCFF00] shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Tech Stack & Action Links */}
            <div className="mt-6 pt-4 border-t border-white/10">
              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3">
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Repository</span>
                    <ArrowUpRight size={11} className="text-[#CCFF00]" />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#CCFF00] hover:underline transition-colors"
                  >
                    <span>Live Site</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}

                {!project.repositoryUrl && !project.liveUrl && (
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    PROPRIETARY OFFLINE ENGINE
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

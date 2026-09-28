"use client";

import React from "react";
import { Sparkles, Globe, Palette, Share2, Award, Briefcase, Wrench, Cpu, Mail } from "lucide-react";

export interface JarvisCommandItem {
  id: string;
  label: string;
  category: "work" | "ai" | "bio" | "contact";
  targetSection: string;
  vaultFilter?: "WEB" | "BRANDING" | "SOCIAL" | "EDITORIAL" | "EMAIL" | "ALL";
  icon: React.ReactNode;
}

export const JARVIS_COMMANDS: JarvisCommandItem[] = [
  {
    id: "ai-work",
    label: "SHOW MY AI WORK",
    category: "ai",
    targetSection: "ailab",
    icon: <Cpu size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "web-work",
    label: "SHOW WEB WORK",
    category: "work",
    targetSection: "work",
    vaultFilter: "WEB",
    icon: <Globe size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "branding-work",
    label: "SHOW BRANDING",
    category: "work",
    targetSection: "work",
    vaultFilter: "BRANDING",
    icon: <Palette size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "social-work",
    label: "SHOW SOCIAL WORK",
    category: "work",
    targetSection: "work",
    vaultFilter: "SOCIAL",
    icon: <Share2 size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "certifications",
    label: "SHOW CERTIFICATIONS",
    category: "bio",
    targetSection: "credentials",
    icon: <Award size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "experience",
    label: "SHOW EXPERIENCE",
    category: "bio",
    targetSection: "about",
    icon: <Briefcase size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "design-skills",
    label: "SHOW MY DESIGN SKILLS",
    category: "bio",
    targetSection: "services",
    icon: <Wrench size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "ai-stack",
    label: "SHOW MY AI STACK",
    category: "ai",
    targetSection: "ailab",
    icon: <Sparkles size={12} className="text-[#CCFF00]" />,
  },
  {
    id: "contact-varun",
    label: "CONTACT VARUN",
    category: "contact",
    targetSection: "contact",
    icon: <Mail size={12} className="text-[#CCFF00]" />,
  },
];

interface JarvisCommandProps {
  onExecute: (command: JarvisCommandItem) => void;
}

export default function JarvisCommand({ onExecute }: JarvisCommandProps) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center py-2 px-3 bg-[#070D18] border-t border-white/10 shrink-0 max-h-[140px] overflow-y-auto scrollbar-thin">
      {JARVIS_COMMANDS.map((cmd) => (
        <button
          key={cmd.id}
          type="button"
          onClick={() => onExecute(cmd)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0C111D] hover:bg-[#131B2E] border border-white/10 hover:border-[#CCFF00]/50 text-[10px] font-mono font-bold text-zinc-200 hover:text-white uppercase tracking-wider transition-all duration-150 cursor-pointer active:scale-95"
        >
          {cmd.icon}
          <span>{cmd.label}</span>
        </button>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-background to-background"
    >
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Blur Shapes */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-drift-medium" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for Freelance & Full-time
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white uppercase leading-[0.95] mb-6">
            DESIGNING <br className="hidden sm:inline" />
            <span className="text-gradient">BRANDS &</span> <br />
            EXPERIENCES
          </h1>

          <p className="text-lg md:text-xl text-text-muted max-w-xl mb-8 leading-relaxed">
            I am <span className="text-white font-semibold">Varun Chauhan</span>, a Senior Graphic & Web Designer.
            I turn complex brand concepts into stunning website interfaces, print media, and social creatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-background font-bold uppercase tracking-wider hover:bg-accent-hover transition-all duration-200"
            >
              Let's Talk
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href="/CV-Varun_Chauhan.pdf"
              download
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full border border-border-dark text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all duration-200"
            >
              Download CV
              <Download size={18} />
            </a>
          </div>
        </div>

        {/* Profile Image Column */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group">
            {/* Outline box */}
            <div className="absolute -inset-3 rounded-2xl border-2 border-dashed border-accent/30 group-hover:border-accent/80 transition-colors duration-500 pointer-events-none" />

            {/* Glowing Accent behind image */}
            <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl group-hover:bg-accent/30 transition-all duration-500 scale-95 pointer-events-none" />

            {/* Image Container */}
            <div className="relative w-[300px] h-[360px] sm:w-[350px] sm:h-[420px] rounded-2xl overflow-hidden bg-bg-card border border-border-dark aspect-[3/4]">
              <Image
                src="/assets/updated profile.jpeg"
                alt="Varun Chauhan Profile"
                fill
                priority
                sizes="(max-w-768px) 300px, 350px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

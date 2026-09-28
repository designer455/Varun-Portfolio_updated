"use client";

import React from "react";
import { Layout, Palette, Share2, ArrowUpRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Layout,
      title: "Website & UI/UX design",
      count: "1 Feature Project",
      description:
        "High-fidelity mockups, responsive landing pages, and interactive prototypes built for ultimate user engagement and conversion.",
    },
    {
      icon: Palette,
      title: "Print & brand design",
      count: "40+ Projects",
      description:
        "Brochures, magazines, print publications, banners, stationery layouts, and professional corporate brand identity books.",
    },
    {
      icon: Share2,
      title: "Digital marketing & socials",
      count: "70+ Creatives",
      description:
        "Sleek emailer campaigns, engaging social media posts, ads, banners, and digital collateral for high-converting marketing campaigns.",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#030712] border-t border-white/10 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#CCFF00]/[0.012] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Left-Aligned Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00]">
              Services &amp; capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white leading-tight">
            How can I help you
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Specialized design engineering and creative production services tailored for ambitious brands and digital products.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                data-cursor="inspect"
                className="group relative p-7 sm:p-8 rounded-3xl bg-[#0C111D] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Top Bar: Icon & Count Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-zinc-400 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full tracking-wider">
                      {service.count}
                    </span>
                  </div>

                  {/* Title in Normal Sentence Case */}
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight group-hover:text-[#CCFF00] transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>

                  {/* Description in Inter Body */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Subtle Interactive Footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>CAPABILITY</span>
                  <ArrowUpRight
                    size={15}
                    className="text-zinc-500 group-hover:text-[#CCFF00] transition-colors"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

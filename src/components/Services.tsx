"use client";

import { Layout, Palette, Share2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Layout,
      title: "Website & UI/UX Design",
      count: "1 Feature Project",
      description: "High-fidelity mockups, responsive landing pages, and interactive prototypes built for ultimate user engagement.",
    },
    {
      icon: Palette,
      title: "Print & Brand Design",
      count: "40+ Projects",
      description: "Brochures, magazines, print publications, banners, stationery layouts, and professional corporate brand books.",
    },
    {
      icon: Share2,
      title: "Digital Marketing & Socials",
      count: "70+ Creatives",
      description: "Sleek emailer campaigns, engaging social media posts, ads, banners, and digital collateral for high-converting marketing campaigns.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background border-y border-border-dark relative overflow-hidden">
      {/* Background drifting element (dark theme variant) */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-drift-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            What I Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            HOW CAN I HELP YOU
          </h2>
          <div className="w-12 h-1 bg-accent mt-4" />
        </div>

        {/* 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-bg-card border border-border-dark hover:border-accent/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm"
              >
                <div>
                  {/* Icon & Count */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-all duration-300">
                      <IconComponent size={28} />
                    </div>
                    <span className="text-xs font-semibold text-text-muted bg-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.count}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-display text-white uppercase mb-4 tracking-wide group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Subtle visual accent line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-accent mt-8 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

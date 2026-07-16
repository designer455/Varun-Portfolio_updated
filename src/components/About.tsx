"use client";

import { Calendar, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  const keySkills = [
    "Corel Draw", "Illustrator", "Photoshop", "WordPress", "PowerPoint", "HTML", "CSS", "Bootstrap"
  ];

  const itSkills = [
    { name: "Bootstrap", years: 4 },
    { name: "HTML", years: 4 },
    { name: "WordPress", years: 4 },
    { name: "Excel", years: 3 },
    { name: "Word", years: 4 },
    { name: "PowerPoint", years: 4 },
    { name: "Illustrator", years: 4 },
    { name: "Photoshop", years: 4 },
    { name: "Corel Draw", years: 4 },
  ];

  const experiences = [
    {
      role: "Graphic and Web Designer",
      company: "Kairali Ayurvedic Group",
      type: "Full-time",
      duration: "Apr 2023 – Present (3 years 4 months)",
      description: "Constructing admin panels using HTML/CSS/Bootstrap; managing front end of company website; creating creatives for social media, marketing campaigns, and printing.",
    },
    {
      role: "Graphic and Web Designer",
      company: "Hindon Mercantile Limited",
      type: "Full-time",
      duration: "Jun 2021 – Mar 2023 (1 year 10 months)",
      description: "Designed and built website front-end and architecture; managed backend/server integration; performed website testing; conducted WordPress training.",
    },
    {
      role: "Technology/IT – Other",
      company: "Risezonic LLP",
      type: "Internship",
      duration: "Sep 2020 – Feb 2021 (6 months)",
      description: "",
    },
  ];

  const education = [
    {
      degree: "B.A. – Bachelor of Arts, Arts & Humanities",
      institution: "School of Open Learning (DU), Delhi",
      duration: "2018–2021",
      type: "Correspondence",
    },
    {
      degree: "Graphics Designing and Web (Corel Draw, Photoshop, Illustrator)",
      institution: "Maya Academy of Advanced Cinematics, Mumbai",
      duration: "2018–2020",
      type: "Full Time",
    },
    {
      degree: "Class XII",
      institution: "CBSE",
      duration: "2017",
      type: "",
    },
    {
      degree: "Class X",
      institution: "CBSE",
      duration: "2015",
      type: "",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#f9fafb] border-b border-zinc-200 relative overflow-hidden">
      {/* Background drifting element (light theme variant) */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#15803d]/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-10 -left-20 w-64 h-64 bg-[#15803d]/5 rounded-full blur-3xl pointer-events-none animate-drift-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#15803d] text-sm font-bold uppercase tracking-wider mb-2">
            My Biography
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-zinc-900 uppercase">
            ABOUT ME
          </h2>
          <div className="w-12 h-1 bg-[#15803d] mt-4" />
        </div>

        {/* 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio, Skills & Experience Years */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Bio Block */}
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-zinc-900 uppercase mb-2 tracking-wide border-b border-zinc-200 pb-2">
                Headline
              </h3>
              <p className="text-zinc-900 font-semibold text-base mb-4">
                Graphic | Website designer including WordPress
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Based in <span className="text-zinc-900 font-semibold">New Delhi, India</span>. Passionate about converting brand requirements into digital assets, layouts, print productions, and marketing collateral.
              </p>
            </div>

            {/* Key Skills Pills */}
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-zinc-900 uppercase mb-4 tracking-wide border-b border-zinc-200 pb-2">
                Key Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {keySkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border bg-emerald-50 border-emerald-200 text-[#15803d]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* IT Skills experience metrics */}
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-zinc-900 uppercase mb-4 tracking-wide border-b border-zinc-200 pb-2">
                IT Skills & Experience
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {itSkills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                    <span className="font-bold text-zinc-800 uppercase">{skill.name}</span>
                    <span className="text-[#15803d] font-bold">{skill.years} Years</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Work Experience & Education Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Experience Block */}
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-zinc-900 uppercase mb-6 tracking-wide flex items-center gap-2 border-b border-zinc-200 pb-2">
                <Briefcase size={20} className="text-[#15803d]" />
                Work Experience
              </h3>

              <div className="relative border-l border-zinc-200 pl-6 ml-3 flex flex-col gap-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Circle Node indicator */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#15803d] border-4 border-white" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="text-base font-bold text-zinc-900 uppercase tracking-wide">
                        {exp.role}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803d] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full w-fit">
                        <Calendar size={10} />
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                      {exp.company} <span className="text-zinc-300">|</span> {exp.type}
                    </p>

                    {exp.description && (
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Block */}
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-zinc-900 uppercase mb-6 tracking-wide flex items-center gap-2 border-b border-zinc-200 pb-2">
                <GraduationCap size={22} className="text-[#15803d]" />
                Education History
              </h3>

              <div className="flex flex-col gap-6">
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-4 items-start pb-4 border-b border-zinc-150 last:border-b-0 last:pb-0">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                          {edu.degree}
                        </h4>
                        <span className="text-[10px] font-bold text-[#15803d] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full w-fit">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                        {edu.institution} {edu.type ? `(${edu.type})` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  const experiences = [
    {
      role: "Graphic and Web Designer",
      company: "Kairali Ayurvedic Group",
      type: "Full-time",
      duration: "Apr 2023 – Present (3 yrs 4 mos)",
      description:
        "Constructing admin panels using HTML, CSS, and Bootstrap; managing the front end of company web assets; creating high-impact creatives for digital campaigns and print production.",
    },
    {
      role: "Graphic and Web Designer",
      company: "Hindon Mercantile Limited",
      type: "Full-time",
      duration: "Jun 2021 – Mar 2023 (1 yr 10 mos)",
      description:
        "Designed and engineered website front-end and page architecture; managed server and backend integration; conducted quality testing and team training.",
    },
    {
      role: "Technology / IT Associate",
      company: "Risezonic LLP",
      type: "Internship",
      duration: "Sep 2020 – Feb 2021 (6 mos)",
      description:
        "Assisted with front-end template development, digital asset preparation, and technical maintenance workflows.",
    },
  ];

  const education = [
    {
      degree: "B.A. – Bachelor of Arts (Arts & Humanities)",
      institution: "School of Open Learning (DU), Delhi",
      duration: "2018 – 2021",
      type: "Correspondence",
    },
    {
      degree: "Graphics Designing and Web (Corel Draw, Photoshop, Illustrator)",
      institution: "Maya Academy of Advanced Cinematics, Mumbai",
      duration: "2018 – 2020",
      type: "Full-time",
    },
    {
      degree: "Class XII (Senior Secondary)",
      institution: "Central Board of Secondary Education (CBSE)",
      duration: "2017",
      type: "Higher Secondary",
    },
    {
      degree: "Class X (Secondary)",
      institution: "Central Board of Secondary Education (CBSE)",
      duration: "2015",
      type: "Secondary School",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-[#F8FAFC] border-y border-slate-200 relative overflow-hidden"
    >
      {/* Subtle ambient light gradient accents */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-700">
              Background &amp; experience
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-slate-900 leading-tight">
            Work experience &amp; education
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            A comprehensive overview of my professional roles in design engineering alongside academic foundations.
          </p>
        </div>

        {/* 1 Row, 2 Columns Grid for Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Column 1: Work Experience */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 tracking-tight">
                    Work experience
                  </h3>
                  <p className="text-xs font-sans text-slate-500 mt-0.5">
                    Professional track record &amp; technical positions
                  </p>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="relative border-l border-slate-200 pl-6 ml-3.5 flex flex-col gap-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative group">
                    {/* Timeline Node */}
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-600 group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                      <h4 className="text-base font-display font-semibold text-slate-900 tracking-normal">
                        {exp.role}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full w-fit shrink-0">
                        <Calendar size={11} />
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-xs font-sans font-medium text-slate-600 mb-2">
                      <span className="text-slate-800 font-semibold">{exp.company}</span>
                      <span className="mx-1.5 text-slate-300">•</span>
                      <span>{exp.type}</span>
                    </p>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Education History */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 tracking-tight">
                    Education history
                  </h3>
                  <p className="text-xs font-sans text-slate-500 mt-0.5">
                    Degrees, diplomas &amp; academic certifications
                  </p>
                </div>
              </div>

              {/* Education List */}
              <div className="flex flex-col gap-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start pb-5 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                      <GraduationCap size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-1">
                        <h4 className="text-sm sm:text-base font-display font-semibold text-slate-900 tracking-normal leading-snug">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-sans font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full w-fit shrink-0 self-start">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 mt-0.5">
                        <span className="text-slate-700 font-medium">{edu.institution}</span>
                        {edu.type && (
                          <>
                            <span className="mx-1.5 text-slate-300">•</span>
                            <span className="text-slate-500">{edu.type}</span>
                          </>
                        )}
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

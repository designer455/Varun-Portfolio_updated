"use client";

import React, { useState } from "react";
import { ExternalLink, X, Award, Globe, FileText } from "lucide-react";

export default function Credentials() {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const certifications = [
    {
      title: "Front end development - HTML",
      issuer: "Great Learning Academy",
      validity: "Does not expire",
      url: "https://olympus1.mygreatlearning.com/course_certificate/FDIIFAJJ",
    },
    {
      title: "Graphic design and illustration using Adobe Illustrator CS6",
      issuer: "Adobe Certified Associate",
      validity: "Valid from Feb 2020 • Does not expire",
      url: "/assets/certificate/Graphic Design and Illustration using Adobe Illustrator CS6.pdf",
    },
    {
      title: "Print and digital media publication using Adobe InDesign CS6",
      issuer: "Adobe Certified Associate",
      validity: "Valid from Mar 2020 • Does not expire",
      url: "/assets/certificate/Print and Digital Media Publication using Adobe InDesign CS6.pdf",
    },
    {
      title: "Video communication using Adobe Premiere Pro CS6",
      issuer: "Adobe Certified Associate",
      validity: "Valid from Mar 2020 • Does not expire",
      url: "/assets/certificate/Video Communication using Adobe Premiere Pro CS6.pdf",
    },
    {
      title: "Advanced program in digital media and design",
      issuer: "Maya Academy of Advanced Cinematics",
      validity: "Valid from Sep 2021 • Does not expire",
      url: "/assets/certificate/Advanced Program in Digital Media and Design.pdf",
    },
  ];

  const projects = [
    {
      name: "Bimapay Finsure Pvt. Ltd.",
      type: "Offsite • Apr 2022 (Full-time)",
      url: "https://bimapay.in/",
    },
    {
      name: "Hindon Mercantile Limited",
      type: "Offsite • Sep 2021 (Full-time)",
      url: "https://hindon.co/",
    },
    {
      name: "Digitons Development",
      type: "Founder • Mar 2021 – Present",
      url: "https://digitonsdevelopment.com/",
    },
    {
      name: "Aiju Exports",
      type: "Offsite (Full-time)",
      url: "https://aijuexports.com/",
    },
    {
      name: "Social Media Post Creation and Other Graphic Work",
      type: "Onsite • Jun 2021 – Present",
      url: "",
    },
    {
      name: "Yug International Pvt. Ltd.",
      type: "Offsite • Dec 2020 (Full-time)",
      url: "http://www.yugindia.com/",
    },
    {
      name: "Raghavs Lawmax",
      type: "Onsite • Nov 2020 (Full-time)",
      url: "http://www.raghavslawmax.com/",
    },
    {
      name: "Goodwing Maritime Pvt. Ltd.",
      type: "Onsite • Oct 2020 – Oct 2021",
      url: "http://www.goodwingsmaritime.com/",
    },
    {
      name: "Risezonic LLP",
      type: "Offsite • Oct 2020 (Full-time)",
      url: "https://www.risezonic.com/",
    },
  ];

  return (
    <section
      id="credentials"
      className="py-24 sm:py-32 bg-[#030712] border-t border-white/10 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-[#CCFF00]/[0.012] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ========================================================
            SUBSECTION 01: CERTIFICATIONS
        ======================================================== */}
        <div className="mb-24 sm:mb-28">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00]">
                01 // Verified credentials
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white leading-tight">
              Certifications
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Industry-recognized accreditations in graphic design, web engineering, and multimedia communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {certifications.map((cert, index) => {
              const isLocalPdf = cert.url.startsWith("/assets/");
              return (
                <div
                  key={index}
                  data-cursor="inspect"
                  className="group relative p-6 sm:p-7 rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:scale-105 transition-transform">
                        <Award size={18} />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full">
                        ACCREDITED
                      </span>
                    </div>

                    <h4 className="text-base font-display font-semibold text-white tracking-normal leading-snug mb-1.5">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-sans font-medium text-[#CCFF00] mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400 mb-6">
                      {cert.validity}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (isLocalPdf) {
                        setActivePdf(cert.url);
                      } else {
                        window.open(cert.url, "_blank");
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-[#CCFF00] hover:text-black border border-white/10 hover:border-[#CCFF00] text-zinc-200 hover:text-black font-display font-semibold text-xs tracking-wide transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <span>{isLocalPdf ? "View certificate" : "Verify certificate"}</span>
                    {isLocalPdf ? <FileText size={13} /> : <ExternalLink size={13} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            SUBSECTION 02: WEBSITES WORKED ON (LIVE PROJECTS)
        ======================================================== */}
        <div>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00]">
                02 // Commercial deployment
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white leading-tight">
              Websites worked on
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Production web applications, corporate brand portals, and client websites delivered to live deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((proj, index) => (
              <div
                key={index}
                data-cursor="inspect"
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#0C111D] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#CCFF00] transition-colors">
                      <Globe size={18} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full">
                      DEPLOYED
                    </span>
                  </div>

                  <h4 className="text-base font-display font-semibold text-white tracking-normal leading-snug mb-1">
                    {proj.name}
                  </h4>
                  <p className="text-xs font-sans text-zinc-400 mb-6">
                    {proj.type}
                  </p>
                </div>

                {proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-display font-medium text-xs tracking-wide transition-all duration-200 cursor-pointer"
                  >
                    <span>Visit website</span>
                    <ExternalLink size={13} className="text-[#CCFF00]" />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-500 font-mono text-xs select-none">
                    Onsite media production
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full-Screen PDF Lightbox Modal */}
      {activePdf && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0C111D] border border-white/15 rounded-3xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Controls */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-[#030712]/80">
              <span className="text-xs font-mono font-semibold text-[#CCFF00] tracking-widest uppercase">
                Certificate preview
              </span>
              <button
                onClick={() => setActivePdf(null)}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-medium cursor-pointer"
              >
                <span>Close</span>
                <X size={16} />
              </button>
            </div>

            {/* Embedded PDF iframe */}
            <iframe
              src={activePdf}
              className="w-full h-[70vh] md:h-[78vh] border-0 rounded-2xl bg-zinc-900"
              title="Certificate Document Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
}

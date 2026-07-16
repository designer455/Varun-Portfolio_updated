"use client";

import { useState } from "react";
import { Award, ExternalLink, Globe, X } from "lucide-react";

export default function Credentials() {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const certifications = [
    {
      title: "Front End Development - HTML",
      issuer: "Great Learning Academy",
      validity: "Does not expire",
      url: "https://olympus1.mygreatlearning.com/course_certificate/FDIIFAJJ",
    },
    {
      title: "Graphic Design and Illustration using Adobe Illustrator CS6",
      issuer: "Adobe Certified Associate",
      validity: "Valid from Feb 2020, does not expire",
      url: "/assets/certificate/Graphic Design and Illustration using Adobe Illustrator CS6.pdf",
    },
    {
      title: "Print and Digital Media Publication using Adobe InDesign CS6",
      issuer: "Adobe Certified Associate",
      validity: "Valid from Mar 2020, does not expire",
      url: "/assets/certificate/Print and Digital Media Publication using Adobe InDesign CS6.pdf",
    },
    {
      title: "Video Communication using Adobe Premiere Pro CS6",
      issuer: "Adobe Certified Associate",
      validity: "Valid from Mar 2020, does not expire",
      url: "/assets/certificate/Video Communication using Adobe Premiere Pro CS6.pdf",
    },
    {
      title: "Advanced Program in Digital Media and Design",
      issuer: "Maya Academy of Advanced Cinematics",
      validity: "Valid from Sep 2021, does not expire",
      url: "/assets/certificate/Advanced Program in Digital Media and Design.pdf",
    },
  ];

  const projects = [
    {
      name: "Bimapay Finsure Pvt. Ltd.",
      type: "Offsite — Apr 2022 (Full Time)",
      url: "https://bimapay.in/",
    },
    {
      name: "Hindon Mercantile Limited",
      type: "Offsite — Sep 2021 (Full Time)",
      url: "https://hindon.co/",
    },
    {
      name: "Digitons Development",
      type: "Founder — March 2021 – Present (Full Time)",
      url: "https://digitonsdevelopment.com/",
    },
    {
      name: "Aiju Exports",
      type: "Offsite (Full Time)",
      url: "https://aijuexports.com/",
    },
    {
      name: "Social Media Post Creation and Other Graphic Work",
      type: "Onsite — Jun 2021 – Present (Full Time)",
      url: "",
    },
    {
      name: "Yug International Pvt. Ltd.",
      type: "Offsite — Dec 2020 (Full Time)",
      url: "http://www.yugindia.com/",
    },
    {
      name: "Raghavs Lawmax",
      type: "Onsite — Nov 2020 (Full Time)",
      url: "http://www.raghavslawmax.com/",
    },
    {
      name: "Goodwing Maritime Pvt. Ltd.",
      type: "Onsite — Oct 2020 – Oct 2021 (Full Time)",
      url: "http://www.goodwingsmaritime.com/",
    },
    {
      name: "Risezonic LLP",
      type: "Offsite — Oct 2020 (Full Time)",
      url: "https://www.risezonic.com/",
    },
  ];

  return (
    <section id="credentials" className="py-24 bg-background border-b border-border-dark relative overflow-hidden">
      {/* Background drifting shapes */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-drift-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Certifications Block */}
        <div className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              My Credentials
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
              Certifications
            </h2>
            <div className="w-12 h-1 bg-accent mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              const isLocalPdf = cert.url.startsWith("/assets/");
              return (
                <div key={index} className="p-6 rounded-2xl bg-bg-card border border-border-dark flex flex-col justify-between hover:border-accent/30 transition-colors duration-300">
                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-wide mb-1 leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-3">
                      {cert.issuer}
                    </p>
                    <p className="text-[11px] text-text-muted mb-6">
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
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-accent text-background font-bold text-xs uppercase tracking-wider hover:bg-accent-hover transition-colors cursor-pointer"
                  >
                    {isLocalPdf ? "View Certificate" : "Verify Certificate"}
                    <ExternalLink size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects Block */}
        <div>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Live Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
              Websites Worked On
            </h2>
            <div className="w-12 h-1 bg-accent mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, index) => (
              <div key={index} className="p-6 rounded-2xl bg-bg-card border border-border-dark flex flex-col justify-between hover:border-accent/30 transition-colors duration-300">
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wide mb-2 leading-snug">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-6">
                    {proj.type}
                  </p>
                </div>
                {proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-accent/40 text-accent font-bold text-xs uppercase tracking-wider hover:bg-accent hover:text-background transition-colors"
                  >
                    Visit Website
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-white/5 text-white/40 font-bold text-xs uppercase tracking-wider">
                    Onsite Media
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full-Screen PDF Lightbox Viewer */}
      {activePdf && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-zinc-955 border border-zinc-800 rounded-2xl overflow-hidden p-2 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-850 bg-zinc-950">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Certificate Preview
              </span>
              <button
                onClick={() => setActivePdf(null)}
                className="text-text-muted hover:text-accent transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              >
                Close <X size={16} />
              </button>
            </div>

            {/* Embedded PDF iframe */}
            <iframe
              src={activePdf}
              className="w-full h-[70vh] md:h-[78vh] border-0 rounded-xl"
              title="Certificate Document Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { FileText, Eye, ArrowUpRight, Layers, X, ChevronDown } from "lucide-react";
import { projectsData, Project } from "@/data/projects";

// Components
import CategoryStory from "./CategoryStory";
import MagneticButton from "./MagneticButton";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const VAULT_CATEGORIES = [
  "All",
  "Website & Landing Pages",
  "Email Campaigns",
  "Magazine Advertisements",
  "Print Media & Branding",
  "Social Media Creatives",
] as const;

type VaultCategoryType = typeof VAULT_CATEGORIES[number];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<VaultCategoryType>("All");
  const [visibleCount, setVisibleCount] = useState<number>(9);
  
  // Lightbox State
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // In-app PDF Viewer Modal
  const [activePdf, setActivePdf] = useState<string | null>(null);

  // Construct flat list of all slides with valid images
  const allImageSlides = useMemo(() => {
    return projectsData
      .filter((p) => Boolean(p.image))
      .map((p) => ({ src: p.image, title: p.title }));
  }, []);

  // Filter and Interleave projects for the Vault
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      const grouped = VAULT_CATEGORIES.reduce((acc, cat) => {
        if (cat === "All") return acc;
        acc[cat] = projectsData.filter((p) => p.category === cat);
        return acc;
      }, {} as Record<string, Project[]>);

      const interleaved: Project[] = [];
      let hasMoreItems = true;
      let index = 0;

      while (hasMoreItems) {
        hasMoreItems = false;
        for (const cat of VAULT_CATEGORIES) {
          if (cat === "All") continue;
          const list = grouped[cat];
          if (list && index < list.length) {
            interleaved.push(list[index]);
            hasMoreItems = true;
          }
        }
        index++;
      }

      return interleaved;
    }
    
    return projectsData.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const handleOpenProject = useCallback((project: Project) => {
    if (project.image) {
      const slideIdx = allImageSlides.findIndex((s) => s.src === project.image);
      if (slideIdx !== -1) {
        setPhotoIndex(slideIdx);
        setIsOpen(true);
      }
    } else if (project.pdf) {
      setActivePdf(project.pdf);
    }
  }, [allImageSlides]);

  const handleExploreVault = (slug: string) => {
    const mapping: Record<string, VaultCategoryType> = {
      web: "Website & Landing Pages",
      branding: "Print Media & Branding",
      social: "Social Media Creatives",
      editorial: "Magazine Advertisements",
      email: "Email Campaigns",
    };

    if (mapping[slug]) {
      setSelectedCategory(mapping[slug]);
      setVisibleCount(9);
    }
    const vaultEl = document.getElementById("vault");
    if (vaultEl) {
      vaultEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const hasMore = visibleCount < filteredProjects.length;

  return (
    <div className="bg-[#030712] text-white relative">
      
      {/* ========================================================
          1. PINNED / SCROLL-DRIVEN CATEGORY STORY STAGE
      ======================================================== */}
      <CategoryStory
        onSelectProject={handleOpenProject}
        onOpenPdf={(pdf) => setActivePdf(pdf)}
        onExploreVault={handleExploreVault}
      />

      {/* ========================================================
          2. COMPREHENSIVE WORK VAULT (ALL 114 VERIFIED WORKS)
      ======================================================== */}
      <section id="vault" className="py-24 sm:py-32 border-t border-white/10 bg-[#070D18] scroll-mt-24 relative overflow-hidden">
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#15803D]/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#CCFF00]/5 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Vault Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-[#CCFF00]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00]">
                  COMPREHENSIVE WORK VAULT
                </span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
                ALL 114 VERIFIED WORKS
              </h3>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Explore the complete production catalog spanning web interfaces, commercial email campaigns, editorial magazine publications, branding, and social assets.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 border border-white/10 bg-white/5 rounded-full px-4 py-2">
              <Layers className="h-3.5 w-3.5 text-[#15803D]" />
              <span>SHOWING {visibleProjects.length} OF {filteredProjects.length}</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {VAULT_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleCount(9);
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#CCFF00] text-[#030712] shadow-[0_0_20px_rgba(204,255,0,0.25)] font-black"
                      : "bg-[#0C111D] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleOpenProject(project);
                  }
                }}
                data-cursor="open"
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0C111D] border border-white/10 hover:border-[#CCFF00]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[4/3] bg-[#030712] overflow-hidden flex items-center justify-center border-b border-white/5">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    /* PDF Fallback */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0C111D] via-[#070D18] to-[#030712] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CCFF00] mb-3 group-hover:scale-110 group-hover:border-[#CCFF00]/40 transition-all duration-300">
                        <FileText size={26} />
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#CCFF00] mb-1">
                        {project.category}
                      </span>
                      <span className="text-xs font-semibold text-zinc-300 uppercase max-w-[200px] truncate">
                        PDF Publication
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#030712]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 z-10">
                    <span className="text-[10px] text-[#CCFF00] font-mono tracking-widest uppercase mb-2">
                      {project.category}
                    </span>
                    <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white text-center mb-6 max-w-[260px]">
                      {project.title}
                    </h4>

                    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                      {project.pdf && (
                        <button
                          onClick={() => setActivePdf(project.pdf!)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CCFF00] text-[#030712] font-black text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                        >
                          <FileText size={13} />
                          <span>READ PDF</span>
                        </button>
                      )}

                      {project.image && (
                        <button
                          onClick={() => handleOpenProject(project)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white transition-colors cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>INSPECT</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                      {project.category}
                    </span>
                    <h5 className="text-sm font-bold text-white tracking-tight truncate max-w-[220px]">
                      {project.title}
                    </h5>
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-zinc-400 group-hover:border-[#CCFF00] group-hover:text-[#CCFF00] transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Pagination */}
          <div className="mt-14 flex justify-center">
            {hasMore ? (
              <MagneticButton
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00] bg-[#CCFF00]/10 px-8 py-3.5 text-xs font-mono font-black tracking-widest uppercase text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#030712] transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.15)] group"
              >
                <span>LOAD MORE PROJECTS</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </MagneticButton>
            ) : (
              <div className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-zinc-500">
                ALL {filteredProjects.length} PROJECTS DISPLAYED
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================
          SHARED HIGH-RES LIGHTBOX MODAL
      ======================================================== */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={allImageSlides}
        plugins={[Zoom]}
      />

      {/* ========================================================
          SHARED IN-APP PDF VIEWER MODAL
      ======================================================== */}
      {activePdf && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-5xl h-[88vh] bg-[#0C111D] rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070D18]">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  PDF Publication Viewer
                </span>
                <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                  {activePdf.split("/").pop()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-md border border-white/15 px-3 py-1 text-xs font-mono text-zinc-300 hover:text-white hover:border-white transition-colors"
                >
                  <span>Open in Tab</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <button
                  onClick={() => setActivePdf(null)}
                  className="p-1.5 rounded-lg border border-white/15 text-zinc-400 hover:text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-pointer"
                  aria-label="Close PDF Viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <iframe
              src={activePdf}
              title="Publication Document Preview"
              className="w-full flex-1 border-0 bg-[#030712]"
            />
          </div>
        </div>
      )}

    </div>
  );
}

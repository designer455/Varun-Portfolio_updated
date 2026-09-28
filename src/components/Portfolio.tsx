"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { FileText, Eye, ArrowUpRight, Layers, X, ChevronDown } from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import pdfCoversManifest from "@/data/pdfCoversManifest.json";

// Components
import CategoryStory from "./CategoryStory";
import MagneticButton from "./MagneticButton";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const VAULT_FILTERS = [
  { id: "ALL", label: "ALL", category: null },
  { id: "WEB", label: "WEB", category: "Website & Landing Pages" },
  { id: "BRANDING", label: "BRANDING", category: "Print Media & Branding" },
  { id: "SOCIAL", label: "SOCIAL", category: "Social Media Creatives" },
  { id: "EDITORIAL", label: "EDITORIAL", category: "Magazine Advertisements" },
  { id: "EMAIL", label: "EMAIL", category: "Email Campaigns" },
] as const;

type VaultFilterId = typeof VAULT_FILTERS[number]["id"];

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<VaultFilterId>("ALL");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  
  // Lightbox State
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // In-app PDF Viewer Modal
  const [activePdf, setActivePdf] = useState<string | null>(null);

  // Escape key handler and focus management for PDF modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePdf) {
        setActivePdf(null);
      }
    };
    if (activePdf) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePdf]);

  // Compute real dynamic counts from verified project data
  const filterCounts = useMemo(() => {
    const counts: Record<VaultFilterId, number> = {
      ALL: projectsData.length,
      WEB: 0,
      BRANDING: 0,
      SOCIAL: 0,
      EDITORIAL: 0,
      EMAIL: 0,
    };
    projectsData.forEach((p) => {
      if (p.category === "Website & Landing Pages") counts.WEB++;
      else if (p.category === "Print Media & Branding") counts.BRANDING++;
      else if (p.category === "Social Media Creatives") counts.SOCIAL++;
      else if (p.category === "Magazine Advertisements") counts.EDITORIAL++;
      else if (p.category === "Email Campaigns") counts.EMAIL++;
    });
    return counts;
  }, []);

  // Helper to resolve artwork (real project image OR generated WebP first-page PDF cover)
  const getProjectArtwork = useCallback((project: Project): string => {
    if (project.image && project.image.trim() !== "") {
      return project.image;
    }
    const manifestEntry = (pdfCoversManifest as Record<string, { coverPath: string }>)[project.id];
    if (manifestEntry?.coverPath) {
      return manifestEntry.coverPath;
    }
    return "";
  }, []);

  // Filter and Interleave projects for the Vault
  const filteredProjects = useMemo(() => {
    const activeFilterObj = VAULT_FILTERS.find((f) => f.id === selectedFilter);

    if (selectedFilter === "ALL" || !activeFilterObj?.category) {
      // Balanced interleaving across all 5 categories for a rich showcase
      const grouped = VAULT_FILTERS.reduce((acc, f) => {
        if (f.id === "ALL" || !f.category) return acc;
        acc[f.id] = projectsData.filter((p) => p.category === f.category);
        return acc;
      }, {} as Record<string, Project[]>);

      const interleaved: Project[] = [];
      let hasMoreItems = true;
      let index = 0;

      while (hasMoreItems) {
        hasMoreItems = false;
        for (const f of VAULT_FILTERS) {
          if (f.id === "ALL" || !f.category) continue;
          const list = grouped[f.id];
          if (list && index < list.length) {
            interleaved.push(list[index]);
            hasMoreItems = true;
          }
        }
        index++;
      }

      return interleaved;
    }
    
    return projectsData.filter((project) => project.category === activeFilterObj.category);
  }, [selectedFilter]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // Construct flat list of all slides for Lightbox with valid image covers
  const allImageSlides = useMemo(() => {
    return filteredProjects.reduce<{ src: string; title: string; description: string }[]>((acc, p) => {
      const art = getProjectArtwork(p);
      if (art) {
        acc.push({ src: art, title: p.title, description: p.category });
      }
      return acc;
    }, []);
  }, [filteredProjects, getProjectArtwork]);

  const handleOpenLightbox = useCallback((artworkSrc: string) => {
    const idx = allImageSlides.findIndex((s) => s.src === artworkSrc);
    if (idx !== -1) {
      setPhotoIndex(idx);
    } else {
      setPhotoIndex(0);
    }
    setIsOpen(true);
  }, [allImageSlides]);

  const handleCardClick = useCallback((project: Project) => {
    if (project.pdf && project.pdf.endsWith(".pdf")) {
      setActivePdf(project.pdf);
    } else {
      const art = getProjectArtwork(project);
      if (art) {
        handleOpenLightbox(art);
      }
    }
  }, [getProjectArtwork, handleOpenLightbox]);

  // Callback for CategoryStory component
  const handleOpenProjectFromStory = useCallback((project: Project) => {
    if (project.pdf && project.pdf.endsWith(".pdf")) {
      setActivePdf(project.pdf);
    } else if (project.image) {
      handleOpenLightbox(project.image);
    }
  }, [handleOpenLightbox]);

  const handleExploreVault = (slug: string) => {
    const mapping: Record<string, VaultFilterId> = {
      web: "WEB",
      branding: "BRANDING",
      social: "SOCIAL",
      editorial: "EDITORIAL",
      email: "EMAIL",
      ailab: "ALL",
    };

    if (mapping[slug]) {
      setSelectedFilter(mapping[slug]);
      setVisibleCount(12);
    }
    const vaultEl = document.getElementById("vault");
    if (vaultEl) {
      if (typeof window !== "undefined" && (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts: { offset: number }) => void } }).__lenis) {
        (window as unknown as { __lenis: { scrollTo: (target: HTMLElement, opts: { offset: number }) => void } }).__lenis.scrollTo(vaultEl, { offset: -60 });
      } else {
        vaultEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const hasMore = visibleCount < filteredProjects.length;

  return (
    <div className="bg-[#030712] text-white relative">
      
      {/* ========================================================
          1. PINNED / SCROLL-DRIVEN CATEGORY STORY STAGE
      ======================================================== */}
      <CategoryStory
        onSelectProject={handleOpenProjectFromStory}
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

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 border border-white/10 bg-white/5 rounded-full px-4 py-2 self-start md:self-auto">
              <Layers className="h-3.5 w-3.5 text-[#15803D]" />
              <span>SHOWING {visibleProjects.length} OF {filteredProjects.length}</span>
            </div>
          </div>

          {/* Category Filter Tabs (Scrollable on mobile, flex-wrap on desktop) */}
          <div
            role="tablist"
            aria-label="Filter Projects by Category"
            className="flex items-center gap-2 mb-12 overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VAULT_FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter.id;
              const count = filterCounts[filter.id] ?? 0;

              return (
                <button
                  key={filter.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="vault-grid"
                  onClick={() => {
                    setSelectedFilter(filter.id);
                    setVisibleCount(12);
                  }}
                  className={`shrink-0 flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                    isSelected
                      ? "bg-[#CCFF00] text-[#030712] font-black shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                      : "bg-[#0C111D] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isSelected
                        ? "bg-[#030712] text-[#CCFF00]"
                        : "bg-white/10 text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3-Column Responsive Grid */}
          <div
            id="vault-grid"
            role="region"
            aria-label="Projects Catalog Grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleProjects.map((project) => {
              const artwork = getProjectArtwork(project);
              const isPdf = Boolean(project.pdf && project.pdf.endsWith(".pdf"));

              return (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  aria-label={isPdf ? `Read publication: ${project.title}` : `View project: ${project.title}`}
                  onClick={() => handleCardClick(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(project);
                    }
                  }}
                  data-cursor={isPdf ? "read" : "view"}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0C111D] border border-white/10 hover:border-[#CCFF00]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070D18]"
                >
                  {/* Media Container */}
                  <div className="relative w-full aspect-[4/3] bg-[#030712] overflow-hidden flex items-center justify-center border-b border-white/5">
                    {artwork ? (
                      <Image
                        src={artwork}
                        alt={project.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#0C111D] flex items-center justify-center text-zinc-500 font-mono text-xs">
                        NO PREVIEW AVAILABLE
                      </div>
                    )}

                    {/* Format Badge (Top Left) */}
                    <div className="absolute top-3 left-3 z-10">
                      {isPdf ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030712]/80 backdrop-blur-md border border-[#CCFF00]/40 text-[#CCFF00] text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                          <FileText className="w-3 h-3 text-[#CCFF00]" />
                          PDF PUBLICATION
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030712]/75 backdrop-blur-md border border-white/15 text-zinc-300 text-[10px] font-mono tracking-wider uppercase shadow-md">
                          VISUAL ARTWORK
                        </span>
                      )}
                    </div>

                    {/* Desktop Hover Overlay (Action Reveal) */}
                    <div className="absolute inset-0 bg-[#030712]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col items-center justify-center p-6 z-20">
                      <span className="text-[10px] text-[#CCFF00] font-mono tracking-widest uppercase mb-2">
                        {project.category}
                      </span>
                      <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white text-center mb-6 max-w-[260px] line-clamp-2">
                        {project.title}
                      </h4>

                      <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                        {isPdf && (
                          <button
                            type="button"
                            data-cursor="open"
                            onClick={() => setActivePdf(project.pdf!)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CCFF00] text-[#030712] font-black text-xs font-mono uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] cursor-pointer"
                            aria-label={`Read full PDF for ${project.title}`}
                          >
                            <FileText size={13} />
                            <span>READ PDF</span>
                          </button>
                        )}

                        {artwork && (
                          <button
                            type="button"
                            data-cursor="open"
                            onClick={() => handleOpenLightbox(artwork)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-mono text-xs uppercase tracking-wider hover:bg-white/15 hover:border-white transition-colors cursor-pointer"
                            aria-label={`Inspect artwork for ${project.title}`}
                          >
                            <Eye size={13} />
                            <span>INSPECT</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta (Always legible on mobile and desktop) */}
                  <div className="p-4 flex items-center justify-between gap-3 bg-[#0C111D]">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#CCFF00]/80 block truncate">
                        {project.category}
                      </span>
                      <h5 className="text-sm font-bold text-white tracking-tight truncate mt-0.5">
                        {project.title}
                      </h5>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 group-hover:border-[#CCFF00] group-hover:text-[#CCFF00] group-hover:bg-[#CCFF00]/10 transition-colors">
                      {isPdf ? <FileText className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
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
          aria-label="PDF Document Viewer"
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
                  data-cursor="open"
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

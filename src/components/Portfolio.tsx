"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FileText, Eye, ArrowUpRight } from "lucide-react";
import { projectsData, Project } from "@/data/projects";

// Import yet-another-react-lightbox
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const CATEGORIES = [
  "All",
  "Website & Landing Pages",
  "Email Campaigns",
  "Magazine Advertisements",
  "Print Media & Branding",
  "Social Media Creatives",
] as const;

type CategoryType = typeof CATEGORIES[number];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  
  // Lightbox State
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Filter and Interleave projects
  const filteredProjects = useMemo(() => {
    setVisibleCount(6); // Reset pagination on category change
    
    if (selectedCategory === "All") {
      // Group projects by category
      const grouped = CATEGORIES.reduce((acc, cat) => {
        if (cat === "All") return acc;
        acc[cat] = projectsData.filter((p) => p.category === cat);
        return acc;
      }, {} as Record<string, Project[]>);

      // Round-robin selection to mix categories evenly
      const interleaved: Project[] = [];
      let hasMoreItems = true;
      let index = 0;

      while (hasMoreItems) {
        hasMoreItems = false;
        for (const cat of CATEGORIES) {
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

  // Construct slides from active projects that contain images
  const slides = useMemo(() => {
    return filteredProjects
      .filter((p) => p.image !== "")
      .map((p) => ({ src: p.image }));
  }, [filteredProjects]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleCardClick = (project: Project) => {
    if (!project.image && project.pdf) {
      // PDF-only booklet publication: open in new tab
      window.open(project.pdf, "_blank");
      return;
    }
    // Find index of the image in the slides list
    const slideIdx = slides.findIndex((s) => s.src === project.image);
    if (slideIdx !== -1) {
      setPhotoIndex(slideIdx);
      setIsOpen(true);
    }
  };

  const hasMore = visibleCount < filteredProjects.length;

  return (
    <section id="portfolio" className="py-24 bg-[#f9fafb] border-b border-zinc-200 relative overflow-hidden">
      {/* Background drifting shapes (light theme variant) */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#15803d]/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#15803d]/5 rounded-full blur-3xl pointer-events-none animate-drift-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="text-[#15803d] text-sm font-bold uppercase tracking-wider mb-2">
            My Creative Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-zinc-900 uppercase">
            RECENT PORTFOLIO
          </h2>
          <div className="w-12 h-1 bg-[#15803d] mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#15803d] text-white border-[#15803d]"
                  : "bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => {
            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-[#15803d]/30 transition-all duration-500 hover:-translate-y-1 animate-fade-in cursor-pointer shadow-sm"
                style={{
                  animationDelay: `${(index % 6) * 0.05}s`,
                }}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-video md:aspect-[4/3] bg-zinc-100 overflow-hidden flex items-center justify-center border-b border-zinc-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      loading="lazy"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    // Fallback cover for PDF-only booklet items (light theme variant)
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 via-zinc-50 to-zinc-200 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#15803d] mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FileText size={32} />
                      </div>
                      <span className="text-xs uppercase tracking-wider text-[#15803d] font-semibold mb-1">
                        {project.category}
                      </span>
                      <span className="text-sm font-semibold text-zinc-500 uppercase max-w-[200px] truncate">
                        PDF Document
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#030712]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 z-10">
                    <span className="text-xs text-accent font-semibold tracking-wider uppercase mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold font-display uppercase tracking-wide text-white text-center mb-6 max-w-[280px]">
                      {project.title}
                    </h3>
                    
                    <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                      {project.pdf ? (
                        <a
                          href={project.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-background font-bold text-xs uppercase tracking-wider hover:bg-accent-hover transition-colors duration-200"
                        >
                          <FileText size={14} />
                          Read Booklet
                        </a>
                      ) : null}

                      {project.image ? (
                        <button
                          onClick={() => handleCardClick(project)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                        >
                          <Eye size={14} />
                          View Work
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Info Footer on Card */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-bold text-[#15803d] uppercase tracking-widest block mb-1.5">
                      {project.category}
                    </span>
                    <h4 className="text-base font-bold font-display uppercase tracking-wide text-zinc-900 truncate">
                      {project.title}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">
                    <span>{project.pdf ? "PDF Publication" : "Digital Asset"}</span>
                    <ArrowUpRight size={16} className="text-[#15803d]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button Wrapper */}
        <div className="mt-16 flex justify-center">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              className="px-8 py-3.5 rounded-full border border-[#15803d]/40 text-[#15803d] font-bold uppercase tracking-wider hover:bg-[#15803d] hover:text-white hover:border-[#15803d] transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
            >
              Load More Projects ({filteredProjects.length - visibleCount} Left)
            </button>
          ) : (
            <button
              disabled
              className="px-8 py-3.5 rounded-full border border-zinc-200 text-zinc-400 bg-zinc-100 font-bold uppercase tracking-wider cursor-not-allowed"
            >
              That's all my projects
            </button>
          )}
        </div>
      </div>

      {/* Full-Screen Image Lightbox with Zoom and Pan */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={slides}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 1.5,
            doubleTapDelay: 300,
          }}
          styles={{
            container: { backgroundColor: "rgba(3, 7, 18, 0.95)" },
            button: { color: "#ccff00" },
          }}
        />
      )}

      {/* Animation Utility inline styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

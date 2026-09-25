"use client";

import { useEffect, useState } from "react";
import { PRESENTATION_CATEGORIES } from "@/data/categoryMapping";

interface CategoryNavigationProps {
  activeCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function CategoryNavigation({
  activeCategory = "cat-01",
  onSelectCategory,
}: CategoryNavigationProps) {
  const [currentActive, setCurrentActive] = useState(activeCategory);

  useEffect(() => {
    // IntersectionObserver to auto-update active category on scroll
    const sectionIds = PRESENTATION_CATEGORIES.map((c) => c.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (categoryId: string) => {
    setCurrentActive(categoryId);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      const el = document.getElementById(categoryId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="sticky top-20 z-40 w-full py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
        <nav
          aria-label="Portfolio Category Navigation"
          className="pointer-events-auto flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar rounded-full border border-white/10 bg-[#0C111D]/85 p-1.5 backdrop-blur-xl shadow-2xl max-w-full"
        >
          {PRESENTATION_CATEGORIES.map((cat) => {
            const isActive = currentActive === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-mono font-medium tracking-wider transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-[#CCFF00] cursor-pointer ${
                  isActive
                    ? "bg-[#CCFF00] text-[#030712] font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={isActive ? "text-[#030712]/70 font-semibold" : "text-zinc-500 group-hover:text-zinc-300"}>
                  {cat.number}
                </span>
                <span className="uppercase">{cat.slug}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

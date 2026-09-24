"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("work");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "[WORK]", href: "#portfolio", id: "portfolio" },
    { label: "[ABOUT]", href: "#about", id: "about" },
    { label: "[CONTACT]", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 200;
      const sections = ["portfolio", "about", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-full px-4">
      {/* 
        Obsidian dark frosted capsule:
        Guarantees 100% crisp, bold legibility over both dark hero and white body sections.
      */}
      <nav
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.15)]"
        style={{
          backgroundColor: "rgba(9, 13, 22, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-200 font-semibold cursor-pointer ${
                isActive
                  ? "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

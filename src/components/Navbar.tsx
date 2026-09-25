"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "WORK", href: "#portfolio", id: "portfolio" },
    { label: "ABOUT", href: "#about", id: "about" },
    { label: "SERVICES", href: "#services", id: "services" },
    { label: "CREDENTIALS", href: "#credentials", id: "credentials" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 250;
      const sections = ["home", "portfolio", "about", "services", "credentials", "contact"];
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 pointer-events-auto`}
      >
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 border ${
            isScrolled
              ? "bg-[#090d16]/90 backdrop-blur-xl border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              : "bg-[#0c111d]/70 backdrop-blur-md border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Monogram */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-full px-2 py-1"
            data-cursor="link"
            aria-label="Varun Chauhan Home"
          >
            <span className="text-sm font-black font-display tracking-widest text-white uppercase group-hover:text-[#ccff00] transition-colors">
              VARUN<span className="text-[#ccff00]">.</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-white/50 border-l border-white/15 pl-2">
              AI × DESIGN
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="link"
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
                    isActive
                      ? "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                      : "text-zinc-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              data-cursor="explore"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ccff00] text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#d8ff33] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(204,255,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>CONNECT</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 md:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#ccff00] font-bold">
              NAVIGATION // DIRECTORY
            </span>

            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold font-display uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={20} className="text-white/40" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Drawer Bottom Actions */}
          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-[#ccff00] text-black font-bold font-mono text-center text-sm uppercase tracking-wider shadow-[0_8px_24px_rgba(204,255,0,0.3)]"
            >
              START A PROJECT
            </a>
            <div className="flex justify-between items-center text-xs font-mono text-white/60 pt-2">
              <span>NEW DELHI, INDIA</span>
              <span>c.graphics00@gmail.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

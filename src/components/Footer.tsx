"use client";

import { Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 border-t border-border-dark py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo/Name */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-lg font-bold tracking-wider font-display uppercase text-white">
            VARUN<span className="text-accent">.</span>CHAUHAN
          </span>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wide">
            Senior Graphic & Web Designer
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/varun-chauhan-designer/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="mailto:c.graphics00@gmail.com"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Right: Copyright & Top Button */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-xs text-text-muted/60 uppercase tracking-wider">
            © {new Date().getFullYear()} Varun Chauhan. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center hover:bg-accent-hover transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

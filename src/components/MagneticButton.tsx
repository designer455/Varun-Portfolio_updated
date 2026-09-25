"use client";

import React, { useRef, useCallback } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // Max pull in px (default: 14)
  className?: string;
  asAnchor?: boolean;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  strength = 14,
  className = "",
  asAnchor = false,
  href,
  download,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      // Ignore on touch devices
      if (e.pointerType === "touch") return;

      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const pullX = Math.max(-strength, Math.min(strength, deltaX * strength));
      const pullY = Math.max(-strength, Math.min(strength, deltaY * strength));

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (el) {
          el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        }
      });
    },
    [strength]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const el = elementRef.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate3d(0px, 0px, 0)";
  }, []);

  const handlePointerEnter = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    el.style.transition = "transform 0.1s ease-out";
  }, []);

  if (asAnchor && href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerEnter={handlePointerEnter}
        className={`inline-block will-change-transform ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

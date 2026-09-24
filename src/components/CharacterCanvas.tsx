"use client";

import React, { useEffect, useRef, useState } from "react";

interface CharacterCanvasProps {
  className?: string;
  onStateChange?: (state: { isCenter: boolean; angleDeg: number; direction: string }) => void;
}

// 8 Compass Direction names
function getDirectionName(deg: number): string {
  if (deg >= 337.5 || deg < 22.5) return "UP";
  if (deg >= 22.5 && deg < 67.5) return "UP-RIGHT";
  if (deg >= 67.5 && deg < 112.5) return "RIGHT";
  if (deg >= 112.5 && deg < 157.5) return "DOWN-RIGHT";
  if (deg >= 157.5 && deg < 202.5) return "DOWN";
  if (deg >= 202.5 && deg < 247.5) return "DOWN-LEFT";
  if (deg >= 247.5 && deg < 292.5) return "LEFT";
  return "UP-LEFT";
}

// Shortest-path angular lerp
function lerpAngle(current: number, target: number, factor: number): number {
  let diff = (target - current) % (2 * Math.PI);
  if (diff < -Math.PI) diff += 2 * Math.PI;
  if (diff > Math.PI) diff -= 2 * Math.PI;
  return current + diff * factor;
}

export default function CharacterCanvas({ className = "", onStateChange }: CharacterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // References for animation loop
  const framesRef = useRef<HTMLImageElement[]>([]);
  const centerFrameRef = useRef<HTMLImageElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const currentAngleRef = useRef<number>(0);
  const isNearCenterRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);

  // Preload all 128 frames + center frame for ultra-smooth 60 FPS motion
  useEffect(() => {
    let mounted = true;
    const totalFrames = 128;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Center frame
    const centerImg = new Image();
    centerImg.src = "/frames/center.webp";
    centerFrameRef.current = centerImg;

    const checkAllLoaded = () => {
      loadedCount++;
      if (mounted) {
        setLoadProgress(Math.round((loadedCount / (totalFrames + 1)) * 100));
        if (loadedCount >= totalFrames) {
          setIsLoaded(true);
        }
      }
    };

    centerImg.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d", { alpha: false });
        if (ctx) {
          ctx.drawImage(centerImg, 0, 0, 1280, 720);
        }
      }
      checkAllLoaded();
    };
    centerImg.onerror = checkAllLoaded;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i}.webp`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      images.push(img);
    }
    framesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Viewport-wide cursor tracking
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleMouseLeave = () => {
      // When cursor leaves viewport, smoothly reset to center direct eye contact
      mousePosRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 60 FPS RequestAnimationFrame Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let lastDirection = "CENTER";
    let lastAngleDeg = 0;
    let lastIsCenter = true;

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const screenAR = w / h;
      const videoAR = 1280 / 720;

      // In full-screen object-cover mode:
      // Character is centered horizontally (x = 50% of viewport)
      const faceCenterX = w * 0.5;

      // Vertical position of face center in video (y = 270 in 720p height)
      let faceCenterY: number;
      if (screenAR > videoAR) {
        const renderedH = w / videoAR;
        const offsetY = (h - renderedH) / 2;
        faceCenterY = offsetY + (270 / 720) * renderedH;
      } else {
        faceCenterY = (270 / 720) * h;
      }

      let isCenter = false;
      let targetAngle = currentAngleRef.current;

      if (!mousePosRef.current) {
        isCenter = true;
      } else {
        const dx = mousePosRef.current.x - faceCenterX;
        const dy = mousePosRef.current.y - faceCenterY;
        const dist = Math.hypot(dx, dy);

        // Direction bearing from face center to cursor
        // UP: 0 rad (0°), RIGHT: PI/2 (90°), DOWN: PI (180°), LEFT: 3PI/2 (270°)
        let rawAngle = Math.atan2(dx, -dy);
        if (rawAngle < 0) rawAngle += 2 * Math.PI;
        targetAngle = rawAngle;

        // Tight ~5.5% screen radius deadzone focused right on eyes/nose
        // So moving cursor upwards towards the navbar immediately triggers the UP gaze
        const screenRadius = Math.min(w, h);
        const deadzoneRadius = screenRadius * 0.055;

        if (dist < deadzoneRadius) {
          isCenter = true;
        }
      }

      isNearCenterRef.current = isCenter;

      // Shortest-path angular lerp with factor ~0.20 for responsive, silky-smooth head turning
      currentAngleRef.current = lerpAngle(currentAngleRef.current, targetAngle, 0.20);

      // Select frame
      let imgToDraw: HTMLImageElement | null = null;
      let angleDeg = 0;
      let dirName = "CENTER";

      if (isCenter) {
        imgToDraw = centerFrameRef.current;
        dirName = "CENTER";
        angleDeg = 0;
      } else {
        let norm = currentAngleRef.current % (2 * Math.PI);
        if (norm < 0) norm += 2 * Math.PI;

        angleDeg = Math.round((norm * 180) / Math.PI);
        dirName = getDirectionName(angleDeg);

        const frameIndex = Math.round((norm / (2 * Math.PI)) * 128) % 128;
        imgToDraw = framesRef.current[frameIndex] || centerFrameRef.current;
      }

      // Draw EXACTLY ONE crisp frame at 100% opacity (no alpha-blend ghosting)
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        ctx.drawImage(imgToDraw, 0, 0, 1280, 720);
      }

      if (onStateChange && (isCenter !== lastIsCenter || Math.abs(angleDeg - lastAngleDeg) >= 2)) {
        lastIsCenter = isCenter;
        lastAngleDeg = angleDeg;
        lastDirection = dirName;
        onStateChange({ isCenter, angleDeg, direction: dirName });
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [onStateChange]);

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${className}`}>
      {/* 
        CRITICAL CONSTRAINTS MAINTAINED:
        1. NO CSS 3D TRANSFORMS (no perspective, rotateX, rotateY).
        2. Rock-solid motionless canvas (100vw, 100vh, object-fit: cover).
        3. Seamless background matching #DD140E.
      */}
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-full object-cover select-none pointer-events-none block"
        style={{
          backgroundColor: "#030712",
        }}
      />

      {!isLoaded && (
        <div className="absolute inset-0 bg-[#030712] flex flex-col items-center justify-center text-white/80 pointer-events-none transition-opacity duration-300 z-10">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3" />
          <p className="text-xs uppercase tracking-widest font-mono text-white/70">
            Loading Vision {loadProgress}%
          </p>
        </div>
      )}
    </div>
  );
}

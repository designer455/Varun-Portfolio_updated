# VARUN CHAUHAN — PORTFOLIO ANIMATION GUIDELINES
**Version:** 2.0.0  
**Target:** Cinematic Motion Design & Physics Tokens  
**Guiding Principle:** "Every animation must inform, guide, or elevate—never distract."

---

## 1. MOTION PHILOSOPHY & AESTHETIC LAWS

The motion system is inspired by luxury industrial design and modern editorial cinematography (referencing benchmarks like Neha Yadav and Ritik Singh):

1. **Weight & Deceleration (No Rubber-Banding):**
   - Elements accelerate quickly and decelerate smoothly with heavy physical presence.
   - Bouncy, cartoonish, or elastic springs (`bounce`, `back-out`) are strictly prohibited.
2. **Layered Staggering:**
   - Content reveals in orchestrated cascades: Section Header $\rightarrow$ Subtext $\rightarrow$ Media Canvas $\rightarrow$ Action Buttons.
   - Stagger delay between sequential elements is strictly bounded to `0.06s`–`0.10s` to prevent sluggish loading perceptions.
3. **GPU-Bound Properties Only:**
   - Only `transform` and `opacity` may be animated continuously. Layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`) are strictly forbidden from transition loops.

---

## 2. ANIMATION TOKENS & EASING CURVES

### Standard Duration Scale
| Token | Duration | Purpose |
| :--- | :--- | :--- |
| **`DURATION_INSTANT`** | `100ms` | Immediate press/active states, checkbox toggles |
| **`DURATION_FAST`** | `200ms`–`250ms` | Cursor scaling, magnetic release, tooltip fades |
| **`DURATION_NORMAL`** | `350ms`–`400ms` | Button hover expansions, card border transitions |
| **`DURATION_SLOW`** | `600ms`–`750ms` | Text line reveals, modal slide-ins, drawer transitions |
| **`DURATION_CINEMATIC`**| `900ms`–`1200ms`| Hero entrance sequence, full category transitions |
| **`DURATION_AMBIENT`** | `12s`–`24s` | Background atmospheric drift, infinite marquee ticker |

### Easing Function Tokens (CSS & JS)
```css
:root {
  /* Cinematic Ease-Out (The Signature Curve: rapid onset, long luxurious deceleration) */
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);

  /* Smooth S-Curve (For bidirectional transforms, modals, drawers) */
  --ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);

  /* Quick Responsive Curve (For micro-interactions, magnetic hover) */
  --ease-snappy: cubic-bezier(0.25, 1, 0.5, 1);

  /* Linear (For continuous marquees & 360 canvas lerps) */
  --ease-linear: linear;
}
```

---

## 3. CORE MOTION RECIPES

### Recipe 1: Kinetic Text Line-Mask Reveal
Used on all Display XL, Display L, and H1 section headings.
```css
.text-line-wrapper {
  overflow: hidden;
  display: block;
}

.text-line-content {
  display: block;
  transform: translateY(115%);
  opacity: 0;
  transition: transform 0.75s var(--ease-cinematic), opacity 0.75s var(--ease-cinematic);
  will-change: transform, opacity;
}

.in-view .text-line-content {
  transform: translateY(0%);
  opacity: 1;
}
```

### Recipe 2: Image Mask Inset Reveal
Used when project cards or category heroes cross into the viewport.
```css
.image-reveal-wrapper {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.85s var(--ease-cinematic);
  will-change: clip-path;
}

.image-reveal-inner {
  transform: scale(1.15);
  transition: transform 0.95s var(--ease-cinematic);
  will-change: transform;
}

.in-view .image-reveal-wrapper {
  clip-path: inset(0% 0 0 0);
}

.in-view .image-reveal-inner {
  transform: scale(1.0);
}
```

### Recipe 3: Infinite Brand Marquee Ticker
Used for the client/partner trust bar.
```css
@keyframes marqueeScroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marqueeScroll 35s linear infinite;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}
```

---

## 4. ACCESSIBILITY & REDUCED MOTION SPECIFICATION

When the user has configured their OS for reduced motion (`prefers-reduced-motion: reduce`):
1. **Disable Parallax & Gyroscopic 3D:** All `perspective()`, `rotateX()`, and `rotateY()` card tilts revert to flat `0deg`.
2. **Collapse Translates to Opacity:** Text and card reveals transition strictly via gentle opacity fades (`opacity: 0 -> 1`) with zero coordinate translation.
3. **Disable Virtual Smooth Scroll:** Lenis smooth scrolling is completely bypassed, allowing native immediate OS scrolling.
4. **Custom Cursor:** Trailing aura ring inertia is removed; the dot locks directly to the hardware cursor coordinates.

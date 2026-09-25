# VARUN CHAUHAN — PORTFOLIO DESIGN SYSTEM SPECIFICATION
**Version:** 2.0.0 (Obsidian Cinematic System)  
**Target:** AI-Powered Creative Technologist Digital Experience  
**Core Positioning:** `VARUN CHAUHAN — AI × DESIGN × DEVELOPMENT`

---

## 1. DESIGN PHILOSOPHY & BRAND IDENTITY

The new portfolio is engineered as **"An interactive digital product disguised as a personal portfolio."**

Rather than presenting a passive resume or static gallery of cards, the interface functions as a precision-crafted, high-performance digital environment. It conveys technical mastery across the entire digital pipeline: from high-fidelity visual design (Photoshop, Illustrator, CorelDRAW) through generative AI and MCP workflow orchestration to full-stack code, server architectures, and production deployment.

### Aesthetic Principles
1. **Obsidian Monolith (Unified Darkness):** A cohesive, cinematic dark world. No jarring alternating light/dark sections. Every surface is an elevation of obsidian, glass, or subtle charcoal.
2. **Editorial Typographic Stance:** High-contrast typographic scale pairing massive, confident display headlines with ultra-clean, technical monospace metadata and legible humanistic body prose.
3. **Restrained Luminescence:** The electric lime accent (`#CCFF00`) and emerald glow (`#15803D`) are surgical instruments—reserved for focus, cursor physics, active states, and micro-telemetry.
4. **Tactile Digital Materials:** Translucent dark obsidian acrylics, frosted borders with 1px light catches, controlled background blur, and atmospheric film grain.

---

## 2. COLOR PALETTE & SURFACE ELEVATION TOKENS

The color system is organized into a 5-tier elevation model built on a pure obsidian baseline.

```
Elevation 4 (Overlays / Modals / Cursor)     [rgba(12, 17, 29, 0.85) + 24px blur + border-white/15]
Elevation 3 (Floating Cards / Interactive)   [rgba(12, 17, 29, 0.65) + 16px blur + border-white/10]
Elevation 2 (Surface / Panels / Sections)    [#0C111D / rgba(255, 255, 255, 0.03)]
Elevation 1 (Canvas Bed / Base Panels)       [#060B15]
Elevation 0 (Deep Obsidian Background)       [#030712]
```

### Color Tokens (Tailwind v4 & CSS Variables)
```css
:root {
  /* Surface System */
  --color-bg-base: #030712;         /* Deep Obsidian */
  --color-bg-subtle: #060B15;       /* Elevated base */
  --color-surface-panel: #0C111D;   /* Panel dark */
  --color-surface-glass: rgba(12, 17, 29, 0.65);
  --color-surface-elevated: rgba(18, 26, 43, 0.80);
  
  /* Borders & Dividers */
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  --color-border-glass: rgba(255, 255, 255, 0.12);
  --color-border-highlight: rgba(255, 255, 255, 0.22);
  --color-border-accent: rgba(204, 255, 0, 0.35);

  /* Primary Accent: Electric Lime */
  --color-accent-lime: #CCFF00;
  --color-accent-lime-hover: #D8FF33;
  --color-accent-lime-dim: rgba(204, 255, 0, 0.15);
  --color-accent-lime-glow: rgba(204, 255, 0, 0.35);

  /* Secondary Accent: Deep Emerald / Technical Green */
  --color-accent-emerald: #15803D;
  --color-accent-emerald-glow: rgba(21, 128, 61, 0.30);

  /* Text & Typography */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #CBD5E1;   /* Slate 300 */
  --color-text-muted: #94A3B8;       /* Slate 400 */
  --color-text-dim: #64748B;         /* Slate 500 */
  --color-text-accent: #CCFF00;
}
```

---

## 3. TYPOGRAPHY SYSTEM

### Typeface Evaluation & Roles
1. **Outfit (`--font-display`):** The primary display and headline face. Modern, geometric, confident, and crisp with tight tracking at large scales.
2. **Inter (`--font-sans`):** The core reading and body face. Neutral, humanistic, and engineered for high legibility on high-density screens.
3. **JetBrains Mono / System Monospace (`--font-mono`):** Technical data, telemetry timestamps, MCP status indicators, category numerals, and file metadata.
4. **Dancing Script (`--font-cursive`):** Evaluated from the existing project. Retained selectively as a bespoke signature watermark in the hero or about closing signoff, but excluded from primary UI headings to maintain an authoritative architectural stance.

### Typographic Scale & Hierarchy
| Level | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XL** | Outfit | `7.5rem (120px) / 3.75rem (60px)` | 900 | 0.95 | `-0.04em` | Hero Statement, Cinematic Category Titles |
| **Display L** | Outfit | `5.0rem (80px) / 2.75rem (44px)` | 900 | 1.00 | `-0.03em` | Section Master Titles ("AI LAB", "WORK") |
| **Display M** | Outfit | `3.5rem (56px) / 2.25rem (36px)` | 800 | 1.05 | `-0.03em` | Category Hero Headlines, Featured Projects |
| **H1** | Outfit | `2.5rem (40px) / 1.75rem (28px)` | 800 | 1.15 | `-0.02em` | Project Titles, Timeline Milestones |
| **H2** | Outfit | `1.75rem (28px) / 1.35rem (22px)`| 700 | 1.25 | `-0.01em` | Card Headlines, Subsection Headers |
| **H3** | Outfit / Inter | `1.25rem (20px) / 1.10rem (18px)`| 600 | 1.35 | `0.00em` | Group Subheadings, Modal Headers |
| **Body Large** | Inter | `1.125rem (18px) / 1.0rem (16px)`| 400 | 1.65 | `-0.01em` | Section Introductions, Case Summaries |
| **Body Regular**| Inter | `0.9375rem (15px) / 0.875rem (14px)`| 400 | 1.60 | `0.00em` | Standard Body, Project Descriptions |
| **Label / Button**| Inter / Outfit | `0.8125rem (13px) / 0.75rem (12px)`| 700 | 1.00 | `+0.08em` | Action Pills, Filter Buttons (Uppercase) |
| **Meta / Mono** | JetBrains Mono| `0.75rem (12px) / 0.6875rem (11px)`| 500 | 1.40 | `+0.06em` | Category Numbers (`01 // 06`), Telemetry |
| **Caption** | Inter | `0.75rem (12px) / 0.6875rem (11px)`| 400 | 1.50 | `+0.01em` | Image Captions, Legal Notices |

---

## 4. LAYOUT, GRIDS & SPATIAL CADENCE

### Grid Architecture
- **Desktop (1280px+):** 12-Column Responsive Grid | `max-w-[1440px]` container | 24px gutter | 48px to 64px horizontal margin padding.
- **Tablet (768px – 1279px):** 8-Column Grid | 20px gutter | 32px horizontal padding.
- **Mobile (320px – 767px):** 4-Column Grid | 16px gutter | 20px horizontal padding.

### Vertical Spacing & Rhythm Tokens
- **Section Interval:** `py-28` to `py-36` on desktop (112px–144px), `py-20` on mobile (80px). Generous breathing room gives weight to each major section.
- **Hero Viewport:** `100dvh` (Dynamic Viewport Height) ensuring zero address-bar jitter on iOS and Android.
- **Card Gaps:** `gap-8` on desktop (32px), `gap-5` on mobile (20px).
- **Element Spacing:** Standardized scale (`4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`).

---

## 5. SURFACE DEPTH, ELEVATION & BORDERS

### Glassmorphism & Translucency Spec
- Panels use dark acrylic transparency with hardware-accelerated backdrop blur (`backdrop-blur-md` or `backdrop-blur-xl`).
- Every glass card features a dual-layer border treatment:
  - Base: `border border-white/10`
  - Hover / Active: `border-accent/40` with `shadow-[0_0_24px_rgba(204,255,0,0.12)]`
- **Subtle Film Grain / Noise Overlay:** A persistent, fixed SVG noise layer at 2.5% opacity overlaying the background, removing digital flat-banding from dark gradients.

### Radius Scale
- `rounded-full`: Pill buttons, active badges, status chips, navbar capsule.
- `rounded-2xl` (16px): Standard project cards, timeline nodes, certificate cards.
- `rounded-3xl` (24px): Category hero containers, full-bleed media wrappers, modal containers.
- `rounded-xl` (12px): Inner micro-panels, code blocks, thumbnail containers.

---

## 6. DESIGN TOKENS SUMMARY TABLE

| Category | Token | Value | Applied To |
| :--- | :--- | :--- | :--- |
| **Color** | `bg-obsidian` | `#030712` | Root body, page background |
| **Color** | `bg-panel` | `#0C111D` | Cards, timeline cards, dialogs |
| **Color** | `accent-lime` | `#CCFF00` | Active states, cursor, primary CTAs |
| **Color** | `accent-emerald`| `#15803D` | Secondary data, badge borders, status |
| **Blur** | `blur-glass` | `16px / backdrop-blur-md` | Glass panels, floating navbar |
| **Border** | `border-subtle`| `rgba(255, 255, 255, 0.08)` | Card borders, horizontal dividers |
| **Border** | `border-glow` | `rgba(204, 255, 0, 0.35)` | Hover state on interactive cards |
| **Shadow** | `shadow-glow` | `0 0 30px rgba(204, 255, 0, 0.15)` | Primary magnetic CTA on hover |
| **Radius** | `radius-card` | `1rem (16px)` | Standard project and media cards |
| **Z-Index** | `z-cursor` | `9999` | Custom cursor dot and aura ring |
| **Z-Index** | `z-navbar` | `50` | Floating navigation capsule |
| **Z-Index** | `z-modal` | `100` | Lightbox, case-study flyouts, video modals |

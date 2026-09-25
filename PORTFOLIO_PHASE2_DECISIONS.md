# VARUN CHAUHAN — PORTFOLIO PHASE 2 DECISIONS & SPECIFICATIONS
**Version:** 2.0.0  
**Phase:** 2 (Design System & Interaction Architecture)  
**Status:** Architecture Formulated | Awaiting User Signoff for Phase 3

---

## 1. ARCHITECTURAL DECISIONS FORMULATED IN PHASE 2

### Decision 1: Unified Obsidian Cinematic Visual Palette
- **Decision:** Abandon the legacy alternating dark $\rightarrow$ light $\rightarrow$ dark section rhythm. The entire website is now unified under the **Obsidian Cinematic System** (`#030712` baseline with `#0C111D` panel elevations, 1px frosted glass borders, and surgical `#CCFF00` electric lime accents).
- **Impact:** Eliminates visual friction, establishes an authoritative luxury aesthetic, and matches high-end benchmarks like Neha Yadav and Ritik Singh.

### Decision 2: 100% Asset Preservation & Non-Destructive Data Model
- **Decision:** All 114 verified projects in `src/data/projects.ts`, 6 certificates, 9 partner organizations, and 129 character frames are strictly preserved.
- **Impact:** Zero data loss. The new design layers over the existing verified data without deletion or destructive schema migrations.

### Decision 3: PDF Publication Visual Upgrade (Cover Extraction)
- **Decision:** In Phase 3, run a headless pipeline to extract the high-resolution first page of each of the 51 PDF publications and save them as lightweight WebP cover thumbnails (`public/assets/portfolio/covers/`).
- **Impact:** Replaces generic grey document placeholders with genuine magazine, catalog, and booklet editorial cover artwork on all cards.

### Decision 4: Interactive AI Lab & "Creative → AI → Build → Ship" Architecture
- **Decision:** Rather than presenting AI as a static badge or bullet point, introduce an interactive workflow architecture showcasing Varun's real toolset: Creative (Photoshop, Illustrator, CorelDRAW) $\rightarrow$ AI (GPT, Claude Code, Gemini, Antigravity) $\rightarrow$ Build (TypeScript, React, APIs, MCP) $\rightarrow$ Ship (GitHub, Vercel, Servers).
- **Impact:** Solidifies Varun's positioning as an **AI-Powered Creative Technologist** in the first 10 seconds of user interaction.

### Decision 5: Non-Blocking High-Performance Custom Cursor
- **Decision:** Isolate custom cursor coordinates and text morphing completely from React state. Coordinates and morphing are updated via DOM refs and GPU transforms inside `requestAnimationFrame`. Automatically disabled on touch screens and reduced motion settings.
- **Impact:** Silky smooth 60–120 FPS cursor physics with 0% impact on React re-render cycles.

---

## 2. DECISIONS REQUIRING USER CONFIRMATION BEFORE PHASE 3

Please review and confirm your approval on these 4 operational choices:

1. **Virtual Smooth Scroll (Lenis):**
   - *Option A (Recommended):* Integrate lightweight Lenis smooth scroll for cinematic momentum, scroll-progress telemetry, and unified wheel inertia across macOS/Windows while leaving mobile touch 100% native.
   - *Option B:* Rely strictly on browser-native scrolling without inertia.

2. **PDF Thumbnail Generation Execution:**
   - *Option A (Recommended):* Authorize automated Python script to extract Page 1 of the 51 PDFs to `.webp` thumbnails so cards display real visual magazine covers.
   - *Option B:* Keep cards as text/icon representation until manual uploads.

3. **Aiju Exports Logo Vector Recreation:**
   - *Option A (Recommended):* Replace the existing empty 0-byte `aijuexports.com.png` with a clean, high-resolution monochrome vector mark for the partner marquee.
   - *Option B:* Remove Aiju Exports from the logo marquee.

4. **Primary Brand Headline Formulation:**
   - *Confirmed Primary:* **VARUN CHAUHAN — AI × DESIGN × DEVELOPMENT**
   - *Confirmed Secondary:* **AI-POWERED CREATIVE TECHNOLOGIST**

---

## 3. PHASE 3 ROADMAP (UPCOMING)

Upon receiving user approval:
1. **Milestone 3.1 — Design Token & Foundation Setup:** Configure `globals.css` with `@theme` obsidian tokens, typography imports, and noise overlay.
2. **Milestone 3.2 — Core Motion Primitives:** Implement `CustomCursor.tsx`, `MagneticButton.tsx`, and `SmoothScroll.tsx`.
3. **Milestone 3.3 — Hero & 360° Character Polish:** Upgrade Hero with Display XL typography, live telemetry HUD, and seamless mobile layout.
4. **Milestone 3.4 — Category Heroes & Real-Work Showcases:** Build the 6 category hero modules featuring authentic creative assets.
5. **Milestone 3.5 — Work Vault & WebP Cover Integration:** Implement the filterable 114-project grid with real visual covers and lightbox inspection.
6. **Milestone 3.6 — AI Lab & Interactive Workflow:** Build the node-graph workflow and interactive Jarvis assistant.
7. **Milestone 3.7 — Credentials & Production Verification:** Clean up ESLint warnings, verify zero-error build, and test responsive viewports.

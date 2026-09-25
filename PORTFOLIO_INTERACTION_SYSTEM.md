# VARUN CHAUHAN — PORTFOLIO INTERACTION SYSTEM SPECIFICATION
**Version:** 2.0.0 (High-Performance Motion & Physics)  
**Target:** Interactive Digital Product Experience  
**Core Principles:** Performance, Intentionality, Seamless Feedback, Accessibility

---

## 1. CUSTOM CURSOR ARCHITECTURE (DESKTOP)

The custom cursor is a core sensory feature of the experience. It serves as an active visual instrument that communicates what action is possible before the user clicks.

### Physics Engine & Structure
- **Dual-Element System:**
  1. `CursorDot`: 8px solid white circular center (`transform: translate3d`). Moves instantaneously with the hardware pointer (`clientX`, `clientY`) with 0ms lag.
  2. `CursorRing`: 40px soft circular aura ring (`transform: translate3d`). Follows the pointer using a continuous requestAnimationFrame shortest-distance linear interpolation (lerp) loop with factor `0.18`.
- **Zero React Re-Renders:** All cursor coordinates, scaling, and typography morphing are managed directly via DOM refs and CSS 3D hardware-accelerated transforms (`translate3d`), guaranteeing 60–120 FPS zero-overhead tracking without triggering React component tree re-renders.

### Interaction Morphing Matrix
| State ID | Trigger Selector | Visual Morph Behavior | Micro-Copy Displayed |
| :--- | :--- | :--- | :--- |
| **`DEFAULT`** | Standard page background / body | 8px dot + 40px subtle aura ring (`opacity: 0.6`) | None |
| **`LINK`** | Standard text links, navbar links | Aura ring expands to 56px (`scale: 1.4`), dot scales to 4px | None |
| **`BUTTON_MAGNETIC`** | Primary & secondary action pills | Aura ring snaps to button center; dot pulls toward pointer | None |
| **`VIEW_PROJECT`** | Project gallery cards & featured reels | Ring expands to 72px pill shape (`bg-lime/90, text-black`) | `VIEW →` (Bold 11px Mono) |
| **`OPEN_PDF`** | Magazine & publication booklet cards | Ring expands to 76px pill shape (`bg-white, text-black`) | `READ ↗` (Bold 11px Mono) |
| **`IMAGE_ZOOM`** | Full-bleed media hero / detail view | Ring expands to 64px circular badge | `ZOOM +` |
| **`DRAG_CAROUSEL`**| Infinite marquees, horizontal sliders | Ring morphs into horizontal pill with dual arrows | `← DRAG →` |
| **`JARVIS_ACTIVE`** | Floating AI assistant trigger button | Ring emits pulsing electric lime aura (`animate-pulse`) | `AI // 01` |

### Accessibility & Fallbacks
- **Touch & Mobile:** Automatically disabled via `window.matchMedia("(pointer: coarse)")`. Native OS touch gestures and taps remain unencumbered.
- **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, the trailing ring inertia is disabled, reverting to an instant native cursor.

---

## 2. MAGNETIC PHYSICS ENGINE

Magnetic interactions are applied to navigation pills, primary CTAs, category triggers, and floating controls.

### Mathematical Model
When the pointer enters within a defined influence radius ($R_{threshold} = 40\text{px}$) of an element's bounding box center $(C_x, C_y)$:
$$\Delta x = \text{Pointer}_x - C_x, \quad \Delta y = \text{Pointer}_y - C_y$$
$$\text{Distance} = \sqrt{\Delta x^2 + \Delta y^2}$$
$$\text{Pull Factor} = \left(1 - \frac{\text{Distance}}{R_{threshold}}\right) \times M_{max}$$

- $M_{max}$ (Maximum Displacement):
  - Primary Hero Buttons: `16px` max pull
  - Navigation Pills: `8px` max pull
  - Floating Icons: `12px` max pull
- **Release Elasticity:** Upon mouse exit, the element snaps back to $(0, 0)$ via CSS transition:
  `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Decoupled State:** Calculation runs in a shared, throttled pointer event listener utilizing `getBoundingClientRect()` cached on mouse enter to eliminate layout thrashing.

---

## 3. SMOOTH SCROLLING & MOMENTUM ARCHITECTURE

### Evaluation: Native vs. Virtual Smooth Scroll (Lenis)
- **Recommendation:** Implement **Lenis** (`@studio-freight/lenis` or `lenis/react`).
- **Rationale:** 
  - Standard CSS `scroll-behavior: smooth` cannot coordinate parallax layer offsets, scroll-driven rotation, or scrubbed timeline progress with frame-perfect consistency.
  - Lenis provides lightweight (~3KB gzipped), non-blocking momentum scrolling that normalizes mousewheel velocity across macOS, Windows, and trackpads while preserving 100% native touch scrolling on iOS and Android.
  - Enables synchronized scroll progress telemetry (`0.00` to `1.00`) used for reading indicators, category transitions, and 3D camera offsets.

---

## 4. SCROLL-DRIVEN REVEAL LANGUAGE

Animations must feel **cinematic, authoritative, and heavyweight**—never bouncy, elastic, or playful.

### Core Reveal Primitives
1. **Kinetic Text Line-Masking (Split-Type Reveal):**
   - Headings are wrapped in `overflow-hidden` line spans.
   - Text enters from `translateY(110%)` to `translateY(0%)` with opacity ramping `0 -> 1`.
   - Duration: `0.75s` | Easing: `cubic-bezier(0.16, 1, 0.3, 1)` | Stagger per line: `0.08s`.
2. **Clipping Mask Image Reveal:**
   - Media containers enter behind an animated CSS `clip-path`:
     `inset(100% 0 0 0)` $\rightarrow$ `inset(0% 0 0 0)`.
   - The underlying image starts scaled at `scale(1.15)` and relaxes to `scale(1.00)`, creating depth.
3. **Card Tilt & Gyroscopic Depth:**
   - On desktop, hovering over project cards calculates 3D rotational tilt:
     `rotateX(calc(-1 * (y - center) / 15)) rotateY(calc((x - center) / 15))` with `perspective(1000px)`.
   - The card's internal glare layer moves oppositely, producing real physical sheen.
4. **Subtle Depth Parallax:**
   - Background grid lines and floating graphic fragments translate at `0.08x` to `0.20x` scroll speed relative to foreground content.

---

## 5. INTERACTIVE 360° CHARACTER ENGINE (HERO & JARVIS)

The existing verified asset library contains **129 high-fidelity WebP character frames** (`public/frames/frame_0.webp` to `frame_127.webp` plus `center.webp`).

### Upgraded 60 FPS Angle-Tracking Pipeline
```
[User Cursor Movement] 
       │
       ▼
[BoundingClientRect Calculation] ──► Find Face Center (X: 50%, Y: 37.5%)
       │
       ▼
[Math.atan2(Δy, Δx)] ──────────────► Continuous Target Angle (0 to 2π)
       │
       ▼
[Shortest-Path Angular Lerp] ──────► Smooth Interpolated Angle
       │
       ▼
[Frame Index Normalization] ───────► index = Math.round((angle / 2π) * 128) % 128
       │
       ▼
[Direct Canvas drawImage] ─────────► Zero Alpha Blend, 100% Crisp Frame at 60 FPS
```

### Greeting & Idle Behaviors
- **Entrance Grace Window:** On initial page visit, the character maintains direct eye contact greeting (`center.webp`) for 1.2 seconds, ignoring minor pointer jitter.
- **Subtle Breathing Idle:** If no pointer movement occurs for >4.0 seconds, the character runs a subtle micro-oscillation between frames `63` and `65` ($\pm 2^\circ$) to remain organically alive.
- **HUD Live Telemetry:** An ultra-minimal status readout (`EYE CONTACT // 0°` or `TRACKING // 284° NW`) informs the user of the live responsive sensor loop.

---

## 6. CATEGORY HERO IMMERSION SYSTEM

Each major vertical (**BRANDING**, **WEB**, **EDITORIAL**, **SOCIAL**, **EMAIL**, **AI LAB**) features a dedicated full-width interactive hero that visually communicates the domain within 2 seconds:

- **BRANDING:** Dynamic typography stage where real vector marks (e.g. Hindon, Bimapay, Digitons) float with 3D gyroscopic parallax around a central identity showpiece.
- **WEB & DIGITAL:** Interactive responsive browser frame mockup containing real screenshot art (e.g., Kairali admin panel, Bimapay FinTech UI) that pans vertically on hover.
- **EDITORIAL & PUBLICATIONS:** 3D magazine spread presentation utilizing high-res renders of Varun's multi-page catalog publications with an interactive page-turn flip preview.
- **SOCIAL & MARKETING:** Dynamic multi-card mosaic cascade showcasing high-converting Instagram creatives (Rupeecircle, Mufin, Bimapay) that expand on hover.
- **EMAIL CAMPAIGNS:** Scrollable viewport mockups of long-form newsletter layouts (Emailer 1, 3, 7) illustrating responsive mobile/desktop formatting.
- **AI LAB:** Live visual workflow schematic connecting MCP nodes, generative pipelines, and Claude/Antigravity automation scripts with animated data-pulses.

---

## 7. JARVIS PORTFOLIO ASSISTANT (INTERACTION ARCHITECTURE)

In Phase 2, we establish the **interaction architecture and UI shell** for Jarvis (the virtual creative technologist assistant) without modifying existing bot data.

### States & UI Blueprint
1. **Minimized State (Floating Pill):**
   - Position: Fixed `bottom-6 right-6` (Desktop), `bottom-4 right-4` (Mobile).
   - Appearance: Frosted dark capsule (`rgba(9, 13, 22, 0.92)`), 1px border highlight, glowing green online indicator dot, and pulsing avatar icon.
   - Text: `JARVIS // AI ASSISTANT`
2. **Hover / Focus:**
   - Capsule gently expands to reveal quick-action chips (`"Show AI Work"`, `"Notice Period"`, `"Schedule Call"`).
3. **Expanded State (Command Overlay / Dialog):**
   - Dimensions: `420px` width $\times$ `580px` height (Desktop), `bottom-sheet` (Mobile).
   - Design: Obsidian glass panel with subtle scan-line telemetry, chat history terminal, and direct action triggers.
   - Voice / Command Prompts: Pre-calculated quick prompts mapped to Varun's verified career data (CTC, notice period, tech stack, project links).
4. **Portfolio Control Hook (Future Phase):**
   - Jarvis can trigger programmatic smooth scrolls to specific sections when requested (e.g., clicking *"Show Branding"* automatically scrolls to the Branding Category Hero).

---

## 8. PAGE & SECTION TRANSITIONS

Transitions between portfolio views must be rapid ($<400\text{ms}$), accessible, and hardware-accelerated.

- **Section Anchoring:** Smooth programmatic scroll with dynamic URL hash replacement (`window.history.pushState`) without full-page reloads.
- **Project Detail Flyout:** When a project card is clicked, rather than a jarring new page load, an elegant full-screen case-study drawer slides in from the right (`transform: translateX(100%) -> translateX(0)`), preserving scroll position underneath.
- **Escape Hatch:** Pressing `Esc` or clicking the frosted backdrop immediately dismisses any overlay with `0.25s` fade-out.

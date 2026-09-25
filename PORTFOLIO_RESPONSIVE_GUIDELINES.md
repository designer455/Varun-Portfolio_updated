# VARUN CHAUHAN — PORTFOLIO RESPONSIVE GUIDELINES
**Version:** 2.0.0  
**Target:** Multi-Device Ergonomics & Screen Matrix  
**Guiding Principle:** "Mobile is a bespoke ergonomic product, not desktop shrunk down."

---

## 1. BREAKPOINT SYSTEM & CONTAINER MATRIX

| Breakpoint | Range (px) | Grid Columns | Gutter | Container Padding | Max Container Width | Device Archetypes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`xs` (Mobile Compact)**| `320px – 389px` | 4 columns | `12px` | `16px` | Full width | iPhone SE, Galaxy Mini |
| **`sm` (Mobile Standard)**| `390px – 639px` | 4 columns | `16px` | `20px` | Full width | iPhone 13/14/15/16, Pixel 8 |
| **`md` (Tablet Portrait)**| `640px – 767px` | 6 columns | `20px` | `24px` | Full width | iPad Mini, Foldables |
| **`lg` (Tablet Land / Laptop)**| `768px – 1023px`| 8 columns | `24px` | `32px` | `768px` – `960px` | iPad Pro, MacBook Air 11" |
| **`xl` (Desktop Pro)** | `1024px – 1439px`| 12 columns | `24px` | `48px` | `1280px` | MacBook Pro 14"/16", iMac |
| **`2xl` (Studio / Ultrawide)**| `1440px+` | 12 columns | `32px` | `64px` | `1440px` (Centered) | 4K Displays, Ultrawide Monitors |

---

## 2. BESPOKE MOBILE EXPERIENCE SPECIFICATIONS

### 1. Zero Custom Cursor Overhead
- On any device matching `@media (pointer: coarse)` or touch screens, `CustomCursor.tsx` returns `null` immediately.
- The browser utilizes native capacitive touch with instantaneous tap response (`touch-action: manipulation` to prevent 300ms double-tap delays).

### 2. Hero Section Mobile Architecture
- Sits within `h-[100dvh]` to account for shifting iOS Safari and Android Chrome bottom navigation bars without scroll-jitter.
- Strict vertical stacking order:
  1. Top capsule navigation pill (`top-4`)
  2. Hero Typography: `HI, I'M` $\rightarrow$ `Varun Chauhan` $\rightarrow$ Bio summary $\rightarrow$ Action Buttons (`pt-20`, `px-5`)
  3. Interactive Character Canvas: Positioned in the remaining lower half with `object-contain object-bottom`, prominently sized with zero text overlap.
- Touch Tracking: Touch dragging across the screen smoothly rotates the character head using native `touchmove` coordinates.

### 3. Touch Target Ergonomics & Tap Feedback
- Every interactive element (navigation links, buttons, category pills, filter chips) complies with WCAG 2.2 Target Size standards: minimum **`48px × 48px`** bounding box.
- Tactile Feedback: Interactive elements feature immediate `active:scale-[0.97]` compression upon finger press.

### 4. Navigation Adaptation: Full-Screen Drawer
- On desktop: Minimal horizontal floating capsule (`[WORK] [ABOUT] [AI LAB] [CONTACT]`).
- On mobile: Floating pill contains the `VC` monogram and a tactile `Menu` icon.
- Tapping opens a full-screen obsidian glass drawer (`bg-[#030712]/95 backdrop-blur-2xl`) with:
  - Staggered large navigation links (32px Outfit Display font)
  - Quick action pills (`Resume ↗`, `WhatsApp 💬`)
  - Direct contact links (Phone, Email, LinkedIn)

### 5. Media & Grid Responsiveness
- **Project Grid:**
  - Desktop (`lg+`): 3 columns (`grid-cols-3`)
  - Tablet (`md`): 2 columns (`grid-cols-2`)
  - Mobile (`<md`): 1 column (`grid-cols-1`) full-width cards with high-density editorial image aspect ratios (`aspect-[16/10]` or `aspect-[4/3]`).
- **PDF Publications:** On mobile, instead of embedding heavy desktop iframes, clicking a publication opens the PDF in native OS view or a mobile modal with a direct download button.
- **Horizontal Overflow:** Strictly enforced `overflow-x-hidden` on `body` and root containers to prevent horizontal page wobble.

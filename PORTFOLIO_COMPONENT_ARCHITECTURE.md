# VARUN CHAUHAN — PORTFOLIO COMPONENT ARCHITECTURE
**Version:** 2.0.0  
**Target:** Modular, Typed, High-Performance React 19 / Next.js 16 Component Tree  
**Core Principles:** Zero Render Thrashing, Strict TypeScript Interfaces, Semantic HTML5

---

## 1. COMPONENT HIERARCHY TREE

```
RootLayout (src/app/layout.tsx)
│
├── NoiseOverlay (Persistent ambient SVG film-grain layer)
├── CustomCursor (Dual-element physics pointer — Desktop only)
├── SmoothScrollProvider (Lenis virtual scroll context & telemetry)
│
└── HomePage (src/app/page.tsx)
    ├── Navbar (Floating obsidian glass capsule + magnetic links)
    ├── MobileMenu (Full-screen accessible mobile navigation drawer)
    │
    ├── <main>
    │   ├── Hero
    │   │   ├── CharacterCanvas (129-frame 60 FPS angle tracker)
    │   │   ├── HeroTypography (Display XL headline + status badge)
    │   │   ├── HeroHUD (Live eye-contact telemetry indicator)
    │   │   └── MagneticButtonGroup ([Explore Work] & [Let's Talk])
    │   │
    │   ├── CapabilityMatrix
    │   │   └── CapabilityCard (4 operational pillars: Design, Web, AI, Infra)
    │   │
    │   ├── WorkflowEngine (Interactive: Creative → AI → Build → Ship)
    │   │   └── WorkflowNode (Visual tool inspect modal)
    │   │
    │   ├── CategoryHeroSuite
    │   │   └── CategoryHero (Full-width immersive showcase per vertical)
    │   │
    │   ├── WorkVault (114 projects)
    │   │   ├── CategoryFilterTabs (All, Web, Branding, Editorial, Social, Email)
    │   │   ├── ProjectGallery (Responsive grid / list view)
    │   │   │   └── ProjectCard (3D tilt, WebP thumbnail, metadata, hover action)
    │   │   └── CaseStudyModal (Slide-over deep dive with high-res lightbox)
    │   │
    │   ├── AILabShowcase
    │   │   ├── MCPArchitectureVisualizer (Live node-graph simulator)
    │   │   └── PromptWorkflowTerminal (Interactive CLI simulation)
    │   │
    │   ├── CredentialsSection
    │   │   ├── CertificateCard (Adobe ACA, MAAC, Great Learning)
    │   │   ├── CertificatePdfViewer (In-app iframe lightbox)
    │   │   ├── LiveWebsitesDirectory (Bimapay, Hindon, Digitons, Aiju)
    │   │   └── PartnerLogoMarquee (Infinite smooth scrolling logo bar)
    │   │
    │   ├── ExperienceTimeline
    │   │   └── TimelineNode (Kairali, Digitons, Hindon, Risezonic, MAAC)
    │   │
    │   └── ConversionTerminal (Contact Section)
    │       ├── ContactDetailsCard (Phone, Email, LinkedIn, Location)
    │       └── ContactForm (Dual-dispatch: FormSubmit.co + Instant WhatsApp)
    │
    ├── Footer (Minimal branding, copyright, CV download, back-to-top)
    └── JarvisAssistant (Floating AI assistant drawer with quick prompts)
```

---

## 2. COMPONENT SPECIFICATIONS & TYPESCRIPT INTERFACES

### 1. `CustomCursor.tsx`
- **Role:** Global desktop physics cursor with situational state morphing.
- **Props:**
  ```ts
  export type CursorVariant = 'DEFAULT' | 'LINK' | 'VIEW_PROJECT' | 'OPEN_PDF' | 'IMAGE_ZOOM' | 'DRAG' | 'MAGNETIC';
  
  export interface CursorContextValue {
    variant: CursorVariant;
    customText: string | null;
    setCursorState: (variant: CursorVariant, text?: string | null) => void;
    resetCursor: () => void;
  }
  ```
- **Technical Mechanism:** Direct DOM manipulation via `useRef` and `requestAnimationFrame`. Zero re-renders of the root React component tree.

### 2. `MagneticButton.tsx` / `MagneticLink.tsx`
- **Role:** High-touch interactive wrapper applying cursor attraction.
- **Props:**
  ```ts
  export interface MagneticProps {
    children: React.ReactNode;
    strength?: number;        // Max displacement in px (default: 12)
    threshold?: number;       // Radius of influence in px (default: 40)
    className?: string;
    onClick?: () => void;
  }
  ```

### 3. `CharacterCanvas.tsx`
- **Role:** 360° interactive head-tracking canvas with 128 WebP frames + center frame.
- **Props:**
  ```ts
  export interface CharacterCanvasProps {
    className?: string;
    onStateChange?: (state: {
      isCenter: boolean;
      angleDeg: number;
      direction: string;
      isBreathing: boolean;
    }) => void;
  }
  ```
- **Technical Mechanism:** BoundingClientRect computation, shortest-path angular lerp, direct 2D canvas `drawImage` at native 1280x720 scaled via CSS `object-contain`.

### 4. `CategoryHero.tsx`
- **Role:** Full-width cinematic section introducing a portfolio vertical with authentic work.
- **Props:**
  ```ts
  export interface CategoryHeroProps {
    categoryNumber: string;       // e.g. "01"
    title: string;                // e.g. "BRANDING & IDENTITY"
    tagline: string;
    description: string;
    projectCount: number;
    primaryArtworkSrc: string;   // High-res real project file path
    secondaryArtworkSrcs?: string[];
    onExploreClick: () => void;
  }
  ```

### 5. `ProjectCard.tsx`
- **Role:** 3D gyroscopic tilt card displaying project media, metadata, and action triggers.
- **Props:**
  ```ts
  export interface ProjectCardProps {
    id: string;
    title: string;
    category: string;
    image: string;
    pdf?: string;
    year?: string;
    client?: string;
    aspectRatio?: 'video' | 'portrait' | 'square';
    onInspect: () => void;
  }
  ```

### 6. `CaseStudyModal.tsx`
- **Role:** Slide-over detail drawer presenting high-resolution imagery, client challenge, creative solution, and original PDF download.
- **Props:**
  ```ts
  export interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
  }
  ```

### 7. `JarvisAssistant.tsx`
- **Role:** Floating AI virtual creative technologist assistant drawer.
- **Props:**
  ```ts
  export interface JarvisAssistantProps {
    isOpen: boolean;
    onToggle: () => void;
    onActionTrigger?: (action: 'SCROLL_TO' | 'OPEN_CONTACT' | 'DOWNLOAD_CV', target?: string) => void;
  }
  ```

---

## 3. STATE MANAGEMENT STRATEGY

1. **Local Component State (`useState`):**
   - Modals, lightbox visibility, filter selections, and contact form inputs.
2. **Context Providers (`React.createContext`):**
   - `CursorContext`: Global variant state dispatch (`setCursorState`) accessible from any interactive card.
   - `ScrollContext`: Lenis smooth scroll instance access and scroll-progress subscribers.
3. **No Redux / Heavy State Libraries Needed:**
   - The application is a high-performance single-page digital experience; lightweight React context and DOM refs keep the bundle minimal and fast.

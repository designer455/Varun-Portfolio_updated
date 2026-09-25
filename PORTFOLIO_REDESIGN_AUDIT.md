# PORTFOLIO REDESIGN AUDIT & DISCOVERY SPECIFICATION
**Phase 1: Comprehensive Project Audit, Content Inventory & Safe Backup**
*Document Version: 1.0.0 | Date: September 25, 2026*
*Target Website: Varun Chauhan — Personal Portfolio ([varun-chauhan.vercel.app](https://varun-chauhan.vercel.app))*
*Source Repository: [github.com/designer455/Varun-Portfolio_updated](https://github.com/designer455/Varun-Portfolio_updated)*

---

## EXECUTIVE SUMMARY & SAFETY ATTESTATION

Before performing this discovery audit, the entire repository was confirmed to be on a clean working tree on `main` (commit `f73384b`). In accordance with **Task 9 (Safety / Backup)**, an isolated backup branch and git release tag were created and pushed to the remote GitHub repository:
- **Backup Git Branch**: `backup-pre-redesign` (Pushed to `origin/backup-pre-redesign`)
- **Backup Git Tag**: `backup-pre-redesign-v1.0` (Pushed to `origin/backup-pre-redesign-v1.0`)
- **Zero code or asset modifications** have been made to the active portfolio in this phase.

---

## TABLE OF CONTENTS
1. [A. Existing Project Architecture](#a-existing-project-architecture)
2. [B. Existing Content Inventory](#b-existing-content-inventory)
3. [C. Existing Category Inventory & Proposals](#c-existing-category-inventory--proposals)
4. [D. Complete Project Inventory (114 Projects)](#d-complete-project-inventory-114-projects)
5. [E. Visual Asset Inventory](#e-visual-asset-inventory)
6. [F. Certificate & Credential Inventory](#f-certificate--credential-inventory)
7. [G. External Links & Network Directory](#g-external-links--network-directory)
8. [H. Current UI & Interaction Audit](#h-current-ui--interaction-audit)
9. [I. Technical Health Check](#i-technical-health-check)
10. [J. Reusable Components & Algorithmic Modules](#j-reusable-components--algorithmic-modules)
11. [K. Problems & Architectural Limitations in Current UI](#k-problems--architectural-limitations-in-current-ui)
12. [L. Strategic Opportunities for Redesign](#l-strategic-opportunities-for-redesign)
13. [M. Proposed Future Information Architecture (IA)](#m-proposed-future-information-architecture-ia)
14. [N. Proposed Interaction & Animation System](#n-proposed-interaction--animation-system)
15. [O. Decisions & Blockers for User Review](#o-decisions--blockers-for-user-review)

---

## A. EXISTING PROJECT ARCHITECTURE

### 1. Framework & Core Runtime
- **Framework**: [Next.js](https://nextjs.org/) `16.2.10` (App Router enabled with Turbopack).
- **React Engine**: React `19.2.4` and React DOM `19.2.4`.
- **Language**: TypeScript `5.x` with strict type checking enabled (`tsconfig.json`).
- **Package Manager**: `npm` using lockfile `package-lock.json` (v3 format).
- **Styling Architecture**: Tailwind CSS `v4.x` with `@tailwindcss/postcss` and `@theme` variables defined in `src/app/globals.css`.
- **Bundler / Compilers**: Turbopack for local development and optimized production Next.js builds.

### 2. External Libraries & Dependencies
| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `16.2.10` | App router, static generation, image optimization, font optimization |
| `react` / `react-dom` | `19.2.4` | Component tree runtime |
| `lucide-react` | `^1.24.0` | Vector UI icons throughout navigation, buttons, forms, and services |
| `yet-another-react-lightbox` | `^3.32.1` | Full-screen image lightbox modal with Zoom/Pan plugin in `Portfolio.tsx` |
| `tailwindcss` | `^4.0.0` | Atomic CSS utility styling |
| `eslint` / `eslint-config-next` | `^9.0.0` | Code quality and React hooks linting |

### 3. File System & Directory Map
```
Varun-Portfolio_updated/
├── .git/                      # Git repository (main, backup-pre-redesign)
├── .next/                     # Next.js build output cache
├── public/                    # Static public assets served at root
│   ├── assets/
│   │   ├── certificate/       # 4 local Adobe & MAAC certificate PDFs
│   │   ├── logos/             # 9 client/partner logos (PNG/JPEG)
│   │   ├── portfolio/         # 118 real design assets (67 images, 51 PDFs)
│   │   ├── profile image.jpeg # High-res Varun portrait
│   │   ├── profile-new.jpeg   # High-res Varun portrait
│   │   ├── varun-profile.jpeg # Headshot portrait
│   │   └── 4015765_195.svg    # Vector design graphic
│   ├── frames/                # 128 WebP frames (frame_0 to frame_127 + center.webp)
│   ├── Character.mp4          # Source 360-degree rotation video
│   ├── CV-Varun_Chauhan.pdf   # 1-page printable resume CV
│   └── favicon & icons        # Monogram SVG/PNG/ICO icons
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind v4 import, color tokens, animations
│   │   ├── layout.tsx         # Root HTML, Google Fonts (Inter, Outfit, Dancing Script)
│   │   └── page.tsx           # Main single-page portfolio layout assembling all sections
│   ├── components/
│   │   ├── Navbar.tsx         # Dark capsule floating header
│   │   ├── Hero.tsx           # Hero section with typography, buttons & HUD
│   │   ├── CharacterCanvas.tsx# 60 FPS requestAnimationFrame interactive character canvas
│   │   ├── About.tsx          # Biography, skills matrix, experience & education
│   │   ├── Services.tsx       # 3 primary service offerings
│   │   ├── Portfolio.tsx      # Filterable project grid with lightbox & interleaving
│   │   ├── Credentials.tsx    # Certifications & Websites Worked On directory
│   │   ├── Contact.tsx        # Contact form (FormSubmit.co + WhatsApp API)
│   │   ├── Footer.tsx         # Copyright, social links, scroll-to-top button
│   │   ├── WhatsAppWidget.tsx # Floating interactive AI assistant chatbot
│   │   └── CustomCursor.tsx   # 60 FPS lerped dual-ring custom cursor
│   └── data/
│       ├── projects.ts        # 114 project records across 5 categories
│       ├── partners.ts        # 9 partner/client organization records
│       └── task.md            # Historic changelog from Phases 1–11
├── Profile.pdf                # LinkedIn profile export (3 pages)
├── package.json               # Manifest & scripts
└── next.config.ts             # Next.js configuration
```

---

## B. EXISTING CONTENT INVENTORY

### 1. Personal & Professional Identity
- **Full Legal Name**: Varun Chauhan
- **Current Portfolio Titles**:
  - Senior Graphic & Web Designer
  - Professional Website & Graphic Designer | Creating Engaging Digital Experiences
  - Graphic | Website Designer (including WordPress)
- **Requested New Positioning**:
  - `VARUN CHAUHAN — AI × DESIGN × DEVELOPMENT`
  - `AI-Powered Creative Technologist`
- **Location**: New Delhi, India (Bakhtawarpur, Delhi-110036)
- **Direct Phone Numbers**: `+91 87002 36209` / `+91 70426 16702`
- **Primary Contact Email**: `c.graphics00@gmail.com`
- **LinkedIn Profile**: [linkedin.com/in/varun-chauhan-designer/](https://www.linkedin.com/in/varun-chauhan-designer/)
- **Entrepreneurship**: Founder of *Digitons Development* ([digitonsdevelopment.com](https://digitonsdevelopment.com/))
- **Notice Period**: Official 1 Month notice period
- **Current CTC**: ₹ 8,31,600 per annum
- **Date of Birth**: 16/10/1999
- **Languages Spoken**: English (Fluent), Hindi (Native)
- **Typing Capabilities**: English Typing & Hindi Typing

### 2. Work Experience (Chronological)
1. **Kairali Ayurvedic Group**
   - **Role**: Graphic & Web Designer
   - **Type**: Full-time (Onsite / Delhi)
   - **Tenure**: April 2023 – Present (3 Years, 4 Months+)
   - **Core Responsibilities**:
     - Designing and coding custom admin panels using HTML5, CSS3, and Bootstrap.
     - Managing and maintaining the front-end user experience of the corporate web ecosystem.
     - Designing end-to-end creatives for digital social media, paid advertising, print publications, and global marketing collateral.
     - Enhancing website performance, mobile responsiveness, and bounce-rate optimization.
2. **Digitons Development**
   - **Role**: Founder & Creative Director
   - **Type**: Full-time (Delhi)
   - **Tenure**: March 2021 – Present (5 Years, 5 Months+)
   - **Core Responsibilities**:
     - Founded and scaled a digital marketing and web design practice helping SMBs establish robust brand identities and high-converting online presences.
3. **Hindon Mercantile Limited / Mufin Green Finance**
   - **Role**: Graphic & Web Designer
   - **Type**: Full-time (Delhi)
   - **Tenure**: June 2021 – March/April 2023 (1 Year, 11 Months)
   - **Core Responsibilities**:
     - Architected and built responsive corporate front-ends and web layouts.
     - Integrated backend databases, forms, and server-side workflows.
     - Conducted thorough browser testing and trained internal teams on WordPress content management.
     - Produced branded financial collateral, social assets, and investor presentations.
4. **Risezonic LLP**
   - **Role**: Technology / IT Intern & Web Designer
   - **Type**: Internship / Offsite
   - **Tenure**: September 2020 – February 2021 (6 Months)
   - **Core Responsibilities**:
     - Web UI design, layout formatting, digital marketing graphics, and IT support.
5. **Independent Creative Practice**
   - **Role**: Freelance Graphic & Web Designer
   - **Type**: Self-employed
   - **Tenure**: April 2018 – September 2020 (2 Years, 6 Months)
   - **Core Responsibilities**:
     - Client identity design, branding, stationery, brochures, and custom WordPress setups.

### 3. Education History
1. **School of Open Learning (University of Delhi), Delhi**
   - Degree: Bachelor of Arts (B.A., Arts & Humanities)
   - Duration: 2018 – 2021 (Graduated)
2. **Maya Academy of Advanced Cinematics (MAAC), Kamla Nagar, Delhi**
   - Diploma: APDMD (Advanced Program in Digital Media & Design)
   - Duration: 2018/2020 – 2021 (Completed)
   - Focus: CorelDRAW, Adobe Photoshop, Adobe Illustrator, InDesign, Premiere Pro, Web Technologies
3. **Jain Bharati Mrigavati Vidyalaya (CBSE)**
   - Senior Secondary (Class XII) — 2017 (Humanities & Visual Arts)
   - Secondary School (Class X) — 2015

### 4. Consolidated Skills Matrix
| Category | Skills & Tools Documented in Project |
| :--- | :--- |
| **Creative / Graphic Design** | Adobe Photoshop (v2023, 4 yrs), Adobe Illustrator (v2023, 4 yrs), CorelDRAW (v2024, 4 yrs), Adobe InDesign CS6, Canva, Brand Identity Systems, Packaging Design, Print Publications, Typography, Social Media Creative Sets |
| **Web & UI/UX** | HTML5 (4 yrs), CSS3, Bootstrap 5 (4 yrs), WordPress CMS (v6.1, 4 yrs), Responsive Layouts, Admin Panel UI, UI/UX Wireframing & Prototyping, Cross-browser Testing |
| **New AI & Creative Technologist Toolset** | GPT, GPT MCP, Claude Code, Codex, Gemini, Antigravity, Google Flow, Automated AI image/video workflows, Prompt Engineering, Agentic Tool Integration |
| **Infrastructure & DevOps Toolset** | GitHub, Vercel, Server management, REST APIs, MCP Servers, CI/CD deployment, Production debugging, Environment variable orchestration |
| **Productivity & Business Tools** | Microsoft PowerPoint (v2023, 4 yrs), Microsoft Word (v2023, 4 yrs), Microsoft Excel (v2024, 3 yrs), Business Ownership, Client Management |

---

## C. EXISTING CATEGORY INVENTORY & PROPOSALS

### 1. Existing Categories in Active Database (`src/data/projects.ts`)
The current portfolio classifies all work strictly into **5 existing categories**:
1. **`Website & Landing Pages`** (1 project in data array; 9 live websites in Credentials)
2. **`Email Campaigns`** (8 projects — high-converting emailers for fintech, wellness & exports)
3. **`Magazine Advertisements`** (12 projects — full-page commercial editorial magazine ads)
4. **`Print Media & Branding`** (31 projects — multi-page booklets, brochures, packaging, stationery)
5. **`Social Media Creatives`** (62 projects — Instagram carousels, campaign creatives, promotional ads)
*Total Projects*: **114 structured projects** in `projectsData`.

### 2. Proposed Future Categories (AI-Powered Creative Technologist Paradigm)
To elevate Varun's positioning to *AI × DESIGN × DEVELOPMENT*, the following structured taxonomy is proposed for Phase 2/3:
1. **`AI LAB & CREATIVE AUTOMATION`**
   - Showcases MCP server setups, agentic workflows, Claude Code/Antigravity automation, generative imagery, and custom AI tools.
2. **`WEB & DIGITAL PRODUCTS`**
   - High-fidelity responsive web applications, commercial landing pages, interactive dashboards, and WordPress custom implementations.
3. **`BRAND SYSTEMS & IDENTITY`**
   - Full identity systems, vector logos, typography hierarchies, brand style guides, corporate stationery, and packaging.
4. **`EDITORIAL & PRINT MEDIA`**
   - Multi-page corporate booklets, luxury magazine advertisements, exhibition collateral, catalogs, and print press assets.
5. **`CAMPAIGNS & SOCIAL MARKETING`**
   - High-converting email design systems, organic and paid social media sets, product launch graphics for corporate brands.
6. **`INFRASTRUCTURE & CODE REPOSITORIES`**
   - MCP servers, deployment architecture, custom APIs, headless setups, and open-source contributions.

---

## D. COMPLETE PROJECT INVENTORY (114 PROJECTS)

Below is the verified inventory of all 114 project entries from `src/data/projects.ts`, complete with format, media path, and file type on disk:

| # | ID | Title | Category | Media Type | File Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `landing-page` | Landing Page | Website & Landing Pages | Image (JPEG 1920x8603) | `/assets/portfolio/Landing Page.jpg` |
| 2 | `emailer` | Emailer | Email Campaigns | Image (JPEG 2940x4972) | `/assets/portfolio/Emailer.jpg` |
| 3 | `emailer-1` | Emailer 1 | Email Campaigns | Image (JPEG 1920x5776) | `/assets/portfolio/Emailer 1.jpg` |
| 4 | `emailer-3` | Emailer 3 | Email Campaigns | Image (PNG 1920x2600) | `/assets/portfolio/Eamiler 3.png` |
| 5 | `emailer-4` | Emailer 4 | Email Campaigns | Image (JPEG 1920x2419) | `/assets/portfolio/Emailer 4.jpg` |
| 6 | `emailer-5` | Emailer 5 | Email Campaigns | PDF (2 pages, 1.20MB) | `/assets/portfolio/Emailer 5.pdf` |
| 7 | `emailer-6` | Emailer 6 | Email Campaigns | Image (JPEG 1920x1593) | `/assets/portfolio/Emailer 6.jpg` |
| 8 | `emailer-7` | Emailer 7 | Email Campaigns | Image (JPEG 2940x7140) | `/assets/portfolio/Emailer 7.jpg` |
| 9 | `emailer-8` | Emailer 8 | Email Campaigns | PDF (1 page, 7.66MB) | `/assets/portfolio/Emailer 8.pdf` |
| 10 | `magazine-ad1` | Magazine Ad1 | Magazine Advertisements | PDF (1 page, 6.26MB) | `/assets/portfolio/Magazine ad1.pdf` |
| 11 | `magazine-ad-2` | Magazine Ad 2 | Magazine Advertisements | PDF (1 page, 12.18MB) | `/assets/portfolio/Magazine ad 2.pdf` |
| 12 | `magazine-ad-3` | Magazine Ad 3 | Magazine Advertisements | PDF (1 page, 6.36MB) | `/assets/portfolio/Magazine ad 3.pdf` |
| 13 | `magazine-ad-4` | Magazine Ad 4 | Magazine Advertisements | PDF (1 page, 4.03MB) | `/assets/portfolio/Magazine ad 4.pdf` |
| 14 | `magazine-ad-5` | Magazine Ad 5 | Magazine Advertisements | Image (JPEG 1280x2000) | `/assets/portfolio/MAgazine ad 5.jpg` |
| 15 | `magazine-ad-6` | Magazine Ad 6 | Magazine Advertisements | PDF (1 page, 22.60MB) | `/assets/portfolio/Magazine ad 6.pdf` |
| 16 | `magazine-ad-7` | Magazine Ad 7 | Magazine Advertisements | PDF (1 page, 3.91MB) | `/assets/portfolio/Magazine ad 7.pdf` |
| 17 | `magazine-ad-8` | Magazine Ad 8 | Magazine Advertisements | PDF (1 page, 13.54MB) | `/assets/portfolio/Magazine ad 8.pdf` |
| 18 | `magazine-ad-9` | Magazine Ad 9 | Magazine Advertisements | PDF (6 pages, 27.20MB) | `/assets/portfolio/Magazine ad 9.pdf` |
| 19 | `magazine-ad-10` | Magazine Ad 10 | Magazine Advertisements | PDF (1 page, 5.08MB) | `/assets/portfolio/Magazine ad 10.pdf` |
| 20 | `magazine-ad-11` | Magazine Ad 11 | Magazine Advertisements | PDF (1 page, 5.36MB) | `/assets/portfolio/Magazine ad 11.pdf` |
| 21 | `magazine-ad-12` | Magazine Ad 12 | Magazine Advertisements | PDF (1 page, 14.78MB) | `/assets/portfolio/Magazine ad 12.pdf` |
| 22 | `printing` | Printing | Print Media & Branding | Image & PDF (2 pages) | `/assets/portfolio/Printing.jpg` & `.pdf` |
| 23 | `printing-1` | Printing 1 | Print Media & Branding | Image (JPEG 1920x1000) | `/assets/portfolio/Printing 1.jpg` |
| 24 | `printing-2` | Printing 2 | Print Media & Branding | PDF (2 pages, 11.77MB) | `/assets/portfolio/Printing 2.pdf` |
| 25 | `printing-3` | Printing 3 | Print Media & Branding | PDF (2 pages, 2.51MB) | `/assets/portfolio/Printing 3.pdf` |
| 26 | `printing-4` | Printing 4 | Print Media & Branding | PDF (8 pages, 1.22MB) | `/assets/portfolio/Printing 4.pdf` |
| 27 | `printing-5` | Printing 5 | Print Media & Branding | PDF (2 pages, 2.03MB) | `/assets/portfolio/Printing 5.pdf` |
| 28 | `printing-6` | Printing 6 | Print Media & Branding | PDF (2 pages, 2.12MB) | `/assets/portfolio/Printing 6.pdf` |
| 29 | `printing-7` | Printing 7 | Print Media & Branding | PDF (2 pages, 3.02MB) | `/assets/portfolio/Printing 7.pdf` |
| 30 | `printing-8` | Printing 8 | Print Media & Branding | PDF (2 pages, 4.70MB) | `/assets/portfolio/Printing 8.pdf` |
| 31 | `printing-9` | Printing 9 | Print Media & Branding | Image (JPEG 496x663) | `/assets/portfolio/Printing 9.jpg` |
| 32 | `printing-10` | Printing 10 | Print Media & Branding | PDF (2 pages, 2.40MB) | `/assets/portfolio/Printing 10.pdf` |
| 33 | `printing-11` | Printing 11 | Print Media & Branding | Image (PNG 774x632) | `/assets/portfolio/Printing 11.png` |
| 34 | `printing-12` | Printing 12 | Print Media & Branding | PDF (2 pages, 5.38MB) | `/assets/portfolio/Printing 12.pdf` |
| 35 | `printing-13` | Printing 13 | Print Media & Branding | PDF (2 pages, 4.57MB) | `/assets/portfolio/Printing 13.pdf` |
| 36 | `printing-14` | Printing 14 | Print Media & Branding | PDF (2 pages, 58.86MB) | `/assets/portfolio/Printing 14.pdf` |
| 37 | `printing-15` | Printing 15 | Print Media & Branding | PDF (2 pages, 0.07MB) | `/assets/portfolio/Printing 15.pdf` |
| 38 | `printing-16` | Printing 16 | Print Media & Branding | PDF (2 pages, 2.87MB) | `/assets/portfolio/Printing 16.pdf` |
| 39 | `printing-17` | Printing 17 | Print Media & Branding | PDF (2 pages, 0.74MB) | `/assets/portfolio/Printing 17.pdf` |
| 40 | `printing-18` | Printing 18 | Print Media & Branding | PDF (2 pages, 2.46MB) | `/assets/portfolio/Printing 18.pdf` |
| 41 | `printing-19` | Printing 19 | Print Media & Branding | PDF (2 pages, 24.46MB) | `/assets/portfolio/Printing 19.pdf` |
| 42 | `printing-20` | Printing 20 | Print Media & Branding | Image (JPEG 1080x1350) | `/assets/portfolio/Printing 20.jpg` |
| 43 | `printing-21` | Printing 21 | Print Media & Branding | Image (PNG 1545x2000) | `/assets/portfolio/Printing 21.png` |
| 44 | `priting-22` | Printing 22 | Print Media & Branding | Image (JPEG 1333x1999) | `/assets/portfolio/Priting 22.jpg` |
| 45 | `printing-23` | Printing 23 | Print Media & Branding | Image & PDF (2 pages, 31MB) | `/assets/portfolio/Printing 23.jpeg` & `.pdf` |
| 46 | `printing-24` | Printing 24 | Print Media & Branding | Image & PDF (7 pages, 19MB) | `/assets/portfolio/Printing 24.jpg` & `.pdf` |
| 47 | `printing-25` | Printing 25 | Print Media & Branding | Image (JPEG 1329x1066) | `/assets/portfolio/Printing 25.jpg` |
| 48 | `printing-26` | Printing 26 | Print Media & Branding | PDF (1 page, 6.81MB) | `/assets/portfolio/Printing 26.pdf` |
| 49 | `printing-27` | Printing 27 | Print Media & Branding | PDF (1 page, 4.43MB) | `/assets/portfolio/Printing 27.pdf` |
| 50 | `printing-28` | Printing 28 | Print Media & Branding | PDF (2 pages, 0.95MB) | `/assets/portfolio/Printing 28.pdf` |
| 51 | `printing-29` | Printing 29 | Print Media & Branding | Image (JPEG 3302x2552) | `/assets/portfolio/Printing 29.jpg` |
| 52 | `printing-30` | Printing 30 | Print Media & Branding | PDF (1 page, 5.56MB) | `/assets/portfolio/Printing 30.pdf` |
| 53 | `social-post` | Social Post | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/Social Post.jpg` |
| 54 | `social-post1` | Social Post 1 | Social Media Creatives | PDF (8 pages, 47.78MB) | `/assets/portfolio/Social post1.pdf` |
| 55 | `social-post-2` | Social Post 2 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 2.jpg` |
| 56 | `social-post-3` | Social Post 3 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 3.jpg` |
| 57 | `social-post-4` | Social Post 4 | Social Media Creatives | PDF (5 pages, 14.66MB) | `/assets/portfolio/social post 4.pdf` |
| 58 | `social-post-5` | Social Post 5 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/Social post 5.jpg` |
| 59 | `social-post-6` | Social Post 6 | Social Media Creatives | PDF (6 pages, 29.67MB) | `/assets/portfolio/social post 6.pdf` |
| 60 | `social-post-7` | Social Post 7 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 7.jpg` |
| 61 | `social-post-8` | Social Post 8 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 8.jpg` |
| 62 | `social-post-9` | Social Post 9 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 9.jpg` |
| 63 | `social-post-10` | Social Post 10 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 10.jpg` |
| 64 | `social-post-11` | Social Post 11 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 11.jpg` |
| 65 | `social-post-12` | Social Post 12 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 12.jpg` |
| 66 | `social-post-13` | Social Post 13 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 13.jpg` |
| 67 | `social-post-14` | Social Post 14 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 14.jpg` |
| 68 | `social-post-15` | Social Post 15 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 15.jpg` |
| 69 | `social-post-16` | Social Post 16 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 16.jpg` |
| 70 | `social-post-17` | Social Post 17 | Social Media Creatives | PDF (7 pages, 14.03MB) | `/assets/portfolio/social post 17.pdf` |
| 71 | `social-post-18` | Social Post 18 | Social Media Creatives | Image (JPEG 1080x1350) | `/assets/portfolio/social post 18.jpg` |
| 72 | `social-post-19` | Social Post 19 | Social Media Creatives | Image (JPEG 1080x1350) | `/assets/portfolio/social post 19.jpg` |
| 73 | `social-post-20` | Social Post 20 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 20.jpg` |
| 74 | `social-post-21` | Social Post 21 | Social Media Creatives | Image (JPEG 1215x1215) | `/assets/portfolio/social post 21.jpg` |
| 75 | `social-post-22` | Social Post 22 | Social Media Creatives | PDF (7 pages, 15.10MB) | `/assets/portfolio/social post 22.pdf` |
| 76 | `social-post-23` | Social Post 23 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 23.jpg` |
| 77 | `social-post-24` | Social Post 24 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 24.jpg` |
| 78 | `social-post-25` | Social Post 25 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 25.jpg` |
| 79 | `social-post-26` | Social Post 26 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 26.jpg` |
| 80 | `social-post-27` | Social Post 27 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 27.jpg` |
| 81 | `social-post-28` | Social Post 28 | Social Media Creatives | PDF (4 pages, 12.91MB) | `/assets/portfolio/social post 28.pdf` |
| 82 | `social-post-29` | Social Post 29 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 29.jpg` |
| 83 | `social-post-30` | Social Post 30 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 30.jpg` |
| 84 | `social-post-31` | Social Post 31 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 31.jpg` |
| 85 | `social-post-32` | Social Post 32 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 32.jpg` |
| 86 | `social-post-33` | Social Post 33 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 33.jpg` |
| 87 | `social-post-34` | Social Post 34 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 34.jpg` |
| 88 | `social-post-35` | Social Post 35 | Social Media Creatives | Image (JPEG 1080x1350) | `/assets/portfolio/social post 35.jpg` |
| 89 | `social-post-36` | Social Post 36 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 36.jpg` |
| 90 | `social-post-37` | Social Post 37 | Social Media Creatives | PDF (5 pages, 28.35MB) | `/assets/portfolio/social post 37.pdf` |
| 91 | `social-post-38` | Social Post 38 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 38.jpg` |
| 92 | `social-post-39` | Social Post 39 | Social Media Creatives | PDF (5 pages, 27.67MB) | `/assets/portfolio/social post 39.pdf` |
| 93 | `social-post-40` | Social Post 40 | Social Media Creatives | PDF (7 pages, 20.66MB) | `/assets/portfolio/social post 40.pdf` |
| 94 | `social-post-41` | Social Post 41 | Social Media Creatives | PDF (6 pages, 9.54MB) | `/assets/portfolio/social post 41.pdf` |
| 95 | `social-post-42` | Social Post 42 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 42.jpg` |
| 96 | `social-post-43` | Social Post 43 | Social Media Creatives | PDF (7 pages, 27.56MB) | `/assets/portfolio/social post 43.pdf` |
| 97 | `social-post-44` | Social Post 44 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 44.jpg` |
| 98 | `social-post-45` | Social Post 45 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 45.jpg` |
| 99 | `social-post-46` | Social Post 46 | Social Media Creatives | PDF (7 pages, 24.51MB) | `/assets/portfolio/social post 46.pdf` |
| 100 | `social-post-47` | Social Post 47 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 47.jpg` |
| 101 | `social-post-48` | Social Post 48 | Social Media Creatives | PDF (7 pages, 44.38MB) | `/assets/portfolio/Social post 48.pdf` |
| 102 | `social-post-49` | Social Post 49 | Social Media Creatives | Image (JPEG 1080x1350) | `/assets/portfolio/Social post 49.jpg` |
| 103 | `social-post-50` | Social Post 50 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 50.jpg` |
| 104 | `social-post-51` | Social Post 51 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 51.jpg` |
| 105 | `social-post-52` | Social Post 52 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 52.jpg` |
| 106 | `social-post-53` | Social Post 53 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 53.jpg` |
| 107 | `social-post-54` | Social Post 54 | Social Media Creatives | PDF (3 pages, 9.09MB) | `/assets/portfolio/social post 54.pdf` |
| 108 | `social-post-55` | Social Post 55 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 55.jpg` |
| 109 | `social-post-56` | Social Post 56 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 56.jpg` |
| 110 | `social-post-57` | Social Post 57 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 57.jpg` |
| 111 | `social-post-58` | Social Post 58 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 58.jpg` |
| 112 | `social-post-59` | Social Post 59 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 59.jpg` |
| 113 | `social-post-60` | Social Post 60 | Social Media Creatives | Image (JPEG 1080x1080) | `/assets/portfolio/social post 60.jpg` |
| 114 | `social-post-61` | Social Post 61 | Social Media Creatives | PDF (4 pages, 21.65MB) | `/assets/portfolio/social post 61.pdf` |

*Verification*: 0 missing files. Every single asset is 100% physically present on the local disk.

---

## E. VISUAL ASSET INVENTORY

### 1. Major Asset Groups
| Asset Group | Count | Size on Disk | Formats | Primary Location | Reusability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Interactive Head Tracking Frames** | 129 files | ~6.8 MB | WebP (1280x720) | `public/frames/`, `public/center.webp` | **High**: Core signature interactive element |
| **Portfolio Image Creatives** | 67 files | ~68 MB | JPEG, PNG | `public/assets/portfolio/` | **High**: Real client work for cards & category heroes |
| **Portfolio PDF Booklets / Publications** | 51 files | 671.26 MB | PDF (1 to 8 pages) | `public/assets/portfolio/` | **High**: Real publication work |
| **Client / Partner Logos** | 9 files | ~40 KB | PNG, JPEG | `public/assets/logos/` | **High**: Trust bar / marquee (needs 1 fix) |
| **Certificates** | 4 files | 2.9 MB | PDF | `public/assets/certificate/` | **High**: Credentials modal |
| **Portraits & Headshots** | 3 files | ~138 KB | JPEG | `public/assets/` | **High**: About / bio sections |
| **Raw Video Footage** | 2 files | 34.0 MB | MP4, MOV | `public/` | Archival reference |
| **Resume Document** | 1 file | 410 KB | PDF | `public/CV-Varun_Chauhan.pdf` | High (Downloadable CV) |

### 2. Client & Partner Logos Detail
1. `ayurvedichealingvillage.com.png` (32x23, 583 B) — Active
2. `bimapay.in.png` (128x128, 1.9 KB) — Active
3. `digitonsdevelopment.com.png` (128x128, 4.1 KB) — Active
4. `goodwingsmaritime.com.png` (111x82, 19.4 KB) — Active
5. `hindon.co.png` (82x82, 923 B) — Active
6. `mufingreenfinance.com.png` (100x100, 10.7 KB) — Active
7. `rupeecircle.com.png` (56x56, 1.4 KB) — Active
8. `whyayurveda.org.png` (128x128, 2.7 KB) — Active
9. `aijuexports.com.png` (**0 Bytes — Corrupted / Empty File**) — Needs regeneration/replacement

---

## F. CERTIFICATE & CREDENTIAL INVENTORY

| Certificate Name | Issuing Authority | Issue Date / Validity | Asset Location / URL | Display Format in Existing UI |
| :--- | :--- | :--- | :--- | :--- |
| **Front End Development - HTML** | Great Learning Academy | Credential ID: `FDIIFAJJ` (No expiration) | [External URL](https://olympus1.mygreatlearning.com/course_certificate/FDIIFAJJ) | External verification button |
| **Graphic Design and Illustration using Adobe Illustrator CS6** | Adobe Certified Associate (ACA) | Feb 2020 (Does not expire) | `/assets/certificate/Graphic Design and Illustration using Adobe Illustrator CS6.pdf` | In-app iframe PDF modal |
| **Print and Digital Media Publication using Adobe InDesign CS6** | Adobe Certified Associate (ACA) | Mar 2020 (Does not expire) | `/assets/certificate/Print and Digital Media Publication using Adobe InDesign CS6.pdf` | In-app iframe PDF modal |
| **Video Communication using Adobe Premiere Pro CS6** | Adobe Certified Associate (ACA) | Mar 2020 (Does not expire) | `/assets/certificate/Video Communication using Adobe Premiere Pro CS6.pdf` | In-app iframe PDF modal |
| **Advanced Program in Digital Media and Design (APDMD)** | Maya Academy of Advanced Cinematics (MAAC) | Sep 2021 (Does not expire) | `/assets/certificate/Advanced Program in Digital Media and Design.pdf` | In-app iframe PDF modal |
| **Build a Free Website with WordPress** | Coursera / Project Network | Documented in `Profile.pdf` | Not currently rendered in UI | Prospective addition |

---

## G. EXTERNAL LINKS & NETWORK DIRECTORY

### 1. Live Websites Worked On
1. [bimapay.in](https://bimapay.in/) — FinTech insurance platform
2. [hindon.co](https://hindon.co/) — Corporate financial institution
3. [digitonsdevelopment.com](https://digitonsdevelopment.com/) — Digital marketing agency (Founder)
4. [aijuexports.com](https://aijuexports.com/) — Global textile & apparel export enterprise
5. [yugindia.com](http://www.yugindia.com/) — Industrial & manufacturing corporation
6. [raghavslawmax.com](http://www.raghavslawmax.com/) — Legal advisory firm
7. [goodwingsmaritime.com](http://www.goodwingsmaritime.com/) — Maritime logistics & shipping
8. [risezonic.com](https://www.risezonic.com/) — IT consulting & digital services
9. [ayurvedichealingvillage.com](https://www.ayurvedichealingvillage.com) — Luxury wellness resort
10. [whyayurveda.org](https://www.whyayurveda.org) — Holistic health foundation
11. [mufingreenfinance.com](https://www.mufingreenfinance.com) — EV green financing enterprise
12. [rupeecircle.com](https://www.rupeecircle.com) — P2P lending marketplace

### 2. Social & Professional Profiles
- **LinkedIn Personal**: [linkedin.com/in/varun-chauhan-designer/](https://www.linkedin.com/in/varun-chauhan-designer/)
- **Instagram (Rupeecircle Creatives)**: [instagram.com/rupeecircle](https://instagram.com/rupeecircle?igshid=Yzg5MTU1MDY=)
- **LinkedIn (Bimapay Company)**: [linkedin.com/company/bimapay/](https://www.linkedin.com/company/bimapay/)
- **LinkedIn (Mufin Finance Company)**: [linkedin.com/company/mufin-finance/](https://www.linkedin.com/company/mufin-finance/)

### 3. Action Endpoints
- **Contact Form Backend**: `https://formsubmit.co/ajax/c.graphics00@gmail.com`
- **WhatsApp Click-to-Chat API**: `https://wa.me/918700236209?text=...`

---

## H. CURRENT UI & INTERACTION AUDIT

### 1. Section Breakdown & Theme Rhythm
| Section | Component | Background Theme | Accent Color | Visual Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Header** | `Navbar.tsx` | Fixed dark glass capsule | White & border opacity | Persistent section navigation |
| **Hero** | `Hero.tsx` | Obsidian Black (`#000000`) | Lime (`#ccff00`) / White | Interactive 360° head tracking, bio & CTA |
| **About** | `About.tsx` | Light Warm Gray (`#f9fafb`) | Emerald (`#15803d`) | Career bio, skills grid, timeline |
| **Services** | `Services.tsx` | Dark Gray (`#030712`) | Lime (`#ccff00`) | 3 service cards with hover lines |
| **Portfolio** | `Portfolio.tsx` | Light Warm Gray (`#f9fafb`) | Emerald (`#15803d`) | Filterable gallery, modal lightbox |
| **Credentials**| `Credentials.tsx`| Dark Gray (`#030712`) | Lime (`#ccff00`) | Certifications + Websites Worked On |
| **Contact** | `Contact.tsx` | Light Warm Gray (`#f9fafb`) | Emerald (`#15803d`) | Contact cards & FormSubmit/WhatsApp form |
| **Footer** | `Footer.tsx` | Dark Zinc (`#09090b`) | Lime (`#ccff00`) | Branding, copyright, scroll-to-top |
| **Chatbot** | `WhatsAppWidget.tsx`| Floating dark glass | Lime (`#ccff00`) | Virtual assistant with rule-based NLP |
| **Cursor** | `CustomCursor.tsx`| Floating white aura | Blur glow | Desktop mouse tracking |

### 2. Interaction & Animation Mechanisms
- **360° Cursor Tracking**:
  - `CharacterCanvas.tsx` runs a 60 FPS `requestAnimationFrame` loop.
  - Dynamically calculates the angle from the canvas face center (`rect.left + rect.width * 0.5`, `rect.top + rect.height * (270 / 720)`) to the cursor position.
  - Interpolates with angular lerp across a closed 128-frame loop to render crisp WebP frames without ghosting.
  - Holds center eye contact for 1.2s on initial entrance greeting.
- **Custom Cursor**:
  - Dual element: instant 10px white dot + smooth lerped 40px aura ring (`factor = 0.18`).
  - Scales 1.8x when hovering over interactive elements.
  - Automatically hidden on touch devices (`(pointer: coarse)` media query).
- **Portfolio Interleaving**:
  - In `All` tab, a round-robin algorithm ensures the first 5 slots display exactly 1 item from each category, preventing category clustering.
- **Image Lightbox**:
  - Uses `yet-another-react-lightbox` with zoom and pan for high-resolution inspection.

---

## I. TECHNICAL HEALTH CHECK

### 1. Build & Compilation Status
- **Next.js Production Build (`npm run build`)**: PASSES in 1.9–2.2 seconds.
- **TypeScript Static Verification (`npx tsc --noEmit`)**: PASSES with ZERO errors.
- **Turbopack Notice**: Multiple lockfiles detected between user home and project directory. Recommended to set `turbopack.root` in Next.js config for cleaner CLI warnings.

### 2. Linting Issues Identified (`npm run lint`)
- **9 React / ESLint Errors**:
  - `react/no-unescaped-entities`: Unescaped single quotes (`'`) in `Hero.tsx`, `Portfolio.tsx`, and `WhatsAppWidget.tsx`.
  - `react-hooks/set-state-in-render`: In `Portfolio.tsx` (line 34), `setVisibleCount(6)` is evaluated inside a `useMemo` callback.
  - `react-hooks/set-state-in-effect`: In `WhatsAppWidget.tsx` (line 27), `setMessages` runs synchronously inside `useEffect`.
- **7 TypeScript / ESLint Warnings**:
  - Unused imports: `isScrolled` in `Navbar.tsx`, `MessageSquare`, `ArrowRight`, `setShowOptions` in `WhatsAppWidget.tsx`.

### 3. Asset Integrity Anomalies
- `public/assets/logos/aijuexports.com.png` is **0 bytes** (empty file).
- The 51 portfolio PDFs total **671.26 MB**. Storing nearly 700 MB of PDFs in a Git repository slows down deployments and git clone operations.

---

## J. REUSABLE COMPONENTS & ALGORITHMIC MODULES

The following modules represent high-value engineering that should be carried forward into the redesign:
1. **Mathematical Head-Tracking Loop (`CharacterCanvas.tsx`)**:
   - The shortest-path angular lerp and bounding-box tracking logic is refined and works smoothly across mobile and desktop.
2. **Interactive AI Virtual Assistant (`WhatsAppWidget.tsx`)**:
   - The rule-based NLP knowledge base contains comprehensive, verified answers to client inquiries (notice period, CTC, experience, tools, project links).
3. **Form & WhatsApp Action Pipeline (`Contact.tsx`)**:
   - The dual-dispatch pattern (asynchronously sending an email via FormSubmit.co while directly opening WhatsApp click-to-chat with formatted text) provides high lead conversion.
4. **Round-Robin Category Interleaving (`Portfolio.tsx`)**:
   - The algorithmic balancing ensuring multi-category representation on initial load.
5. **PDF In-App Lightbox Viewer (`Credentials.tsx`)**:
   - Clean embedded viewer for verified credentials.

---

## K. PROBLEMS & ARCHITECTURAL LIMITATIONS IN CURRENT UI

1. **Theme Incoherence (Alternating Dark & Light Sections)**:
   - The website constantly jumps between pitch black (`#000000`), clinical light gray (`#f9fafb`), and dark slate (`#030712`). This destroys visual immersion and feels fragmented compared to world-class portfolios (like Neha Yadav or Ritik Singh) which maintain a confident, unified dark or editorial palette.
2. **Missing AI & Creative Technologist Storytelling**:
   - While Varun's real work spans AI, MCP servers, automation, and modern code, the current website still describes him predominantly as a traditional graphic/print designer.
3. **Generic PDF Document Placeholders**:
   - 51 of the 114 projects are multi-page PDF publications. Because they lack image covers, they currently render with a generic document icon and grey gradient, hiding their visual beauty.
4. **Card-Only Presentation without Case Studies**:
   - Clicking a card only opens a single image or PDF. There is no case-study modal explaining the design challenge, creative direction, client impact, or tools used.
5. **Mobile Navigation Limitations**:
   - On small screens, the navbar capsule occupies top viewport space without a full-screen drawer or menu overlay.

---

## L. STRATEGIC OPPORTUNITIES FOR REDESIGN

Inspired by premium digital experience references (e.g. *Neha Yadav*, *Ritik Singh*), the redesign can achieve an award-winning standard by implementing:

1. **Unified Obsidian Cinematic Aesthetic**:
   - Settle on a cohesive, ultra-premium dark aesthetic (rich obsidian, subtle charcoal layers, delicate glass borders, and vivid lime/emerald accents).
2. **Real-Work Category Heroes**:
   - As requested, each major portfolio vertical (BRANDING, WEB, SOCIAL, EDITORIAL, EMAIL, AI LAB) will have a dedicated visual hero composition powered by Varun's real high-resolution project assets.
3. **Generated Cover Thumbnails for the 51 PDFs**:
   - By rendering high-resolution first-page previews of all 51 magazine and print booklets, every single project card will showcase authentic visual design work.
4. **Interactive "AI × Creative Technologist" Playground**:
   - A dedicated interactive section featuring live MCP integration demos, prompt engineering workflows, terminal-style creative tech showcases, and code architectures.
5. **Fluid Micro-Interactions**:
   - Magnetic buttons, 3D card tilt on hover, smooth velocity-aware scrolling, text reveals, and ambient glowing backdrops.

---

## M. PROPOSED FUTURE INFORMATION ARCHITECTURE (IA)

```
[PERSISTENT GLOBAL LAYER]
├── Custom Velocity Cursor (Dual ring + interactive magnetizer)
├── Ultra-Slim Floating Dark Capsule Header (with Full-Screen Mobile Drawer)
├── Ambient Sound / Motion Toggle (Optional luxury touch)
└── Jarvis-Style AI Assistant / Quick WhatsApp Drawer

[PAGE FLOW]
1. HERO: CINEMATIC 3D TRACKING & MANIFESTO
   ├── Interactive 360° Varun Chauhan Character (Centered / responsive)
   ├── Dynamic Heading: "AI × DESIGN × DEVELOPMENT"
   ├── Live Status Pill: "Available for Q4 Creative Tech & Design Projects"
   └── Dual Magnetic CTAs: [Explore Work] & [Initialize Chat]

2. IDENTITY & PHILOSOPHY ("THE CREATIVE TECHNOLOGIST")
   ├── Kinetic Typography & Mission Statement
   ├── 4-Pillar Capability Grid:
   │   ├── 01. Visual & Brand Systems (Photoshop, Illustrator, CorelDRAW)
   │   ├── 02. Digital Products & Web Development (HTML/CSS, Bootstrap, WordPress, React)
   │   ├── 03. Creative AI & Automation (GPT, MCP, Claude Code, Gemini, Antigravity)
   │   └── 04. Infrastructure & Production (GitHub, Vercel, APIs, Servers)
   └── Interactive Experience & Career Timeline (Kairali, Digitons, Hindon/Mufin, MAAC)

3. CATEGORY SHOWCASE SUITE (FULL-WIDTH CINEMATIC HEROES)
   ├── 01. BRANDING & IDENTITY (Hero showcase + curated project reel)
   ├── 02. WEB & DIGITAL INTERFACES (Interactive device mockups + live links)
   ├── 03. EDITORIAL & PUBLICATIONS (Magazines, catalogs & booklets with cover renders)
   ├── 04. SOCIAL & PERFORMANCE MARKETING (High-converting campaign sets)
   ├── 05. EMAIL CAMPAIGNS (Long-form newsletter & marketing layouts)
   └── 06. AI LAB & EXPERIMENTS (MCP workflows, prompts, automation showcases)

4. ARCHIVE / COMPLETE WORK VAULT (114+ PROJECTS)
   ├── Filter Tabs: [All, Web, Branding, Editorial, Social, Email, AI]
   ├── View Modes: Fluid Grid / Interactive List View
   ├── High-Res Thumbnail Previews (including converted PDF covers)
   └── Deep-Dive Case Study Flyout / Modal with Client Brief & Results

5. TRUST, PROOF & CERTIFICATIONS
   ├── Infinite Logo Marquee ("Trusted by Forward-Thinking Brands")
   ├── Official Verified Certifications (Adobe ACA, MAAC APDMD, HTML)
   └── Live Project Directory (Bimapay, Hindon, Digitons, Aiju, Yug India, etc.)

6. CONVERT & CONNECT
   ├── High-Impact Interactive Contact Canvas
   ├── Dual Channel: Email Form (FormSubmit) + Instant WhatsApp Direct Message
   └── Direct Contact Details (Phone, Email, LinkedIn, Location)

7. FOOTER: SYSTEM SPECS & MINIMAL BRANDING
```

---

## N. PROPOSED INTERACTION & ANIMATION SYSTEM

1. **Magnetic Interactions**:
   - Navigation links, buttons, and social pills gently attract toward the cursor when hovering within a 30px threshold.
2. **3D Tilt & Parallax Cards**:
   - Subtle 3D perspective tilt on project cards responding to mouse position, creating tactile physical depth.
3. **Smooth Viewport Reveals**:
   - Elements smoothly enter using staggered CSS translates (`translateY(24px) -> translateY(0)`) and opacity easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
4. **Intelligent PDF Rendering**:
   - Scripts will pre-generate crisp WebP thumbnails for all 51 PDFs so the user immediately sees the beautiful cover page of each magazine, booklet, or catalog.
5. **Mobile-First Touch Ergonomics**:
   - Zero horizontal overflow, touch-friendly tap targets (>48px), and bottom-anchored sticky actions on mobile.

---

## O. DECISIONS & BLOCKERS FOR USER REVIEW

Before initiating Phase 2 (Design System & Architecture Setup), please confirm your preferences on the following:

1. **Color Theme Direction**:
   - *Option A (Recommended)*: **Pure Obsidian Luxury Dark Theme** across the entire website (Black `#030712`, Charcoal `#0c111d`, Electric Lime `#ccff00`, Crisp White typography). This matches the visual benchmark of *Neha Yadav* and *Ritik Singh*.
   - *Option B*: Maintain the existing alternating Dark $\rightarrow$ Light $\rightarrow$ Dark rhythm.
2. **Project Vault Presentation**:
   - *Option A (Recommended)*: Convert the first page of all 51 PDFs into high-resolution WebP thumbnails so that every single project in the portfolio has a real visual cover.
   - *Option B*: Keep generic document card icons for PDFs.
3. **Logo Fix for Aiju Exports**:
   - `public/assets/logos/aijuexports.com.png` is currently 0 bytes. May we recreate a clean vector/SVG wordmark logo for Aiju Exports to display properly in the partner marquee?
4. **Primary Headline Wording**:
   - Confirm preferred title format:
     - `VARUN CHAUHAN — AI × DESIGN × DEVELOPMENT`
     - or `VARUN CHAUHAN — AI-Powered Creative Technologist`

---

*End of Phase 1 Audit Specification. All existing data, assets, and git histories are safely preserved.*

import { projectsData, Project } from "./projects";

export interface CategoryDefinition {
  id: string;
  number: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  sourceCategory: Project["category"] | "AI Lab";
  projectCount: number;
  heroProject: Project;
  secondaryProjects: Project[];
  liveWebsites?: {
    name: string;
    url: string;
    role: string;
    badge: string;
  }[];
}

// Verified live website deployments from credentials and client history
export const LIVE_WEBSITES = [
  {
    name: "Bimapay Finsure",
    url: "https://bimapay.in/",
    role: "FinTech UI/UX & Web Development",
    badge: "FINTECH PLATFORM",
  },
  {
    name: "Hindon Mercantile",
    url: "https://hindon.co/",
    role: "Corporate Finance UI & Web Portal",
    badge: "NBFC PORTAL",
  },
  {
    name: "Digitons Development",
    url: "https://digitonsdevelopment.com/",
    role: "Founder & Creative Technologist",
    badge: "CREATIVE AGENCY",
  },
  {
    name: "Aiju Exports",
    url: "https://aijuexports.com/",
    role: "International Trade Web Experience",
    badge: "GLOBAL COMMERCE",
  },
];

// Helper to deterministically rank and select projects
const getProjectsForCategory = (cat: Project["category"]) => {
  return projectsData.filter((p) => p.category === cat);
};

// Category 01 — WEB
const webProjects = getProjectsForCategory("Website & Landing Pages");
const webHero = webProjects.find((p) => p.id === "landing-page") || webProjects[0];

// Category 02 — BRANDING
const brandingProjects = getProjectsForCategory("Print Media & Branding");
const brandingHero = brandingProjects.find((p) => p.id === "printing") || brandingProjects[0];
const brandingSecondary = brandingProjects
  .filter((p) => p.id !== brandingHero.id && Boolean(p.image))
  .slice(0, 4);

// Category 03 — SOCIAL
const socialProjects = getProjectsForCategory("Social Media Creatives");
const socialHero = socialProjects.find((p) => p.id === "social-post") || socialProjects[0];
const socialSecondary = socialProjects
  .filter((p) => p.id !== socialHero.id && Boolean(p.image))
  .slice(0, 4);

// Category 04 — EDITORIAL
const editorialProjects = getProjectsForCategory("Magazine Advertisements");
const editorialHero = editorialProjects.find((p) => p.id === "magazine-ad-5") || editorialProjects[0];
const editorialSecondary = editorialProjects
  .filter((p) => p.id !== editorialHero.id)
  .slice(0, 4);

// Category 05 — EMAIL
const emailProjects = getProjectsForCategory("Email Campaigns");
const emailHero = emailProjects.find((p) => p.id === "emailer") || emailProjects[0];
const emailSecondary = emailProjects
  .filter((p) => p.id !== emailHero.id && Boolean(p.image))
  .slice(0, 4);

// Category 06 — AI LAB Teaser Mock Project
const aiLabMockProject: Project = {
  id: "ai-lab-teaser",
  title: "Autonomous Agent & MCP Engine",
  category: "Website & Landing Pages",
  image: "/assets/portfolio/Landing Page.jpg",
  pdf: "",
};

export const PRESENTATION_CATEGORIES: CategoryDefinition[] = [
  {
    id: "cat-01",
    number: "01",
    slug: "web",
    title: "WEB & INTERFACES",
    tagline: "Digital Experiences, Systems & Web Engineering",
    description:
      "Production web platforms, responsive landing interfaces, and custom corporate applications engineered with modern web standards and high-conversion UX.",
    sourceCategory: "Website & Landing Pages",
    projectCount: webProjects.length + LIVE_WEBSITES.length,
    heroProject: webHero,
    secondaryProjects: [],
    liveWebsites: LIVE_WEBSITES,
  },
  {
    id: "cat-02",
    number: "02",
    slug: "branding",
    title: "BRAND IDENTITY & PRINT",
    tagline: "Visual Systems, Packaging & Physical Media",
    description:
      "Comprehensive identity systems, premium stationery, packaging architectures, and large-format print media crafted with mathematical grid precision.",
    sourceCategory: "Print Media & Branding",
    projectCount: brandingProjects.length,
    heroProject: brandingHero,
    secondaryProjects: brandingSecondary,
  },
  {
    id: "cat-03",
    number: "03",
    slug: "social",
    title: "SOCIAL CAMPAIGNS",
    tagline: "High-Engagement Visuals & Digital Creatives",
    description:
      "Multi-channel promotional campaigns, dynamic motion banners, and brand narratives designed to capture attention across competitive social feeds.",
    sourceCategory: "Social Media Creatives",
    projectCount: socialProjects.length,
    heroProject: socialHero,
    secondaryProjects: socialSecondary,
  },
  {
    id: "cat-04",
    number: "04",
    slug: "editorial",
    title: "EDITORIAL & PUBLICATIONS",
    tagline: "Magazine Advertisements & Publication Spreads",
    description:
      "Full-page publication advertisements, luxury magazine layouts, and editorial typography designed for premier business and lifestyle journals.",
    sourceCategory: "Magazine Advertisements",
    projectCount: editorialProjects.length,
    heroProject: editorialHero,
    secondaryProjects: editorialSecondary,
  },
  {
    id: "cat-05",
    number: "05",
    slug: "email",
    title: "EMAIL ARCHITECTURES",
    tagline: "High-Converting Email Drops & CRM Creatives",
    description:
      "Strategic email marketing designs optimized for deliverability, visual impact, and customer lifetime value across fintech, retail, and corporate sectors.",
    sourceCategory: "Email Campaigns",
    projectCount: emailProjects.length,
    heroProject: emailHero,
    secondaryProjects: emailSecondary,
  },
  {
    id: "cat-06",
    number: "06",
    slug: "ailab",
    title: "AI LAB & MCP SYSTEMS",
    tagline: "Autonomous Workflows, Claude MCP & Creative Code",
    description:
      "Where creative direction converges with autonomous AI agents, Model Context Protocol servers, LLM orchestration, and rapid prototype engineering.",
    sourceCategory: "AI Lab",
    projectCount: 4,
    heroProject: aiLabMockProject,
    secondaryProjects: [],
  },
];

export interface AIProject {
  id: string;
  name: string;
  badge: string;
  category: "MCP Architecture" | "AI Systems" | "Web Engineering" | "Systems & Tools";
  tagline: string;
  description: string;
  stack: string[];
  architecture?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  keyFeatures: string[];
}

export const AI_PROJECTS_DATA: AIProject[] = [
  {
    id: "google-drive-mcp-v2",
    name: "Digitons Google Drive MCP Server v2",
    badge: "VERIFIED REPO & ARCHITECTURE",
    category: "MCP Architecture",
    tagline: "Multi-User Remote Model Context Protocol Server for ChatGPT",
    description: "Production-ready, multi-user remote Model Context Protocol (MCP) server engineered for ChatGPT. Built with isolated per-user credentials, OAuth 2.0 with PKCE S256, and read-only Google Drive v3 tool integrations. Allows users to securely search, inspect, and read files via conversational AI with strict cryptographic tenant isolation.",
    stack: ["Node.js 22", "Express", "MCP Protocol SDK", "Google Drive API v3", "OAuth 2.0 PKCE", "Crypto"],
    architecture: "ChatGPT Client ↔ OAuth 2.0 PKCE ↔ Remote MCP Server (Node.js 22) ↔ Google Drive v3 API",
    repositoryUrl: "https://github.com/designer455/digitons-google-drive-mcp-v2",
    keyFeatures: [
      "Per-user cryptographically isolated OAuth credentials",
      "Read-only Google Drive v3 search, list, and read tools",
      "Compatible with ChatGPT Custom Actions & MCP Connectors",
      "Deployed on Hostinger Node.js 22 server environment",
    ],
  },
  {
    id: "google-search-mcp",
    name: "Digitons Google Search MCP Server",
    badge: "VERIFIED REPO & ARCHITECTURE",
    category: "MCP Architecture",
    tagline: "Live Web Search & SERP Analysis Protocol Engine",
    description: "Production-ready Model Context Protocol (MCP) server for Google Search built for Digitons Development. Exposes live Google Search capabilities, site-scoped searching, SEO keyword research, and multi-query SERP comparisons to AI assistants and LLM agents via Streamable HTTP transport with OAuth 2.1 and Bearer token authentication.",
    stack: ["TypeScript", "Node.js", "MCP SDK", "Google Web Search API", "Google Custom Search JSON API", "OAuth 2.1"],
    architecture: "LLM Agent / Claude ↔ Streamable HTTP ↔ MCP Handler ↔ Google Search APIs",
    repositoryUrl: "https://github.com/designer455/digitons-google-search-mcp",
    keyFeatures: [
      "Streamable HTTP transport with OAuth 2.1 authentication",
      "Dual provider: Google Web Search API with Custom Search fallback",
      "Site-scoped search, SEO keyword queries, and SERP comparisons",
      "Clean JSON-RPC standard tool interfaces for agents",
    ],
  },
  {
    id: "digitons-platform",
    name: "Digitons Digital Agency Platform",
    badge: "VERIFIED LIVE PLATFORM",
    category: "Web Engineering",
    tagline: "Creative Technology Studio & Client Solutions Platform",
    description: "Digital agency web platform combining visual branding systems, responsive web architecture, and automated client workflow pipelines. Serves as the operational hub for creative and development offerings.",
    stack: ["JavaScript", "HTML5", "CSS3 / Sass", "Responsive UI", "Client Architecture"],
    repositoryUrl: "https://github.com/designer455/digitons",
    liveUrl: "https://digitonsdevelopment.com/",
    keyFeatures: [
      "Bespoke visual branding and responsive interface layouts",
      "Integrated client inquiry and project intake pipelines",
      "High-performance asset loading and mobile-first typography",
      "Modular design system tailored for digital agency services",
    ],
  },
  {
    id: "restaurant-billing",
    name: "Restaurant Billing Software",
    badge: "VERIFIED OFFLINE APP",
    category: "Systems & Tools",
    tagline: "Offline-First Desktop Point-of-Sale & Invoice Engine",
    description: "Offline-first desktop counter billing application engineered for fast restaurant operations. Delivers instant thermal receipt printing, tax computation, table management, and local data persistence with zero internet reliance.",
    stack: ["Electron", "Node.js", "JavaScript", "Thermal Printing API", "Local Persistence"],
    keyFeatures: [
      "100% offline-first architecture with instant boot time",
      "Thermal printer ESC/POS driver integration for fast receipts",
      "Order management with GST tax breakdowns and table tracking",
      "Robust local storage with exportable financial reporting",
    ],
  },
  {
    id: "zuvio-school",
    name: "Zuvio Global School Portal",
    badge: "VERIFIED REPO & MONOREPO",
    category: "Web Engineering",
    tagline: "Full-Stack Online Academy CMS & Academic Platform",
    description: "Monorepo online education portal featuring a modern React + Vite frontend, a Node.js + Express REST API backend, and a standardized MySQL relational database. Built for personalized learning curricula, media publishing, and academic session management.",
    stack: ["React", "Vite", "Node.js", "Express REST API", "MySQL", "Tailwind CSS"],
    repositoryUrl: "https://github.com/varun100-dot/school",
    keyFeatures: [
      "Monorepo architecture with clean frontend/backend separation",
      "Express REST API handling authentication, media, and SEO details",
      "Interactive React + Vite frontend with custom routing and layouts",
      "Relational schema for student tracking, blogging, and curriculum",
    ],
  },
];

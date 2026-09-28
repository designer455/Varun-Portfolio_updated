export type WorkflowLayer = "CREATIVE" | "AI" | "MCP" | "BUILD" | "SHIP";

export interface AITool {
  id: string;
  name: string;
  category: WorkflowLayer;
  tagline: string;
  description: string;
  verifiedUsage: string;
  highlights: string[];
  iconName?: string;
}

export const WORKFLOW_LAYERS: {
  id: WorkflowLayer;
  name: string;
  subtitle: string;
  stepNumber: string;
  description: string;
}[] = [
  {
    id: "CREATIVE",
    name: "Creative Design",
    subtitle: "Visual Foundation",
    stepNumber: "01",
    description: "High-fidelity visual design, vector branding, typography, and publication layouts engineered in industry-standard creative suites.",
  },
  {
    id: "AI",
    name: "Artificial Intelligence",
    subtitle: "Reasoning & Velocity",
    stepNumber: "02",
    description: "Leveraging frontier LLMs, agentic developer runtimes, and prompt pipelines to accelerate logic creation and architectural exploration.",
  },
  {
    id: "MCP",
    name: "Model Context Protocol",
    subtitle: "Systems & Integration",
    stepNumber: "03",
    description: "Custom MCP server microservices connecting language models to external data sources, search engines, and local file systems.",
  },
  {
    id: "BUILD",
    name: "Engineering & Code",
    subtitle: "Full-Stack Development",
    stepNumber: "04",
    description: "Production web applications built with modern React, Next.js App Router, TypeScript, and clean modular architecture.",
  },
  {
    id: "SHIP",
    name: "Deploy & Maintain",
    subtitle: "Production Operations",
    stepNumber: "05",
    description: "Zero-downtime deployments, edge delivery, VPS process management, encrypted environment isolation, and production debugging.",
  },
];

export const AI_TOOLS_DATA: AITool[] = [
  // 01. CREATIVE
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    category: "CREATIVE",
    tagline: "Raster manipulation & visual design",
    description: "Professional digital imaging, complex multi-layer compositions, photo retouching, and pixel-precise web asset preparation.",
    verifiedUsage: "Used across 4+ years for 114+ production design projects, product creatives, and digital marketing campaigns.",
    highlights: ["Compositing & Retouching", "Web & Social Media Assets", "Color Grading & Masking"],
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    category: "CREATIVE",
    tagline: "Vector branding & publication design",
    description: "Precision vector artwork, logo systems, iconography, corporate visual identity, and print publication layouts.",
    verifiedUsage: "Core tool for corporate branding packages, multi-page catalogs, and vector illustrations.",
    highlights: ["Logo & Brand Identity", "Vector Illustration", "Prepress Publications"],
  },
  {
    id: "coreldraw",
    name: "CorelDRAW",
    category: "CREATIVE",
    tagline: "Commercial print & packaging layouts",
    description: "Industrial vector design, commercial packaging, large-format outdoor media, and prepress production specifications.",
    verifiedUsage: "Extensively utilized for packaging die-lines, stationery suites, and high-volume commercial print jobs.",
    highlights: ["Packaging & Die-Lines", "Prepress Print Output", "Large-Format Media"],
  },
  {
    id: "canva",
    name: "Canva",
    category: "CREATIVE",
    tagline: "Rapid marketing collateral & templating",
    description: "Fast-turnaround social media graphics, reusable marketing templates, and presentation deck structuring.",
    verifiedUsage: "Employed for rapid prototyping of social content and collaborative client template handoffs.",
    highlights: ["Social Media Templates", "Rapid Prototyping", "Marketing Decks"],
  },

  // 02. AI
  {
    id: "gpt",
    name: "GPT / OpenAI",
    category: "AI",
    tagline: "Reasoning models & code synthesis",
    description: "Advanced language models applied to code generation, structural refactoring, interface copywriting, and algorithmic reasoning.",
    verifiedUsage: "Utilized for architectural ideation, complex regex/data transformations, and natural language interfaces.",
    highlights: ["Reasoning & Analysis", "Code Generation", "Prompt Engineering"],
  },
  {
    id: "gpt-mcp",
    name: "GPT MCP Connectors",
    category: "AI",
    tagline: "Custom ChatGPT Actions with MCP",
    description: "Integration layer connecting ChatGPT Custom Actions directly to remote Model Context Protocol endpoints with OAuth 2.0.",
    verifiedUsage: "Connected ChatGPT to custom remote Google Drive and Google Search servers via OAuth PKCE.",
    highlights: ["ChatGPT Custom Actions", "OAuth 2.0 PKCE", "Remote Data Access"],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    category: "AI",
    tagline: "Terminal-driven agentic engineering",
    description: "Anthropic's agentic command-line tool for multi-file codebase analysis, architectural refactoring, and automated testing.",
    verifiedUsage: "Applied for autonomous development workflows, full-stack debugging, and terminal automation.",
    highlights: ["Codebase Refactoring", "Autonomous Workflows", "Terminal Integration"],
  },
  {
    id: "codex",
    name: "Codex / Copilot",
    category: "AI",
    tagline: "Real-time contextual code intelligence",
    description: "Inline code completions, boilerplate elimination, and instantaneous context-aware syntax assistance.",
    verifiedUsage: "Daily driver in the code editor for rapid TypeScript type construction and component scaffolding.",
    highlights: ["Contextual Autocomplete", "TypeScript Interfaces", "Developer Velocity"],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    category: "AI",
    tagline: "Multimodal reasoning & ecosystem tools",
    description: "Multimodal analysis across code, image assets, documentation, and deep integration with Google Cloud ecosystems.",
    verifiedUsage: "Used for document extraction, multimodal UI review, and Google ecosystem automation.",
    highlights: ["Multimodal Understanding", "Large Context Windows", "Google Ecosystem"],
  },
  {
    id: "antigravity",
    name: "Antigravity",
    category: "AI",
    tagline: "Agentic coding system & browser validation",
    description: "Advanced multi-agent coding framework executing end-to-end full-stack tasks, file modifications, and live browser verification.",
    verifiedUsage: "Core engine for comprehensive portfolio architecture transformations, automated testing, and QA.",
    highlights: ["Autonomous Execution", "Browser Telemetry QA", "Multi-File Edits"],
  },
  {
    id: "google-flow",
    name: "Google Flow",
    category: "AI",
    tagline: "Visual flow orchestration & sequencing",
    description: "Structured sequencing of prompt pipelines, decision branches, and automated conditional chains.",
    verifiedUsage: "Used to design multi-step pipeline architectures and data routing logic.",
    highlights: ["Pipeline Orchestration", "Decision Trees", "Flow Automation"],
  },

  // 03. MCP
  {
    id: "mcp-core",
    name: "Model Context Protocol",
    category: "MCP",
    tagline: "Open standard for LLM tool integration",
    description: "Anthropic's open specification enabling AI models to safely interact with local data, remote APIs, and custom server tools.",
    verifiedUsage: "Architectural foundation for custom remote tools connecting ChatGPT and Claude to proprietary backends.",
    highlights: ["JSON-RPC Standard", "Tool & Resource Expose", "Secure Boundary"],
  },
  {
    id: "google-drive-mcp",
    name: "Google Drive MCP v2",
    category: "MCP",
    tagline: "Multi-user remote Drive protocol server",
    description: "Production-ready remote MCP server for ChatGPT with multi-user cryptographic isolation, OAuth 2.0 with PKCE S256, and Google Drive v3 read tools.",
    verifiedUsage: "Built and open-sourced in GitHub repository 'digitons-google-drive-mcp-v2' running on Node.js 22.",
    highlights: ["Per-User Token Isolation", "OAuth 2.0 PKCE S256", "Drive v3 Search & Read"],
  },
  {
    id: "google-search-mcp",
    name: "Google Search MCP",
    category: "MCP",
    tagline: "Live search & SERP analysis server",
    description: "Remote MCP server providing live web search, site-scoped searching, SEO keyword analysis, and SERP comparisons via Streamable HTTP.",
    verifiedUsage: "Built in repository 'digitons-google-search-mcp' with Google Web Search and Custom Search APIs.",
    highlights: ["Streamable HTTP Transport", "OAuth 2.1 & Bearer Auth", "SERP Comparisons"],
  },
  {
    id: "apis-webhooks",
    name: "APIs & Webhooks",
    category: "MCP",
    tagline: "Secure communication & event piping",
    description: "RESTful JSON endpoints, Webhook dispatchers, token validation middleware, and cryptographic signature verification.",
    verifiedUsage: "Engineered across custom Express microservices and client integration pipelines.",
    highlights: ["RESTful Schemas", "Token Validation", "Cryptographic Signatures"],
  },

  // 04. BUILD
  {
    id: "react",
    name: "React (v19)",
    category: "BUILD",
    tagline: "Declarative UI component architecture",
    description: "Modern component-driven development utilizing concurrent features, Server/Client components, and custom hooks.",
    verifiedUsage: "Frontend foundation for this portfolio, Zuvio Global School, and Digitons web platforms.",
    highlights: ["Component Composition", "Custom Hooks", "Concurrent Mode"],
  },
  {
    id: "nextjs",
    name: "Next.js (v16 App Router)",
    category: "BUILD",
    tagline: "Production React framework for the Web",
    description: "Enterprise web application framework featuring hybrid rendering, edge middleware, asset optimization, and SEO metadata.",
    verifiedUsage: "Powering this personal portfolio with App Router, server rendering, and zero-flash asset pipelines.",
    highlights: ["App Router Architecture", "SSR & Edge Runtimes", "Turbopack Bundler"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "BUILD",
    tagline: "Static typing for resilient codebases",
    description: "Strict typing across all interfaces, data models, component props, and API response payloads.",
    verifiedUsage: "Enforced across all modern web projects, MCP server definitions, and build pipelines.",
    highlights: ["Strict Type Safety", "Generic Data Models", "Zero Runtime Crashes"],
  },
  {
    id: "nodejs",
    name: "Node.js (v22)",
    category: "BUILD",
    tagline: "High-performance server runtime",
    description: "Event-driven asynchronous server runtime executing backend APIs, file-system transformations, and MCP servers.",
    verifiedUsage: "Server foundation for Google Drive MCP v2, Google Search MCP, and Express REST services.",
    highlights: ["Async Non-blocking I/O", "Native Crypto & Fetch", "Express Framework"],
  },
  {
    id: "github",
    name: "GitHub & Version Control",
    category: "BUILD",
    tagline: "Source collaboration & automated workflows",
    description: "Git repositories, branching strategies, semantic version checkpoints, and continuous integration workflows.",
    verifiedUsage: "Managing production repositories: Varun-Portfolio, digitons-google-drive-mcp-v2, and digitons-google-search-mcp.",
    highlights: ["Semantic Checkpoints", "Branch Management", "CI/CD Actions"],
  },

  // 05. SHIP
  {
    id: "vercel",
    name: "Vercel",
    category: "SHIP",
    tagline: "Edge deployment & global CDN delivery",
    description: "Serverless edge network deployment with instant Git rollouts, atomic builds, preview branches, and custom domains.",
    verifiedUsage: "Hosts the live production portfolio (varun-chauhan.vercel.app) with edge optimization.",
    highlights: ["Instant Edge Rollouts", "Zero-Downtime Builds", "Global Anycast CDN"],
  },
  {
    id: "vps-servers",
    name: "Linux VPS & Servers",
    category: "SHIP",
    tagline: "Node.js host management & PM2 processes",
    description: "Production Linux server administration, PM2 process persistence, reverse proxy routing, and SSL certificate management.",
    verifiedUsage: "Deployed Node.js 22 MCP services on Hostinger VPS infrastructure with persistent process supervision.",
    highlights: ["PM2 Process Management", "Reverse Proxy Routing", "SSL & Domain Config"],
  },
  {
    id: "env-security",
    name: "Environment & Security",
    category: "SHIP",
    tagline: "Encrypted secrets & zero-trust isolation",
    description: "Cryptographic credential handling, environment variable protection, per-tenant data boundaries, and safe token lifecycles.",
    verifiedUsage: "Implemented multi-user cryptographic credential isolation in Google Drive MCP v2.",
    highlights: ["Zero-Trust Per-User Isolation", "Encrypted Credentials", "Strict CORS Policies"],
  },
  {
    id: "production-qa",
    name: "Production Debugging & QA",
    category: "SHIP",
    tagline: "DevTools profiling & telemetry inspection",
    description: "Real-time error logging, Chrome DevTools performance profiling, responsive viewport testing, and runtime validation.",
    verifiedUsage: "Rigorous multi-viewport testing across 6 screen formats with zero console errors.",
    highlights: ["Multi-Viewport Testing", "Zero Console Errors", "Performance Profiling"],
  },
];

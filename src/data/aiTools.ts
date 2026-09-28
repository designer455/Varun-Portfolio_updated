export interface AIToolItem {
  id: string;
  name: string;
  logo: string;
  description: string;
  category?: string;
  url?: string;
}

export const AI_TOOLS: AIToolItem[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "/assets/ai-tools/chatgpt.svg",
    description: "Frontier reasoning, conversational ideation, and rapid workflow acceleration.",
  },
  {
    id: "claude",
    name: "Claude",
    logo: "/assets/ai-tools/Claude.svg",
    description: "Deep contextual reasoning, codebase analysis, and complex problem decomposition.",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    logo: "/assets/ai-tools/claude-code.svg",
    description: "Terminal-native agentic programming and intelligent command-line codebase refactoring.",
  },
  {
    id: "codex",
    name: "Codex",
    logo: "/assets/ai-tools/codex.svg",
    description: "Intelligent code generation, pattern synthesis, and generative algorithm development.",
  },
  {
    id: "antigravity",
    name: "Antigravity IDE",
    logo: "/assets/ai-tools/google-antigravity.svg",
    description: "Advanced agentic pair programming environment with comprehensive workspace context.",
  },
  {
    id: "google-flow",
    name: "Google Flow",
    logo: "/assets/ai-tools/Google-flow.svg",
    description: "Visual agent orchestration and streamlined enterprise workflow pipeline design.",
  },
  {
    id: "gemini",
    name: "Gemini",
    logo: "/assets/ai-tools/google-gemini.svg",
    description: "Multimodal synthesis across text, image, and high-capacity long-context research.",
  },
];

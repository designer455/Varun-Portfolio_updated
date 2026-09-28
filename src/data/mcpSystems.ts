export interface MCPSystemItem {
  id: string;
  name: string;
  logo: string;
  badge: string;
  description: string;
  serverUrl: string;
  authorizationUrl: string;
  tokenUrl: string;
  authentication: string;
  capabilities: string[];
  setupSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  ctaText: string;
  ctaUrl: string;
}

export const MCP_SYSTEMS: MCPSystemItem[] = [
  {
    id: "gmail-mcp",
    name: "Gmail MCP",
    logo: "/assets/MCP/Gmail.svg",
    badge: "Model Context Protocol",
    description: "Production multi-user Model Context Protocol server exposing verified Gmail operations directly to AI assistants via Streamable HTTP.",
    serverUrl: "https://gmail-mcp-web-client.vercel.app/mcp",
    authorizationUrl: "https://gmail-mcp-web-client.vercel.app/oauth/authorize",
    tokenUrl: "https://gmail-mcp-web-client.vercel.app/oauth/token",
    authentication: "OAuth 2.1 + PKCE",
    capabilities: [
      "Targeted email search using query syntax (from:, is:unread, subject:, after:)",
      "Message inspection, decoded message bodies, and attachments metadata",
      "Full conversation thread retrieval and context reconstruction",
      "Direct RFC 2822 email drafting and outgoing dispatch",
      "Cryptographically isolated user sessions with AES-256-GCM encrypted tokens",
    ],
    setupSteps: [
      {
        step: "01",
        title: "Register Server",
        description: "Add the MCP endpoint URL into your client configuration (ChatGPT, Claude Desktop, or custom MCP runner).",
      },
      {
        step: "02",
        title: "Initiate OAuth Flow",
        description: "Start the authorization handshake to trigger secure user consent.",
      },
      {
        step: "03",
        title: "Authorize Permissions",
        description: "Grant Gmail permissions securely through official Google account authentication.",
      },
      {
        step: "04",
        title: "Execute Actions",
        description: "Interact with inbox messages, threads, and drafting tools conversationally.",
      },
    ],
    ctaText: "VIEW GMAIL MCP →",
    ctaUrl: "https://gmail-mcp-web-client.vercel.app/mcp",
  },
  {
    id: "google-drive-mcp",
    name: "Google Drive MCP",
    logo: "/assets/MCP/google-drive.svg",
    badge: "Model Context Protocol",
    description: "Multi-user Google Drive MCP server providing conversational AI models with granular search, inspection, and document export capabilities.",
    serverUrl: "https://google-drive-mcp-six.vercel.app/mcp",
    authorizationUrl: "https://google-drive-mcp-six.vercel.app/authorize",
    tokenUrl: "https://google-drive-mcp-six.vercel.app/token",
    authentication: "OAuth 2.1 + PKCE",
    capabilities: [
      "Query-based file and folder search with structured MIME type filters",
      "Folder listing, file metadata inspection, and hierarchy exploration",
      "Direct text export for Google Docs, Sheets (CSV), and Slides (Markdown)",
      "PDF binary compilation and document download generation",
      "Zero shared credentials with per-user atomic token isolation",
    ],
    setupSteps: [
      {
        step: "01",
        title: "Add Server URL",
        description: "Configure the public Streamable HTTP MCP server URL in your assistant settings.",
      },
      {
        step: "02",
        title: "Start OAuth",
        description: "Trigger the dedicated OAuth 2.1 authorization request.",
      },
      {
        step: "03",
        title: "Grant Drive Access",
        description: "Authorize read/search permissions for your personal Google Drive account.",
      },
      {
        step: "04",
        title: "Access Files",
        description: "Query documents, search drive contents, and inspect files natively in chat.",
      },
    ],
    ctaText: "VIEW GOOGLE DRIVE MCP →",
    ctaUrl: "https://google-drive-mcp-six.vercel.app/mcp",
  },
];

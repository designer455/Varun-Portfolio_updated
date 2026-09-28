"use client";

import React, { useState, FormEvent, useCallback } from "react";
import { Bot, X } from "lucide-react";
import JarvisPanel, { ChatMessage } from "./JarvisPanel";
import { JarvisCommandItem } from "./JarvisCommand";

export default function JarvisAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Greetings! I am JARVIS, Varun's Interactive Portfolio Assistant.\n\nAsk me about his AI & MCP systems, 114-project Work Vault, professional experience, notice period, or choose a quick command below.",
      timestamp: "Ready",
    },
  ]);
  const [customInput, setCustomInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Helper to smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Rule-based natural language parser incorporating verified facts
  const getBotResponse = useCallback(
    (input: string): { response: string; isHtml?: boolean; navigateTo?: string; vaultFilter?: string } => {
      const q = input.toLowerCase().trim();

      // 1. AI, MCP, Automation & Stack Queries
      if (
        q.includes("ai") ||
        q.includes("mcp") ||
        q.includes("agent") ||
        q.includes("claude") ||
        q.includes("gpt") ||
        q.includes("drive mcp") ||
        q.includes("search mcp") ||
        q.includes("stack")
      ) {
        return {
          response:
            "<b>Varun's AI & MCP Engineering Stack:</b><br/>" +
            "• <b>Frontier AI:</b> GPT, Claude Code, Gemini, Codex, Antigravity, Google Flow.<br/>" +
            "• <b>Verified MCP Servers:</b><br/>" +
            "  1. <i>Digitons Google Drive MCP v2</i> — Multi-user remote MCP server for ChatGPT with isolated per-user OAuth 2.0 PKCE credentials.<br/>" +
            "  2. <i>Digitons Google Search MCP</i> — Remote protocol engine for live SERP comparisons via Streamable HTTP.<br/>" +
            "• <b>Full-Stack:</b> React 19, Next.js 16, TypeScript, Node.js 22, Express, Vercel.<br/>" +
            "<i>Navigating you to the AI Lab section now...</i>",
          isHtml: true,
          navigateTo: "ailab",
        };
      }

      // 2. Web Work / Websites
      if (
        q.includes("web") ||
        q.includes("website") ||
        q.includes("landing page") ||
        q.includes("bimapay") ||
        q.includes("hindon.co") ||
        q.includes("digitons")
      ) {
        return {
          response:
            "Varun has engineered websites across fintech, exports, and digital agencies:<br/>" +
            "• <b>Digitons Development:</b> <a href='https://digitonsdevelopment.com/' target='_blank' class='text-[#CCFF00] underline font-semibold'>digitonsdevelopment.com</a><br/>" +
            "• <b>Bimapay:</b> <a href='https://bimapay.in/' target='_blank' class='text-[#CCFF00] underline font-semibold'>bimapay.in</a><br/>" +
            "• <b>Hindon:</b> <a href='https://hindon.co/' target='_blank' class='text-[#CCFF00] underline font-semibold'>hindon.co</a><br/>" +
            "<i>Filtering Work Vault to WEB projects now...</i>",
          isHtml: true,
          navigateTo: "work",
          vaultFilter: "WEB",
        };
      }

      // 3. Branding & Print
      if (
        q.includes("brand") ||
        q.includes("logo") ||
        q.includes("print") ||
        q.includes("brochure") ||
        q.includes("catalog") ||
        q.includes("packaging")
      ) {
        return {
          response:
            "Varun has created <b>31 verified Print Media & Branding projects</b>, including catalogs, brochures, stationery, and packaging die-lines.<br/>" +
            "<i>Activating BRANDING filter in the Work Vault...</i>",
          isHtml: true,
          navigateTo: "work",
          vaultFilter: "BRANDING",
        };
      }

      // 4. Social Media
      if (
        q.includes("social") ||
        q.includes("instagram") ||
        q.includes("creative") ||
        q.includes("rupeecircle") ||
        q.includes("mufin")
      ) {
        return {
          response:
            "Varun has published <b>62 verified Social Media Creatives</b> for brands like Rupeecircle, Bimapay, and Mufin Finance.<br/>" +
            "<i>Activating SOCIAL filter in the Work Vault...</i>",
          isHtml: true,
          navigateTo: "work",
          vaultFilter: "SOCIAL",
        };
      }

      // 5. Editorial / Magazine
      if (q.includes("editorial") || q.includes("magazine") || q.includes("ad")) {
        return {
          response:
            "Varun has created <b>12 high-impact Magazine Advertisements</b> and editorial publications.<br/>" +
            "<i>Activating EDITORIAL filter in the Work Vault...</i>",
          isHtml: true,
          navigateTo: "work",
          vaultFilter: "EDITORIAL",
        };
      }

      // 6. Experience & Work History
      if (
        q.includes("experience") ||
        q.includes("how long") ||
        q.includes("tenure") ||
        q.includes("work history") ||
        q.includes("company") ||
        q.includes("kairali") ||
        q.includes("hindon")
      ) {
        return {
          response:
            "Varun has <b>4+ Years</b> of verified professional experience:<br/>" +
            "• <b>Kairali Ayurvedic Group</b> (Apr 2023 – Present): Graphic & Web Designer, building admin panels (HTML/CSS/Bootstrap), managing website frontends, and marketing assets.<br/>" +
            "• <b>Hindon Mercantile Limited</b> (Jun 2021 – Mar 2023): Web & Graphic Designer, managing front-end architectures, server integrations, and WordPress.<br/>" +
            "• <b>Risezonic LLP</b> (Sep 2020 – Feb 2021): IT / Web Intern.",
          isHtml: true,
          navigateTo: "about",
        };
      }

      // 7. Notice Period & Availability
      if (q.includes("notice") || q.includes("join") || q.includes("available")) {
        return {
          response:
            "Varun has an official <b>1 Month notice period</b> and is open for discussions regarding high-impact full-time roles or specialized contracts.",
          isHtml: true,
        };
      }

      // 8. CTC / Compensation
      if (
        q.includes("salary") ||
        q.includes("ctc") ||
        q.includes("package") ||
        q.includes("compensation") ||
        q.includes("budget")
      ) {
        return {
          response:
            "Varun's current CTC is <b>₹ 8,31,600 per annum</b>. For tailored project retainers or full-time opportunities, please reach out directly via the contact form or WhatsApp.",
          isHtml: true,
        };
      }

      // 9. Certifications
      if (q.includes("certif") || q.includes("degree") || q.includes("credential")) {
        return {
          response:
            "<b>Verified Certifications & Education:</b><br/>" +
            "• Adobe Certified Associate (Illustrator, InDesign, Premiere Pro)<br/>" +
            "• Front End Development - HTML (Great Learning Academy)<br/>" +
            "• Advanced Program in Digital Media & Design (MAAC)<br/>" +
            "• BA from Delhi University (2018–2021).<br/>" +
            "<i>Navigating you to the Credentials section...</i>",
          isHtml: true,
          navigateTo: "credentials",
        };
      }

      // 10. Contact
      if (
        q.includes("contact") ||
        q.includes("email") ||
        q.includes("phone") ||
        q.includes("call") ||
        q.includes("whatsapp") ||
        q.includes("hire")
      ) {
        return {
          response:
            "You can reach Varun directly:<br/>" +
            "• Email: <a href='mailto:c.graphics00@gmail.com' class='text-[#CCFF00] underline font-semibold'>c.graphics00@gmail.com</a><br/>" +
            "• Phone: +91 87002 36209 / 70426 16702<br/>" +
            "• LinkedIn: <a href='https://www.linkedin.com/in/varun-chauhan-designer/' target='_blank' class='text-[#CCFF00] underline font-semibold'>varun-chauhan-designer</a>",
          isHtml: true,
          navigateTo: "contact",
        };
      }

      // Default Response
      return {
        response:
          "I'm here to guide you through Varun's portfolio. You can ask about:\n" +
          "• 'AI stack' or 'MCP servers'\n" +
          "• 'Websites', 'Branding', or 'Social work'\n" +
          "• 'Experience', 'Notice period', or 'Certifications'\n" +
          "Or click one of the quick commands below.",
        isHtml: false,
      };
    },
    []
  );

  // Send message handler
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCustomInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotResponse(textToSend);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.response,
        timestamp: time,
        isHtml: reply.isHtml,
      };

      setMessages((prev) => [...prev, botMsg]);

      // If reply dictates filtering Work Vault
      if (reply.vaultFilter) {
        window.dispatchEvent(
          new CustomEvent("set-vault-filter", { detail: reply.vaultFilter })
        );
      }

      // If reply dictates navigation
      if (reply.navigateTo) {
        scrollToSection(reply.navigateTo);
      }
    }, 600);
  };

  // Quick Command Execution
  const handleExecuteCommand = (cmd: JarvisCommandItem) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add command as user query
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: cmd.label,
        timestamp: time,
      },
      {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `Executing navigation to ${cmd.label}...`,
        timestamp: time,
      },
    ]);

    // Dispatch Work Vault filter if specified
    if (cmd.vaultFilter) {
      window.dispatchEvent(
        new CustomEvent("set-vault-filter", { detail: cmd.vaultFilter })
      );
    }

    // Scroll to section smoothly
    scrollToSection(cmd.targetSection);
  };

  const handleSubmitInput = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(customInput);
  };

  return (
    <>
      {/* Floating Trigger Control (Sleek Obsidian Capsule) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-sans pointer-events-auto">
        <button
          type="button"
          data-cursor="explore"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close JARVIS Assistant" : "Open JARVIS Assistant"}
          className={`group relative flex items-center justify-center rounded-full border transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen
              ? "w-12 h-12 bg-[#0C111D] border-[#CCFF00] text-[#CCFF00] rotate-90"
              : "h-12 px-4 bg-[#0C111D]/90 backdrop-blur-xl border-white/20 hover:border-[#CCFF00] text-white hover:shadow-[0_0_25px_rgba(204,255,0,0.25)]"
          }`}
        >
          {isOpen ? (
            <X size={18} />
          ) : (
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]" />
              </span>
              <Bot size={15} className="text-[#CCFF00]" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                JARVIS
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Main Glass Panel */}
      <JarvisPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        customInput={customInput}
        setCustomInput={setCustomInput}
        onSubmitInput={handleSubmitInput}
        onExecuteCommand={handleExecuteCommand}
      />
    </>
  );
}

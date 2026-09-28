"use client";

import React, { useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import { X, Send, MessageCircle, Bot } from "lucide-react";
import JarvisCommand, { JarvisCommandItem } from "./JarvisCommand";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isHtml?: boolean;
}

interface JarvisPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isTyping: boolean;
  customInput: string;
  setCustomInput: (val: string) => void;
  onSubmitInput: (e: FormEvent) => void;
  onExecuteCommand: (cmd: JarvisCommandItem) => void;
}

export default function JarvisPanel({
  isOpen,
  onClose,
  messages,
  isTyping,
  customInput,
  setCustomInput,
  onSubmitInput,
  onExecuteCommand,
}: JarvisPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="JARVIS Portfolio Assistant"
      aria-modal="true"
      className="fixed inset-x-3 bottom-20 sm:inset-x-auto sm:right-6 sm:bottom-24 w-auto sm:w-[410px] max-w-[calc(100vw-24px)] max-h-[85vh] sm:max-h-[640px] bg-[#0C111D]/95 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-50 animate-fade-in"
    >
      {/* Panel Header */}
      <div className="bg-[#070D18] p-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#CCFF00]/40 bg-[#030712] shrink-0 flex items-center justify-center">
            <Image
              src="/assets/varun-profile.jpeg"
              alt="Varun Chauhan Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Bot size={13} className="text-[#CCFF00]" />
              <h4 className="text-xs font-display font-bold tracking-wider uppercase text-white">
                JARVIS
              </h4>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
              INTERACTIVE PORTFOLIO ASSISTANT
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-pointer"
          aria-label="Close Assistant Panel"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#030712]/90 flex flex-col gap-3 min-h-[200px] max-h-[320px] scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
              msg.sender === "bot"
                ? "bg-[#0C111D] border border-white/10 text-zinc-100 rounded-tl-none self-start"
                : "bg-[#15803D] text-white rounded-tr-none self-end"
            }`}
          >
            {msg.isHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: msg.text }}
                className="space-y-1"
              />
            ) : (
              <p className="whitespace-pre-line">{msg.text}</p>
            )}
            <span className="text-[8px] font-mono text-zinc-400 block text-right mt-1.5">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#0C111D] border border-white/10 text-white max-w-[70px] rounded-2xl rounded-tl-none p-3 text-xs self-start flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-bounce delay-200" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Commands Carousel / Grid */}
      <JarvisCommand onExecute={onExecuteCommand} />

      {/* Direct WhatsApp Quick Contact Link */}
      <div className="px-3.5 py-1.5 bg-[#070D18] border-t border-white/10 flex items-center justify-between gap-2 shrink-0">
        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
          Direct Connect
        </span>
        <a
          href="https://wa.me/918700236209?text=Hello%20Varun,%20I%20am%20exploring%20your%20portfolio%20and%20would%20love%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          className="px-2.5 py-1 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-zinc-950 font-mono font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
        >
          <MessageCircle size={10} />
          <span>Message on WhatsApp</span>
        </a>
      </div>

      {/* Action Input Footer */}
      <form
        onSubmit={onSubmitInput}
        className="p-3 bg-[#0C111D] border-t border-white/10 flex items-center gap-2 shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Ask: 'show AI', 'experience', 'notice period'..."
          className="flex-1 bg-[#030712] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00] text-[11px] font-sans"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-[#CCFF00] text-black hover:bg-[#b8e600] transition-colors cursor-pointer shrink-0"
          aria-label="Send query"
        >
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}

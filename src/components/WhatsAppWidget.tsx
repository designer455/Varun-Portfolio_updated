"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918700236209";

  const welcomeMessage = "Hi there! 👋 I am Varun's assistant. How can I help you today?";

  useEffect(() => {
    // Load initial welcome message
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        sender: "bot",
        text: welcomeMessage,
        timestamp: time,
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptionClick = (option: string, botResponse: string, linkUrl?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    // Add user response
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: option, timestamp: time },
    ]);
    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, timestamp: time },
      ]);
      
      if (linkUrl) {
        window.open(linkUrl, "_blank");
      }
      
      setShowOptions(true);
    }, 1000);
  };

  const handleCustomSend = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const text = `Hi Varun, I saw your portfolio and want to discuss a project with you.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group relative z-50 cursor-pointer"
        aria-label="Open Chatbot"
      >
        {/* Glow pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        
        {isOpen ? (
          <X size={24} className="transition-transform duration-300 rotate-90" />
        ) : (
          <svg className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-6" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98-1.864-1.865-4.343-2.89-6.982-2.892-5.445 0-9.869 4.42-9.873 9.864-.001 1.73.454 3.42 1.316 4.922L1.84 21.16l4.807-1.26z" />
          </svg>
        )}
      </button>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-[330px] sm:w-[360px] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-fade-in z-40">
          
          {/* Header */}
          <div className="bg-[#075e54] p-5 text-white flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-400 bg-zinc-900 shrink-0">
              <Image
                src="/assets/updated profile.jpeg"
                alt="Varun Chauhan Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wide uppercase text-white">
                Varun Chauhan
              </h4>
              <p className="text-[10px] text-emerald-300 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Online | Typically replies instantly
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 h-[280px] overflow-y-auto bg-[url('/assets/chat-bg.png')] bg-zinc-900 flex flex-col gap-3 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === "bot"
                    ? "bg-zinc-800 text-white rounded-tl-none self-start"
                    : "bg-[#056162] text-white rounded-tr-none self-end"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[9px] text-white/40 block text-right mt-1.5 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="bg-zinc-800 text-white max-w-[70px] rounded-2xl rounded-tl-none p-3 text-xs self-start flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Options */}
          {showOptions && (
            <div className="p-3 bg-zinc-950 border-t border-zinc-850 flex flex-col gap-2 shrink-0">
              <button
                onClick={() =>
                  handleOptionClick(
                    "🛠 Key Skills",
                    "Varun has 4+ years of expertise in Graphic & Website Design, specializing in Corel Draw, Illustrator, Photoshop, WordPress, PowerPoint, HTML, CSS, and Bootstrap."
                  )
                }
                className="text-left w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white uppercase tracking-wider flex items-center justify-between transition-colors duration-200 cursor-pointer"
              >
                <span>🛠 Key Skills & Tools</span>
                <ArrowRight size={12} className="text-accent" />
              </button>

              <button
                onClick={() =>
                  handleOptionClick(
                    "🚀 Services Offered",
                    "Varun offers: \n1. Website & UI/UX Design (landing pages, prototype wireframes)\n2. Print Media & Brand publication books\n3. Social Media & high-converting emailer graphics."
                  )
                }
                className="text-left w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white uppercase tracking-wider flex items-center justify-between transition-colors duration-200 cursor-pointer"
              >
                <span>🚀 Services Offered</span>
                <ArrowRight size={12} className="text-accent" />
              </button>

              <button
                onClick={() =>
                  handleOptionClick(
                    "📁 View Live Websites",
                    "Sure! I am launching his portfolio client list directly in a new tab now. Check out Bimapay, Hindon, Digitons, and Aiju Exports!",
                    "https://digitonsdevelopment.com"
                  )
                }
                className="text-left w-full px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white uppercase tracking-wider flex items-center justify-between transition-colors duration-200 cursor-pointer"
              >
                <span>📁 View Live Projects</span>
                <ArrowRight size={12} className="text-accent" />
              </button>
            </div>
          )}

          {/* Action Input Footer */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-850 flex items-center gap-2">
            <button
              onClick={handleCustomSend}
              className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
            >
              <MessageSquare size={14} />
              Start WhatsApp Chat
            </button>
          </div>

        </div>
      )}

      {/* Animation Utility inline styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}

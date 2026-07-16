"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageSquare, X, Send, ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isHtml?: boolean;
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918700236209";
  const welcomeMessage = "Hi there! 👋 I am Varun's virtual assistant. Ask me anything about his skills, services, project links, notice period, or experience!";

  useEffect(() => {
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Keyword lookup bot responses incorporating ALL PDF info
  const getBotResponse = (userInput: string): { response: string; isHtml?: boolean } => {
    const query = userInput.toLowerCase().trim();

    if (query.includes("experience") || query.includes("how long") || query.includes("tenure") || query.includes("work history")) {
      return {
        response: "Varun has a total of <b>4 Years & 2 Months</b> of professional experience as a Graphic & Web Designer:<br/>" +
          "• <b>Kairali Ayurvedic Group</b>: Apr 2023 – Present (3 yrs 4 mos)<br/>" +
          "• <b>Hindon Mercantile Limited</b>: Jun 2021 – Mar 2023 (1 yr 10 mos)<br/>" +
          "• <b>Risezonic LLP</b>: Internship (Sep 2020 – Feb 2021).",
        isHtml: true,
      };
    }

    if (query.includes("notice") || query.includes("join") || query.includes("available")) {
      return {
        response: "Varun has an official <b>1 Month notice period</b> and is ready to join or transition as required.",
        isHtml: true,
      };
    }

    if (query.includes("salary") || query.includes("expected") || query.includes("current") || query.includes("ctc") || query.includes("budget")) {
      return {
        response: "Varun's current CTC is <b>₹ 7,20,000 per annum</b>. For detailed discussions about package expectations, please contact him directly.",
        isHtml: true,
      };
    }

    if (query.includes("skill") || query.includes("tool") || query.includes("design") || query.includes("software") || query.includes("version")) {
      return {
        response: "Here is the breakdown of Varun's IT skills and versions:<br/>" +
          "• <b>Bootstrap</b> (v5) — 4 Years<br/>" +
          "• <b>HTML</b> (v5) — 4 Years<br/>" +
          "• <b>WordPress</b> (v6.1) — 4 Years<br/>" +
          "• <b>Illustrator & Photoshop</b> (v2023) — 4 Years<br/>" +
          "• <b>Corel Draw</b> (v2024) — 4 Years<br/>" +
          "• <b>PowerPoint & Word</b> (v2023) — 4 Years<br/>" +
          "• <b>Excel</b> (v2024) — 3 Years.",
        isHtml: true,
      };
    }

    if (query.includes("kairali") || query.includes("current job") || query.includes("responsibilit")) {
      return {
        response: "At <b>Kairali Ayurvedic Group</b> (Current), Varun's responsibilities include:<br/>" +
          "• Constructing admin panels using HTML, CSS, and Bootstrap.<br/>" +
          "• Managing the front end of the company website.<br/>" +
          "• Designing digital creatives for social media, marketing campaigns, and print media layouts.",
        isHtml: true,
      };
    }

    if (query.includes("hindon") || query.includes("previous job")) {
      return {
        response: "At <b>Hindon Mercantile Limited</b>, Varun managed:<br/>" +
          "• Front-end website design and overall website architecture.<br/>" +
          "• Back-end database and server integration.<br/>" +
          "• Website performance testing and training team members in WordPress.",
        isHtml: true,
      };
    }

    if (query.includes("social") || query.includes("instagram") || query.includes("rupeecircle") || query.includes("mufin")) {
      return {
        response: "Here are links to Varun's social media designs and corporate graphics:<br/>" +
          "• Rupeecircle: <a href='https://instagram.com/rupeecircle?igshid=Yzg5MTU1MDY=' target='_blank' class='text-accent underline font-semibold'>Instagram creatives</a><br/>" +
          "• Bimapay LinkedIn: <a href='https://www.linkedin.com/company/bimapay/' target='_blank' class='text-accent underline font-semibold'>Bimapay Page</a><br/>" +
          "• Mufin Finance LinkedIn: <a href='https://www.linkedin.com/company/mufin-finance/' target='_blank' class='text-accent underline font-semibold'>Mufin Page</a>",
        isHtml: true,
      };
    }

    if (query.includes("project") || query.includes("work") || query.includes("website") || query.includes("link") || query.includes("client")) {
      return {
        response: "Here are the websites Varun has worked on:<br/>" +
          "• Bimapay: <a href='https://bimapay.in/' target='_blank' class='text-accent underline font-semibold'>bimapay.in</a><br/>" +
          "• Hindon: <a href='https://hindon.co/' target='_blank' class='text-accent underline font-semibold'>hindon.co</a><br/>" +
          "• Digitons: <a href='https://digitonsdevelopment.com/' target='_blank' class='text-accent underline font-semibold'>digitonsdevelopment.com</a><br/>" +
          "• Aiju Exports: <a href='https://aijuexports.com/' target='_blank' class='text-accent underline font-semibold'>aijuexports.com</a><br/>" +
          "• Yug India: <a href='http://www.yugindia.com/' target='_blank' class='text-accent underline font-semibold'>yugindia.com</a><br/>" +
          "• Raghavs Lawmax: <a href='http://www.raghavslawmax.com/' target='_blank' class='text-accent underline font-semibold'>raghavslawmax.com</a><br/>" +
          "• Goodwings: <a href='http://www.goodwingsmaritime.com/' target='_blank' class='text-accent underline font-semibold'>goodwingsmaritime.com</a><br/>" +
          "• Risezonic: <a href='https://www.risezonic.com/' target='_blank' class='text-accent underline font-semibold'>risezonic.com</a>",
        isHtml: true,
      };
    }

    if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("number") || query.includes("call")) {
      return {
        response: "You can reach Varun directly:<br/>" +
          "• Email: <a href='mailto:c.graphics00@gmail.com' class='text-accent underline font-semibold'>c.graphics00@gmail.com</a><br/>" +
          "• Phone: +91 87002 36209 / 70426 16702<br/>" +
          "• LinkedIn: <a href='https://www.linkedin.com/in/varun-chauhan-designer/' target='_blank' class='text-accent underline font-semibold'>varun-chauhan-designer</a>",
        isHtml: true,
      };
    }

    if (query.includes("education") || query.includes("college") || query.includes("school") || query.includes("degree") || query.includes("study")) {
      return {
        response: "Varun's Education details:<br/>• BA from School of Open Learning (DU), Delhi (2018-2021)<br/>• Advanced Program in Digital Media & Design from MAAC (2018-2020)<br/>• Class XII (2017) & Class X (2015).",
        isHtml: true,
      };
    }

    if (query.includes("certif")) {
      return {
        response: "Varun holds certifications in:<br/>• Adobe Certified Associate (Illustrator, InDesign, Premiere Pro)<br/>• Front End Development - HTML (Great Learning Academy)<br/>• MAAC APDMD.",
        isHtml: true,
      };
    }

    return {
      response: "I'm here to help! Ask me about: 'experience', 'notice period', 'salary', 'skills', 'responsibilities', 'projects', 'social media', or 'education'. You can also click the button below to message Varun directly on WhatsApp.",
      isHtml: false,
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: textToSend, timestamp: time },
    ]);
    
    setCustomInput("");
    setIsTyping(true);

    // Typing delay effect
    setTimeout(() => {
      setIsTyping(false);
      const botReply = getBotResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply.response,
          timestamp: time,
          isHtml: botReply.isHtml,
        },
      ]);
    }, 800);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(customInput);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button (Uses the SVG 4015765_195.svg as trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group relative z-50 cursor-pointer overflow-hidden"
        aria-label="Open Chatbot"
      >
        <span className="absolute inset-0 rounded-full bg-accent/10 animate-ping pointer-events-none" />
        {isOpen ? (
          <X size={24} className="transition-transform duration-300 rotate-90 text-white" />
        ) : (
          <div className="relative w-10 h-10">
            <Image
              src="/assets/4015765_195.svg"
              alt="Assistant Bot Trigger"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        )}
      </button>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-[330px] sm:w-[360px] max-w-[calc(100vw-32px)] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-fade-in z-40">
          
          {/* Header */}
          <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-400 bg-zinc-900 shrink-0">
              <Image
                src="/assets/updated profile.jpeg"
                alt="Varun Chauhan Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wide uppercase text-white">
                Varun's Assistant
              </h4>
              <p className="text-[9px] text-emerald-300 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Online | Typically replies instantly
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 h-[260px] max-h-[300px] overflow-y-auto bg-zinc-900 flex flex-col gap-3 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === "bot"
                    ? "bg-zinc-800 text-white rounded-tl-none self-start"
                    : "bg-[#056162] text-white rounded-tr-none self-end"
                }`}
              >
                {msg.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} className="space-y-1" />
                ) : (
                  <p className="whitespace-pre-line">{msg.text}</p>
                )}
                <span className="text-[8px] text-white/40 block text-right mt-1.5 font-medium">
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
            <div className="px-3 py-2 bg-zinc-955 border-t border-zinc-850 flex flex-wrap gap-1.5 shrink-0 justify-center">
              <button
                onClick={() => handleSendMessage("What is your experience?")}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                💼 Experience
              </button>
              <button
                onClick={() => handleSendMessage("What is your notice period?")}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                ⏳ Notice Period
              </button>
              <button
                onClick={() => handleSendMessage("Show me project links")}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                📁 Projects
              </button>
              <button
                onClick={() => handleSendMessage("What are your skills?")}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                🛠 Skills
              </button>
            </div>
          )}

          {/* Sticky WhatsApp Direct Link */}
          <div className="px-3 py-1.5 bg-zinc-950 border-t border-zinc-850 flex items-center justify-between gap-2 shrink-0">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
              Direct Contact
            </span>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Varun,%20I%20want%2520to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-zinc-950 font-black text-[9px] uppercase tracking-wider flex items-center gap-1 transition-colors duration-200 cursor-pointer"
            >
              <MessageCircle size={10} />
              WhatsApp
            </a>
          </div>

          {/* Action Input Footer */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask about skills, projects, notice period..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-accent text-[11px]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-accent text-background hover:bg-accent-hover transition-colors cursor-pointer"
            >
              <Send size={12} />
            </button>
          </form>

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
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

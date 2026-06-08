import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, HelpCircle, FileText, Mail, Code, Palette } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hey! I'm **Abhy**, Abhishek's digital twin. 🧪✨\n\nI have complete knowledge of his professional background, software systems, and paintings. Ask me anything—like his experience at **JP Morgan** or **Citi**, details about his SaaS website builders, or even his favorites among his abstract acrylic canvases! What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages or loading state updates
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  // Handle focus when opening chatbot
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      // Map message log to back-end compatible history
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsg,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with service");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Forgive me, my servers tripped on an algorithmic loop! Please click a suggestion below or try resending in a moment."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const loadSuggestion = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Simple clean markdown links/bold parse utility to keep dependencies light and build robust
  const parseMarkdownHtml = (text: string, isUser: boolean = false) => {
    // Regex for bold text (**bold**)
    let html = text.replace(/\*\*(.*?)\*\*/g, isUser
      ? '<strong class="font-semibold text-[#FFFFFF]">$1</strong>'
      : '<strong class="font-semibold text-primary">$1</strong>'
    );
    
    // Regex for inline code (`code`)
    html = html.replace(/`(.*?)`/g, isUser
      ? '<code class="px-1.5 py-0.5 bg-white/15 rounded font-mono text-[11px] text-white">$1</code>'
      : '<code class="px-1.5 py-0.5 bg-[#E8E5DE] rounded font-mono text-[11px] text-accent">$1</code>'
    );
    
    // Regex for bullet list items formatting
    html = html.replace(/^\s*\-\s*(.*?)$/gm, isUser
      ? '<li class="ml-4 list-disc text-bg-cream/95 mt-1">$1</li>'
      : '<li class="ml-4 list-disc text-primary/95 mt-1">$1</li>'
    );

    // Regex for links ([anchor](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline font-medium inline-flex items-center gap-0.5">$1</a>');

    // Render single line breaks nicely
    const paragraphs = html.split("\n\n");
    return (
      <div className={`space-y-2 text-[13px] leading-relaxed ${isUser ? "text-bg-cream/95" : "text-primary/90"}`}>
        {paragraphs.map((p, pIdx) => {
          if (p.includes("<li")) {
            return (
              <ul key={pIdx} className="space-y-1 my-2" dangerouslySetInnerHTML={{ __html: p }} />
            );
          }
          return <p key={pIdx} dangerouslySetInnerHTML={{ __html: p.replace(/\n/g, "<br/>") }} />;
        })}
      </div>
    );
  };

  const suggestionPrompts = [
    { title: "Citi & JPMC Interships", text: "What did Abhishek do at JPMorgan and Citi?", icon: <FileText className="w-3.5 h-3.5 text-[#2C6285]" /> },
    { title: "DION Website Builder", text: "Tell me about his SaaS website builder (DION)", icon: <Code className="w-3.5 h-3.5 text-accent" /> },
    { title: "Impasto Paintings", text: "Tell me about Abhishek's painting & artistic work", icon: <Palette className="w-3.5 h-3.5 text-emerald-600" /> },
    { title: "Get Contact Details", text: "How can I contact or hire Abhishek?", icon: <Mail className="w-3.5 h-3.5 text-indigo-500" /> }
  ];

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-[9995] flex flex-col items-end">
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              className="absolute -top-12 right-2 bg-accent text-[11px] text-bg-cream font-mono font-medium px-3 py-1 rounded-full shadow-md whitespace-nowrap"
            >
              Ask Abhy ⚡️
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleOpenToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative border cursor-pointer group transition-all duration-300 ${
            isOpen
              ? "bg-primary border-primary text-bg-cream"
              : "bg-accent border-accent text-bg-cream"
          }`}
          aria-label="Toggle AI assistance Chatbot"
          id="chatbot-trigger-bubble"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 transform rotate-0" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6 group-hover:scale-110 duration-200" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-bg-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-bg-cream">
                  {unreadCount}
                </span>
              )}
            </div>
          )}
        </motion.button>
      </div>

      {/* CHAT WINDOW SHEET */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[410px] h-[550px] max-h-[75vh] bg-bg-cream border border-border-custom/80 rounded-2xl shadow-2xl z-[9994] flex flex-col overflow-hidden"
            id="chatbot-display-panel"
          >
            {/* Elegant Header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between text-bg-cream border-b border-border-custom/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-serif text-[18px] font-bold shadow-inner">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans text-sm font-semibold tracking-wide">Abhy AI</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-text/80 tracking-wide block">Abhishek's Digital Twin</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-bg-cream/70 hover:text-bg-cream transition-colors duration-200 cursor-pointer"
                aria-label="Minimize chatbot window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolling log container */}
            <div
              ref={listRef}
              className="flex-grow overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-primary/20"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((m, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {m.role !== "user" && (
                    <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center font-serif text-[13px] font-semibold text-accent shrink-0 mt-0.5 select-none">
                      A
                    </div>
                  )}
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 mt-0.5 select-none">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 border text-sm font-sans relative ${
                      m.role === "user"
                        ? "bg-primary text-bg-cream border-primary rounded-tr-none"
                        : "bg-white/85 text-primary border-border-custom/50 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {parseMarkdownHtml(m.text, m.role === "user")}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center font-serif text-[13px] font-semibold text-accent shrink-0 mt-0.5 animate-bounce">
                    A
                  </div>
                  <div className="bg-white/85 text-primary border border-border-custom/50 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Micro Prompt suggestion bar */}
            <div className="px-4 py-2 bg-white/40 border-t border-border-custom/30 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
              {suggestionPrompts.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => loadSuggestion(p.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border-custom/60 rounded-full font-sans text-[11px] text-primary/80 hover:border-accent hover:text-accent duration-220 cursor-pointer shadow-sm shrink-0"
                >
                  {p.icon}
                  <span>{p.title}</span>
                </button>
              ))}
            </div>

            {/* Input submission box */}
            <div className="p-3 bg-bg-cream border-t border-border-custom flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Abhy a question..."
                className="flex-grow font-sans text-xs bg-white border border-border-custom rounded-full px-4 py-3 focus:outline-none focus:border-accent/75 transition-colors duration-200"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className={`p-3 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer ${
                  inputValue.trim() && !isLoading
                    ? "bg-accent text-bg-cream hover:bg-accent/90"
                    : "bg-border-custom text-muted-text/50 cursor-not-allowed"
                }`}
                aria-label="Send query"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
            {/* Grounding statement watermark */}
            <div className="bg-[#111111] px-4 py-1.5 flex items-center justify-between text-[9px] text-[#A0A09A] font-mono tracking-wide">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-accent" /> Grounded on Abhishek's portfolio
              </span>
              <span>Gemini 3.5-Flash</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

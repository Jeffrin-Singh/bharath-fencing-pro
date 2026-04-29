import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { chatReply, classifyMessage, extractPhone } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

type Msg = { role: "user" | "bot"; text: string };

const QUICK_REPLIES = [
  "What services do you offer?",
  "What are your prices?",
  "How do I contact you?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! 👋 I'm the Bharath Fencing assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: trimmed }]);
    setTyping(true);

    // History for Gemini (only previous turns; gemini requires history starts with user)
    const prior = messages.filter(m => m.role !== "bot" || messages.indexOf(m) !== 0);
    const history = prior.map(m => ({ role: (m.role === "user" ? "user" : "model") as "user" | "model", text: m.text }));

    try {
      // Run reply + classification in parallel
      const [reply, category] = await Promise.all([
        chatReply(history, trimmed),
        classifyMessage(trimmed),
      ]);

      setMessages(m => [...m, { role: "bot", text: reply }]);

      // Persist message
      try {
        await supabase.from("messages").insert({ message: trimmed, category });
        if (category === "Lead") {
          const phone = extractPhone(trimmed);
          await supabase.from("leads").insert({ message: trimmed, phone });
        }
      } catch (e) {
        console.error("Supabase insert error:", e);
      }
    } catch (e) {
      console.error("Gemini error:", e);
      setMessages(m => [...m, { role: "bot", text: "Sorry, I'm having trouble right now. Please call 9944106978 directly. 📞" }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        title="Chat with us"
        className="fixed bottom-24 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ background: "hsl(var(--gold))", color: "hsl(var(--primary-foreground))" }}
        aria-label="Open chatbot"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-5 z-30 w-[92vw] max-w-sm h-[540px] max-h-[80vh] rounded-2xl bg-card gold-border shadow-2xl flex flex-col overflow-hidden"
          >
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: "var(--gradient-gold)", color: "hsl(var(--primary-foreground))" }}
            >
              <div>
                <p className="font-bold text-sm">Bharath Fencing Assistant</p>
                <p className="text-xs opacity-80">Typically replies in seconds</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                    style={m.role === "user" ? { background: "hsl(var(--gold))", color: "hsl(var(--primary-foreground))" } : undefined}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {messages.length === 1 && !typing && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {QUICK_REPLIES.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full gold-border text-foreground hover:bg-secondary transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="border-t border-border p-3 flex gap-2 bg-card"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="w-10 h-10 rounded-lg flex items-center justify-center disabled:opacity-50"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--primary-foreground))" }}
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

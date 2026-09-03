import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading } from "@/components/AppShell";
import { Spinner } from "@/components/OutputPanel";
import { useAssistant } from "@/hooks/useAssistant";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — Solstice" },
      {
        name: "description",
        content:
          "Ask workplace productivity questions and get concise, professional, practical answers you can act on.",
      },
      { property: "og:title", content: "AI Workplace Chatbot — Solstice" },
      {
        property: "og:description",
        content: "A professional assistant for everyday workplace productivity questions.",
      },
    ],
  }),
  component: ChatTool,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I run a 20-minute weekly team check-in?",
  "How should I prioritize when everything is urgent?",
  "Help me write a polite decline to a low-value meeting.",
];

function ChatTool() {
  const { generate, loading } = useAssistant();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast.error("Type a question first.");
      return;
    }
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    const reply = await generate({ tool: "chat", input: { messages: next } });
    if (reply) setMessages([...next, { role: "assistant", content: reply }]);
  };

  return (
    <AppShell crumb="Chatbot">
      <PageHeading
        eyebrow="(05) AI Workplace Chatbot"
        title="Ask the workplace assistant"
        description="Productivity, communication, planning, and process questions — answered concisely and professionally."
      />

      <div className="mt-8 flex flex-col rounded-2xl border border-line bg-card/70 ring-1 ring-black/5">
        <div className="min-h-[24rem] space-y-4 p-5">
          {messages.length === 0 && !loading && (
            <div className="space-y-4">
              <p className="text-sm text-ink/55">
                Start with a question, or try one of these:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-xl border border-line bg-band px-3 py-2 text-left text-xs text-ink/70 transition-colors hover:border-sun hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              {m.role === "user" ? (
                <div className="max-w-[85%] rounded-2xl bg-ink px-4 py-2.5 text-sm text-paper">
                  {m.content}
                </div>
              ) : (
                <div className="max-w-[90%]">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                    Assistant
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
                    {m.content}
                  </p>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-ink/50">
              <Spinner /> Thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex flex-col gap-2 border-t border-line bg-band p-4 sm:flex-row"
        >
          <input
            className="field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a workplace productivity question…"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
            >
              {loading && <Spinner />}
              Send
            </button>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="rounded-xl border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink/60 hover:text-ink"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink/45">
        Responsible AI: answers may contain errors. Verify anything important — especially company
        policy, legal, financial, or HR matters — with the relevant authority before acting.
      </p>
    </AppShell>
  );
}

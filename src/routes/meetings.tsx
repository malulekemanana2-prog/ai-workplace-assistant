import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading } from "@/components/AppShell";
import { Field, FormCard, GenerateButton, OutputPanel } from "@/components/OutputPanel";
import { useAssistant } from "@/hooks/useAssistant";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Solstice" },
      {
        name: "description",
        content:
          "Paste long meeting notes and get a concise summary with action items, decisions made, and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Solstice" },
      {
        property: "og:description",
        content: "Turn raw meeting notes into summary, action items, decisions, and deadlines.",
      },
    ],
  }),
  component: MeetingsTool,
});

const SECTIONS = ["Summary", "Action Items", "Decisions Made", "Deadlines", "Open Questions"];

function parseSections(text: string) {
  const found: { heading: string; body: string }[] = [];
  const parts = text.split(/^##\s+/m).filter(Boolean);
  for (const part of parts) {
    const [first, ...rest] = part.split("\n");
    found.push({ heading: (first ?? "").trim(), body: rest.join("\n").trim() });
  }
  return found.filter((s) => s.heading);
}

function MeetingsTool() {
  const { generate, loading } = useAssistant();
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim().length < 30) {
      toast.error("Paste your meeting notes first — at least a few sentences to summarize.");
      return;
    }
    const text = await generate({ tool: "meeting", input: { notes } });
    if (text) setOutput(text);
  };

  const sections = parseSections(output);

  return (
    <AppShell crumb="Meeting Summarizer">
      <PageHeading
        eyebrow="(02) Meeting Notes Summarizer"
        title="Turn notes into a record"
        description="Paste raw notes or a transcript. Get a summary plus action items, decisions, and deadlines in separate sections."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form onSubmit={onSubmit}>
          <FormCard>
            <Field label="Meeting notes" hint="required">
              <textarea
                className="field min-h-[22rem] resize-y"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  "Paste your raw notes or transcript here.\n\ne.g. Attendees: Priya, Sam, Dana. Discussed Q3 roadmap. Sam to send vendor quote by Thursday. Agreed to delay analytics v2 to August…"
                }
              />
            </Field>
            <GenerateButton loading={loading} label="Summarize notes" />
            <button
              type="button"
              onClick={() => {
                setNotes("");
                setOutput("");
              }}
              className="mt-2 w-full rounded-xl border border-line bg-card py-2.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              Clear form
            </button>
          </FormCard>
        </form>

        <div className="space-y-5">
          {sections.length > 0 && !loading && (
            <div className="rounded-2xl border border-line bg-card/70 p-5 ring-1 ring-black/5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                Structured breakdown
              </div>
              <div className="mt-4 space-y-4">
                {sections.map((s) => (
                  <div key={s.heading}>
                    <h3
                      className={`font-display text-sm font-bold tracking-tight ${
                        SECTIONS.includes(s.heading) ? "text-ink" : "text-ink/70"
                      }`}
                    >
                      {s.heading}
                    </h3>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink/60">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <OutputPanel
            value={output}
            onChange={setOutput}
            onClear={() => setOutput("")}
            loading={loading}
            placeholder="Your summary, action items, decisions, and deadlines appear here — fully editable."
            minHeight="20rem"
          />
        </div>
      </div>
    </AppShell>
  );
}

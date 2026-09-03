import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading } from "@/components/AppShell";
import { Field, FormCard, GenerateButton, OutputPanel } from "@/components/OutputPanel";
import { useAssistant } from "@/hooks/useAssistant";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Solstice" },
      {
        name: "description",
        content:
          "Ask a workplace research question and get a structured brief with key insights, recommendations, and areas to verify.",
      },
      { property: "og:title", content: "AI Research Assistant — Solstice" },
      {
        property: "og:description",
        content: "Structured workplace research briefs with insights and verification prompts.",
      },
    ],
  }),
  component: ResearchTool,
});

function ResearchTool() {
  const { generate, loading } = useAssistant();
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Enter a research question or topic to look into.");
      return;
    }
    const text = await generate({
      tool: "research",
      input: { topic, context: context || undefined },
    });
    if (text) setOutput(text);
  };

  return (
    <AppShell crumb="Research Assistant">
      <PageHeading
        eyebrow="(04) AI Research Assistant"
        title="Brief yourself in minutes"
        description="Ask a workplace question. You get a plain-language explanation, key insights, practical recommendations, and what to verify."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form onSubmit={onSubmit}>
          <FormCard>
            <div className="space-y-3">
              <Field label="Research question or topic" hint="required">
                <textarea
                  className="field min-h-24 resize-y"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="How do hybrid teams keep onboarding effective for new graduates?"
                />
              </Field>
              <Field label="Context" hint="optional — team, industry, constraints">
                <textarea
                  className="field min-h-24 resize-y"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="12-person operations team, mostly remote, limited training budget"
                />
              </Field>
            </div>
            <GenerateButton loading={loading} label="Research topic" />
            <button
              type="button"
              onClick={() => {
                setTopic("");
                setContext("");
                setOutput("");
              }}
              className="mt-2 w-full rounded-xl border border-line bg-card py-2.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              Clear form
            </button>

            <div className="mt-4 rounded-xl border border-line bg-band p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-sun">
                Verify before use
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink/55">
                This assistant will not invent citations, statistics, or studies. Anything it
                surfaces is a starting point — confirm it with a primary source before relying on it
                for professional or academic decisions.
              </p>
            </div>
          </FormCard>
        </form>

        <OutputPanel
          value={output}
          onChange={setOutput}
          onClear={() => setOutput("")}
          loading={loading}
          placeholder="Your structured research brief appears here — overview, insights, recommendations, and what to verify."
          minHeight="30rem"
        />
      </div>
    </AppShell>
  );
}

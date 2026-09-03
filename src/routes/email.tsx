import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading } from "@/components/AppShell";
import { Field, FormCard, GenerateButton, OutputPanel } from "@/components/OutputPanel";
import { useAssistant } from "@/hooks/useAssistant";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Solstice" },
      {
        name: "description",
        content:
          "Generate a professional workplace email from purpose, recipient, key points, and tone — then edit and copy it.",
      },
      { property: "og:title", content: "Smart Email Generator — Solstice" },
      {
        property: "og:description",
        content: "Draft formal, friendly, or persuasive workplace email with AI.",
      },
    ],
  }),
  component: EmailTool,
});

const TONES = ["Formal", "Friendly", "Persuasive"];

function EmailTool() {
  const { generate, loading } = useAssistant();
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState("Formal");
  const [output, setOutput] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) {
      toast.error("Please tell us the purpose of the email so we know what to write.");
      return;
    }
    if (!keyPoints.trim()) {
      toast.error("Add at least one key point the email should cover.");
      return;
    }
    const text = await generate({
      tool: "email",
      input: { purpose, recipient: recipient || "the recipient", keyPoints, tone },
    });
    if (text) setOutput(text);
  };

  const resetForm = () => {
    setPurpose("");
    setRecipient("");
    setKeyPoints("");
    setTone("Formal");
    setOutput("");
  };

  return (
    <AppShell crumb="Email Generator">
      <PageHeading
        eyebrow="(01) Smart Email Generator"
        title="Draft a workplace email"
        description="Describe the purpose, recipient, and key points. Choose a tone and get a complete, editable draft."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form onSubmit={onSubmit}>
          <FormCard>
            <div className="space-y-3">
              <Field label="Email purpose" hint="required">
                <input
                  className="field"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Follow up on the Q3 roadmap review"
                />
              </Field>
              <Field label="Recipient">
                <input
                  className="field"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Priya Nair, Head of Design"
                />
              </Field>
              <Field label="Key points" hint="required — one per line">
                <textarea
                  className="field min-h-28 resize-y"
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  placeholder={"Confirm scope by Friday\nRequest two rounds of revisions\nOffer a call this week"}
                />
              </Field>
              <Field label="Tone">
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        tone === t
                          ? "bg-sunlight text-ink"
                          : "border border-line text-ink/60 hover:text-ink"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
            <GenerateButton loading={loading} label="Generate email" />
            <button
              type="button"
              onClick={resetForm}
              className="mt-2 w-full rounded-xl border border-line bg-card py-2.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              Clear form
            </button>
          </FormCard>
        </form>

        <OutputPanel
          value={output}
          onChange={setOutput}
          onClear={() => setOutput("")}
          loading={loading}
          placeholder="Your AI-drafted email appears here. Edit freely before sending."
          minHeight="24rem"
        />
      </div>
    </AppShell>
  );
}

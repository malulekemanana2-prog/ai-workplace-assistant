import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { AppShell, PageHeading } from "@/components/AppShell";
import { Field, FormCard, GenerateButton, OutputPanel } from "@/components/OutputPanel";
import { useAssistant } from "@/hooks/useAssistant";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Solstice" },
      {
        name: "description",
        content:
          "Enter tasks with deadlines, time estimates, and priority. Get a prioritized, realistic daily or weekly schedule.",
      },
      { property: "og:title", content: "AI Task Planner — Solstice" },
      {
        property: "og:description",
        content: "Prioritize tasks and build a practical daily or weekly plan with AI.",
      },
    ],
  }),
  component: PlannerTool,
});

type Row = { title: string; deadline: string; estimate: string; priority: string };

const PRIORITIES = ["High", "Medium", "Low", "Unspecified"];
const PRIORITY_CLASS: Record<string, string> = {
  High: "text-high",
  Medium: "text-medium",
  Low: "text-low",
};

const emptyRow = (): Row => ({ title: "", deadline: "", estimate: "", priority: "Unspecified" });

function PlannerTool() {
  const { generate, loading } = useAssistant();
  const [rows, setRows] = useState<Row[]>([emptyRow(), emptyRow(), emptyRow()]);
  const [horizon, setHorizon] = useState("daily");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");

  const update = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tasks = rows.filter((r) => r.title.trim());
    if (tasks.length === 0) {
      toast.error("Add at least one task before generating a plan.");
      return;
    }
    const text = await generate({
      tool: "planner",
      input: {
        horizon,
        context: context || undefined,
        tasks: tasks.map((t) => ({
          title: t.title,
          deadline: t.deadline || undefined,
          estimate: t.estimate || undefined,
          priority: t.priority === "Unspecified" ? undefined : t.priority,
        })),
      },
    });
    if (text) setOutput(text);
  };

  return (
    <AppShell crumb="Task Planner">
      <PageHeading
        eyebrow="(03) AI Task Planner"
        title="Build a realistic plan"
        description="List your tasks with deadlines, estimates, and priority. The assistant orders them and lays out a workable schedule."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form onSubmit={onSubmit}>
          <FormCard>
            <div className="space-y-3">
              <Field label="Plan horizon">
                <div className="flex gap-1.5">
                  {["daily", "weekly"].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHorizon(h)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                        horizon === h
                          ? "bg-sunlight text-ink"
                          : "border border-line text-ink/60 hover:text-ink"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Tasks" hint="at least one required">
                <div className="space-y-2.5">
                  {rows.map((row, i) => (
                    <div key={i} className="rounded-xl border border-line bg-band p-3">
                      <div className="flex items-center gap-2">
                        <input
                          className="field"
                          value={row.title}
                          onChange={(e) => update(i, { title: e.target.value })}
                          placeholder={`Task ${i + 1} — e.g. Finish Q3 budget review`}
                        />
                        <button
                          type="button"
                          aria-label="Remove task"
                          onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                          className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-card text-ink/50 hover:text-ink"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <input
                          className="field"
                          value={row.deadline}
                          onChange={(e) => update(i, { deadline: e.target.value })}
                          placeholder="Deadline (Fri 5pm)"
                        />
                        <input
                          className="field"
                          value={row.estimate}
                          onChange={(e) => update(i, { estimate: e.target.value })}
                          placeholder="Estimate (2h)"
                        />
                        <select
                          className="field"
                          value={row.priority}
                          onChange={(e) => update(i, { priority: e.target.value })}
                        >
                          {PRIORITIES.map((p) => (
                            <option key={p} value={p}>
                              {p} priority
                            </option>
                          ))}
                        </select>
                      </div>
                      {PRIORITY_CLASS[row.priority] && (
                        <div
                          className={`mt-2 font-mono text-[10px] uppercase tracking-widest ${PRIORITY_CLASS[row.priority]}`}
                        >
                          ● {row.priority} priority
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRows((prev) => [...prev, emptyRow()])}
                    className="flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-xs font-medium text-ink/70 hover:text-ink"
                  >
                    <Plus className="size-3.5" /> Add task
                  </button>
                </div>
              </Field>

              <Field label="Working context" hint="optional">
                <input
                  className="field"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="6 focus hours, two meetings after 14:00"
                />
              </Field>
            </div>

            <GenerateButton loading={loading} label="Generate plan" />
            <button
              type="button"
              onClick={() => {
                setRows([emptyRow(), emptyRow(), emptyRow()]);
                setContext("");
                setOutput("");
              }}
              className="mt-2 w-full rounded-xl border border-line bg-card py-2.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              Clear form
            </button>
          </FormCard>
        </form>

        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-card/70 p-5 ring-1 ring-black/5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
              Priority key
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-2 text-ink/70">
                <span className="size-2 rounded-full bg-high" /> High — do first
              </span>
              <span className="flex items-center gap-2 text-ink/70">
                <span className="size-2 rounded-full bg-medium" /> Medium — schedule
              </span>
              <span className="flex items-center gap-2 text-ink/70">
                <span className="size-2 rounded-full bg-low" /> Low — if time allows
              </span>
            </div>
          </div>

          <OutputPanel
            value={output}
            onChange={setOutput}
            onClear={() => setOutput("")}
            loading={loading}
            placeholder="Your prioritized plan and schedule appear here — edit it to match your day."
            minHeight="22rem"
          />
        </div>
      </div>
    </AppShell>
  );
}

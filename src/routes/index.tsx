import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, TOOLS } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solstice — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Five AI workplace tools in one dashboard: email drafting, meeting summaries, task planning, research briefs, and a productivity chatbot.",
      },
      { property: "og:title", content: "Solstice — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Draft email, summarize meetings, plan tasks, research topics, and ask a workplace assistant — in one integrated dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell crumb="Overview">
      <div className="animate-rise">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
          <span className="text-sun">●</span> Golden hour — Workplace OS
        </div>
        <h1 className="mt-3 text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold tracking-tight">
          AI Workplace Productivity Assistant
        </h1>
        <p className="mt-2 max-w-[52ch] text-pretty text-[15px] text-ink/55">
          Five AI tools in one workspace. Generate, edit, and ship drafts for email, meetings,
          planning, and research — faster, with every output editable before you use it.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool, i) => (
          <Link
            key={tool.to}
            to={tool.to}
            className={`group animate-rise rounded-2xl border border-line bg-card/70 p-5 ring-1 ring-black/5 transition-colors hover:bg-card ${
              tool.index === "03" ? "lg:col-span-2" : ""
            }`}
            style={{ animationDelay: `${60 + i * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-ink/40">({tool.index})</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30 transition-colors group-hover:text-sun">
                Open →
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg font-bold tracking-tight">{tool.title}</h2>
            <p className="mt-1 text-pretty text-sm text-ink/55">{tool.blurb}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 animate-rise" style={{ animationDelay: "120ms" }}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
              Quick access
            </div>
            <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight">
              Pick a tool and start
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30">
            5 tools · one workspace
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="rounded-xl border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-sun hover:text-ink"
            >
              {tool.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-band p-5 ring-1 ring-black/5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
            Responsible AI
          </div>
          <p className="mt-2 max-w-[80ch] text-pretty text-sm leading-relaxed text-ink/60">
            AI-generated output may contain errors, omissions, or outdated information. Review and
            verify every result before using it for important workplace, professional, academic,
            legal, financial, or other high-impact decisions. The assistant is instructed never to
            fabricate sources, statistics, or facts — where context is missing, it will say so
            rather than guess.
          </p>
        </div>
      </section>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-line pb-2 pt-5 text-[11px] text-ink/40">
        <span className="font-mono">Solstice · integrated workplace AI</span>
        <span>Always review AI output before use</span>
      </footer>
    </AppShell>
  );
}

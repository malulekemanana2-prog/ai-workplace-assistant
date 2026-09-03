import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

export const TOOLS = [
  {
    index: "01",
    to: "/email" as const,
    label: "Email Generator",
    navLabel: "Email Generator",
    title: "Smart Email Generator",
    blurb: "Draft on-tone workplace email from purpose and key points.",
  },
  {
    index: "02",
    to: "/meetings" as const,
    label: "Meeting Summarizer",
    navLabel: "Meeting Summarizer",
    title: "Meeting Notes Summarizer",
    blurb: "Turn long notes into summary, decisions, and deadlines.",
  },
  {
    index: "03",
    to: "/planner" as const,
    label: "Task Planner",
    navLabel: "Task Planner",
    title: "AI Task Planner",
    blurb: "Prioritized daily schedule from your tasks, deadlines, and time estimates.",
  },
  {
    index: "04",
    to: "/research" as const,
    label: "Research Assistant",
    navLabel: "Research Assistant",
    title: "AI Research Assistant",
    blurb: "Structured findings with insights and areas to verify.",
  },
  {
    index: "05",
    to: "/chat" as const,
    label: "Chatbot",
    navLabel: "Chatbot",
    title: "AI Workplace Chatbot",
    blurb: "Ask productivity questions in a professional tone.",
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="mt-2 space-y-0.5 text-sm">
      <Link
        to="/"
        onClick={onNavigate}
        activeOptions={{ exact: true }}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-ink/60 hover:bg-ink/5"
        activeProps={{ className: "bg-sunlight text-ink font-medium hover:bg-sunlight" }}
      >
        <span className="size-1.5 rounded-full bg-line" />
        Overview
      </Link>
      {TOOLS.map((tool) => (
        <Link
          key={tool.to}
          to={tool.to}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-ink/60 hover:bg-ink/5"
          activeProps={{ className: "bg-sunlight text-ink font-medium hover:bg-sunlight" }}
        >
          <span className="size-1.5 rounded-full bg-line" />
          {tool.navLabel}
        </Link>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className="grid size-8 place-items-center rounded-[9px] bg-sun font-mono text-sm font-medium text-paper">
        S
      </div>
      <div className="leading-tight">
        <div className="font-display text-[15px] font-bold tracking-tight">Solstice</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink/45">
          Workplace OS
        </div>
      </div>
    </div>
  );
}

function DisclaimerCard() {
  return (
    <div className="rounded-xl border border-line bg-card/60 p-3.5">
      <div className="flex items-center gap-2 font-mono text-[11px] text-ink/70">
        <span className="size-1.5 rounded-full bg-sun [animation:softpulse_1.8s_ease-in-out_infinite]" />
        Responsible AI active
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-ink/50">
        Outputs are drafts. Verify before any high-impact decision.
      </p>
    </div>
  );
}

export function AppShell({ crumb, children }: { crumb: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-paper font-body text-ink antialiased">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-band px-5 py-6 md:flex">
        <Brand />
        <div className="mt-3 px-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
          Workspace
        </div>
        <NavLinks />
        <div className="mt-auto pt-6">
          <DisclaimerCard />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-paper/85 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg border border-line bg-card md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <div className="flex items-center gap-2 font-mono text-[11px] text-ink/40">
              <span className="hidden md:inline">Workspace</span>
              <span className="hidden md:inline">/</span>
              <span className="text-ink/70">{crumb}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1.5 font-mono text-[11px] text-ink/45 sm:flex">
              <span className="size-1.5 rounded-full bg-sun" />
              {pathname === "/" ? "5 tools ready" : "AI ready"}
            </div>
            <div className="grid size-8 place-items-center rounded-full bg-sunlight text-[11px] font-semibold text-ink">
              EV
            </div>
          </div>
        </header>

        {open && (
          <div className="border-b border-line bg-band px-5 py-4 md:hidden">
            <NavLinks onNavigate={() => setOpen(false)} />
            <div className="mt-4">
              <DisclaimerCard />
            </div>
          </div>
        )}

        <main className="max-w-[1180px] px-5 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="animate-rise">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">{eyebrow}</div>
      <h1 className="mt-3 text-balance font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 max-w-[56ch] text-pretty text-[15px] text-ink/55">{description}</p>
    </div>
  );
}

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const MODEL_ID = "google/gemini-3.7-flash";

export function createGateway(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": apiKey },
  });
}

const RESPONSIBLE_AI = `Responsible AI constraints:
- Never fabricate sources, statistics, names, dates, or facts. If context is missing, say what is missing and state assumptions explicitly.
- Do not present uncertain information as verified fact; label uncertainty plainly.
- Keep a professional workplace register. No filler, no hype, no emoji.`;

export type EmailInput = {
  purpose: string;
  recipient: string;
  keyPoints: string;
  tone: string;
};

export type PlannerTask = {
  title: string;
  deadline?: string | undefined;
  estimate?: string | undefined;
  priority?: string | undefined;
};

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type AssistantRequest =
  | { tool: "email"; input: EmailInput }
  | { tool: "meeting"; input: { notes: string } }
  | { tool: "planner"; input: { horizon: string; tasks: PlannerTask[]; context?: string | undefined } }
  | { tool: "research"; input: { topic: string; context?: string | undefined } }
  | { tool: "chat"; input: { messages: ChatMessage[] } };

export function buildPrompt(req: AssistantRequest): { system: string; prompt: string } {
  switch (req.tool) {
    case "email": {
      const { purpose, recipient, keyPoints, tone } = req.input;
      return {
        system: `ROLE: You are a senior workplace communications editor.
TASK: Write one ready-to-send workplace email.
CONSTRAINTS: 120-200 words. ${tone} tone. Concrete, specific, no placeholder brackets unless a fact is genuinely unknown — then use [ ] and list it under "Needs confirmation".
OUTPUT FORMAT (plain text, exactly):
Subject: <line>

<greeting>

<body paragraphs and, where useful, a short numbered list>

<sign-off>
${RESPONSIBLE_AI}`,
        prompt: `Recipient: ${recipient}\nPurpose: ${purpose}\nKey points:\n${keyPoints}\nTone: ${tone}`,
      };
    }
    case "meeting":
      return {
        system: `ROLE: You are an experienced chief of staff who turns raw meeting notes into an operational record.
TASK: Summarize the notes and extract structured follow-ups.
CONSTRAINTS: Use only what the notes support. If a category has nothing, write "None recorded." Attribute owners only when the notes name them.
OUTPUT FORMAT (markdown-style plain text, exactly these headings):
## Summary
<3-5 sentences>

## Action Items
- <owner (or Unassigned)> — <action> — <due date or "no date given">

## Decisions Made
- <decision>

## Deadlines
- <date> — <what is due>

## Open Questions
- <anything unclear in the notes>
${RESPONSIBLE_AI}`,
        prompt: req.input.notes,
      };
    case "planner": {
      const { horizon, tasks, context } = req.input;
      const list = tasks
        .map(
          (t, i) =>
            `${i + 1}. ${t.title} | deadline: ${t.deadline || "none"} | estimate: ${t.estimate || "unknown"} | priority: ${t.priority || "unspecified"}`,
        )
        .join("\n");
      return {
        system: `ROLE: You are a productivity coach who builds realistic, executable schedules.
TASK: Prioritize the tasks and produce a ${horizon} plan.
CONSTRAINTS: Respect stated deadlines and estimates; never invent new tasks. Front-load high-impact and deadline-driven work. Flag over-commitment when estimates exceed available hours. Assume a standard 8-hour workday unless stated otherwise.
OUTPUT FORMAT (plain text, exactly):
## Priority Order
### High
- <task> — <why> — <est>
### Medium
- <task> — <why> — <est>
### Low
- <task> — <why> — <est>

## Schedule
<time block or day> — <task> (<est>)

## Risks & Notes
- <capacity risks, conflicts, assumptions made>
${RESPONSIBLE_AI}`,
        prompt: `Horizon: ${horizon}\nTasks:\n${list}\n${context ? `Additional context: ${context}` : ""}`,
      };
    }
    case "research":
      return {
        system: `ROLE: You are a workplace research analyst preparing an internal briefing.
TASK: Explain the topic and give an actionable brief.
CONSTRAINTS: Do NOT invent citations, URLs, statistics, or studies. Where a claim needs evidence, name the kind of source to check instead of fabricating one. Distinguish widely accepted practice from opinion.
OUTPUT FORMAT (plain text, exactly):
## Overview
<plain-language explanation, 4-6 sentences>

## Key Insights
- <insight>

## Practical Recommendations
- <recommendation the reader can act on>

## Areas for Further Research
- <question> — <suggested type of source to consult>

## Verify Before Use
- <specific claims above that should be independently confirmed>
${RESPONSIBLE_AI}`,
        prompt: `Topic / question: ${req.input.topic}\n${req.input.context ? `Context: ${req.input.context}` : ""}`,
      };
    case "chat": {
      const transcript = req.input.messages
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n\n");
      return {
        system: `ROLE: You are the Solstice workplace productivity assistant.
TASK: Answer workplace productivity, communication, planning, and process questions.
CONSTRAINTS: Be concise (under 200 words unless asked for depth), structured, and practical — lead with the answer, then 2-4 concrete steps. Decline non-workplace requests politely. When a question depends on company policy, law, or finance, say it must be verified with the relevant authority.
${RESPONSIBLE_AI}`,
        prompt: transcript,
      };
    }
  }
}

export function demoOutput(req: AssistantRequest): string {
  switch (req.tool) {
    case "email":
      return `Subject: ${req.input.purpose || "Following up"}\n\nHi ${req.input.recipient || "there"},\n\nThank you for your time. Sharing a short recap and the next steps below.\n\n${req.input.keyPoints || "- Point one\n- Point two"}\n\nHappy to walk through any of this today or tomorrow.\n\nBest regards`;
    case "meeting":
      return `## Summary\nDemo mode: the meeting notes would be summarized here.\n\n## Action Items\n- Unassigned — Connect an AI key to generate real output — no date given\n\n## Decisions Made\n- None recorded.\n\n## Deadlines\n- None recorded.\n\n## Open Questions\n- None recorded.`;
    case "planner":
      return `## Priority Order\n### High\n- Sample task — deadline-driven — 2h\n### Medium\n- Sample task — supporting work — 1h\n### Low\n- Sample task — can slip — 30m\n\n## Schedule\n09:00-11:00 — Sample task (2h)\n\n## Risks & Notes\n- Demo output. Connect AI to generate a real plan.`;
    case "research":
      return `## Overview\nDemo output — connect AI to research "${req.input.topic}".\n\n## Key Insights\n- Sample insight.\n\n## Practical Recommendations\n- Sample recommendation.\n\n## Areas for Further Research\n- Sample question — consult an industry body publication.\n\n## Verify Before Use\n- All of the above is placeholder content.`;
    case "chat":
      return "Demo mode: I would answer your workplace productivity question here. Please verify important information independently.";
  }
}

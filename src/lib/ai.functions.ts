import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const chatMessage = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const requestSchema = z.discriminatedUnion("tool", [
  z.object({
    tool: z.literal("email"),
    input: z.object({
      purpose: z.string().min(1),
      recipient: z.string(),
      keyPoints: z.string(),
      tone: z.string(),
    }),
  }),
  z.object({
    tool: z.literal("meeting"),
    input: z.object({ notes: z.string().min(1) }),
  }),
  z.object({
    tool: z.literal("planner"),
    input: z.object({
      horizon: z.string(),
      tasks: z.array(
        z.object({
          title: z.string(),
          deadline: z.string().optional(),
          estimate: z.string().optional(),
          priority: z.string().optional(),
        }),
      ),
      context: z.string().optional(),
    }),
  }),
  z.object({
    tool: z.literal("research"),
    input: z.object({ topic: z.string().min(1), context: z.string().optional() }),
  }),
  z.object({
    tool: z.literal("chat"),
    input: z.object({ messages: z.array(chatMessage).min(1) }),
  }),
]);

export type AssistantPayload = z.infer<typeof requestSchema>;

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const { buildPrompt, demoOutput, createGateway, MODEL_ID } = await import("./ai.server");
    const apiKey = process.env["LOVABLE_API_KEY"];

    if (!apiKey) {
      return { text: demoOutput(data), demo: true as const };
    }

    const { system, prompt } = buildPrompt(data);

    try {
      const result = streamText({
        model: createGateway(apiKey)(MODEL_ID),
        system,
        prompt,
      });
      const text = await result.text;
      return { text, demo: false as const };
    } catch (error) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode ?? 
        (error as { status?: number })?.status;
      if (status === 429) {
        throw new Error("The AI service is busy right now. Please wait a moment and try again.");
      }
      if (status === 402) {
        throw new Error("AI credits are exhausted. Please add credits to continue using AI features.");
      }
      throw new Error(
        error instanceof Error ? error.message : "The AI request failed. Please try again.",
      );
    }
  });

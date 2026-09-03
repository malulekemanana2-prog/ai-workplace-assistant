import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAssistant, type AssistantPayload } from "@/lib/ai.functions";

export function useAssistant() {
  const call = useServerFn(runAssistant);
  const [loading, setLoading] = useState(false);

  const generate = async (payload: AssistantPayload): Promise<string | null> => {
    setLoading(true);
    try {
      const result = await call({ data: payload });
      if (result.demo) {
        toast.info("Showing sample output — AI is not connected yet.");
      }
      return result.text;
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong generating that. Please try again.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading };
}

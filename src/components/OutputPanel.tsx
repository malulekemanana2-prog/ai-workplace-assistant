import { useState } from "react";
import { toast } from "sonner";

export function Spinner() {
  return (
    <span className="size-3.5 animate-spin rounded-full border-2 border-line border-t-sun" />
  );
}

export function GenerateButton({
  loading,
  label,
  loadingLabel = "Generating…",
}: {
  loading: boolean;
  label: string;
  loadingLabel?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
    >
      {loading && <Spinner />}
      {loading ? loadingLabel : label}
    </button>
  );
}

export function OutputPanel({
  value,
  onChange,
  onClear,
  loading,
  placeholder,
  minHeight = "28rem",
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  loading: boolean;
  placeholder: string;
  minHeight?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value.trim()) {
      toast.error("There's nothing to copy yet — generate some output first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Your browser blocked clipboard access. Select the text and copy manually.");
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-band p-5 ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
          Editable output
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-card/70"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-card/70"
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <div
          className="mt-3 flex flex-col gap-3 rounded-xl border border-line bg-card p-3.5"
          style={{ minHeight }}
        >
          <div className="flex items-center gap-2 text-xs text-ink/50">
            <Spinner /> Generating… please wait.
          </div>
          <div className="h-2 w-3/4 rounded-full bg-line" />
          <div className="h-2 w-2/3 rounded-full bg-line/70" />
          <div className="h-2 w-1/2 rounded-full bg-line/50" />
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="mt-3 w-full resize-y rounded-xl border border-line bg-card p-3.5 font-mono text-[13px] leading-relaxed outline-none focus:border-sun"
        />
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-ink/45">
        Responsible AI: drafts may contain errors. Review and verify before use in important
        workplace, legal, or financial decisions.
      </p>
    </div>
  );
}

export function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card/70 p-5 ring-1 ring-black/5">
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink/70">
        {label}
        {hint && <span className="ml-1.5 font-normal text-ink/40">{hint}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

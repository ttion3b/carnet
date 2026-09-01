import { STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { deadlineTone } from "@/lib/dates";

const STATUS_CLASS: Record<string, string> = {
  VEILLE: "border-line text-ink",
  ENVOYE: "border-lagoon text-lagoon-ink",
  ATTENTE: "border-saffron text-saffron",
  ENTRETIEN: "border-indigo text-indigo",
  PROPOSITION: "border-lagoon text-lagoon-ink",
  ACCEPTE: "border-lagoon text-lagoon",
  REFUSE: "border-rose text-rose",
  ABANDON: "border-line text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  const label = STATUSES.find((item) => item.id === status)?.label ?? status;
  return (
    <span
      className={cn(
        "inline-flex items-center border-b px-0 py-0.5 text-[11px] font-semibold",
        STATUS_CLASS[status] ?? "border-line text-ink",
      )}
    >
      {label}
    </span>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const isStage = type === "STAGE";
  return (
    <span
      className={cn(
        "inline-flex items-center border-b border-lagoon/40 px-0 py-0.5 text-[11px] font-semibold",
        isStage ? "text-lagoon-ink" : "text-indigo",
      )}
    >
      {isStage ? "Stage" : "Échange"}
    </span>
  );
}

export function DeadlineChip({
  date,
  done,
  children,
}: {
  date: Date | string;
  done?: boolean;
  children: React.ReactNode;
}) {
  const tone = deadlineTone(date, done);
  return (
    <span
      className={cn(
        "inline-flex items-center border-b px-0 py-0.5 text-xs font-medium tabular-nums",
        tone === "late" && "border-rose text-rose",
        tone === "soon" && "border-saffron text-saffron",
        tone === "mid" && "border-lagoon text-lagoon-ink",
        tone === "ok" && "border-line text-muted",
        tone === "done" && "border-line text-muted line-through",
      )}
    >
      {children}
    </span>
  );
}

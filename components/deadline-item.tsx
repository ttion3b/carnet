import Link from "next/link";
import { toggleDeadlineAction, deleteDeadlineAction } from "@/lib/actions/deadlines";
import { DeadlineChip } from "@/components/badges";
import { Button } from "@/components/ui";
import { formatDay, relativeDeadline } from "@/lib/dates";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeadlineItemData = {
  id: string;
  title: string;
  date: Date | string;
  kind: string;
  scope: string;
  notes: string | null;
  done: boolean;
  createdByName: string;
  opportunity: { id: string; title: string } | null;
  mine: boolean;
};

export function DeadlineItem({ item }: { item: DeadlineItemData }) {
  return (
    <li className="flex items-start justify-between gap-3 border-b border-line py-3 last:border-0">
      <form action={toggleDeadlineAction.bind(null, item.id)}>
        <button
          type="submit"
          className={cn(
            "mt-0.5 grid size-5 cursor-pointer place-items-center rounded border",
            item.done ? "border-lagoon bg-lagoon text-white" : "border-line bg-paper",
          )}
          aria-label={item.done ? "Marquer non fait" : "Marquer fait"}
        >
          {item.done ? <Check className="size-3" /> : null}
        </button>
      </form>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-medium", item.done && "text-muted line-through")}>{item.title}</p>
        <p className="text-xs text-muted">
          {item.scope === "CLASSE" ? "Promo" : "Perso"} · {item.kind.toLowerCase()} · {item.createdByName}
        </p>
        {item.notes ? <p className="mt-1 text-xs text-muted">{item.notes}</p> : null}
        {item.opportunity ? (
          <Link href={`/offres/${item.opportunity.id}`} className="text-xs text-lagoon-ink hover:underline">
            {item.opportunity.title}
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-2">
        <DeadlineChip date={item.date} done={item.done}>
          {formatDay(item.date)} · {relativeDeadline(item.date)}
        </DeadlineChip>
        {item.mine ? (
          <form action={deleteDeadlineAction.bind(null, item.id)}>
            <Button type="submit" variant="ghost" size="sm" className="text-xs text-muted">
              Supprimer
            </Button>
          </form>
        ) : null}
      </div>
    </li>
  );
}

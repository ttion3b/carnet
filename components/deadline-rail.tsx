import Link from "next/link";
import { DeadlineChip } from "@/components/badges";
import { formatShort, relativeDeadline } from "@/lib/dates";

export function DeadlineRail({
  items,
}: {
  items: {
    id: string;
    title: string;
    date: Date;
    scope: string;
    opportunity: { id: string } | null;
  }[];
}) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-between gap-3 px-5 py-2.5 text-xs text-muted md:px-10">
        <span>Aucune échéance proche</span>
        <Link href="/calendrier" className="font-medium text-lagoon-ink hover:underline">
          Ajouter une date
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto px-5 py-2.5 md:px-10">
      <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-saffron">
        À venir
      </p>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.opportunity ? `/offres/${item.opportunity.id}` : "/calendrier"}
          className="shrink-0 transition hover:scale-[1.02]"
        >
          <DeadlineChip date={item.date}>
            <span className="tabular-nums">{formatShort(item.date)}</span>
            <span className="mx-1 text-[10px] opacity-70">·</span>
            {item.title}
            <span className="ml-1 opacity-70">{relativeDeadline(item.date)}</span>
          </DeadlineChip>
        </Link>
      ))}
    </div>
  );
}

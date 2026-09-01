import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ChecklistRow } from "@/components/checklist-row";
import { PHASES } from "@/lib/constants";
import { PageHeader, CarnetCard } from "@/components/carnet-ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Formalités" };

export default async function FormalitesPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const kind = params.kind === "ECHANGE" ? "ECHANGE" : "STAGE";

  const items = await prisma.checklistItem.findMany({
    where: { kind },
    orderBy: { sortOrder: "asc" },
    include: {
      progress: { where: { userId: user.id } },
    },
  });

  const done = items.filter((item) => item.progress[0]?.done).length;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <PageHeader
        eyebrow="Checklists"
        title="Formalités"
        description="Deux parcours : stage et semestre d'échange. Coche, ajoute une date, laisse-toi une note."
        image="/carnet-formalites-stamp.png"
      />

      <div className="flex gap-2">
        <Link
          href="/formalites?kind=STAGE"
          className={cn(
            "min-h-10 rounded-2xl px-4 py-2 text-sm font-semibold",
            kind === "STAGE" ? "border border-lagoon bg-lagoon text-white" : "border border-line bg-paper text-muted hover:text-ink",
          )}
        >
          Stage
        </Link>
        <Link
          href="/formalites?kind=ECHANGE"
          className={cn(
            "min-h-10 rounded-2xl px-4 py-2 text-sm font-semibold",
            kind === "ECHANGE" ? "border border-indigo bg-indigo text-white" : "border border-line bg-paper text-muted hover:text-ink",
          )}
        >
          Semestre d'échange
        </Link>
      </div>

      <div>
        <p className="text-sm font-medium tabular-nums">
          {done}/{items.length} fait
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className={cn("h-full", kind === "STAGE" ? "bg-lagoon" : "bg-indigo")}
            style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {PHASES.map((phase) => {
        const group = items.filter((item) => item.phase === phase.id);
        if (group.length === 0) return null;
        return (
          <section key={phase.id}>
            <h2 className="text-sm font-semibold">{phase.label}</h2>
            <ul className="mt-1">
              {group.map((item) => (
                <ChecklistRow
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.title,
                    hint: item.hint,
                    progress: item.progress[0]
                      ? {
                          done: item.progress[0].done,
                          note: item.progress[0].note,
                          dueDate: item.progress[0].dueDate,
                        }
                      : null,
                  }}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

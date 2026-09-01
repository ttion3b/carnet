import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/carnet-ui";
import { MonthCalendar } from "@/components/month-calendar";
import { DeadlineItem } from "@/components/deadline-item";

export const metadata = { title: "Calendrier" };

export default async function CalendrierPage() {
  const user = await requireUser();
  const [deadlines, offers] = await Promise.all([
    prisma.deadline.findMany({
      where: {
        OR: [{ scope: "CLASSE" }, { createdById: user.id }],
      },
      orderBy: { date: "asc" },
      include: {
        opportunity: { select: { id: true, title: true } },
        createdBy: { select: { name: true } },
      },
    }),
    prisma.opportunity.findMany({
      where: { archived: false },
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
  ]);

  const events = deadlines.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date.toISOString(),
    kind: item.kind,
    scope: item.scope,
    notes: item.notes,
    done: item.done,
    createdByName: item.createdBy.name,
    opportunity: item.opportunity,
    mine: item.createdById === user.id,
  }));

  const upcoming = deadlines.filter((item) => !item.done).slice(0, 8);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <PageHeader
        eyebrow="Dates"
        title="Calendrier"
        description="Clique un jour pour y coller une échéance. Dates école = toute la promo."
      />

      <MonthCalendar events={events} offers={offers} />

      <section>
        <h2 className="text-sm font-semibold">Prochaines échéances</h2>
        {upcoming.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Rien en attente.</p>
        ) : (
          <ul className="mt-1">
            {upcoming.map((item) => (
              <DeadlineItem
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  date: item.date,
                  kind: item.kind,
                  scope: item.scope,
                  notes: item.notes,
                  done: item.done,
                  createdByName: item.createdBy.name,
                  opportunity: item.opportunity,
                  mine: item.createdById === user.id,
                }}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

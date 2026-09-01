import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { initials } from "@/lib/utils";
import { formatDay } from "@/lib/dates";
import { PageHeader, CarnetCard } from "@/components/carnet-ui";

export const metadata = { title: "Promo" };

export default async function PromoPage() {
  await requireUser();
  const [users, config, offerCount, deadlineCount] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: "asc" },
      include: {
        tracks: { select: { status: true, opportunity: { select: { type: true } } } },
      },
    }),
    prisma.classConfig.findUnique({ where: { id: "default" } }),
    prisma.opportunity.count({ where: { archived: false } }),
    prisma.deadline.count({ where: { scope: "CLASSE", done: false } }),
  ]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader
        eyebrow="Classe"
        title={config?.name ?? "Promo"}
        description={`${users.length} compte${users.length > 1 ? "s" : ""} · ${offerCount} offres · ${deadlineCount} échéance${deadlineCount > 1 ? "s" : ""} ouvertes`}
        image="/carnet-promo-groupe.png"
      />
      <p className="-mt-4 text-xs text-muted">
        Code d&apos;invitation : <span className="font-bold text-ink">{config?.inviteCode}</span>
      </p>

      <CarnetCard className="divide-y divide-line/80 px-4">
        {users.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">Personne pour l&apos;instant — sois le premier !</p>
        ) : (
          users.map((person) => {
            const stages = person.tracks.filter((t) => t.opportunity.type === "STAGE").length;
            const exchanges = person.tracks.filter((t) => t.opportunity.type === "ECHANGE").length;
            const accepted = person.tracks.some((t) => t.status === "ACCEPTE");
            return (
              <div key={person.id} className="flex items-center gap-3 py-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-lagoon-soft text-xs font-bold text-lagoon-ink">
                  {initials(person.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{person.name}</p>
                  <p className="text-xs text-muted">
                    {exchanges} échange{exchanges > 1 ? "s" : ""} suivi{exchanges > 1 ? "s" : ""}
                    {stages > 0 ? ` · ${stages} stage${stages > 1 ? "s" : ""}` : ""}
                    {accepted ? " · piste acceptée" : ""}
                  </p>
                </div>
                <p className="text-xs text-muted">depuis {formatDay(person.createdAt)}</p>
              </div>
            );
          })
        )}
      </CarnetCard>
    </div>
  );
}

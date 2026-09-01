import { Suspense } from "react";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Plus } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/carnet-ui";
import { TrackBoard } from "@/components/track-board";
import type { TrackDetailData } from "@/components/track-detail-panel";

export const metadata = { title: "Mon suivi" };

export default async function SuiviPage() {
  const user = await requireUser();
  const tracks = await prisma.track.findMany({
    where: { userId: user.id },
    include: {
      opportunity: true,
      events: { orderBy: { at: "desc" } },
    },
    orderBy: { updatedAt: "desc" },
  });

  const payload: TrackDetailData[] = tracks.map((track) => ({
    id: track.id,
    status: track.status,
    priority: track.priority,
    notes: track.notes,
    opportunityId: track.opportunityId,
    opportunity: {
      title: track.opportunity.title,
      org: track.opportunity.org,
      type: track.opportunity.type,
      city: track.opportunity.city,
      country: track.opportunity.country,
    },
    events: track.events.map((event) => ({
      id: event.id,
      type: event.type,
      at: event.at.toISOString(),
      content: event.content,
    })),
  }));

  return (
    <div className="mx-auto flex max-w-[90rem] flex-col gap-6">
      <PageHeader
        title="Mes pistes"
        description="Toutes les destinations et offres que tu suis, classées par état d’avancement."
        image="/carnet-suivi-ledger.png"
        action={
          <Link
            href="/offres"
            className="inline-flex min-h-10 items-center gap-2 border border-lagoon px-4 text-sm font-semibold text-lagoon hover:bg-lagoon hover:text-white"
          >
            <Plus className="size-4" />
            Ajouter une piste
          </Link>
        }
      />

      {tracks.length === 0 ? (
        <EmptyState
          title="Aucune piste pour l’instant"
          description="Va dans Offres et appuie sur « Ajouter à mon suivi » pour commencer ton carnet."
          href="/offres"
          cta="Parcourir les offres"
        />
      ) : (
        <Suspense fallback={<p className="text-sm text-muted">Chargement…</p>}>
          <TrackBoard tracks={payload} />
        </Suspense>
      )}
    </div>
  );
}

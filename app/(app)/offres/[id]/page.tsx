import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ExternalLink } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { addToTrackAction } from "@/lib/actions/tracks";
import { addCommentAction, archiveOfferAction } from "@/lib/actions/offers";
import { Button, Textarea } from "@/components/ui";
import { DeadlineChip, TypeBadge } from "@/components/badges";
import { formatDay, formatDateTime, relativeDeadline } from "@/lib/dates";
import { splitTags } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await prisma.opportunity.findUnique({ where: { id } });
  return { title: offer?.title ?? "Offre" };
}

export default async function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const offer = await prisma.opportunity.findUnique({
    where: { id },
    include: {
      createdBy: { select: { name: true } },
      comments: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
      tracks: { include: { user: { select: { name: true } } } },
      deadlines: { orderBy: { date: "asc" } },
    },
  });
  if (!offer) notFound();

  const mine = offer.tracks.find((track) => track.userId === user.id);
  const others = offer.tracks.filter((track) => track.userId !== user.id);
  const tags = splitTags(offer.tags);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_18rem]">
      <article>
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={offer.type} />
          {offer.archived ? <span className="text-xs text-muted">Archivée</span> : null}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{offer.title}</h1>
        <p className="mt-1 text-base text-muted">{offer.org}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4" />
          {[offer.city, offer.country].filter(Boolean).join(", ")}
          {offer.duration ? ` · ${offer.duration}` : ""}
          {offer.startHint ? ` · début ${offer.startHint}` : ""}
          {offer.domain ? ` · ${offer.domain}` : ""}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {mine ? (
            <Link href={`/suivi?track=${mine.id}`}>
              <Button>Ouvrir mon suivi</Button>
            </Link>
          ) : (
            <form action={addToTrackAction.bind(null, offer.id)}>
              <Button type="submit">Ajouter à mon suivi</Button>
            </form>
          )}
          {offer.url ? (
            <a href={offer.url} target="_blank" rel="noreferrer">
              <Button variant="outline">
                <ExternalLink className="size-4" />
                {offer.type === "ECHANGE" ? "Formation & détails" : "Voir l'offre"}
              </Button>
            </a>
          ) : null}
          {offer.createdById === user.id ? (
            <form action={archiveOfferAction.bind(null, offer.id)}>
              <Button variant="ghost" type="submit">
                {offer.archived ? "Désarchiver" : "Archiver"}
              </Button>
            </form>
          ) : null}
        </div>

        {offer.applyBy ? (
          <p className="mt-4">
            <DeadlineChip date={offer.applyBy}>
              Candidater avant {formatDay(offer.applyBy)} · {relativeDeadline(offer.applyBy)}
            </DeadlineChip>
          </p>
        ) : null}

        {offer.contact ? <p className="mt-3 text-sm">Contact : {offer.contact}</p> : null}

        {tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md bg-line/70 px-2 py-0.5 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-8 whitespace-pre-wrap text-sm leading-7 text-ink">{offer.description}</div>
        {offer.createdBy ? (
          <p className="mt-6 text-xs text-muted">Ajouté par {offer.createdBy.name}</p>
        ) : (
          <p className="mt-6 text-xs text-muted">Catalogue promo · source officielle ou portail vérifié</p>
        )}

        <section className="mt-10">
          <h2 className="text-sm font-semibold">Notes de la promo</h2>
          <form action={addCommentAction.bind(null, offer.id)} className="mt-3 flex flex-col gap-2">
            <Textarea name="body" rows={3} placeholder="Délai de réponse, contact, ce qu'un ancien a dit…" />
            <Button type="submit" variant="soft" className="self-start">
              Publier
            </Button>
          </form>
          <ul className="mt-4 flex flex-col gap-3">
            {offer.comments.map((comment) => (
              <li key={comment.id} className="rounded-xl border border-line bg-paper p-4">
                <p className="text-xs text-muted">
                  {comment.user.name} · {formatDateTime(comment.createdAt)}
                </p>
                <p className="mt-1 text-sm leading-6">{comment.body}</p>
              </li>
            ))}
            {offer.comments.length === 0 ? (
              <p className="text-sm text-muted">Pas encore de note. Si tu sais quelque chose, écris-le ici.</p>
            ) : null}
          </ul>
        </section>
      </article>

      <aside className="flex flex-col gap-4">
        <div className="rounded-xl border border-line bg-paper p-4">
          <h2 className="text-sm font-semibold">Qui suit</h2>
          {offer.tracks.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Personne pour l'instant.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {mine ? <li className="font-medium">Toi</li> : null}
              {others.map((track) => (
                <li key={track.id}>{track.user.name}</li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted">Les statuts et notes restent privés.</p>
        </div>
        {offer.deadlines.length > 0 ? (
          <div className="rounded-xl border border-line bg-paper p-4">
            <h2 className="text-sm font-semibold">Échéances liées</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {offer.deadlines.map((deadline) => (
                <li key={deadline.id} className="text-sm">
                  <p>{deadline.title}</p>
                  <p className="text-xs text-muted">{formatDay(deadline.date)}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

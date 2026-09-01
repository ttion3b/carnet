import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { addToTrackAction } from "@/lib/actions/tracks";
import { addCommentAction, archiveOfferAction } from "@/lib/actions/offers";
import { Button } from "@/components/ui";
import { DeadlineChip, InfoPill, TagBadge, TypeBadge } from "@/components/badges";
import { CarnetCard } from "@/components/carnet-ui";
import { OfferCommentForm } from "@/components/offer-comment-form";
import { formatDay, formatDateTime, relativeDeadline } from "@/lib/dates";
import { parseOfferContent } from "@/lib/offer-presentation";
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
  const { about, capacity, applyUrl, resources } = parseOfferContent(offer);
  const commentAction = addCommentAction.bind(null, offer.id);

  return (
    <div className="mx-auto max-w-[1180px]">
      <Link
        href="/offres"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-lagoon"
      >
        <ArrowLeft className="size-4" />
        Retour aux offres
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-5 border-b border-line pb-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={offer.type} />
            {offer.archived ? <span className="text-xs text-muted">Archivée</span> : null}
          </div>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{offer.title}</h1>
          <p className="mt-1 text-base text-muted">{offer.org}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <MapPin className="size-4 shrink-0" />
            {[offer.city, offer.country].filter(Boolean).join(", ")}
            {offer.startHint ? <span>· {offer.startHint}</span> : null}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mine ? (
            <Link href={`/suivi?track=${mine.id}`}>
              <Button>Ouvrir mon suivi</Button>
            </Link>
          ) : (
            <form action={addToTrackAction.bind(null, offer.id)}>
              <Button type="submit">Suivre</Button>
            </form>
          )}
          {offer.url ? (
            <a href={offer.url} target="_blank" rel="noreferrer">
              <Button variant="outline">
                <ExternalLink className="size-4" />
                {offer.type === "ECHANGE" ? "Voir la formation" : "Voir l'offre"}
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
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        {capacity != null ? <InfoPill>{capacity} place{capacity > 1 ? "s" : ""}</InfoPill> : null}
        {offer.duration ? <InfoPill>{offer.duration}</InfoPill> : null}
        {offer.domain ? <InfoPill>{offer.domain}</InfoPill> : null}
        <InfoPill>{offer.type === "ECHANGE" ? "Échange" : "Stage"}</InfoPill>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <CarnetCard className="p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-saffron">À propos</h2>
            <div className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-ink">{about}</div>
            {offer.createdBy ? (
              <p className="mt-5 text-xs text-muted">Ajouté par {offer.createdBy.name}</p>
            ) : (
              <p className="mt-5 text-xs text-muted">Catalogue promo · source officielle ou portail vérifié</p>
            )}
          </CarnetCard>

          {tags.length > 0 ? (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-saffron">Spécialisations</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagBadge key={tag}>{tag}</TagBadge>
                ))}
              </div>
            </section>
          ) : null}

          {resources.length > 0 ? (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-saffron">Ressources</h2>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {resources.map((resource) => (
                  <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ExternalLink className="size-4" />
                      {resource.label}
                    </Button>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <CarnetCard className="p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-saffron">Notes de la promo</h2>
            <p className="mt-1 text-sm text-muted">Partage un retour d&apos;expérience utile à toute la classe.</p>
            <div className="mt-4">
              <OfferCommentForm action={commentAction} />
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {offer.comments.map((comment) => (
                <li key={comment.id} className="rounded-xl border border-line bg-bg/50 p-4">
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
          </CarnetCard>
        </div>

        <aside className="flex flex-col gap-4">
          <CarnetCard className="p-5">
            <h2 className="text-sm font-semibold">Candidature</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Statut</dt>
                <dd className="mt-1 font-medium">
                  {mine ? "Dans ton suivi" : "Pas encore suivie"}
                </dd>
              </div>
              {offer.applyBy ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Prochaine échéance</dt>
                  <dd className="mt-1">
                    <DeadlineChip date={offer.applyBy}>
                      {formatDay(offer.applyBy)} · {relativeDeadline(offer.applyBy)}
                    </DeadlineChip>
                  </dd>
                </div>
              ) : null}
              {offer.contact ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Contact</dt>
                  <dd className="mt-1 leading-6 text-ink">{offer.contact}</dd>
                </div>
              ) : null}
            </dl>
            {applyUrl && applyUrl !== offer.url ? (
              <a href={applyUrl} target="_blank" rel="noreferrer" className="mt-4 block">
                <Button variant="soft" className="w-full">
                  <ExternalLink className="size-4" />
                  Candidater chez le partenaire
                </Button>
              </a>
            ) : null}
          </CarnetCard>

          <CarnetCard className="p-4">
            <h2 className="text-sm font-semibold">Qui suit</h2>
            {offer.tracks.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Personne pour l&apos;instant.</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {mine ? <li className="font-medium">Toi</li> : null}
                {others.map((track) => (
                  <li key={track.id}>{track.user.name}</li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-[11px] leading-5 text-muted">Statuts et notes privés.</p>
          </CarnetCard>

          {offer.deadlines.length > 0 ? (
            <CarnetCard className="p-4">
              <h2 className="text-sm font-semibold">Échéances liées</h2>
              <ul className="mt-3 space-y-2">
                {offer.deadlines.map((deadline) => (
                  <li key={deadline.id} className="text-sm">
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-xs text-muted">{formatDay(deadline.date)}</p>
                  </li>
                ))}
              </ul>
            </CarnetCard>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

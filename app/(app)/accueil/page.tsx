import Link from "next/link";
import { ArrowRight, Backpack, Compass, Plane, Send } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUpcomingDeadlines } from "@/lib/queries";
import { StatusBadge } from "@/components/badges";
import { formatShort, relativeDeadline } from "@/lib/dates";

export const metadata = { title: "Accueil" };

const STEPS = [
  { label: "Explorer", hint: "Trouver sa destination", icon: Compass },
  { label: "Candidater", hint: "Monter son dossier", icon: Send },
  { label: "Préparer", hint: "Organiser son départ", icon: Backpack },
  { label: "Partir", hint: "Vivre l’expérience", icon: Plane },
];

export default async function AccueilPage() {
  const user = await requireUser();
  const firstName = user.name.split(" ")[0];
  const [deadlines, tracks, stageItems, exchangeItems, progress] = await Promise.all([
    getUpcomingDeadlines(user.id, 4),
    prisma.track.findMany({
      where: { userId: user.id },
      include: { opportunity: true },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.checklistItem.count({ where: { kind: "STAGE" } }),
    prisma.checklistItem.count({ where: { kind: "ECHANGE" } }),
    prisma.checklistProgress.findMany({
      where: { userId: user.id, done: true },
      include: { item: { select: { kind: true } } },
    }),
  ]);

  const stageDone = progress.filter((item) => item.item.kind === "STAGE").length;
  const exchangeDone = progress.filter((item) => item.item.kind === "ECHANGE").length;
  const activeTracks = tracks.filter(
    (track) => !["ACCEPTE", "REFUSE", "ABANDON"].includes(track.status),
  );
  const currentStep = tracks.length === 0 ? 0 : activeTracks.length > 0 ? 1 : 2;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 rounded-2xl border border-line/90 bg-paper/70 p-6 md:p-7">
        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
          Salut {firstName},<br />on part où ?
        </h1>
        <p className="mt-3 font-display text-base italic text-lagoon">Ton aventure commence ici.</p>
        <span className="mt-3 block h-0.5 w-16 -rotate-2 bg-saffron" />
      </header>

      <section className="border-b border-line/80 py-7" aria-label="Étapes du départ">
        <p className="mb-5 font-display text-sm italic text-lagoon">Ton parcours</p>
        <div className="relative grid grid-cols-4">
          <span className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-line" />
          {STEPS.map((step, index) => {
            const reached = index <= currentStep;
            const Icon = step.icon;
            return (
              <div key={step.label} className="relative flex flex-col items-center text-center">
                <span
                  className={`z-10 grid size-10 place-items-center rounded-full border-2 ${
                    reached
                      ? "border-ink bg-ink text-paper"
                      : "border-lagoon bg-bg text-lagoon"
                  }`}
                >
                  <Icon className="size-4" />
                </span>
                <p className={`mt-3 text-xs font-bold uppercase tracking-wider ${reached ? "text-ink" : "text-lagoon"}`}>
                  {step.label}
                </p>
                <p className="mt-1 hidden text-[11px] text-muted sm:block">{step.hint}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 py-8 lg:grid-cols-3">
        <div className="paper-note -rotate-[0.35deg] p-5">
          <SectionTitle title="Prochains délais" href="/calendrier" />
          {deadlines.length === 0 ? (
            <CardEmpty
              title="Calme avant la tempête"
              description="Aucune échéance proche. Profite du calme."
            />
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {deadlines.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.opportunity ? `/offres/${item.opportunity.id}` : "/calendrier"}
                    className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-3 hover:text-lagoon"
                  >
                    <time className="font-display text-xl text-saffron">
                      {formatShort(item.date)}
                    </time>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{item.title}</span>
                      <span className="text-xs text-muted">{item.scope === "CLASSE" ? "Promo" : "Personnel"}</span>
                    </span>
                    <span className="text-xs text-muted">{relativeDeadline(item.date)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="paper-note rotate-[0.25deg] p-5">
          <SectionTitle title="Mes candidatures" href="/suivi" />
          {tracks.length === 0 ? (
            <CardEmpty
              title="Première piste"
              description="Ta première candidature apparaîtra ici."
              href="/offres"
              cta="Explorer les offres"
            />
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {tracks.map((track) => (
                <li key={track.id}>
                  <Link
                    href={`/suivi?track=${track.id}`}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{track.opportunity.org}</span>
                      <span className="text-xs text-muted">{track.opportunity.country}</span>
                    </span>
                    <StatusBadge status={track.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="paper-note -rotate-[0.2deg] p-5">
          <SectionTitle title="Ma checklist" href="/formalites" />
          <div className="mt-5 space-y-6">
            <ProgressRow label="Mobilité" value={exchangeDone} total={exchangeItems} />
            <ProgressRow label="Stage" value={stageDone} total={stageItems} />
          </div>
        </div>
      </section>

      <footer className="flex items-end justify-between border-t border-line py-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">À retenir</p>
          <p className="mt-2 font-display italic text-muted">
            Un départ bien préparé commence par une bonne page.
          </p>
        </div>
        <Link href="/offres" className="hidden items-center gap-2 text-sm font-semibold text-lagoon sm:flex">
          Explorer les destinations <ArrowRight className="size-4" />
        </Link>
      </footer>
    </div>
  );
}

function SectionTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between border-b border-saffron/60 pb-2">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-saffron">{title}</h2>
      <Link href={href} className="text-[11px] font-medium text-lagoon hover:underline">
        Voir tout
      </Link>
    </div>
  );
}

function CardEmpty({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="py-6">
      <p className="font-display text-base font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      {href && cta ? (
        <Link href={href} className="mt-3 inline-flex text-xs font-semibold text-lagoon hover:underline">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

function ProgressRow({ label, value, total }: { label: string; value: number; total: number }) {
  const percent = total ? (value / total) * 100 : 0;
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-5">
      <p className="font-display text-4xl leading-none">
        {value}<span className="ml-1 text-lg text-muted">/{total}</span>
      </p>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
        <div className="mt-2 h-px bg-line">
          <div className="h-px bg-lagoon" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

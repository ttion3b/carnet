import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getOffers } from "@/lib/queries";
import { OffersByRegion } from "@/components/offers-by-region";
import { OffersByDomain } from "@/components/offers-by-domain";
import { Input, Select } from "@/components/ui";
import { REGIONS } from "@/lib/constants";
import { STAGE_DOMAINS } from "@/lib/domains";
import { cn } from "@/lib/utils";

export const metadata = { title: "Explorer" };

export default async function OffresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; region?: string; domain?: string; kind?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const kind = params.kind === "stage" ? "stage" : "echange";

  const offers = await getOffers({
    promo: user.promo,
    type: kind === "stage" ? "STAGE" : "ECHANGE",
    q: params.q,
    region: kind === "echange" ? params.region : undefined,
    domain: kind === "stage" ? params.domain : undefined,
  });

  const tabClass = (active: boolean) =>
    cn(
      "rounded-t-xl border border-b-0 px-5 py-3 text-sm font-semibold transition-colors",
      active ? "border-lagoon bg-lagoon text-white" : "border-line bg-paper text-ink hover:text-lagoon",
    );

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Choisis ton prochain chapitre
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Explore les écoles partenaires et les stages anglophones, puis garde les pistes qui te parlent.
          </p>
        </div>
        <Link
          href="/offres/nouvelle"
          className="inline-flex min-h-10 items-center gap-2 border border-lagoon px-4 text-sm font-semibold text-lagoon hover:bg-lagoon hover:text-white"
        >
          <Plus className="size-4" />
          Ajouter une offre
        </Link>
      </header>

      <form className="mt-7 flex max-w-4xl flex-wrap gap-2" action="/offres">
        <input type="hidden" name="kind" value={kind} />
        <label className="relative min-w-64 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            name="q"
            defaultValue={params.q}
            placeholder="École, entreprise, pays, ville…"
            className="paper-note rounded-lg border-0 pl-10"
          />
        </label>
        {kind === "echange" ? (
          <Select name="region" defaultValue={params.region ?? ""} className="w-44">
            <option value="">Toutes les régions</option>
            {REGIONS.map((region) => (
              <option key={region.id} value={region.id}>{region.label}</option>
            ))}
          </Select>
        ) : (
          <Select name="domain" defaultValue={params.domain ?? ""} className="w-48">
            <option value="">Tous les domaines</option>
            {STAGE_DOMAINS.map((domain) => (
              <option key={domain.id} value={domain.id}>{domain.label}</option>
            ))}
          </Select>
        )}
        <button
          type="submit"
          className="min-h-11 rounded-lg bg-lagoon px-5 text-sm font-semibold text-paper shadow-md hover:bg-lagoon-ink"
        >
          Rechercher
        </button>
      </form>

      <nav className="mt-7 flex items-end gap-2 border-b border-line" aria-label="Type d’offre">
        <Link href="/offres?kind=echange" className={tabClass(kind === "echange")}>
          Semestres d’échange
        </Link>
        <Link href="/offres?kind=stage" className={tabClass(kind === "stage")}>
          Stages anglophones
        </Link>
      </nav>

      <section className="mt-3">
        {kind === "echange" ? (
          <OffersByRegion
            offers={offers}
            activeRegion={params.region}
            expandAll={Boolean(params.q)}
          />
        ) : (
          <OffersByDomain offers={offers} expandAll={Boolean(params.q || params.domain)} />
        )}
      </section>
    </div>
  );
}

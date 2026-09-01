"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { groupOffersByDomain } from "@/lib/domains";
import { formatShort } from "@/lib/dates";

type OfferRow = {
  id: string;
  type: string;
  title: string;
  org: string;
  city: string | null;
  country: string;
  region: string;
  domain: string | null;
  duration: string | null;
  tags: string;
  applyBy: Date | null;
  _count: { tracks: number };
};

function InternshipRows({ offers }: { offers: OfferRow[] }) {
  return (
    <ul className="divide-y divide-line">
      {offers.map((offer) => (
        <li key={offer.id}>
          <Link
            href={`/offres/${offer.id}`}
            className="group grid gap-1 px-3 py-4 transition-colors hover:bg-lagoon-soft/35 md:grid-cols-[8rem_1.5fr_1fr_7rem_7rem] md:items-center md:gap-4"
          >
            <span className="text-xs text-muted">{offer.country}</span>
            <span>
              <span className="block text-sm font-semibold text-lagoon-ink">{offer.title}</span>
              <span className="text-xs text-muted">{offer.org}</span>
            </span>
            <span className="text-xs text-muted">{offer.duration || "Durée variable"}</span>
            <span className={offer.applyBy ? "text-xs text-saffron" : "text-xs text-muted"}>
              {offer.applyBy ? formatShort(offer.applyBy) : "Ouvert"}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-lagoon">
              Voir l’offre
              <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function OffersByDomain({
  offers,
  expandAll,
}: {
  offers: OfferRow[];
  expandAll?: boolean;
}) {
  const groups = groupOffersByDomain(offers);

  if (groups.length === 0) {
    return <p className="border-t border-line py-8 text-sm text-muted">Aucun stage pour ces filtres.</p>;
  }

  return (
    <div className="border-t border-line">
      {groups.map((group, index) => (
        <details key={group.id} open={expandAll || index === 0} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display flex-1 text-2xl font-semibold">{group.label}</h3>
            <span className="text-sm text-muted">
              {group.offers.length} offre{group.offers.length > 1 ? "s" : ""}
            </span>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pb-4">
            <InternshipRows offers={group.offers} />
          </div>
        </details>
      ))}
    </div>
  );
}

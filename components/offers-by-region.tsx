"use client";

import Link from "next/link";
import { Building2, ChevronDown, ExternalLink } from "lucide-react";
import { groupOffersByRegion } from "@/lib/regions";
import { formatShort } from "@/lib/dates";
import { splitTags } from "@/lib/utils";

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

function SchoolRows({ offers }: { offers: OfferRow[] }) {
  return (
    <ul className="grid gap-3 p-3 md:grid-cols-2">
        {offers.map((offer) => (
          <li key={offer.id} className="paper-note">
            <Link
              href={`/offres/${offer.id}`}
              className="group grid grid-cols-[2.75rem_1fr] gap-3 p-4 transition-colors hover:bg-lagoon-soft/35"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-lagoon-soft text-lagoon">
                <Building2 className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-ink">{offer.org}</span>
                <span className="mt-0.5 block text-xs font-semibold text-lagoon">{offer.city || offer.country}</span>
                <span className="mt-2 block text-xs leading-5 text-muted">{splitTags(offer.tags).join(" · ")}</span>
                <span className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-2">
                  <span className={offer.applyBy ? "text-xs text-saffron" : "text-xs text-muted"}>
                    {offer.applyBy ? formatShort(offer.applyBy) : "Date à confirmer"}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-lagoon">
                    Formation <ExternalLink className="size-3" />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export function OffersByRegion({
  offers,
  activeRegion,
  expandAll,
}: {
  offers: OfferRow[];
  activeRegion?: string;
  expandAll?: boolean;
}) {
  const groups = groupOffersByRegion(offers);

  if (groups.length === 0) {
    return <p className="border-t border-line py-8 text-sm text-muted">Aucune destination pour ces filtres.</p>;
  }

  return (
    <div className="space-y-2">
      {groups.map((group, index) => {
        const open = expandAll || activeRegion === group.id || (!activeRegion && group.id === "FRANCE");
        return (
          <details
            key={group.id}
            open={open}
            className={`group overflow-hidden rounded-xl border border-line ${index % 2 ? "bg-saffron-soft/45" : "bg-lagoon-soft/65"}`}
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display flex-1 text-xl font-semibold">{group.label}</h3>
              <span className="text-sm text-muted">
                {group.offers.length} destination{group.offers.length > 1 ? "s" : ""}
              </span>
              <ChevronDown className="size-4 text-ink transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-line bg-bg/80 pb-3">
              <SchoolRows offers={group.offers} />
            </div>
          </details>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import { MapPin } from "lucide-react";
import { TypeBadge, DeadlineChip } from "@/components/badges";
import { formatShort, relativeDeadline } from "@/lib/dates";
import { Card } from "@/components/ui";

export function OfferCard({
  offer,
  followers,
}: {
  offer: {
    id: string;
    type: string;
    title: string;
    org: string;
    city: string | null;
    country: string;
    domain: string | null;
    applyBy: Date | null;
    duration: string | null;
  };
  followers: number;
}) {
  return (
    <Link href={`/offres/${offer.id}`} className="block">
      <Card className="h-full p-4 transition-colors hover:border-lagoon/40 hover:bg-lagoon-soft/40">
        <div className="flex items-start justify-between gap-3">
          <TypeBadge type={offer.type} />
          {offer.applyBy ? (
            <DeadlineChip date={offer.applyBy}>
              {formatShort(offer.applyBy)} · {relativeDeadline(offer.applyBy)}
            </DeadlineChip>
          ) : null}
        </div>
        <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">{offer.title}</h3>
        <p className="mt-1 text-sm text-muted">{offer.org}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="size-3.5" />
          {[offer.city, offer.country].filter(Boolean).join(", ")}
          {offer.duration ? ` · ${offer.duration}` : ""}
          {offer.domain ? ` · ${offer.domain}` : ""}
        </p>
        {followers > 0 ? (
          <p className="mt-3 text-xs text-lagoon-ink">
            {followers} {followers > 1 ? "personnes suivent" : "personne suit"}
          </p>
        ) : (
          <p className="mt-3 text-xs text-muted">Personne de la promo ne suit encore</p>
        )}
      </Card>
    </Link>
  );
}

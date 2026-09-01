export const STAGE_DOMAINS = [
  { id: "Cybersécurité", label: "Cybersécurité" },
  { id: "Data & IA", label: "Data & IA" },
  { id: "Génie logiciel", label: "Génie logiciel" },
  { id: "Réseaux & télécom", label: "Réseaux & télécom" },
  { id: "Portails & listes", label: "Portails & listes" },
] as const;

export const DOMAIN_ORDER = STAGE_DOMAINS.map((d) => d.id);

export function domainLabel(id: string) {
  return STAGE_DOMAINS.find((d) => d.id === id)?.label ?? id;
}

export function groupOffersByDomain<T extends { domain: string | null; country: string; title: string }>(
  offers: T[],
) {
  const buckets = new Map<string, T[]>();
  for (const offer of offers) {
    const key = offer.domain?.trim() || "Génie logiciel";
    const list = buckets.get(key) ?? [];
    list.push(offer);
    buckets.set(key, list);
  }

  const ordered = DOMAIN_ORDER.filter((id) => buckets.has(id));
  const extra = [...buckets.keys()].filter((id) => !DOMAIN_ORDER.includes(id as (typeof DOMAIN_ORDER)[number]));
  const ids = [...ordered, ...extra.sort()];

  return ids.map((id) => {
    const items = buckets.get(id) ?? [];
    const byCountry = new Map<string, T[]>();
    for (const item of items) {
      const country = item.country?.trim() || "Autre";
      const list = byCountry.get(country) ?? [];
      list.push(item);
      byCountry.set(country, list);
    }
    const countries = [...byCountry.entries()]
      .sort(([a], [b]) => a.localeCompare(b, "fr"))
      .map(([country, countryOffers]) => ({
        country,
        offers: countryOffers.sort((a, b) => a.title.localeCompare(b.title, "fr")),
      }));
    return {
      id,
      label: domainLabel(id),
      offers: items,
      countries: countries.length > 1 ? countries : null,
    };
  });
}

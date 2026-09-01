export const REGIONS = [
  { id: "FRANCE", label: "France" },
  { id: "EUROPE", label: "Europe" },
  { id: "AMERIQUE", label: "Amérique" },
  { id: "AFRIQUE", label: "Afrique" },
  { id: "ASIE", label: "Asie" },
  { id: "OCEAN_INDIEN", label: "Océan Indien" },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];

const ORDER = REGIONS.map((region) => region.id);

export function regionLabel(id: string) {
  return REGIONS.find((region) => region.id === id)?.label ?? id;
}

export function groupOffersByRegion<T extends { region: string; city: string | null; title: string }>(
  offers: T[],
) {
  const buckets = new Map<string, T[]>();
  for (const offer of offers) {
    const key = offer.region || "FRANCE";
    const list = buckets.get(key) ?? [];
    list.push(offer);
    buckets.set(key, list);
  }

  return ORDER.filter((id) => buckets.has(id)).map((id) => {
    const items = buckets.get(id) ?? [];
    if (id === "FRANCE") {
      const byCity = new Map<string, T[]>();
      for (const item of items) {
        const city = item.city?.trim() || "Autre";
        const list = byCity.get(city) ?? [];
        list.push(item);
        byCity.set(city, list);
      }
      const cities = [...byCity.entries()]
        .sort(([a], [b]) => a.localeCompare(b, "fr"))
        .map(([city, cityOffers]) => ({
          city,
          offers: cityOffers.sort((a, b) => a.title.localeCompare(b.title, "fr")),
        }));
      return { id, label: regionLabel(id), offers: items, cities };
    }
    return {
      id,
      label: regionLabel(id),
      offers: items.sort((a, b) => a.title.localeCompare(b.title, "fr")),
      cities: null as null,
    };
  });
}

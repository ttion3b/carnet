const URL_RE = /https?:\/\/[^\s)\]]+/g;

export type OfferResource = {
  label: string;
  href: string;
};

export function parseOfferContent(offer: {
  description: string;
  url: string | null;
  type: string;
}) {
  let text = offer.description;

  let applyUrl: string | null = null;
  const applyMatch = text.match(/Candidature partenaire\s*:\s*(https?:\/\/\S+)/i);
  if (applyMatch) {
    applyUrl = applyMatch[1].replace(/[.,;]+$/, "");
    text = text.replace(/\n?\n?Candidature partenaire\s*:\s*https?:\/\/\S+/i, "");
  }

  let capacity: number | null = null;
  const capMatch = text.match(/Places\s*:\s*(\d+)/i);
  if (capMatch) {
    capacity = Number(capMatch[1]);
    text = text.replace(/\n?\n?Places\s*:\s*\d+/i, "");
  }

  const embeddedUrls = [...text.matchAll(URL_RE)].map((match) => match[0].replace(/[.,;]+$/, ""));
  text = text
    .replace(URL_RE, "")
    .replace(/[ \t]+:\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const formationUrl = offer.url?.trim() || null;
  const resources: OfferResource[] = [];
  const seen = new Set<string>();

  function pushResource(label: string, href: string) {
    if (!href || seen.has(href)) return;
    seen.add(href);
    resources.push({ label, href });
  }

  if (formationUrl) {
    pushResource(
      offer.type === "ECHANGE" ? "Consulter la formation" : "Voir l'offre",
      formationUrl,
    );
  }

  if (applyUrl) {
    pushResource("Candidater chez le partenaire", applyUrl);
  }

  for (const href of embeddedUrls) {
    if (href === formationUrl || href === applyUrl) continue;
    pushResource(resourceLabelFromUrl(href), href);
  }

  return { about: text, capacity, applyUrl, resources };
}

function resourceLabelFromUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes(".pdf") || lower.includes("maquette") || lower.includes("plaquette") || lower.includes("livret")) {
    return "Consulter la maquette pédagogique";
  }
  if (lower.includes("admission") || lower.includes("candidat") || lower.includes("apply")) {
    return "Portail de candidature";
  }
  if (lower.includes("formation") || lower.includes("programme")) {
    return "Voir le programme";
  }
  return "Ouvrir la ressource";
}

export function isExternalUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

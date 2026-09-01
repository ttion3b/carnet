export const APP_NAME = "Carnet";
export const COOKIE_NAME = "carnet_session";
export const AUTH_SECRET =
  process.env.AUTH_SECRET ?? "carnet-esiroi-dev-secret-change-me";

export const TYPES = {
  STAGE: "STAGE",
  ECHANGE: "ECHANGE",
} as const;

export type OpportunityType = (typeof TYPES)[keyof typeof TYPES];

export const DOMAINS = [
  "Mobilité",
  "Génie logiciel",
  "Cybersécurité",
  "Data & IA",
  "Réseaux & télécom",
  "Portails & listes",
] as const;

export const REGIONS = [
  { id: "FRANCE", label: "France" },
  { id: "EUROPE", label: "Europe" },
  { id: "AMERIQUE", label: "Amérique" },
  { id: "AFRIQUE", label: "Afrique" },
  { id: "ASIE", label: "Asie" },
  { id: "OCEAN_INDIEN", label: "Océan Indien" },
] as const;

export const STATUSES = [
  { id: "VEILLE", label: "En veille", hint: "Intéressé, pas encore candidaté" },
  { id: "ENVOYE", label: "Candidaté", hint: "Dossier ou mail envoyé" },
  { id: "ATTENTE", label: "En attente", hint: "Relance ou réponse à venir" },
  { id: "ENTRETIEN", label: "Entretien", hint: "Échange prévu ou passé" },
  { id: "PROPOSITION", label: "Proposition", hint: "Offre ou acceptation reçue" },
  { id: "ACCEPTE", label: "Accepté", hint: "Tu as dit oui" },
  { id: "REFUSE", label: "Refusé", hint: "Eux ou toi" },
  { id: "ABANDON", label: "Laissé", hint: "Plus d'actualité" },
] as const;

export type StatusId = (typeof STATUSES)[number]["id"];

export const EVENT_TYPES = [
  { id: "CANDIDATURE", label: "Candidature envoyée" },
  { id: "RELANCE", label: "Relance" },
  { id: "REPONSE", label: "Réponse reçue" },
  { id: "ENTRETIEN", label: "Entretien" },
  { id: "PROPOSITION", label: "Proposition" },
  { id: "REFUS", label: "Refus" },
  { id: "NOTE", label: "Note" },
] as const;

export const PRIORITIES = [
  { id: "HAUT", label: "Prioritaire" },
  { id: "MOYEN", label: "Normale" },
  { id: "BAS", label: "Secondaire" },
] as const;

export const DEADLINE_KINDS = [
  { id: "ECOLE", label: "École" },
  { id: "OFFRE", label: "Offre" },
  { id: "FORMALITE", label: "Formalité" },
  { id: "PERSO", label: "Perso" },
] as const;

export const PHASES = [
  { id: "AVANT", label: "Avant" },
  { id: "PENDANT", label: "Pendant" },
  { id: "APRES", label: "Après" },
] as const;

export function statusLabel(id: string) {
  return STATUSES.find((item) => item.id === id)?.label ?? id;
}

export function eventLabel(id: string) {
  return EVENT_TYPES.find((item) => item.id === id)?.label ?? id;
}

import { PrismaClient } from "@prisma/client";
import { MOBILITY_PARTNERS } from "./mobility-partners";
import { INTERNSHIP_OFFERS } from "./internship-offers";

const prisma = new PrismaClient();

const FAKE_USER_EMAILS = [
  "demo@esiroi.re",
  "lea.morel@esiroi.re",
  "yanis.benali@esiroi.re",
  "ina.hoareau@esiroi.re",
];

const STAGE_ITEMS = [
  { phase: "AVANT", title: "CV à jour", hint: "Une page, lisible, PDF. Adapte-le à chaque offre." },
  { phase: "AVANT", title: "Lettre de motivation", hint: "Une version par entreprise. Pourquoi eux, pourquoi toi." },
  { phase: "AVANT", title: "Attestation de scolarité + relevé de notes", hint: "Télécharge-les une fois et range-les dans un dossier." },
  { phase: "AVANT", title: "Candidatures envoyées", hint: "Tout se suit dans Mon suivi : date, relance, réponse." },
  { phase: "AVANT", title: "Offre acceptée — prévenir l'école", hint: "Responsable de formation / relations entreprises ESIROI." },
  { phase: "AVANT", title: "Convention : partie étudiant", hint: "Dates, missions, gratification, tuteur entreprise." },
  { phase: "AVANT", title: "Convention : signature entreprise", hint: "Relance si ça traîne — sans ça, pas de stage." },
  { phase: "AVANT", title: "Convention : signature ESIROI", hint: "Scolarité / service des stages. Délai souvent 1 à 2 semaines." },
  { phase: "AVANT", title: "Assurance responsabilité civile", hint: "Attestation de ta mutuelle ou assurance habitation." },
  { phase: "AVANT", title: "Couverture sociale", hint: "Sécurité sociale + mutuelle. Stage à l'étranger : vérifie le pays." },
  { phase: "AVANT", title: "Logement si hors domicile", hint: "Métropole, Asie, Europe : anticipe 4 à 8 semaines." },
  { phase: "AVANT", title: "Objectifs pédagogiques", hint: "Valide-les avec le tuteur école avant de partir." },
  { phase: "PENDANT", title: "Point mi-parcours tuteur école", hint: "Mail ou visio. Note les difficultés tôt." },
  { phase: "PENDANT", title: "Journal de bord", hint: "2–3 lignes par semaine : missions, outils, questions." },
  { phase: "PENDANT", title: "Plan du rapport", hint: "Commence dès le 1er mois. Ne pas tout laisser à la fin." },
  { phase: "APRES", title: "Rapport de stage déposé", hint: "Respecte le format et la date ESIROI." },
  { phase: "APRES", title: "Attestation de stage entreprise", hint: "Utile pour bourses, visas, CV." },
  { phase: "APRES", title: "Soutenance", hint: "Slides + démo si possible. Envoie le support au jury." },
  { phase: "APRES", title: "Évaluation tuteur entreprise", hint: "Vérifie qu'elle est bien renvoyée à l'école." },
];

const ECHANGE_ITEMS = [
  { phase: "AVANT", title: "Choisir 3 destinations", hint: "Accords ESIROI, langue, semestre, coût de la vie." },
  { phase: "AVANT", title: "Vérifier les accords partenaires", hint: "Service relations internationales / mobilité." },
  { phase: "AVANT", title: "Dossier candidature ESIROI", hint: "Dates internes souvent bien avant celles de l'université d'accueil." },
  { phase: "AVANT", title: "CV + lettre + relevé de notes", hint: "Version FR et EN selon la destination." },
  { phase: "AVANT", title: "Preuve de langue", hint: "TOEIC, DELF, attestation de l'école — selon le partenaire." },
  { phase: "AVANT", title: "Acceptation ESIROI", hint: "Sans ça, pas de dossier à l'université d'accueil." },
  { phase: "AVANT", title: "Candidature université d'accueil", hint: "Portail, pièces scannées, deadlines souvent strictes." },
  { phase: "AVANT", title: "Learning Agreement (before)", hint: "Choix d'UE équivalentes. Fais-le relire par le responsable pédagogique." },
  { phase: "AVANT", title: "Acceptation université d'accueil", hint: "Lettre / email d'admission : à garder précieusement." },
  { phase: "AVANT", title: "Visa / titre de séjour", hint: "RDV campus France / consulat. Compter plusieurs semaines." },
  { phase: "AVANT", title: "Assurances (santé, rapatriement, RC)", hint: "Carte européenne si UE. Hors UE : contrat dédié." },
  { phase: "AVANT", title: "Bourses (Erasmus+, Région, CROUS, école)", hint: "Dossiers séparés, justificatifs, dates différentes." },
  { phase: "AVANT", title: "Logement", hint: "Résidence univ, coloc, caution. Ne pas attendre l'admission finale." },
  { phase: "AVANT", title: "Billets et transport", hint: "Flexible si le visa n'est pas encore là." },
  { phase: "AVANT", title: "Convention de mobilité", hint: "Contrat pédagogique signé école + étudiant (+ partenaire)." },
  { phase: "AVANT", title: "Banque et moyens de paiement", hint: "Carte internationale, éventuellement compte local." },
  { phase: "PENDANT", title: "Inscription pédagogique sur place", hint: "Récupère le certificat d'arrivée pour les bourses." },
  { phase: "PENDANT", title: "Learning Agreement (during)", hint: "Toute modification d'UE doit être re-signée." },
  { phase: "PENDANT", title: "Suivi ECTS", hint: "Ne découvre pas un trou de crédits à la fin." },
  { phase: "PENDANT", title: "Point ESIROI mobilité", hint: "Un mail par mois suffit. Signale les problèmes tôt." },
  { phase: "APRES", title: "Transcript of records", hint: "Relevé officiel de l'université d'accueil." },
  { phase: "APRES", title: "Reconnaissance des crédits ESIROI", hint: "Jury / responsable pédagogique. Garde le Learning Agreement." },
  { phase: "APRES", title: "Rapport de mobilité", hint: "Souvent exigé pour le solde de bourse." },
  { phase: "APRES", title: "Justificatifs de bourses", hint: "Certificat de séjour, billets, quittances." },
];

async function removeFakeUsers() {
  const fakeUsers = await prisma.user.findMany({
    where: { email: { in: FAKE_USER_EMAILS } },
    select: { id: true },
  });
  const ids = fakeUsers.map((u) => u.id);
  if (ids.length === 0) return;

  await prisma.track.deleteMany({ where: { userId: { in: ids } } });
  await prisma.comment.deleteMany({ where: { userId: { in: ids } } });
  await prisma.deadline.deleteMany({ where: { createdById: { in: ids } } });
  await prisma.checklistProgress.deleteMany({ where: { userId: { in: ids } } });
  await prisma.opportunity.deleteMany({ where: { createdById: { in: ids } } });
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
}

async function syncCatalogOffers() {
  const catalogIds = (
    await prisma.opportunity.findMany({
      where: { createdById: null, promo: "4A-INFO" },
      select: { id: true },
    })
  ).map((o) => o.id);

  if (catalogIds.length > 0) {
    await prisma.track.deleteMany({ where: { opportunityId: { in: catalogIds } } });
    await prisma.comment.deleteMany({ where: { opportunityId: { in: catalogIds } } });
    await prisma.deadline.updateMany({
      where: { opportunityId: { in: catalogIds } },
      data: { opportunityId: null },
    });
    await prisma.opportunity.deleteMany({ where: { id: { in: catalogIds } } });
  }

  const exchangeData = MOBILITY_PARTNERS.map((partner) => ({
    type: "ECHANGE" as const,
    title: partner.title,
    org: partner.org,
    city: partner.city,
    country: partner.country,
    region: partner.region,
    promo: "4A-INFO",
    domain: "Mobilité",
    duration: "1 semestre",
    startHint: "Sept. 2027",
    url: partner.formationUrl || partner.applyUrl || null,
    contact: partner.contact || null,
    tags: partner.tags,
    applyBy: partner.applyBy,
    createdById: null,
    description:
      partner.description +
      (partner.applyUrl ? `\n\nCandidature partenaire : ${partner.applyUrl}` : "") +
      (partner.capacity != null ? `\n\nPlaces : ${partner.capacity}` : ""),
  }));

  const stageData = INTERNSHIP_OFFERS.map((offer) => ({
    type: "STAGE" as const,
    title: offer.title,
    org: offer.org,
    city: offer.city,
    country: offer.country,
    region: offer.region,
    promo: "4A-INFO",
    domain: offer.domain,
    duration: offer.duration,
    startHint: offer.startHint,
    url: offer.url || null,
    contact: offer.contact || null,
    tags: `${offer.tags}, anglophone`,
    applyBy: offer.applyBy,
    createdById: null,
    description: offer.description,
  }));

  await prisma.opportunity.createMany({ data: [...exchangeData, ...stageData] });
}

async function main() {
  await prisma.classConfig.upsert({
    where: { id: "default" },
    update: { name: "4A-INFO", inviteCode: "4A-INFO" },
    create: {
      id: "default",
      name: "4A-INFO",
      inviteCode: process.env.INVITE_CODE ?? "4A-INFO",
    },
  });

  if ((await prisma.checklistItem.count()) === 0) {
    await prisma.checklistItem.createMany({
      data: [
        ...STAGE_ITEMS.map((item, index) => ({ kind: "STAGE", sortOrder: index, ...item })),
        ...ECHANGE_ITEMS.map((item, index) => ({ kind: "ECHANGE", sortOrder: index, ...item })),
      ],
    });
  }

  await removeFakeUsers();
  await syncCatalogOffers();

  console.log("Seed OK — catalogue mobilité + stages anglophones");
  console.log("Code promo : 4A-INFO");
  console.log("Aucun compte démo : crée le tien via /inscription");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

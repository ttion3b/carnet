type InternshipSeed = {
  title: string;
  org: string;
  city: string;
  country: string;
  region: string;
  domain: string;
  tags: string;
  url: string;
  contact: string;
  applyBy: Date | null;
  duration: string;
  startHint: string;
  description: string;
};

export const INTERNSHIP_OFFERS: InternshipSeed[] = [
  // ——— Portails & listes ———
  {
    title: "Liste — Tech internships Singapore 2026",
    org: "GitHub · didtheyghostme/Singapore-Summer2026-TechInternships",
    city: "Singapour",
    country: "Singapour",
    region: "ASIE",
    domain: "Portails & listes",
    tags: "GL, DATA, CSEC, anglais, liste",
    url: "https://github.com/didtheyghostme/Singapore-Summer2026-TechInternships",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "2026",
    description: `Liste communautaire mise à jour des stages tech à Singapour (software, data, cyber). Utile pour repérer les entreprises qui recrutent en anglais : DBS, Google, Agoda, Moloco, Dell, EY, etc.

Chaque ligne renvoie vers la page carrière officielle de l'entreprise.`,
  },
  {
    title: "Liste — Summer internships US & Canada 2026",
    org: "GitHub · pittcsc/Summer2026-Internships",
    city: "—",
    country: "États-Unis / Canada",
    region: "AMERIQUE",
    domain: "Portails & listes",
    tags: "GL, DATA, CSEC, anglais, liste",
    url: "https://github.com/pittcsc/Summer2026-Internships",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "Été 2026",
    description: `Répertoire public des offres de stage tech aux États-Unis et au Canada (SWE, data, parfois cyber). Les liens pointent vers les pages carrières officielles.`,
  },
  {
    title: "Portail — MyNext Talent (Malaisie)",
    org: "TalentCorp Malaysia",
    city: "—",
    country: "Malaisie",
    region: "ASIE",
    domain: "Portails & listes",
    tags: "IT, anglais, portail",
    url: "https://www.mynext.my/talent",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "2026",
    description: `Plateforme officielle TalentCorp pour stages structurés et rémunérés en Malaisie. Filtres par filière informatique, finance, ingénierie. Plusieurs offres en anglais.`,
  },
  {
    title: "Portail — Max Planck CIS Research Internships",
    org: "Max Planck Institutes (Informatik, SWS, Security & Privacy)",
    city: "Saarbrücken / Bochum / Kaiserslautern",
    country: "Allemagne",
    region: "EUROPE",
    domain: "Portails & listes",
    tags: "recherche, GL, CSEC, anglais",
    url: "https://www.cis.mpg.de/internships/",
    contact: "",
    applyBy: null,
    duration: "3–6 mois",
    startHint: "Rolling",
    description: `Stages de recherche en informatique dans des instituts Max Planck (Saarbrücken, Bochum, Kaiserslautern). Environnement 100 % anglais, pas d'allemand requis.

Candidature en ligne : https://apply.cis.mpg.de/register/internship
Pièces : CV, relevés de notes, au moins une référence, lettre de motivation optionnelle.`,
  },

  // ——— Génie logiciel ———
  {
    title: "Intern — Software Engineering & AI-Assisted Development",
    org: "TeamViewer",
    city: "Göppingen",
    country: "Allemagne",
    region: "EUROPE",
    domain: "Génie logiciel",
    tags: "Java, TypeScript, GL, anglais",
    url: "https://careers.teamviewer.com/jobs/8054939-intern-software-engineering-ai-assisted-development",
    contact: "",
    applyBy: null,
    duration: "6 mois",
    startHint: "2026",
    description: `Stage obligatoire (convention universitaire requise). Équipe R&D, produits utilisés mondialement.

Technos : Java, Kotlin, JavaScript, TypeScript, C++, C#, SQL, Git.
Anglais fluent requis. Allemand non obligatoire.
Rémunération indicatrice : ~1 400 €/mois temps plein.`,
  },
  {
    title: "Tech Cooperative Internship — Software Engineer Backend",
    org: "Agoda",
    city: "Singapour",
    country: "Singapour",
    region: "ASIE",
    domain: "Génie logiciel",
    tags: "Java, Python, backend, anglais",
    url: "https://careers.agoda.com/jobs/",
    contact: "",
    applyBy: null,
    duration: "4–6 mois",
    startHint: "Jan–Mai ou Août–Déc 2026",
    description: `Programme coopératif tech à Singapour. Missions backend / outils internes, environnement de production.

Profil : Java, Scala, Kotlin, Python ou JavaScript · SQL · anglais écrit et oral.
Périodes : janvier–mai ou août–décembre, idéalement temps plein.`,
  },
  {
    title: "Internship Q4 — Fullstack Engineer",
    org: "Bosch Group",
    city: "Ho Chi Minh-Ville",
    country: "Vietnam",
    region: "ASIE",
    domain: "Génie logiciel",
    tags: "Java, React, Node, anglais",
    url: "https://www.bosch.com/careers/",
    contact: "",
    applyBy: new Date("2026-09-10"),
    duration: "Oct 2026 – Mar 2027",
    startHint: "Oct. 2026",
    description: `Stage full-stack (Java / Node / Python / Django / React / .NET) à HCMC ou Hanoi.

Période candidature : 1 août – 10 sept. 2026.
Modèle : temps plein ou min. 4 jours/semaine.
Anglais requis. Lettre de recommandation universitaire souvent exigée pour les étudiants vietnamiens.`,
  },
  {
    title: "Full-Stack Software Engineer Intern 2026",
    org: "atWare Vietnam",
    city: "Ho Chi Minh-Ville",
    country: "Vietnam",
    region: "ASIE",
    domain: "Génie logiciel",
    tags: "full-stack, anglais, Agile",
    url: "https://atware.asia/careers/full-stack-software-engineer-intern-2026/",
    contact: "",
    applyBy: new Date("2026-04-15"),
    duration: "2 mois",
    startHint: "Juin 2026",
    description: `Stage été full-stack, mentorat, méthode Agile. Anglais fluent (oral & écrit).

Allowance : 8 000 000 VND/mois. Lieu : WeWork E. Town Central, HCMC.
Deadline : 15 avril 2026.`,
  },
  {
    title: "StarCamp 2026 — Technology Bootcamp (internship path)",
    org: "NAB Innovation Centre Vietnam",
    city: "Ho Chi Minh-Ville / Hanoi",
    country: "Vietnam",
    region: "ASIE",
    domain: "Génie logiciel",
    tags: "Java, JavaScript, full-stack, anglais",
    url: "https://nab.wd3.myworkdayjobs.com/en-US/nab_careers?q=StarCamp",
    contact: "",
    applyBy: null,
    duration: "12 semaines",
    startHint: "Avr.–Mai 2026",
    description: `Bootcamp tech rémunéré (allowance jusqu'à 11,5 M VND/mois) pour la filière software à HCMC ou Hanoi. Projets réels pour National Australia Bank.

Parcours : full-stack JavaScript ou backend Java. Anglais et soft skills inclus.
Candidature : portail Workday NAB (rechercher « StarCamp »).`,
  },
  {
    title: "Internship OneConnect — projets IT réels",
    org: "Rikkei Education",
    city: "—",
    country: "Vietnam",
    region: "ASIE",
    domain: "Génie logiciel",
    tags: "projets, mentorat, anglais",
    url: "https://ioc.rikkei.edu.vn/",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "Sessions régulières",
    description: `Programme vietnamien de stages pratiques sur projets réels, mentorat tech, portfolio et préparation entretiens. Complément utile avant un stage en entreprise.`,
  },

  // ——— Data & IA ———
  {
    title: "Intern Consultant — Data Science and AI",
    org: "Munich Re",
    city: "Munich",
    country: "Allemagne",
    region: "EUROPE",
    domain: "Data & IA",
    tags: "ML, IA, data, anglais",
    url: "https://careers.munichre.com/en/job/munchen/intern-consultant-data-science-and-ai-m-f-d/3342/34823833792",
    contact: "",
    applyBy: null,
    duration: "Min. 3 mois",
    startHint: "2026",
    description: `Stage data science / IA au hub DAA1 de Munich Re (réassurance). Missions sur projets ML en contexte métier.

Profil : master ou dernière année licence en CS, data science, maths, stats. Anglais professionnel. Sur site à Munich (télétravail limité).
Permis de travail UE requis pour les non-UE.`,
  },
  {
    title: "2026 Singapore Software Engineering Internship",
    org: "The Trade Desk",
    city: "Singapour",
    country: "Singapour",
    region: "ASIE",
    domain: "Data & IA",
    tags: "data, engineering, anglais",
    url: "https://careers.thetradedesk.com/",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "2026",
    description: `Stage software/data engineering à Singapour (AdTech). Voir aussi la liste GitHub Singapore 2026 pour le lien direct quand la offre est ouverte.`,
  },

  // ——— Cybersécurité ———
  {
    title: "Cyber Security Engineer Internship",
    org: "Trend Micro",
    city: "Cork",
    country: "Irlande",
    region: "EUROPE",
    domain: "Cybersécurité",
    tags: "SOC, Python, réseaux, anglais",
    url: "https://youllgetit.eu/internships/28b1841c-fbee-5843-be60-d69d569657df/cyber-security-engineer-internship-at-trend-micro-cork",
    contact: "",
    applyBy: null,
    duration: "8 mois",
    startHint: "2026",
    description: `Stage rémunéré 8 mois au Cyber Defence Team (Cork). Logs, incidents, automatisation Python/PowerShell, firewalls, Trend Micro Vision One.

Anglais requis. Fort taux de conversion vers CDI (82 % des interns ces 5 dernières années).`,
  },
  {
    title: "Young Researcher Internship Program",
    org: "CISPA Helmholtz Center",
    city: "Saarbrücken",
    country: "Allemagne",
    region: "EUROPE",
    domain: "Cybersécurité",
    tags: "recherche, crypto, ML, anglais",
    url: "https://career.cispa.de/young-researcher-internship-program",
    contact: "",
    applyBy: null,
    duration: "~3 mois",
    startHint: "Rolling",
    description: `Stage de recherche en cybersécurité, ML, privacy, cryptographie. Campus proche de Sarrebruck, Luxembourg et Metz.

Anglais fluent. Allemand utile mais non requis. Statut étudiant obligatoire.`,
  },

  // ——— SEO-Vietnam & Malaisie IT ———
  {
    title: "SEO-Vietnam Summer Fellowship 2026",
    org: "SEO-Vietnam",
    city: "Ho Chi Minh-Ville",
    country: "Vietnam",
    region: "ASIE",
    domain: "Portails & listes",
    tags: "tech, finance, consulting, anglais",
    url: "https://www.seo-vietnamprogram.org/",
    contact: "",
    applyBy: null,
    duration: "Été 2026",
    startHint: "Été 2026",
    description: `Programme fellowship avec stages chez des entreprises partenaires à HCMC (tech, finance, conseil). Sélection sur dossier + entretiens. Résidence à HCMC pendant le programme.`,
  },

  // ——— Europe (Irlande, Suède, Luxembourg) ———
  {
    title: "Internships — Technology & Engineering",
    org: "Spotify",
    city: "Stockholm",
    country: "Suède",
    region: "EUROPE",
    domain: "Génie logiciel",
    tags: "GL, mobile, backend, anglais",
    url: "https://lifeatspotify.com/jobs?category=internships",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "Rolling",
    description: `Stages tech à Stockholm (et autres bureaux). Environnement de travail en anglais. Voir la page carrières Spotify « Internships » pour les postes ouverts (backend, mobile, data platform, etc.).`,
  },
  {
    title: "Internships — Software & Data",
    org: "Shopify",
    city: "—",
    country: "Canada",
    region: "AMERIQUE",
    domain: "Génie logiciel",
    tags: "GL, Ruby, anglais, remote/hybrid",
    url: "https://www.shopify.com/careers/internships",
    contact: "",
    applyBy: null,
    duration: "4–8 mois",
    startHint: "2026",
    description: `Programme de stages Shopify (bureaux Canada, souvent Ottawa/Toronto/remote). Missions dev produit, infrastructure, data. Candidature en anglais sur le portail carrières.`,
  },
  {
    title: "Portail — Jobs.lu (Luxembourg IT)",
    org: "Jobs.lu",
    city: "Luxembourg",
    country: "Luxembourg",
    region: "EUROPE",
    domain: "Portails & listes",
    tags: "IT, finance, anglais, portail",
    url: "https://www.jobs.lu/en/jobs/internship",
    contact: "",
    applyBy: null,
    duration: "Variable",
    startHint: "Rolling",
    description: `Portail luxembourgeois pour stages et alternances. Filtre « internship » + secteur IT/finance. Beaucoup d'offres en anglais (Amazon, Big Four, fintech, EU institutions contractors).`,
  },
];

type PartnerSeed = {
  title: string;
  org: string;
  city: string;
  country: string;
  region: string;
  tags: string;
  formationUrl: string;
  applyUrl?: string;
  contact: string;
  applyBy: Date | null;
  capacity: number | null;
  description: string;
};

export const MOBILITY_PARTNERS: PartnerSeed[] = [
  {
    title: "Semestre — Télécom Nancy",
    org: "Télécom Nancy (Université de Lorraine)",
    city: "Nancy",
    country: "France",
    region: "FRANCE",
    tags: "GL, CSEC, DATA, BI, SE",
    capacity: 5,
    formationUrl: "https://telecomnancy.univ-lorraine.fr/formation/approfondissements/",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire ESIROI-IT · vœux mobilité / double diplôme · 5 places.

Approfondissements disponibles :
• GL — Génie logiciel
• CSEC — Cyber-sécurité
• DATA — Analyse de données et données massives
• BI — Business intelligence
• SE — Systèmes embarqués

Formation & approfondissements : https://telecomnancy.univ-lorraine.fr/formation/approfondissements/
Maquette pédagogique 2024 disponible sur le site partenaire.

Dossier après validation ESIROI : contacter le service RI pour les dates internes.`,
  },
  {
    title: "Semestre — Télécom Saint-Étienne",
    org: "Télécom Saint-Étienne",
    city: "Saint-Étienne",
    country: "France",
    region: "FRANCE",
    tags: "RT, DATA, VR, SE",
    capacity: 5,
    formationUrl: "https://www.telecom-st-etienne.fr/wp-content/uploads/2021/04/plaquette-inge-site2122.pdf",
    contact: "Stéphane Robert · stephane.robert@univ-st-etienne.fr · 04 77 91 58 63",
    applyBy: new Date("2026-05-05"),
    description: `Partenaire ESIROI-IT · 5 places.

Approfondissements : RT (Réseaux & Télécom), DATA, VR (Réalité virtuelle), SE (Systèmes embarqués).

Deadlines partenaire :
• Cyber-sécurité : février
• Génie logiciel : 5 mai

Plaquette formation : https://www.telecom-st-etienne.fr/wp-content/uploads/2021/04/plaquette-inge-site2122.pdf

Contact coordinateur double diplôme : Stéphane Robert (Directeur des Études FISE, coordinateur DD).`,
  },
  {
    title: "Semestre — INSA Lyon (Télécom & Services)",
    org: "INSA Lyon — département Télécom & Services",
    city: "Villeurbanne",
    country: "France",
    region: "FRANCE",
    tags: "RT",
    capacity: 5,
    formationUrl: "https://telecom.insa-lyon.fr/fr/content/presentation-generale-de-formation",
    applyUrl: "https://www.insa-lyon.fr/fr/admission-en-echange",
    contact: "Tanguy Risset · Tanguy.Risset@insa-lyon.fr · Oana Iova · oana-teodora.iova@insa-lyon.fr",
    applyBy: new Date("2026-03-31"),
    description: `Partenaire ESIROI-IT · 5 places · approfondissement RT (Réseaux & Télécom).

Présentation de la formation : https://telecom.insa-lyon.fr/fr/content/presentation-generale-de-formation
Candidature après validation ESIROI : https://www.insa-lyon.fr/fr/admission-en-echange

Deadline partenaire : mars.

Contacts :
• Tanguy Risset — Tanguy.Risset@insa-lyon.fr · +33 4 72 43 64 86
• Oana Iova — oana-teodora.iova@insa-lyon.fr · 06 87 99 59 97`,
  },
  {
    title: "Semestre — INSA Hauts-de-France",
    org: "INSA Hauts-de-France",
    city: "Valenciennes",
    country: "France",
    region: "FRANCE",
    tags: "CSEC, SE",
    capacity: 0,
    formationUrl: "https://www.insa-hautsdefrance.fr/formation/ingenieurs-integrez-linsa-hdf",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire listé sur la plaquette ESIROI-IT · capacité 0 place indiquée (à confirmer avec la RI).

Approfondissements : CSEC (Cyber-sécurité), SE (Systèmes embarqués).

Formation : https://www.insa-hautsdefrance.fr/formation/ingenieurs-integrez-linsa-hdf`,
  },
  {
    title: "Semestre — Polytech Nice",
    org: "Polytech Nice (Université Côte d'Azur)",
    city: "Nice",
    country: "France",
    region: "FRANCE",
    tags: "IoT, GL, CSEC, DATA, IHM",
    capacity: 5,
    formationUrl: "https://polytech.univ-cotedazur.fr/formations/formations-ingenieurs/ingenieur-informatique",
    contact: "Jean-Yves Tigli · jean-yves.tigli@univ-cotedazur.fr · Lorenzini Philippe · lorenz@polytech.unice.fr · Igor Litovsky · Igor.LITOVSKY@univ-cotedazur.fr",
    applyBy: new Date("2026-03-31"),
    description: `Partenaire ESIROI-IT · 5 places.

Approfondissements : IoT, GL, CSEC, DATA, IHM (Interaction Homme-Machine).

Programme ingénieur informatique : https://polytech.univ-cotedazur.fr/formations/formations-ingenieurs/ingenieur-informatique

Deadline partenaire : mars.`,
  },
  {
    title: "Semestre — Polytech Montpellier",
    org: "Polytech Montpellier",
    city: "Montpellier",
    country: "France",
    region: "FRANCE",
    tags: "IGEST",
    capacity: 5,
    formationUrl: "https://www.polytech.umontpellier.fr/images/formation/ig/Livret_de_l%C3%A9tudiant_IG_2023-24_v1.pdf",
    contact: "Catherine Faur · catherine.faur@umontpellier.fr",
    applyBy: null,
    description: `Partenaire ESIROI-IT · 5 places · approfondissement IGEST (Informatique de gestion).

Livret étudiant (maquette) : https://www.polytech.umontpellier.fr/images/formation/ig/Livret_de_l%C3%A9tudiant_IG_2023-24_v1.pdf

Contact : Catherine Faur — catherine.faur@umontpellier.fr`,
  },
  {
    title: "Semestre — Polytech Nantes",
    org: "Polytech Nantes",
    city: "Nantes",
    country: "France",
    region: "FRANCE",
    tags: "IHM, AAD, RT, CSEC, SYST",
    capacity: 5,
    formationUrl: "https://polytech.univ-nantes.fr/medias/fichier/maquette-info-2023-fr_1701332461377-pdf",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire ESIROI-IT · 5 places.

Approfondissements : IHM, AAD (Aide à la décision), RT, CSEC, SYST (Administration système).

Maquette informatique : https://polytech.univ-nantes.fr/medias/fichier/maquette-info-2023-fr_1701332461377-pdf`,
  },
  {
    title: "Semestre — SRH Berlin",
    org: "SRH Berlin University of Applied Sciences",
    city: "Berlin",
    country: "Allemagne",
    region: "EUROPE",
    tags: "CSEC, DATA",
    capacity: 1,
    formationUrl: "https://www.srh-berlin.de/en/master/",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire ESIROI-IT · 1 place · cursus en anglais.

Approfondissements : CSEC (Cyber-sécurité), DATA (Analyse de données).

Programmes master : https://www.srh-berlin.de/en/master/

Anticiper logement et niveau d'anglais.`,
  },
  {
    title: "Semestre — ETS Montréal",
    org: "École de technologie supérieure (ÉTS)",
    city: "Montréal",
    country: "Canada",
    region: "AMERIQUE",
    tags: "GL, CSEC, DATA, BI, RT, JV",
    capacity: 1,
    formationUrl: "https://www.etsmtl.ca/ets/gouvernance/decanats-et-departements/departement-genie-logiciel-ti",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire ESIROI-IT · 1 place.

Approfondissements : GL, CSEC, DATA, BI, RT, JV (Jeux vidéo).

Département génie logiciel & TI : https://www.etsmtl.ca/ets/gouvernance/decanats-et-departements/departement-genie-logiciel-ti

Prévoir visa, preuve de fonds, logement et niveau d'anglais/français selon les UE choisies.`,
  },
  {
    title: "Semestre — Stellenbosch University",
    org: "Stellenbosch University",
    city: "Stellenbosch",
    country: "Afrique du Sud",
    region: "AFRIQUE",
    tags: "à confirmer RI",
    capacity: null,
    formationUrl: "https://www.sun.ac.za/english/international",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire listé sur la plaquette ESIROI-IT (SU Stellenbosch) — capacité et approfondissements à confirmer avec la RI.

Bureau international : https://www.sun.ac.za/english/international`,
  },
  {
    title: "Semestre — MIT (Inde)",
    org: "MIT — Inde (établissement à confirmer)",
    city: "Inde",
    country: "Inde",
    region: "ASIE",
    tags: "à confirmer RI",
    capacity: null,
    formationUrl: "",
    contact: "Service relations internationales ESIROI",
    applyBy: null,
    description: `Partenaire listé sur la plaquette ESIROI-IT — établissement exact, capacité et approfondissements à confirmer avec le service relations internationales ESIROI avant de candidater.`,
  },
];

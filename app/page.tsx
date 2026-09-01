import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";

const FEATURES = [
  {
    number: "01",
    title: "Offres en commun",
    body: "Échanges par région, stages par domaine. Tout le monde voit la même base.",
    image: "/carnet-offres-compass.png",
  },
  {
    number: "02",
    title: "Suivi perso",
    body: "Tes candidatures, relances et notes — personne ne fouille dans ton dossier.",
    image: "/carnet-suivi-ledger.png",
  },
  {
    number: "03",
    title: "Formalités",
    body: "Checklists mobilité avant / pendant / après. Pour ne pas oublier le visa.",
    image: "/carnet-formalites-stamp.png",
  },
] as const;

export default async function LandingPage() {
  const user = await getUser();
  if (user) redirect("/accueil");

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#fff8ef]">
      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-lagoon/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[28rem] rounded-full bg-saffron/20 blur-3xl" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo href="/" subtitle="4A-INFO" size="lg" />
        <div className="flex items-center gap-2">
          <Link href="/connexion" className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-ink">
            Connexion
          </Link>
          <Link
            href="/inscription"
            className="rounded-full bg-lagoon px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-lagoon-ink"
          >
            Rejoindre
          </Link>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-6 lg:grid-cols-2 lg:pt-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-saffron-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron">
            Promo info · mobilité & stages
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
            Le carnet de voyage de la 4A-INFO.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted">
            Offres partagées, suivi perso, formalités sans prise de tête. Moins dashboard LinkedIn, plus
            groupe de promo qui s&apos;organise avant de partir à Berlin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/inscription"
              className="inline-flex min-h-12 items-center rounded-full bg-lagoon px-6 text-sm font-semibold text-white shadow-lg shadow-lagoon/25 hover:bg-lagoon-ink"
            >
              Créer mon compte
            </Link>
            <Link
              href="/connexion"
              className="inline-flex min-h-12 items-center rounded-full border-2 border-ink/15 bg-paper px-6 text-sm font-semibold hover:bg-white"
            >
              J&apos;ai déjà un compte
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">
            Code promo : <span className="font-bold text-ink">4A-INFO</span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rotate-2 overflow-hidden rounded-[2rem] border-4 border-ink/10 bg-paper shadow-[12px_16px_0_#1a2b3d18]">
            <Image
              src="/carnet-auth-hero.png"
              alt="Illustration carnet de mobilité"
              width={560}
              height={720}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -left-2 top-10 -rotate-6 rounded-xl bg-lagoon px-3 py-2 text-xs font-bold text-white shadow-lg">
            11 écoles partenaires
          </div>
          <div className="absolute -right-2 bottom-16 rotate-3 rounded-xl bg-saffron px-3 py-2 text-xs font-bold text-white shadow-lg">
            stages anglophones
          </div>
        </div>
      </main>

      <section className="relative mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3">
        {FEATURES.map(({ number, title, body, image }) => (
          <div
            key={number}
            className="rounded-[1.5rem] border-2 border-ink/8 bg-paper/80 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-ink/6">
              <Image src={image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
            </div>
            <span className="font-display text-2xl italic text-saffron">{number}</span>
            <h2 className="font-display mt-3 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-ink/10 py-6 text-center text-xs text-muted">
        Carnet — outil promo 4A-INFO · Campus de Terre-Sainte
      </footer>
    </div>
  );
}

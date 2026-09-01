import { AuthLink, AuthScene, LoginForm } from "@/components/auth-scene";

export const metadata = { title: "Connexion" };

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <AuthScene
      mode="login"
      footer={
        <>
          Pas encore de compte ? <AuthLink href="/inscription">Rejoindre la promo</AuthLink>
        </>
      }
    >
      <h1 className="font-display text-3xl font-semibold tracking-tight">Re-bienvenue</h1>
      <p className="mt-2 text-sm text-muted">Ton carnet t&apos;attend. Pas de compte démo — le tien.</p>
      <div className="mt-8">
        <LoginForm next={next} />
      </div>
    </AuthScene>
  );
}

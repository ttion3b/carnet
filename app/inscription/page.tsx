import { AuthLink, AuthScene, RegisterWizard } from "@/components/auth-scene";

export const metadata = { title: "Inscription" };

export default function InscriptionPage() {
  return (
    <AuthScene
      mode="register"
      footer={
        <>
          Déjà inscrit ? <AuthLink href="/connexion">Connexion</AuthLink>
        </>
      }
    >
      <p className="text-xs font-bold uppercase tracking-widest text-lagoon">Étape par étape</p>
      <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">Rejoindre Carnet</h1>
      <p className="mt-2 text-sm text-muted">2 minutes. Pas de spam. Juste la promo info.</p>
      <div className="mt-8">
        <RegisterWizard />
      </div>
    </AuthScene>
  );
}

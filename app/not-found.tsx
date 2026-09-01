import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-5 text-center">
      <Logo href="/accueil" subtitle="4A-INFO" />
      <p className="text-sm font-medium text-muted">Page introuvable</p>
      <Link href="/accueil" className="text-lagoon-ink hover:underline">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}

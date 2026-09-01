"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useActionState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { loginAction, registerAction, type AuthState } from "@/lib/actions/auth";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

function useAuthRedirect(state: AuthState) {
  const router = useRouter();
  useEffect(() => {
    if (state?.ok) {
      router.replace(state.next ?? "/accueil");
      router.refresh();
    }
  }, [state, router]);
}

function AuthField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border-2 border-line bg-paper px-4 py-3 text-sm transition-colors placeholder:text-muted/70 focus:border-lagoon focus:outline-none focus:ring-4 focus:ring-lagoon/15";

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 rounded-full transition-all",
            i === step ? "w-8 bg-lagoon" : i < step ? "w-2 bg-lagoon/50" : "w-2 bg-line",
          )}
        />
      ))}
    </div>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, null);
  useAuthRedirect(state);

  return (
    <form action={action} className="flex flex-col gap-5">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <AuthField label="Email">
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="prenom.nom@…"
          className={inputClass}
        />
      </AuthField>
      <AuthField label="Mot de passe">
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </AuthField>
      {state?.error ? (
        <p className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-lagoon px-5 text-sm font-semibold text-white transition hover:bg-lagoon-ink disabled:opacity-60"
      >
        {pending ? "On t'ouvre la porte…" : "C'est parti"}
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

export function RegisterWizard() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    invite: "4A-INFO",
  });
  const [state, action, pending] = useActionState(registerAction, null);
  useAuthRedirect(state);

  const steps = [
    { title: "C'est qui ?", subtitle: "Ton prénom suffit — pas besoin de CV ici." },
    { title: "Ton coin secret", subtitle: "Email + mot de passe. Personne d'autre ne voit tes candidatures." },
    { title: "Mot de passe promo", subtitle: "Le code que tout le monde a en amphi. Spoiler : 4A-INFO." },
  ];

  function nextStep() {
    if (step === 0 && values.name.trim().length < 2) return;
    if (step === 1 && (values.email.length < 3 || values.password.length < 6)) return;
    setStep((s) => s + 1);
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      <input type="hidden" name="name" value={values.name} />
      <input type="hidden" name="email" value={values.email} />
      <input type="hidden" name="password" value={values.password} />
      <input type="hidden" name="invite" value={values.invite} />
      <div className="flex items-center justify-between gap-4">
        <StepDots step={step} total={steps.length} />
        <span className="text-xs font-medium text-muted">
          {step + 1}/{steps.length}
        </span>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{steps[step].title}</h2>
        <p className="mt-1 text-sm text-muted">{steps[step].subtitle}</p>
      </div>

      <div className="min-h-[9rem]">
        {step === 0 ? (
          <AuthField label="Prénom et nom">
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              autoComplete="name"
              placeholder="Ex. Alex Dupont"
              className={inputClass}
            />
          </AuthField>
        ) : null}

        {step === 1 ? (
          <div className="flex flex-col gap-4">
            <AuthField label="Email">
              <input
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                autoComplete="email"
                placeholder="ton.email@…"
                className={inputClass}
              />
            </AuthField>
            <AuthField label="Mot de passe" hint="6 caractères min — pas « password123 » quand même">
              <input
                type="password"
                value={values.password}
                onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
                autoComplete="new-password"
                minLength={6}
                className={inputClass}
              />
            </AuthField>
          </div>
        ) : null}

        {step === 2 ? (
          <AuthField label="Code promo" hint="Même code pour toute la promo info">
            <input
              value={values.invite}
              onChange={(e) => setValues((v) => ({ ...v, invite: e.target.value }))}
              placeholder="4A-INFO"
              className={cn(inputClass, "uppercase tracking-widest")}
            />
          </AuthField>
        ) : null}
      </div>

      {state?.error ? (
        <p className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose">{state.error}</p>
      ) : null}

      <div className="flex gap-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-line bg-paper text-sm font-semibold hover:border-lagoon"
          >
            <ArrowLeft className="size-4" />
            Retour
          </button>
        ) : null}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={
              (step === 0 && values.name.trim().length < 2) ||
              (step === 1 && (values.email.length < 3 || values.password.length < 6))
            }
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-lagoon text-sm font-semibold text-white hover:bg-lagoon-ink"
          >
            Suivant
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending || values.invite.trim().length < 1}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-saffron text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
          >
            {pending ? "Création…" : "Rejoindre la promo"}
            <Sparkles className="size-4" />
          </button>
        )}
      </div>
    </form>
  );
}

export function AuthScene({
  mode,
  children,
  footer,
}: {
  mode: "login" | "register";
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const lines =
    mode === "register"
      ? [
          "Un compte par personne.",
          "Les offres en commun.",
          "Tes relances en privé.",
          "Comme un carnet de voyage — sauf que c'est Berlin, pas Cilaos.",
        ]
      : [
          "Reprends où tu en étais.",
          "Relances, entretiens, vœux mobilité.",
          "Sans mélanger avec le groupe WhatsApp.",
        ];

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg">
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-lagoon/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 size-80 rounded-full bg-saffron/15 blur-3xl" />
      <div className="relative mx-auto grid min-h-dvh max-w-6xl lg:grid-cols-[1fr_420px]">
        <aside className="hidden flex-col justify-between p-10 lg:flex">
          <Logo href="/" subtitle="4A-INFO" size="lg" />
          <div className="relative mx-auto w-full max-w-md">
            <div className="rotate-[-3deg] overflow-hidden rounded-[2rem] border-4 border-ink/10 bg-paper shadow-[8px_12px_0_#1a2b3d15]">
              <Image
                src="/carnet-auth-hero.png"
                alt=""
                width={480}
                height={640}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
          <ul className="space-y-2 text-sm leading-6 text-muted">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>

        <main className="flex flex-col justify-center px-5 py-10 sm:px-8">
          <div className="mb-6 lg:hidden">
            <Logo href="/" subtitle="4A-INFO" />
            <div className="mx-auto mt-6 w-full max-w-xs overflow-hidden rounded-[2rem] border-4 border-ink/10 bg-paper shadow-[8px_12px_0_#1a2b3d15] rotate-[2deg]">
              <Image
                src="/carnet-auth-hero.png"
                alt=""
                width={360}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="rounded-[2rem] border-2 border-ink/10 bg-paper/90 p-6 shadow-[0_20px_60px_-30px_#1a2b3d40] backdrop-blur-sm sm:p-8">
            {children}
          </div>
          <div className="mt-6 text-center text-sm text-muted">{footer}</div>
        </main>
      </div>
    </div>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-lagoon-ink underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

"use server";

import { hash, compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Indique ton prénom et nom"),
  email: z.string().trim().email("Email invalide").transform((v) => v.toLowerCase()),
  password: z.string().min(6, "Mot de passe : 6 caractères minimum"),
  invite: z.string().trim().min(1, "Code promo requis"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Email invalide").transform((v) => v.toLowerCase()),
  password: z.string().min(1, "Mot de passe requis"),
});

export type AuthState = { error?: string; ok?: true; next?: string } | null;

function firstIssue(error: z.ZodError) {
  return error.issues[0]?.message ?? "Données invalides";
}

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "/accueil");
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  return "/accueil";
}

export async function registerAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    invite: formData.get("invite"),
  });
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  const config = await prisma.classConfig.findUnique({ where: { id: "default" } });
  const expected = config?.inviteCode ?? process.env.INVITE_CODE ?? "4A-INFO";
  if (parsed.data.invite.toUpperCase() !== expected.toUpperCase()) {
    return { error: "Code promo incorrect. Demande-le à un camarade." };
  }

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return { error: "Un compte existe déjà avec cet email." };

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hash(parsed.data.password, 10),
      promo: config?.name ?? "4A-INFO",
    },
  });

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  return { ok: true, next: safeNext(formData.get("next")) };
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await compare(parsed.data.password, user.passwordHash))) {
    return { error: "Email ou mot de passe incorrect." };
  }

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  return { ok: true, next: safeNext(formData.get("next")) };
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/connexion");
}

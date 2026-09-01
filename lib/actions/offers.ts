"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

const offerSchema = z.object({
  type: z.enum(["STAGE", "ECHANGE"]),
  title: z.string().trim().min(3, "Titre trop court"),
  org: z.string().trim().min(2, "Organisation requise"),
  city: z.string().trim().optional(),
  country: z.string().trim().min(2).default("France"),
  region: z.string().trim().min(2).default("FRANCE"),
  domain: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  startHint: z.string().trim().optional(),
  url: z.string().trim().optional(),
  contact: z.string().trim().optional(),
  description: z.string().trim().min(10, "Ajoute une description utile"),
  tags: z.string().trim().optional(),
  applyBy: z.string().optional(),
});

function parseOffer(formData: FormData) {
  return offerSchema.safeParse({
    type: formData.get("type"),
    title: formData.get("title"),
    org: formData.get("org"),
    city: formData.get("city") || undefined,
    country: formData.get("country") || "France",
    region: formData.get("region") || "FRANCE",
    domain: formData.get("domain") || undefined,
    duration: formData.get("duration") || undefined,
    startHint: formData.get("startHint") || undefined,
    url: formData.get("url") || undefined,
    contact: formData.get("contact") || undefined,
    description: formData.get("description"),
    tags: formData.get("tags") || undefined,
    applyBy: formData.get("applyBy") || undefined,
  });
}

export async function createOfferAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const user = await requireUser();
  const parsed = parseOffer(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire incomplet" };
  }

  const offer = await prisma.opportunity.create({
    data: {
      ...parsed.data,
      city: parsed.data.city || null,
      applyBy: parsed.data.applyBy ? new Date(parsed.data.applyBy) : null,
      promo: user.promo,
      createdById: user.id,
    },
  });

  if (parsed.data.applyBy) {
    await prisma.deadline.create({
      data: {
        title: `Candidater : ${parsed.data.title}`,
        date: new Date(parsed.data.applyBy),
        kind: "OFFRE",
        scope: "CLASSE",
        opportunityId: offer.id,
        createdById: user.id,
      },
    });
  }

  redirect(`/offres/${offer.id}`);
}

export async function updateOfferAction(id: string, formData: FormData) {
  const user = await requireUser();
  const offer = await prisma.opportunity.findUnique({ where: { id } });
  if (!offer || !offer.createdById || offer.createdById !== user.id) {
    return { error: "Tu ne peux modifier que les offres que tu as ajoutées." };
  }
  const parsed = parseOffer(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire incomplet" };
  }

  await prisma.opportunity.update({
    where: { id },
    data: {
      ...parsed.data,
      city: parsed.data.city || null,
      applyBy: parsed.data.applyBy ? new Date(parsed.data.applyBy) : null,
    },
  });

  revalidatePath(`/offres/${id}`);
  revalidatePath("/offres");
  redirect(`/offres/${id}`);
}

export async function addCommentAction(opportunityId: string, formData: FormData) {
  const user = await requireUser();
  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 2) return { error: "Écris au moins quelques mots." };
  if (body.length > 500) return { error: "500 caractères maximum." };
  await prisma.comment.create({
    data: { opportunityId, userId: user.id, body },
  });
  revalidatePath(`/offres/${opportunityId}`);
  return { ok: true };
}

export async function archiveOfferAction(id: string) {
  const user = await requireUser();
  const offer = await prisma.opportunity.findUnique({ where: { id } });
  if (!offer || !offer.createdById || offer.createdById !== user.id) return;
  await prisma.opportunity.update({
    where: { id },
    data: { archived: !offer.archived },
  });
  revalidatePath("/offres");
  revalidatePath(`/offres/${id}`);
}

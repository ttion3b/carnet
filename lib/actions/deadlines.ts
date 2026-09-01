"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createDeadlineAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const kind = String(formData.get("kind") ?? "PERSO");
  const scope = String(formData.get("scope") ?? "PERSO");
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const opportunityId = String(formData.get("opportunityId") ?? "") || null;

  if (title.length < 2 || !date) {
    return { error: "Titre et date sont requis." };
  }

  await prisma.deadline.create({
    data: {
      title,
      date: new Date(date),
      kind,
      scope: scope === "CLASSE" ? "CLASSE" : "PERSO",
      notes,
      opportunityId,
      createdById: user.id,
    },
  });

  revalidatePath("/calendrier");
  revalidatePath("/accueil");
  return { error: undefined };
}

export async function toggleDeadlineAction(id: string) {
  const user = await requireUser();
  const deadline = await prisma.deadline.findUnique({ where: { id } });
  if (!deadline) return;
  if (deadline.scope === "PERSO" && deadline.createdById !== user.id) return;

  await prisma.deadline.update({
    where: { id },
    data: { done: !deadline.done },
  });

  revalidatePath("/calendrier");
  revalidatePath("/accueil");
}

export async function deleteDeadlineAction(id: string) {
  const user = await requireUser();
  const deadline = await prisma.deadline.findUnique({ where: { id } });
  if (!deadline || deadline.createdById !== user.id) return;
  await prisma.deadline.delete({ where: { id } });
  revalidatePath("/calendrier");
  revalidatePath("/accueil");
}

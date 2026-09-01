"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function toggleChecklistAction(itemId: string) {
  const user = await requireUser();
  const existing = await prisma.checklistProgress.findUnique({
    where: { userId_itemId: { userId: user.id, itemId } },
  });

  if (!existing) {
    await prisma.checklistProgress.create({
      data: { userId: user.id, itemId, done: true, doneAt: new Date() },
    });
  } else {
    await prisma.checklistProgress.update({
      where: { id: existing.id },
      data: {
        done: !existing.done,
        doneAt: existing.done ? null : new Date(),
      },
    });
  }

  revalidatePath("/formalites");
  revalidatePath("/accueil");
}

export async function saveChecklistNoteAction(itemId: string, formData: FormData) {
  const user = await requireUser();
  const note = String(formData.get("note") ?? "").trim() || null;
  const dueDateRaw = String(formData.get("dueDate") ?? "");
  const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

  await prisma.checklistProgress.upsert({
    where: { userId_itemId: { userId: user.id, itemId } },
    create: { userId: user.id, itemId, note, dueDate },
    update: { note, dueDate },
  });

  revalidatePath("/formalites");
}

export async function updateProfileAction(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) return;
  await prisma.user.update({ where: { id: user.id }, data: { name } });
  revalidatePath("/parametres");
}

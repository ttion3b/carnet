"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { statusLabel } from "@/lib/constants";

export async function addToTrackAction(opportunityId: string) {
  const user = await requireUser();
  const existing = await prisma.track.findUnique({
    where: { userId_opportunityId: { userId: user.id, opportunityId } },
  });
  if (existing) {
    redirect(`/suivi/${existing.id}`);
  }

  const track = await prisma.track.create({
    data: {
      userId: user.id,
      opportunityId,
      status: "VEILLE",
      events: {
        create: {
          type: "NOTE",
          content: "Ajouté à mon suivi",
        },
      },
    },
  });

  revalidatePath("/suivi");
  revalidatePath(`/offres/${opportunityId}`);
  redirect(`/suivi/${track.id}`);
}

export async function updateTrackStatusAction(trackId: string, status: string) {
  const user = await requireUser();
  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track || track.userId !== user.id) return;
  if (track.status === status) return;

  await prisma.track.update({
    where: { id: trackId },
    data: {
      status,
      events: {
        create: {
          type: "NOTE",
          content: `Statut : ${statusLabel(status)}`,
        },
      },
    },
  });

  revalidatePath("/suivi");
  revalidatePath(`/suivi/${trackId}`);
  revalidatePath("/accueil");
}

export async function updateTrackMetaAction(trackId: string, formData: FormData) {
  const user = await requireUser();
  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track || track.userId !== user.id) return;

  await prisma.track.update({
    where: { id: trackId },
    data: {
      notes: String(formData.get("notes") ?? ""),
      priority: String(formData.get("priority") ?? "MOYEN"),
    },
  });

  revalidatePath(`/suivi/${trackId}`);
}

export async function addTrackEventAction(trackId: string, formData: FormData) {
  const user = await requireUser();
  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track || track.userId !== user.id) return;

  const type = String(formData.get("type") ?? "NOTE");
  const content = String(formData.get("content") ?? "").trim();
  const at = String(formData.get("at") ?? "");
  if (!content) return;

  const statusFromEvent: Record<string, string> = {
    CANDIDATURE: "ENVOYE",
    RELANCE: "ATTENTE",
    ENTRETIEN: "ENTRETIEN",
    PROPOSITION: "PROPOSITION",
    REFUS: "REFUSE",
  };

  await prisma.trackEvent.create({
    data: {
      trackId,
      type,
      content,
      at: at ? new Date(at) : new Date(),
    },
  });

  const nextStatus = statusFromEvent[type];
  if (nextStatus && track.status !== "ACCEPTE") {
    await prisma.track.update({
      where: { id: trackId },
      data: { status: nextStatus },
    });
  }

  revalidatePath(`/suivi/${trackId}`);
  revalidatePath("/suivi");
  revalidatePath("/accueil");
}

export async function removeTrackAction(trackId: string) {
  const user = await requireUser();
  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track || track.userId !== user.id) return;
  await prisma.track.delete({ where: { id: trackId } });
  revalidatePath("/suivi");
  redirect("/suivi");
}

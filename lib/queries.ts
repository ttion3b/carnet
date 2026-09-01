import { prisma } from "@/lib/db";

export function upcomingWhere(userId: string) {
  return {
    done: false,
    OR: [{ scope: "CLASSE" as const }, { createdById: userId, scope: "PERSO" as const }],
  };
}

export async function getUpcomingDeadlines(userId: string, take = 8) {
  return prisma.deadline.findMany({
    where: upcomingWhere(userId),
    orderBy: { date: "asc" },
    take,
    include: { opportunity: { select: { id: true, title: true, type: true } } },
  });
}

export async function getOffers(filters: {
  type?: string;
  q?: string;
  region?: string;
  promo?: string;
  domain?: string;
  archived?: boolean;
}) {
  return prisma.opportunity.findMany({
    where: {
      archived: filters.archived ?? false,
      promo: filters.promo || undefined,
      type: filters.type || undefined,
      region: filters.region || undefined,
      domain: filters.domain || undefined,
      OR: filters.q
        ? [
            { title: { contains: filters.q, mode: "insensitive" } },
            { org: { contains: filters.q, mode: "insensitive" } },
            { city: { contains: filters.q, mode: "insensitive" } },
            { country: { contains: filters.q, mode: "insensitive" } },
            { tags: { contains: filters.q, mode: "insensitive" } },
            { description: { contains: filters.q, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: [{ region: "asc" }, { city: "asc" }, { title: "asc" }],
    include: {
      _count: { select: { tracks: true } },
      createdBy: { select: { name: true } },
    },
  });
}

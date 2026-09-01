import { AppShell } from "@/components/app-shell";
import { DeadlineRail } from "@/components/deadline-rail";
import { requireUser } from "@/lib/auth";
import { getUpcomingDeadlines } from "@/lib/queries";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const deadlines = await getUpcomingDeadlines(user.id, 8);

  return (
    <AppShell userName={user.name} rail={<DeadlineRail items={deadlines} />}>
      {children}
    </AppShell>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Compass,
  Home,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/accueil", label: "Accueil", icon: Home },
  { href: "/offres", label: "Explorer", icon: Compass },
  { href: "/suivi", label: "Mes pistes", icon: BookOpen },
  { href: "/calendrier", label: "Calendrier", icon: CalendarDays },
  { href: "/formalites", label: "Formalités", icon: ClipboardCheck },
  { href: "/promo", label: "La promo", icon: Users },
];

export function AppShell({
  userName,
  rail,
  children,
}: {
  userName: string;
  rail: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const firstName = userName.split(" ")[0];

  return (
    <div className="flex min-h-dvh bg-bg text-ink">
      <aside className="relative hidden w-56 shrink-0 flex-col border-r border-line bg-paper/90 md:flex">
        <div className="px-6 py-7">
          <Logo href="/accueil" subtitle="4A-INFO" size="lg" />
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-7">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex min-h-11 items-center gap-3 px-3 text-sm transition-colors",
                  active
                    ? "brush-active font-semibold text-white"
                    : "text-ink hover:translate-x-0.5 hover:text-lagoon",
                )}
              >
                <Icon className={cn("size-4", active && "text-white")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative mt-auto border-t border-line p-4 pb-6">
          <span className="pointer-events-none absolute -bottom-14 -left-12 size-28 rotate-12 rounded-[45%] bg-lagoon/10" />
          <div className="mb-2 flex items-center gap-3 px-3 py-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-display text-sm text-paper">
              {firstName.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{firstName}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted">4A-INFO</p>
            </div>
          </div>
          <Link
            href="/parametres"
            className="flex min-h-10 items-center gap-3 px-3 text-sm text-muted hover:text-ink"
          >
            <Settings className="size-4" />
            Paramètres
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex min-h-10 w-full cursor-pointer items-center gap-3 px-3 text-sm text-muted hover:text-ink"
            >
              <LogOut className="size-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 md:hidden">
            <Logo href="/accueil" size="sm" />
            <Link
              href="/parametres"
              className="grid size-9 place-items-center rounded-full border border-ink text-sm font-semibold"
            >
              {firstName.charAt(0).toUpperCase()}
            </Link>
          </div>
          {rail}
        </div>
        <main className="flex-1 px-5 py-8 pb-24 md:px-10 md:py-10 md:pb-12">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <div className="grid grid-cols-5">
          {NAV.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] font-medium",
                  active ? "text-lagoon-ink" : "text-muted",
                )}
              >
                {active ? <span className="absolute inset-x-3 top-0 h-0.5 bg-lagoon" /> : null}
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { addMonths, format, isSameDay, isSameMonth, isToday, startOfMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { daysInCalendarMonth, dayKey, monthLabel, WEEKDAYS } from "@/lib/dates";
import { Button } from "@/components/ui";
import { DeadlineForm } from "@/components/deadline-form";
import { DeadlineItem, type DeadlineItemData } from "@/components/deadline-item";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  kind: string;
  scope: string;
  notes: string | null;
  done: boolean;
  createdByName: string;
  opportunity: { id: string; title: string } | null;
  mine: boolean;
};

const KIND_PILL: Record<string, string> = {
  ECOLE: "bg-lagoon-soft text-lagoon-ink",
  OFFRE: "bg-indigo-soft text-indigo",
  FORMALITE: "bg-saffron-soft text-saffron",
  PERSO: "bg-line text-muted",
};

const KIND_DOT: Record<string, string> = {
  ECOLE: "bg-lagoon",
  OFFRE: "bg-indigo",
  FORMALITE: "bg-saffron",
  PERSO: "bg-muted",
};

export function MonthCalendar({
  events,
  offers,
}: {
  events: CalendarEvent[];
  offers: { id: string; title: string }[];
}) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState(() => new Date());

  const days = useMemo(() => daysInCalendarMonth(month), [month]);
  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const key = dayKey(event.date);
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const selectedKey = dayKey(selected);
  const selectedEvents = byDay.get(selectedKey) ?? [];
  const selectedLabel = format(selected, "EEEE d MMMM", { locale: fr });

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="overflow-hidden rounded-xl border border-line bg-paper">
        <div className="flex items-center justify-between gap-3 px-3 py-3 md:px-4">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-2"
              aria-label="Mois précédent"
              onClick={() => setMonth((current) => addMonths(current, -1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <h2 className="min-w-40 text-center text-base font-semibold capitalize tracking-tight">
              {monthLabel(month)}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-2"
              aria-label="Mois suivant"
              onClick={() => setMonth((current) => addMonths(current, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              setMonth(startOfMonth(today));
              setSelected(today);
            }}
          >
            Aujourd'hui
          </Button>
        </div>

        <div className="grid grid-cols-7 border-t border-line">
          {WEEKDAYS.map((label) => (
            <div
              key={label}
              className="border-b border-line px-1 py-2 text-center text-[11px] font-medium uppercase tracking-wide text-muted"
            >
              {label}
            </div>
          ))}
          {days.map((day) => {
            const key = dayKey(day);
            const dayEvents = byDay.get(key) ?? [];
            const inMonth = isSameMonth(day, month);
            const selectedDay = isSameDay(day, selected);
            const today = isToday(day);
            const overflow = Math.max(0, dayEvents.length - 3);

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelected(day);
                  if (!inMonth) setMonth(startOfMonth(day));
                  if (
                    typeof window !== "undefined" &&
                    window.matchMedia("(max-width: 1279px)").matches &&
                    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ) {
                    requestAnimationFrame(() => {
                      document.getElementById("jour-selectionne")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    });
                  }
                }}
                className={cn(
                  "flex min-h-16 cursor-pointer flex-col gap-1 border-b border-r border-line px-1 py-1.5 text-left transition-colors md:min-h-24 md:px-1.5",
                  !inMonth && "bg-bg/60",
                  selectedDay && "bg-lagoon-soft/70",
                  today && !selectedDay && "bg-lagoon-soft/30",
                  "hover:bg-lagoon-soft/40",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-6 items-center justify-center rounded-full text-xs tabular-nums",
                    !inMonth && "text-muted/70",
                    today && "bg-lagoon font-semibold text-white",
                    selectedDay && !today && "font-semibold text-lagoon-ink",
                  )}
                >
                  {format(day, "d")}
                </span>
                <span className="flex gap-0.5 md:hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={event.id}
                      className={cn(
                        "size-1.5 rounded-full",
                        event.done ? "bg-muted" : (KIND_DOT[event.kind] ?? "bg-lagoon"),
                      )}
                    />
                  ))}
                </span>
                <span className="hidden min-w-0 flex-col gap-0.5 md:flex">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={event.id}
                      className={cn(
                        "truncate rounded px-1 py-0.5 text-[10px] leading-tight",
                        event.done
                          ? "bg-line/60 text-muted line-through"
                          : (KIND_PILL[event.kind] ?? "bg-line text-ink"),
                      )}
                    >
                      {event.title}
                    </span>
                  ))}
                  {overflow > 0 ? (
                    <span className="px-1 text-[10px] text-muted">+{overflow}</span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-3 px-4 py-3 text-xs text-muted">
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-lagoon" /> École
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-indigo" /> Offre
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-saffron" /> Formalité
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted" /> Perso
          </li>
        </ul>
      </section>

      <aside className="flex flex-col gap-4">
        <div id="jour-selectionne" className="rounded-xl border border-line bg-paper p-4">
          <h2 className="text-sm font-semibold capitalize">{selectedLabel}</h2>
          {selectedEvents.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Rien ce jour-là. Ajoute une échéance juste en dessous.</p>
          ) : (
            <ul className="mt-1">
              {selectedEvents.map((event) => (
                <DeadlineItem
                  key={event.id}
                  item={{
                    ...event,
                    createdByName: event.createdByName,
                  } satisfies DeadlineItemData}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-line bg-paper p-4">
          <h2 className="text-sm font-semibold">Ajouter le {format(selected, "d MMM", { locale: fr })}</h2>
          <div className="mt-3">
            <DeadlineForm
              key={selectedKey}
              offers={offers}
              defaultDate={selectedKey}
              compact
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

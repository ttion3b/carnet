import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";

export function toDate(value: Date | string) {
  return value instanceof Date ? value : parseISO(value);
}

export function formatDay(value: Date | string) {
  return format(toDate(value), "d MMM yyyy", { locale: fr });
}

export function formatShort(value: Date | string) {
  return format(toDate(value), "d MMM", { locale: fr });
}

export function formatStamp(value: Date | string) {
  return format(toDate(value), "EEE d MMM", { locale: fr });
}

export function formatDateTime(value: Date | string) {
  return format(toDate(value), "d MMM yyyy · HH:mm", { locale: fr });
}

export function relativeDeadline(value: Date | string) {
  const date = toDate(value);
  if (isToday(date)) return "aujourd'hui";
  if (isTomorrow(date)) return "demain";
  if (isYesterday(date)) return "hier";
  const days = differenceInCalendarDays(date, new Date());
  if (days < 0) return `il y a ${Math.abs(days)} j`;
  if (days === 0) return "aujourd'hui";
  return `dans ${days} j`;
}

export function deadlineTone(value: Date | string, done = false) {
  if (done) return "done";
  const days = differenceInCalendarDays(toDate(value), new Date());
  if (days < 0) return "late";
  if (days <= 3) return "soon";
  if (days <= 14) return "mid";
  return "ok";
}

export function toInputDate(value: Date | string | null | undefined) {
  if (!value) return "";
  return format(toDate(value), "yyyy-MM-dd");
}

export const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function dayKey(value: Date | string) {
  return format(toDate(value), "yyyy-MM-dd");
}

export function monthLabel(value: Date | string) {
  return format(toDate(value), "MMMM yyyy", { locale: fr });
}

export function daysInCalendarMonth(value: Date | string) {
  const month = toDate(value);
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
  });
}

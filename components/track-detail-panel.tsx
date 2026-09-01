"use client";

import Link from "next/link";
import { EventForm } from "@/components/event-form";
import { StatusPicker } from "@/components/status-picker";
import { Button, Field, Select, Textarea } from "@/components/ui";
import { removeTrackAction, updateTrackMetaAction } from "@/lib/actions/tracks";
import { eventLabel, PRIORITIES, STATUSES } from "@/lib/constants";
import { formatDateTime } from "@/lib/dates";

export type TrackDetailData = {
  id: string;
  status: string;
  priority: string;
  notes: string;
  opportunityId: string;
  opportunity: {
    title: string;
    org: string;
    type: string;
    city: string | null;
    country: string;
  };
  events: { id: string; type: string; at: string; content: string }[];
};

export function TrackDetailPanel({ track }: { track: TrackDetailData }) {
  const hint = STATUSES.find((item) => item.id === track.status)?.hint;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-line bg-paper px-5 py-6 shadow-[0_14px_35px_-24px_rgb(18_52_90/0.55)] md:px-8">
      <span className="absolute left-7 top-0 h-3 w-16 -translate-y-1 rotate-[-4deg] bg-lagoon/30" />
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-lagoon/50 pb-4">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">{track.opportunity.org}</h2>
          <p className="mt-1 text-sm text-lagoon">{track.opportunity.title}</p>
          <p className="mt-1 text-xs text-muted">
            {[track.opportunity.city, track.opportunity.country].filter(Boolean).join(", ")}
          </p>
        </div>
        <Link href={`/offres/${track.opportunityId}`} className="text-sm font-semibold text-lagoon hover:underline">
          Voir la fiche
        </Link>
      </header>

      <div className="grid gap-8 pt-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="lg:border-r lg:border-line lg:pr-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.16em]">Chronologie</h3>
          {track.events.length === 0 ? (
            <p className="mt-5 text-sm text-muted">Aucun événement. Ajoute la première étape de ton dossier.</p>
          ) : (
            <ol className="mt-5 border-l border-lagoon pl-5">
              {track.events.map((event) => (
                <li key={event.id} className="relative grid gap-1 pb-6 sm:grid-cols-[7rem_1fr]">
                  <span className="absolute -left-[24px] top-1.5 size-2 rounded-full bg-lagoon" />
                  <time className="font-display text-sm italic text-lagoon">{formatDateTime(event.at)}</time>
                  <div>
                    <p className="text-sm font-semibold">{eventLabel(event.type)}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{event.content}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-4 border-t border-line pt-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.16em]">Ajouter une étape</h3>
            <p className="mt-1 text-xs text-muted">Candidature, relance, réponse ou entretien.</p>
            <div className="mt-4"><EventForm trackId={track.id} /></div>
          </div>
        </div>

        <aside className="grid-paper -m-2 rounded-xl p-5">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.16em]">Statut du dossier</h3>
            {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
            <div className="mt-3"><StatusPicker trackId={track.id} current={track.status} /></div>
          </div>

          <form action={updateTrackMetaAction.bind(null, track.id)} className="mt-7 border-t border-line pt-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.16em]">Notes pratiques</h3>
            <div className="mt-4 flex flex-col gap-4">
              <Field label="Priorité">
                <Select name="priority" defaultValue={track.priority}>
                  {PRIORITIES.map((priority) => (
                    <option key={priority.id} value={priority.id}>{priority.label}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Mémo privé">
                <Textarea
                  name="notes"
                  rows={6}
                  defaultValue={track.notes}
                  placeholder="Logement, contacts, questions à poser…"
                />
              </Field>
              <Button type="submit" variant="outline" className="self-start">Enregistrer</Button>
            </div>
          </form>

          <form action={removeTrackAction.bind(null, track.id)} className="mt-7 border-t border-line pt-4">
            <Button type="submit" variant="ghost" className="px-0 text-rose">
              Retirer cette piste
            </Button>
          </form>
        </aside>
      </div>
    </section>
  );
}

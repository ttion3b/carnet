"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TrackDetailPanel, type TrackDetailData } from "@/components/track-detail-panel";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "watch", label: "À regarder", statuses: ["VEILLE"] },
  { id: "sent", label: "Candidaté", statuses: ["ENVOYE"] },
  { id: "waiting", label: "En attente", statuses: ["ATTENTE"] },
  { id: "interview", label: "Entretien", statuses: ["ENTRETIEN"] },
  { id: "decision", label: "Décision", statuses: ["PROPOSITION", "ACCEPTE", "REFUSE", "ABANDON"] },
] as const;

export function TrackBoard({ tracks }: { tracks: TrackDetailData[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("track");
  const [selectedId, setSelectedId] = useState<string | null>(
    initial && tracks.some((track) => track.id === initial) ? initial : tracks[0]?.id ?? null,
  );

  const selected = useMemo(
    () => tracks.find((track) => track.id === selectedId) ?? null,
    [tracks, selectedId],
  );

  function selectTrack(id: string) {
    const next = selectedId === id ? null : id;
    setSelectedId(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set("track", next);
    else params.delete("track");
    router.replace(params.size ? `/suivi?${params}` : "/suivi", { scroll: false });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid-paper overflow-x-auto rounded-xl border border-line bg-paper/60">
        <div className="grid min-w-[58rem] grid-cols-5">
          {COLUMNS.map((column) => {
          const items = tracks.filter((track) =>
            (column.statuses as readonly string[]).includes(track.status),
          );
          return (
            <section key={column.id} className="min-h-72 border-r border-line px-3 py-4 last:border-r-0">
              <h2 className="flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                {column.label}
                <span className="text-lagoon">{items.length}</span>
              </h2>
              <ul className="mt-3 space-y-2">
                {items.map((track) => {
                  const active = track.id === selectedId;
                  const latest = track.events[0];
                  return (
                    <li key={track.id}>
                      <button
                        type="button"
                        onClick={() => selectTrack(track.id)}
                        className={cn(
                          "paper-note w-full px-3 py-4 text-left transition",
                          active
                            ? "border-lagoon ring-2 ring-lagoon/20"
                            : "hover:-translate-y-0.5 hover:border-lagoon/60",
                        )}
                      >
                        <p className="font-display text-[15px] font-semibold leading-5">
                          {track.opportunity.org}
                        </p>
                        <p className="mt-1 text-xs text-muted">{track.opportunity.country}</p>
                        <div className="mt-3 flex items-end justify-between gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-muted">
                            {track.priority === "HAUT" ? "Prioritaire" : ""}
                          </span>
                          <span className="font-display text-xs italic text-lagoon">
                            {latest ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(new Date(latest.at)) : ""}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
          })}
        </div>
      </div>

      {selected ? <TrackDetailPanel track={selected} /> : null}
    </div>
  );
}

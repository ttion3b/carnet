"use client";

import { useState } from "react";
import { toggleChecklistAction, saveChecklistNoteAction } from "@/lib/actions/checklists";
import { toInputDate } from "@/lib/dates";
import { Button, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ChecklistRow({
  item,
}: {
  item: {
    id: string;
    title: string;
    hint: string | null;
    progress: { done: boolean; note: string | null; dueDate: Date | null } | null;
  };
}) {
  const done = item.progress?.done ?? false;
  const [open, setOpen] = useState(Boolean(item.progress?.note || item.progress?.dueDate));

  return (
    <li className="border-b border-line py-3 last:border-b-0">
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-pressed={done}
          aria-label={done ? "Marquer non fait" : "Marquer fait"}
          onClick={() => toggleChecklistAction(item.id)}
          className={cn(
            "mt-0.5 grid size-6 shrink-0 cursor-pointer place-items-center rounded-md border transition-colors",
            done ? "border-lagoon bg-lagoon text-white" : "border-line bg-paper hover:border-lagoon",
          )}
        >
          {done ? <Check className="size-3.5" /> : null}
        </button>
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm font-medium", done && "text-muted line-through")}>{item.title}</p>
          {item.hint ? <p className="mt-0.5 text-xs text-muted">{item.hint}</p> : null}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-1 cursor-pointer text-xs text-lagoon-ink hover:underline"
          >
            {open ? "Masquer la note" : "Date ou note"}
          </button>
          {open ? (
            <form action={saveChecklistNoteAction.bind(null, item.id)} className="mt-2 flex flex-col gap-2">
              <Input
                name="dueDate"
                type="date"
                defaultValue={toInputDate(item.progress?.dueDate)}
                aria-label="Échéance perso"
              />
              <Textarea
                name="note"
                rows={2}
                defaultValue={item.progress?.note ?? ""}
                placeholder="Lien, contact, ce qu'il manque…"
              />
              <Button type="submit" size="sm" variant="soft" className="self-start">
                Enregistrer
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </li>
  );
}

"use client";

import { useActionState } from "react";
import { createDeadlineAction } from "@/lib/actions/deadlines";
import { DEADLINE_KINDS } from "@/lib/constants";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";

export function DeadlineForm({
  offers,
  defaultDate,
  compact,
}: {
  offers: { id: string; title: string }[];
  defaultDate?: string;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState(createDeadlineAction, null);

  return (
    <form action={action} className={compact ? "flex flex-col gap-3" : "grid gap-3 sm:grid-cols-2"}>
      <Field label="Titre">
        <Input name="title" required placeholder="Dépôt convention" />
      </Field>
      <Field label="Date">
        <Input name="date" type="date" required defaultValue={defaultDate} />
      </Field>
      <Field label="Type">
        <Select name="kind" defaultValue="ECOLE">
          {DEADLINE_KINDS.map((kind) => (
            <option key={kind.id} value={kind.id}>
              {kind.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Visibilité">
        <Select name="scope" defaultValue="PERSO">
          <option value="PERSO">Moi seulement</option>
          <option value="CLASSE">Toute la promo</option>
        </Select>
      </Field>
      <Field label="Lier à une offre (optionnel)">
        <Select name="opportunityId" defaultValue="">
          <option value="">Aucune</option>
          {offers.map((offer) => (
            <option key={offer.id} value={offer.id}>
              {offer.title}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Note">
        <Textarea name="notes" rows={1} placeholder="Amphi, lien, consignes…" />
      </Field>
      <div className={compact ? "" : "sm:col-span-2 flex items-center gap-3"}>
        <Button type="submit" disabled={pending}>
          {pending ? "Ajout…" : "Ajouter l'échéance"}
        </Button>
        {state?.error ? <p className="text-sm text-rose">{state.error}</p> : null}
      </div>
    </form>
  );
}

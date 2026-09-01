"use client";

import { EVENT_TYPES } from "@/lib/constants";
import { addTrackEventAction } from "@/lib/actions/tracks";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";

export function EventForm({ trackId }: { trackId: string }) {
  return (
    <form action={addTrackEventAction.bind(null, trackId)} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Quoi">
          <Select name="type" defaultValue="CANDIDATURE">
            {EVENT_TYPES.map((event) => (
              <option key={event.id} value={event.id}>
                {event.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Quand">
          <Input name="at" type="datetime-local" />
        </Field>
      </div>
      <Field label="Détail">
        <Textarea
          name="content"
          required
          rows={3}
          placeholder="Mail envoyé à contact@… / Relance / « on te recontacte la semaine prochaine »"
        />
      </Field>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}

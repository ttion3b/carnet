"use client";

import { useActionState, useState } from "react";
import { Button, Textarea } from "@/components/ui";
import type { CommentFormState } from "@/lib/actions/offers";

const MAX = 500;

export function OfferCommentForm({
  action,
}: {
  action: (prev: CommentFormState, formData: FormData) => Promise<CommentFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const [length, setLength] = useState(0);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <Textarea
        name="body"
        rows={4}
        maxLength={MAX}
        required
        placeholder="Délai de réponse, contact, ce qu'un ancien a dit…"
        onChange={(event) => setLength(event.target.value.length)}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted tabular-nums">
          {length}/{MAX}
        </span>
        <Button type="submit" variant="soft" disabled={pending || length < 2}>
          {pending ? "Publication…" : "Publier"}
        </Button>
      </div>
      {state?.ok ? (
        <p className="text-xs font-medium text-lagoon" role="status">
          Note publiée — merci pour la promo.
        </p>
      ) : null}
      {state?.error ? <p className="text-xs text-rose">{state.error}</p> : null}
    </form>
  );
}

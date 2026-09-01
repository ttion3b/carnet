"use client";

import { useState } from "react";
import { STATUSES } from "@/lib/constants";
import { updateTrackStatusAction } from "@/lib/actions/tracks";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function StatusPicker({ trackId, current }: { trackId: string; current: string }) {
  const [pending, setPending] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-1.5">
      {STATUSES.map((status) => {
        const active = status.id === current;
        return (
          <Button
            key={status.id}
            type="button"
            size="sm"
            variant={active ? "primary" : "outline"}
            className={cn(!active && "text-muted")}
            disabled={pending !== null}
            onClick={async () => {
              setPending(status.id);
              await updateTrackStatusAction(trackId, status.id);
              setPending(null);
            }}
          >
            {status.label}
          </Button>
        );
      })}
    </div>
  );
}

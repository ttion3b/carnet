"use client";

import { useActionState } from "react";
import { createOfferAction } from "@/lib/actions/offers";
import { OfferForm } from "@/components/offer-form";

export function CreateOfferForm() {
  const [state, action] = useActionState(createOfferAction, null);
  return <OfferForm action={action} submitLabel="Publier pour la promo" error={state?.error} />;
}

"use client";

import { DOMAINS, REGIONS } from "@/lib/constants";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";
import { toInputDate } from "@/lib/dates";

type OfferValues = {
  type?: string;
  title?: string;
  org?: string;
  city?: string | null;
  country?: string;
  region?: string;
  domain?: string | null;
  duration?: string | null;
  startHint?: string | null;
  url?: string | null;
  contact?: string | null;
  description?: string;
  tags?: string;
  applyBy?: Date | null;
};

export function OfferForm({
  action,
  values,
  submitLabel,
  error,
}: {
  action: (formData: FormData) => unknown;
  values?: OfferValues;
  submitLabel: string;
  error?: string;
}) {
  return (
    <form action={action as (formData: FormData) => void} className="flex flex-col gap-4">
      <Field label="Type">
        <Select name="type" defaultValue={values?.type ?? "STAGE"}>
          <option value="STAGE">Stage</option>
          <option value="ECHANGE">Semestre d'échange</option>
        </Select>
      </Field>
      <Field label="Intitulé">
        <Input
          name="title"
          required
          defaultValue={values?.title}
          placeholder="Développeur backend — réseau opérateur"
        />
      </Field>
      <Field label="Entreprise ou université">
        <Input name="org" required defaultValue={values?.org} placeholder="Zeop / University of Mauritius" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ville">
          <Input name="city" defaultValue={values?.city ?? ""} />
        </Field>
        <Field label="Pays">
          <Input name="country" defaultValue={values?.country ?? "Réunion"} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Région">
          <Select name="region" defaultValue={values?.region ?? "FRANCE"}>
            {REGIONS.map((region) => (
              <option key={region.id} value={region.id}>
                {region.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Durée">
          <Input name="duration" defaultValue={values?.duration ?? ""} placeholder="1 semestre" />
        </Field>
      </div>
      <Field label="Domaine">
        <Select name="domain" defaultValue={values?.domain ?? "Informatique"}>
          {DOMAINS.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Début prévu">
          <Input name="startHint" defaultValue={values?.startHint ?? ""} placeholder="Fév. 2027" />
        </Field>
        <Field label="Candidater avant">
          <Input name="applyBy" type="date" defaultValue={toInputDate(values?.applyBy)} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Lien">
          <Input name="url" type="url" defaultValue={values?.url ?? ""} placeholder="https://" />
        </Field>
        <Field label="Contact">
          <Input name="contact" defaultValue={values?.contact ?? ""} placeholder="mail ou nom" />
        </Field>
      </div>
      <Field label="Mots-clés" hint="Séparés par des virgules">
        <Input name="tags" defaultValue={values?.tags ?? ""} placeholder="Python, visa, BIM" />
      </Field>
      <Field label="Description">
        <Textarea
          name="description"
          required
          rows={6}
          defaultValue={values?.description}
          placeholder="Missions, profil, délais de réponse, ce que les anciens en ont dit…"
        />
      </Field>
      {error ? <p className="text-sm text-rose">{error}</p> : null}
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}

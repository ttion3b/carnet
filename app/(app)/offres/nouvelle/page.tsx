import { CreateOfferForm } from "@/components/create-offer-form";

export const metadata = { title: "Nouvelle offre" };

export default function NouvelleOffrePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">Ajouter une offre</h1>
      <p className="mt-1 text-sm text-muted">
        Visible par toute la promo. Mets le contact, la deadline, et ce que tu sais déjà.
      </p>
      <div className="mt-6">
        <CreateOfferForm />
      </div>
    </div>
  );
}

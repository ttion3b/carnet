import { CreateOfferForm } from "@/components/create-offer-form";
import { PageHeader } from "@/components/carnet-ui";

export const metadata = { title: "Nouvelle offre" };

export default function NouvelleOffrePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Ajouter une offre"
        description="Visible par toute la promo. Mets le contact, la deadline, et ce que tu sais déjà."
      />
      <div className="mt-6">
        <CreateOfferForm />
      </div>
    </div>
  );
}

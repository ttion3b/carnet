import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateProfileAction } from "@/lib/actions/checklists";
import { logoutAction } from "@/lib/actions/auth";
import { PageHeader } from "@/components/carnet-ui";
import { Button, Field, Input } from "@/components/ui";

export const metadata = { title: "Paramètres" };

export default async function ParametresPage() {
  const user = await requireUser();
  const config = await prisma.classConfig.findUnique({ where: { id: "default" } });

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8">
      <PageHeader title="Paramètres" />

      <form action={updateProfileAction} className="flex flex-col gap-3 rounded-xl border border-line bg-paper p-4">
        <Field label="Nom affiché">
          <Input name="name" defaultValue={user.name} required />
        </Field>
        <Field label="Email">
          <Input value={user.email} disabled />
        </Field>
        <Button type="submit" className="self-start">
          Enregistrer
        </Button>
      </form>

      <div className="rounded-xl border border-line bg-paper p-4 text-sm">
        <p className="font-medium">Promo</p>
        <p className="mt-1 text-muted">{config?.name}</p>
        <p className="mt-2 text-xs text-muted">
          Code à donner aux camarades : <span className="font-medium text-ink">{config?.inviteCode}</span>
        </p>
      </div>

      <form action={logoutAction}>
        <Button type="submit" variant="outline">
          Se déconnecter
        </Button>
      </form>
    </div>
  );
}

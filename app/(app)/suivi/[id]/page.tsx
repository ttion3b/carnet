import { redirect } from "next/navigation";

export default async function TrackRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/suivi?track=${id}`);
}

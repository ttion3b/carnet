import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/lib/constants";

export async function GET() {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/connexion");
}

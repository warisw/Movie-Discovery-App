import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function POST() {
  const store = await cookies();
  store.set("auth", "", { path: "/", maxAge: 0 });
  redirect("/");
  return new Response("OK");
}

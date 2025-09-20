import { cookies } from "next/headers";
import { API_BASE } from "@/app/lib/api";

export async function POST(_req, ctx) {
  const store = await cookies();
  const params = await ctx.params;

  const auth = store.get("auth")?.value;
  if (!auth) return new Response("Unauthorized", { status: 401 });
  const { token } = JSON.parse(auth);

  const response = await fetch(`${API_BASE}/movies/${params.id}/favorite`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.text();
  return new Response(body, { status: response.status });
}

export async function DELETE(_req, ctx) {
  const store = await cookies();
  const params = await ctx.params;

  const auth = store.get("auth")?.value;
  if (!auth) return new Response("Unauthorized", { status: 401 });
  const { token } = JSON.parse(auth);

  const response = await fetch(`${API_BASE}/movies/${params.id}/favorite`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.text();
  return new Response(body, { status: response.status });
}

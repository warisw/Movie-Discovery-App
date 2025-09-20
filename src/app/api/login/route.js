import { cookies } from "next/headers";
import { API_BASE } from "@/app/lib/api";

export async function POST(req) {
  const store = await cookies();
  const { username, password } = await req.json();
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const body = await response.text();
  if (!response.ok)
    return new Response(body || "Invalid credentials", {
      status: response.status,
    });
  const data = JSON.parse(body);
  store.set(
    "auth",
    JSON.stringify({
      token: data.token,
      username: data.user?.username || username,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      // maxAge: 60 * 60 * 24,
    }
  );
  return new Response("OK");
}

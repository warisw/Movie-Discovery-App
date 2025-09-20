import { cookies } from "next/headers";

export async function getAuthFromCookies() {
  const store = await cookies();
  const raw = store.get("auth")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

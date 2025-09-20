export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://movie-api-decs.onrender.com/api";

export async function apiFetch(
  path,
  { token, method = "GET", body, headers } = {}
) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let message = "";
    try {
      message = await res.text();
    } catch {}

    const err = new Error(message || `Request failed: ${res.status}`);
    err.status = res.status;

    err.retryAfter =
      res.headers.get("Retry-After") ||
      res.headers.get("RateLimit-Reset") ||
      "";
    throw err;
  }
  return res.json();
}

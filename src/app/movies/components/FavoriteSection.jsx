import { apiFetch } from "@/app/lib/api";
import { getAuthFromCookies } from "@/app/lib/auth";
import FavoriteButton from "@/app/movies/components/FavoriteButton";

export default async function FavoriteSection({ movieId }) {
  const user = await getAuthFromCookies();
  if (!user?.token) return null;

  let initialFav = false;
  try {
    const data = await apiFetch(`/movies?limit=16`, { token: user.token });
    initialFav = !!data.movies.find((m) => m.id === Number(movieId))?.favorite;
  } catch {
    initialFav = false;
  }

  return (
    <div className="mt-6">
      <FavoriteButton movieId={movieId} initialFav={initialFav} />
    </div>
  );
}

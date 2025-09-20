import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { getAuthFromCookies } from "@/app/lib/auth";
import FavoriteButton from "@/app/movies/components/FavoriteButton";
import { Suspense } from "react";
import FavoriteSection from "../components/FavoriteSection";

// SEO meta
export async function generateMetadata({ params }) {
  const routeParams = await params;
  try {
    const movie = await apiFetch(`/movies/${routeParams.id}`);
    const title = `${movie.title} (${movie.year})`;
    return {
      title,
      description: movie.description,
      openGraph: {
        title,
        description: movie.description,
        images: [{ url: movie.poster }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: movie.description,
        images: [movie.poster],
      },
    };
  } catch {
    return { title: "Movie not found" };
  }
}

export default async function MovieDetailPage({ params }) {
  const routeParams = await params;
  const id = routeParams.id;

  let movie;
  try {
    movie = await apiFetch(`/movies/${id}`);
  } catch (e) {
    if (e.status === 404) return notFound();
    throw e;
  }

  const user = await getAuthFromCookies();
  let initialFav = false;
  if (user?.token) {
    try {
      const data = await apiFetch(`/movies?limit=16`, { token: user.token });
      initialFav = !!data.movies.find((m) => m.id === Number(id))?.favorite;
    } catch {
      initialFav = false;
    }
  }

  return (
    <article className="mx-auto max-w-5xl">
      <Link
        href="/movies"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <span>←</span> Back to list
      </Link>

      <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
        {movie.title} <span className="text-gray-500">({movie.year})</span>
      </h1>

      <div className="mt-6 grid gap-6 md:grid-cols-[320px_1fr] items-start">
        <div className="relative w-full h-[480px] rounded-lg overflow-hidden shadow">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
            priority
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <dl className="space-y-2 text-gray-800">
            <div>
              <dt className="text-sm font-medium text-gray-500">Director</dt>
              <dd className="text-base">{movie.director}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Genre</dt>
              <dd className="text-base">{movie.genre}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Rating</dt>
              <dd className="text-base">{movie.rating}</dd>
            </div>
          </dl>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {movie.description}
          </p>
          <Suspense
            key={movie.id}
            fallback={
              <div className="mt-6 h-10 w-48 rounded-md bg-gray-200 animate-pulse" />
            }
          >
            <FavoriteSection movieId={movie.id} />
          </Suspense>
        </div>
      </div>
    </article>
  );
}

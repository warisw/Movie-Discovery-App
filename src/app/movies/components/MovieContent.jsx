import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import MovieCard from "@/app/movies/components/MovieCard";

export default async function MoviesContent({ page, isAuthed, token }) {
  let movies = [];
  let pagination = {
    page,
    totalPages: page,
    hasPrev: page > 1,
    hasNext: false,
  };

  try {
    const data = await apiFetch(`/movies?page=${page}&limit=8`, { token });
    movies = data.movies;
    pagination = data.pagination;
  } catch (e) {
    const isRateLimited = e.status === 429;
    return (
      <section className="max-w-3xl mx-auto">
        <div
          className={`rounded-md border p-4 ${
            isRateLimited
              ? "border-amber-300 bg-amber-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-sm">
            {isRateLimited
              ? `Too many requests. ${
                  e.retryAfter
                    ? `Try again in ~${e.retryAfter}.`
                    : "Please try again shortly."
                }`
              : "Something went wrong while loading movies."}
          </p>
          <div className="mt-3">
            <Link
              href={`/movies?page=${page}`}
              className="text-blue-600 hover:underline"
            >
              Try again
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!movies.length) {
    return (
      <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-600">
        No movies found.
      </div>
    );
  }

  return (
    <>
      <ul className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isAuthed={isAuthed} />
        ))}
      </ul>

      {/* Pagination */}
      <nav
        className="mt-8 flex items-center justify-center gap-2"
        aria-label="Pagination"
      >
        <PaginationLink
          href={
            pagination.hasPrev
              ? `/movies?page=${pagination.page - 1}`
              : undefined
          }
          disabled={!pagination.hasPrev}
        >
          ← Prev
        </PaginationLink>

        <span className="px-3 py-1 text-sm text-gray-700">
          {pagination.page} / {pagination.totalPages}
        </span>

        <PaginationLink
          href={
            pagination.hasNext
              ? `/movies?page=${pagination.page + 1}`
              : undefined
          }
          disabled={!pagination.hasNext}
        >
          Next →
        </PaginationLink>
      </nav>
    </>
  );
}

function PaginationLink({ href, disabled, children }) {
  const base =
    "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition";
  const enabled =
    "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50";
  const off =
    "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed";
  if (disabled || !href) {
    return (
      <span className={`${base} ${off}`} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={`${base} ${enabled}`}>
      {children}
    </Link>
  );
}

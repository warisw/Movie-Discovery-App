import { Suspense } from "react";
import { getAuthFromCookies } from "@/app/lib/auth";
import MoviesContent from "./components/MovieContent";
import ListSkeleton from "./components/ListSkeleton";

export const metadata = {
  title: "Browse Movies | Movie Discovery",
  description: "Browse 16 Movies and Add your favorites.",
  openGraph: {
    title: "Browse Movies",
    description: "Browse 16 Movies and Add your favorites.",
  },
};

export default async function MoviesPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page ?? "1", 10) || 1);
  const user = await getAuthFromCookies();

  return (
    <section className="min-h-screen">
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Movies
            </h1>
            <p className="text-gray-300 mt-2">
              Browse the collection and add your favorites
            </p>
          </div>
          <div className="text-sm text-gray-300">Page {page}</div>
        </div>
      </div>

      <Suspense key={page} fallback={<ListSkeleton />}>
        <MoviesContent page={page} isAuthed={!!user} token={user?.token} />
      </Suspense>
    </section>
  );
}

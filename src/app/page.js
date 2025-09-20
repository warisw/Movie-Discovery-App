import Link from "next/link";

export const metadata = {
  title: "Movie Discovery – Discover Your Next Favorite Movie",
  description:
    "Browse top-rated classics, explore new releases and add them to your personal favorites list.",
  openGraph: {
    title: "Movie Discovery",
    description:
      "Browse top-rated classics, explore new releases and add them to your personal favorites list.",
  },
};

export default function Home() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Discover Your Next&nbsp;
          <span className="text-yellow-400">Favorite Movie</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Browse top-rated classics, explore new releases and add them to your
          personal favorites list.
        </p>

        <Link
          href="/movies"
          className="inline-block bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
        >
          Browse Movies
        </Link>
      </div>

      <footer className="absolute bottom-6 text-gray-400 text-sm">
        Movie Discovery App · Aris@2025
      </footer>
    </section>
  );
}

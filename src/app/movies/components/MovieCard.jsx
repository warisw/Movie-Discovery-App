import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ movie, isAuthed }) {
  return (
    <li className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative w-full overflow-hidden rounded-md">
          <Image
            src={movie.poster}
            alt={movie.title}
            width={240}
            height={360}
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold">
          {movie.title} <span className="text-gray-500">({movie.year})</span>
        </h3>
      </Link>

      <p className="text-sm text-gray-700 mt-1">
        <strong>Director:</strong> {movie.director}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p className="mt-2 text-sm text-gray-500">{movie.description}</p>

      {isAuthed && (
        <div className="mt-3">
          <FavoriteButton movieId={movie.id} initialFav={!!movie.favorite} />
        </div>
      )}
    </li>
  );
}

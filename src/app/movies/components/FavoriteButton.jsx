"use client";
import { useState } from "react";

export default function FavoriteButton({ movieId, initialFav = false }) {
  const [fav, setFav] = useState(initialFav);
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    const next = !fav;
    setFav(next); // optimistic
    setPending(true);
    try {
      const res = await fetch(`/api/favorites/${movieId}`, {
        method: next ? "POST" : "DELETE",
      });
      if (!res.ok) throw new Error("Request failed");
    } catch {
      setFav(!next); // rollback
      alert("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <button onClick={toggle} disabled={pending} aria-pressed={fav}>
      {fav ? "★ Favorited" : "☆ Add to favorites"}
    </button>
  );
}

"use client"

import { useFavorites } from "@/hooks/useFavorites"

export default function FavoriteButton({ id }: { id: number }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(id)

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className="mt-4 text-sm text-blue-600"
    >
      {favorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
    </button>
  )
}
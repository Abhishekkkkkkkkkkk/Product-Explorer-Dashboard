"use client"

import { useEffect, useState } from "react"
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage,
} from "@/lib/storage"

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    setFavorites(getFavoritesFromStorage())
  }, [])

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id]

    setFavorites(updatedFavorites)
    saveFavoritesToStorage(updatedFavorites)
  }

  const isFavorite = (id: number) => favorites.includes(id)

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}

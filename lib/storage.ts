const FAVORITES_KEY = "favorite_products"

export function getFavoritesFromStorage(): number[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
  } catch {
    return []
  }
}

export function saveFavoritesToStorage(favorites: number[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

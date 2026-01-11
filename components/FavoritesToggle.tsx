"use client"

interface Props {
  showFavorites: boolean
  onToggle: () => void
}

export default function FavoritesToggle({
  showFavorites,
  onToggle,
}: Props) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={showFavorites}
      className={`rounded-lg px-4 py-2 font-medium transition ${
        showFavorites
          ? "bg-blue-600 text-white"
          : "border bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800"
      }`}
    >
      {showFavorites ? "Go to Home" : "Show Favorites"}
    </button>
  )
}

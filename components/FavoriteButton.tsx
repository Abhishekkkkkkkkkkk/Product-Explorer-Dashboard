// "use client"

// import { useFavorites } from "@/hooks/useFavorites"

// export default function FavoriteButton({ id }: { id: number }) {
//   const { toggleFavorite, isFavorite } = useFavorites()
//   const favorite = isFavorite(id)

//   return (
//     <button
//       onClick={() => toggleFavorite(id)}
//       className="mt-4 text-sm text-blue-600"
//     >
//       {favorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
//     </button>
//   )
// }

"use client"

import { useEffect, useState } from "react"

export default function FavoriteButton({ id }: { id: number }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
    setLiked(stored.includes(id))
  }, [id])

  function toggle() {
    const stored: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    )

    let updated
    if (stored.includes(id)) {
      updated = stored.filter(i => i !== id)
    } else {
      updated = [...stored, id]
    }

    localStorage.setItem("favorites", JSON.stringify(updated))
    setLiked(updated.includes(id))
  }

  return (
    <button onClick={toggle} className="text-xl">
      {liked ? "❤️" : "🤍"}
    </button>
  )
}

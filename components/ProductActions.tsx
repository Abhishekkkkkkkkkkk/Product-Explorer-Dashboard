"use client"

import Link from "next/link"
import FavoriteButton from "./FavoriteButton"

export default function ProductActions({ productId }: { productId: number }) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <FavoriteButton id={productId} />

      <Link
        href="/"
        className="rounded-lg border px-4 py-2 font-medium text-purple-600 hover:bg-purple-50 transition"
      >
        Go to Home
      </Link>

      <button
        onClick={() => {
          sessionStorage.setItem("openFavorites", "true")
          window.location.href = "/"
        }}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
      >
        Go to Favorites
      </button>
    </div>
  )
}

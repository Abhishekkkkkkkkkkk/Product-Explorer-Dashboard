"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { useFavorites } from "@/hooks/useFavorites"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  return (
    <div className="bg-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={180}
            height={180}
            className="h-40 object-contain"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {product.category}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>

          <button
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={favorite}
            className={`text-sm font-medium ${
              favorite
                ? "text-red-500"
                : "text-purple-600 dark:text-purple-400"
            }`}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  )
}

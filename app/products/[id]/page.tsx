export const runtime = "nodejs"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/api"
import FavoriteButton from "@/components/FavoriteButton"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
      <div className="bg-white rounded-xl border p-6 flex justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={350}
          height={350}
          className="object-contain"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-500 mt-2">{product.category}</p>

        <p className="mt-4 leading-relaxed text-gray-700">
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <FavoriteButton id={product.id} />

          <Link
            href="/"
            className="rounded-lg border px-4 py-2 font-medium text-purple-600 hover:bg-purple-50 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/?favorites=true"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
          >
            Go to Favorites
          </Link>
        </div>
      </div>
    </div>
  )
}

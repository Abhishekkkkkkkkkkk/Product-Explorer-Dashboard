import Image from "next/image"
import { notFound } from "next/navigation"
import ProductActions from "@/components/ProductActions"

interface Props {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) notFound()
  return res.json()
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProduct(id)

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

        <div className="mt-6 text-2xl font-bold text-blue-600">
          ${product.price}
        </div>

        {/* CLIENT ACTIONS */}
        <ProductActions productId={product.id} />
      </div>
    </div>
  )
}

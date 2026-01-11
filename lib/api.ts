import { Product } from "@/types/product"

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load products")
  }

  return res.json()
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load product")
  }

  return res.json()
}

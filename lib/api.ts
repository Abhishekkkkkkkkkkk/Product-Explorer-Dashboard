import { Product } from "@/types/product"

const BASE_URL = "https://fakestoreapi.com"

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load products")
  }

  const data = await res.json()

  if (!Array.isArray(data)) {
    throw new Error("Invalid products response")
  }

  return data
}

export async function getProductById(id: string): Promise<Product> {
  if (!id) {
    throw new Error("Product ID is required")
  }

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load product")
  }

  const data = await res.json()

  if (!data || !data.id) {
    throw new Error("Product not found")
  }

  return data
}

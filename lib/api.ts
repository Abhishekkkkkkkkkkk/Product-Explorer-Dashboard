import { headers } from "next/headers"
import { Product } from "@/types/product"

async function getBaseUrl() {
  const h = await headers()
  const host = h.get("host")

  if (!host) return null

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  return `${protocol}://${host}`
}

export async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = await getBaseUrl()
    if (!baseUrl) return []

    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    })

    if (!res.ok) return []

    return res.json()
  } catch {
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const baseUrl = await getBaseUrl()
    if (!baseUrl) return null

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) return null

    return res.json()
  } catch {
    return null
  }
}

import { headers } from "next/headers"
import { Product } from "@/types/product"

async function getBaseUrl(): Promise<string> {
  const h = await headers()
  const host = h.get("host")

  if (!host) {
    throw new Error("Missing host header")
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https"

  return `${protocol}://${host}`
}

export async function getProducts(): Promise<Product[]> {
  const baseUrl = await getBaseUrl()

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load products")
  }

  return res.json()
}

export async function getProductById(id: string): Promise<Product> {
  const baseUrl = await getBaseUrl()

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load product")
  }

  return res.json()
}

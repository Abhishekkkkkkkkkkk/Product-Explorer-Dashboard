import { Product } from "@/types/product"

const BASE_URL = "https://fakestoreapi.com"

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`)
  }

  const text = await res.text()

  if (!text) {
    throw new Error("Empty response from API")
  }

  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error("Invalid JSON response from API")
  }
}

export async function getProducts(): Promise<Product[]> {
  const data = await safeFetch<Product[]>(`${BASE_URL}/products`)
  return data
}

export async function getProductById(id: string): Promise<Product> {
  if (!id) {
    throw new Error("Product ID is required")
  }

  const data = await safeFetch<Product>(`${BASE_URL}/products/${id}`)
  return data
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Product } from "@/types/product"
import ProductGrid from "./ProductGrid"
import LoadingSkeleton from "./LoadingSkeleton"
import SearchBar from "./SearchBar"
import SortSelect from "./SortSelect"
import CategoryDropdown from "./CategoryDropdown"

const ITEMS_PER_PAGE = 8

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products")
        if (!res.ok) throw new Error()
        const data = await res.json()
        setProducts(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const favorites = useMemo<number[]>(() => {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem("favorites") || "[]")
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]

    if (showFavorites) {
      list = list.filter(p => favorites.includes(p.id))
    }

    if (search) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      list = list.filter(p => p.category === category)
    }

    if (sort === "low") {
      list.sort((a, b) => a.price - b.price)
    }

    if (sort === "high") {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [products, search, category, sort, showFavorites, favorites])

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  )

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE)

  if (loading) return <LoadingSkeleton />
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load products
      </p>
    )

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <SearchBar value={search} onChange={setSearch} />

        <CategoryDropdown
          categories={categories}
          selected={category}
          onChange={value => {
            setCategory(value)
            setPage(1)
          }}
        />

        <SortSelect value={sort} onChange={setSort} />

        <button
          onClick={() => setShowFavorites(p => !p)}
          className="rounded-lg border px-4 py-2"
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      <ProductGrid products={paginated} />

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(p => p + 1)}
          disabled={start + ITEMS_PER_PAGE >= filtered.length}
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

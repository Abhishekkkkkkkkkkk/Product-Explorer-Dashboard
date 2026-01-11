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
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)
  const [showFavorites, setShowFavorites] = useState(false)

  // Load products
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

  // Load & sync favorites
  useEffect(() => {
    function syncFavorites() {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
      setFavorites(stored)
    }

    syncFavorites()
    window.addEventListener("storage", syncFavorites)
    window.addEventListener("focus", syncFavorites)

    return () => {
      window.removeEventListener("storage", syncFavorites)
      window.removeEventListener("focus", syncFavorites)
    }
  }, [])

  // OPEN FAVORITES AFTER NAVIGATION
  useEffect(() => {
    const shouldOpen = sessionStorage.getItem("openFavorites")
    if (shouldOpen === "true") {
      setShowFavorites(true)
      setPage(1)
      sessionStorage.removeItem("openFavorites")
    }
  }, [])

  // Filtering logic
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

    if (sort === "low") list.sort((a, b) => a.price - b.price)
    if (sort === "high") list.sort((a, b) => b.price - a.price)

    return list
  }, [products, favorites, showFavorites, search, category, sort])

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
      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow">
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
          onClick={() => {
            setShowFavorites(prev => !prev)
            setPage(1)
          }}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {/* PRODUCTS */}
      <ProductGrid products={paginated} />

      {/* EMPTY FAVORITES */}
      {showFavorites && paginated.length === 0 && (
        <p className="text-center text-gray-500">
          No favorite products yet ❤️
        </p>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={start + ITEMS_PER_PAGE >= filtered.length}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

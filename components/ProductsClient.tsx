"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import FavoritesToggle from "./FavoritesToggle";
import { useFavorites } from "@/hooks/useFavorites";

interface Props {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

export default function ProductsClient({ products }: Props) {
  const searchParams = useSearchParams();
  const favoritesParam = searchParams.get("favorites");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [sort, setSort] = useState<"" | "asc" | "desc">("");
  const [page, setPage] = useState(1);

  const { favorites } = useFavorites();

  useEffect(() => {
    if (favoritesParam === "true") setShowFavorites(true);
  }, [favoritesParam]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filtered = products.filter((p) => {
    const s = p.title.toLowerCase().includes(search.toLowerCase());
    const c = !category || p.category === category;
    const f = !showFavorites || favorites.includes(p.id);
    return s && c && f;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    return 0;
  });

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = sorted.slice(start, start + ITEMS_PER_PAGE);

  return (
    <section className="p-6 space-y-6">
      {/* FILTER BAR */}
      <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-xl border p-4 flex flex-col md:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} />

        <CategoryDropdown
          categories={categories}
          selected={category}
          onChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          aria-label="Sort products by price"
          className="border rounded-lg px-4 py-2
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-300 dark:border-gray-700"
        >
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <FavoritesToggle
          showFavorites={showFavorites}
          onToggle={() => {
            setShowFavorites((p) => !p);
            setPage(1);
          }}
        />
      </div>

      {paginated.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-20">
          No products found.
        </p>
      ) : (
        <ProductGrid products={paginated} />
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={start + ITEMS_PER_PAGE >= sorted.length}
          className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </section>
  );
}

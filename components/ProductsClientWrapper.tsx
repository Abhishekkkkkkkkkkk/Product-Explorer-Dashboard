"use client"

import dynamic from "next/dynamic"

const ProductsClient = dynamic(
  () => import("./ProductsClient").then(mod => mod.default),
  { ssr: false }
)

export default function ProductsClientWrapper() {
  return <ProductsClient />
}

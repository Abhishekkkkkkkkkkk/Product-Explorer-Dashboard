"use client"

import dynamic from "next/dynamic"

const ProductsClient = dynamic(
  () => import("./ProductsClient"),
  { ssr: false }
)

export default function ProductsClientWrapper() {
  return <ProductsClient />
}

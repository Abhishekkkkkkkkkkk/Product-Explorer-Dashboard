import { getProducts } from "@/lib/api"
import ProductsClient from "@/components/ProductsClient"

export default async function HomePage() {
  const products = await getProducts()
  return <ProductsClient products={products} />
}

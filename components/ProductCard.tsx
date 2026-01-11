// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { Product } from "@/types/product"
// import { useFavorites } from "@/hooks/useFavorites"

// interface Props {
//   product: Product
// }

// export default function ProductCard({ product }: Props) {
//   const { toggleFavorite, isFavorite } = useFavorites()
//   const favorite = isFavorite(product.id)

//   return (
//     <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
//       <Link href={`/products/${product.id}`}>
//         <div className="bg-gray-50 p-4 flex justify-center">
//           <Image
//             src={product.image}
//             alt={product.title}
//             width={180}
//             height={180}
//             className="h-40 object-contain"
//           />
//         </div>
//       </Link>

//       <div className="p-4 flex flex-col flex-1">
//         <Link href={`/products/${product.id}`}>
//           <h3 className="font-semibold line-clamp-2 hover:text-purple-600 transition">
//             {product.title}
//           </h3>
//         </Link>

//         <p className="text-sm text-gray-500 mt-1">{product.category}</p>

//         <div className="mt-auto flex items-center justify-between pt-4">
//           <span className="font-bold text-blue-600">
//             ${product.price}
//           </span>

//           <button
//             onClick={() => toggleFavorite(product.id)}
//             className={`text-sm font-medium ${
//               favorite
//                 ? "text-red-500"
//                 : "text-purple-600 hover:text-purple-700"
//             }`}
//           >
//             {favorite ? "♥" : "♡"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }






import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import FavoriteButton from "./FavoriteButton"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-1">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain mx-auto h-40"
        />
        <h3 className="mt-4 font-medium line-clamp-2">{product.title}</h3>
        <p className="mt-2 font-bold text-blue-600">${product.price}</p>
      </Link>

      <div className="mt-3">
        <FavoriteButton id={product.id} />
      </div>
    </div>
  )
}

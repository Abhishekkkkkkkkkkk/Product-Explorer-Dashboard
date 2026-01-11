import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <p className="text-gray-500 mt-2">
        The product you're looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-6 text-blue-600 hover:underline"
      >
        Go back to Home
      </Link>
    </div>
  )
}

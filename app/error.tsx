"use client"

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-2xl font-bold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-600 max-w-md">
        {error.message || "Unable to load data. Please try again."}
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  )
}

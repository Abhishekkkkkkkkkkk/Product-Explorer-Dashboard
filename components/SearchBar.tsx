// interface Props {
//   value: string
//   onChange: (value: string) => void
// }

// export default function SearchBar({ value, onChange }: Props) {
//   return (
//     <input
//       aria-label="Search products"
//       type="text"
//       placeholder="Search products..."
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       className="w-full md:w-64 border rounded-lg px-4 py-2
//       bg-white dark:bg-gray-800
//       text-gray-900 dark:text-gray-100
//       border-gray-300 dark:border-gray-700
//       focus:outline-none focus:ring-2 focus:ring-purple-500"
//     />
//   )
// }


"use client"

export default function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search products..."
      className="border px-4 py-2 rounded-lg w-64"
    />
  )
}

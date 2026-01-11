// "use client"

// interface Props {
//   value: string
//   onChange: (value: string) => void
// }

// export default function SortSelect({ value, onChange }: Props) {
//   return (
//     <select
//       aria-label="Sort products by price"
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       className="rounded-lg border px-4 py-2
//       bg-white dark:bg-gray-800
//       text-gray-900 dark:text-gray-100
//       border-gray-300 dark:border-gray-700
//       focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="">Sort by price</option>
//       <option value="low">Low → High</option>
//       <option value="high">High → Low</option>
//     </select>
//   )
// }


"use client"

export default function SortSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border px-4 py-2 rounded-lg"
    >
      <option value="">Sort by price</option>
      <option value="low">Low → High</option>
      <option value="high">High → Low</option>
    </select>
  )
}

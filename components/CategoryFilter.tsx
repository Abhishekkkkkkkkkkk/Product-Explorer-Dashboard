interface Props {
  categories: string[]
  selected: string
  onChange: (value: string) => void
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <select
      aria-label="Filter by category"
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="w-full md:w-56 border rounded-lg px-4 py-2
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      border-gray-300 dark:border-gray-700
      focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option
        value=""
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        All Categories
      </option>

      {categories.map(cat => (
        <option
          key={cat}
          value={cat}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {cat}
        </option>
      ))}
    </select>
  )
}

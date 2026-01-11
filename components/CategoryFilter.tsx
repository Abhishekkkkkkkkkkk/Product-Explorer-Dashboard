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
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="w-full md:w-56 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}

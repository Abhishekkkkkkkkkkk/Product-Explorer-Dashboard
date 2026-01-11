"use client"

import { useState, useRef, useEffect } from "react"

interface Props {
  categories: string[]
  selected: string
  onChange: (value: string) => void
}

export default function CategoryDropdown({
  categories,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative w-full md:w-56">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(p => !p)}
        className="w-full rounded-lg border px-4 py-2 text-left
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border-gray-300 dark:border-gray-700
        transition-colors duration-300"
      >
        {selected || "All Categories"}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 w-full rounded-lg border shadow-lg
          bg-white dark:bg-gray-900
          border-gray-200 dark:border-gray-700
          transition-all duration-200"
        >
          <li
            role="option"
            onClick={() => {
              onChange("")
              setOpen(false)
            }}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            All Categories
          </li>

          {categories.map(cat => (
            <li
              key={cat}
              role="option"
              onClick={() => {
                onChange(cat)
                setOpen(false)
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

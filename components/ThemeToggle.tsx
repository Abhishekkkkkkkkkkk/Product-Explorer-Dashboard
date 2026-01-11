"use client"

import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="ml-4 px-3 py-2 rounded border"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  )
}

"use client"

import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent cursor-pointer">
            Product Explorer
          </h1>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  )
}

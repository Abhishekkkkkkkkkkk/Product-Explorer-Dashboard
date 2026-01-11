import Link from "next/link"
import { ThemeProvider } from "next-themes"
import dynamic from "next/dynamic"
import "./globals.css"

const ThemeToggle = dynamic(
  () => import("@/components/ThemeToggle"),
  { ssr: false }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
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

          <main className="max-w-7xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

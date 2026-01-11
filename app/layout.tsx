import "./globals.css"
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header"

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
          <Header />
          <main className="max-w-7xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

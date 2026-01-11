// import "./globals.css"
// import { ThemeProvider } from "next-themes"
// import Header from "@/components/Header"

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem={false}
//         >
//           <Header />
//           <main className="max-w-7xl mx-auto">{children}</main>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 text-xl font-bold text-purple-600">
            Product Explorer
          </div>
        </header>

        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  )
}

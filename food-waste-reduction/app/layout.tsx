import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Navigation from "@/app/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "エコフード - 食品ロス削減でお得に買い物",
  description: "食品ロス削減に貢献しながら、賢くお買い物ができるプラットフォーム",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}



import './globals.css'
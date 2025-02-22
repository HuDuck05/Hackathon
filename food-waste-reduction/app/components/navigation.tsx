"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Leaf, Receipt, Store, Users, User, Heart } from "lucide-react"

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken")
      setIsLoggedIn(!!token)
    }

    checkLoginStatus()
  }, [])

  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text">
            エコフード
          </h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/stores" className="text-sm font-medium hover:text-primary flex items-center gap-2">
            <Store className="h-4 w-4" />
            店舗検索
          </Link>
          <Link href="/receipts" className="text-sm font-medium hover:text-primary flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            レシート
          </Link>
          <Link href="/favorites" className="text-sm font-medium hover:text-primary flex items-center gap-2">
            <Heart className="h-4 w-4" />
            お気に入り
          </Link>
          {isLoggedIn ? (
            <Link href="/mypage" className="text-sm font-medium hover:text-primary flex items-center gap-2">
              <User className="h-4 w-4" />
              マイページ
            </Link>
          ) : (
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary flex items-center gap-2">
              <Users className="h-4 w-4" />
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Leaf, Store, Users, User, Heart, Package, Receipt } from "lucide-react"

export default function Navigation({ isAdmin = false }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken")
      setIsLoggedIn(!!token)
    }

    checkLoginStatus()
    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  }, [])

  return (
    <header className="bg-gradient-to-r from-green-50 to-blue-50 border-b sticky top-0 backdrop-blur-md z-50 shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href={isAdmin ? "/admin" : "/"} className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-2 shadow-md">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
            エコフード{isAdmin ? " 管理画面" : ""}
          </h1>
        </Link>
        <nav className="flex items-center gap-6">
          {isAdmin ? (
            <>
              <Link
                href="/admin/stores"
                className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
              >
                <Store className="h-4 w-4" />
                店舗検索
              </Link>
              <Link
                href="/admin/products/new"
                className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
              >
                <Package className="h-4 w-4" />
                商品投稿
              </Link>
              <Link
                href="/admin/login"
                className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
              >
                <Users className="h-4 w-4" />
                ログイン
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/stores"
                className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
              >
                <Store className="h-4 w-4" />
                店舗検索
              </Link>
              <Link
                href="/receipts"
                className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
              >
                <Receipt className="h-4 w-4" />
                レシート
              </Link>
              <Link
                href="/favorites"
                className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
              >
                <Heart className="h-4 w-4" />
                お気に入り
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/mypage"
                  className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
                >
                  <User className="h-4 w-4" />
                  マイページ
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm font-medium hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-green-100"
                >
                  <Users className="h-4 w-4" />
                  ログイン
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}


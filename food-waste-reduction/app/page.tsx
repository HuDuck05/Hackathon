"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Leaf, Camera, TrendingDown, Users, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"

export default function Home() {
  const featuresRef = useRef<HTMLElement>(null)
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFavoriteToggle = (id: number) => {
    setFavoriteProducts((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((productId) => productId !== id) : [...prevFavorites, id],
    )
  }

  const products = [
    {
      id: 1,
      name: "有機野菜セット",
      image: "/placeholder.svg?height=200&width=300",
      originalPrice: 1500,
      discountedPrice: 1200,
    },
    {
      id: 2,
      name: "地元産フルーツミックス",
      image: "/placeholder.svg?height=200&width=300",
      originalPrice: 2000,
      discountedPrice: 1600,
    },
    {
      id: 3,
      name: "手作りパン詰め合わせ",
      image: "/placeholder.svg?height=200&width=300",
      originalPrice: 1000,
      discountedPrice: 800,
    },
    {
      id: 4,
      name: "季節の魚介類セット",
      image: "/placeholder.svg?height=200&width=300",
      originalPrice: 2500,
      discountedPrice: 2000,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative overflow-hidden py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">地球にやさしい買い物を</Badge>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  食品ロスを減らしながら、
                  <span className="bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text">
                    賢くお得に
                  </span>
                  買い物しよう
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  レシートをスキャンして、あなたに最適なお買い物提案を受け取りましょう。
                  地域の店舗と協力して、食品ロス削減に貢献します。
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                    asChild
                  >
                    <Link href="/auth/register">今すぐ始める</Link>
                  </Button>
                  <Button size="lg" variant="outline" onClick={scrollToFeatures}>
                    詳しく見る
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20" />
                <img
                  src="/placeholder.svg?height=300&width=450"
                  alt="食品ロス削減イメージ"
                  className="rounded-lg shadow-2xl relative z-10 w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-20 container">
          <h2 className="text-3xl font-bold text-center mb-12">簡単3ステップで始められます</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="h-8 w-8 text-orange-500" />,
                title: "レシートをスキャン",
                description: "お買い物のレシートをカメラで撮影するだけ",
              },
              {
                icon: <TrendingDown className="h-8 w-8 text-blue-500" />,
                title: "お得な商品をチェック",
                description: "AIがあなたの購買履歴から最適な商品を提案",
              },
              {
                icon: <Leaf className="h-8 w-8 text-green-500" />,
                title: "お得にお買い物",
                description: "近くの店舗で環境に優しいお買い物を",
              },
            ].map((step, i) => (
              <Card key={i} className="relative group hover:shadow-lg transition-all">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
                  {i + 1}
                </div>
                <CardHeader>
                  <div className="mb-4 p-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg w-fit group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-orange-50">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-700 p-2 rounded-lg">
                <TrendingDown className="h-6 w-6" />
              </span>
              本日のお得な商品
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  originalPrice={product.originalPrice}
                  discountedPrice={product.discountedPrice}
                  isFavorite={favoriteProducts.includes(product.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-orange-50 to-green-50">
          <div className="container text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">SDGs達成に向けて</Badge>
            <h2 className="text-3xl font-bold mb-6">私たちの取り組み</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              食品ロスの削減を通じて持続可能な社会の実現を目指しています。
              あなたのお買い物が、地球環境の保護につながります。
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    環境負荷低減
                  </CardTitle>
                </CardHeader>
                <CardContent>年間約600万トンの食品ロスを削減することを目指しています。</CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-blue-600" />
                    地域社会への貢献
                  </CardTitle>
                </CardHeader>
                <CardContent>地域の小売店と協力し、フードロス削減と地域活性化を実現します。</CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    消費者支援
                  </CardTitle>
                </CardHeader>
                <CardContent>賢い消費選択をサポートし、家計の節約に貢献します。</CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


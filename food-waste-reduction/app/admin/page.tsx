import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, Store, BarChart, Leaf } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg p-2">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text">
              エコフード 管理画面
            </h1>
          </Link>
        </div>
      </header>
      <div className="container py-12">
        <h2 className="text-3xl font-bold mb-8">管理者ダッシュボード</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                商品管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">商品の追加、編集、削除を行います。</p>
              <Button className="w-full" asChild>
                <Link href="/admin/products">商品一覧を見る</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                店舗管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">店舗情報の管理や在庫状況の確認を行います。</p>
              <Button className="w-full" asChild>
                <Link href="/admin/stores">店舗一覧を見る</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                売上レポート
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">売上データや食品ロス削減の効果を確認します。</p>
              <Button className="w-full" asChild>
                <Link href="/admin/reports">レポートを見る</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


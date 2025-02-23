"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navigation from "@/app/components/navigation"

interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: "在庫あり" | "在庫なし" | "入荷待ち"
}

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // This would typically come from an API call
  const products: Product[] = [
    { id: 1, name: "有機野菜セット", price: 1200, stock: 50, status: "在庫あり" },
    { id: 2, name: "地元産フルーツミックス", price: 1600, stock: 30, status: "在庫あり" },
    { id: 3, name: "手作りパン詰め合わせ", price: 800, stock: 0, status: "入荷待ち" },
    { id: 4, name: "季節の魚介類セット", price: 2000, stock: 15, status: "在庫あり" },
    { id: 5, name: "オーガニックジュース", price: 500, stock: 0, status: "在庫なし" },
  ]

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <Navigation isAdmin={true} />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">商品管理</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="商品を検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> 新規商品追加
            </Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>商品名</TableHead>
              <TableHead>価格</TableHead>
              <TableHead>在庫数</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>¥{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/products/${product.id}`}>編集</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}


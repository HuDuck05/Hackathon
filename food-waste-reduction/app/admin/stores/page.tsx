"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navigation from "@/app/components/navigation"

interface Store {
  id: number
  name: string
  address: string
  phone: string
  status: "営業中" | "休業中" | "準備中"
}

export default function AdminStoresPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // This would typically come from an API call
  const stores: Store[] = [
    {
      id: 1,
      name: "エコフード マルシェ 渋谷店",
      address: "東京都渋谷区渋谷1-1-1",
      phone: "03-1234-5678",
      status: "営業中",
    },
    {
      id: 2,
      name: "エコフード マルシェ 新宿店",
      address: "東京都新宿区新宿2-2-2",
      phone: "03-2345-6789",
      status: "営業中",
    },
    {
      id: 3,
      name: "エコフード マルシェ 池袋店",
      address: "東京都豊島区池袋3-3-3",
      phone: "03-3456-7890",
      status: "休業中",
    },
    {
      id: 4,
      name: "エコフード マルシェ 上野店",
      address: "東京都台東区上野4-4-4",
      phone: "03-4567-8901",
      status: "準備中",
    },
  ]

  const filteredStores = stores.filter((store) => store.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <Navigation isAdmin={true} />
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-5">店舗管理</h1>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="店舗を検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button asChild>
              <Link href="/admin/stores/new">
                <Plus className="mr-2 h-4 w-4" /> 新規店舗追加
              </Link>
            </Button>
          </div>
          <Table className="w-full bg-white rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>店舗名</TableHead>
                <TableHead>住所</TableHead>
                <TableHead>電話番号</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.id}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>{store.phone}</TableCell>
                  <TableCell>{store.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/stores/${store.id}`}>編集</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}


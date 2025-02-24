"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/app/components/navigation"
import { FormEvent } from 'react'

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    let payload: any = {};
    const formData = new FormData(event.currentTarget)
    for (var [key, value] of formData.entries()) { 
      payload[key] = value
    }

    // Here you would typically send the form data to your API
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  
    if (!res.ok) {
      throw new Error("Failsed to add product");
    }
    setIsLoading(false)
    router.push("/admin/products")
  }

  return (
    <>
      <Navigation isAdmin={true} />
      <div className="container mx-auto py-10">
        <Link href="/admin/products" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          商品一覧に戻る
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>新規商品登録</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">商品名</Label>
                <Input id="name" name='name' required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">商品説明</Label>
                <Textarea id="description" name='description' required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">価格</Label>
                  <Input id="price" name='price' type="number" min="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">在庫数</Label>
                  <Input id="stock" name="stock" type="number" min="0" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select required>
                  <SelectTrigger id="status" name="status">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="在庫あり">在庫あり</SelectItem>
                    <SelectItem value="在庫なし">在庫なし</SelectItem>
                    <SelectItem value="入荷待ち">入荷待ち</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading} >
                {isLoading ? "登録中..." : "商品を登録"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}


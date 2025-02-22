"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, Package, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPage() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">商品投稿</h1>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>投稿のコツ</AlertTitle>
          <AlertDescription>
            商品の画像は明るく鮮明なものを使用してください。商品説明は具体的かつ魅力的に書きましょう。
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                カメラで撮影
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-40 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600">
                <Camera className="h-8 w-8 mb-2" />
                <span>カメラを起動</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                画像をアップロード
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-muted"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">ドラッグ＆ドロップ、またはクリックしてアップロード</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              商品情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="productName">商品名</Label>
                <Input id="productName" placeholder="商品名を入力してください" />
              </div>
              <div>
                <Label htmlFor="productDescription">商品説明</Label>
                <Textarea id="productDescription" placeholder="商品の詳細な説明を入力してください" />
              </div>
              <div>
                <Label htmlFor="originalPrice">元の価格</Label>
                <Input id="originalPrice" type="number" placeholder="元の価格を入力してください" />
              </div>
              <div>
                <Label htmlFor="discountedPrice">割引後の価格</Label>
                <Input id="discountedPrice" type="number" placeholder="割引後の価格を入力してください" />
              </div>
              <div>
                <Label htmlFor="expirationDate">消費期限</Label>
                <Input id="expirationDate" type="date" />
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600">
                商品を投稿する
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


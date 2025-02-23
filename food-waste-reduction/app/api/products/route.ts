import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// 商品の型定義
interface Product {
  name: string;
  price: number;
  stock: number;
  status: "在庫あり" | "在庫なし" | "入荷待ち";
}

// 商品登録API（POST）
export async function POST(req: Request) {
  const body = await req.json()
  const { name, price, stock, status } = body
  console.log(body)
  try {
    const newProduct = await prisma.product.create({
        data: {
          name,
          price: Number(price),
          stock: Number(stock),
          status
        },
    })
    // バリデーション
    if (!newProduct.name || typeof newProduct.price !== "number" || typeof newProduct.stock !== "number") {
      return NextResponse.json({ message: "無効なデータです" }, { status: 400 });
    }
    return NextResponse.json({ message: "商品を登録しました", product: newProduct }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "サーバーエラー", error }, { status: 500 });
  }
}

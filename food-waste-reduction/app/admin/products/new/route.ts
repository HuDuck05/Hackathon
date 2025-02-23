import { NextResponse } from "next/server";

// 商品の型定義
interface Product {
  name: string;
  price: number;
  stock: number;
  status: "在庫あり" | "在庫なし" | "入荷待ち";
}

// 商品登録API（POST）
export async function POST(req: Request) {
  try {
    const body: Product = await req.json();

    // バリデーション
    if (!body.name || typeof body.price !== "number" || typeof body.stock !== "number") {
      return NextResponse.json({ message: "無効なデータです" }, { status: 400 });
    }
    if (!["在庫あり", "在庫なし", "入荷待ち"].includes(body.status)) {
      return NextResponse.json({ message: "無効なステータスです" }, { status: 400 });
    }

    // ダミーデータとして商品を登録（本番環境ではDBに保存）
    const newProduct: Product = { ...body };

    return NextResponse.json({ message: "商品を登録しました", product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "サーバーエラー", error }, { status: 500 });
  }
}

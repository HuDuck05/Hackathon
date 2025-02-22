import Link from "next/link"
import { ArrowLeft, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MapPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          ホームに戻る
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>店舗への案内</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">ここに地図が表示されます</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">受け取り店舗</h3>
              <p className="text-muted-foreground">エコフード マルシェ 渋谷店</p>
              <p className="text-muted-foreground">東京都渋谷区渋谷1-1-1</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">受け取り可能時間</h3>
              <p className="text-muted-foreground">2024年2月23日 10:00 - 20:00</p>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              size="lg"
            >
              <Navigation className="mr-2 h-4 w-4" />
              ナビゲーションを開始
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              ナビゲーションを開始すると、お使いの端末の地図アプリが起動します。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


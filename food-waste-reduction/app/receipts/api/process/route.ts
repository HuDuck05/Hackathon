import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    // リクエストのボディを formData として取得（Node.js 18+ で利用可能）
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    }

    // アップロードされたファイルを一時フォルダへ保存
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempPath = "/tmp/" + file.name;
    fs.writeFileSync(tempPath, buffer);

    // プロジェクトルートにある Python スクリプト（例: test.py）のパスを生成
    const scriptPath = path.join(process.cwd(), "test.py");

    // Python スクリプトを実行し、画像ファイルのパスを引数として渡す
    return new Promise((resolve) => {
      exec(`python ${scriptPath} "${tempPath}"`, (error, stdout, stderr) => {
        // 使用後、一時ファイルを削除する
        fs.unlink(tempPath, (err) => {
          if (err) console.error("一時ファイル削除エラー:", err);
        });

        if (error) {
          console.error("Python 実行エラー:", error);
          return resolve(NextResponse.json({ error: "画像処理中にエラーが発生しました" }, { status: 500 }));
        }

        // Python スクリプトの出力結果（stdout）を JSON として返す
        resolve(NextResponse.json({ result: stdout }));
      });
    });
  } catch (error) {
    console.error("APIエラー:", error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}

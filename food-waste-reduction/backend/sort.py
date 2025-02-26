import json
import sys

def print_product_data():
    """products.json を読み込んでコンソールに出力"""
    try:
        with open("backend/products.json", "r", encoding="utf-8") as f:
            data = json.load(f)  # `products.json` をロード

        # ✅ `sys.stdout.reconfigure(encoding="utf-8")` を追加 (Windows の場合)
        sys.stdout.reconfigure(encoding="utf-8")

        print("📦 Python: 受け取ったデータ")
        
        print("\n✅ Products:")
        for product in data["products"]:
            print(f"ID: {product['id']}, Name: {product['name']}")

        print("\n✅ Items:")
        for item in data["items"]:
            print(f"ID: {item['id']}, OCR結果:")

            try:
                # `item['name']` を JSON 文字列として解析
                parsed_name = json.loads(item['name'])
                if "ocr_result" in parsed_name:
                    for ocr in parsed_name["ocr_result"]:
                        print(f"  - {ocr}")  # OCR結果をリストとして表示
                else:
                    print(f"  ⚠️ 'ocr_result' キーが見つかりません: {parsed_name}")
            except json.JSONDecodeError:
                print(f"  ⚠️ JSONデコードエラー: {item['name']}")

    except FileNotFoundError:
        print("❌ products.json が見つかりません")

if __name__ == "__main__":
    print_product_data()

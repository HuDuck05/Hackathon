import json
import time
import requests
from rapidfuzz import fuzz
from openai import AzureOpenAI

def initialize_openai_client(endpoint, subscription_key, api_version="2024-05-01-preview"):
    """Azure OpenAI Service クライアントを初期化する"""
    return AzureOpenAI(
        azure_endpoint=endpoint,
        api_key=subscription_key,
        api_version=api_version
    )

def perform_ocr(endpoint, subscription_key, image_path):
    """Azure Computer Vision Read API を使用して OCR を実行"""
    analyze_url = f"{endpoint}vision/v3.2/read/analyze"

    # 画像をバイナリモードで読み込む
    with open(image_path, "rb") as image_file:
        image_data = image_file.read()

    headers = {
        "Ocp-Apim-Subscription-Key": subscription_key,
        "Content-Type": "application/octet-stream"
    }

    # 画像を送信して OCR 処理をリクエスト
    response = requests.post(analyze_url, headers=headers, data=image_data)
    response.raise_for_status()

    # 非同期処理のため、Operation-Location から結果取得 URL を取得
    operation_url = response.headers["Operation-Location"]

    # 結果取得のポーリング処理
    while True:
        result_response = requests.get(operation_url, headers=headers)
        result_response.raise_for_status()
        analysis = result_response.json()

        if analysis.get("status") == "succeeded":
            break
        time.sleep(1)  # 1秒待機して再試行

    # OCR 解析結果を取得
    recognized_text = []
    if analysis.get("analyzeResult"):
        for read_result in analysis["analyzeResult"].get("readResults", []):
            for line in read_result.get("lines", []):
                recognized_text.append(line["text"])

    return "\n".join(recognized_text)

def extract_items_from_ocr(client, deployment, ocr_text):
    """OCR の結果から商品名のみを抽出"""
    messages = [
        {
            "role": "system",
            "content": (
                "あなたはレシートのOCR結果から商品の名前のみを抽出するエキスパートです。"
                "与えられたテキスト中に含まれる商品の名前を抽出し、以下の JSON 形式で出力してください。\n"
                '{"items": ["商品名1", "商品名2", ...]}\n'
                "余計な説明文やテキストは一切出力しないでください。"
            )
        },
        {
            "role": "user",
            "content": f"以下はOCRで取得したレシートの結果です。\n{ocr_text}\n"
        }
    ]

    completion = client.chat.completions.create(
        model=deployment,
        messages=messages,
        max_tokens=800,
        temperature=0.7,
        top_p=0.95
    )

    result_text = completion.choices[0].message.content.strip()
    return json.loads(result_text)["items"]

def calculate_similarity(item_name, ocr_list):
    """商品名の類似度を計算"""
    return max([fuzz.partial_ratio(item_name, ocr) for ocr in ocr_list])

def sort_items_by_similarity(sell_items, ocr_items):
    """OCR で取得した商品名と売られている商品の類似度を計算し、並び替え"""
    for item in sell_items:
        item["similarity"] = calculate_similarity(item["name"], ocr_items)

    sorted_items = sorted(sell_items, key=lambda x: x["similarity"], reverse=True)
    
    # 類似度情報を削除
    return [{"id": item["id"], "name": item["name"]} for item in sorted_items]

if __name__ == "__main__":
    # Azure の情報（適宜変更）
    # Azure Computer Visionのサブスクリプションキーとエンドポイントを設定
    subscription_key_ocr = "XXXX"
    endpoint_ocr = "XXXXX"  # 例: "https://<your-region>.api.cognitive.microsoft.com/"

    # Azure OpenAI のサブスクリプションキーとエンドポイントを設定
    endpoint = "XXXX"     # 例: "https://<your-resource-name>.openai.azure.com/"
    deployment = "gpt-4"    # デプロイメント名（モデル名）
    subscription_key = "XXXX" # キー

    # OCR で読み取る画像のパス
    image_path = "Receipt.jpg"

    # クライアントの初期化
    client = initialize_openai_client(endpoint, subscription_key)

    # OCR を実行
    ocr_result_text = perform_ocr(endpoint_ocr, subscription_key_ocr, image_path)
    print(f"OCR認識結果:\n{ocr_result_text}\n")

    # OCR 結果から商品名を抽出
    ocr_items = extract_items_from_ocr(client, deployment, ocr_result_text)
    print(f"抽出された商品名:\n{ocr_items}\n")

    # 売られている商品リスト
    sell_items = [
        {"id": 1, "name": "りんご"},
        {"id": 2, "name": "カフェラテ"},
        {"id": 3, "name": "バゲット"},
        {"id": 4, "name": "抹茶"},
        {"id": 5, "name": "グラタン"},
        {"id": 6, "name": "パエリア"},
        {"id": 7, "name": "オレンジジュース"},
        {"id": 8, "name": "寿司"},
        {"id": 9, "name": "サーモン"},
        {"id": 10, "name": "トマト"}
    ]

    # 類似度を計算して並び替え
    sorted_result = sort_items_by_similarity(sell_items, ocr_items)

    # 結果を出力
    print("類似度順に並び替えた結果:")
    print(json.dumps(sorted_result, indent=2, ensure_ascii=False))

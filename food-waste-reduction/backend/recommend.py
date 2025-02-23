import json
import time
import sys
import requests
import os
from rapidfuzz import fuzz
from openai import AzureOpenAI
from dotenv import load_dotenv

# .env ファイルを読み込む
load_dotenv()

# 環境変数から値を取得
OCR_SUBSCRIPTION_KEY = os.getenv("OCR_SUBSCRIPTION_KEY")
OCR_ENDPOINT = os.getenv("OCR_ENDPOINT")
OPENAI_ENDPOINT = os.getenv("OPENAI_ENDPOINT")
OPENAI_SUBSCRIPTION_KEY = os.getenv("OPENAI_SUBSCRIPTION_KEY")


import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')


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

    with open(image_path, "rb") as image_file:
        image_data = image_file.read()

    headers = {
        "Ocp-Apim-Subscription-Key": subscription_key,
        "Content-Type": "application/octet-stream"
    }

    response = requests.post(analyze_url, headers=headers, data=image_data)
    response.raise_for_status()

    operation_url = response.headers["Operation-Location"]

    while True:
        result_response = requests.get(operation_url, headers=headers)
        result_response.raise_for_status()
        analysis = result_response.json()
        if analysis.get("status") == "succeeded":
            break
        time.sleep(1)

    recognized_text = []
    if analysis.get("analyzeResult"):
        for read_result in analysis["analyzeResult"].get("readResults", []):
            for line in read_result.get("lines", []):
                recognized_text.append(line["text"])

    return "\n".join(recognized_text)

def extract_items_from_ocr(client, deployment, ocr_text):
    """OCR の結果から商品名のみを抽出する"""
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
    return [{"id": item["id"], "name": item["name"]} for item in sorted_items]

if __name__ == "__main__":
    # Azure の情報（実際の値に置き換えてください）
    subscription_key_ocr = OCR_SUBSCRIPTION_KEY
    endpoint_ocr = OCR_ENDPOINT  # 例: "https://<your-region>.api.cognitive.microsoft.com/"
    endpoint = OPENAI_ENDPOINT     # 例: "https://<your-resource-name>.openai.azure.com/"
    deployment = "gpt-4"    # デプロイメント名（モデル名）
    subscription_key = OPENAI_SUBSCRIPTION_KEY

    # コマンドライン引数から画像パスを取得（TS 側でファイル名を決定して渡す）
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python test.py <image_path>"}))
        sys.exit(1)

    image_path = sys.argv[1]

    try:
        ocr_result_text = perform_ocr(endpoint_ocr, subscription_key_ocr, image_path)
        ocr_items = extract_items_from_ocr(initialize_openai_client(endpoint, subscription_key), deployment, ocr_result_text)

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

        sorted_result = sort_items_by_similarity(sell_items, ocr_items)

        # まとめて JSON を出力
        result = {
            "ocr_result": ocr_items,
            "sorted_result": sorted_result
        }
        print(json.dumps(result, indent=2, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

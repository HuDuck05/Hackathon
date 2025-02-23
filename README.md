# Hackathon

## How to set up? (Frontend)

### Step 1

### Node.js のインストール

Link: https://nodejs.org/ja/

---

### Step 2

インストールされているかの確認として、CLI で以下のコマンドを実行

```
node -v
```

`v22.xx.x`と表示されれば OK

また、npm のバージョンを確認する場合は、以下のコマンドを実行

```
npm --version
```

---

### Step 3

### npm のインストール

npm とは Node Package Manager の略  
npm のインストール

```
sudo npm install -g npm
```

windows

```
npm install -g npm
```

npm も`npm -v`でインストールができているか確認できる。

---

### Step 4

### local サーバーの立ち上げ

food-waste-reduction ディレクトリで次のコマンドを実行

```
npm run dev
```

立ち上げに成功すれば、localhost:3000 と表示されるので  
command を押しながらクリックするとブラウザに飛べたら完了

## How to set up? (Backend)

## 🛠 動作確認

- Python 3.11.7

## 🚀 インストール

以下のコマンドを実行して、必要なパッケージをインストールしてください。

```sh
pip install requests rapidfuzz openai
```

## 📌 使い方 (Usage)

### 1. API キーの設定

このスクリプトは OpenAI API を使用するため、`OPENAI_API_KEY` を環境変数として設定するか、スクリプト内に直接記述する必要があります。

#### 環境変数として設定する場合:

```sh
export OPENAI_API_KEY="your_api_key_here"
```

#### スクリプト内に直接記述する場合:

```python
import openai

openai.api_key = "your_api_key_here"
```

### 2. スクリプトの実行

以下のコマンドを実行可能。

```sh
python recommend.py
```

TEST
# プロジェクト名

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 概要

このプロジェクトは、React を使用して作成された[アプリの簡単な説明]です。

## デモ

https://real-sns-front-end.vercel.app/

## 特徴

- MongoDB にてユーザ情報や投稿情報を保存して管理しています。
- バックエンドで NodeJs の Express フレームワークで API を作成しています。
- フロントエンドで React を使用して Axios を使って API を管理しています。

## 依存関係

このプロジェクトは以下の主要なライブラリに依存しています：

- React
- React Router
- Axios (API 呼び出しに使用)

## 前提条件

このプロジェクトをローカルで実行するには、以下が必要です：

- Node.js (バージョン X.X.X 以上)
- npm または yarn

## セットアップ

以下の手順に従ってプロジェクトをセットアップします：

1. リポジトリをクローンします。

   ```sh
   git clone https://github.com/hellotksan/real-sns-front-end.git
   cd real-sns-front-end
   ```

2. 依存関係をインストールします。

   ```sh
   npm install
   ```

   または

   ```sh
   yarn install
   ```

3. 開発サーバーを起動します。

   ```sh
   npm start
   ```

   または

   ```sh
   yarn start
   ```

4. ブラウザで `http://localhost:3000` を開き、アプリを確認します。

## typescript の自動コンパイル

```sh
tsc --watch
```

又は

```sh
ts-node-dev --respawn src/index.ts
```

## 使用方法

このセクションでは、アプリの主要な機能や使い方を説明します。

- ユーザの管理
- 投稿の管理

## ディレクトリ構造

プロジェクトのディレクトリ構造は以下の通りです：

```java
├── public
│ ├── assets
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ ├── pages
│ ├── state
│ ├── App.js
│ ├── index.js
│ └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

# バージョン確認
以下が必要なので、各自インストールをしておいてください。

 - Docker (Version20.10.12で動作確認済)
 - Node.js (v16.18.1)
 - npm (v8.19.2)

```
docker -v # Dockerのバージョンを確認
node -v # nodeのバージョンを確認
npm -v #  npmのバージョンを確認
```

# larashop-server

Larashopのサーバーサイド

```
cd larashop-server

# Docker起動中であることを確認

./vendor/bin/sail up # Dockerインスタンスの起動など

open http://localhost # サーバーが立ち上がったことを確認
open http://localhost:8025 # mailhogの確認
open http://localhost:8080 # phpmyadminの確認。sail passwordでログイン
```

このディレクトリにソースコード追記と解説をしながら、udemyコースを進めていきます。

# larashop-nextjs

Larashopサービスサイトのフロントエンド

```
cd larashop-nextjs

npm install # npmモジュールのインストール
npm run build # Next.jsのソースコードのビルド
npm run start

open http://localhost:3000 # フロントエンド表示されることを確認
```
Next.jsで実装済で、このディレクトリのソースコードを変更する必要はないです。
ただし、udemyコースの途中にても説明しますが、Stripeアカウントを取得した場合は .env.local にStripeアカウント情報を追記してもらう想定です。

# larashop-admin-nextjs

Larashop管理画面のフロントエンド

```
cd larashop-admin-nextjs

npm install # npmモジュールのインストール
npm run build # Next.jsのソースコードのビルド
npm run start

open http://localhost:4000 # フロントエンド表示されることを確認
```

Next.jsで実装済で、このディレクトリのソースコードを変更する必要はないです。



# Chart Tool
グラフを作成するツールです。

# Architecture
 - Frontend: React (TypeScript) + Redux + RTK
 - Server: Firebase Realtime Database
 - Auth: Firebase Auth
 - Image Storage: Firebase Storage
 - Hosting: Firebase Hosting

# Major Library
React Spreadsheet
https://github.com/iddan/react-spreadsheet

Google Charts
https://www.react-google-charts.com/examples

React Icons
https://react-icons.github.io/react-icons/

# Requirement
package.jsonを参照

# Source Code
ソースコードの入手
```bash
git clone https://github.com/~/~
```

# Installation
ライブラリーの入手
```bash
npm install
```

# Local Run
ローカル起動
http://localhost:9999
```bash
npm run dev
```

# Build
配信用ビルド
```bash
npm run build
```

# Deploy
Firebase Hostingへのデプロイ
事前にFirebaseへのCLIログイン、紐付けが必要
https://firebase.google.com/docs/hosting/multisites?hl=ja

```bash
firebase deploy --only hosting
```

# Dir
- app -> 各種データ関連のファイルを格納
  - db.ts -> Firebase RealTime DatabaseへのWebSocket連携や画像ストレージへのアクセス（Firebaseへ接続するためのアカウント情報を格納するために別途、firebaseConfigの定義が必要）
  - func.ts -> 各種汎用系メソッドの集約
  - types.ts -> 各種タイプの定義
  - hooks.ts, store.ts -> RTKのデフォルト、基本触らない
- components -> 各種コンポーネントファイル
- css -> style系はApp.scss一つのファイルにまとめた
- features -> 各種ストアのデータファイル
  - ChartList.ts -> Firebase Realtime Databaseからとってきたデータを格納
  - ChartData.ts -> 状況によって、ChartList.tsの個別Chartのデータを取り出して格納
  - UserData.ts -> ユーザーのログイン情報、ステータスの格納
- pages -> 各ページの大本のファイル
- App.tsx, index.tsx -> React基本仕様のまま
- webpack.config.js -> ローカル起動時やビルド時の設定
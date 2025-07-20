## 使用できるスクリプト

### 特定のサンプルケースだけ実行する場合
```ts
npm run log -- <コンテスト名> <問題アルファベット> [サンプル番号]

// 例:
npm run log -- abc350 a 2
```

•abc350/a/tests/sample-2.in を使って abc350/a/main.js を実行します。
•省略した場合は sample-1.in が使われます

 ### テストを実行する場合
``` ts
npm run log -- <コンテスト名> <問題> [サンプル番号]

// 例:
npm run log -- abc350 a 2
```

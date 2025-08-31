## 使用できるスクリプト

### 特定のサンプルケースだけ実行する場合
```ts
npm run log -- <コンテスト名> <問題アルファベット> [サンプル番号]

// 例:
npm run log -- abc350 a 2
```


 ### テストを実行する場合
``` ts
npm run test -- <コンテスト名> <問題> [サンプル番号]

// 例:
npm run test -- 350 a 
```
## accコマンドで問題をダウンロード
ojコマンドは不安定のためaccを使用する
例:
```ts
acc new abc351
```
## ログインができない場合の対処
こちらの記事を参照してCookieをsession.jsonに保存すると良い

https://kaiyou9.com/acc_and_oj_login_failed/

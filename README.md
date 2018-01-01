[![CircleCI](https://circleci.com/gh/38fanjia/my-botkit/tree/master.svg?style=svg)](https://circleci.com/gh/38fanjia/my-botkit/tree/master)

# my-botkit 🤖

[howdyai/botkit](https://github.com/howdyai/botkit) を利用した Slackbot です。

## Getting Started

### 準備

* Node.js 9.x
  * 使用するバージョンは .node-version に記載しています
* Slack の Bot Token
* Twitter Apps の Key 及び Access Token 情報
* Heroku のアカウント

### インストール

my-botkit をローカルにクローンし、 package.json に記載された package をインストールする。

```
git clone git@github.com:38fanjia/my-botkit.git
npm install
```

### 実行

環境変数を設定し、 Bot を起動する。

```
npm run start
```

#### 環境変数

| | |
|---|---|
| TOKEN | Slackbot の Token |
| CONSUMER_KEY | Twitter の Consumer Key |
| CONSUMER_SECRET | Twitter の Consumer Secret|
| ACCESS_TOKEN_KEY | Twitter の Access Token Key |
| ACCESS_TOKEN_SECRET | Twitter の Access Token Secret |
| STREAM_FILTER | `Twitter Stream` で使用する検索キーワード |


## Skills

以下機能を実装しています。

* **Hello**
  * リアクションと挨拶を返す( [howdyai/botkit](https://github.com/howdyai/botkit) のサンプルコードを参考にしています )
* **Twitter Stream**
  * 検索キーワードを指定し、結果を Slack へ Post する

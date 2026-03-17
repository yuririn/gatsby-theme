---
title: Gatsby アップグレード時にハマりました
date: 2021-12-12
modifiedDate: 2026-03-20
hero: thumbnail/2020/entry401-v4.jpg
pageType: blog
cateId: 'web-developer'
tags: ["Gatsby","React","JavaScript"]
description: ウェブサイトのリニューアルがようやく終わりました。WebP対応しつつv3にアップグレードする予定たったのですが、Gatsby cliでのインストールのエラーでハマってできませんでした。v2からv4にアップグレードでハマって困っている人へ私が解決できた方法をご紹介します。
faq:
  - q: "Gatsby v4/v5 アップグレード時に 'gatsby new' がエラーで失敗します。"
    a: "原因の多くは **Node.jsのバージョン不足** です。v4ならNode 14.15以上、v5ならNode 18以上が必須です。インストール前に `node -v` でバージョンを確認し、公式の [Minimal Node.js version](#単純にnpmのバージョンが足りなかったことが発覚) を満たしているかチェックしてください。npmのバージョンも8以上が推奨されます。"
  - q: "macOSで Node.js のバージョンを切り替えても反映されない場合は？"
    a: "nodebrewなどでインストールしても反映されない場合、パス（PATH）の設定が古い可能性があります。`.zshrc` や `.bash_profile` に正しくシンボリックリンクが設定されているか確認しましょう。詳細は [macのnode環境を作り直す](#単純にnpmのバージョンが足りなかったことが発覚) セクションで解説しています。"
  - q: "Gatsbyのビルドエラーが解決しない時、まず試すべきことは？"
    a: "依存関係のキャッシュが原因でエラーが起きることがあります。`gatsby clean` コマンドを実行して `.cache` と `public` フォルダを削除し、さらに `npm cache clean --force` でnpm側のキャッシュもクリアしてみてください。本記事の [キャッシュクリアの手順](#おまけ古いnodeでもモジュールを追加したらgatsbyjsが構築できた) が参考になります。"
  - q: "NetlifyでGatsby v4以降をデプロイする際の注意点は？"
    a: "Netlifyの管理画面（Environment variables）で、`NODE_VERSION` をローカル環境と同じバージョン（例: 18）に指定する必要があります。これを忘れるとビルド時にバージョンエラーが発生します。デプロイの基本手順は [Netlifyへのデプロイ](#netlify-にデプロイして動くか確認) をご覧ください。"
---
お久しぶりです!!!念願の久々更新です。<br>2021年7月から進めていたウェブサイトのリニューアルがようやく終わりました！涙<br>WebP対応しつつv3にアップグレードする予定たったのですが、

starter kit のインストールのエラーでハマってできませんでした。<br>この記事はGatsbyでブログなどを運用していてv4にアップグレードしたいけどエラーでハマってインストールできない方への記事です。<br>私がどうやってエラーを解決したかをご紹介します。

<prof></prof>

v5へのアップグレード方法はこちら。
<card slug="entry519"></card>


## Gatsby v4がリリース！

![Gatsby v4がリリース！](./images/12/entry477-0.jpg)
Gatsby v4がリリースされましたね！(12日前とあるので2021/12/1リリースかな？)

当ブログも半年越しにようやくv4にと重い腰をあげることになりました！

> Gatsby is a modern web framework for blazing fast websites.<br>
> Gatsby 高速なウェブサイトを実現するためのフレームワークです

インストールしようにもコケる。猶予が土日しかなかったので焦りもあって、間違った方法ではありますがなんとかアップグレードにこぎつけました。
### Gatsbyブログサイト移行物語（現在12記事）もv4対応しました！

昨年から移行を機に書いている「Gatsbyブログサイト移行物語」もv4対応しました。v4から新たにGatsbyでブログを始めたい人方は「[インストールからデプロイまで](/blogs/entry401/)」からお読みください。

一覧出力、ページネーション、サムネイルの出力方法など紹介しています。

[Gatsby関記事](/blogs/tags/Gatsby/)も併せてどうぞ。

### アップグレード方法
**v4でgatsby starter blog のインストールが走らなかったのは単にnpmのバージョンが低いだけだと発覚し2021/12/12に執筆した記事を大幅に修正しています。**

この記事では私の反省も踏まえて、正しい方法をご紹介します。

## 単純にnpmのバージョンが足りなかったことが発覚

> #### Minimal Node.js version 14.15.0
> We are dropping support for Node 12 as a new underlying dependency (lmdb-store) is requiring >=14.15.0. See the main changes in Node 14 release notes.<br>
> [Migrating from v3 to v4](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/)
*14.15.0以上じゃないと動きません*とちゃんと公式に書いてあるじゃん。。。

npm7を使う場合は結構面倒で、8が好ましいです。

Homebrewから最新のnodeをダウンロードして、切り替えます。

```bash:title=コマンド
nodebrew install-binary latest
nodebrew ls
```

使いたいバージョンを選択。

![Homebrewから使いたいバージョンを選択](./images/12/entry477-2.jpg)
```bash:title=コマンド
nodebrew use v17.2.0
```
こちらの記事も参考にしました。

[macのnodeのバージョンが上がらない!?ブラックボックス化したmacのnode環境を作り直してみる。](https://blog.websandbag.com/entry/2018/01/21/000000)

補足。上記記事中にはシンボリックを貼る場所は`.bashrc`とありますが、私の環境下では`.bash_profile`に設定してあります。人によって環境が違うので気をつけてください。<br>
以下も参考に。

[.bashrc|「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word13649.html)

インストールされているか確認します（sudoいるかもです）。

```bash:title=コマンド
npm ls -g
```

### gatsby-cli をインストール
バージョンアップ後の nodebrew には gatsby-cli がないので改めてインストールします。

```bash:title=コマンド
npm i gatsby-cli -g
```

グローバルにインストールされているモジュールを確認。

```bash:title=コマンド
npm ls -g
```

![グローバルにインストールされているモジュール](./images/12/entry477-3.jpg)

### おまけ・古いnodeでもモジュールを追加したらgatsbyJSが構築できた

古いnodeでもモジュールを追加したらgatsbyJSが構築できます。

私は最初この方法で対応してしまいましたが、後からnodeをアップグレードすればいいだけと発覚しました。

手順だけ残しておきます。

gatsby cli を v4 用にアップグレードしたもののエラーをもとにググったら、グローバルの node module がいくつか足りないみたい。

```bash:title=コマンド
sudo npm -g i sharp
sudo npm -g i cordova-res
```

それでも走らないので、npmのキャッシュを強制的にクリア。
<br>キャッシュで不具合が起きてたのかはちょっと不明です。

```bash:title=コマンド
npm cache clean --force
```

これで走らなければ以下も入れてみてください。

```bash:title=コマンド
sudo npm install node-addon-api -g
sudo npm i
```

上記を入れた際にもキャッシュクリアしてください。

```bash:title=コマンド
npm cache clean --force
```

これで古いNodeでも走るようになりました。詳しくは調べてませんが、新しいNodeでの不足分のモジュールを入れたから動いたのだろうと思っています。

その後、すでにv4に対応済みの [gatsby starter blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/) を入れてみます。

```bash:title=コマンド
npx gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

## Netlify にデプロイして動くか確認
このブログは Netlify を使ってます。

別にgithubでリポジトリを立てて、一旦デプロイして動くか確認。<br>ちゃんと動きました！！

githubとNetlifyの連携の仕方がわからない方はこちらをご覧ください。

<card slug="entry401"></card>


## まとめ・Gatsby v4 に対応する際、インストール中エラーでコケる前に必須バージョンを確認しよう
仕事が忙しくて放置してたのもありますが、やっと更新できるようになりました！

面倒臭くて公式リファレンスをしっかり読んでなかったのが原因でかえって遠回りしてしまいました汗

Gatsby v4 は超便利になりました。<br>
v2から2世代のアップグレードで参考にならないかもしれませんが、逆にムダなコードをかなり書かなくても済んだり frontmatter の扱いなど変わっています。

今回markdown系の快適機能も追加しました！<br>以下に方法をまとめてます。

<card slug="entry489"></card>

今回も、最後までお読みいただきありがとうございました。<br>
この記事があなたのコーディングライフの一助となれば幸いです。


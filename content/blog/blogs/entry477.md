---
title: 当ブログをGatsby v4 にアップグレードしました
date: 2021-12-12
hero: thumbnail/2020/entry401.jpg
pagetype: blog
cateId: 'web-developer'
tags: ["Gatsby","React","JavaScript"]
description: ウェブサイトのリニューアルがようやく終わりました。WebP対応しつつv3にアップグレードする予定たったのですが、Gatsby cliでのインストールのエラーでひっかかってできませんでした。v2からv4にアップグレードで突っかかって困っている人へ私が解決できた方法をご紹介します。
lead: ["お久しぶりです!!!念願の久々更新です。","2021年7月から進めていたウェブサイトのリニューアルがようやく終わりました！涙","WebP対応しつつv3にアップグレードする予定たったのですが、","starter kit のインストールのエラーでひっかかってできませんでした。","この記事はGatsbyJSでブログなどを運用していてv4にアップグレードしたいけどエラーで引っかかってインストールできない方への記事です。","私がどうやってエラーを解決したかをご紹介します。"]
---
## 静的サイトジェネレーターに乗り換えた経緯

<msg txt="早くv4やv3に乗り換えたくて解決策が読みたい人は目次からすっ飛ばしてください。"></msg>

昨年、concrete CMS（旧:concrete5）から静的サイトジェネレーターである Gatsby JS に乗り換えました。

理由は、表示スピード改善と私がフロントエンドエンジニアでJS製のブログを運用したかったため。

運用は快適で履歴も管理できるのでめちゃめちゃお気に入りでした。<br>
GatsbyJSにブログを乗り換えに関する記事は[こちら](http://localhost:8000/blogs/tags/Gatsby/)をお読みください。

gatsbyJSの難点は*日本語のリファレンスが少ないこと*です。<br>
concreteCMSの時もそうでしたが英語アレルギーの人には構築がかなり辛いと思いますwww

その場しのぎの設定も多かったので、gatsby starter blog をベースにリファクタリング（※コードを綺麗にすること）を試みようと思いました。

## v3、v4でgatsby starter blog のインストールが走らない

gatsby starter blog をベースに構築し直そうと試みようと思ったのですが、なぜか走らない。

gatsby cli を v4 用にアップグレードしたもののエラーをもとにググったら、グローバルの node module がいくつか足りないみたい。

```ssh
sudo npm -g i sharp
sudo npm -g i cordova-res
```

それでも走らないので、npmのキャッシュを強制的にクリア。
<br>キャッシュで不具合が起きてたのかはちょっと不明です。

```ssh
npm cache clean --force
```

これで走らなければ以下も入れてみてください。

```ssh
sudo npm install node-addon-api -g
sudo npm i
```

上記を入れた際にもキャッシュクリアしてください。

```ssh
npm cache clean --force
```

その後、すでにv4に対応済みの [gatsby starter blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/) を入れてみます。

```ssh
npx gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

私のケースではこれでダウンロードが走るようになりました！

## Netlify にデプロイして動くか確認
このブログは Netlify を使ってます。

別にgithubでリポジトリを立てて、一旦デプロイして動くか確認。<br>ちゃんと動きました！！

githubとNetlifyの連携の仕方がわからない方はこちらをご覧ください。

<card id="/blogs/entry401/"></card>

## まとめ・Gatsby v4 に対応する際、インストール中エラーでコケたら global の node module に不足があるかも
仕事が忙しくて放置してたのもありますが、やっと更新できるようになりました！

Gatsby v4 は超便利になりました。<br>
逆に無駄なコードをかなり書かなくても済むようになり frontmatter の扱いなど変わっています。

また新しいブログ更新の快適機能も追加しました！

また別の機会にまとめます。

今回も、最後までお読みいただきありがとうございました。<br>
この記事があなたのコーディングライフの一助となれば幸いです。

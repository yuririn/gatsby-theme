---
title: Sharp module のせいで npm start(Gatsby development) 動かなくなった
date: 2025-01-18
pageType:  blog
hero: thumbnail/2023/entry519.png
cateId: web-developer
tags: ["Gatsby"]
description: ローカルの Gatsby のブログの node module を一部更新したら、Sharp module のせいで npm startができなくなりました。画像処理モジュールの sharp をバージョンアップしたせいでエラーが発生したらしい。色々ググった結果、解決したのでその方法をメモっておきます。
---

ローカルの Gatsby のブログの node module を一部更新したら動かなくなりました。

> Something went wrong installing the "sharp" module

ビルドはできるけど npm start(Gatsby development) のコマンドでコケる。

<prof></prof>

* Machine: Mac Book Pro
* Chip: Apple M1
* OS: Sonoma

色々調べていたら、画像処理モジュールの sharp をバージョンアップしたせいでエラーが発生したらしい。

エラー解決方法が指示されているから、試すもののうまくいかない。Win機で同様のエラーが出た人はWin機用の `sharp` をインストールしてうまくいっていた[記事](https://qiita.com/taqumo/items/d1ccae13739e6627f7b5)は読んだ。

なので `npm start` 時に返ってくる、以下で理論的にはうまくいくと思ったのですがどうもうまくいかない。

```shell:title=コマンド
npm install --ignore-scripts=false --foreground-scripts --verbose sharp
npm install --platform=darwin --arch=arm64v8 sharp
```

色々ググった結果、解決したのでその方法をメモっておきます。

1. [Apple Silicon: Something went wrong installing the "sharp" module #3214](https://github.com/lovell/sharp/issues/3214)
2. [Cannot run gatsby develop on Mac M1](https://github.com/gatsbyjs/gatsby/discussions/29891)

上記2つの記事を参考にとりあえず言われるがままにやってみました。

## brew 経由で2つのライブラリをインストール
今この記事を読んで私と同じ悩みの方が homebrew がないとは考えにくいのですが、ない方は[こちら](https://brew.sh/ja/)を参考にインストールしてください。

```shell:title=コマンド
brew install gcc
```

* GCC（GNU Compiler Collection）<br>
C言語やC++などをコンパイルする環境を提供するそう。いらなさそうな気はしたけどとりあえずインストール。

```shell:title=コマンド
brew reinstall vips
brew info vips
```

GCC は要求主導型の水平スレッド画像処理ライブラリらしいです。このバージョンが古いとよくないみたい。
とりあえず言われるがままに `reinstall` で再インストール。で、何が入ったかを念の為 `brew info` で確認。

```shell:title=コマンド
rm -fr node_modules
npm i
```
`node_modules`を削除して、再インストール。ここまでやれば大丈夫っぽいけど、参照リンクの一個目でその続きのスレッドを読むとまた動かなくなったとのこと。

もう一個の参照リンクの Sharp 開発に関わっているぽい人のアカウントの回答者が以下コマンドについて言及していたので、やってみた。

```shell:title=コマンド
npm install --verbose --foreground-scripts sharp
```

多分、最初に`npm start`で指示があった以下とオプションが一個違うだけでほぼ一緒。

```shell:title=コマンド
npm install --ignore-scripts=false --foreground-scripts --verbose sharp
```

ちゃんと動いた。良かった。
```shell:title=コマンド
npm start
```

## まとめ・英語のリファレンスが一番解決する
昨日まで動いていたので、node module バージョンアップによるマシーンのスペックとSharp のバージョンで不具合がおこったっぽいです。

マニアックなことをやっていると、英語のリファレンスが必須になるなぁとつくづく思いました。

この記事がみなさんの一助となれば幸いです。

最後までお読みいただきありがとうございました。

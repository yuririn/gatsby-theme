---
title: HTMLとCSSのあり方ガチで考えてみた
date: 2019-07-18
hero: thumbnail/2014/entry172.jpg
pagetype: blog
cateId: web-developer
tags: ["UX/UI","CSS","アクセシビリティ"]
description: HTMLとCSSのあり方について考えたことはありますか？検索エンジン、ユーザーなどを踏まえて私の考え方を述べようと思います。
lead: ["HTMLとCSSのあり方について考えたことはありますか？検索エンジン、ユーザーなどを踏まえて私の考え方を述べようと思います。"]
---
## HTMLを書く時の心がけ
突然ですがみなさん、HTMLを書く時どんな気持ちで書いてますか？<br>
私は以下2点をめちゃめちゃ心がけてます。

### 1、検索エンジンに何がどういう役割を持ってるか伝える
HTMLはマークアップ言語です。pタグはパラグラフ（段落）とか大見出し（heading）はh1とか役割を持ったタグでコンテンツをマークアップします。<br>
人間は文字が大きかったり太字だったりすれば視覚的にどのコンテンツの重要かなどが判断できますが検索エンジンはそれが出来ないです。<br>
なので可能な限り適切なタグを使ってマークアップする必要があります。

### 2、全ての人が読めるコンテンツを提供するためのマークアップをする
Webコンテンツを読む人は健常者ばかりではありません。目が見えない人もいるので音声読み上げソフトで読まれるとき、どの順番で読まれるかなども配慮しています。

アクセシビリティはHTMLをどうマークアップするかにかかってます。

特に大切なのは見出しだと思っています。見出しは一括りのコンテンツの概要です。雑誌や新聞などでも見出しを読んで興味なければスキップしますよね？

検索エンジンにとって大切なのはユーザーに有用なコンテンツを提供しているか否か。どこが重要かなどがわかるようにマークアップする必要があります。

そして自分の作ったWebサイトをどんな人がみているか想像してますか？
目の見えない方がWebサイトを閲覧するときは音声読み上げソフトを使います。見出し（概要）を聞いてこのコンテンツに興味があるかないかを判断するのではないでしょうか？もし興味なければ、次のコンテンツにスキップしますよね？

なので、コーディングする際はちゃんと文書構造に気を遣う必要があるんです。意味のないタグを使っても後からrole属性やARIA属性を追加して意味を持たせてあげる必要があります。

Webサイトはネットにアクセスできる万人にコンテンツを提供していることを忘ないことが大切です。
## CSSを書く時の心がけ
CSSはHTMLの**見た目を整える言語**です。
なのでHTMLほど検索エンジンに気遣う必要はないと私は認識してます。
あくまで閲覧する人間のために、コンテンツが読みやすい、Webサイトが使いやすいように整えるために使えばいいと思っています。しかもそのデザインをするのはデザイナの仕事なので本日は割愛します。

CSSは厄介な言語だと思います。ページ数が多いページが長くなってくるとスタイルも増えて、コードをうっかり上書きしてしまったり、それを防ぐためにimportant（強制的に実装）乱用して、結果コードがぐっちゃぐっちゃということもありますね。

なのでCSSの骨組み（設計）を考える上で3つにわけてCSSを書くと楽になります。
レゴなんてその考え方の集大成ですよね。様々な形のブロック（モジュール）を組み合わせてプロダクトを作ることができます。今更ですがやったことない人レゴやったほうがいいですよ。

ちなみに以下はあくまで私が意識している基本概念です。
### 1、レイアウト（大枠・部品を入れるエリア）用のスタイリングをする
まず、どんな容器を用意するか考えます。
容器は部品を入れるエリアです。お弁当箱を想像するとわかりやすです。
お弁当箱でいうと間仕切りですね。

### 2、部品化（モジュール化）する
ボタン、見出しなど部品化する。それぞれのレイアウト内に配置する。
お弁当の各おかずです。

### 3、部品のバリエーションを増やす
部品の色違い、サイズ違いを作り、どの部品がどんな役割を持っているかわかるようになる。
いつも同じおかずだと飽きちゃいます。

CSSは意味のもったタグを視覚的に人に伝わるように整えることがいちばんの目的ですが、設計・整理して破綻しないように書くことが重要です。
## まとめ　制作物の先にいろんなユーザーがいる
HTML、CSSのことを真剣に考えてみましたが、公開した先に誰が見るかがゴール。

検索エンジンは常にユーザーにとって読みやすいかなど考えてますのでユーザーフレンドリーなコーディングを好みますしね。最終的にはコンテンツをいろんな人が読めることがポイントです。

* **HTML** … 適切なタグを使い、コンテンツを読まれるべき順番に並べて意味のあるマークアップをする。目が見えないなど、スクリーンリーダーで閲覧する障害者にも配慮する。
* **CSS** … 人間はHTMLタグをいちいち読まないので、どのタグでマークアップされたところにどんな意味があるかなどをデザインを通じて実装する。
CSSは破綻しやすい言語なので「部品」と「容器」というイメージでコーディングしていくと管理しやすい。
最後までお読みいただきありがとうございました。
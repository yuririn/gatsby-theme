---
title: aタグのクリック範囲を広げる｜CSSで当たり判定のズレを直す方法
date: 2014-08-09
modifiedDate: 2026-03-14
hero: thumbnail/2014/entry181.png
pageType: blog
cateId: 'web-developer'
tags: ["CSS"]
description: aタグのクリック範囲がズレる、狭い、反応が悪い！そんな「当たり判定」の悩みをCSSで解決します。疑似要素（::after）を使ったモダンな拡張方法から、アクセシビリティを損なわない実装のコツまで。2026年のブラウザ環境に合わせて、最もシンプルで無駄のないコードにアップデートしました。
faq:
  - q: "ナビゲーションの文字以外の場所をクリックしても反応しません。"
    a: "それはaタグがインライン要素のままだからです。CSSで **`display: block`** を指定するか、Flexboxを使用して[aタグ自体のサイズを広げる](#解決法cssでaタグにプロパティdisplayblockをセットするだけ)ことで解決します。"
  - q: "カード全体をクリックできるようにしたい場合、どうすればいいですか？"
    a: "モダンな解決策として、aタグの疑似要素（`::after`）に **`position: absolute`** をかけ、親要素いっぱいに広げる手法（Stretched Link）がおすすめです。HTML構造を汚さずに[クリック範囲を最大化](#お困りごと3リンクの範囲を縦方向にも広げて文字位置を縦横方向真ん中に配置したい)できます。"
  - q: "画像の下に謎の数ピクセルの隙間ができてしまいます。"
    a: "画像（imgタグ）がインライン要素であり、アルファベットの「ベースライン」を基準に配置されているためです。CSSで **`vertical-align: bottom`** を指定すれば[隙間をピタリと消す](#解決法cssでimgタグにプロパティvertical-align-bottomをセット)ことができます。"
---
【2026年3月 メンテナンス済み】  
初回公開は2014年ですが、今もなお「aタグのクリック範囲」はコーディングにおける地味なストレス源です。

昔は display: block; や padding で無理やり広げていましたが、今は ::after 疑似要素を使った手法（stretched link） など、より「HTML構造を壊さず、マトリョーシカ（無駄なdiv）も増やさない」スマートな解決策が主流です。

今の制作現場でそのまま使える、**「最も手離れが良いCSS」**を再定義しました。

aタグのクリックする範囲がズレたり、想像以上にクリックできる範囲（当たり判定）がオカシい！そんなお悩み解決します。

そこで、今回はaタグのクリックできる範囲のズレを直す方法をご紹介します。

<small>※ この記事は2023年1月21日にメンテナンスしました。みなさんのコーディングライフの一助となれば幸いです。</small>

## aタグ（リンク）にまつわるお困りごと3つ

この記事では初心者がつまずきがちの3つのお困りごとの解消法と原因をご紹介します

* ナビゲーションをクリックしても反応しない！？
* aタグの中に画像を配置して下側にできたアキをどうにかしたい!!
* リンクのど真ん中に文字や画像を配置したい

<prof></prof>

## お困りごと1・あれ？！ナビゲーションをクリックしても反応しない！？
こんなナビを作ってみたものの、見た目はキレイにできているのにクリックしてもテキスト部分しかリンクが反応しない。。。。

そんなことあります。

![クリックしても反応しない！？](./images/entry181-1.jpg)
テキスト以外のエリアをクリックしてもちゃんとリンクへ飛ぶようにしたいですよね？



このようにナビゲーションを配置したい時に書きがちなコードです。

`display: flex`でナビのliタグを横方向に並べ、幅を均等に振り分けます。

```html:title=HTML
<ul>
  <li><a href="/">ホーム</a></li>
  <li><a href="blog/">ブログ</a></li>
  <li><a href="profile/">プロフィール</a></li>
  <li><a href="contact/">お問合わせ</a></li>
</ul>
```

```css:title=CSS
* {
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 25%;
  text-align: center;
  border-left: 1px solid #fff;
}

li:first-child {
  border-left: none;
}

a {
  padding-top: 20px;
  padding-bottom: 20px;
}
```
<ad location="/blogs/entry181/"></ad>
残念ながらこのコードではリンクの範囲はliタグと同じサイズになりません。

### 解決法：CSSでaタグにプロパティdisplay:blockをセットするだけ

ではどうすればいいのか。


解決方法はカンタンです。
aタグにCSSでプロパティ`display:block`やをセットするだけです。

### 原因の解説
理由はaタグの初期値は`display: inline`、つまりaタグがインラインレベルの要素だからです。

displayは要素の表示形式を指定するプロパティで`inline`を指定すると通常、**内側のコンテンツ（テキストなど）以上のサイズに大きくなることはありません**。

そのためliタグの中に**インラインレベルの要素をおくからアキができてしまう**わけです。


プロパティ`display`を活用して表示形式を変えましょう。

## お困りごと2・aタグの中に画像を配置して下側にできたアキをどうにかしたい!!
画像を入れ子にしたら下の方にこんな感じのアキが！！

![aタグの中に画像を配置して下側にできたアキをどうにかしたい!!](./images/entry181-2.jpg)

### 解決法：CSSでimgタグにプロパティvertical-align: bottomをセット
この現象は初心者あるあるです。

解消法はCSSでimgタグに`vertical-align: bottom`をセットするだけです。
```html:title=HTML
<a href="/"><img src="images/hogehoge.jpg" alt="hogehoge" width="200" height="200"></a>
```

```css{11}:title=CSS
a {
  display: block;
  width: 300px;
  height: 300px;
  border: 2px solid #333;
}

img {
  width: 100%;
  height: auto;
  vertical-align: bottom;/* ←これが重要 */
}
```

### 原因の解説
プロパティ`vertical-align`はインライン要素の縦方向の位置を調整するプロパティです。
アイコンの位置上付、下付きなどの文字位置の調整もプロパティ`vertical-align`を使います。

imgタグの下になぜ余白ができるのか。


**インラインレベルの要素はアルファベットをベースに作られているから**です。
```
vertical-align: baseline;
```
HTMLはもともと英語圏の人が作ったものなので、文字にはベースラインが基準になるようにセットされてます。小文字の「g」や「j」下に突き抜けます。

imgタグなどのインラインレベルの要素はこれらの文字と同じ振る舞いをするので下に変なアキができてしまうのです。

![インラインレベルの要素はアルファベットをベースに作られている](./images/entry181-3.jpg)

画像の位置のたての位置の基準を一番下に変えれば良いだけです。

```vertical-align: bottom;```
## お困りごと3・リンクの範囲を縦方向にも広げて文字位置を縦横方向真ん中に配置したい
![aタグの中に画像を配置して下側にできたアキをどうにかしたい!!](./images/entry181-4.jpg)
イラストのようなナビゲーションメニューを作る時、**高さを寸分狂わず決まった高さにしたい!!**しかもリンクのテキストは上下左右ピタッとセンタリングしたい。

なのに`padding`や`height`を駆使してもなぜかうまくいかないことってありませんか？
### 解決法：aタグにプロパティdisplay:flexをセットして配置を調整
解決法はdisplay: flexを使い倒します。

* aタグに高さをセットする
* `display: flex`
* `justify-content: center`
* `align-items: center`

```css:title=CSS
* {
  box-sizing: border-box;
  line-height: 1.8;
}

ul {
  display: flex;
  flex-wrap: wrap;
  background: #4D4D4D;
  list-style: none;
}

li {
  width: 25%;
  text-align: center;
  border-left: 1px solid #fff;
}

li:first-child {
	border-left: none;
}

a {
  height: 70px;
  text-decoration: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
<ad location="/blogs/entry181/"></ad>

### 原因と解説
プロパティdisplayをflexにすると**子要素やコンテンツの縦方向や横方向並びと位置をコントロールできます**。

**flex-direction**というプロパティをセットで使うのですが、初期値は**row**がセットされており子要素は横並びになります。なので縦方向に並べたい時は**column**をセットしておきます。

並べていく方向のコンテンツの位置をコントロールできるのが**justify-content**で、centerにするとこの場合、コンテンツは横方向にセンタリングされます。

縦方向に対しての位置をコントロールするプロパティが**align-items**です。値を**center**にするとaタグの縦方向に対し真ん中にコンテンツを配置できます。

## おまけ・HTML5の要素について要素がどうカテゴライズされているか知っておこう
インライン、ブロック要素という言い方はHTML5ではなくなりました。

ただ、この記事では便宜上aタグとimgタグを**インラインレベルの要素**と説明しています。


インライン、ブロックの解説は難しいですね。

### 要素は分類できる
<ad location="/blogs/entry181/"></ad>

要素（HTLMタグ）、つまりコンテンツは7つに分類できます。

* **メタデータ・コンテンツ** ... 文書情報や別文書との関係などを定義するコンテンツ
* **フロー・コンテンツ** ... 文書の本体に現れる一般的なコンテンツ
* **セクショニング・コンテンツ** ... セクションの範囲を定義するコンテンツ
* **ヘッディング・コンテンツ** ... 見出しを表すコンテンツ
* **フレージング・コンテンツ** ... 段落内で使用するようなコンテンツ
* **エンベッディッド・コンテンツ** ... 文書内に埋め込みを行うコンテンツ
* **インタラクティブ・コンテンツ** ... ユーザーが操作可能なコンテンツ

![HTLMタグ要素の分類](./images/entry181-5.jpg)

aタグやimgタグは、HTML5では主にフレージングコンテンツの一種ですが同時に**ユーザーが操作可能**なのでインタラクティブコンテンツでもあります。

さらに、imgタグは「画像を埋め込む」コンテンツでもあるのでエンベッディッド・コンテンツにも属します。

とても複雑ですね。

要素の特性を知る上では重要ですが、こんなことイチイチ気にしていたらコーディングできないです。

たとえはフレージング・コンテンツであるspanや、strongの中にpタグやdivタグを入れたら文書構造が破綻するぐらいは知っておいた方がいいですが、気になったら都度調べる程度で十分です。

| 種類 | タグ | 備考 |
| ---- | ---- | ---- |
| フローコンテンツ | `<a>`, `<abbr>`, `<address>`,<br>`<area>`（map要素内にある場合）`<article>`, `<aside>`,<br> `<audio>`,`<br>`, `<b>`, <br>`<bdi>`, `<bdo>`, `<blockquote>`,<br>`<br>`, `<button>`,`<br>` `<canvas>`, <br>`<cite>`, `<code>`, `<data>`, `<datalist>`, <br>`<del>`,`<details>`, `<dfn>`, <br>`<div>`,`<dl>`,`<br>`, `<em>`,<br> `<embed>`, `<fieldset>`, `<figure>`,<br> `<footer>`, `<form>`,`<br>`, `<h1>`-`<h6>`,<br> `<header>`,`<hr>`, `<i>`, `<iframe>`,<br> `<img>`,`<input>`,`<br>`<br> `<ins>`, `<kbd>`, `<keygen>`, <br>`<br>`, `<label>`, `<main>`, `<map>`,<br> `<mark>`,`<menu>`, `<meter>`, `<nav>`,<br> `<noscript>`,`<br>`, `<object>`, `<ol>`,<br> `<output>`, `<p>`, `<picture>`, <br>`<pre>`, `<br>`, `<progress>`, `<q>`, <br>`<ruby>`, `<s>`,`<br>`, `<samp>`, `<script>`,<br> `<section>`, `<select>`,`<small>`, <br>`<span>`, `<strong>`, `<sub>`, `<sup>`,`<br>`, `<table>`, `<template>`,<br> `<textarea>`,`<br>` `<time>`,<br> `<u>`, `<ul>`, `<var>`, <br>`<video>`, `<wbr>`, テキスト|
|メタデータコンテンツ|`<base>`, `<link>`, `<meta>`, `<noscript>`,<br> `<script>`, `<style>`, `<template>`, `<title>`|
|ヘッディングコンテンツ|`<h1>` ~ `<h6>`|見出し|
|セクショニングコンテンツ|`<article>`, `<aside>`, `<nav>`, `<section>`||
|フレージングコンテンツ|`<a>`, `<abbr>`, `<area>` （map要素内にある場合）<br>`<br>` `<audio>`, `<b>`, `<bdi>`, `<bdo>`, <br>`<br>`, `<button>`,`<br>` `<canvas>`, `<cite>`, `<code>`, `<data>`,`<br>`<br>	`<datalist>`, `<del>`, `<dfn>`, `<em>`, `<embed>`,`<br>`<br> `<i>`, `<iframe>`, `<img>`, `<input>`, <br>`<ins>`, `<kbd>`,`<br>`<br> `<keygen>`, `<label>`, `<map>`, `<mark>`, `<meter>`,<br>`<br>` `<noscript>`, `<object>`, <br>`<output>`, `<picture>`,`<br>` <br>`<progress>`, `<q>`, `<ruby>`, `<s>`,<br>`<br>` `<samp>`, `<script>`, `<select>`, <br>`<small>`,`<br>` `<span>`, <br>`<strong>`, `<sub>`, `<sup>`,<br>`<br>` `<template>`, `<textarea>`, `<time>`,<br>`<br>` `<u>`, `<var>`,<br> `<video>`, `<wbr>`, テキスト||
|エンベディッドコンテンツ|`<audio>`, `<canvas>`, `<embed>`, `<iframe>`, `<img>`, `<object>`, `<picture>`, `<video>`||
|インタラクティブコンテンツ|`<a>` （HTML 5.1ではhref属性がある場合に限る）,<br>`<br>`, `<audio>` （controls属性がある場合）,<br>`<br>`, `<button>`, `<details>`, `<embed>`, `<iframe>`,<br>`<br>`, `<img>` （usemap属性がある場合）,<br>`<br>`, `<input>`（type="hidden"の場合は除く）,<br>`<br>`, `<<keygen>`, `<label>`,`<br>`<br>`<object>`<br>`<br>`（usemap属性がある場合）（HTML 5.1では除外）,<br>`<br>`, `<select>`, `<textarea>`,<br> `<video>`（controls属性がある場合）||

## まとめ・この記事を読んでくださった方へ
この記事は私がブログを始めた頃、2014年に書いたものです。

ありがたいことに、いまだに毎月たくさんの人に読んでもらっています。
きっとコーディングで行き詰ってこの記事にたどり着いていると思うので、少しでもわかりやすくなるよう何度もメンテナンスしています。お役に立てたら幸いです^ ^。

最後まで、お読みいただきありがとうございました。


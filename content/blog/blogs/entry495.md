---
title: EJSの関数を使って、pictureタグの記述を効率化
date: 2022-04-01
pagetype: blog
hero: thumbnail/2022/entry495.png
cateId: 'web-developer'
tags: [ "npm","JavaScript"]
description: 最近のウェブ制作はスマホ、タブレット、多様化したブラウザやディスプレイへの画像対応が大変です。画像やディスプレイの出し分けにpictureタグやsrcsetがだいぶ浸透してきましてきましたが、属性が多くて記述がしんどい！のでEJSで関数化して少ないコードで出力できるようにしました。そのコードのご紹介です。
lead: ["最近のウェブ制作はスマホ、タブレット、多様化したブラウザやディスプレイへの画像対応が大変です。","画像やディスプレイの出し分けにpictureタグやsrcsetがだいぶ浸透してきましたが、属性が多くて記述がしんどい！","のでEJSで関数化して少ないコードで出力できるようにしました。そのコードのご紹介です。"]
---
## EJSてそもそも何ぞ？

EJSは埋め込み型JavaScriptテンプレートで、Gulpなどを使ってHTMLに吐き出すことができます。

最初の設定等は少し面倒ですが、一度設定すると作業が効率化できます。

Gulpからの実装の方法はこちらにまとめています。

<card id="/blogs/entry459/"></card>

## 関数の書き方
まずは関数の書き方です。

関数は変数に格納し、戻り値を取り出して使います。

特殊な記述方法に関しては、[【Gulp】EJSを使ってHTMLを量産するのおまけejsお役立ち情報](http://localhost:8000/blogs/entry459/#%E3%81%8A%E3%81%BE%E3%81%91ejs%E3%81%8A%E5%BD%B9%E7%AB%8B%E3%81%A1%E6%83%85%E5%A0%B1)こちらを参照してください。

```js:title=EJS
<%
hello = function(){
  return `<p>Hello, World!!</p>`;
}
%>
<%- hello()%>
```
出力結果。
```html:title=HTML
<p>Hello, World!!</p>
```

### 引数
引数を渡すこともできます。
```js:title=EJS
<%
hello = function(name){
  return `<p>Hello, World!! I am ${name}.</p>`;
}
%>
<%- hello('Camille')%>
```
出力結果。
```html:title=HTML
<p>Hello, World!! I am Camille.</p>
```
引数にはデフォルト値を入れておくこともできます。
```js
<%
hello = function(name='Camille'){
  return `<p>Hello, World!! I am ${name}.</p>`;
}
%>
<%- hello()%>
```
出力結果は一緒。
```html:title=HTML
<p>Hello, World!! I am Camille.</p>
```

## picture タグを毎度ガチで書くのはめんどくさい
pictureタグはブラウザやユーザーの環境（モバイルとかPC）に応じて出力したい画像を変えることができます。

例えば、以下のように画像をWebP対応してあるブラウザの場合はWebPを、それ以外はPNG画像を表示、さらにウィンドウ幅に合わせて画像サイズを変えます。

さらに、`loading="lazy"`Lazy Loadや`decoding="async"`デコード処理を非同期したらたった一箇所に画像を出力するためにこれだけのコードを書かなければなりません。
```html:title=HTML
<picture>
  <source
    type="image/webp"
    sizes="(max-width: 480px) 440px,800px"
    srcset="/assets/images/gazou＠480.png.webp 480w,/assets/images/gazou.png.webp 800w"
  >
  <img
    src="/assets/images/top/gazou.png"
    sizes="(max-width: 480px) 440px,800px"
    srcset="/assets/images/gazou＠480.png 480w,/assets/images/gazou.png 800w"
    alt="画像"
    width="1200"
    height="800"
    loading="lazy"
    decoding="async"
  >
</picture>
```
<msg txt="カオス!!正気の沙汰じゃない！"></msg>

## 関数でpicture タグの記述量を減らす

解決するためにEJSの関数の出番というわけです。
```js:title=EJS
<%
//webp書き出し用の変数
imgTag = function(src, width, height, alt="", className="", loading=true){
  const srcSp = src.replace('.','＠480.')
  const srcWebp = src.split('.')[0]
  let prop = loading ? ` loading="lazy" decoding="async"` : ''
  return `<picture class="${className}">
    <source
      sizes="(max-width: 480px) 440px,800px"
      srcset="/assets/images/${srcSp}.webp 480w,/assets/images/${src}.webp 800w"
      type="image/webp"
    >
    <img
      sizes="(max-width: 480px) 440px,800px"
      srcset="/assets/images/${src} 480w,/assets/images/${src} 800w"
      src="assets/images/${srcSp}"
      alt="${alt}"
      width="${width}"
      height="${height}"
      ${prop}
    >
  </picture>`;
}
%>

<%- imgTag("works-01.jpg", 1200, 1200, "画像", "img")%>
```
`loading="lazy"`や`decoding="async"`は最初に表示される場所（ファーストビュー）では使えないので、属性を付与するか否かは引数でコントロールします。

出力結果。
```html:title=HTML
<picture class="img">
  <source sizes="(max-width: 480px) 440px,800px" srcset="/assets/images/works-01＠480.jpg.webp 480w,/assets/images/works-01.jpg.webp 800w" type="image/webp">
  <img src="/assets/images/top/works-01.png" sizes="(max-width: 480px) 440px,800px" srcset="/assets/images/works-01.jpg 480w,/assets/images/works-01.jpg 800w" alt="画像" width="1200" height="1200" loading="lazy" decoding="async">
</picture>
```
これはあくまで例なので、もしこの関数を使う場合は適宜引数などを調整してみてください。

## おまけ・関数を連想配列に格納してまとめておく
関数は連想配列（オブジェクト）にまとめておくこともできます。

```js:title=_func.ejs
<%
functions = {
  fnc01: function(){
    return "fnc01"
  },
  fnc02: function(){
    return "fnc02"
  }
}
%>
<%- functions.fnc01() %>
```
インクルードすればどこからでも呼び出せます。
```js:title=index.ejs
<% include("./_func.ejs")%>
```
## まとめ・EJSを使うとブラウザや画像対応の複雑化したコードを簡略化できる

最近はスマホ、タブレット、多様化したブラウザやディスプレイへの画像対応が大変です。

環境に応じて最適化した画像を表示させるのは表示速度にも影響をあたえるのでこういうコードが書けなきゃいけませんよね。

<msg txt="いざコード書いてみたらすごく長いので正直嫌だな-と思ったのがきっかけ"></msg>

pictureタグを関数化したらめっちゃ楽になりました。

おそらく、他の言語でも応用が効くと思います。

この記事がみなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

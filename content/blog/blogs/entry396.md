---
title: CSSボタンデザインコード・スニペット集！
date: 2020-11-14
hero: 2020/entry396.jpg
pagetype: blog
cateId: 'web-developer'
tags: ["CSS"]
description: ボタンデザインやコーディングでどうCSSを書いていいか悩むことありませんか？今回は実用性重視でボタンのスニペット集を作りました！UI/UXの観点からどんなボタンが最適であるべきか解説つき！もちろんコピペで今すぐ使えます。
lead: ["ボタンデザインやコーディングでどうCSSを書いていいか悩むことありませんか？","今回は実用性重視でボタンのスニペット集を作りました！","UI/UXの観点からどんなボタンが最適であるべきか解説つき！もちろんコピペで今すぐ使えます。"]
---
## ボタンを実装する上でUX/UI上重要な3つのポイント
ボタンのデザインでボタンのデザインでユーザーのことを考えて大切にしてことがあります。

### 1、サイズは適切か
スマホの時サイズが小さすぎるとタップできません。
**縦横のサイズが44px以上（Googleの推奨サイズ）**というのが鉄板です。

### 2、クリックできそうか
デザインとしてクリックできそうか、がポイントです。<br>
形としてボタンっぽかったらなおわかりやすいかと思います。

よくあるボタンデザインがこんな感じです。<br>
たとえばこんなオレンジのボタンがあるとします。

![pointer-events](./images/2020/11/entry396-1.png)

※ コンバージョン率が高いと言われているのであえてオレンジを使っています。

アイコン、文字をのせたらもうボタンって何と無くわかりますよね？

ユーザーに「**なんかクリックできそう**」って思わせるのがポイントです。

### 3、他のパーツと差別化できているか
ウェブサイトではとくにCVボタンなどであれば、クリックされる事が重要なポイント。<br>
他のパーツ（コンテンツ）との差別化をしっかりしておく必要があります。

## ベーシックなボタンのコード3つ
まずはベーシックなボタンのコードをご紹介します。

![pointer-events](./images/2020/11/entry396-2.png)

この3つレパートリーを持っていればとりあえずどうにかなります。多分。

よくある続きを読むボタンですね。<br>
今回右に配置したアイコンは「Material Design Iconic Font」を使っています。

[Material Design Iconic Font](https://zavoloklom.github.io/material-design-iconic-font/index.html)

Flexを使って、文字とアイコンを縦横均等に配置してます。

[ベーシックなボタン | Code Pen](https://codepen.io/camile/pen/LYZqzEp)


### pointer-events の使い方と使いどころ
パーツでいえばページネーションや、COMING SOONにしてリンクが貼れないバナーなどに使うことが多めです。<br>
CMSから吐き出すタグを**自分では書き換えられないけどCSS側でクリックを禁止したい**、などのケースで重宝します。

### ホバーで半透明

![ホバーで半透明](./images/2020/11/entry396-3.gif)

```html
<!-- HTML -->
<a href="" class="btn--basic">続きを読む<i class="zmdi zmdi-chevron-right"></i></a>
```

```css
/* CSS */
a[class^=btn] { //btnから始まるクラス
  background: #FF9258;
  display: flex;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  text-decoration: none;
}

.btn--basic:hover {
  opacity: 0.7;
}
```

### 色が反転

![色が反転](./images/2020/11/entry396-4.gif)

ホバーすると、ボーダーが反転します。<br>
他のボタンとサイズを合わせるためにbox-sizing: border-box;でborderを内側に含めています。

```html
<!-- HTML -->
<a href="" class="btn--border">続きを読む<i class="zmdi zmdi-chevron-right"></i></a>
```

```css
/* CSS */
.btn--border {
  height: 46px;
  background: #FF9258;
  display: flex;
  width: 150px;
  border-radius: 5px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: .3s;
  border: 2px solid #FF9258;
}

.btn--border:hover {
  background: #fff;
  color: #FF9258;
}
```

### 定番の立体感のあるボタンらしいボタン
![定番の立体感のあるボタンらしいボタン](./images/2020/11/entry396-5.gif)

定番のボタンらしいボタンを作るとき、私はかならずY軸に向かった`box-shadow`を使います。<br>
クリックしたとき、押した感が出るように`transformY`で位置をわずかに下げ、さらに`box-shadow`も同じ分量減らします。<br>
これで不自然な挙動をしないボタンらしいボタンの完成です。

```html
<!-- HTML -->
<a href="" class="btn--button">続きを読む<i class="zmdi zmdi-chevron-right"></i></a>
```

```css
/* CSS */
.btn--button {
  position: relative;
  height: 50px;
  background: #FF9258;
  display: flex;
  width: 150px;
  border-radius: 5px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: .3s;
  box-shadow: 0 4px 0 #B45624;
}

.btn--button:hover {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #B45624;
}
```


<div class="box"><h4>CSSセレクターこんな指定の仕方もあるよ！</h4><p>私、コードが減るという理由で時折トリッキー？な指定方法を使います。参考までに。</p><p>クラスの前方一致<br>セレクタ名[class^=btn]<br>ある文字列から始まるクラスのみを指定できます。この場合btnほにゃららといった感じですね。<br>クラスの後方一致<br>セレクタ名[class$=btn]<br>逆に後方一致だとこんな書き方ができます。<br>部分一致<br>セレクタ名[*=btn]<br>btnが含まれるか否か</p></div>

## ボタンのCSSコード・スニペット
いくらかわいい、かっこいいと思えてもそのデザイン普通使えないと意味がありませんよね？
実戦で使えそうなものだけピックしてご紹介します。

### スケルトンボタン・ベースから応用まで
背景が黒っぽい場合にスケルトンボタンってかっこいいです。<br>
濃いめのグラデの上に乗っけるのもオススメです。

![スケルトンボタン・ベースから応用まで](./images/2020/11/entry396-6-1.png)

ベースのスケルトン、クリアソープのようなスケルトン、ネオンのようなスケルトン3つのコードスニペットを作ってみました。

今回のポイントは**rgba関数で**す。<br>
半透明の白は濃いめの背景のデザインを生かせるのでオススメです。<br>
文字サイズが小さいと見えないので注意です。

<div class="box"><h4>rgba関数</h4><p>指定方法: rgba(255, 255, 255, .3)</p><ul>	<li>r 赤(0 - 255)</li>	<li>g 緑(0 - 255)</li>	<li>b 青(0 - 255)</li>	<li>a alpha(0 - 1)<br>	RGBカラーモデルのred・green・blueに、alphaが加わったものです。<br>	rgbは数値が高いほど純色となります。aが0だと透明で1に近づくにつれ不透明となります。</li></ul></div>

[スケルトンボタン・ベースから応用まで|Code Pen](https://codepen.io/camile/pen/LYZqzjR)

#### ベースのスケルトン

![ベースのスケルトン](./images/2020/11/entry396-6.gif)

背景を半透明にしただけで、クリックとともに白っぽさが増します。

```html
<!-- HTML -->
<a href="" class="btn--skeleton">BUTTON</a>
```

```css
/* CSS */
.btn--skeleton {
  background: rgba(255, 255, 255, .2);
  display: flex;
  width: 180px;
  height: 60px;
  font-size: 1.6rem;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: .3s;
  border: 1px solid #fff;
}

.btn--skeleton:hover {
  background: rgba(255, 255, 255, .5);
}
```

#### クリアソープのようなスケルトンボタン
![ベースのスケルトン](./images/2020/11/entry396-7.gif)

クリアソープのように少し立体感をつけてみました。<br>
box-shadowをinsetにして立体感をつけています。

```html
<!-- HTML -->
<a href="" class="btn--skeleton2">BUTTON</a>
```

```css
/* CSS */
.btn--skeleton3 {
  background: rgba(255, 255, 255, .1);
  display: flex;
  width: 180px;
  height: 60px;
  font-size: 1.6rem;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  letter-spacing: .1em;
  color: #E5FF1D;
  text-shadow:  0 0 3px rgba(255, 255, 255, .8);
  text-decoration: none;
  transition: .3s;
  box-shadow: inset 0 0 6px #E5FF1D, 0 0 6px #E5FF1D;
}

.btn--skeleton3:hover {
  color: #E5FF1D;
  background: transparent;
  text-shadow:  0 0 2px #E5FF1D, 0 0 3px #E5FF1D;
  box-shadow: inset 0 0 4px #E5FF1D, inset 0 0 8px #E5FF1D, 0 0 4px #E5FF1D, 0 0 8px #E5FF1D;
}
```

#### ネオンのようなスケルトンボタン
![ネオンのようなスケルトンボタン](./images/2020/11/entry396-8.gif)

ボーダーをbox-shadowだけで作って、ライトのようにしています。

```html
<!-- HTML -->
<a href="" class="btn--skeleton3">BUTTON</a>
```

```css
/* CSS */
.btn--skeleton3 {
  background: rgba(255, 255, 255, .1);
  display: flex;
  width: 180px;
  height: 60px;
  font-size: 1.6rem;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  letter-spacing: .1em;
  color: #E5FF1D;
  text-shadow:  0 0 3px rgba(255, 255, 255, .8);
  text-decoration: none;
  transition: .3s;
  box-shadow: inset 0 0 6px #E5FF1D, 0 0 6px #E5FF1D;
}

.btn--skeleton3:hover {
  color: #E5FF1D;
  background: transparent;
  text-shadow:  0 0 2px #E5FF1D, 0 0 3px #E5FF1D;
  box-shadow: inset 0 0 4px #E5FF1D, inset 0 0 8px #E5FF1D, 0 0 4px #E5FF1D, 0 0 8px #E5FF1D;
}
```

### グラデーションを利用したボタン
![グラデーションを利用したボタン](./images/2020/11/entry396-9.png)

グラデーションはアニメーションが滑らかに行われないのが難点です。<br>
なので、beforeなどで1個要素を作って移動などアニメーションをさせます。

ここでの**ポイントがz-index**です。

擬似要素を文字の下にもぐりこませないと、字が見えないのでz-indexを使って要素の順番を入れ替えます。

* 親要素 z-index: 1
* 擬似要素 z-index: -1

[グラデーションを利用したボタン|Code Pen](https://codepen.io/camile/pen/xxOMXvq)

今回グラデーションを作るのに使ったのはこのジェネレーターです。
[CSS Gradient](https://cssgradient.io/)

#### グラデーション反転

![グラデーションを利用したボタン](./images/2020/11/entry396-10.gif)

あらかじめグラデーションを逆にした擬似要素をopacity:0で隠しておき、ホバー時に表示させグラデーションを反転させます。

```html
<!-- HTML -->
<a href="" class="btn--gradient">BUTTON</a>
```

```css
/* CSS */
.btn--gradient {
  z-index: 1;
  display: flex;
  width: 150px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  position: relative;
  background: rgb(238,198,139);
  background: linear-gradient(0deg, rgba(238,198,139,1) 0%, rgba(194,91,24,1) 100%);
  letter-spacing: .2em;
  text-shadow: 0 1px 2px #c25b18;
  box-shadow: 0 3px 0 #c25b18;
  transition: .3s;
}

.btn--gradient:hover{
  transform: translateY(1px);
  text-shadow: 0 -1px 2px #c25b18;
  box-shadow: 0 2px 0 #a44d15;
}

.btn--gradient::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: 5px;
  background: linear-gradient(0deg, rgba(194,91,24,1) 0%, rgba(238,198,139,1) 100%);
  opacity: 0;
  transition: .3s;
}

.btn--gradient:hover::before {
  opacity: 1;
}
```
#### グラデーションが横にスライド
擬似要素を2倍（200%）のサイズに作り、`overflow: hidden`で隠しておきます。
hoverした時に`left: -100%`でアニメーションさせます。

![グラデーションが横にスライド](./images/2020/11/entry396-11.gif)

```html
<!-- HTML -->
<a href="" class="btn--gradient2">BUTTON<i class="zmdi zmdi-chevron-right"></i></a>
```

```css
/* CSS */
.btn--gradient2 {
  z-index: 1;
  display: flex;
  width: 150px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
  color: #184dc2;
  text-decoration: none;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  overflow: hidden;
}

.btn--gradient2::before {
  content: '';
  display: block;
  width: 200%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: rgb(139,238,145);
  background: linear-gradient(45deg, rgba(139,238,145,1) 0%, rgba(109,199,255,1) 100%);
  transition: .3s;
}

.btn--gradient2 i {
  text-shadow: 0 0 0 transparent;
  transition: .3s;
}

.btn--gradient2:hover i {
  transform: translateX(3px)
}

.btn--gradient2:hover i {
  text-shadow: 4px 0 0 #184dc2, 8px 0 0 #184dc2;
}

.btn--gradient2:hover::before {
  left: -100%;
}
```
#### きっちりセパレートさせた色でアニメーション

![きっちりセパレートさせた色でアニメーション](./images/2020/11/entry396-12.gif)

私のこのブログのデザインにも使っている左上のマークがスライドするボタンです。<br>
ポイントはグラデの角度を315度の斜めにし左右の色をそれぞれ50%に設定します。<br>
あとは先ほどのグラデーション横にスライドのようにアニメーションさせるだけです。

```html
<!-- HTML -->
<a href="" class="btn--gradient3">BUTTON</a>
```

```css
/* CSS */
.btn--gradient3 {
  z-index: 1;
  display: flex;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  position: relative;
  border: 1px solid #211b71 ;
  letter-spacing: .2em;
  overflow: hidden;
  transition: .3s;
}

.btn--gradient3::before {
  content: '';
  display: block;
  width: 200%;
  height: 100%;
  position: absolute;
  left: -100%;
  top: 0;
  z-index: -1;
  background: rgb(33,27,113);
  background: linear-gradient(315deg, rgba(33,27,113,1) 50%, rgba(254,255,251,1) 50%);
  transition: .3s;
}

.btn--gradient3:hover {
  color: #211b71;
}

.btn--gradient3:hover::before {
  left: 0;
}
```

## その他よりインタラクティブなボタン
その他型押しのような文字のボタン、shadowを利用したクールなボタン、マウスオーバーすると波紋が広がるボタンなど作ってみました。

![その他よりインタラクティブなボタン](./images/2020/11/entry396-13.jpg)

[その他よりインタラクティブなボタン| Code Pen](https://codepen.io/camile/pen/QWEYOMb)

#### 文字がエンボス

![文字がエンボス](./images/2020/11/entry396-14.gif)

text-shadowとbox-shadowでエンボス風のボタンです。

```html
<!-- HTML -->
<a href="" class="btn--emboss">BUTTON</a>
```

```css
/* CSS */
.btn--emboss {
  display: flex;
  width: 180px;
  height: 70px;
  justify-content: center;
  align-items: center;
  color: #de7fb5;
  font-weight: bold;
  border-radius: 10px;
  font-size: 20px;
  text-decoration: none;
  position: relative;
  text-shadow: 2px 2px 2px #c8428f, -2px -2px 2px #f2c4df;
  background: #cb69a2;
  letter-spacing: .2em;
  box-shadow: inset 2px 2px 3px #f2c4df, inset  -2px -2px 2px #c8428f, 0 0 10px rgba(0, 0, 0, .3);
  transition: .3s;
}

.btn--emboss:hover {
  background: #c15795;
  color: #cb69a2;
  text-shadow: 2px 2px 2px #c8428f, -2px -2px 2px #ecaed2;
}
```
#### パキッとした影が広がるボタン

![パキッとした影が広がるボタン](./images/2020/11/entry396-15.gif)

box-shadowを2個重ねるだけで、クールなボタンができます。
```html
<!-- HTML -->
<a href="" class="btn--shadow">BUTTON</a>
```

```css
/* CSS */
.btn--shadow {
  display: flex;
  width: 180px;
  height: 70px;
  justify-content: center;
  align-items: center;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  background: #fff;
  text-decoration: none;
  border: 3px solid #333;
  transition: .3s;
}

.btn--shadow:hover {
  background: #333;
  color: #fff;
  border: 3px solid #fff;
  box-shadow: 6px 6px 0 #333, -6px -6px 0 #333;
}
```
#### クリックすると波紋が広がるボタン

![クリックすると波紋が広がるボタン](./images/2020/11/entry396-16.gif)

クリックすると波紋が広がります。

```html
<!-- HTML -->
<a href="" class="btn--bubble">BUTTON</a>
```

```css
/* CSS */
.btn--bubble {
  z-index: 1;
  display: flex;
  width: 180px;
  height: 70px;
  justify-content: center;
  align-items: center;
  color: #fff;
  letter-spacing: .2em;
  font-weight: bold;
  border-radius: 5px;
  font-size: 20px;
  text-decoration: none;
  background: rgb(105,147,203);
  background: linear-gradient(0deg, rgba(105,147,203,1) 0%, rgba(97,110,213,1) 100%);
  overflow: hidden;
  position: relative;
}

.btn--bubble::before {
  content: '';
  height: 25px;
  width: 25px;
  left: calc(50% - 12px);
  bottom: calc(50% - 12px);
  border-radius: 50%;
  display: block;
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255, 0) 0%, rgba(255,255,255,.5) 100%);
  opacity: 0;
  position: absolute;
}

.btn--bubble::after {
  position: absolute;
  content: '';
  height: 25px;
  width: 25px;
  left: calc(50% - 12px);
  bottom: calc(50% - 12px);
  display: block;
  opacity: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255, 0) 0%, rgba(255,255,255,.5) 100%);
}

.btn--bubble:hover::before {
  animation: expand 2.5s .5s infinite;
}

.btn--bubble:hover::after {
  animation: expand 2.5s infinite;
}

@keyframes expand{
  0% {
    opacity: .5;
  }
    100% {
    transform: scale(10);
    opacity: 0;
  }
}
```
#### ボーダーがアニメーションするボタン
![ボーダーがアニメーションするボタン](./images/2020/11/entry396-17.gif)

ボーダーが左上と右下からアニメーションするボタンです。**heightとwidthを0から100%**に広げることで実現しています。
```html
<!-- HTML -->
<a href="" class="btn--border">BUTTON</a>
```

```css
/* CSS */
.btn--border {
  display: flex;
  width: 180px;
  height: 70px;
  justify-content: center;
  align-items: center;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  background: #fff;
  text-decoration: none;
  border: 3px solid #333;
  transition: .3s;
  box-sizing: border-box;
  position: relative;
}

.btn--border::before {
  content: '';
  height: 0;
  width: 0;
  right: -3px;
  top: -3px;
  position: absolute;
  border-top: 3px solid orange;
  border-right: 3px solid orange;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  opacity: 0;
  transition: .5s;
}

.btn--border::after {
  content: '';
  height: 0;
  width: 0;
  bottom: -3px;
  left: -3px;
  position: absolute;
  border-bottom: 3px solid orange;
  border-left: 3px solid orange;
  border-right: 3px solid transparent;
  border-top: 3px solid transparent;
  opacity: 0;
  transition:.5s;
}

.btn--border:hover {
  background: #333;
  color: orange;
}

.btn--border:hover::before,
.btn--border:hover::after {
  height: 100%;
  width: 100%;
  opacity: 1;
}
```

### まとめ・ウェブサイトと調和するボタンを設置しよう
ボタンデザインたくさんあって目移りすると思いますが、凝りすぎているとサイトと調和するのが難しい場合もあります。

サイトと調和するかよく考慮した上で、実装するのが◯ですね！

その他チェックボックス やセレクトボックスのフォームパーツ類もコードスニペットあります。
参考にしてください。

<card id="/blogs/entry370/"></card>

<card id="/blogs/entry393/"></card>

みなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

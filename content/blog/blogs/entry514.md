---
title: 軽量スライダーSwiperでスマホ（SP）のみ表示を切り替える方法（複数対応）
date: 2022-12-17
pagetype: blog
cateId: web-developer
hero: thumbnail/2022/entry514.png
tags: ["JavaScript","CSS"]
description: jQuery不要軽量Swiper。レスポンシブでスライダー画像をスマホだけで表示したい場合の対応方法を綴ります。複数のスライダーに対応した方法のご紹介。
lead: ["Webサイトでスライドショー（スライダー、スライダー）は便利ですよね？私はjQuery不要の軽量Swiperというライブラリを愛用しています。","レスポンシブでUIが多様化してスマホではスライダー、PCでは適用しないなど対応しないといけないこともありますよね？","Swiperではスライダーをスマホだけで表示したい場合もカンタンです。","スライダーで切り替えをしたいときにはコツがあるのでその方法もご紹介します。"]
---
## Swiper とは？
Swiperとは、最新の無料で使えるモバイルタッチに対応したスライドショー用の JavaScript の jQuery 不要の軽量ライブラリです。

npm や CDN も用意されています。Angular、React や Vue などからも使うことができます。

![Swiperとは？](./images/2022/12/entry514-1.png)
## Swiper 基本の使い方
実装方法です。

ざっくり使い方を紹介します。

今回紹介するのは、CDN のリンクを貼るだけの簡易的な方法です。<br>他の方法は [Get start](https://swiperjs.com/get-started) をご確認ください。

<br>CDNをheadタグ内などに読み込みます。

```html:title=html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
```
<small>ソースは2022年12月現在参照です。必ず [Get start](https://swiperjs.com/get-started) から最新のリンクをご確認ください。</small>

<br>スライダーのHTMLは以下。クラス `swiper` に今回はスライダーを適応します。ページネーションなどの部品を追加したい場合はクラスを指定した要素を追加します。

```html:title=html
<!-- Slider のメインのコンテナー -->
<div class="swiper">
  <!-- ラッパー -->
  <div class="swiper-wrapper">
    <!-- 各スライド -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    ...
  </div>
  <!-- ページネーションが必要な場合以下コード -->
  <div class="swiper-pagination"></div>

  <!-- 次へ前へ（ページネーション）ボタンが必要な場合 -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- スクロールバーが欲しい場合 -->
  <div class="swiper-scrollbar"></div>
</div>
```

JSは以下のように指定します。ページネーションやその他の部品が必要な場合は要素にクラスを指定します。
```JavaScript:title=JavaScript
const swiper = new Swiper('.swiper', {
  // オプション、ループしたい場合は以下
  loop: true,

  // ページネーションが必要な場合要素のクラスを指定する場合
  pagination: {
    el: '.swiper-pagination',
  },

  // 次へ前へ（ページネーション）ボタンが必要な場合要素のクラスを指定
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // スクロールバーが必要な場合
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
```

## 一つを Swiper をスマホ、PCで切り替える方法
一つのSwiperを切り替える際は以下の方法でOKです。


`destroy()`で一度作ったスライダーを破棄できます。SPサイズに切り替えたときにスライダーを再構築します。

```JavaScript:title=JavaScript
const breakPoint = 768;
window.addEventListener('DOMContentLoaded', () => {
  const options = {
    navigation: {
      nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  }
  const;
  let swiper;
  if ( window.innerWidth <= breakPoint ) {
    swiper = new Swiper('.swiper');
  } else {
    swiper = undefined;
  }
  window.addEventListener('resize', () => {
    if ( window.innerWidth <= breakPoint ) {
      if( swiper ) return;
      swiper = new Swiper('.swiper');
    } else {
      if( !swiper ) return;
      swiper.destroy();
      swiper = undefined;
    }
  })
})
```
今回はスマホになったときにスライダー表示に切り替えます。コードを変えれば、逆も可能です。

```JavaScript:title=JavaScript
if ( window.innerWidth <= breakPoint )
↓↓↓
if ( window.innerWidth > breakPoint )

```
## 複数のSwiperをスマホ、PCで切り替える方法
複数の場合は各スライダーにユニークな指定をする必要があります。

この場合はそれぞれのスライダーにIDを `swiper01` 、 `swiper02` とします。
```html:title=html
<div class="swiper" id="swiper01">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>

<div class="swiper" id="swiper02">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```
IDとともに `.swiper` も付与します。そのスライダー `document.querySelectorAll` で取得し、配列に格納します。

配列に格納した配列をコントロールします。

このコードであれば、1〜複数のスライダーをコントロール可能です。

```JavaScript:title=JavaScript
let swipersItems = [];
const breakPoint = 768;
let swipers = document.querySelectorAll('.swiper');
window.addEventListener('DOMContentLoaded', () => {
  const options = {
     navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  }
  swipers.forEach((element, index) => {
    if ( window.innerWidth <= breakPoint ) {
      swipersItems[index] = new Swiper('#' + element.id, options);
    } else {
      swipersItems[index] = undefined;
    }
  });
  window.addEventListener('resize', () => {
    swipers.forEach((element, index) => {
      if ( window.innerWidth <= breakPoint ) {
        if( swipersItems[index] === undefined ) {
          swipersItems[index] = new Swiper('#' + element.id, options);
        }
      } else {
        if( swipersItems[index] !== undefined ) {
          swipersItems[index].destroy();
          swipersItems[index] = undefined;
        }
      }
      return;
    })
  })

}, false);
```


## まとめ
今回スライダーを複数切り返したかったけど、同じクラスで指定したせいで `destroy` の関数でエラーを吐いてドハマリしました。

同じクラスで指定したのが原因で、ユニークな指定（ID）であればすんなり実装できました。

同じことでハマっている人への一助となれば幸いです。

最後までお読みいただきありがとうございました。

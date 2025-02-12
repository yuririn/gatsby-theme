---
title: 軽量スライダーSwiperでスマホ（SP）のみスライダー表示にする方法（複数対応）
date: 2022-12-17
modifieddate: 2025-01-28
pagetype: blog
cateId: web-developer
hero: thumbnail/2022/entry514.png
tags: ["JavaScript","html"]
description: jQuery不要軽量Swiper。レスポンシブでスライダー画像をスマホだけで表示したい場合の対応方法を綴ります。複数のスライダーに対応した方法のご紹介。2025年1月にメンテナンスしました。
---
Webサイトでスライドショー（スライダー）は便利ですよね？私は jQuery 不要の軽量Swiper というライブラリを愛用しています。この記事は、2025年1月にメンテナンスしました。

昨今レスポンシブが主流となり UI も多様化してスマホではスライダー、PCでは適用しないなどの実装をすることもありますよね？<br>Swiper ではスライダーをスマホだけで表示したい場合もカンタンです。ただこれはスライダーが一つのみのお話。

複数のスライダーで切り替えをしたいときにはコツがあるのでその方法もご紹介します。

<prof></prof>
この記事の対象者はこんな方です。

<msg txt="以下心当たりのある方への必見お役立ち記事です。"></msg>

* Swiper を使ったことがある、もしくはJSは使い慣れていてなんとかなりそう
* Swiper をスマホもしくはPCのみで使いたい
* 表示切り替えが必要なSwiperがページ内に複数ある
* スライダーを実装したいけどスマホで次のスライドをほんの少し見せたい
* jQuery は使いたくない


## Swiper とは？
Swiper とは、最新の無料で使えるモバイルタッチに対応したスライドショー用の JavaScript の jQuery 不要の軽量ライブラリです。

npm や CDN も用意されています。Angular、React や Vue.js などからも使うことができます。

![Swiperとは？](./images/2022/12/entry514-1.png)
## Swiper 基本の使い方
実装方法です。

ざっくり使い方を紹介します。

今回紹介するのは、CDN のリンクを貼るだけの簡易的な方法です。<br>他の方法は [Get start](https://swiperjs.com/get-started) をご確認ください。

<br>CDN の JS&CSS のリンクを を head タグ内などに読み込みます。

```html:title=HTML
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```
Module 形式であれば import でも書けます。
```html:title=js
<script type="module">
  import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

  const swiper = new Swiper(...)
</script>
```
<ad location="/blogs/entry514/"></ad>

<small>CDNソースへのリンクは2025年1月現在参照です。必ず [Get start](https://swiperjs.com/get-started) から最新のリンクをご確認ください。</small>

<br>スライダーの HTML は以下。今回はクラス `swiper` を付与した要素にスライダーを適応します。もちろん、IDなどでも指定可能です。ページネーションなどの部品を追加したい場合はクラスを指定した要素を追加します。

```html:title=HTML
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
  <!-- ページネーションが必要な場合 -->
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
}, false);
```
<ad location="/blogs/entry514/"></ad>

## Swiper でスマホ、PCで切り替える方法（単体）
では実際に一つのSwiperを切り替えてみましょう。

仕上がりイメージは以下のような感じです。
![Swiper でスマホ、PCで切り替える](./images/2022/12/entry514-2.png)

`destroy()` で一度作ったスライダーを破棄できます。SPサイズに切り替えたときにスライダーを再構築します。

```JavaScript:title=JavaScript
/**
 * Swiper のオプション
 * @type {array}
 */
const options = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 30,
  slidesPerView: "auto",
}
/**
 * ブレークポイント
 * @type {number} ブレークポイントの値
 */
const breakPoint = 768;
/**
 * ディバイス幅の設定
 * @returns ブレークポイントマッチ結果
 */
const isDevice = () => {
  return window.matchMedia(`(max-width: ${breakPoint}px)`).matches;
};

/**
 * Throttle resize処理の回数を間引く処理
 * @param {void} func 中に入る関数
 * @param {number} timeout タイムアウト時間
 * @returns func 実行結果
 */
const throttle = (func, timeout) => {
  let timer;
  let lastTime;
  return function (...args) {
      const context = this;
      if (!lastTime) {
          func.apply(context, args);
          lastTime = Date.now();
      } else {
      clearTimeout(timer);
          timer = setTimeout( () => {
              func.apply(context, args);
              lastTime = Date.now();
          }, timeout - (Date.now() - lastTime) );
      }
  }
}

// 変数にSwiperの状態を格納
let swiper = isDevice() ? new Swiper('.swiper', options) : undefined;

/**
 * 切り替え処理
 */
const switchSwiper = () => {
  if ( isDevice() ) {
      if( swiper ) return;
      swiper = new Swiper('.swiper', options);
  } else {
    if( !swiper ) return;
    swiper.destroy();
    swiper = undefined;
  }
}
//Window resize
window.addEventListener('resize', throttle(switchSwiper, 200), false);
```
### throttle 関数で実行回数を間引く
今回自作の throttle 関数で resize の実行回数を間引きました。

[lodash](https://lodash.com/docs/4.17.15#throttle) などのライブラリを使ってもいいかもしれませんね。

```js:title=js
const throttle = (func, timeout) => {
  let timer;
  let lastTime;
  return function (...args) {
      const context = this;
      if (!lastTime) {
          func.apply(context, args);
          lastTime = Date.now();
      } else {
      clearTimeout(timer);
          timer = setTimeout( () => {
              func.apply(context, args);
              lastTime = Date.now();
          }, timeout - (Date.now() - lastTime) );
      }
  }
}
```
`apply()` は、指定したthis値で関数を呼び出し、引数を配列として提供するメソッドです。
`throttle` の引数 `fnc` にまとめて格納できます。

```js
func.apply(thisArg, [ argsArray])
```

### CSSの変更
PC表示で適宜スタイルを打ち消します。

```css:title=css
@media screen and (min-width: 768px) {
  .swiper-button-prev, .swiper-button-next {
    display: none;
  }
  .swiper-wrapper {
    display: flex;
    gap: 24px;
  }
  .swiper-slide {
    width: calc(33.333% - 16px);
  }
}
```

### PCのみにスライダーを適応したい時
今回はスマホになったときにスライダー表示に切り替えていますが、isDevice()の中身を変えれば逆も可能です。

デバイスの判定には `matchMedia` を使いました。CSSのメディアクエリと同じ感覚で使えます。
```JavaScript:title=JavaScript
const breakPoint = 768;
window.matchMedia(`(max-width: ${breakPoint}px)`).matches
↓↓↓
const breakPoint = 767;
window.matchMedia(`(min-width: ${breakPoint}px)`).matches
```
### 補足・次のスライダーを少しだけ見せたい
スマホなどではよく次にスライダーがあることを示唆するために、次のスライダーをチラ見せする手法をよく使います。

![おまけ・次のスライダーを少しだけ見せたい](./images/2022/12/entry514-3.png)

その場合は、`option` の `slidesPerView` を `"auto"`に指定し

```JavaScript:title=JavaScript
const options = {
  slidesPerView: "auto",
}
```
`width` を任意の幅に指定します。
```css:title=css
.swiper-slide {
  width: 80%;
}
```

デモサンプル [Swiper for SP | CodePen](https://codepen.io/camille-cebu/pen/BaPBGxm)
## 複数のSwiperをスマホ、PCで切り替える方法
複数の場合は各スライダーにユニークな指定をする必要があります。

この場合はそれぞれのスライダーにIDを `swiper01` 、 `swiper02` とします。
```html:title=HTML
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

<ad location="/blogs/entry514/"></ad>

このコードであれば、1〜複数のスライダーをコントロール可能です。

```JavaScript:title=JavaScript
//throttle, options, isDevice省略

// swiperのタグをまとめて取得して配列化
const swipers = Array.from(document.querySelectorAll('.swiper'));
//swiperを格納する殻の変数
let swipersItems = [];
window.addEventListener('DOMContentLoaded', () => {
  // swiper の状態を map で格納し新しい配列を作成
  swipersItems = swipers.map( swiper => {
    return isDevice() ? new Swiper('#' + swiper.id, options) : undefined;
  });
  //リサイズで状態を変更
  const swichSwiper = () =>{
    //mapよりも早いのでforEachで処理
    //swipersItemsで値をアップデート
    //returnで返すと新しい配列になるので意味がない
    swipers.forEach((swiper, i) => {
      if ( isDevice() ) {
        if( swipersItems[i] === undefined ) {
          swipersItems[i] = new Swiper('#' + swiper.id, options);
        }
      } else {
        if( swipersItems[i] !== undefined ) {
          swipersItems[i].destroy();
          swipersItems[i] = undefined;
        }
      }
      return;
    })
  }
  window.addEventListener('resize', throttle(swichSwiper, 200), false);
}, false);
```
<ad location="/blogs/entry514/"></ad>

デモサンプル [Swiper for SP2 | CodePen](https://codepen.io/camille-cebu/pen/RwBbqEV)

## まとめ
今回スライダーを複数切り返したかったけど、同じクラス名をSwiper生成したせいで `destroy` 処理の時に関数エラーでドハマリしました。

同じクラスで指定したのが原因で、ユニークな指定（ID）であればすんなり実装できました。

<msg txt="2時間くらい、仮説と検証を繰り返しやっとエラーを抜け出せました。。。"></msg>

同じことでハマっている人への一助となれば幸いです。

最後までお読みいただきありがとうございました。

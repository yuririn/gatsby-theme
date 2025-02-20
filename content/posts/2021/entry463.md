---
title: カウントダウンタイマーをバニラJS（JavaScript/CommonJS）でシンプルに実装
date: 2021-05-22
modifiedDate: 2025-02-19
hero: thumbnail/2021/entry463.jpg
pageType: blog
cateId: 'web-developer'
tags: ["JavaScript"]
description: jQueryなし！バニラJS（プレーンなJavaScript）のカウントダウンタイマーを作ってみたのでそのコードを紹介します。日、時間、分、秒を取得する方法やsetTimeout&clearTimeoutについて解説。さらに、requestAnimationFrameでの実装方法も紹介。サンプルコードもあるので参考にしてください。ライブラリ（Luxon）を使って、正確なタイムゾーンに対応した、カウントダウンタイマーのコードも紹介しています。
faq:
  - ["タイマーの更新には requestAnimationFrame と setTimeout どちらを使うべきですか？","カウントダウンタイマーの場合、正確な時間間隔での更新が重要なため、 setTimeout が適しています。アニメーションを伴う場合は、 requestAnimationFrame も検討してください。","タイマーの終了処理を入れる"]
  - ["時間がずれて正確な日時が取得できません。日本時間で確実に日時を取得するためにはどうすればいいですか？"," Luxon や date-fns-tz 、 Day.js 、 js-Joda などのライブラリを使用することで、日本時間を正確に取得することができます。例えば、以下のように使用します：<br> Luxon ：<br/> const DateTime = require('luxon') <br/> const japanTime = DateTime.now().setZone('Asia/Tokyo') <br/> console.log(japanTime.toString()) <br/>","ライブラリで正確な時間を取得（2025年2月追記）"]
  - ["Moment.js の使い方について教えてください"," Moment.js は開発が終了しているため、 Luxon や date-fns-tz 、 Day.js 、 js-Joda などの代替ライブラリを使用することをお勧めします。これらのライブラリは軽量でモダンな API を提供し、引き続きメンテナンスが行われています。"]
---
jQuery なし！バニラJS（JavaScript/CommonJS）のカウントダウンタイマーを作ってみたのでそのコードを紹介します。

日、時間、分、秒を取得する方法やsetTimeout&clearTimeoutについて解説しています。<br>サンプルコードもあるので参考にしてください。
<prof></prof>

*この記事の対象者*

* JavaScriptが少しわかる
* Webコーディング・プログラミング勉強中
* jQuery使いたくない
* requestAnimationFrame も使ってみたい

<msg txt="ライブラリーいらず！<br>バニラJS（JavaScript/CommonJS）で実装するから、テキストエディターだけあれば実装できます！"></msg>

この記事は、2025年2月に大幅にコードを改善し、さらに[ライブラリ（Luxon）で正確な時間を取得](#%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%A7%E6%AD%A3%E7%A2%BA%E3%81%AA%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%972025%E5%B9%B42%E6%9C%88%E8%BF%BD%E8%A8%98)を追記しました。
## new Date()の使い方

JavaScriptの `Date` オブジェクトについて。

> JavaScript の日時は、基本的に協定世界時 (UTC) の1970年1月1日深夜0時からの経過ミリ秒数で指定されます。この日付と時刻は、コンピューターに記録される日付と時刻の値の主な基準値である UNIX Epoch と同じです。

[Date|MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)


```js
const today = new Date();
console.log(today);
```
ちょっと画像が小さいですが、現在の日時を取得できます。

![Sun May 23 2021 06:38:22 GMT+0800 (フィリピン標準時)](./images/05/entry463-1.jpg)

私が住むフィリピンの時間になってますが、日本で同じコードを実行すればもちろん日本の時間が取得できます。

### 現在と終了日の差分を取得する

```js
//ISO 8601形式で記述
const goal = new Date("2021-06-22T00:00:00");
const today = new Date();
```

<br> `getTime()` で値の取得をします。

1970年1月1日深夜0時から指定した日時までの *ミリ秒* を取得できます。

```js
const diffTime = date.getTime() - now.getTime();
```
差分が残り時間（ミリ秒）になるのでこの数値を日、時間、分、秒に変換します。

<div class="box">
<h4>getMonthに気をつける</h4>
<p><code class="language-text">Date</code>オブジェクトは月や曜日、日にちなども取得できるメソッドが用意されています。<br>中でもgetMonthという月を取得するメソッドを使用する際は要注意、JSでは月だけなぜか0始まりで5月が4といったようになります。<br>出力する際は<code class="language-text">getMonth() + 1</code>といったように1プラスする必要があります。</p>
</div>

### Data オブジェクトがうまく動かない場合

以下のような簡略化した書き方では、一部のブラウザ（特に古いバージョン）は、完全にISO 8601形式（日付と時間の標準）に準拠した文字列でないと解釈できないことがあるので注意。

```js
new Date("2022-08-23 8:40:00")
```
Data オブジェクトの取り扱いには以下も併せて注意が必要。
* *ブラウザ依存*: JavaScriptのDateオブジェクトはブラウザごとに実装が異なる。一部のブラウザはローカル形式の日付文字列をサポートするが、他のブラウザではエラーが発生する可能性がある。
* *時間帯*: 明示的にタイムゾーンを指定しない場合、一部のブラウザはデフォルトのタイムゾーンを使用し、それに基づいて日時を解釈。

回避法。コンストラクタ引数を使用する
```js
const date = new Date(2022, 7, 23, 8, 40, 0); // 月は0から始まるので7は8月を表す
console.log(date);
```
ライブラリを利用することもできます。
[Luxon](https://moment.github.io/luxon/) 

### 切り捨てと除算を使って秒、分、時間、日数を取得する
まずは秒を取得してみましょう。

取得した値はミリ秒なので、
単純に1000で割り、小数点以下を切り捨て値が秒になります。

`Math.floor()`を使って小数点以下を切り捨てます。

```js
const sec = Math.floor(diffTime / 1000);
```

ここから分を除くためには、60で割った余りを取得しなければなりません。

余りを計算するのに便利なものが*除算*です。

先に除算の使い方を紹介します。<br>
除算は`%`を使います。13を3で割ると余りは1になるので出力結果は1になります。
```js
const num = 13 % 3
console.log(num)//出力結果は1
```
60（分）で割り切れな数が秒になるので、以下の計算式で出力できます。
```js
const sec = Math.floor(diffTime / 1000) % 60;
```

秒、分、時間、日数はそれぞれ以下で算出できます。
```js

const sec = Math.floor(diffTime / 1000) % 60;
const min = Math.floor(diffTime / 1000 / 60) % 60;
const hours = Math.floor(diffTime / 1000 / 60 / 60) % 24;
const days = Math.floor(diffTime / 1000 / 60 / 60 / 24);
```

### カウントダウンに必要なそれぞれの値を関数にまとめる
```JS
// 目標日時の設定
const goal = new Date("2021-05-23T08:15:00");

// カウントダウンの計算結果を格納する変数
let count;

// カウントダウンの計算関数
const countDown = (goal) => {
  const now = new Date();
  const diffTime = goal.getTime() - now.getTime();

  // 残り時間の計算
  if (diffTime > 0) {
    const sec = Math.floor(diffTime / 1000) % 60;
    const min = Math.floor(diffTime / 1000 / 60) % 60;
    const hours = Math.floor(diffTime / 1000 / 60 / 60) % 24;
    const days = Math.floor(diffTime / 1000 / 60 / 60 / 24);
    count = { days, hours, min, sec };
  } else {
    // 目標日時を過ぎている場合処理を止める
    count = { days: 0, hours: 0, min: 0, sec: 0 };
  }

  return count;
};
```
## setTimeoutでタイマー処理

タイマー処理をします。関数`countDown`で作った値をHTMLに反映させます。

```html
<div class="countdown-timer">
  <span id="days"></span>日<span id="hours"></span>時間<span id="min"></span
  >分<span id="sec"></span>秒
</div>
```
```js
//Timer処理
function setCountDown() {
  let counter = countDown(goal);
  const countDownTimer = setTimeout(setCountDown, 1000);

  for (let item in counter) {
    document.getElementById(item).textContent = counter[item];
  }
}
setCountDown();
```

今回は`setTimeout`を使いました。
```js
setTimeout(処理, 間隔);
```
出力はオブジェクト配列をループさせるために for in 文を使いました。

```js
for (const item in array) {
  item //キー
  array[item] //値
}
```
<card slug="entry482"></card>
### タイマーの終了処理を入れる
このままでは0の状態でTimerだけ動き続けるので、終了処理を入れます。

残りの日時のすべての値が0になったら、タイマーを止めます。
```js:title=setTimeoutを使ったケース
// タイマー処理
const setCountDown = () => {
  //先ほど作成した関数を格納
  const counter = countDown(goal);
  let end = 0;

  // 1秒ごとにカウントダウンを更新
  const countDownTimer = setTimeout(setCountDown, 1000);

  // 結果をDOMに表示
  for (const item in counter) {
    document.getElementById(item).textContent = counter[item];
    end += counter[item]
  }

  // カウントダウンが終了した場合
  if (end === 0) {
    clearTimeout(countDownTimer);
  }
};
```
requestAnimationFrame を使う事もできます。
```js:title=requestAnimationFrameを使ったケース
// タイマー処理
const setCountDown = () => {
  const counter = countDown(goal);
  let end = 0;

  // カウントダウンを更新
  const countDownTimer = requestAnimationFrame(setCountDown);

  // 結果をDOMに表示
  for (const item in counter) {
    document.getElementById(item).textContent = counter[item];
    // parseIntを省略
    end += counter[item];
  }

  // カウントダウンが終了した場合
  if (counter.days === 0 && counter.hours === 0 && counter.min === 0 && counter.sec === 0) {
    cancelAnimationFrame(countDownTimer);
  }
};
```
requestAnimationFrame と setTimeout の違いはこんな感じ
|                          | setTimeout                       | requestAnimationFrame                 |
|--------------------------|-------------------------------------|-----------------------------------------|
| *メリット*             | 簡単、 任意の時間間隔で実行         | スムーズなアニメーション、 効率的        |
| *デメリット*           | 描画と同期しない、 カクつくことがある | 正確な時間指定が難しい、 ループ処理が必要 |
| *使い方*               | 指定した時間後に関数を実行          | ブラウザの描画のタイミングで実行         |

正確な時間間隔での繰り返し処理が必要な場合は、setTimeout を使ってください。

<msg txt="キャンペーンやセール終了などはクレームになりかねないので、setTimeoutがいいかもですね。"></msg>

タイマーのID名をセットします。
```js
const ID名 = setTimeout(処理,間隔);
```

ある条件で、`clearTimeout(ID名)`で終了させることができます。

```js
if (条件式) {
  clearTimeout(ID名);
}
```
### コードをまとめると
すべてのコードはこんな感じになります。
```html
<div class="countdown-timer">
  <span id="days"></span>日<span id="hours"></span>時間<span id="min"></span
  >分<span id="sec"></span>秒
</div>
```
```js
// 目標日時の設定
const goal = new Date("2021-05-23T08:15:00");

// カウントダウンの計算結果を格納する変数
let count;

// カウントダウンの計算関数
const countDown = (goal) => {
  const now = new Date();
  const diffTime = goal.getTime() - now.getTime();

  // 残り時間の計算
  if (diffTime > 0) {
    const sec = Math.floor(diffTime / 1000) % 60;
    const min = Math.floor(diffTime / 1000 / 60) % 60;
    const hours = Math.floor(diffTime / 1000 / 60 / 60) % 24;
    const days = Math.floor(diffTime / 1000 / 60 / 60 / 24);
    count = { days, hours, min, sec };
  } else {
    // 目標日時を過ぎている場合
    count = { days: 0, hours: 0, min: 0, sec: 0 };
  }

  return count;
};

// タイマー処理
const setCountDown = () => {
  const counter = countDown(goal);
  let end = 0;

  // 1秒ごとにカウントダウンを更新
  const countDownTimer = setTimeout(setCountDown, 1000);

  // 結果をDOMに表示
  for (const item in counter) {
    document.getElementById(item).textContent = counter[item];
    end += counter[item];
  }

  // カウントダウンが終了した場合
  if (end === 0) {
    clearTimeout(countDownTimer);
  }
};

// カウントダウンの開始
setCountDown();
```

ここまでのコードではCSSを実装していないのですが、CSS付きでCodepenにサンプルをあげています。

<figure class="animation"><img src="/images/animation/2021/entry463-2.webp" width="600" height="184" alt="見るからにいやらしいキャンペーン" decoding="async" loading="lazy"/></figure>

興味がある方はこちらもどうぞ^ ^

[カウントダウンタイマー|CodePen](https://codepen.io/camille-cebu/pen/mdXjKmd)

## ライブラリで正確な時間を取得（2025年2月追記）
キャンペーンなどに使うカウントダウンタイマーは、より正確な時間を取得して、タイムゾーンがずれないようにする必要があります。

先程も Luxon について少し紹介しましたが、他にもいくつかライブラリがあります。

| ライブラリ                                      | 特徴                           |
|------------------------------------------------|--------------------------------|
| [Luxon](https://moment.github.io/luxon/)        | モダンなAPIと軽量性を両立       |
| [date-fns-tz](https://date-fns.org/)            | 軽量で機能的                   |
| [Day.js](https://day.js.org/)                   | 軽量でMoment.js互換のAPI       |
| [js-Joda](https://js-joda.github.io/js-joda/)   | ドメイン駆動設計で不変性を重視  |

今回は、Luxonを使ったコードを紹介します。お手軽にCDNを読み込んで使います。

```html:title=HTML
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Countdown Timer</title>
  <!-- Luxon CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/luxon/3.5.0/luxon.min.js"></script>
</head>

<body>
  <!-- カウントダウンの表示要素 -->
  <div class="countdown-timer">
    <span id="days"></span>日<span id="hours"></span>時間<span id="min"></span>分<span id="sec"></span>秒
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', (event) => {
      // 目標日時の設定
      const goal = luxon.DateTime.fromISO("2025-05-23T08:15:00", { zone: 'Asia/Tokyo' });

      // カウントダウンの計算結果を格納する変数
      let count;

      // カウントダウンの計算関数
      const countDown = (goal) => {
        const now = luxon.DateTime.now().setZone('Asia/Tokyo')
        const diffTime = goal - now;

        // 残り時間の計算
        if (diffTime > 0) {
          const sec = Math.floor(diffTime / 1000) % 60;
          const min = Math.floor(diffTime / 1000 / 60) % 60;
          const hours = Math.floor(diffTime / 1000 / 60 / 60) % 24;
          const days = Math.floor(diffTime / 1000 / 60 / 60 / 24);
          count = { days, hours, min, sec };
        } else {
          // 目標日時を過ぎている場合
          count = { days: 0, hours: 0, min: 0, sec: 0 };
        }

        return count;
      };

      // タイマー処理
      const setCountDown = () => {
        const counter = countDown(goal);
        let end = 0;

        // 1秒ごとにカウントダウンを更新
        const countDownTimer = setTimeout(setCountDown, 1000);

        // 結果をDOMに表示
        for (const item in counter) {
          document.getElementById(item).textContent = counter[item];
          end += counter[item];
        }

        // カウントダウンが終了した場合
        if (end === 0) {
          clearTimeout(countDownTimer);
        }
      };

      // カウントダウンの開始
      setCountDown();
    });
  </script>
</body>
</html>
```

[カウントダウンタイマーライブラリで正確な時間を取得](https://codepen.io/camille-cebu/pen/mydVRPe)

## まとめ・カウントダウンはバニラJS（プレーンなJavaScript/CommonJS）だけでカンタンに実装できた!
シンブルですがバニラJS（プレーンなJavaScript/CommonJS）でカウントダウンを実装してみました。

もうちょっとデザインをブラッシュアップすれば、キャンペーンとかにも有効的に使えそうですね！！

キャンペーンとして使用するに当たって注意です。

ひと昔前に、「**キャンペーン終了まで残り●日**」が毎日リセットされるカウントダウンをウェブサイトに実装し炎上した企業がありました。

<msg txt="お客に対してに対してウソはいかんです！"></msg>

プログラミングを使ってキャンペーンを打つときは、誠実に！

ていうか、*人として誠実が大事* ですよ！！

<br>余談が過ぎましたが、この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

---
title: カウントダウンタイマーをバニラJS（JavaScript）でシンプルに実装
date: 2021-05-22
modifieddate: 2022-06-06
hero: thumbnail/2021/entry463.jpg
pagetype: blog
cateId: 'web-developer'
tags: ["JavaScript"]
description: jQueryなし！バニラJS（プレーンなJavaScript）のカウントダウンタイマーを作ってみたのでそのコードを紹介します。日、時間、分、秒を取得する方法やsetTimeout&clearTimeoutについて解説しています。サンプルコードもあるので参考にしてください。
lead: ["jQueryなし！バニラJS（プレーンなJavaScript）のカウントダウンタイマーを作ってみたのでそのコードを紹介します。","日、時間、分、秒を取得する方法やsetTimeout&clearTimeoutについて解説しています。","サンプルコードもあるので参考にしてください。"]
---
*この記事の対象者*
* JavaScriptが少しわかる
* Webコーディング・プログラミング勉強中
* jQuery使いたくない

<msg txt="ライブラリーいらず！<br>バニラJS（プレーンなJavaScript）で実装するから、テキストエディターだけあれば実装できます！"></msg>


## new Date()の使い方

JavaScriptの` Date`オブジェクトについて。

> JavaScript の日時は、基本的に協定世界時 (UTC) の1970年1月1日深夜0時からの経過ミリ秒数で指定されます。この日付と時刻は、コンピューターに記録される日付と時刻の値の主な基準値である UNIX Epoch と同じです。

[Date|MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)


```js
const today = new Date();
console.log(today);
```
ちょっと画像が小さいですが、現在の日時を取得できます。

![Sun May 23 2021 06:38:22 GMT+0800 (フィリピン標準時)](./images/2021/05/entry463-1.jpg)

私が住むフィリピンの時間になってますが、日本で同じコードを実行すればもちろん日本の時間が取得できます。

### 現在と終了日の差分を取得する

```js
const goal = new Date("2021-06-22T00:00:00");
const today = new Date();
```
<small>※ Chrome、Safariのバージョンアップに伴い、<code class="language-text">new Date("2022-08-23 8:40:00")</code>のような記述方法では動かない場合があります。</small>

<br> `getTime` で値の取得をします。

1970年1月1日深夜0時から指定した日時までのミリ秒を取得できます。

```js
const left = date.getTime() - now.getTime();
```
差分が残り時間（ミリ秒）になるのでこの数値を日、時間、分、秒に変換します。

<div class="box">
<h4>getMonthに気をつける</h4>
<p><code class="language-text">Date</code>オブジェクトは月や曜日、日にちなども取得できるメソッドが用意されています。<br>中でもgetMonthという月を取得するメソッドを使用する際は要注意、JSでは月だけなぜか0始まりで5月が4といったようになります。<br>出力する際は<code class="language-text">getMonth() + 1</code>といったように1プラスする必要があります。</p>
</div>

### 切り捨てと除算を使って秒、分、時間、日数を取得する
まずは秒を取得してみましょう。

取得した値はミリ秒なので、
単純に1000で割り、小数点以下を切り捨て値が秒になります。

`Math.floor()`を使って小数点以下を切り捨てます。

```js
const sec = Math.floor(left / 1000);
```

ここから分を除くためには、60で割った余りを取得しなければなりません。

余りを計算するのに便利なものが*除算*です。

先に除算の使い方を紹介します。<br>
除算は`%`を使います。13を3で割ると余りは1になるので出力結果は1になります。
```
num = 13 % 3
console.log(num)//出力結果は1
```
60（分）で割り切れな数が秒になるので、以下の計算式で出力できます。
```js
const sec = Math.floor(left / 1000) % 60;
```

秒、分、時間、日数はそれぞれ以下で算出できます。
```js
const sec = Math.floor(rest / 1000) % 60;
const min = Math.floor(rest / 1000 / 60) % 60;
const hours = Math.floor(rest / 1000 / 60 / 60) % 24;
const days = Math.floor(rest / 1000 / 60 / 60 / 24);
```

### カウントダウンに必要なそれぞれの値を関数にまとめる
```JS
const goal = new Date("2021-05-23T08:15:00");
function countDown(goal) {
  const now = new Date();
  const left = goal.getTime() - now.getTime();
  if (left > 0) {
    const sec = Math.floor(left / 1000) % 60;
    const min = Math.floor(left / 1000 / 60) % 60;
    const hours = Math.floor(left / 1000 / 60 / 60) % 24;
    const days = Math.floor(left / 1000 / 60 / 60 / 24);
    let count = { days: days, hours: hours, min: min, sec: sec };
  } else {
    //0以下になったら-の値を生成しない
    count = { days: 0, hours: 0, min: 0, sec: 0 };
  }
  return count;
}
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
出力はオブジェクト配列をループさせるためにforin文を使いました。

```js
for (let item in array) {
  item //キー
  array[item] //値
}
```
### タイマーの終了処理を入れる
このままでは0の状態でTimerだけ動き続けるので、終了処理を入れます。

残りの日時のすべての値が0になったら、タイマーを止めます。
```js
//Timer処理
function setCountDown() {
  let counter = countDown(goal);
  let end = 0;
  const countDownTimer = setTimeout(setCountDown, 1000);

  for (let item in counter) {
    document.getElementById(item).textContent = counter[item];
    end += parseInt(counter[item]);
  }
  if (end === 0) {
    clearTimeout(countDownTimer);
  }
}
```
タイマーのID名をセットします。
```js
const ID名 = setTimeout(処理,間隔);
```
<small>※ IDとかたいそうなこと言ってますが、変数に格納しているだけです。</small>

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
const goal = new Date("2021-05-23T08:15:00");
let count;
function countDown(goal) {
  const now = new Date();
  const left = goal.getTime() - now.getTime();
  if (left > 0) {
    const sec = Math.floor(left / 1000) % 60;
    const min = Math.floor(left / 1000 / 60) % 60;
    const hours = Math.floor(left / 1000 / 60 / 60) % 24;
    const days = Math.floor(left / 1000 / 60 / 60 / 24);
    count = { days: days, hours: hours, min: min, sec: sec };
  } else {
    count = { days: 0, hours: 0, min: 0, sec: 0 };
  }
  return count;
}
//Timer処理
function setCountDown() {
  let counter = countDown(goal);
  let end = 0;
  const countDownTimer = setTimeout(setCountDown, 1000);

  for (let item in counter) {
    document.getElementById(item).textContent = counter[item];
    end += parseInt(counter[item]);
  }
  if (end === 0) {
    clearTimeout(countDownTimer);
  }
}

setCountDown();
```

ここまでのコードではCSSを実装していないのですが、CSS付きでCodepenにサンプルをあげています。

![見るからにいやらしいキャンペーン](./images/2021/05/entry463-2.gif)

興味がある方はこちらもどうぞ^ ^

[カウントダウンタイマー|CodePen](https://codepen.io/camille-cebu/pen/mdXjKmd)

## まとめ・カウントダウンはバニラJS（プレーンなJavaScript）だけでカンタンに実装できた!
シンブルですがバニラJS（プレーンなJavaScript）でカウントダウンを実装してみました。

もうちょっとデザインをブラッシュアップすれば、キャンペーンとかにも有効的に使えそうですね！！

キャンペーンとして使用するに当たって注意です。

ひと昔前に、「**キャンペーン終了まで残り●日**」が毎日リセットされるカウントダウンをウェブサイトに実装し炎上した企業がありました。

<msg txt="ユーザーに対してウソはいかんです！"></msg>

プログラミングを使ってキャンペーンを打つときは、誠実に！

ていうか、*人として誠実が大事* ですよ！！

<br>余談が過ぎましたが、この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

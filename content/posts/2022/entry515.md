---
title: jQuery 不要・noUiSliderレンジスライダーの使い方
date: 2022-12-23
pageType: blog
cateId: web-developer
hero: thumbnail/2022/entry515.png
tags: ["JavaScript","html"]
description: レンジスライダー（つまみのある範囲を選べるフォーム）のJSライブラリ・noUiSliderのご紹介。つまみを2個以上実装したい時に便利！基本の実装方法、オプションの詳細、動的レンダリング、オプションのアップデート方法など詳しく解説します。
---
HTMLでもレンジスライダー用のタグが数年前から使えるようになりましたね。

しかし、ブラウザで見た目がマチマチだし値は1パーツに一個しか付与できず、とても使い勝手が悪いです。レンジスライダー（つまみのある範囲の選べるフォーム）のJSライブラリ・noUiSliderの使い方についてメモしました。noUiSliderはつまみを2個以上実装したい時に便利です。

導入の仕方やレンジスライダーを使った動的フォームの実装方法などのコードサンプルを中心に詳しく解説します。

<prof></prof>
この記事の対象者はこんな方です。

* JavaScript の基礎は分かる
* レンジスライダーを実装したい
* ２個以上の値をレンジで実装する必要がある
* 範囲内で直感的に使えるフォームを実装したい
* jQueryを使いたくない


## レンジスライダーとは？

レンジスライダーとは範囲（レンジ）内で値を選択できるフォームの一種です。

HTMLでもレンジスライダーのフォームパーツはあります。

```html:title=HTML
<input type="range" min="0" max="100">
```
が、ご覧の通り、見た目がマチマチです。

![HTMLだと、ブラウザで見た目がマチマチ](./images/12/entry515-1.png)

<msg txt="今回はサクッとJavaScriptのライブラリで解決します。"></msg>

## noUiSlider 導入方法
早速、noUiSliderの導入方法をご紹介します。

![noUiSlider](./images/12/entry515-2.png)

[noUiSlider公式サイト](https://refreshless.com/nouislider/)

noUiSlider はよくjQueryと紹介されてますが、実際にはjQueryなしで実装可能です。

### 基本の導入方法
もっとも簡単な noUiSlider 導入方法は JavaScript とCSSのソースを読み込む方法です。ソースは [GitHub](https://github.com/leongersen/noUiSlider) にありますが、今回はお気軽にCDNを読み込む方法をご紹介します。

※ [オプション](#おまけオプション) について解説はこの記事の一番最後にまとめています。

![noUiSlider](./images/12/entry515-3.png)

```html:title=HTML
<!-- css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.css">
<!-- js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.js"></script>
```

```html:title=HTML
<div class="range-wrapper">
  <div id="range"></div>
</div>
```
```CSS:title=CSS
#range {
  height: 10px;
}
.range-wrapper {
  width: 800px;
  margin: 0 auto;
  padding: 50px;
}
```


```JavaScript:title=JavaScript
const range = document.getElementById('range');
noUiSlider.create(range, {

    range: {
        'min': 0,
        'max': 10
    },
    step: 1,
    start: [2, 4],
    connect: true,
    behaviour: 'tap-drag',
    pips: {
        mode: 'steps',
        stepped: true,
        density: 10
    }
});
```
オプションの`pips`でメモリと数字が表示されます。

小数点をつけたくない場合は　`pips` の詳細オプションを `density` を `10` にします。

※ [オプション](#おまけオプション) について解説はこの記事の一番最後にまとめています。

コードサンプル　[noUiSlider Basic | CodePen](https://codepen.io/camille-cebu/pen/XWBbgPB)

![noUiSlider Tooltip](./images/12/entry515-4.png)

上のスクショのように、ツールチップ（つまみの上の数字）を表示したい時は、オプション `tooltips` を `true` にします。
```JavaScript:title=JavaScript
const rangeSlider = document.getElementById('values-slider');
noUiSlider.create(range, {
  range: {
      'min': 0,
      'max': 10
    },
    step: 1,
    start: [2, 4],
    connect: true,
    behaviour: 'tap-drag',
    tooltips: true,
    pips: {
      mode: 'steps',
      stepped: true,
      density: 10,
    }
});
```
![noUiSlider Tooltip](./images/12/entry515-5.png)
メモリやツールチップ（つまみの上の数字）を任意の数字にしたい場合はメモリを配列で値を自作します。

※ [オプション](#おまけオプション) について解説はこの記事の一番最後にまとめています。

```JavaScript:title=JavaScript
const rangeSlider = document.getElementById('range');
const valuesForSlider = [0,1,2,3,4, 5,6,7,8,9,10]

const format = {
    to: function(value) {
        return valuesForSlider[Math.round(value)];
    },
    from: function (value) {
        return valuesForSlider.indexOf(Number(value));
    }
};

noUiSlider.create(rangeSlider, {
    start: [4, 8],
    range: { min: 0, max: valuesForSlider.length - 1 },
    step: 1,
    connect: true,
    tooltips: true,
    format: format,
    behaviour: 'tap-drag',
    pips: {
      mode: 'steps',
      stepped: true,
      density: 10,
      format: format,
    }
});
```
コードサンプル　[noUiSlider Tooltip | CodePen](https://codepen.io/camille-cebu/pen/vYaOJEN)


## Events:動的に値やオプションなどを変更する
noUiSliderでは、スライダーの変化やオプションの書き換えなどができるメソッドが用意されています。

### スライダーが更新されたら、フォームの値を変更

noUiSliderのイベントを利用して、スライダーの変化を受け取ることができます。

`noUiSlider.on()` メソッドを使って、フォームの値をリアルタイムでレンダリングさせます。

<figure class="animation"><img src="/images/animation/2022/entry515-6.webp" width="468" height="136" alt="noUiSlider Tooltip" decoding="async" loading="lazy"/></figure>

```html:title=HTML
<div class="range-wrapper">
  <div class="range-num">
    <input type="number" min="0" max="10" id="num-min" step="1" value="5" readonly> ~
    <input type="number" min="0" max="10" id="num-max" step="1" value="8" readonly>
  </div>
  <div id="range"></div>
</div>
```
```css:title=CSS
#range {
  height: 10px;
}
.range-wrapper {
  width: 800px;
  margin: 0 auto;
  padding: 50px;
}
.range-num {
  margin-bottom: 40px;
}
.range-num input{
  border: 2px solid #ccc;
  height: 32px;
  padding-left: 5px;
  width: 50px;
  font-size: 16px;
}
```
```js:title=JavaScript
const range = document.getElementById('range');
const min = document.getElementById('num-min');
const max = document.getElementById('num-max');
noUiSlider.create(range, {
    range: {
        'min': 0,
        'max': 10
    },
    step: 1,
    start: [min.value, max.value],
    connect: true,
    behaviour: 'tap-drag',
    pips: {
        mode: 'steps',
        stepped: true,
        density: 10
    }
});

range.noUiSlider.on('update', function( values, handle ) {
  min.value = Math.trunc(values[0])
  max.value = Math.trunc(values[1])
})
```
セットできるイベントは<br>
'start'、'slide'、'drag'、'update'、'change'、'set'、'end' の７つです。

![最大値、最小値の場合値自体を表示しない処理も可能](./images/12/entry515-7.png)

最大値、最小値の場合値自体を表示しない処理も可能です。分かりづらいので値がない場合の `placeholder` 属性を追加します。

```js:title=JavaScript
<input type="number" min="0" max="10" id="num-min" step="1" value="5" readonly placeholder="最大値"> ~
<input type="number" min="0" max="10" id="num-max" step="1" value="8" readonly placeholder="最大値">
```
```js:title=JavaScript
range.noUiSlider.on('update', function( values, handle ) {
  min.value = Math.trunc(values[0]) === 0 ? '' : Math.trunc(values[0])
  max.value = Math.trunc(values[1]) === 10 ? '' : Math.trunc(values[1])
})
```
コードサンプル　[noUiSlider Update | CodePen](https://codepen.io/camille-cebu/pen/dyjoVMz)

### オプションを変更する
noUiSlider では、オプションの変更もあとから可能です。

たとえば、チェックボックスの値が変更されたタイミングでレンジの最大値を変えるなども可能です。

<figure class="animation"><img src="/images/animation/2022/entry515-8.webp" width="468" height="136" alt="noUiSlider オプションの変更" decoding="async" loading="lazy"/></figure>

```html:title=HTML
<div class="range-wrapper">
  <div class="range-num">
    <label><input type="radio" name="gender" value="male" checked>男性</label>
    <label><input type="radio" name="gender" value="female">女性</label>
  </div>
  <div id="range"></div>
</div>
```

```js:title=JavaScript
const valuesSlider = document.getElementById('values-slider');
const genders = document.querySelectorAll('input[name=gender]');

noUiSlider.create(range, {
    range: {
        'min': 0,
        'max': 10
    },
    step: 1,
    start: [5, 8],
    connect: true,
    behaviour: 'tap-drag',
    pips: {
        mode: 'steps',
        stepped: true,
        density: 10
    }
});

genders.forEach(function(item){
  item.addEventListener('change', function(){
    let maxLevel = item.value === 'female' ? 15 : 10
    range.noUiSlider.updateOptions({
      range: {
        'min': 0,
        'max': maxLevel
      },
    });
  }, false);
}, false);
```
コードサンプル　[noUiSlider UpdateOption | CodePen](https://codepen.io/camille-cebu/pen/LYBVzgQ)

## まとめ
たまたま見つけて使ってみたのですが、公式サイトを見ると全くjQueryじゃない上に高機能で感動したのがきっかけでご紹介させていたきました。

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。
### おまけ・オプション
オプションです。

<div class="slide">
<table><thead><tr><th>オプション名</th><th>説明・使用用途</th><th>値</th><th>例</th></tr></thead><tbody><tr><td><em>range</em></td><td>範囲の最小値と最大値の指定。デフォ値なし</td><td>-</td><td><code class="language-text">range: {min: 0, max: 10}</code><br><code class="language-text">range: {min: [0], max: [10]}</code><br>(0~8が選ばれた状態)</td></tr><tr><td><em>start</em></td><td>初期値。デフォ値なし</td><td>-</td><td><code class="language-text">start: [0, 8]</code>(0~8が選ばれた状態)</td></tr><tr><td><em>connect</em></td><td>バーに色を付けるか否か。lowerが手前で、upperがつまみより後にバーに色がつく。２点以上つまみがある場合はtrue。複数ある場合は配列で指定。。デフォ値false。</td><td>-</td><td>lower, upper,true, false, 配列内に入れ子</td></tr><tr><td><em>margin</em></td><td>２つのハンドルの最大の間隔。デフォ値なし。</td><td>number</td><td><code class="language-text">margin: 30</code>2間の値は30以下にはならない。</td></tr><tr><td><em>limit</em></td><td>２つのハンドルの最小の間隔。デフォ値なし。</td><td>number</td><td><code class="language-text">limit: 30</code>2間の値は30以上にはならない。</td></tr><tr><td><em>padding</em></td><td>スライダーのそれぞれの端からの値。デフォ値は0。スライダーを端まで動かしたくない等の場合。</td><td>number,array[number],array[number, number]</td><td><code class="language-text">padding: [10, 15]</code>最小値が0の場合は10以上下げらず、最大値が100の場合は85以上には増やせない。</td></tr><tr><td><em>step</em></td><td>ステップスライダーの1ステップあたりの移動範囲。デフォ値なし。</td><td>number</td><td><code class="language-text">step: 10</code>10ずつ増減できる。</td></tr><tr><td><em>orientation</em></td><td>スライダーの方向。デフォはhorizontal</td><td>“vertical”, “horizontal”</td><td><code class="language-text">orientation: 'vertical'</code>縦方向。</td></tr><tr><td><em>direction</em></td><td>スライダーの方向。デフォはltr（左から右、もしくは上から下）</td><td>“ltr”, “rtl”</td><td><code class="language-text">direction: 'rtl'</code>右から左に動かすと数値が増える。</td></tr><tr><td><em>tooltips</em></td><td>ツールチップを表示するか否か。デフォはfalse。<code class="language-text">removeTooltips() </code>メソッドで削除可能。</td><td>false, true, formatter</td><td><code class="language-text">tooltips: 'true'</code></td></tr><tr><td><em>animate</em></td><td>スライダーをアニメーションさせるか否かです。初期値はtrueです。クリックイベントなどとセットで使います。アニメーションの間隔（duration）を調整したい場合はCSSの調整が必要です。</td><td>false, true</td><td><code class="language-text">animate: true,</code></td></tr><tr><td><em>handleAttributes</em></td><td>aria-label等、ハンドル（つまみ）に属性を付与できます</td><td>false, true</td><td>handleAttributes: [<code class="language-text">{ 'aria-label': 'lower' },{ 'aria-label': 'upper' }]</code></td></tr></tbody></table>
</div>

その他、キーボードサポートなどのオプションもありますが、きりがないので[Option | noUiSlider](https://refreshless.com/nouislider/slider-options/)をご確認ください。

### おまけ・スライダーの挙動
オプションの中でも、スライダーの挙動のみ詳しく説明します。

```
behaviour: "drag"
```

|値|スライダーの挙動|
|-|-|
|*drag*|範囲をドラック可能でいつもつまみをドラッグできる|
|*drag-fixed*|範囲をドラック可能。範囲を変えることができないので、ツマミのみを動かす。|
|*tap*|スライダーをタップすると近くにハンドルが動く。|
|*tap-drag*|タップしたところにハンドルが動く。|
|*hover*|バーの上をペンやカーソルを当てるとホバーでイベント発火。|
|*unconstrained-tap*|ハンドルが互いに通りすぎることができる|
|*none*|基本の挙動を除いて、他はすべてオフ|

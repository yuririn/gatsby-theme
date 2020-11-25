---
title: data属性でJavaScriptで要素の値の操作をする
date: 2018-06-13
hero: entry267.png
pagetype: blog
category: ['Front end']
cateId: ['front-end-program']
tags: ["JavaScript"]
description: JSとjQueryを比較しつつdata属性（カスタムデータ）などの値の操作や注意点をご紹介。 この記事は、古いIEがサポート外になったので「カスタムデータ属性を使う時はIEに気をつけろ」を大幅にリライトしました。
lead: ["フロントエンドエンジニアのかみーゆです。","JSとjQueryを比較しつつdata属性（カスタムデータ）などの値の操作や注意点をご紹介。 この記事は、古いIEがサポート外になったので「カスタムデータ属性を使う時はIEに気をつけろ」を大幅にリライトしました。"]
---

## MFI、Speed Updateなど、フロントエンジニアに課題が増える
ここ数年、Web制作の業界ではjQuery離れの傾向がありjQueryなしでJSを取り扱うことが多くなってきました。

jQueryの難点はライブラリ読見込むことで、jQuery以外にもjQuery依存のファイルを何種類も使うことも多くあり、ページ読み込み速度も低下します。今年始まった、Speed Update やMFI（モバイルファーストインデックス) もあり、モバイルで読み込みが遅くならないように工夫したり、表示速度にめちゃめちゃ気を使わないといけなくなり、最近はライブラリなしで動く**Vanilla JS**を重宝するようになりました。

## Vanilla JSってなんぞ？
Vanilla JSとはJSでライブラリ0バイトの超軽量で動くJS、、、と、ジョークでよく紹介されてますが早い話、単なるJS　です。ジョークに付き合いたい人は是非、こちらのサイトをみてみてください。

[http://vanilla-js.com/](http://vanilla-js.com/)

## 早速いろんな値を取ってくる
では早速、カスタムデータやリンクやソースを取得してみましょう。

### 要素を取得
次のタグから各値を取得してみましょう。
```
<img id="test" class="test" src="assets/img/dummy.png" data-src="assets/img/js-icon.png" width="300" height="300" alt="jsのアイコン">
```
#### IDから要素を取得
```
//jQuery
elm = $('#test')
//JS
elm = document.getElementById('test')
```
取得できるデータをconsole.logに突っ込んで比べてみます。

JSはタグを丸っと取得しているのに対しjQueryは配列でそれぞれの値を取得しています。

取得されている値の形式が違うので、取得した値はJS、jQueryの各メソッドじゃないと操作できない場合がありますのでご注意を。

#### 要素名(タグ)から要素を取得
```
//jQuery
elm = $('img')
//JS
elm = document.getElementsByTagName('img')
elm = elm[0]

```
JSはdocument.getElements〜とあるように複数を取得するのが前提なので、何個目のimgタグか指定してする必要があります。今回は一個しか書いてないので[0]を指定してやります。

#### クラスから取得
```
//jQuery
elm = $('.test')
// JS
elm = document.getElementsByClassName('test')
elm = elm[0]
```
classで取得するときも同様で、[0]で何個目のクラスか指定して取得してます。

### 要素から値を取り出す
変数elmに代入された、要素の値を取り出してみます。

注意点はカスタムデータ属性の取得くらいです。

jQueryではdata()メソッドでも取得できます。昔、喜び勇んでdata()を使ってIEで予想外の挙動をした苦い経験をしました。<br>
IE対応を強要されるのであれば、attr()だけを使うことをオススメします。

JSも同様でカスタムデータを取得する独自の方法はありますが、要素の属性を取得するgetAttribute()メソッドを使えば、カスタムデータ属性*を取得できます（テストしてないですが今は11はおっけーみたいです）。

[jQueryのカスタムデータ属性(data-*)の設定/取得の挙動が思ったのと違った件](jQueryのカスタムデータ属性(data-*)の設定/取得の挙動が思ったのと違った件)

### カスタムデータってなんぞ?
HTML5のマークアップ仕様で追加された「カスタムデータ属性」です。
要素の中で、data-で始まる属性はすべてデータ属性です。JSやjQueryで要素を操作したい時などに適してます。

コードを比較するとJSの方が簡単に属性の値を取得できるのがわかります。

```
//jQuery
elm.attr('src') //ソース
elm.attr('height') //高さ
elm.attr('width') //幅
elm.attr('data-src') //カスタムデータ
elm.attr('alt') //代替テキスト
// JS
elm.src //ソース
elm.height //高さ
elm.width //幅
elm.alt //代替テキスト
elm.getAttribute('data-src') //カスタムデータ
// カスタムデータ ~ IE10以外
elm.dataset.src
```

### 要素の操作
せっかくなのでカスタムデータ属性のdata-srcに格納されている値をsrcに代入してみましょう。
```
// jQuery
elm.attr('src',elm.attr('data-src'))
// JS
elm.src = elm.getAttribute('data-src')/pre
```

不要になったカスタムデータ属性data-srcをまるっと削除します。

```
// jQuery
elm.removeAttr('data-src')
// J
elm.removeAttribute('data-src')
```

## まとめ
今回はJSとjQueryを比較してみましたがいかがでしたでしょうか？

とはいえすベてをJSで実装すると、書いたことがない人にとっては学習コストもかかるし実際かくとjQueryに比べるとコードが長くなるので、手早く実装したい時はjQueryに軍配が上がります。

個人的には直書きはJS、外部ファイルはjQueryという感じで使い分けることが多いです。オススメはjQueryはCDNで読み込んだり、async(非同期)にしたり、ワンソースにするなど工夫することです。うまく使い分けると良いですね。

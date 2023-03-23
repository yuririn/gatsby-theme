---
title: Intersection Observer API の使ってQiita風目次を作ってみる
date: 2023-03-23
pagetype: blog
hero: thumbnail/2023/entry525.png
cateId: web-developer
tags: ["JavaScript"]
description: 要素の監視ができる、Intersection Observer APIの使い方をご紹介。もう、scroll量に応じて処理する必要はありません。Qiita風目次のサンプルコード。モダンブラウザでは使用可能。オプションやメソッドの解説、コードサンプルあり。
---

JavaScript の 要素の監視ができる Intersection Observer API の使い方をまとめます。

## Intersection Observer API とは？

> MDN Web Docs によると祖先要素または文書の最上位のビューポートと交差する変化を非同期的に監視。<br>
> 参照 : [Intersection Observer API MDN](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)


小難しいので平たく言うと、このAPIを使うと画面上に表示されている要素の変化を監視できます。

ちなみに Intersectionは交差、Observerは観察（者）という意味でです。

具体的にどんなことに使えるかと言うと、、、

* ページがスクロールした際の画像やその他のコンテンツの遅延読み込み
* インフィニティスクロール
* 見出しの表示されたら対になる目次の項目への装飾（Qiita風）
* ユーザーのアクションに応じた（ボタンクリック等）、処理

[Can I Use](https://caniuse.com/?search=Intersection%20Observer%20API) によると IE、Opera Mini を除く最新ブラウザに対応しているとのこと。

### その他の Observer API

他にもObserver APIはあります。

* [MutationObserver](/blogs/entry526)...要素の変化を監視
* ResizeObserver...要素のリサイズを監視
* PerformanceObserver...パフォーマンス測定イベントを監視し、ブラウザーのパフォーマンスタイムラインに記録されているので、新しいperformance entries の通知を受けるために使用。


## 基本の使い方
まずは監視する領域(observer)を作成します。コンストラクター（newするやつ）を呼び出してしきい値が一方向また他の方向に交差する度に実行されるコールバック関数を渡します。

```js
const options = {
  root: document.querySelector('article'),
  rootMargin: '0px',
  threshold: 0.5
}
const observer = new IntersectionObserver(callback, options);
```
|オプション|説明|
|-|-|
|*root*|観測したい要素が見えるかどうかを確認するための表示領域（ビューポート）として使用される要素。指定しない場合はブラウザーの表示領域（ビューポート）。CSS の margin プロパティのように指定可能。|
|*rootMargin*|root で指定した要素の周りのマージン。|
|*root*|しきい値。ターゲットがどのくらいの割合で見えている場合にコールバックを実行させるかの値。既定値は0なので1pxでも表示されたら実行。50%の場合は 0.5。25%毎に実行する場合は［0, 0.25, 0.5, 0.75, 1］という感じで配列で指定。 |

ターゲットとなる要素を指定します。

```js
const target = document.querySelector('.target');
observer.observe(target);
```

`.target`が表示されたらコールバック関数が実行されます。
```js
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(`ターゲット要素が表示されたよ`)
  }
}
```
IntersectionObserverEntryから取得できるプロパティです。プロパティは操作不可で読み取り専用です。
|取得できるプロパティ|説明|
|-|-|
|*time*|交差が記録された時刻|
|*target*|ターゲット要素|
|*rootBounds*|交差を監視しているルート|
|*intersectionRatio*|intersectionRect と boundingClientRect の比率|
|*intersectionRect*|対象の表示領域|
|*boundingClientRect*|ビューポートに対する相対位置|
|*isIntersecting*|論理値で、対象要素が、交差を監視しているルートを超えたどうか|
|*isVisible*|ターゲットの要素が表示されているか|

## 実際Qiita風の目次を作ってみる
簡易的ですが、Qiita風の目次を作ってみます。該当の見出しが表示されたら、目次のリンクの背景の色を変えます。
```HTML
<main>
  <article>
  <h2 id="h1">見出し1個めです</h2>
  <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
  <h2 id="h2">見出し1個めです</h2>
  ...
  <article>
  <div class="table-of-content">目次
    <ol>
      <li><a href="#h1">見出し1個めです</a></li>
      <li><a href="#h2">見出し2個めです</a></li>
      ...
    </ol>
  </div>
</main>
```
JavaScriptです。`isIntersecting`プロパティがtrueになったら、IDとリンクURLが一致するか判定。`class="current"`を付与し、そうじゃない場合はクラスを削除します。

```JavaScript:title=JavaScript
const tocList = document.querySelectorAll('.table-of-content a')

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      tocList.forEach((item, num) => {
        if(`#${entry.target.id}` == item.getAttribute('href')) {
          item.classList.add('current')
        } else {
          item.removeAttribute('class')
        }
      })
    }
  })
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

const observer = new IntersectionObserver(callback, options);

//NodeListを配列に
const targets = Array.from(document.querySelectorAll('h2'))

targets.forEach(target => observer.observe(target))
```

[Intersection Observer API sample](https://codepen.io/camille-cebu/pen/ExeOmeW)

## まとめ・ Intersection Observer APIを使えばscroll系のJSを使わずカンタンに実装できる
昔はこんな感じの実装はscroll系のJSを使って処理していましたがIntersection Observer APIを使えば手軽に実装できますね。

Intersection Observer APIを使えばパララックスもカンタンに実装できます。

この記事が皆さんの、Web制作の一助となれば幸いです。

最後までお読みいただきありがとうございました。

|メソッド|説明|
|-|-|
|*disconnect()*|対象を監視することを停止|
|*unobserve()*|ターゲット要素の監視を停止|
|*observe()*|ターゲット要素の監視|
|*takeRecords()*|ターゲット要素のうち、前回交差状態がチェックされたもしくは自動的にオブザーバーのコールバックが呼び出された以降に交差状態が変化した要素の配列を返す。コールバックを使用してこれらの変更を監視している場合は、このメソッドを呼び出す必要はない。かつ処理待ちの交差リストをクリアしてしまうのでコールバックが実行されない|

参照 : [Intersection Observer API MDN](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)

## 関連記事もあわせてお読みください
<card id="/blogs/entry526/"></card>

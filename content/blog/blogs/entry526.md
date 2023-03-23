---
title: Mutation Observer を使ってiframe内の要素を監視する
date: 2023-03-24
pagetype: blog
hero: thumbnail/2023/entry525.png
cateId: web-developer
tags: ["JavaScript"]
description: 要素の監視ができる、Mutation Observer APIの使い方をご紹介。iframe内の変化を感知して、親要素の高さを変えるという処理をしました。オプションやメソッドの解説、コードサンプルあり。
---

JavaScript の 要素の監視ができる Mutation Observer を使う機会があったので使い方をご紹介します。

<prof></prof>

## Mutation Observer とは？

> MDN Web Docs によるとMutationObserver インターフェイスは、 DOM ツリーへ変更が加えられたことを監視できる機能<br>
> 参照 : [insertAdjacentElement MDN](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver)

Mutation とは突然変異の意味です。

今回は画面操作するたびに変更されるiframe内の高さを取得して、スクロールさせないようにしたかったのでその方法をそのまま記しておきます。

<p><small>frameまたはiframe要素で読み込まれているページが別ドメインである場合、クロスドメインの制約に引っかかり取得できない場合があります。</small></p>

## iframe 内の必要な要素の値を取得する
ajaxなどで非同期で読み込んだコンテンツの表示が終わったら、iframeの高さを取得しiframeに直接スタイルを書き込みます。スクロールバーの表示されないので、埋め込み感がなくなります。

今回はiframe内で読み込まれるローディング画像の表示/非表示の変化を監視します。
```html:title=HTML
<iframe src="index.html" frameborder="0" class="element"></iframe>
```
```js:title=JavaScript
const iframe = document.querySelector(".element");

function setHeight() {
  iframe.height = `${iframe.contentDocument.documentElement.offsetHeight}px`
}
document.addEventListener('DOMContentLoaded', event => {
  iframe.onload = () => {
    //ローディング用の画像要素
    const app = iframe.contentDocument.querySelector('#app img')
    setHeight()
    const observer = new MutationObserver(function (mutations) {
      if (mutations[0].target.className === '') {
        setHeight()
      }
    });
    const options = {
      attributes: true,
      attributeOldValue: false,
      subtree: false
    }
    observer.observe(app, options)
  };
});
```
`contentDocument`で要素の中身を取得します。

HTML の領域のサイズを得るために`documentElement`オブジェクトを参照します。
```js
iframe.height = `${iframe.contentDocument.documentElement.offsetHeight}px`
```

|高さ|詳細|
|-|-|
|*offsetHeight*|ボーダーやスクロールバーを含む高さ|
|*scrollHeight*|マージン・スクロールバーを含まない内側の高さ|
|*clientHeight*|ボーダーやスクロールバーを含まない内側の高さ|

observe(監視)に追加できるオプションです。

|オプション|説明|
|-|-|
|*subtree*|targetをルートとしたNodeのサブツリーをモニタリングするか|
|*childList*|ターゲットノードの子ノードの追加や削除を監視|
|*attributes*|ターゲットの属性の変化を監視。 |
|*attributeFilter*|監視する特定の属性名の配列。このプロパティが含まれていない場合、すべての属性の変更は変異通知を引き起こすデフォルトはfalse。|
|*attributeOldValue*|ターゲットの古い属性の値を記録|
|*characterData*|文字の変更を監視。|
|*characterDataOldValue*|古い文字のデータを記録。|

observe(監視)以外のメソットです。

|メソッド|説明|
|-|-|
|*disconnect()*|MutationObserver のインスタンスが今後の通知を受け取ることを、 observe() が再び呼び出されるまで停止します。|
|*takeRecords()*|MutationObserver の通知キューから保留中の通知をすべて削除し、 MutationRecord の新しい配列 (Array) で返します。|


参照 : [MutationObserver MDN](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver)

## おまけ・iframe内のデータ操作
iframe内の要素の操作方法の要素の削除方法のご紹介です。

### iframe内の要素の削除
```js
iframe.contentDocument.querySelector('header').remove()
```
### iframe の head内に style 追加

iframeを親要素になじませるためにスタイルを追加することも可能です。

```js
const styleTag = document.createElement('style')
styleTag.innerText = `
body {
  background: none;
}
`;
iframe.contentDocument.querySelector('head').insertAdjacentElement('beforeend', styleTag);
```
`insertAdjacentElement` の使い方です。呼び出された要素から相対的に指定された位置に、指定された要素ノードを追加できます。

|メソッド|説明|
|-|-|
|*beforebegin*|ターゲットの前|
|*afterend*|ターゲットの後|
|*afterbegin*|ターゲット内の最初の子要素の前|
|*beforeend*|ターゲット内の最後の子要素の後|

[insertAdjacentElement MDN](https://developer.mozilla.org/ja/docs/Web/API/Element/insertAdjacentElement)

同じ要領で、他の要素も追加できます。

### iframe内の要素のクラスの削除や追加
```js
//追加
iframe.contentDocument.querySelector('main').classList.add('is-show')
//削除
iframe.contentDocument.querySelector('main').classList.remove('is-show')
```

## まとめ・Mutation Observerを使えばイベント発火に関係なく腰輿の変化に応じて操作できる
今回iframe内の要素の変化を監視して、iframeを操作する方法をご紹介しました。

Mutation Observer の他の使い方はまだやってませんが、可能性のあるAPIでした。

この記事がみなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

参照 : [insertAdjacentElement MDN](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver)

## 関連記事もあわせてお読みください
<card id="/blogs/entry525/"></card>

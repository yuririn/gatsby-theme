---
title: 混乱しがちなJSの配列ループ・操作まとめ
date: 2021-12-26
modifiedDate: 2023-02-05
hero: thumbnail/2018/entry267.png
pageType: blog
cateId: 'web-developer'
tags: [ "JavaScript"]
description: 通常配列はもちろん連想配列など、配列のループでどの方法を使うべきか用途ごとに詳しく解説。命令文for...of、for...in、メソッド map、forEach でのループの仕方。find、filter、includes、some、every, reduce, sort とスプレッド構文(...)などについて使い方を紹介します。
---
通常配列はもちろん連想配列など、配列のループでどの方法を使うべきか、ES6以降多様化した配列のループでどの方法を使うべきかこんがらがるので、改めてまとめてみました。

命令文 `for...of`、`for...in`、メソッド `map`、`forEach` でのループの仕方。`find`、`filter`、`includes`、`some`、`every`、`reduce`、`sort` とスプレッド構文(...)などについて使い方を紹介します。
<prof></prof>


## 昔は配列もfor文でしか回せなかったけどたくさん処理方法が増えたよね
昔（10年前くらい）はfor文でループさせるのが定石でしたね。<br>
`length`で配列の長さを取得して、0から配列の数だけ回すという取得の仕方をしていました。

```js
var arr = [1, 2, 3, 4, 5];
for( var i = 0, arr.length < i, i++ ) {
  console.log(i);
}
```

2015年にES6（ECMAScript6 ECMAScript）以降配列のループ処理がめちゃくちゃ便利になりました。<br>
<small>※ 現在はES2021です。</small>

<br>当時はIE対応しなくてはいけなくて、倦厭（けんえん）していましたがIEももう気にする必要もほぼないのでこれからはどんどん遠慮なく使っていきましょう。

### おさらい・多次、元連想などのいろんな配列

*基本の配列*

```js
const arr = [1, 2, 3, 4]
```
*連想配列*

キーと値がペア（プロパティ）になっている。

```js
const arr = { name: 'かみーゆ', job: 'フロントエンドエンジニア' }
```

*多次元配列*

連想配列と普通の配列も組み合わせられたり。

```js
const arr = [{ name: 'かみーゆ', job: 'フロントエンドエンジニア' }, { name: 'チョコボ', job: '飼い猫' }]
```

<msg txt="こうなってくると初学者は混乱するよねぇ汗"></msg>


## 配列のループ（命令文）

`for...of`, `for...in` でのループ処理です。

### 配列のループ「for...of」
単純な配列はこちらで。

```js
const arr = ['a', 'b', 'c']

for( const item of arr ){
  console.log(item)
}
// 結果
// a
// b
// c
```
<div class="box">
オブジェクト（配列、NodeList、arguments等）を操作でき、キーでなく値が出力される。
</div>

### 連想配列の処理「for...in」
連想配列に特化しています。

<msg txt="JavaScriptで連想配列を使う際にオブジェクトを使いますが、オブジェクトをループしたい場合は、普通の配列とは違いforやforEachが使えません"></msg>

```js
const arr = { name: 'hoge', age: 40 }

for( const item in arr ){
  console.log(item, arr[item]) //キーとバリューを出力
}
// 結果
// name, hoge
// age,  40
```

<div class="box">
連想配列（オブジェクト）を操作でき、キーが出力される。
</div>

#### for..inで普通の配列は使わない方がいいみたい
余計なものを引っ張ってくることがある。
```js
var team =['a', 'b', 'c'] //配列
Array.prototype.hoge = function(){}  //プロトタイプで拡張

for( var item in team){
    console.log( team[item] )
}
// 結果
// a
// b
// c
//ƒ (){}  ←余計なもの
```

* for...in命令は処理の順序が保証されていない
* 仮変数（item）にはインデックス番号が格納されるだけ

## メソッドでループ処理
`map`や`forEach`メソッドでもループ処理できます。

### 「map」で配列処理
Reactなどでは要素を出力したり、配列の値の作り直しがしたい時などで使います。

連想配列は取得できません。第二引数でインデックス（並び順）も取れます。

```js
const arr = ['リンゴ', 'アップル', 'バナナ']
arr.map((item, index) => {
  console.log(item, index)
});
// 結果
// リンゴ 0
// アップル 1
// バナナ 2
```

<ad location="/blogs/entry482/"></ad>

配列に格納された連想配列はもちろん取得可能です。
```js
const arr = [{name: 'リンゴ'}, {name: 'アップル'}, {name: 'バナナ'}]
arr.map((item, index) => {
  console.log(item, index)
})
// 結果
// { name: 'リンゴ'} 0
// { name: 'アップル' } 1
// { name: 'バナナ' } 2
```

出力結果にキーを指定すると値も取れます。

```js
  console.log(item.name)// ドット記法
  // もしくは
  console.log(item['name'])// ブラケット記法
  // 結果
  // リンゴ
  // アップル
  // バナナ
```

*return*で値が返せます。

```js
const result = arr.map((item, index) => {
  return item.name
})
console.log(result)

// 結果
// 結果
// ["リンゴ", "アップル", "バナナ"]
```

昔こんな書き方をしていたコードも簡潔になります。

```js
var result = []//空の配列を作る
for( var i = 0, arr.length < i, i++ ) {
  result[] = item.name;//配列に追加する
})
console.log(result)
```
<div class="box">
配列を加工し直したりできて、汎用性が高い。
</div>

### 「forEach」で配列処理
`map`と実行結果は一緒です。
```js
const arr = [{name: 'リンゴ'}, {name: 'アップル'}, {name: 'バナナ'}]
arr.forEach((item, index) => {
  console.log(item, index)
})
// 結果
// リンゴ
// アップル
// バナナ
```

forEachだと*return*で値が返せません。

```js
const result = arr.forEach((item, index) => {
  return item.name;
})
console.log(result)
// 結果
// undefind
```

<div class="box">
mapとの違いはreturnが返せない。
</div>

## find, filter, includes, some, everyの使い方
特定のプロパティのキーや値に対する処理するメソッドです。

↓プロパティは連想配列にあるこんなやつ↓
```js
キー: 値
```

### 特定条件の最初の値を取り出す「find」
特定の条件の配列・連想配列の*最初の値*のみ取り出します。

```js
const arr = [{name: 'リンゴ'}, {name: 'アップル'}, {name: 'バナナ'}]

const result = arr.find(item => item.name.length === 3)
console.log(result)
//結果
// [{name: 'リンゴ'}
```
キー`name`の値の3文字のものの最初の値を取り出しました。

<div class="box">
特定条件の値を1つだけ取り出したい場合に使う。
</div>
<ad location="/blogs/entry482/"></ad>

### 特定条件の値だけ絞り込んで配列にする「filer」
特定の条件の配列・連想配列のみに絞り込みます。

```js
const arr = [{name: 'リンゴ'}, {name: 'アップル'}, {name: 'バナナ'}]

const result = arr.filter(item => item.name.length === 3)
console.log(result)
//結果
// [{name: 'リンゴ'}, {name: 'バナナ'}]
```
キー`name`の値の3文字のもののみ取り出しました。

<div class="box">
特定の条件の値を絞り込んで複数取り出したい場合に使う。
</div>

### 一定条件の値があるかどうかだけ調べる「includes」
配列に特定の値が含まれるかを判定します。

```js
const arr = ['リンゴ', 'アップル', 'バナナ']

const result = arr.includes('リンゴ')
console.log(result)
//結果
// true
```

<div class="box">
配列に特定の値が含まれるかの判定で使える。
</div>

### 少なくとも1つ特定の条件に当てはまるか調べる「some」
キー`name`の文字数が3文字以下の値があるか調べる。
```js
const arr = [{name: 'リンゴ'}, {name: 'アップル'}, {name: 'バナナ'}]
const result = arr.some(item => item.name.length < 4)
console.log(result)
// 結果
// true
```


単純に値が`true`か`false`かだけも確認可能。

|値|タイプ|結果|
|-|-|-|
|*{}*|オブジェクト|true|
|*"ああああ"*|文字列|true|
|*""*|文字|false|
|*1*|数値|true|
|*-1*|数値|true|
|*0*|数値|false|
|*[]*|配列|true|
|*true*|真偽値|true|
|*false*|真偽値|false|
|*undefined*|undefined|false|
|*null*|null|false|

試しに、すべて`false`を返す値の配列を作って`some`メソッドを使ってみる。

```js
const arr = [false, 0, null, undefined]
const result = arr.some(item => {return item})
console.log(result)
// 結果
// false
```

<div class="box">
配列の値のどれかに条件に当てはまるものがあるか判定したい時に使う。
</div>

### すべての値が特定の条件に当てはまるか調べる「every」
すべての値のキー`name`の文字数が3文字以下か調べます。

```js
const arr = [{name: 'リンゴ'}, {name: 'アップル'}, {name: 'バナナ'}]
const result = arr.every(item => item.name.length < 4)
console.log(result)
// 結果
// false
```
アップルは4文字なので、`false`が返ります。

`some`同様`return`で判定可能。

<ad location="/blogs/entry482/"></ad>

```js
const arr = ['hello', 1, 2, undefined]
const result = arr.every(item => {return item});
console.log(result)
// 結果
// false
```
1つでも`false`に相当する値があると判定は`false`となります。

<div class="box">
配列の値のすべてに条件に当てはまるものがあるか判定したい時に使う。
</div>

### 複雑な配列を処理し、一つの値にまとめることができる「reduce」
`reduce` を使うと、配列の要素を一つずつ取り出し、指定した処理を行っていき、最終的に一つの値を返す事ができます。

```js
array.reduce( ( ( 引数1, 引数2, 引数3, 引数4 ), 初期値  => 処理 ), 初期値 )
```
```js
const array = [1,2,3];
const result = array.reduce((prev, current) => prev + current, 0);
console.log(result); // 6
```

例えば、複数の記事のデータが有り、同じ日付とその件数を配列にしたい場合。
```js
const articles = [
  {
    "slug":"https://ginneko-atelier.com/",
    "tags": [
      "著作権"
    ],
    "title": "フリー素材で掲載許可がいるケース",
    "date": "2014-05-14"
  },
  {
    "slug":"https://ginneko-atelier.com/",
    "tags": [
      "コマンド"
    ],
    "title": "これだけ覚えておくと便利！フロントエンジニアのためのコマンド（ライン）",
    "date": "2014-09-10"
  },
  {
    "slug":"https://ginneko-atelier.com/",
    "tags": [
      "concrete5"
    ],
    "title": "OSC2014 in HIROSHIMAに参加しました！",
    "date": "2014-09-21"
  },
  // ...
]
// 上記配列を下記のように加工したい
[
  {
    date: "2014-05",
    count: 1
  },
  {
    date: "2014-09"
    count: 3
  },
  {
    date: "2014-09"
    count: 4
  },
  // ...
]
```
`find` で所定の値を探し、配列を形成し直します。
```js
const dateFunc = (date)=> {
  if(date.split('-').length > 1) {
    return `${date.split('-')[0]}/${date.split('-')[1]}`
  } else {
    return date
  }
}
const result = result.reduce((dateList, currentItem) => {
  const sameDate = dateList.find(item => dateFunc(item.date) === dateFunc(currentItem.date));
  if (sameDate) {
      sameDate.count++;
  } else {
    dateList = [...dateList, {date: dateFunc(currentItem.date), count: 1}]
  }
  return dateList;
}, []);
console.log(result)
```
月ごとの記事数をまとめることができました。
![月ごとの記事数](./images/12/entry482-1.png)

### 配列を条件でソートできる「sort」
`sort` メソッドを使うとあらゆる条件で並び替えをすることができます。

先程の `reduce` メソッドで作成した配列を日付で並び替えます。
```js
// 昇順
const sortArray = result.sort((a, b) => {
  return (a.date > b.date ? 1 : -1);
});
```
<ad location="/blogs/entry482/"></ad>

```js
// 降順
const sortArray = result.sort((a, b) => {
  return (a.date < b.date ? 1 : -1);
});
```
![配列を条件でソートできる「sort」](./images/12/entry482-2.png)

［A - Z］のソートは大文字が混ざっていることを考慮し、小文字に直して比較します。
```js
const sortArray = result.sort((a, b) => {
  a = a.toString().toLowerCase();
  b = b.toString().toLowerCase();
  return (a > b ? 1 : -1);
})
```
日本語やアルファベット数字が混じったものでもソートできるみたいです。興味がある方は以下を参考にしてください。

参考 : [配列の要素をソートする](https://gray-code.com/javascript/sort-for-item-of-array/)
## スプレッド構文
スプレッド構文（`...`）の使い方がいまいちよくわかってなくて使っていたのでついでにこちらも深掘りしておきます。

<msg txt="最初見たとき、「おやおや？記述ミス？」って思ってしまいました。。。"></msg>

> スプレッド構文 (...) を使うと、配列式や文字列などの反復可能オブジェクトを、0 個以上の引数 (関数呼び出しの場合) や要素 (配列リテラルの場合) を期待された場所で展開したり、オブジェクト式を、0 個以上のキーと値の組 (オブジェクトリテラルの場合) を期待された場所で展開したりすることができます。<br>
> [スプレッド構文 | MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 配列の中身を表示できる
`...`を頭につけるだけで配列の中身を素早く展開できます。

```js
const numbers = [1, 2, 3]
console.log(...numbers)
// 結果
// 1 2 3
```
```js
const person1 = { name: 'かみーゆ', job: 'フロントエンドエンジニア' }
console.log({...arr})
// 結果
// { name: 'かみーゆ', job: 'フロントエンドエンジニア' }
```

### 配列をマージする
```js
const numbers = [1, 2, 3]
const numbers2 = [...numbers, 4, 5, 6]
console.log(numbers2)
// 結果
// 1 2 3 4 5 6
```

```js
const person1 = { name: 'かみーゆ', job: 'フロントエンドエンジニア' }
const gender = { gender: 'female' }
console.log({...person1, ...gender})
// 結果
// { name: 'かみーゆ', job: 'フロントエンドエンジニア', gender: 'female' }
```

### 配列を引数としてまとめて渡せる

配列をまとめて引数として渡せます。

```js
function getTime(h, m, s) {
  const hour = h * 60 * 60 * 1000
  const minute = m * 60 * 1000
  const second = m * 1000
  // ミリ秒に変換
  return hour + minute + second
}
const time = [2, 30, 27]
console.log(getTime(...time))
//結果9030000
```

### 分割代入で余った値を受け取る
この使い方は面白かった。
```js
const [arr, arr1, ...arr2] = [1, 2, 3, 4, 5]
console.log(arr, arr1, arr2)
//結果 1 2 [3, 4, 5]
```

[JSのスプレッド演算子 | Qiita](https://qiita.com/riku-shiru/items/a3e2f19b4470f2a4bd09)

### 配列から重複を取り除く
`Set`で重複する値を取り除きます。

> Set オブジェクトは値のコレクションです。挿入順に要素を反復することができます。Set に*重複する値は格納出来ません*。Set 内の値はコレクション内で一意となります。<br>
> [Set | MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set)

```js
const numbers = [1, 2, 3, 3, 4, 5, 6, 1]
const dist = [...(new Set(numbers))]
console.log(dist)
//結果 [1, 2, 3, 4, 5]
```

<ad location="/blogs/entry482/"></ad>

[JSのスプレッド演算子 | Qiita](https://qiita.com/riku-shiru/items/a3e2f19b4470f2a4bd09)

## まとめ・配列はしたいことに応じてメソッドなどを使い分けよう
ES6以降配列処理がかなり楽になりました。

多様化しすぎて、どれをどう使っていいかわからなくなるので今回は少し深掘りしてまとめてみました。

<msg txt="実はfor文で回すのが処理速度は速いみたいですけどね。。。"></msg>

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。


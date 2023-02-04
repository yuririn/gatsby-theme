---
title: VUE で絞込み＆日にちソート機能を部分的に組み込む
date: 2023-02-05
pagetype: blog
hero: thumbnail/2023/entry520.png
cateId: web-developer
tags: ["JavaScript","VUE"]
description: VUE はちょっとした動的ページを作るのに最適。ソースも Vanilla JS に比べると簡潔に書けるし、React に比べ気軽に導入可能。日付による昇順、降順に並べ替え、更にカテゴリー・タグで絞り込み。導入方法を詳しく解説し、Compostion APIのサンプルコードをご紹介。
---
React や VUE はちょっとしたリアルタイムレンダリングや絞り込み機能を実装するのには最適です。

最近部分的に React を組み込もうとしましたが難しくて、結局 VUE を採用しました。

ソースも Vanilla JS に比べると簡潔に書けるし、React に比べ気軽に導入できます。

VUE3からは、Compostion API が使えるようになりました。Compostion とは構成という意味で、リアクティブな値やリアクティブな値に関連した処理をコンポーネントから分割して扱えるようにしたコンポーネントの形式です。

当記事ではその導入方法と、実践にも転用できるサンプルコードをご紹介します。

*前提条件*

* JSONデータを用意できる
* JavaScript がある程度理解でき、実際に書いたこともある
* 日にちなどのソート（昇順、降順）機能を実装したい
* タグやカテゴリーなどで絞り込みたい

完成イメージはこんなかんじ。

![完成イメージはこんなかんじ](./images/2023/02/entry520-1.png)

<prof></prof>


## VUE Compostion API 基本の書き方

元来の Options API と比べると、結構書き方が違う印象です。今回は Compostion API で紹介します。

```js:title=OptionsAPI
export default {
  data: () => ({
    // 変数など
  }),
  methods: {
    // 処理
  },
};
```
```js:title=CompostionAPI
const app = createApp({
  setup() {
    // 変数や関数
    return {
      // 設定した変数や関数の戻り値
    }
  }
})
app.mount("#app");
```
## JSONデータを用意する
JSONデータを用意します。WordPress REST API やスプレッドシートなどからもJSONを取得できますがこともできますが、今回は以下のようなデータを使います。
```json:title=JSON
[
  {
    "slug":"https://ginneko-atelier.com/",
    "tags": [
      "セブ島",
      "海外移住"
    ],
    "title": "セブ島で日本語が通じる歯医者さんに行った話",
    "date": "2022-06-28"
  },
  {
    "slug":"https://ginneko-atelier.com/",
    "tags": [
      "JavaScript",
      "html"
    ],
    "title": "軽量スライダーSwiperでスマホ（SP）のみスライダー表示にする方法（複数対応）",
    "date": "2022-12-17"
  },
  {
    "slug":"https://ginneko-atelier.com/",
    "tags": [
      "セブ島ボランティア体験記",
      "ライフスタイル"
    ],
  //続く…
  }
]
```
スプシなどからもJSONデータを生成して使いたい場合はGASを使えば簡単に作れます。以下記事を参考にしてください。
<card id="/blogs/entry481/"></card>

## JSONデータから一覧を作る
今回は以下のような単純な作りです。
```
myblocktheme/
  ├ index.js
  ├ articles.json
  └ index.html
```
まずはJSONデータから一覧を作ります。

```js:title=index.js
import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3.2.4/dist/vue.esm-browser.prod.js";

const jsonUrl = 'articles.json';

const app = createApp({
  setup() {
    const articles = ref(null);
    const sortArticle = async () => {
      let result;
      result = await fetch( jsonUrl );
      result = await result.json();
      articles.value = result;
    }
    onMounted( async () => {
      await sortArticle();
    })
    return {
      articles
    }
  }
})

app.mount("#app");
```
`index.js` ファイルを読み込む際に、ディレクティブ `export` と `import` を利用したいので `module` 属性を付与します。

```html:title=index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sort JSON</title>
</head>
<body>
  <div id="app" v-cloak class="contaienr">
     <ul class="articles">
      <li v-for="article in articles">
        <time :datetime="article.date">{{article.date}}</time>
        <a :href="article.slug">{{article.title}}</a>
      </li>
    </ul>
  </div>
  <script src="./index.js" type="module" defer></script>
</body>
</html>
```

VUEの読み込み時のちらつきを抑えるためにCSS追加しておきましょう。

```css
[v-cloak] {
  display: none;
}
```
## ページ送りをつける
ページネーションを表示させるためのコードを書きます。
```js:title=index.js
const paged = 10 //何ページごとに表示するか
const total = ref(null) //ページ総数
const currentPage = ref(1) //現在のページ
const maxPage = ref(null) //最大ページ数
// 省略
const sortArticle = async () => {
  // 省略
  total.value = result.length;
  maxPage.value = Math.ceil(total.value / paged)
  articles.value  = result.slice( paged *  (currentPage.value - 1), paged * currentPage.value)
}
```
```js:title=index.js
const pagination = async (dir) => {
  if(dir === 'prev') {
    if (perPage.value === 1) {
      return;
    }
    perPage.value--;
  }
  if(dir === 'next') {
    if (perPage.value === maxPage.value) {
      return;
    }
    perPage.value++;
  }
  await sortArticle();
};
```
それぞれの値や関数をHTML側で受け取れるよう戻り値に追加します。
```js:title=index.js
return {
  pagination,
  currentPage,
  total,
  maxPage,
}
```
ページネーションをHTML側でに組み込みます。
```html:title=index.html
<div class="patination">
  <button @click="pagination(`prev`)" :disabled="currentPage === 1">PREV</button>{{currentPage}}/{{maxPage}}<button
    @click="pagination(`next`)" :disabled="currentPage == maxPage">NEXT</button>
</div>
```
## 記事を新しい順・古い順でソートする
記事を新しい順・古い順でソートするための機能を作成します。
```js:title=index.js
const sortDate = ref(null)
// 省略
const sortArticle = async () => {
  if(sortDate.value !== null) {
    // 省略
    result = await result.json();

    result = result.sort((a, b) => {
      if(sortDate.value === 'desc') {
        return (a.date < b.date ? 1 : -1);
      } else if(sortDate.value === 'asc') {
        return (a.date > b.date ? 1 : -1);
      }
    });
    total.value = result.length;
    // 省略
  }
}
// 省略
```
日付を選んた時に絞り込ボタン用の機能を追加します。ソート解除もできるようにしました。
```js:title=index.js
const sort = async () => {
  currentPage.value = 1;
  await sortArticle();
}
const clear = async () => {
  currentPage.value = 1;
  sortDate.value = null
  await sortArticle();
}
```
HTML側で使えるように戻り値を追加します。
```js:title=index.js
return {
  // 省略
  sortDate,
  clear,
  sort,
}
```
昇順降順のUIを追加します。
```html:title=index.html
<div class="sort">
  <h3>絞り込む</h3>
  <label for="disc" class="sortBtn">
    <input type="radio" value="desc" v-model="sortDate" name="date" id="desc">新しい順
  </label>
  <label for="asc" class="sortBtn">
    <input type="radio" value="asc" v-model="sortDate" name="date" id="asc">古い順
  </label>
  <div class="sortBtns">
    <button @click="sort">絞り込む</button>
    <button @click="clear">クリア</button>
  </div>
</div>
```

## 複数のタグで絞り込む
今回は複数のタグを選んで広域に絞り込めるようにします。

### タグだけ抜き取る
まずは記事から、タグだけ抜き取ります。重複は JSの `reduce` を使って取り除きます。
```js:title=index.js
const tags = ref(null)

const getTags = async () => {
  let tagList;
  tagList = await fetch( jsonUrl );
  tagList = await tagList.json();
  tagList = tagList.reduce((tags, article) => {
    if (article.tags) {
      article.tags.map(item => {
        if (tags.find(i => i === item)) {
          return false;
        }
        tags = [...tags, item]
      })
    }
    return tags
  },[])

  tags.value = tagList
}
onMounted( async () => {
  await getTags();
})

return {
  // 省略
  tags
}
```
その他の配列操作についてさらに詳しく知りたい場合はこちらを御覧ください。

<card id="/blogs/entry482/"></card>

`v-for` を使ってループでHTML側に出力します。

### タグの絞り込み機能を作る
複数のタグの記事を絞り込めるようにします。

```js:title=index.js
// 省略
const selectedTags = ref([])
const sortArticle = async () => {
  if(selectedTags.value.length !== 0) {
    // 省略
    result = result.filter((i) => {
      const article = i.tags.map(k => {
        if(selectedTags.value.includes(k)) return true;
      })
      if(article.includes(true)) return i;
    })
  }
  total.value = result.length;
}
return {
  // 省略
  selectedTags
}
```

絞り込んだ時に、何件になったか、どのタグで絞り込んだかを表示するための変数を用意します。

タグも絞り込み解除できるようにしておきます。

```js:title=index.js
// 省略
const message = ref(null)
// 省略
const sort = async () => {
  currentPage.value = 1;
  await sortArticle();
  message.value = selectedTags.value.length !== 0 ? `${selectedTags.value.join(", ")} の記事が ${total.value} 件あります。` : null;
}
const clear = async () => {
  currentPage.value = 1;
  selectedTags.value = []
  sortDate.value = null
  message.value = null

  await sortArticle();
}
```
絞り込み部分のHTML。

```html:title=index.html
<div class="sort">
  <h3>絞り込む</h3>
  <!-- 省略 -->
  <ul class="select-tags">
    <li v-for="tag, n in tags"><label :for="`tag-${n}`"><input type="checkbox" :value="tag" v-model="selectedTags"
          name="tag" :id="`tag-${n}`">{{tag}}</label> </li>
  </ul>
  <!-- 省略 -->
</div>
```
`v-if` で、絞り込み件数とどのタグで絞り込んだか表示させます。
`message` が　`null` の場合は非表示となります。

```html:title=index.html
<p v-if="message">{{message}}</p>
```
## すべてのコード
すべてのコードはGithubにあげています。

* [HTML](https://github.com/yuririn/vue-sourt-sample/blob/main/index.html)
* [JS](https://github.com/yuririn/vue-sourt-sample/blob/main/index.js)

## まとめ・VUEはちょっと機能を足すのに便利

実は4年ぶりにVUEを書きました。3になって書き方も諸々バリエーションが増えていてビビりましたが、やってみるととても便利でした。

この記事が、みなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただき、ありがとうございました。

参考 : [HTMLにちょい足しでできる！Vue.jsでサクッと動きをつける方法](https://ics.media/entry/210908/)

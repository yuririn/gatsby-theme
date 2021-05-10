---
title: Gatsbyブログサイト移行物語4~プラグインを利用して目次出力~
date: 2020-12-07
modifieddate: 2021-01-12
hero: 2020/entry401.jpg
pagetype: blog
cateId: front-end-program
tags: ["JavaScript","React","Gatsby"]
description: 記事に目次をつけたかったのでプラグインgatsby-remark-autolink-headersを利用して目次を実装しました。ulタグからolタグに変え、目次が長くなるので閉じるボタンをつけ、アコーディオンさせるなど少し改造しました。そのやり方について綴ります。
lead: ["記事に目次をつけたかったのでプラグインgatsby-remark-autolink-headersを利用して目次を実装しました。","ulタグからolタグに変え、目次が長くなるので閉じるボタンをつけ、アコーディオンさせるなど少し改造しました。そのやり方について綴ります。"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. [投稿ページの充実と画像の方法](/blogs/entry406/)
3. [ブログ記事、カテゴリー、タグ一覧の出力](/blogs/entry408/)
4. プラグインを利用して目次出力（←イマココ）
5. [プラグインナシで一覧にページネーション実装](/blogs/entry413/)
6. [個別ページテンプレート作成](/blogs/entry416/)
7. [プラグインHelmetでSEO調整](/blogs/entry418/)
8. [CSSコンポーネントでオリジナルページを作ろう！！](/blogs/entry420/)
9. [関連記事一覧出力](/blogs/entry230/)

### このシリーズではテーマGatsby Starter Blogを改造
この記事は一番メジャーなテンプレート、「*Gatsby Starter Blog*」を改造しています。同じテーマでないと動かない可能性があります。

## 目次出力のためのプラグインgatsby-remark-autolink-headersを利用
GatsbyJSは豊富なプラグインが魅力です。

gatsby-remark-autolink-headersはプラグインの1つです。<br>
以下のようなことができます。

* 見出しタグにidを振る
* 見出しタグを抽出しリンク付きのリストタグを出力

[gatsby-remark-autolink-headers](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/)

### gatsby-remark-autolink-headersをインストール
`npm`コマンドで手軽にインストールできます。

```bash
npm install gatsby-remark-autolink-headers
```
### gatsby-config.jsにプラグインの追記
gatsby-remark-autolink-headersはgatsby-transformer-remarkのサブプラグインです。<br>なので、gatsby-config.jsの*gatsby-transformer-remarkのoption*に記載します。

テーマGatsby Starter Blogを利用していればgatsby-transformer-remarkはインストールされているはずです。

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
  ],
}

```

<br><br>このプラグイン1コ問題があって、公式サイトによると*プラグインgatsby-remark-prismjsよりも前に読み込む必要があります*。

```js
// good
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-autolink-headers`,
      `gatsby-remark-prismjs`,
    ],
  },
}

// bad
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-prismjs`, // should be placed after `gatsby-remark-autolink-headers`
      `gatsby-remark-autolink-headers`,
    ],
  },
}
```

### gatsby-remark-autolink-headersを実装

今回はシンプルにアイコンなし。以下のように設定しました。

[オプション](#オプションの一覧)の説明については記事の後ろに記載します。
```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: true,
            },
          },
        ],
      },
    }
  ]
}
```
### 目次を出力するコンポーネントを作成する
次に目次を出力するコンポーネントを作成します。

src/components/内にtopics.jsを追加します。
```
src/
    ├ templates/
    |   └ blog-post.js
    └ components/
        └ topics.js（新規作成）
```

コードはこんな感じです。

```js
import React from "react";

const Topic = props => {
  return (
    <div class="mokujiList">
      <h2>目次</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: props.data,
          }}
        >
        </div>
      </div>
  );
};

export default Topic;
```
リスト化されたデータは`data.markdownRemark.tableOfContents`に格納されます。

blog-post.jsのクエリの`markdownRemark()`内に`tableOfContents`を*必ず追記*してください。

あとは記事の読み込みたい場所にコンポーネントを出力するだけです。

```js
import Topic from "../components/topic"

//~コード省略~

const BlogPostTemplate = ({ data, location }) => {
  {/*読み込みたい場所に挿入*/}
  <Topic data={data.markdownRemark.tableOfContents} />

  //~コード省略~

}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $hero: String
  )
  {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        relativePath: {eq: $hero}
        sourceInstanceName: {eq: "assets"}
      }
    ){
      edges {
        node {
          name
          relativePath
          childImageSharp {
          fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
            }
          }
        }
      }
    markdownRemark(
      id: {eq: $id }
    ) {
        id
        excerpt(pruneLength: 160)
        html
        tableOfContents
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
          description
          lead
          hero
          category
          cateId
          tags
          pagetype
          modifieddate(formatString: "YYYY.MM.DD")
        }
      }
      previous: markdownRemark(id: {eq: $previousPostId }) {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
      next: markdownRemark(id: {eq: $nextPostId }) {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
```

## 出力されるタグをulからolに変え、開閉ボタンをつける
リスト出力がul（アンオーダーリスト）なのは個人的にはちょっと気に入らないです。<br>
なのでここから少し改変します。<br><br>

このサイトではolはすでにカウンター関数を利用してスタイリングしてあります。

<a class="article-link" href="/blogs/entry315/">
<section><div class="article-link__img"><img alt="CSSカウンターを使ってリストタグにナンバーを振る" src="/static/d3d707b7c02bb897cc179d3feb35e47b/f836f/entry363.jpg" class="" width="150" height="113"></div><div class="article-link__main">
<div class="article-link__main__title">CSSカウンターを使ってリストタグにナンバーを振る</div>
<p class="description">1-2、2-3みたいにリストや見出しにナンバーが振られているサイトを見か･･･</p>
<p>
<time datetime="2020-03-29">2020.03.29</time>
</p>
</div>
</section>
</a>

JSの`replace`で`ul>`から`ol>`に置換します。<br>（閉じタグもあるのでこのような形にしました）

後ほどアコーディオン機能を実装します。チェックボックスを追加して`h2`を`label`に書き換えておきます。
```js
import React from "react";

const Topic = props => {
  const list = props.data.replace(/(ul>)/gi, 'ol>');

  return (
    <div class="p-box--gray u-mblg">
      <input type="checkbox" class="mokuji" id="mokuji" />
      <label class="c-content__heading" for="mokuji">目次</label>
      <div class="c-editArea mokujiList">
        <div
          dangerouslySetInnerHTML={{
            __html: list,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Topic;
```
### アコーディオンはCSSで実装する
アコーディオンは手間なのでCSSのみで実装しました。

今回はコードしか紹介しませんので詳しく原理を知りたい方はこちらをご覧ください。

<a class="article-link" href="/blogs/entry315/">
<section><div class="article-link__img"><img alt="セブ島唯一日本人占い師・さくら庵のマイアさんから学ぶかみーゆ流占いとの付き合い方" src="/static/45a35d1dd3ec602a1e1eff28669aade0/f836f/entry315.jpg" class="" width="150" height="113"></div><div class="article-link__main">
<div class="article-link__main__title">CSS3 アニメーションで軽量なアコーディオンメニューを作ろう！</div>
<p class="description">CSS3 アニメーションって便利ですよね？jQueryに依存しないと軽量･･･</p>
<p>
<time datetime="2019-02-11">2019.02.11</time>
</p>
</div>
</section>
</a>

HTMLはこんな感じで出力されます。コードが長いので省略しています。
```html
<div class="p-box--gray u-mblg">
  <input type="checkbox" class="mokuji" id="mokuji">
  <label class="c-content__heading" for="mokuji">目次</label>
  <div class="c-editArea mokujiList">
    <div>
      <ol>
    ここリストが出力されます
      </ol>
    </div>
  </div>
</div>
```
<br><br>CSSです。モジュール化してもいいですが私はCSSに直書きしました。<br>
CSSモジュール化の仕方についてはポートフォリのページを作った際に実装したので改めて記事化しますね。

```css
.mokuji {
  display: none;
}

.mokuji:checked ~ .mokujiList {
  max-height: 0;
}

.mokuji ~ .mokujiList {
  max-height: 200vh;
  transition: .3s;
  overflow: hidden;
}

.mokuji + .c-content__heading {
  position: relative;
  display: block;
}

.mokuji + .c-content__heading:before {
  transition: .3s;
  position: absolute;
  content: "";
  width: 30px;
  height: 1px;
  top: 10px;
  right: 0px;
  background: #464675;
  display: block;
}

.mokuji:checked + .c-content__heading:after {
  transform: rotate(0deg);
}

.mokuji+ .c-content__heading:after {
  transform: rotate(90deg);
  transition: .3s;
  position: absolute;
  content: "";
  width: 30px;
  height: 1px;
  top: 10px;
  right: 0px;
  background: #464675;
  display: block;
}
```

<br><br>最初から閉じておきたい場合は、`input`に`checked`を付与しておきましょう。

```html
<input type="checkbox" class="mokuji" id="mokuji" checked>
```
## オプションの一覧
オプションの一覧です。icon以外はあまり使うことないかもしれません。

|オプション|用途|
|-|-|
|offsetY|リンクをクリックして移動した時の見出しの上の空き（オフセット）の調整。pxです|
|icon|Boolean。デフォルトはtrueでホバーすると左にアイコンが表示されまます。|
|class|アンカーに独自のクラス名を指定するそう|
|maintainCase|Boolean。含まれる要は大文字小文字を維持するか指定できる。|
|removeAccents|Boolean。アクセント削除。日本人のサイトにはまず必要なさそう。|
|isIconAfterHeader|Boolean。アイコンの位置を右側に移動|
|elements|リンクを自動挿入するためのタグ一覧を配列で指定|

## まとめ
目次があるとこの記事は*どんなコンテンツが含まれてるか読者にわかりやすい*のでオススメです。

サイト改修ついでにGatsbyのことを記事化してますが、このサイトがやっとサイトとして機能するようになり私もホッとしました。

この記事が皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

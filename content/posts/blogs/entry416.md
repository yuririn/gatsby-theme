---
title: Gatsbyブログサイト移行物語6~個別ページテンプレート作成~
date: 2020-12-13
hero: 2020/entry401.jpg
pagetype: blog
category: Front end
cateId: front-end-program
tags: ["JavaScript","React","Gatsby"]
description: GatsbyでプライバシーポリシーやAboutページなど記事一覧のループに含めたくないけどMarkDownで手軽に管理したいページを表示させるテンプレートを作りました。
lead: ["GatsbyでプライバシーポリシーやAboutページなど記事一覧のループに含めたくないけどMarkDownで手軽に管理したいページを表示させるテンプレートを作りました。"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. [投稿ページの充実と画像の方法](/blogs/entry406/)
3. [ブログ記事、カテゴリー、タグ一覧の出力](/blogs/entry408/)
4. [プラグインを利用して目次出力](/blogs/entry410/)
5. [プラグインナシで一覧にページネーション実装](/blogs/entry413/)
6. 個別ページテンプレート作成（←イマココ）

### このシリーズではテーマGatsby Starter Blogを改造
この記事は一番メジャーなテンプレート、「*Gatsby Starter Blog*」を改造しています。同じテーマでないと動かない可能性があります。


## 個別ページテンプレートの作り方
ポイントはループに含めないという点だけです。今回はブログ詳細一覧をコピーしてテンプレートを作成しました。

ファイル名をpages.jsとしておきます。

```
/ (プロジェクトディレクトリー)
    ├ gatsby-node.js（ページを生成するところ）
    ├ src/
    |    └ templates/
    |       └ pages.js（個別ページを出力するテンプレート）
    └ content/
	   ├ blogs/
	   ├ assets/
	   |  └ images/common/（個別ページの画像ファイルなどはすべてここに格納）
       └ about.md (個別のページ)
```

## createPageで個別ページを生成する
gatsby-node.jsにページを生成するためのコードを追記しておきます。<br>
`createPage()`関数でページは生成されます。
```js
// ~ 省略 ~
exports.createPages = async ({ graphql, actions, reporter }) => {
  // ~ 省略 ~

  const pagePost = path.resolve(`./src/templates/pages.js`)

  if (posts.length > 0) {

    // ~ 省略 ~

    // pagetypeがpageのみ取得
    posts.forEach((post) => {
      if (post.frontmatter.pagetype === 'page') {
        createPage({
          path: post.fields.slug,
          component: pagePost,
          context: {
            id: post.id,
          },
        })
      }
    })

    // ~ 省略 ~

  }
})
```
### 個別ページを出力するテンプレートpages.jsの編集

記事のIDが一致するものを出力するように設定します。

```js
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const PagePostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // アイキャッチのパスを取得
  const src = data.allFile.edges[0] ? data.allFile.edges[0].node.childImageSharp.fluid.src : ''

  return (
    <Layout location={location} title={siteTitle}>

      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <div className="l-main_contents">
        <article
          className="l-container--md"
        >
          <header>
            <div>
              <h1 className="c-article__heading">{post.frontmatter.title}</h1>
            </div>
          </header>
          <div>
            <section className="c-editArea"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </article>
      </div>

    </Layout>
  )
}

export default PagePostTemplate

export const pageQuery = graphql`
  query PagePostBySlug(
    $id: String!
    ) {
      site {
        siteMetadata {
          title
        }
    }
    markdownRemark(
      id: { eq: $id }
    ) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        hero
        pagetype
      }
    }
  }
`
```
### about.mdファイルを追加し編集
aboutページを追加します。

![銀ねこアトリエとは？](./images/2020/12/entry416-1.jpg)

```
---
title: 銀ねこアトリエとは？
date: 2014-05-14
pagetype: page
description: 「銀ねこアトリエ」は私の技術的なチャレンジや生活や生き方を綴った公開備忘録です。
---
~ 省略 ~
```

これで個別ページが追加できるようになりました。

## まとめ・個別ページの追加はとってもカンタン
とってもカンタンでしたね！

次回「*Gatsbyブログサイト移行物語*」ではGatsbyサイトでのOGP画像出力やプラグインHelmetを使ったSEO対応の記事になる予定です。

皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。
---
title: gatsby-plugin-sitemap で noinde(クロール非対象記事) を排除した sitemap.xml を出力
date: 2025-02-16
pageType: blog
hero: thumbnail/2023/entry519.png
cateId: web-developer
tags: ["Gatsby", "React",'JavaScript']
description: noindex の Markwown で書いた記事のサイトマップを動的に管理したいと思いロジックを考えました。sitemap.xml 出力自体は gatsby-plugin-sitemap で出力、フィルタリングは GraphQL で行います。この度のチップスはぶっちゃけ多少力技ですが、公式通りにやるとコケたので参考にしていただければ幸いです。
---
最近、サイトマップ（Googleにページの所在を知らせるfile）と noindex(非クロール対象ページ) されているが一致しないサイトに遭遇しました。

```html
<meta name="robots" content="noindex" />
```

検索エンジンへ送信される SEO 情報の中で誤りがあるとペナルティを食らう要因にもなりかねないので、このサイトも早速見直すことに。

このブログは Gatsby という、そこそこマニアックなSSG（静的サイトジェネレーター）製です。サイトマップはgatsby-plugin-sitemap という atsbyのオフィシャルプラグイン（いわゆる WordPress のプラグインみたいなもの）を使って出力していました。

[Gatsby 公式サイト](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/)

導入当時はデフォルトで簡易的な機能しか使っていなかったので、手動でサイトマップから外したいページを必要に応じて追加していました。

```json:title=gatsby-config.js
module.exports = {
  ...,
  resolve: `gatsby-plugin-sitemap`,
  options: {
    //自分の好きなファイル名にしたい場合はoutputを追加。デフォルトは「sitemap.xml」
    //除外したいページを指定する。「*」でワイルドカードも使える。
    output: `/`,
    excludes: [
      `/blogs/page/*`,
      `/contact/thanks/`,
      ...
    ]
  }
}
```
今回やりたいことはざっとこんな感じです。
1. クロール非対象記事かは 記事ごとの MarkDown ファイル で判定する。
2. noindex の meta タグ自体は Gatsby の  Head (旧 Helmet )を利用して、head に埋め込こむ
3. MarkDown の情報を gatsby-config.js に設定した gatsby-plugin-sitemap の中で取得して sitemapxxx.xml fileに出力する。

<msg txt="gatsby-plugin-sitemap の公式サイト通りにやってうまくいかなかったです。最近忙しくて当たりどころがなく、夜な夜なコード書いて発散しています。多少力技ですが、参考に指定ただければ幸いです。"></msg>

前提条件として、*Gatsby Blog Starter* を使っています。あとは、JS、React が多少分かれば(多分)どうにかなるかと。

## frontmatter に noindex が登録できるようにする
まずは frontomatter に noindex というフィールドを付与して、true / false で判定できるようにします。

```js:title=./gatsby-node.js
...
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  // Get all markdown blog posts sorted by date 
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              ...
            }
          }
        }
      }
    `
  )
}
...
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    …各種設定
     type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      noindex: Boolean ←これを追加
    }

    type Fields {
      slug: String
    }
  `)
}
```
ここでは完全に True/False で判定できるようにしたいので、入る値は `Boolean` に限定します。


## noindex の meta タグ を動的に埋め込む
クロール非対象記事は、 Head (旧 Helmet )に埋め込みます。Gatsby Blog starter には `src/components/seo.js` という JS file が梱包されています。このコンポーネントを使って head タグ内で諸々の情報を出力可能とします。

まずはページやテンプレートにコンポーネントとして呼び出し、出力したいページ情報を渡します。

たとえば、ブログ記事のテンプレート head タグ内に noindex のタグを追加したい場合は次のようになります。

こうすると、引数で取得した `data` 内に `noindex` の情報が格納されます。

```js:title=./src/templates/blog-post.js
import * as React from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo" // SEO情報を出力するGatsby標準搭載のコンポーネント

const BlogPostTemplate = ({ data, location }) => {
    // 各種記事の出力情報
}
export default BlogPostTemplate;

// ページのheadタグ内にSeoコンポーネントを埋め込む
export const Head = ({ data, location }) => {
  const blogData = {
    title: data.frontmatter.title,
    title: data.frontmatter.description,
    noindex: data.noindex // データ追加
  }
  <Seo
      location={location.pathname}
      data={blogData}
  />
}
//graphql経由で記事ごとのクエリを取得
export const pageQuery = graphql`
query BlogPostBySlug(
  $id: String!
)
{
  markdownRemark(id: { eq: $id }) {
    id
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "YYYY.MM.DD")
      description
      noindex
    }
  }
}
`
```
Seo コンポーネント側の設定は次のとおりです。

```js:title=./src/components/seo.js
import React from 'react'
import { siteMetadata } from "../../../gatsby-config"

const Seo = ({ data, location, children }) => {
  // data に格納された情報を展開
  const { title, description, noindex } = data
  return (
    <>
      <title>{title}</title>
      <meta content={description} type="description" />
      {noindex && (<meta name="robots" content="noindex" />)}
      {children}
    </>
  )
}
```

## 記事（MDファイル）ごとの情報を gatsby-config.js 経由でサイトマップ(sitemap.xml)として出力する
`gatsby-plugin-sitemap` でXMLを書き出します。
プラグインのオフィシャルサイトのサイトの以下コードを参考にしました。 `resolveSiteUrl` でURLを取得する必要があったのですが、特にちゃんとドメインやプロトコルが付与されてしまいます。

```js:title=./gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl, //siteUrlがないって怒られた
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
  ],
}
```

何じゃそりゃと思ったので、resolveSiteUrlの処理を削除すると怒られる。バージョンに依存する可能性がありますがそこまで調べてないのですみません…。

多分意味ないし機能しないのだろうと重々承知で、エラー吐くので無意味な `resolveSiteUrl` のコードを追加し、中にテキトーだけどエラー吐かなさそうな値を返すようにしました。

```js
resolveSiteUrl: () => `https://xxxxx.com`
```

すべてのページは query で allSitePage で取得可能。ただし、allSitePage は MarkDown 内の frontmatter の情報は含まれない。

そこでさらに、query で allMarkdownRemark の noindex: true のみの投稿を取得し。allSitePage の重複するものを削除することにしました。

<msg txt="今回ご紹介するプログラムは、単なるコピペで解決しないかもしれないので、皆さんの環境に応じてください。"></msg>

sitemap.xml は投稿によってクロール頻度や優先度を次のとおり設定します。
<!-- textlint-disable -->

| 種類 | クロール頻度 | 優先度 |
|-|-|
| トップページ | daily | .7 |
| 一覧や個別ページ | weekly | .3 |
| ブログ | weekly | .7 |

<!-- textlint-enable -->

```js:title=tatsby-configt.js
{
    resolve: `gatsby-plugin-sitemap`,
    options: {
        query: `
        {
            allSitePage(filter: {
                path: {
                    nin: ["/404/", "/404.html", "/dev-404-page/"]
                }
            }) {
                nodes {
                path
                }
            }
            allMarkdownRemark(filter: {frontmatter: {noindex:{ eq: true }}}) {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
        `,
        resolveSiteUrl: ({ site }) => {
            return 'https://xxxx.com';//自分のサイトのURL
        },
        resolvePages: ({
            // 404 を除くすべてのページと Markdown で生成したnoindexの記事を取得
            allSitePage: { nodes: allSitePage },
            allMarkdownRemark: { nodes: allMarkdownRemark },
        }) => {
            // サイトページを作成
            const allPages = allSitePage.map(node => ({
                path: node.path,
                changefreq: node.path === '/' ? 'daily' : 'weekly',
                priority: node.path === '/' || node.path.includes('entry') ? 0.7 : 0.5,
            }));

            // noindex ページを削除
            const noindexPages = allMarkdownRemark.map(node => node.fields.slug);
            const filteredPages = allPages.filter(page => !noindexPages.some(slug => page.path.includes(slug)));

            return filteredPages;
        },
        serialize: ({ site, path, changefreq, priority }) => {
            return {
                url: `${path}`,
                changefreq: changefreq,
                priority: priority,
            }
        },
    },
},
```

## まとめ・SEO 情報はガイドラインに沿う

今回コード生成にAI使ったけどイレギュラーに弱いなあと…。

今回、なれないロジックを組むことが多かったのでロジックの生成にAI（Copilot）使いました。バグやイレギュラーに弱くてめちゃめちゃ時間かかりました。

<msg txt="もう、夜中3時やで笑<br/>ゆうても死ぬほど便利！！！超ストレス発散になってます。"></msg>

AI 使うにあたってエンジニアにとって大切なことはこんな感じ。
* ミクロ（細分化して）に実行させること
* AI のいうことを鵜呑みにしない
* エラー数回（2、3回）が続くようなら、あっさり手法を切り替える
* 適宜ググる

以前なにか調べていた時、AIの回答と 0 が 一桁違たのでびびりました。

たまに腰抜かしそうな嘘もつくのを、あらかじめそれを肝に銘じて使うべきかなあと。

基本的には AI 便利すぎです。

この記事が皆さんのコーディングの一助となれば幸いです。


<msg txt="基本的には大多数に読まれるより、たった一人でもいいのでめっちゃ熟読してほしいので…"></msg>

最後までお読みいただきありがとうございました。

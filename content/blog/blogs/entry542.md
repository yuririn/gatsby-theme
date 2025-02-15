---
title: gatsby-plugin-sitemap で noinde(クロール非対象記事) を排除した sitemap.xml を出力
date: 2025-02-16
pagetype: blog
hero: thumbnail/2023/entry519.png
cateId: web-developer
tags: ["Gatsby", "React",'JavaScript']
description: noindex の Markwown で書いた記事のサイトマップを動的に管理したいと思いロジックを考えました。sitemap.xml 出力自体は gatsby-plugin-sitemap で出力、フィルタリングは GraphQL で行います。この度のチップスはぶっちゃけ多少力技ですが、公式通りにやるとコケたので参考にしていただければ幸いです。
---
最近、サイトマップ（Googleにページの所在を知らせるfile）と noindex(非クロール対象ページ) されているが一致しないサイトに遭遇しました。

このブログは GatsbyJS という、まあまあマニアックなSSG（静的サイトジェネレーター）で作らてますが、gatsby-plugin-sitemapという npmモジュール（いわゆる WP のプラグインみたいなもの）を使ってサイトマップ出力していました。

デフォルトで簡易的な機能しか使っていなかったので、手動でサイトマップから外したいページを必要に応じて追加していました。

やりたいことはざっとこんな感じです。
1. クロール非対象記事かは 記事ごとの MarkDown ファイル で判定する。
2. noindex の meta タグ自体は Gatsby の  Head (旧 Helmet )を利用して、head に埋め込こむ
3. MarkDown の情報を gatsby-config.js に設定した gatsby-plugin-sitemap の中で取得して sitemap.xml fileに出力する。

<msg txt="gatsby-plugin-sitemapの公式サイト通りにやってうまくいかなかったです。最近忙しくて当たりどころがなく、夜な夜なコード書いて発散しています。多少力技ですが、参考に指定ただければ幸いです。"></msg>

前提条件として、*Gatsby Blog starter* を使っています。あとは、JS、React が分かる(多分)程度かけることが前提です。

## frontmatter に noindex が登録できるようにする
まずは frontomatter に noindex というフィールドを付与して、true / false で判定できるようにします。

```js:title=gatsby-node.js
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
クロール非対象記事は、 Head (旧 Helmet )に埋め込みます。Gatsby Blog starter を改造してるのでであれば `src/components/seo.js` が見つけれると思います。このコンポーネントでhead タグ内で諸々の情報を出力できるようになります。

まずはページやテンプレートにコンポーネントとして呼び出し、出力したいページ情報を渡します。

たとえば、ブログ記事のテンプレート head タグ内に noindex のタグを追加したい場合は以下のようになります。

こうすると、引数で取得した `data` 内に `noindex` の情報が格納されます。

```js:title=blog-post.js
import * as React from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo" // SEO情報を出力するGatsby標準搭載のコンポーネント

const BlogPostTemplate = ({ data, location }) => {
    // 各種記事の出力情報
}
export default BlogPostTemplate;
export const Head = ({ data, location }) => {
  const blogData = {
    ...
    noindex: data.noindex // データは
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

## 記事（MDファイル）ごとの情報を gatsby-config.js 経由でサイトマップ(sitemap.xml)として出力する
`gatsby-plugin-sitemap` でXMLを書き出します。
プラグインの公式サイトでは `resolveSiteUrl` でURLを取得する必要があったのですが、取得でないどころかちゃんとドメインやプロトコルがが付与される。

何じゃそりゃと思ったので、resolveSiteUrlの処理を削除すると怒られる。

多分意味ないし機能しないのだろうと思いつつも、エラー履くので無意味な `resolveSiteUrl` のコードを追加し、中にテキトーな値を返すようにしました。

記事は、allSitePage と allMarkdownRemark で出力可能。allSitePage はMarkdownで書かれていないものも含まれる。

逆に　allMarkdownRemark　はMarkdownで書かれた記事のみが対象。
当ブログでは、パスに entry を含むものが記事としているので（SEO的には微妙かも。。）その設定で絞りつつ、Markdown の frontmatter に noindex が設定されていないものを抽出し、重複するものを削除すればいい。


<msg txt="コピペで解決しないと思うんで、皆さんの環境に応じてください。"></msg>
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
            allSitePage: { nodes: allSitePage },
            allMarkdownRemark: { nodes: allMarkdownRemark },
        }) => {
            // サイトページを作成
            const allPages = allSitePage.map(node => ({
                path: node.path,
                changefreq: node.path === '/' ? 'daily' : 'weekly',
                priority: node.path === '/' || node.path.includes('entry') ? 0.7 : 0.3,
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

## まとめ・今回コード生成にAI使ったけどイレギュラーに弱い
今回、なれない事が多かったのでロジック生成にAI（Copilot）使いましたが、バグやイレギュラーに弱くてめちゃめちゃ時間かかりました。

<msg txt="もう、夜中3時やで笑"></msg>

AI使うにあたってエンジニアにとって大切なことはこんな感じ。
* ミクロ（細分化して）にやって行くこと
* AIのいうことを鵜呑みにしない
* エラー数回（2、3回）が続くようなら、あっさり手法を切り替える
* 適宜ググる

一回、なにか調べてた時、AIの回答と 0 が 一桁違っててびびりました。

たまに腰抜かしそうな嘘もつくのを、あらかじめそれを肝に銘じて使うべきかなあと。

基本的には便利すぎです。

この記事が皆さんのコーディングの一助となれば幸いです。


<msg txt="基本的には大多数に読まれるより、たった一人でもいいのでめっちゃ熟読してほしいので。。。"></msg>

最後までお読みいただきありがとうございました。

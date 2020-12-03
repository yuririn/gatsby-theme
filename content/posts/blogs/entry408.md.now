---
title: Gatsbyブログサイト移行物語3~ブログ記事、カテゴリー、タグ一覧の出力~
date: 2020-12-01
hero: entry401.jpg
pagetype: blog
category: Front End
cateId: front-end-program
tags: ["JavaScript","React","Gatsby"]
description: 今回は、
lead: ["フロントエンドエンジニアのかみーゆです。","現在GatsbyJSでサイトのリニューアル中です！","ブログのファーストビューって大切ですよね。アイキャッチ次第で読むか読まないか考えますもん。","今回はブログページを充実させるためにアイキャッチなどを追加する方法をご紹介します。","CSSの調整も行いました！","※ Mac以外では検証してません。ご了承ください。"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. [投稿ページの充実と画像の方法]((/blogs/entry406/))
3. ブログ記事、カテゴリー、タグ一覧の出力（←イマココ）

### このシリーズではテーマGatsby Starter Blogを改造します
この記事は一番メジャーなテンプレート、 Gatsby Starter Blogを改造しています。同じテーマでないと動かない可能性があります。

## src/pageディレクトリーにあるindex.jsを複製します

Gatsby Starter Blogでは、一覧などのテンプレートはsrc/templates内に収められています。<br>
まずは、以下にblogs.jsという名前で格納します。
```
src/
    ├ pages/
    |   ├ index.js （これをコピー）
    |   └ 404.js
    ├ templates/
    |   ├ blog-post.js
    |   └ blogs.js（ここに格納）
    ├ components/
  ├ style.css
  └ normalize.css
```

変数名を変更しておきます。

```
  省略
const Blogs = ({ data, location }) => {
  省略
}

export default Blogs
  省略

```

## gatsby-node.jsにページを作成するためのコードを書く
gatsbyjsは静的ページを生成するので各一覧を生成するためのコードを書きます。

**gatsby-node.js**のexports.createPages内、GraphQLでクエリが実行されすべての記事を取得しています。
```
// Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
      totalCount
      nodes {
          id
          fields {
            slug
          }
        }
      }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

```

すべての記事は`posts`に格納されています。

ざっくり何をするかというと、先ほど作ったblogs.jsからクエリを投げて、特定の記事の一覧データを格納し`createPage()`でページを生成します。

## ブログ記事の一覧を生成する
この銀ねこアトリエでは、ブログ記事と自己紹介やプライバシーポリシーなどの個別のページの投稿をすべてmdファイルに書いています。

**一覧に個別ページを含めたくない**ので、ページのタイプを追加します。各mdファイルの**fromtmatterにpagetypeを追記**します。

```
---
title: Webサイトの表示速度を真剣に考える
date: 2019-06-21
hero: entry325.png
pagetype: blog
description: 昔いた会社で、画像の圧縮、CSSなどの外部ファイルを徹底して不要ファイルを削除して圧縮してさらにワンソース化した結果、50位から20位以内に順位が改善したことがあります。今日はWebサイトの軽量化とスピードについて真剣に考えようと思います。
---
```
gatsby-node.js側です。<br>
queryにpagetypeを含めたいのでfrontmatterとpagetypeを追加します。

```
const result = await graphql(
  `
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 1000
    ) {
      totalCount
      nodes {
          id
          fields {
            slug
          }
          frontmatter {
            pagetype
          }
        }
      }
   }
  `
)
```
これでblogs.js側でもpagetypeが取得できるようになりました。

createPageを実行するテンプレートを追加します。

```
const blogList = path.resolve(`./src/templates/blogs.js`)
```

```
if (posts.length > 0) {
}
```

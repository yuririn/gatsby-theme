---
title: Gatsbyブログサイト移行物語~プラグインHelmetでSEO調整~
date: 2020-12-16
modifieddate: 2022-01-03
hero: thumbnail/2020/entry401.jpg
pagetype: blog
cateId: web-developer
tags: ["JavaScript","React","Gatsby"]
description: Gatsby記事もこれで8記事目となりました！！表示が早いだけではNG!!!サイトをちゃんと機能させるため、SEOで出力する情報を調整しました。パンくずやページの構造化データやOGP画像なども調整しています。※FBシェアにおけるcanonilcal属性を修正しました。※GA4に対応しました。
lead: ["Gatsby記事もこれで8記事目となりました！！表示が早いだけではNG!!!サイトをちゃんと機能させるため、SEOで出力する情報を調整しました。パンくずやページの構造化データやOGP画像なども調整しています。","※FBシェアのcanonilcal属性を修正しました。","※GA4に対応しました。","※ v4に対応しました。"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. [ヘッダーとフッターを追加する](/blogs/entry484/)
2. [投稿テンプレにカテゴリやらメインビジュアル（アイキャッチ）追加](/blogs/entry406/)
3. [ブログ記事、カテゴリー、タグ一覧の出力](/blogs/entry408/)
4. [プラグインを利用して目次出力](/blogs/entry410/)
5. [プラグインナシで一覧にページネーション実装](/blogs/entry413/)
6. [個別ページテンプレート作成](/blogs/entry416/)
7. *プラグインHelmetでSEO調整*（←イマココ）
8. [CSSコンポーネントでオリジナルページを作ろう！！](/blogs/entry421/)
9. [関連記事一覧出力](/blogs/entry430/)

このシリーズは[Github・gatsby-blog](https://github.com/yuririn/gatsby-blog)に各内容ごとにブランチごとで分けて格納しています。

今回のソースは[seo](https://github.com/yuririn/gatsby-blog/tree/seo)ブランチにあります。

### このシリーズではテーマGatsby Starter Blogを改造
この記事は一番メジャーなテンプレート、「*Gatsby Starter Blog*」を改造しています。同じテーマでないと動かない可能性があります。

## プラグインHelmetとは？
Helmetは「*Gatsby Starter Blog*」に最初からインストールされているプラグインで、head内にメタタグをまとめて出力してくれます。

今回ファイルの追加はとくにしません。

基本的には既存ファイルのsrc/components/seo.jsを改造します。

```
/ (プロジェクトディレクトリー)
  ├ static/
  |  └ images/
  |    ├ ogp.png（汎用ogp画像）
  |    └ logo.png（サイトのロゴ ）
  └ src/
    |  └ templates/
    |    └ blog-post.js
    └ components/
          └ seo.js（head内にmetaタグなどを出力する）
```


## OGP画像が取得できるように下準備
og:imageや、twitter:card、meta:thumbnailに画像が追加できるようにします。

基本的には[投稿テンプレにカテゴリやらメインビジュアル（アイキャッチ）追加](http://localhost:8000/blogs/entry406/)で設定した、キービジュアル画像をOGP画像として使いますが、設定のないページでは共通のogp画像を使います。

static/images/に汎用画像ogp.pngをおいておきます。

記事などはそれぞれのアイキャッチをOGPとして出力したいので、アイキャッチのフルパスが取得できるようにします。

### 基本のアイキャッチの設定のあるblog-list.jsを改造する
画像のパスを取得するため、allFileにpublicURLを追加します。

```js
export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $hero: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        relativePath: { eq: $hero }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          # ↓追加
          publicURL
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 640
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
    # 省略
  }
`
```
ogp画像のパスを取得し、seo.jsに値を渡します。
```js
// 省略
const BlogPostTemplate = ({ data, location }) => {
  // 省略

  const ogpImg = data.allFile.edges[0].node.publicURL

  return (
    <Layout location={location} title={siteTitle}>
    <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        // ブログ記事のみ追加
        img={ogpImg}
        // すべてのテンプレに追加
        location={location}
      />
```
トップページの判定をするためにすべてのテンプレに`location`属性を追加します。

seo.jsを変更します。

```js
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, lang, meta, title, img, location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const imgPath = `${site.siteMetadata.siteUrl.replace(/\/$/, "")}${
    img ? img : "/images/ogp.png"
  }`
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `thumbnail`,
          content: imgPath,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `${isRootPath ? "website" : "webpage"}`,
        },
        {
          property: `og:url`,
          content: imgPath,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: imgPath,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

```

## URLの正規化をする
このサイトはページネーションがあるので投稿が増えると、一覧ページが無限に増えます。<br>
類似ページが何個もあると検索エンジンに認識されるのはSEO的にもよろしくないので、カノニカル属性を使ってURLを正規化します。 <br>※ FBシェアにおけるパラメーターの不具合を発見しcanonilcal属性を修正しました。
```html
<link rel="canonical" href="URL"/>
```
> ### canonical属性とは？
> canonical（カノニカル）属性とは、Google、Yahoo!、MSNなどの大手検索エンジンがサポートするURLを正規化するためのタグです。 同一のコンテンツが複数のURLで閲覧できる状態になっている場合、検索エンジンがインデックスするべきURLを統一させておく必要があります。 SEO対策において必須の内部対策です。

URLに`/page/数字/`を含む場合は除去し、そのURLをcanonical属性として出力します。

```js
  // 省略
  const isRootPath = location.pathname === rootPath

  let blogUrl = location ? location.href : site.siteMetadata.siteUrl
  // ページネーション削除
  blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        // 省略
        {
          property: `twitter:image`,
          content: imgPath,
        },
      ].concat(meta)}
    >
      <link rel="canonical" href={blogUrl} />
    </Helmet>
  )
}
// 省略
```
## 構造化データ追加
構造化データを追加します。トップページはtypeをWebSiteそれ以外はWebPageとします。

またブログが記事のもののみ、BlogPosting（*この投稿はブログだよ！！って検索エンジンに教えます*）の構造化データを追加します。
### ページのデータ
seo.jsに構造化データのJSONを出力できるようにします。mdファイルも公開日はもちろん、更新日（modifieddate）が取得できるようにしておきます。

更新されて、手が入っているページかが大事です。

```
---
title: 記事サンプル
date: 2020-11-26
modifieddate: 2020-11-26
pagetype: blog
hero: thumbnail/entry01.jpg
description: この記事はテスト投稿です
cate: seo
tags: ['Gatsby', 'React']
---
```

```js
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
//記述方法変更
const Seo = props => {
  const {
    description,
    img,
    location,
    lang,
    title,
    meta,
    type,
    date,
    modified,
  } = props
  // 省略

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const imgPath = `${site.siteMetadata.siteUrl.replace(/\/$/, "")}${
    img ? img : "/images/ogp.png"
  }`
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let blogUrl = location ? location.href : site.siteMetadata.siteUrl
  // ページネーションのある箇所は削除
  blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")

  // 構造化データの追加
  // 執筆者情報
  const author = [
    {
      "@type": "Person",
      name: site.siteMetadata.author.name,
      description: site.siteMetadata.author.summary,
      url: site.siteMetadata.siteUrl,
      sameAs: [
        site.siteMetadata.social.twitter,
        site.siteMetadata.social.instagram,
      ],
    },
  ]

  // 公開する組織など
  const publisher = {
    "@type": "Organization",
    name: site.siteMetadata.title,
    description: site.siteMetadata.description,
    logo: {
      "@type": "ImageObject",
      url: `${site.siteMetadata.siteUrl}images/logo.png`,
      width: 72,
      height: 72,
    },
  }

  // JSON+LDの設定
  let jsonLdConfigs = [
    {
      "@context": "http://schema.org",
      "@type": isRootPath ? "webSite" : "webPage",
      inLanguage: "ja",
      url: blogUrl,
      name: title,
      author,
      publisher,
      image: imgPath,
      description: metaDescription,
    },
  ]
  if (type === "blog") {
    const article = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: blogUrl,
      name: title,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: imgPath,
      },
      description: description,
      datePublished: date,
      dateModified: modified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogUrl,
      },
      author,
      publisher,
    }
    jsonLdConfigs = [...jsonLdConfigs, article]
  }

  return (
    <Helmet
      {/* 省略 */}
    >
      <link rel="canonical" href={blogUrl} />
      {/* 構造化データ出力 */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdConfigs)}
      </script>
    </Helmet>
  )
}

// 省略

export default Seo

```
### パンくずリスト

パンくずリストの構造化データも作成します。先ほどページ用に作ったJsonデータ`jsonLdConfigs`と結合させます。

カテゴリーとタグのテンプレに`type`を追加します。

こちらはカテゴリーのテンプレのSeoコンポーネントです。

属性がちゃんとセットされているか確認しておきましょう。
```js
<Seo
  title={cate.name}
  location={location}
  type="list"
  discription={`${cate.name}一覧記事です。${cate.description}`}
/>
```

```js
if (!isRootPath) {
    let breadCrumbList = [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${site.siteMetadata.siteUrl}/`,
          name: "ホーム",
        },
      },
    ]
    if (type === "blog") {
      breadCrumbList = [
        ...breadCrumbList,
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": `${site.siteMetadata.siteUrl}/blogs/`,
            name: `ブログ一覧`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": blogUrl,
            name: title,
          },
        },
      ]
    } else if (type === "list") {
      breadCrumbList = [
        ...breadCrumbList,
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": `${site.siteMetadata.siteUrl}/blogs/`,
            name: `ブログ一覧`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": blogUrl,
            name: title,
          },
        },
      ]
    } else {
      breadCrumbList = [
        ...breadCrumbList,
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": blogUrl,
            name: title,
          },
        },
      ]
    }
    jsonLdConfigs = [
      ...jsonLdConfigs,
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadCrumbList,
      },
    ]
  }
```
## まとめ・SEO情報が更新されたらブログを書くのが楽しくなる！
昨年は突貫でかなりやばいコードを書いていて申し訳な気持ちですが少しまともになりましたw。

FBやTwitterでのシェアしてOGP画像が表示されるようになりました。

皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

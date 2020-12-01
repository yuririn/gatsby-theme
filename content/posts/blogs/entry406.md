---
title: Gatsbyブログサイト移行物語2~投稿ページの充実と画像設定~
date: 2020-11-30
hero: entry401.jpg
pagetype: blog
category: Front End
cateId: front-end-program
tags: ["JavaScript","React","Gatsby"]
description: 現在GatsbyJSでサイトのリニューアル中です！ブログのファーストビューって大切ですよね。アイキャッチ次第で読むか読まないか考えますもん。今回はブログページを充実させるためにアイキャッチなどを追加する方法をご紹介します。CSSの調整も行いました！※ Mac以外では検証してません。ご了承ください。
lead: ["フロントエンドエンジニアのかみーゆです。","現在GatsbyJSでサイトのリニューアル中です！","ブログのファーストビューって大切ですよね。アイキャッチ次第で読むか読まないか考えますもん。","今回はブログページを充実させるためにアイキャッチなどを追加する方法をご紹介します。","CSSの調整も行いました！","※ Mac以外では検証してません。ご了承ください。"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>
制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. 投稿ページの充実と画像の方法（←イマココ）

### このシリーズではテーマGatsby Starter Blogを改造します
この記事は一番メジャーなテンプレート、 Gatsby Starter Blogを改造しています。同じテーマでないと動かない可能性があります。

各種設定を変更していきましょう。

## 記事と記事中の画像などの格納フォルダーを変更
デフォルトでは、記事内本文に表示したい画像であればマークダウンファイルと同じblogフォルダーに格納すれば大丈夫です。

私は今公開されているサイトにディレクトリー構造をできるだけ近づけるため、以下のように設置しました。

```
プロジェクト/
  └ content/
    └ blog/ あとで名前変更
      └ blogs/
      ├ imgages/
      ├ 個別のページ
      └ blogs/
        └ 各ブログ記事
```
gatsby-config.jsの`gatsby-theme-blog`の`basepath`を`blogs`から`/posts`変更します。<br>
gatsby-config.jsはプロジェクトをインストールした直下にあります。<br>
blogの下にblogsがあるのは気持ち悪いので。。。

```
plugins: [
  {
    resolve: `gatsby-theme-blog`,
    options: {
      basePath: `/blogs`,
    },
  },
],
```
を以下に変更。
```
plugins: [
  {
    resolve: `gatsby-theme-blog`,
    options: {
      basePath: `/posts`,
    },
  },
],
```
フォルダー名もpostsに変更します。

## frontmatterを設計し投稿する。
記事ごとに必要なタイトルなどの項目を設計します。

ここで適当に設計したら多分あとで泣きをみます。

後々何が出力したいかよく考えて作成しましょう。

```
---
title: テスト投稿
date: 2020-11-26
description: この記事はテスト投稿です
---
```

デフォルトではこんなものだと思いますので、アイキャッチ（hero）、投稿の種類（pagetype）も追加します。<br>
ちなみに私のブログでは**categoryは1つ、タグは複数OK**というルールがあります。

ルールが煩雑だと記事も破綻しますので。

```
---
title: テスト投稿
date: 2020-11-26
pagetype: blog
hero: entry321.jpg
description: この記事はテスト投稿です
---
```
適当に作ったら、content/posts/blogs/ディレクトリー内に格納してください。

## 出力するテンプレートを改造する

次に、出力するテンプレートを改造します。<br>
テンプレートはsrc/templetes/内のblog-post.jsです。

このテンプレートはlayout（骨格）、bio（執筆者情報）、seo（SEO関連）から構成されいます。

今回は19 ~ 36行目の`article`の部分のメイン部分だけ出力を変えてみます。

### アイキャッチの出力
アイキャッチが反映できるようにします。

私は記事とはアイキャッチを分けているので、Image用コンポーネントを新たに作って利用します。
src/components直下にimage.jsファイルを作成します。

デフォルトで入っているgatsby-imageを改造しました。

環境に応じて[WabP](https://ja.wikipedia.org/wiki/WebP)などに画像が最適化されて表示がクソ早いです。

惚れてまうやろ。

```
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// 画像ファイルパスをプロパティに取るようなコンポーネントを定義
export default ({ filename }) => (

  // ページじゃないコンポーネントでもGraphQLが使えるように
  // StaticQueryタグを使う
  <StaticQuery

    // GraphQLのクエリ引数には何も指定しない！
    query={graphql`
    query {
      images: allFile {
      edges {
        node {
        relativePath
        name
        childImageSharp {
          sizes(maxWidth: 800) {
          ...GatsbyImageSharpSizes
          }
        }
        }
      }
      }
    }
    `}

    // 全画像情報がdataに代入されている
    render={(data) => {

      // 指定した画像ファイルパス（コンポーネントのプロパティ）と
      // 一致するgatsby-image用の情報を取得
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(filename)
      })

      if (!image) return

      // Imgタグでgatsby-imageで最適化された画像を表示する
      const imageSizes = image.node.childImageSharp.sizes

      return <Img sizes={imageSizes} />
    }}
  />
)

```
丸パクらせていただきました。ありがとうございます。

参考サイト:[パスを渡せばgatsby-imageで画像を表示してくれるコンポーネントの作成方法](https://takumon.com/simple-gatsby-image-wrapper)

次にsrc/templetes/内のblog-post.jsに作ったコンポーネントをインポートします。

```
import Image from "../components/image"
```
const BlogPostTemplate ~ 以下にサムネを追加したいところにコードを追加します。<br>
主にはheader内を変更します。
```
<header>
  <h1 itemProp="headline">{post.frontmatter.title}</h1>
  <p>{post.frontmatter.date}</p>
</header>
```
const BlogPostTemplate のHTMLの部分ですが、全体的にはこんな感じ。

もしサムネがないときはダミー画像を表示します。
```
const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const {title, description, hero, date } = data.frontmatter //追加

  return (
    <Layout location={location} title={siteTitle}>

      <SEO
        title={title}
        description={description || post.excerpt}
      />
      <article
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>

          <h1 itemProp="headline">{title}</h1>
            <p>{date}</p>
            {hero ?
              <Image filename={hero} />
            : <Image filename="dummy.png" />
            }
        </header>
          ~ 以下省略~
```

アイキャッチ、ダミー画像はcontent/assets/ディレクトリーに格納しておきます。

次にクエリを修正します。

69行目くらいにある、`export const pageQuery = graphql`を探してください。

ここにQraphQLの実行文があります。

idが正しい場合、同じMDファイルを読み込んでHTMLにパースしています。
QraphQLはクエリ言語なので、MDファイルのfrontmatter(---で囲んだ部分)の設定もここから読み取ることができます。

```
  markdownRemark(id: { eq: $id }) {
    id
    excerpt(pruneLength: 160)
    html
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      description
    }
  }
```
クエリにheroを足し、ついでに日本人からするとなじみのない日付のフォーマットも変えてしまいます。
YYYY年MM月DD日と変更することも可能です。
```
  markdownRemark(id: { eq: $id }) {
    id
    excerpt(pruneLength: 160)
    html
    frontmatter {
      title
      date(formatString: "YYYY.MM.DD")
      description
      hero
    }
  }
```

アイキャッチ画像が表示されるようになったのではないでしょうか？

## オリジナルプロフィールコンポーネントを作成
Imageコンポーネントはどこでも使えます。<br>
せっかくなので、プロフィール用のコンポーネントを作ってみましょう！<br>
src/components内にprofile.jsを作ります。

リンクタグも使いたいので`gatsby`からLinkも呼び出します。

```
import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"

const profile = () => {

  return (
    <section class="c-profile p-section">
      <h2 class="c-heading--lg">管理人について</h2>
      <div className="c-profile__img u-mblg">
        <Image filename="my-profile.jpg" />
      </div>
      <div class="c-profile__content">
        <div class="u-mblg c-editArea">
          <p >「銀ねこアトリエ」へようこそ！フロントエンドエンジニアのかみーゆです。</p>
          <ul>
            <li>日本でフロントエンドを中心に約10年Web制作</li>
            <li>2019年4月「MacBook Pro とスーツケースだけで生きていこう」と、セブ島に移住</li>
            <li>セブ島に転職してエンジニア講師</li>
            <li>オフショア開発担当者</li>
            <li>疲れたので辞めてプータロー</li>
            <li>人生の充電中でセブ島ライフを満喫(イマココ)</li>
          </ul>
          <p>好きな人といるだけでパワースポット！今は大好きな仲間と消耗しない働き方をするために計画中。
            13歳の頃から「好きなように生きて好きなように死ぬ」が人生のKPI。<br />「楽しいか」、「かっこいいか」でやることを判断・取捨択一しています。好きなものは肉とビール。</p>
        </div>
        <p class="u-text-center"><Link to="/about" className="p-btn--detail">About Me</Link></p>
      </div>
    </section >
  )
}

export default profile

```

あとはお好きなところに作ったコンポーネントをインポートしてタグを追記してください。

```
import Profile from "../components/profile"

省略

<Profile />
省略
```

### CSS。。。記事の移行なのでCSSを改めて書くのは面倒。。。
私の場合は今回記事の以降なのでCSSのためのコンポーネントを改めて書くのはスーパー面倒です。

なのでサクッと既存のCSSを読み込ませました。

モジュール化といえどやっぱりインラインCSSには抵抗があります。。。

私は各ページさほど変化なく作っており、しかもCSSはワンソース化しているのでそのまま読み込ませることにしました。

src直下のgatsby-browser.jsを以下のように書き換えました。<br>
リセットCSSをコメントアウトし、style.cssの中身を書き換えました。

必要あればこちらにCSSファイルをを追記してください。

```
// normalize CSS across browsers
// import "./src/normalize.css"
import "./src/style.css"
```

## まとめ
いかがでしたか？

これで画像ファイルをテンプレート、mdファイルかかわらず読み込めるようになったと思います。

ちなみにまだ反映してませんが、現在92記事終わりました。。

すでに実装できている項目は以下です。

* ヘッダーフッター出し分け
* 一覧（記事全体、カテゴリー、タグ）
* ページネーション
* 関連記事
* OGP出力
* 人気記事
* 外部リンクを別ウィンドウで開く

順次更新してきますね！<br>
ページネーションはなぜか知らんけど、プラグインなしで実装する羽目になりました。

もう1個重要な機能を実装したのですが忘れましたw

こんな記事ですが皆さんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

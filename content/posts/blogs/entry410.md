---
title: Gatsbyブログサイト移行物語3~ブログ記事、カテゴリー、タグ一覧の出力~
date: 2020-12-03
hero: 2020/entry401.jpg
pagetype: blog
category: Front End
cateId: front-end-program
tags: ["JavaScript","React","Gatsby"]
description: gatsbyのブログ用記事を抽出し一覧を作りました。カテゴリー、タグ一覧もぞれぞれ用意したのでだいぶ使い勝手がよくなりました。今回はそれぞれの一覧の出力の仕方についてまとめます。
lead: ["gatsbyのブログ用記事を抽出し一覧を作りました。カテゴリー、タグ一覧もぞれぞれ用意したのでだいぶ使い勝手がよくなりました。今回はそれぞれの一覧の出力の仕方についてまとめます。","※ Mac以外では検証してません。ご了承ください。"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. [投稿ページの充実と画像の方法]((/blogs/entry406/))
3. ブログ記事、カテゴリー、タグ一覧の出力（←イマココ）

### このシリーズではテーマGatsby Starter Blogを改造
この記事は一番メジャーなテンプレート、 Gatsby Starter Blogを改造しています。同じテーマでないと動かない可能性があります。

## src/pageディレクトリーにあるindex.jsを複製

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

```javascript
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
```javascript
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

すべての記事は変数`posts`に格納されています。

ざっくり何をするかというと、先ほど作ったblogs.jsからクエリを投げて、特定の記事の一覧データを格納し`createPage()`でページを生成します。

## ブログ記事の一覧を生成する
この銀ねこアトリエでは、ブログ記事と自己紹介やプライバシーポリシーなどの個別のページの投稿をすべてmdファイルに書いています。

**一覧に個別ページを含めたくない**ので、ページのタイプを追加します。各mdファイルの**fromtmatterにpagetypeを追記**します。

```md
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

```javascript
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

```javascript
const blogList = path.resolve(`./src/templates/blogs.js`)
```

```javascript
if (posts.length > 0) {
  createPage({
    path: '/blogs/',
    component: blogList,
  })
}
```
## pagetypeがblogの記事のみを取得する
blogs.jsを編集します！

`allMarkdownRemark`にフィルターをかけます。**pagetype**が**blogs**のものだけを絞り込みます！

`totalCount`で現在**blog**の記事数も取得して現在どのくらい記事があるか表示できるようになりました。

![pagetypeがblogの記事のみを取得する](./images/2020/12/entry408-1.png)

```javascript
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

const blogs = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title="銀ねこアトリエ">
      <SEO title="ブログ一覧"
        description="「銀ねこアトリエ」の最新ブログ一覧です。"
      />
      <div class="p-pageHeader">
        <div class="p-pageHeader__main">
          <h1 class="p-pageHeader__heading">最新ブログ一覧</h1>
          <p>現在 {data.allMarkdownRemark.totalCount} 記事あります</p>
        </div>
      </div>
      <div className="l-container">
        <section className="p-section">
          <h2 className="c-heading--lg">最新記事</h2>
          <div className="c-grid">
            {posts.map(post => {

              return (
                <article
                  className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link to={post.fields.slug} itemProp="url" className="p-entryCard__img" >
                    {post.frontmatter.hero ?

                      <Image filename={post.frontmatter.hero} />
                      : <Image filename="common/dummy.png" />
                    }
                    <div class="p-entryCard__date">
                      {post.frontmatter.date}
                    </div>
                  </Link>
                  <Link to={post.fields.slug} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{post.frontmatter.title}</h3></Link>
                </article>
              )
            })}
          </div>
        </section>
      </div>

    </Layout>
  )
}


export default blogs

export const pageQuery = graphql`
  query blosQyery {
      site {
        siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {pagetype: { eq: "blog" } } }
    )
    {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        hero
        }
      }
    }
  }
`
```

## カテゴリーを追加する
カテゴリーも追加しましょう！！<br>
frontmatterにcategory項目を追加します。

ブログを設計するときに、カテゴリーの数を増やさないって決めていたのでgatby-config.jsの`siteMetadata`にあらかじめ、以下のようにcategoryを追記しておきました。

```js
module.exports = {
  siteMetadata: {
    title: `銀ねこアトリエ`,
    author: {
      name: `かみーゆ`,
      summary: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニア`,
    },
    description: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニアの気ままな日記です。`,
    siteUrl: `https://ginneko-atelier.com/`,
    social: {
      twitter: `lirioL`,
      instagram: `yurico.k`,
    },
    category: [
      {
        slug: 'cms',
        name: 'Contents Management System',
        description: 'WordPressやconcrete5などCMSの記事',
      },
      {
        slug: 'front-end-program',
        name: 'Front End',
        description: 'HTML、CSS、JSなどの書き留めたチップス',
      },
      {
        slug: 'back-end-program',
        name: 'Back End',
        description: 'PHP、黒い画面、DBが中心'
      },
      {
        slug: 'seo',
        name: 'Seaarch Engine Optimization',
        description: 'SEOやコンテンツマーケティングに関する記事'
      },
      {
        slug: 'it-seminar',
        name: 'ITセミナー',
        description: '勉強会の開催/登壇について書いてます'
      },
      {
        slug: 'ginneko-tsuredure',
        name: 'Life Hack',
        description: '思ったことを気ままに書いてます'
      },
    ]
  },
```
IDのみ追記します。

```
---
title: Webサイトの表示速度を真剣に考える
date: 2019-06-21
hero: entry325.png
pagetype: blog
cateId: seo
description: 昔いた会社で、画像の圧縮、CSSなどの外部ファイルを徹底して不要ファイルを削除して圧縮してさらにワンソース化した結果、50位から20位以内に順位が改善したことがあります。今日はWebサイトの軽量化とスピードについて真剣に考えようと思います。
---
```
blogs.jsをsrc/templates/内に複製し、category.jsを作成します。

gatsby-node.jsのクエリに`cateId`を追加します。

```jS
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
            cateId
          }
        }
      }
   }
  `
)
```

category.jsをテンプレートとしたすべての記事からcateIdを絞り込んでページを生成します。
postからカテゴリーのIDを抽出して重複を削除し、各ページを生成します。

```javascript
  const categoyTemplate = path.resolve(`./src/templates/category.js`);

  let categories = {};

  let cates = posts.reduce((cates, edge) => {
    const edgeCates = edge['frontmatter']['cateId'];
    return edgeCates ? cates.concat(edgeCates) : cates;
  }, []);

  for (var i = 0; i < cates.length; i++) {
    let key = cates[i];
    categories[key] = (categories[key]) ? categories[key] + 1 : 1;
  }

  for (cate in categories) {
    const cateSlug = cate

    createPage({
      path: `blogs/${cate}`,
      component: categoyTemplate,
      context: {
        cateSlug
      },
    });
  }
```
`cateSlug`（カテゴリーID）はcreatePageの`context`に格納され、引数`pageContext`で取得できます。

`import { siteMetadata } from "../../gatsby-config"`であらかじめgatsby-config.jsに設定したカテゴリーのslug、name、descriptionを取得し、`cateSlug`と一致するデータのみを使用します。

![カテゴリー一覧の取得](./images/2020/12/entry408-2.png)
```javascript
import React from "react"
import PropTypes from "prop-types"

// Components
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"

const category = ({ pageContext, data, location }) => {
  const { cateSlug } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  // console.log(siteMetadata.category)
  let cateName = ''
  let cateDescription = ''
  siteMetadata.category.forEach(
    (cate) => {
      if (cate.slug === cateSlug) {
        cateDescription = cate.description;
        cateName = cate.name;
      }
    }
  )

  return (
    <Layout location={location} title={siteMetadata.title}>
      <SEO
        title={`${cateName}`}
        description={cateDescription}
      />
      <main>
        <div class="p-pageHeader">
          <div class="p-pageHeader__main">
            <h1 class="p-pageHeader__heading">{cateName}</h1>
            <p>{cateDescription}</p>
          </div>
          {`${cateSlug}.jpg`} className="p-pageHeader__img"></Image>
        </div>
        <div className="page-template-archive">
          <div className="l-container">
            {totalCount === 0 ? <p className="p-txt-center">{category.name}に関する記事はまだありません</p> : ''}
            <section className="p-section">
              <h2 className="c-heading--lg">最新記事</h2>
              <div className="c-grid">
                {edges.map(({ node }) => {
                  const { slug } = node.fields
                  const { title, hero, date, tags } = node.frontmatter
                  return (
                    <article
                      className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
                      itemScope
                      itemType="http://schema.org/Article"
                      key={slug}
                    >
                      <Link to={slug} itemProp="url" className="p-entryCard__img" >
                        {hero ?

                          <Image filename={hero} />
                          : <Image filename="common/dummy.png" />
                        }
                        <div class="p-entryCard__date">
                          {date}
                        </div>
                      </Link>
                      <Link to={slug} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{title}</h3></Link>
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}

category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default category

export const pageQuery = graphql`
  query(
    $cateSlug: String
  ) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {cateId: { eq: $cateSlug } } }
    )
    {
      totalCount
      edges {
        node {
          fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
          hero
        }
      }
    }
  }
}
`

```
## タグを追加する
この銀ねこアトリエではタグは複数設定OKなので以下のように追加します。
```markdown
---
title: Webサイトの表示速度を真剣に考える
date: 2019-06-21
hero: entry325.png
pagetype: blog
cateId: seo
tags: [表示速度,SEOコーディング]
description: 昔いた会社で、画像の圧縮、CSSなどの外部ファイルを徹底して不要ファイルを削除して圧縮してさらにワンソース化した結果、50位から20位以内に順位が改善したことがあります。今日はWebサイトの軽量化とスピードについて真剣に考えようと思います。
---
```
gatsby-node.js側のqueryにtagsを追記します。
```javascript
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
            cateId
            tags
          }
        }
      }
   }
  `
)
```
カテゴリー同様すべてのブログ記事一覧を表示させるためのblogs.jsを複製しtags.jsをテンプレートとして使用します。

カテゴリー同様、すべての記事からtagsを取得し、重複を削除してタグごとのページを表示しています。<br>
タグはたくさん増えると判断し、スラッグの管理はしないことにしました。

どのタグの記事が何件あるかは表示したかったので、カテゴリーで説明のところに表示されていた文章を以下のようにしました。

![タグの一覧の取得](./images/2020/12/entry408-3.png)

gatsby-node.js側にタグのページを生成するためのコードを追記します。

ポイントはテンプレート側クエリのフィルターが配列なので`filter: {frontmatter: {tags: { in: [$tag] } } }`となっています。

```javascript
  //タグを取得
  let tags = posts.reduce((tags, edge) => {
    const edgeTags = edge['frontmatter']['tags'];
    return edgeTags ? tags.concat(edgeTags) : tags;
  }, []);

  let counts = {};

  for (var i = 0; i < tags.length; i++) {
    let key = tags[i];
    counts[key] = (counts[key]) ? counts[key] + 1 : 1;
  }

  tags = counts

  //タグページを作成
  const tagTemplate = path.resolve(`./src/templates/tags.js`);
  for (let tag in tags) {

      createPage({
        path: `blogs/tags/${tag}`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    }
    // console.log(tag, tags[tag])
  }
```

```javascript
import React from "react"
import PropTypes from "prop-types"

// Components
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/common/tagsArchive"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  return (

    <Layout location={location} title={siteMetadata.title}>
      <SEO
        title={`${tag}に関する記事一覧`}
        description={siteMetadata.description}
      />
      <main>
        <div className="page-template-archive">
          <div class="p-pageHeader">
            <div class="p-pageHeader__main">
              <h1 class="p-pageHeader__heading">{tag}に関する記事</h1>
              <p>{totalCount}記事あります</p>
            </div>
            <img class="p-pageHeader__img" src="https://ginneko-atelier.com/packages/newginneko/themes/newginneko/assets/images/common/ganre-common.jpg" alt=""></img>
          </div>
          <div className="l-container">
            <section className="p-section">
              <h2 className="c-heading--lg">最新記事</h2>
              <div className="c-grid">
                {edges.map(({ node }) => {
                  const { slug } = node.fields
                  const { title, hero, date, tags } = node.frontmatter
                  return (
                    <article
                      className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
                      itemScope
                      itemType="http://schema.org/Article"
                      key={slug}
                    >
                      <Link to={slug} itemProp="url" className="p-entryCard__img" >
                        {hero ?
                          <Image filename={hero} />
                          : <Image filename="common/dummy.png" />
                        }
                        <div class="p-entryCard__date">
                          {date}
                        </div>
                      </Link>
                      <Link to={slug} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{title}</h3></Link>
                      <div className="p-entryCard__footer">
                        <div className="p-entryCard__footer">
                          <TagList tags={tags} />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query(
    $tag: String
  ) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: {fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
          hero
          tags
        }
      }
    }
  }
}
`
```

## まとめ
これですべてのブログ記事、カテゴリー、タグの一覧が取得できるようになったと思います！

2020年前半までのGatsby関連の記事をググると最新のテンプレートに即しているものが少なく、手探りでなんとか一覧を表示できるようなりました。

駆け出しエンジニアにはキツイと思います^ ^

まだまだコードがモダンじゃないのでテコ入れしてこの記事もブラッシュアップしアップデートします！<br>生暖かい目で見守ってください。

この記事がみなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありがとうございました！

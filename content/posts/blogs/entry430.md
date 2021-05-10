---
title: Gatsbyブログサイト移行物語9~関連記事一覧出力~
date: 2021-01-12
hero: 2020/entry401.jpg
pagetype: blog
cateId: front-end-program
tags: ["JavaScript","React","Gatsby"]
description: 今回でGatsbyカスタマイズ9記事！せっかく書いたブログ記事、たくさん読んで欲しいですよね？そこでブログ詳細での関連記事出力のコンポーネントを作ります！
lead: ["今回でGatsbyカスタマイズ9記事！せっかく書いたブログ記事、たくさん読んで欲しいですよね？そこでブログ詳細での関連記事出力のコンポーネントを作ります！"]
---
## 今までのGatsbyの記事と注意点
現在ここまで記載しています。<br>制作するまでを目標にUPしていくので順を追ったらGatsbyサイトが作れると思います。

1. [インストールからNetlifyデプロイまで](/blogs/entry401/)
2. [投稿ページの充実と画像の方法](/blogs/entry406/)
3. [ブログ記事、カテゴリー、タグ一覧の出力](/blogs/entry408/)
4. [プラグインを利用して目次出力](/blogs/entry410/)
5. [プラグインナシで一覧にページネーション実装](/blogs/entry413/)
6. [個別ページテンプレート作成](/blogs/entry416/)
7. [プラグインHelmetでSEO調整](/blogs/entry418/)
8. [CSSコンポーネントでオリジナルページを作ろう！！](/blogs/entry421/)
9. 関連記事一覧出力（←イマココ）

### このシリーズではテーマGatsby Starter Blogを改造
この記事は一番メジャーなテンプレート、「*Gatsby Starter Blog*」を改造しています。同じテーマでないと動かない可能性があります。

## StaticQueryタグを使って同じタグとカテゴリーの記事を絞り込む
類似記事を絞り込む条件です。

* タイトルがかぶっていない
* カテゴリーが一緒
* タグが一緒

上記の条件の記事をPickupしランダムで6記事程度出力します。

今回触るファイルです。relatedList.jsを追加します。

```
/プロジェクト
  ├ components/
  |  └ blogs/
  |    └ relatedList.js(追加)
  └ templates/
     └ blog-post.pug(追記)
```
### 絞り込み機能を作る
下記の条件でGraphQLをセットします。

```sql
query {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
        id
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          hero
          title
          cateId
          tags
          pagetype
        }
      }
    }
  }
}
```
取得したデータを絞り込みます。

当サイトではタグとカテゴリーの設定があり、カテゴリーは1種類、タグは複数選択可能というルールになっています。

関連記事では同じ記事を除いた、類似記事を絞り込みます。

```js
render={
  (data) => {
    let posts = data.allMarkdownRemark.edges.filter(
      (post) => {
        // タイトルは除外
        if (post.node.frontmatter.title !== title) {
          // カテゴリーの一致出力
          if (post.node.frontmatter.cateId === category) {
            return (
              post.node.frontmatter.cateId === category
            )
          }
          // タグの一致出力
          for (const tag of tags) {
            for (const item in post.node.frontmatter.tags) {
              if (tag === post.node.frontmatter.tags[item]) return true
            }
          }
        }
      }
	)/* end filter*/

	// 省略
  }
}
```

### 関連記事が存在したらランダム出力する
関連記事の条件に一致するものがなければ処理を中断し、あれば一覧をシャッフルし6記事に絞り込みます。
```js
// 一致するものがなければ処理しない
if (!posts) return

// 関連記事が取得できたらシャッフル
function shuffle(list) {
  var i = list.length;

  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    if (i === j) continue;
    var k = list[i];
    list[i] = list[j];
    list[j] = k;
  }

  return list;
}

// 関数実行
shuffle(posts)

// 6記事に絞りこむ
posts = posts.slice(0, 6);
```

<br>抽出結果を出力返します。
```js
return (
  <section class="p-section l-container is-view">
  <h2 class="c-heading--lg">関連記事もあわせてお読みください</h2>
    <div class="c-grid">
      {posts.map(item => {
          return <List item={item.node.frontmatter} url={item.node.fields.slug} />
        })
      }
    </div>
  </section>
)
```

### 結果を出力するコンポーネント作成

コンポーネントを通じて出力します。

```js
const List = ({ item, url }) => {

  const { title, date, hero } = item
  return (
    <article class="p-entryCard c-grid__item--md6 c-grid__item--lg4">
      <Link class="p-entryCard__img" to={url}>
        {hero ? <Image filename={hero} /> : <Image filename="common/dummy.png" />}
        <div class="p-entryCard__date">
          {date}
        </div>
      </Link>
      <Link to={url} class="p-entryCard__body"><h3 class="p-entryCard__heading">{title}</h3></Link>
    </article>
  )
}
```

### 関連記事を出力するコンポーネントのコードをまとめて書くと
関連記事を出力するコンポーネントrelatedList.jsファイルをcomponents/blogs/に格納します。

<small>※ Imageコンポーネントについては<a href="/blogs/entry406/">投稿ページの充実と画像設定</a>をご覧ください。</small>

```js
import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Image from "../image"

const List = ({ item, url }) => {

  const { title, date, hero } = item

  return (
    <article class="p-entryCard c-grid__item--md6 c-grid__item--lg4">
      <Link class="p-entryCard__img" to={url}>
        {hero ? <Image filename={hero} /> : <Image filename="common/dummy.png" />}
        <div class="p-entryCard__date">
          {date}
        </div>
      </Link>
      <Link to={url} class="p-entryCard__body"><h3 class="p-entryCard__heading">{title}</h3></Link>
    </article>
  )
}

export default ({ category, title, tags }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                id
                frontmatter {
                  date(formatString: "YYYY.MM.DD")
                  hero
                  title
                  cateId
                  tags
                  pagetype
                }
              }
            }
          }
        }
      `}
      render={
		(data) => {
          let posts = data.allMarkdownRemark.edges.filter(
            (post) => {
              // タイトルは除外
              if (post.node.frontmatter.title !== title) {
                // カテゴリーの一致出力
                if (post.node.frontmatter.cateId === category) {
                  return (
                    post.node.frontmatter.cateId === category
                  )
                }
                // タグの一致出力
                for (const tag of tags) {
                  for (const item in post.node.frontmatter.tags) {
                    if (tag === post.node.frontmatter.tags[item]) return true
                  }
                }
              }
            }
          )
          if (!posts) return

          function shuffle(list) {
            var i = list.length;

            while (--i) {
              var j = Math.floor(Math.random() * (i + 1));
              if (i === j) continue;
              var k = list[i];
              list[i] = list[j];
              list[j] = k;
            }

            return list;
          }

          shuffle(posts)

          posts = posts.slice(0, 6);

          return (
            <section class="p-section l-container is-view"><h2 class="c-heading--lg">関連記事もあわせてお読みください</h2>
              <div class="c-grid">
                {
				  posts.map( item => {
                    return <List item={item.node.frontmatter} url={item.node.fields.slug} />
                  })
                }
              </div>
            </section>
          )
        }
      }
    />
  )
}
```

## ブログ詳細に関連記事を出力
コンポーネントを呼び出します。

```js
// ~省略~
import RelatedList from "../components/blogs/relatedList"

const BlogPostTemplate = ({ data, location }) => {
  // ~省略~

  return (
    // ~省略~
	<Layout location={location} title={siteTitle}>

      {/*~省略~*/}

      <RelatedList category={post.frontmatter.cateId} title={post.frontmatter.title} tags={post.frontmatter.tags}></RelatedList>

      {/*~省略~*/}

    </Layout>
  )
}

export default BlogPostTemplate

// ~省略~
```

<br>これで関連記事び一覧が出力できるようになりました！わーい。

読みこむたびに、ランダム表示されます。

![関連記事一覧の出力](./images/2021/01/entry430-1.jpg)

## まとめ・関連記事一覧を実装するとユーザーも嬉しい
記事詳細読了後、関連記事が表示されることで回遊率はグンと上がります。

実はリニューアル前も関連記事機能あったんですがロジックが甘くてほぼ機能していませんでした。

現在はGatsbyに切り替えてしっかり作り込んだおかげで、適切な関連記事が表示されるようになりました。

Googleアナリティクスで見ても、記事の検索機能もつけたせいかもしれませんが、*平均ページ/セッション数が1.2ページからから1.83*になり、150%伸びました。嬉しい限り。

ぜひ、Gatsbyで興味ある方は関連記事の実装チャレンジしてください。

次回以前ちょっとツイッターで話題にしてもらった404ページの作り方をアイデアも含めて記事にします。

最後までお読みいただきありがとうございました。

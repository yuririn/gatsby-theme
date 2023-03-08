import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { Favorite } from '../../styles/main/favorite'

import Img from "../common/img"

const favoritesList = {
  web: {
    title: "Web制作に関する人気の記事",
    items: ["393", "336", "448", "504", "514"],
  },
  life: {
    title: "海外ノマド・ライフスタイルに関する人気の記事",
    items: ["473", "420", "505", "464", "512"],
  },
  career: {
    title: "お役立ちツールに関するおすすめ記事",
    items: ["460", "501", "456", "474", "500"],
  },
}

const List = ({ item, url, key }) => {
  const { title, hero } = item
  return (
    <li
      key={key}
      className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
      rol="article"
    >

        <Link className="p-entryCard__img" to={url}>
          <Img source={hero} title={title} />
        </Link>
        <Link to={url} className="p-entryCard__body">
          <h3 className="p-entryCard__heading">{title}</h3>
        </Link>
    </li>
  )
}

const Faves = ({ type }) => {
  const { allMdx} = useStaticQuery(
    graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              id
              frontmatter {
                cateId
                hero
                date(formatString: "YYYY.MM.DD")
                title
                tags
                pagetype
              }
            }
          }
        }
      }
    `
  )
  const { title, items } = favoritesList[type]
  let posts = []

  for (const item of items) {
    if (item) {
      const post = allMdx.edges.filter(post => {
        return post.node.fields.slug === `/blogs/entry${item}/`
      })
      // 配列を結合
      posts = [...posts, ...post]
    }
  }

  return (
    <section className="p-section">
     <h2 className="c-heading--lg">{title}</h2>
     <Favorite>
        <ol className="c-grid add-numbering">
          {posts.map(item => {
            return (
              <List
                item={item.node.frontmatter}
                url={item.node.fields.slug}
                key={item.node.fields.slug}
              />
            )
          })}
        </ol>
        </Favorite>

    </section>
  )
}
export default Faves


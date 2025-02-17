import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import styled from "styled-components"

import Img from "../img"

const favoritesList = {
  web: {
    title: "Web制作に関する人気の記事",
    items: ["393", "336", "507", "448", "181"],
  },
  life: {
    title: "海外ノマド・ライフスタイルに関する人気の記事",
    items: ["521", "441", "420", "473", "512"],
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
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
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
                pageType
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
      const post = allMarkdownRemark.edges.filter(post => {
        return post.node.fields.slug === `entry${item}`
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
                url={`/blogs/${item.node.fields.slug}`}
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

const Favorite = styled.div`
  ol {
    counter-reset: num;
  }
  @media screen and (min-width: 768px) {
    .add-numbering {
      justify-content: center;
    }
  }
  li {
    counter-increment: num;
    position: relative;
    &:before {
      color: #fff;
      position: absolute;
      z-index: 1;
      content: counter(num);
      width: 35px;
      height: 35px;
      font-size: 2.2rem;
      top: -8px;
      left: -8px;
      line-height: 1.2;
      text-indent: 6px;
      background: #001d7c;
      border-radius: 50%;
      font-weight: 700;
      border: 3px double #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    }
    &::after {
      color: #fff;
      position: absolute;
      z-index: 1;
      content: "位";
      font-size: 1.2rem;
      top: 5px;
      left: 15px;
      font-weight: 700;
    }
    &:first-child::before {
      background: #9a8904;
      transform: scale(1.3);
    }
    &:nth-child(2)::before {
      background: #656565;
      transform: scale(1.1);
    }
    &:nth-child(3)::before {
      background: #674822;
      transform: scale(1.1);
    }
  }
`

import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Image from "../image"
import styled from "styled-components"

const favoritesList = {
  web: {
    title: "Web制作に関する人気の記事",
    items: ["448", "181", "393", "336", "370"],
  },
  life: {
    title: "海外ノマド・ライフスタイルに関する人気の記事",
    items: ["420", "278", "467", "464", "441"],
  },
  career: {
    title: "キャリアアップ・転職に関する人気の記事",
    items: ["460", "369", "461", "409", "425"],
  },
}

const List = ({ item, url }) => {
  const { title, date, hero } = item
  return (
    <article className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small">
      <Link className="p-entryCard__img" to={url}>
        {hero ? (
          <Image filename={hero} />
        ) : (
          <Image filename="common/dummy.png" />
        )}
      </Link>
      <Link to={url} className="p-entryCard__body">
        <h3 className="p-entryCard__heading">{title}</h3>
      </Link>
    </article>
  )
}

export default ({ type }) => {
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
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { title, items } = favoritesList[type]
        let posts = []

        for (const item of items) {
          if (item) {
            const post = data.allMarkdownRemark.edges.filter(post => {
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
              <div className="c-grid add-numbering">
                {posts.map(item => {
                  return (
                    <List
                      item={item.node.frontmatter}
                      url={item.node.fields.slug}
                      key={item.node.fields.slug}
                    />
                  )
                })}
              </div>
            </Favorite>
          </section>
        )
      }}
    />
  )
}

const Favorite = styled.div`
  counter-reset: num;

  @media screen and (min-width: 768px) {
    .add-numbering {
      justify-content: center;
    }
  }

  article {
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
    &:nth-child(2):before {
      background: #656565;
      transform: scale(1.1);
    }
    &:nth-child(3):before {
      background: #674822;
      transform: scale(1.1);
    }
  }
`

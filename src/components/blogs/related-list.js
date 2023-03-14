import React, { useMemo } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "../smImg"
import styled from "styled-components"
import Ad from '../common/ad'

const Lists = ({ category, slug, tags }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { pagetype: { eq: "blog" } } }
        ) {
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
  let posts = allMarkdownRemark.edges.filter(post => {
    if (post.node.fields.slug !== slug) {
      // カテゴリーの一致出力
      if (post.node.frontmatter.cate === category) return true
      // タグの一致出力
      for (const tag of tags) {
        if (post.node.frontmatter.tags.includes(tag)) return true
      }
    }
    return false
  })

  const result = useMemo(() => {
    if (!posts) return;
    if (posts.length > 5) {
      shuffle(posts);
    }
    return posts.slice(0, 6)
  }, []);

  function shuffle(list) {
    var i = list.length

    while (--i) {
      var j = Math.floor(Math.random() * (i + 1))
      if (i === j) continue
      var k = list[i]
      list[i] = list[j]
      list[j] = k
    }
    return list
  }
  return (
    <RelativeList>
      <h2 className="c-heading--lg--side">関連記事</h2>
      <ol>
        {result.map((item, index) => {
          return (
            <li className="p-entryCard is-small" key={`relative${index}`} role="article">
              <Link to={item.node.fields.slug} className="p-entryCard__img">
              {item.node.frontmatter.hero ? (
                <Img
                    source={item.node.frontmatter.hero}
                    alt={item.node.frontmatter.title}
                  />
                ) : (
                  <Img
                    source="common/dummy.png"
                    alt={item.node.frontmatter.title}
                  />
                )}
              </Link>
                  <Link to={item.node.fields.slug} className="p-entryCard__body">
                <h3 className="p-entryCard__heading">
                  {item.node.frontmatter.title}
                </h3>
              </Link>
            </li>
          )
        })}
      </ol>
    </RelativeList>
  )
}
export default Lists


const RelativeList = styled.div`
  @media screen and (min-width: 768px) {
    .p-entryCard:hover .gatsby- Img-wrapper {
      transform: none;
      opacity: 0.8;
    }
    .p-entryCard.is-small {
      margin-left: 0;
      margin-right: 0;
      position: relative;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 10px;
      padding-bottom: 10px;
        flex-wrap: wrap;
        display: flex;
        align-items: flex-start;
      .p-entryCard__img {
        width: 30%;
        border-radius: 5px;
        margin-bottom: 0;
      }
      .p-entryCard__body {
        width: 70%;
        box-sizing: border-box;
        padding-left: 10px;
        .p-entryCard__heading {
          font-size: 1.4rem;
        }
      }
    }
  }
`

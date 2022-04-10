import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Tags = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  )
  // タイトルとカテゴリーとタグが記事と一致した時だけ抽出
  let tags = allMarkdownRemark.edges.reduce((tags, edge) => {
    const edgeTags = edge.node.frontmatter.tags
    return edgeTags ? tags.concat(edgeTags) : tags
  }, [])

  let counts = {}

  for (var i = 0; i < tags.length; i++) {
    let key = tags[i]
    counts[key] = counts[key] ? counts[key] + 1 : 1
  }
  tags = []
  for (let tag in counts) {
    tags.push({ name: tag, count: counts[tag] })
  }

  if (!tags) return

  return (
    <TagList>
      <ul>
        {tags.map((tag, index) => {
          return (
            <li className="p-tagList__item" key={`list${index}`}>
              <Link to={`/blogs/tags/${tag.name}/`}>
                {tag.name}（{tag.count}）
              </Link>
            </li>
          )
        })}
      </ul>
    </TagList>
  )
}
export default Tags

const TagList = styled.div`
  ul {
    list-style: none;
  }
  .p-tagList__item {
    margin-right: 5px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .p-tagList__item a {
    text-decoration: none;
    font-size: 1.1rem;
    line-height: 1;
    padding: 3px 3px 5px 3px;
    color: var(--color-blue);
    display: block;
    border-radius: 4px;
    border: 1px solid var(--color-blue);
    background: var(--background);
    transition: 0.3s;
    white-space: nowrap;
    &:before {
      content: "";
      width: 1em;
      height: 1em;
      vertical-align: -0.2em;
      display: inline-block;
      margin-right: 3px;
      border-radius: 50%;
      background: var(--background);
      border: 2px solid var(--color-blue);
      transform: scale(0.5);
    }
  }
`

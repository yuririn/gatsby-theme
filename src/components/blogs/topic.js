import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const Toc = (data) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents(maxDepth: 3)
            }
          }
        }
      }
    `
  )

  // const edges = queryResult?.allMarkdownRemark?.edges
  // if (!edges) return null

  // // 【重要】比較用のスラッグを掃除する関数
  // // 前後のスラッシュをすべて取り除き、純粋な文字列だけで比較する
  // const cleanString = (str) => {
  //   if (!str) return ""
  //   return str.replace(/^\/+|\/+$/g, "")
  // }

  // const targetId = cleanString(data.id)

  // // 記事データを探す
  // const tocElement = edges.find(item => {
  //   const currentSlug = cleanString(item?.node?.fields?.slug)
  //   return currentSlug === targetId
  // })

  // // 見つからない、あるいは見出しがない場合は何も出さない
  // if (!tocElement || !tocElement.node || !tocElement.node.tableOfContents) {
  //   return null
  // }

  // // <p>タグを除去
  // const cleanToc = tocElement.node.tableOfContents.replace(/(<p>|<\/p>)/gi, "")

  return (
    <Mokuji>
      {/* <input type="checkbox" className="mokuji" id="mokuji" />
      <label className="c-content__heading" htmlFor="mokuji">
        目次
      </label>
      <div
        className="list"
        dangerouslySetInnerHTML={{ __html: cleanToc }}
      ></div> */}
    </Mokuji>
  )
}

export default Toc

const Mokuji = styled.div`
  /* スタイルは以前のものと同じでOK */
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  margin: 24px 0 50px;
  .list { font-size: 1.4rem; }
  .mokuji { display: none; }
  .c-content__heading { 
    cursor: pointer;
    font-weight: bold;
    display: block;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
`

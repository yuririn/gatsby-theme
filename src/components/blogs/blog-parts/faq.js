import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const RelativeCard = data => {
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
                faq
              }
            }
          }
        }
      }
    `
  )

  let article = allMarkdownRemark.edges.filter(
    item => item.node.fields.slug === data.id
  )
  if (article.length !== 0) {
    const faq = article[0].node.frontmatter.faq
    return (
      <>{faq && faq.map((item, index) => {
        return (
          <dl className="p-faq__item" key={`faq${index}`}>
            <dt>{item[0]}</dt>
            <dd>{item[1]}</dd>
          </dl>
        )
      })}
      </>
    )
  }
}
export default RelativeCard

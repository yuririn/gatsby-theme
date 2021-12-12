import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "../../img"

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
                description
                hero
                date(formatString: "YYYY.MM.DD")
                title
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
    article = article[0].node
    const description =
      article.frontmatter.description.length > 60
        ? article.frontmatter.description.substr(0, 60) + "..."
        : article.frontmatter.description
    return (
      <a href={article.fields.slug} className="article-link">
        <section>
          <div className="article-link__img">
            <Img
              source={article.frontmatter.hero}
              alt={article.frontmatter.title}
            />
          </div>
          <div className="article-link__main">
            <div class="article-link__main__title">
              {article.frontmatter.title}
            </div>
            <p className="description">{description}</p>
            <time date={article.frontmatter.date.replace(/\./g, "-")}>
              {article.frontmatter.date}
            </time>
          </div>
        </section>
      </a>
    )
  } else {
    return ""
  }
}
export default RelativeCard

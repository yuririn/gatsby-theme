import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "../../common/img"
import dateReplace from "../../../utils/datereplace"
const RelativeCard = data => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { pageType: { eq: "blog" } } }
        ) {
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
                modifiedDate(formatString: "YYYY.MM.DD")
                title
              }
            }
          }
        }
      }
    `
  )
  let article = allMarkdownRemark.edges.filter(
      item =>  item.node.fields.slug === data.slug
    )
  if (article.length !== 0) {
    article = article[0].node
    const description =
      article.frontmatter.description.length > 60
        ? article.frontmatter.description.substr(0, 60) + "..."
        : article.frontmatter.description
      const date = article.frontmatter.modifiedDate ? article.frontmatter.modifiedDate : article.frontmatter.date
    return (
      <a href={`/blogs/${article.fields.slug}/${data.anchor ? '#' + encodeURI(data.anchor) : ''}`} className="c-related-post-card">
        <section>
          <div className="c-related-post-card__img">
            <Img
              source={article.frontmatter.hero}
              alt={article.frontmatter.title}
            />
          </div>
          <div className="c-related-post-card__main">
            <p className="c-related-post-card__main__title">
              {article.frontmatter.title}
            </p>
            <time dateTime={dateReplace(date)}>
              {date}
            </time>
            <p className="c-related-post-card__description">{description}</p>
          </div>
        </section>
      </a>
    )
  } else {
    return ""
  }
}
export default RelativeCard

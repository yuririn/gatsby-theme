import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "../../common/img"

const RelativeCard = ({slug}) => {
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
                modifieddate(formatString: "YYYY.MM.DD")
                title
              }
            }
          }
        }
      }
    `
    )
    let article = allMarkdownRemark.edges.filter(
        item => item.node.fields.slug === slug
    )

    if (article.length !== 0) {
        article = article[0].node
        const description =
            article.frontmatter.description.length > 60
                ? article.frontmatter.description.substr(0, 60) + "..."
                : article.frontmatter.description
        const date = article.frontmatter.modifieddate ? article.frontmatter.modifieddate : article.frontmatter.date
        return (
            <a href={`/blogs/${slug}/`} className="c-article-card">
                <section>
                    <div className="c-article-card__img">
                        <Img
                            source={article.frontmatter.hero}
                            alt={article.frontmatter.title}
                        />
                    </div>
                    <div className="c-article-card__main">
                        <p className="c-article-card__main__title">
                            {article.frontmatter.title}
                        </p>
                        <p className="c-article-card__description">{description}</p>
                        <time dateTime={date.replace(/\./g, "-")}>
                            {date}
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

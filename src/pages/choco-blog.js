import * as React from "react"
import { Link, graphql } from "gatsby"
import ChocoLayout from "../components/choco-layout"
import Img from "../components/common/img";
import {siteMetadata} from "../../gatsby-config"
import Ad from "../components/common/ad";
import Seo from "../components/seo"

const ChocoIndex = ({ data, location }) => {


  const posts = data.allMdx.nodes

  return (
    <ChocoLayout location={location}>
      <section className="l-main">
        <h2 className="c-heading--lg">最新の記事</h2>
        {posts.length !== 0 && (
          <ul className="c-choco-list">
          {posts.map((post, i) =>{
            return (
              <li key={`post${i}`} role="article" >
                <Link to={post.fields.slug}>
                <Img
                  source={post.frontmatter.hero}
                  alt={post.frontmatter.title}
                  key={post.frontmatter.title}
                />
                <h3 className="c-choco-list__heading">
                  {post.frontmatter.title}
                </h3>
                </Link>
              </li>
            )
          })}

          </ul>
        )
        }
        <Ad location={location.pathname}></Ad>
      </section>
    </ChocoLayout>
  )

}
export default ChocoIndex

export const Head = ({ location }) => {
 return (
 <Seo
  data={{location: location}}
 />)
}

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMdx(
    sort: {frontmatter: {date: DESC}}
    limit: 10
    filter: {frontmatter: {pagetype: {eq: "ad"}}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        description
        title
        tags
        cateId
        hero
        pagetype
      }
    }
  }
}`

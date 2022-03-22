import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Edit } from "./../styles/blog-styles/edit"
import BreadCrumbList from "../components/common/bread-crumb-list"

const PagePostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { title } = data.site.siteMetadata
  const siteTitle = `${post.frontmatter.title} | ${title}`
  const ogp = data.allFile.edges[0]
    ? data.allFile.edges[0].node.publicURL
    : "images/ogp.png"
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        ogp={ogp}
        location={location}
        date={post.frontmatter.date}
        modifieddate={post.frontmatter.modifieddate}
        type="article"
      />
      <div className="l-main_contents is-page">
        <div className="l-container--md mt-Md">
          <BreadCrumbList current={post.frontmatter.title} />
        </div>
        <article className="l-container--md">
          <header>
            <div>
              <h1 className="c-article__heading">{post.frontmatter.title}</h1>
            </div>
          </header>
          <Edit>
            <section
              className="c-editArea"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Edit>
        </article>
      </div>
    </Layout>
  )
}
export default PagePostTemplate

export const pageQuery = graphql`
  query PagePostBySlug($id: String!, $hero: String) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: $hero }
      }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        hero
        pagetype
      }
    }
  }
`

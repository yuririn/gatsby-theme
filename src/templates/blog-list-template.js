import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SideBar from "../components/SideBar"
import InfiniteScrollComponent from "../components/posts/InfiniteScrollComponent";


const BlogList = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
        <header className={`c-page-header`} id="keyvisual">
            <h1>セブ島ノマドブログ</h1>
              <p>現在{data.allMarkdownRemark.totalCount} 記事あります</p>
        </header>
        
      <div className="l-section">
        <div className="l-container--blog__main">
            

            <InfiniteScrollComponent />
        </div>
        <SideBar></SideBar>
      </div>
    </Layout>
  )
}

export default BlogList

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="セブ島エンジニアのノマドブログ" />

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }

  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    limit: 12
    filter: {frontmatter: {pageType: {eq: "blog"}}}
  ) {
    totalCount
    nodes {
      excerpt
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
        pageType
      }
    }
  }
}`

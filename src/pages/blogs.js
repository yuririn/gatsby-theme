import * as React from "react"
import { graphql } from "gatsby"
import Search from "../components/search"
import Layout from "../components/layout"
import Seo from "../components/seo"
import InfiniteScrollComponent from "../components/posts/InfiniteScrollComponent";
import BreadCrumbList from "../components/common/BreadcrumbList";
import { siteMetadata } from "../../gatsby-config"

const BlogList = ({ data, location }) => {
    const title = siteMetadata.blogName ? siteMetadata.blogName : `海外ノマドエンジニアブログ`

    const breadCrumbList = {
        current: title
    }
    
    const headerClass = 'c-page-header';
    const posts = data.allMarkdownRemark.nodes;

  return (
      <Layout location={location} title={title}>
          <header className={headerClass} id="keyvisual">
              <h1>{title}</h1>
              <p>現在  {posts.length} 記事あります</p>
              <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
        </header>
        
        <div className="l-section l-container-archive">

            <InfiniteScrollComponent posts={posts}/>
            <div className="l-container-archive__sticky-area">
                <Search></Search>
            </div>
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
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {pageType: {eq: "blog"}}}
  ) {
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

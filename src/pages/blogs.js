import * as React from "react"
import { graphql } from "gatsby"
import Search from "./../components/search"
import Layout from "./../components/layout"
import Seo from "./../components/seo/seo"
import InfiniteScrollComponent from "./../components/posts/infinite-scroll-component";
import BreadCrumbList from "./../components/common/breadcrumblist";
import { siteMetadata } from "./../../gatsby-config"

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
              <div>
                  <h1>{title}</h1>
                  <p>現在  {posts.length} 記事あります</p>
              </div>
              <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
        </header>
        
        <div className="l-section l-container-archive">

              <InfiniteScrollComponent posts={posts} location={location} />
            <div className="l-container-archive__sticky-area">
                  <Search location={location}></Search>
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
export const Head = ({ location }) => {
    const list = [
        {
            name: siteMetadata.blogName,
            path: '/blogs/',
            type: `WebPage`
        }
    ]
    return <Seo
        location={location}
        data={{
            template: 'archive',
            title: siteMetadata.blogName,
            description: `${siteMetadata.blogDescription}`,
            list: list
        }}
    />
}

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

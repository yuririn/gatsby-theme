import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "./../components/layout"
import Seo from "./../components/seo/seo"
import FirstView from "./../components/first-view"
// import Img from "./../components/common/img"
import Post from './../components/posts/Post';
import SideBar from "./../components/sidebar"
import PickUpList from "./../components/posts/pickup-list"
import Ads from "./../components/common/ads"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
          <FirstView></FirstView>
      <div className="l-section l-container--blog">
        <div className="l-container--blog__main">
            <header className="c-heading--lg"><h2>Pick up</h2><p>おすすめ記事</p></header>
            <PickUpList></PickUpList>
                  <Ads location={location.pathname}></Ads>
            <header className="c-heading--lg"><h2>Latest</h2><p>新着記事</p></header>
            <ul className="l-card-container">{
                posts.map((post, key) => {
                    return  <Post post={post} key={key}></Post>
                    }
                )}
            </ul>
            <p className="u-center"><a href="/blogs/" className="c-btn--detail">もっとブログを読む</a></p>
                  <Ads location={location.pathname}></Ads>
        </div>
              <SideBar location={location}></SideBar>
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ data, location }) => (
    <Seo
        location={location}
        data={
            { template: 'index' }
        }
    />
)

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

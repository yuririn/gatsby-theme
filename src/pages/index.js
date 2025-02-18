import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

import Layout from "../components/layout"
import FirstView from "../components/top-first-view"
import Post from "../components/posts/posts"
import PickUpPosts from "../components/pickup-posts"
import SideBar from "../components/sidebar"

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes

    return (
        <Layout location={location} title={siteTitle}>
            <FirstView></FirstView>
            <div className="l-section l-container--blog">
                <div className="l-container--blog__main">
                    <header className="p-heading--lg"><h2>Pick up</h2><p>おすすめ記事</p></header>
                    <PickUpPosts></PickUpPosts>
                    {/* <Ad location={location}></Ad> */}
                    <header className="p-heading--lg"><h2>Latest</h2><p>新着記事</p></header>
                    <ul className="l-card-container">{
                        posts.map((post, key) => {
                            return <Post post={post} key={key}></Post>
                        }
                        )}
                    </ul>
                    <p className="u-center"><a href="/blogs/" className="c-btn--detail">もっとブログを読む</a></p>
                    {/* <Ad location={location}></Ad> */}
                </div>
                <SideBar location={location}></SideBar>
            </div>
        </Layout>
    )
}

export default BlogIndex

export const Head = ({ data, location }) => (
    <Seo
        location={location.pathname}
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
    limit:12
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


import * as React from "react"
import { graphql } from "gatsby"
import Search from "../components/search"
import Layout from "../components/layout"
import Seo from "../components/seo"
import InfiniteScrollComponent from "../components/posts/InfiniteScrollComponent";
import Post from "../components/posts/Post"
import { siteMetadata } from "../../gatsby-config"


const TagList = ({ data, location, pageContext }) => {
    const { title, totalCount, slug } = pageContext
    const blogName = siteMetadata.blogName
    const posts = data.allMarkdownRemark.nodes

    return (
        <Layout location={location} title={title}>
            <header className="c-page-header" id="keyvisual">
                <h1><span>{blogName}</span>{title}</h1>
                <p>現在 {totalCount} 記事あります</p>
            </header>
            <div className="l-section l-container-archive">
                <InfiniteScrollComponent posts={posts} />
                <div className="l-container-archive__sticky-area">
                    <Search></Search>
                </div>
            </div>
        </Layout>
    )
}

export default TagList

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="セブ島エンジニアのノマドブログ" />

export const query = graphql`
  query TagListBySlug(
    $slug: [String]
  ) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {pageType: {eq: "blog"}, tags: {in: $slug}}}
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          tags
          cateId
          hero
        }
      }
    }
  }
`;

import * as React from "react"
import { graphql } from "gatsby"
import Search from "../components/search"
import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import InfiniteScrollComponent from "../components/posts/InfiniteScrollComponent";
import BreadCrumbList from "../components/common/BreadcrumbList"
import { siteMetadata } from "../../gatsby-config"

const TagList = ({ data, location, pageContext }) => {
    const { title, totalCount } = pageContext
    const blogName = siteMetadata.blogName
    const posts = data.allMarkdownRemark.nodes
    const breadCrumbList = {
        parents: [
            { path: '/blogs/', name: blogName },
        ],
        current: title
    }

    return (
        <Layout location={location} title={title}>
            <header className="c-page-header" id="keyvisual">
               <div>
                    <h1><span>{title}</span>{blogName}</h1>
                    <p>現在 {totalCount} 記事あります</p>
               </div>
                <BreadCrumbList list={breadCrumbList} ></BreadCrumbList>
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
export const Head = ({ location, pageContext }) => {
    const { title } = pageContext
    const blogName = siteMetadata.blogName
    const blogDescription = siteMetadata.blogDescription
    const list = [
            {
                name: siteMetadata.blogName,
                path: '/blogs/',
                type: `WebPage`
            },
            {
                name: title,
                path: `/blogs/tags/${title}`,
                type: `WebPage`
            }
        ]
    return <Seo
        location={location}
        data={{
            title: `${title} ${blogName}`,
            template: 'archive',
            description: `${title} に関する記事。${blogDescription}`,
            list: list,
        }}
    />
}

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

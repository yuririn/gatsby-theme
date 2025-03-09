import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/common/bread-crumb-list"
import InfiniteScrollComponent from "../components/common/infinite-scroll"
import "../scss/objects/components/_page-header.scss"
import { siteMetadata } from "./../../gatsby-config"


const tags = ({ data, location, pageContext }) => {
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
      <header className={`c-page-header--common`} id="keyvisual">
        <div>
          <h1><span>{blogName}</span>{title}</h1>
          <p>現在 {totalCount} 記事あります</p>
        </div>
        <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
      </header>
      <div className="l-section l-container-archive">
        <InfiniteScrollComponent posts={posts} />
      </div>
    </Layout>
  );
}

export default tags

export const Head = ({ location, pageContext }) => {
  const { title, totalCount } = pageContext
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
        location={location?.pathname.replace(/page\/([0-9])+\//, "")}
        data={{
            title: `${title} ${blogName}`,
            template: 'archive',
            description: `${title} に関する記事。${blogDescription}`,
            list: list,
            headerType: 'common'
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

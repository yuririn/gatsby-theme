import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import AdLayout from "../components/ad-layout"
import Img from "../components/img";
import Seo from "../components/seo"
import AdSidebar from "../components/blogs/ad-sidebar";
import BreadCrumbList from "../components/common/bread-crumb-list"
import {Body} from "../styles/ad/body"


const tags = ({ pageContext, data, location }) => {
  const { current, page, tag } = pageContext

  const posts = data.allMarkdownRemark.nodes
  return (
    <AdLayout location={location} title=''>
      <Body>
        <BreadCrumbList type="ad-tag" current={tag}/>
        <h2>{tag}に関する記事</h2>
        {posts.length !== 0 && (
          <ul>
            { posts.map((post, i) => {
          return (
            <li key={`post${i}`} role="article">
              <Link to={post.fields.slug}>
              <Img
                source={post.frontmatter.hero}
                alt={post.frontmatter.title}
                key={post.frontmatter.title}
              />
              <h3>
                {post.frontmatter.title}
              </h3>
              </Link>
            </li>
          )
         })}
          </ul>
         )}
      </Body>
      <AdSidebar></AdSidebar>
    </AdLayout>
  );
}

export default tags

export const Head = ({ pageContext, location  }) => {
  const { current, page, tag } = pageContext
  const yourData ={
    title : tag,
    location : location,
    type : "ad-list",
  }

  return (
     <Seo
        data={yourData}
      />
  )
}

export const pageQuery = graphql`query tagsQyery($limit: Int!, $skip: Int!, $tag: [String]) {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark(
    limit: $limit
    skip: $skip
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {pagetype: {eq: "ad"}, tags: {in: $tag}}}
  ) {
    totalCount
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        cateId
        hero
        tags
      }
    }
  }
}`

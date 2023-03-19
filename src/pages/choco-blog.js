import * as React from "react"
import { Link, graphql } from "gatsby"
// import styled from "styled-components"
import AdLayout from "../components/ad-layout"
import Img from "../components/img";
import AdSidebar from "../components/blogs/ad-sidebar";
import {siteMetadata} from "../../gatsby-config"
import Seo from "../components/seo"
import {Body} from "../styles/ad/body"
import Ad from "../components/common/ad";

const AdIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes
  return (
    <AdLayout location={location} title={siteMetadata.ad.title}>
      <Body>
          <h2>最新の記事</h2>
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
         <Ad location={location.pathname}></Ad>
      </Body>
      <AdSidebar location={location.pathname}></AdSidebar>
    </AdLayout>
  )
}
export default AdIndex

export const Head = ({ data, location }) => {
  const yourData = {
    title : siteMetadata.ad.title,
    description : siteMetadata.ad.description,
    location : location,
  }
  return (
  <Seo
    data={yourData}
  />
)}

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    limit: 10
    filter: {frontmatter: {pagetype: {eq: "ad"}}}
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
        pagetype
      }
    }
  }
}`


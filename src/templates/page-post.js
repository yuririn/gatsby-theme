import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Edit } from "./../styles/blog-styles/edit"
import BreadCrumbList from "../components/common/bread-crumb-list"
import {siteMetadata} from "../../gatsby-config"

const PagePostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { title } = siteMetadata
  const siteTitle = `${post.frontmatter.title} | ${title}`
  return (
    <Layout location={location} title={siteTitle}>
      <div className="l-main_contents is-page">
        <div className="l-container--md mt-Md">
          <BreadCrumbList current={post.frontmatter.title} />
        </div>
        <article className="l-container--md">
          <header>
            <div>
              <h1 className="c-article__heading">{post.frontmatter.title}</h1>
            </div>
          </header>
          <Edit>
            <section
              className="c-editArea"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Edit>
        </article>
      </div>
    </Layout>

  )
}
export default PagePostTemplate


export const Head = ({ data, location }) => {
  const post = data.markdownRemark
  const ogpSrc = data.siteOgImage
    ? `${data.siteOgImage.childImageSharp.resize.src}`
    : "/images/ogp.png"
  const thumnailSrc = data.siteThumnailImage
    ? `${data.siteThumnailImage.childImageSharp.resize.src}`
    : "/images/thumnail.png"
  const yourData ={
    title : post.frontmatter.title,
    description : post.frontmatter.description || post.excerpt,
    ogp : ogpSrc,
    location : location,
    thumnail: thumnailSrc,
    date : post.frontmatter.date,
    modifieddate : post.frontmatter.modifieddate,
    type : "article"
  }

  return (
     <Seo
        data={yourData}
      />
  )
}

export const pageQuery = graphql`
  query PagePostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      htmlAst
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        hero
        tags
      }
    }
  }
`

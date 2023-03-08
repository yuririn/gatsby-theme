import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Edit } from "./../styles/blog-styles/edit"
import BreadCrumbList from "../components/common/bread-crumb-list"
import {siteMetadata} from "../../gatsby-config"
import { MDXProvider } from "@mdx-js/react"

const PagePostTemplate = ({ data, location, children }) => {
  const post = data.mdx.frontmatter
  const { title } = siteMetadata
  const siteTitle = `${post.title} | ${title}`
  return (
    <Layout location={location} title={siteTitle}>
      <div className="l-main_contents is-page">
        <BreadCrumbList current={post.title} />
        <article className="l-container--md">
          <header>
            <div>
              <h1 className="c-article__heading">{post.title}</h1>
            </div>
          </header>
          <Edit><MDXProvider>{children}</MDXProvider>
          </Edit>
        </article>
      </div>
    </Layout>

  )
}
export default PagePostTemplate


export const Head = ({ data, location }) => {
  const post = data.mdx
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
    type : "page"
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
    mdx(id: { eq: $id }) {
      id
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        modifieddate(formatString: "YYYY.MM.DD")
        description
        hero
        cateId
        tags
        faq
      }
    }
  }
`

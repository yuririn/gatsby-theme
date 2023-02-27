import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Edit } from "./../styles/blog-styles/edit"
import BreadCrumbList from "../components/common/bread-crumb-list"
import Ad from './ad-post'
import {siteMetadata} from "../../gatsby-config"

const PagePostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  return (
    <>
    {
      post.frontmatter.pagetype === 'ad' ?(
        <Ad location={location} data={data}/>
        ):(
        <Page location={location} data={data}/>
      )
    }
    </>
  )
}
export default PagePostTemplate

const Page = ({ data, location }) => {
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
    type : post.frontmatter.pagetype === 'ad' ? 'ad':"article"
  }

  return (
     <Seo
        data={yourData}
      />
  )
}

export const pageQuery = graphql`
  query PagePostBySlug($id: String!, $hero: String) {
    site {
      siteMetadata {
        title
      }
    }
   siteOgImage: file(
      relativePath: { eq: $hero }
      sourceInstanceName: { eq: "images" }
      ) {
      childImageSharp {
        resize(width: 1200, height:900, toFormat: PNG) {
          src
        }
      }
    }
    dogImage: file(
      relativePath: { eq: $hero }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        gatsbyImageData (
          blurredOptions: { width: 100 }
          width: 640
          quality: 40
          placeholder: BLURRED
        )
      }
    }
    siteThumnailImage: file(
      relativePath: { eq: $hero }
      sourceInstanceName: { eq: "images" }
      ) {
      childImageSharp {
        resize(width: 200, height: 200, toFormat: PNG) {
          src
        }
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
        pagetype
      }
    }
  }
`

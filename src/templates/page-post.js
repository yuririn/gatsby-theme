import React from "react"
import { graphql } from "gatsby"

import Layout from "./../components/layout"
import Seo from "./../components/seo/seo"
import { siteMetadata } from "./../../gatsby-config"
import SideBar from "./../components/sidebar"
import BreadCrumbList from "./../components/common/breadcrumblist"

const PagePostTemplate = ({ data, location }) => {
    const post = data.markdownRemark
    const { title } = siteMetadata
    const siteTitle = `${post.frontmatter.title} | ${title}`
    const breadCrumbList = {
        current: post.frontmatter.title
    }
    return (
        <Layout location={location} title={siteTitle}>
            <div className="l-main_contents is-page">
                <header className="c-page-header" id="keyvisual">
                    <h1>{post.frontmatter.title}</h1>
                    <BreadCrumbList list={breadCrumbList} ></BreadCrumbList>
                </header>
                <div className="l-section l-container--page">
                    
                    <section
                    itemProp="articleBody" className="c-post-body"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                    <SideBar location={location}></SideBar>
                </div>
            </div>
        </Layout>

    )
}
export default PagePostTemplate


export const Head = ({ data, location }) => {
    const { title, date, description, modifieddate, noindex} = data.markdownRemark.frontmatter
    const list = [
            {
            name: title,
            path: location.pathname,
            type: `WebPage`
        }
    ]

    const pageData = {
        title: title,
        description: description,
        date: date,
        modifiedate: modifieddate,
        type: "WebPage",
        template: 'page',
        list:list,
        noindex: noindex
    }

    return (
        <Seo
        location={location}
        data={pageData}
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
        noindex
      }
    }
  }
`

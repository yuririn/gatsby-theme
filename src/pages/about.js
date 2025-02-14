import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import BreadCrumbList from "../components/common/BreadcrumbList";
import { siteMetadata } from "../../gatsby-config"
import Sns from "../components/posts/Sns"
import SideBar from "../components/SideBar"
import AboutContent from "../utils/about/content";
import Msg from "../components/posts/modueles/msg";
import RelativeCard from "../components/posts/modueles/relative-card";
import Img from "../components/common/Img";

const aboutMeta = {
    template: 'blog',
    title: '【セブ島海外ノマド】フロントエンドエンジニアかみーゆを力一杯紹介します',
    description: `海外ノマドって何？エンジニアってどんな人でもなれるの？プログラマーって子どもいてもバツイチでも30歳過ぎていてもなれるの？生きていれば逆境なんて跳ね除けることはできます。`
}

const BlogList = ({ data, location }) => {
    const {title} =aboutMeta
    const perfectUrl = `${siteMetadata.siteUrl}${location.pathname}`
    const perfectTitle = encodeURI(title + " - " + siteMetadata.title)

    const breadCrumbList = {
        current: title
    }

    return (
        <Layout location={location} title={title}>
            <header className={`c-blog-header`} id="keyvisual">

                <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
            </header>
            <div className="l-section l-container--article">
                <Sns url={perfectUrl} title={perfectTitle}></Sns>
                <div>

                    <article className="c-article">
                        <h1 className="c-article__heading">{title}</h1>
                        <AboutContent></AboutContent>
                    </article>

                </div>
                
                <SideBar></SideBar>
            </div>
        </Layout>
    )
}

export default BlogList

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ location }) => {
    const { title, description } = aboutMeta
    const list = [
        {
            name: '',
            path: location.pathname,
            type: `WebPage`
        }
    ]
    return <Seo
        location={location}
        data={{
            template: 'blog',
            title: title,
            description: description,
            list: list
        }}
    />
}

export const pageQuery = graphql`{
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
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


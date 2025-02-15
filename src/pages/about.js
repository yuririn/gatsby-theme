import * as React from "react"
import Img from "../components/common/Img"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import SideBar from "../components/SideBar"
import BreadCrumbList from "../components/common/BreadcrumbList";
import { siteMetadata } from "../../gatsby-config"
import Sns from '../components/posts/Sns'
import AboutContent from "../inc/about/content"

const aboutMeta = {
    title: '【セブ島海外ノマド】フロントエンドエンジニアかみーゆを力一杯紹介します',
    description:
        "海外ノマドって何？エンジニアってどんな人でもなれるの？プログラマーって子どもいてもバツイチでも30歳過ぎていてもなれるの？生きていれば逆境なんて跳ね除けることはできます。",
    date: "2021-05-05",
    modifieddate: "2021-05-05"
}

const About = ({ location }) => {
    const { title, siteUrl } = siteMetadata
    const perfectUrl = `${siteUrl}${location.pathname}`
    const perfectTitle = encodeURI(title + "|" + title)

    const breadCrumbList = {
        current: title
    }

    return (
        <Layout location={location}>
            <header className={`c-blog-header`} id="keyvisual">
                <Img source="common/about.jpg" className="p-pageHeader__img" />
                <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
            </header>

            <div className="l-section l-container--article">
                <Sns url={perfectUrl} title={perfectTitle}></Sns>
                <div>
                    <article className="c-article">
                        <h1 className="c-article__heading">{title}</h1>
                        <section itemProp="articleBody" className="c-post-body">
                            <AboutContent></AboutContent>
                        </section>
                    </article>
                </div>
                <SideBar></SideBar>
            </div>
        </Layout>
    )
}

export default About

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ location }) => {
    const {title , description } = aboutMeta
    const list = [
        {
            name: title,
            path: '/about/',
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "about/about-ogp.jpg" }
      }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`

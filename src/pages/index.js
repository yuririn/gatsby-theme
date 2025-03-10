import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

import Img from "../components/common/img"

import Layout from "../components/layout"
import FirstView from "../components/top-first-view"
import Post from "../components/posts/posts"
import PickUpPosts from "../components/pickup-posts"
import SideBar from "../components/common/sidebar"
import Ad from "../components/common/ad"
import "../scss/layouts/_card-container.scss"
import "../scss/objects/components/_pickup-card.scss"

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes

    return (
        <Layout location={location} title={siteTitle}>
            <FirstView></FirstView>
            <div className="l-section l-container--blog">
                <div className="l-container--blog__main">
                  <header className="c-heading--lg"><h2>Greeting</h2><p>セブから学んだこと</p></header>
                  <div className="c-greeting">
                  <Img source="common/camille-pic.jpg"/>
                    <p>こんにちは、海外ノマドエンジニアかみーゆです。セブで一念発起し、資金0で会社を設立しました。</p>
                    <p>私はフィリピンに来て以来、人付き合いも物欲も減りました。</p>
                    <p>この国では日本に比べ、手を伸ばせばすぐ欲しいものは手に入らないです。</p>
                    <p>2020年のパンデミック世界最長ロックダウンを経て、多少の不便じゃ困らないし、死なないことも学びました。<br />結果、節約できるようになりました。わずかだけど親にもサポートもしています。</p>
                    <p>これが1番フィリピンに感謝していることです。この「銀ねこアトリエ」ではそんなライフスタイルも含めて発信しています。</p>
                  </div>
                    <header className="c-heading--lg"><h2>Pick up</h2><p>おすすめ記事</p></header>
                    <PickUpPosts></PickUpPosts>
                    <Ad location={location} adClass={`u-my--lg`}></Ad>
                    <header className="c-heading--lg"><h2>Latest</h2><p>新着記事</p></header>
                    <ul className="l-card-container">{
                        posts.map((post, key) => {
                            return <Post post={post} key={key}></Post>
                        }
                        )}
                    </ul>
                    <p className="u-center"><a href="/blogs/" className="c-btn--detail">もっとブログを読む</a></p>
                    <Ad location={location} adClass={`u-my--lg`}></Ad>
                </div>
                <SideBar location={location}></SideBar>
            </div>
        </Layout>
    )
}

export default BlogIndex

export const Head = ({ data, location }) => (
    <Seo
        location={location.pathname}
        data={
            { template: 'index' }
        }
    />
)

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }

  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    limit:12
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


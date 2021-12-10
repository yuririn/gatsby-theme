import * as React from "react"
import { Link, graphql } from "gatsby"

import styled from "styled-components"
import Seo from "../components/seo"
import Img from "../components/img"

import Layout from "../components/layout"
import FirstView from "../components/top-first-view"
import FovoriteList from "../components/common/favorites"
import AddTagLink from "../components/common/add-tag-link"
import Tags from "../components/blogs/tag-list"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  let cardClass = "p-entryCard c-grid__item--md6 c-grid__item--lg4"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="海外ノマド フリーランスエンジニアの日記" />
      <FirstView />
      <BigWhite>
        <div className="l-container">
          <section className="p-section">
            <h2 className="c-heading--lg">
              YouTube「かみーゆちゃんねる」やってるよ！
            </h2>
            <p className="u-text-center u-mblg">
              海外ノマドやエンジニアライフについて配信中です。
            </p>

            <p className="u-text-center u-mblg">
              <a
                className="p-btn--detail"
                href="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                target="_blank"
                rel="noopener noreferrer"
              >
                チャンネル登録する
              </a>
            </p>
          </section>
          <section className="p-section">
            <h2 className="c-heading--lg">最新の記事</h2>
            <div className="c-grid">
              {posts.map((post, i) => {
                if (i === 0) {
                  cardClass =
                    "p-entryCard c-grid__item--md6 c-grid__item--lg4 is-first"
                } else if (i > 2) {
                  cardClass =
                    "p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                } else {
                  cardClass = "p-entryCard c-grid__item--md6 c-grid__item--lg4"
                }

                return (
                  <article className={cardClass} key={`post${i}`}>
                    <Link to={post.fields.slug} className="p-entryCard__img">
                      <Img
                        source={post.frontmatter.hero}
                        alt={post.frontmatter.title}
                        key={post.frontmatter.title}
                      />
                      <div className="p-entryCard__date">
                        <time date={post.frontmatter.date.replace(/\./g, "-")}>
                          {post.frontmatter.date}
                        </time>
                      </div>
                    </Link>
                    <Link to={post.fields.slug} className="p-entryCard__body">
                      <h3 className="p-entryCard__heading">
                        {post.frontmatter.title}
                      </h3>
                      {i === 0 ? <p>{post.frontmatter.description}</p> : ""}
                    </Link>
                    <div className="p-entryCard__footer">
                      <AddTagLink tags={post.frontmatter.tags} />
                    </div>
                  </article>
                )
              })}
            </div>
            <p className="u-text-center u-mblg">
              <Link to="/blogs/" className="p-btn--detail">
                Read More Blog
              </Link>
            </p>
          </section>
          <FovoriteList type="web" />
          <FovoriteList type="life" />
          <FovoriteList type="career" />
          <div className="l-container">
            <section className="p-box--gray u-text-center">
              <h2 className="c-heading--lg">人気のタグ</h2>
              <Tags />
            </section>
          </div>
          <div className="l-container">
            <h2 className="c-heading--lg">人気のジャンル</h2>
            <Genre />
          </div>
        </div>
        <Prof></Prof>
      </BigWhite>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { pagetype: { eq: "blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
          tags
          cateId
          hero
          pagetype
        }
      }
    }
  }
`
const BigWhite = styled.div`
  position: relative;
  background-color: #fff;
  padding-top: 50px;
  padding-bottom: 30px;
  @media screen and (min-width: 768px) {
    padding-bottom: 50px;
    padding-top: 80px;
  }
`

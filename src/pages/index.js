import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import FirstView from "../components/firstview"
import TagList from "../components/common/tagsArchive"
import FovoriteList from "../components/common/favorites"
import Search from "../components/search/"
import styled from "styled-components"
import TagsList from "../components/blogs/tagList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const ogpSrc = data.allFile.edges[0].node.childImageSharp.fluid.src

  let cardClass = "p-entryCard c-grid__item--md6 c-grid__item--lg4"

  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      () => {
        let position = document
          .querySelector("main > div:first-child")
          .getBoundingClientRect().y
        let bg = document.querySelector("main .bg")
        if (position > 0) {
          bg.classList.remove("op0")
        } else {
          if (!bg.classList.contains("op0")) {
            bg.classList.add("op0")
          }
        }
      },
      true
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="海外ノマド フリーランスエンジニアの日記"
        image={ogpSrc}
        location={location}
      />
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
            <div className="c-grid">
              <div className="c-grid__item--md6 u-mblg">
                <IframeWrapper>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/C7Sn422X4e4"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </IframeWrapper>
                <h3>セブ島と日本をつなぐプロジェクト</h3>
              </div>
              <div className="c-grid__item--md6 u-mblg">
                <IframeWrapper>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/videoseries?list=PLRSXt39PZIMWSeahdQUIm2dcgMA_C8KIY"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </IframeWrapper>
                <h3>女性エンジニアが海外ノマド生活するとどうなるの？</h3>
              </div>
            </div>
            <p class="u-text-center u-mblg">
              <a
                class="p-btn--detail"
                href="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                target="_blank"
                rel="noopener"
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
                  <article className={cardClass}>
                    <Link to={post.fields.slug} className="p-entryCard__img">
                      {post.frontmatter.hero ? (
                        <Image filename={post.frontmatter.hero} />
                      ) : (
                        <Image filename={`common/dummy.png`} />
                      )}
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
                      <TagList tags={post.frontmatter.tags} />
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
          <p className="u-text-center u-mblg">
            <Link to="/blogs/" className="p-btn--detail">
              Read More Blog
            </Link>
          </p>
          <h2 className="c-heading--lg">記事を探そう！</h2>
          <Search />

          <FovoriteList type="web" />
          <FovoriteList type="life" />
          <FovoriteList type="career" />
          <section className="p-box--gray u-text-center">
            <h2 className="c-heading--lg">人気のタグ</h2>
            <TagsList />
          </section>
        </div>
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
    allFile(
      filter: {
        relativePath: { eq: "common/newogp.png" }
        sourceInstanceName: { eq: "assets" }
      }
    ) {
      edges {
        node {
          name
          relativePath
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
      filter: { frontmatter: { pagetype: { eq: "blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          pagetype
          date(formatString: "YYYY.MM.DD")
          description
          cateId
          hero
          tags
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

const IframeWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  height: 0;
  width: 100%;
  margin-bottom: 20px;
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

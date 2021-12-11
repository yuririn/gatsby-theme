import * as React from "react"
import { Link, graphql } from "gatsby"

import { siteMetadata } from "./../../gatsby-config"

import { Article } from "./../styles/blog-styles/article"
import { Header } from "./../styles/blog-styles/header"
import { Edit } from "./../styles/blog-styles/edit"
import styled from "styled-components"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/img"
import { faRss } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BreadCrumbList from "../components/common/bread-crumb-list"
import Category from "../components/blogs/category"
import TagsList from "../components/blogs/tags-blog"
import Description from "../components/blogs/descriotion"
import Sns from "../components/blogs/sns"
import Prof from "../components/blogs/small-prof"
import Toc from "../components/blogs/topic"
import FovoriteList from "../components/common/favorites"
import Sidebar from "../components/blogs/sidebar"
import Tags from "../components/blogs/tag-list"
import Genre from "../components/common/genre"
import ProfBig from "../components/common/profile"
import RelativeCard from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: RelativeCard,
    msg: Msg,
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { title, siteUrl } = data.site.siteMetadata
  const siteTitle = `${post.frontmatter.title} | ${title}`
  const { previous, next } = data
  const perfectUrl = `${siteUrl}${location.pathname}`
  const perfectTitle = encodeURI(post.frontmatter.title + "|" + siteTitle)
  const ogp = `${siteUrl}${data.allFile.edges[0].node.publicURL}`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={siteTitle}
        description={post.frontmatter.description || post.excerpt}
        ogp={ogp}
        date={post.frontmatter.date.replace(/\./g, "-")}
        modified={
          post.frontmatter.modifieddate
            ? post.frontmatter.modifieddate.replace(/\./g, "-")
            : ""
        }
        type="blog"
      />
      <Header>
        <div
          className={
            `c-article__mainvisual c-article__mainvisual--` +
            post.frontmatter.cateId
          }
        >
          <div className="c-article__img">
            <Category
              name={post.frontmatter.categoryId}
              id={post.frontmatter.cateId}
            />
            <Img
              source={post.frontmatter.hero}
              alt={post.frontmatter.title}
            ></Img>
          </div>
        </div>
      </Header>
      <div className="l-container">
        <BreadCrumbList type="blog" current={post.frontmatter.title} />
      </div>
      <Body>
        <Article>
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline" className="c-article__heading">
                {post.frontmatter.title}
              </h1>
              <dl className="c-article__date">
                <dt>公開日</dt>
                <dd>
                  <time date={post.frontmatter.date.replace(/\./g, "-")}>
                    {post.frontmatter.date}
                  </time>
                </dd>
                {post.frontmatter.modifieddate ? <dt>メンテナンス日</dt> : ""}
                {post.frontmatter.modifieddate ? (
                  <dd>
                    <time
                      date={post.frontmatter.modifieddate.replace(/\./g, "-")}
                    >
                      {post.frontmatter.modifieddate}
                    </time>
                  </dd>
                ) : (
                  ""
                )}
              </dl>
              <TagsList tags={post.frontmatter.tags} />
              <Description texts={post.frontmatter.lead} />
              <Sns url={perfectUrl} title={perfectTitle} />
              <Prof></Prof>
              <Toc data={data.markdownRemark.tableOfContents} />
            </header>
            <Edit>
              <section itemProp="articleBody">
                {renderAst(post.htmlAst)}
              </section>
            </Edit>
            <Sns url={perfectUrl} title={perfectTitle} />
            <dl className="c-article__tags">
              <dt>Category</dt>
              <dd className="cate">
                <Link to={`/blogs/${post.frontmatter.cateId}/`}>
                  {siteMetadata.category.map(item => {
                    return post.frontmatter.cateId === item.slug
                      ? item.name
                      : ""
                  })}
                </Link>
              </dd>
            </dl>
            <Feedly>
              <h2> 「銀ねこアトリエ」のブログを定期購読しよう</h2>
              <a
                href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fginneko-atelier.com%2Frss.xml"
                target="blank"
              >
                <FontAwesomeIcon icon={faRss} />
                Feedlyに登録する
              </a>
            </Feedly>
            <nav className="p-section l-container">
              <ol className="c-pager--article">
                <li className="c-pager--article__prev">
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li className="c-pager--article__next">
                  {next && (
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title}
                    </Link>
                  )}
                </li>
              </ol>
            </nav>
          </article>
        </Article>
        <Sidebar
          cateId={post.frontmatter.cateId}
          title={post.frontmatter.title}
          tags={post.frontmatter.tags}
        />
        <aside className="BigWhite">
          <div className="p-section l-container">
            <FovoriteList type="web" />
            <FovoriteList type="life" />
            <FovoriteList type="career" />
          </div>
          <div className="l-container">
            <section className="p-box--gray p-section u-text-center">
              <h2 className="c-heading--lg">人気のタグ</h2>
              <Tags />
            </section>
          </div>
          <div className="l-container">
            <section className="p-section u-text-center">
              <h2 className="c-heading--lg">人気のジャンル</h2>
              <Genre />
            </section>
          </div>
          <ProfBig />
        </aside>
      </Body>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $hero: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: $hero }
      }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        lead
        hero
        cateId
        tags
        pagetype
        modifieddate(formatString: "YYYY.MM.DD")
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
const Body = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    position: relative;
    max-width: 1120px;
    margin: 0 auto;
    flex-wrap: wrap;
  }
`

const Feedly = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  // border:1px solid #6cc655;
  flex-direction: column;
  margin: 20px 0 15px;
  @media screen and (min-width: 768px) {
    margin: 0 0 30px;
  }
  h2 {
    margin-bottom: 20px;
  }
  a {
    background: #6cc655;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    color: #fff;
    border-radius: 20px;
    text-decoration: none;
    svg {
      margin-right: 10px;
    }
  }
`

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
import BreadCrumbList from "../components/common/bread-crumb-list"
import Category from "../components/blogs/category"
import TagsList from "../components/blogs/tags-blog"
import Description from "../components/blogs/descriotion"
import Sns from "../components/blogs/sns"
import Prof from "../components/blogs/small-prof"
import Toc from "../components/blogs/topic"
// import FovoriteList from "../components/common/favorites"
import Sidebar from "../components/blogs/sidebar"
// import Tags from "../components/blogs/tag-list"
import Genre from "../components/common/genre"
import ProfBig from "../components/common/profile"
import RelativeCard from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"
import Faq from "../components/blogs/blog-parts/faq"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: RelativeCard,
    msg: Msg,
    faq: Faq,
    prof: Prof,
    toc: Toc
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const perfectUrl = `https://ginneko-atelier.com${location.pathname}`
  const perfectTitle = encodeURI(post.frontmatter.title + "|" + siteTitle)
  const ogpSrc = data.allFile.edges[0]
    ? `${data.allFile.edges[0].node.publicURL}`
    : "images/ogp.png"
  const category = { url:`/blogs/${post.frontmatter.cateId}/`, name:
                  siteMetadata.category.filter(item => {
                    return post.frontmatter.cateId === item.slug
                      ? item.name
                      : ""
                  })[0].name
                }
  const seoData = {
    title : post.frontmatter.title,
    description : post.frontmatter.description || post.excerpt,
    date : post.frontmatter.date.replace(/\./g, "-"),
    location : location,
    ogp : ogpSrc,
    faq : post.frontmatter.faq?post.frontmatter.faq : '',
    tag : post.frontmatter.tags[0],
    cateId : post.frontmatter.cateId,
    type : "blog"
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo data={seoData}
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
        <BreadCrumbList type="blog" current={post.frontmatter.title} cate={category} tag={post.frontmatter.tags[0]}/>
      </div>
      <Body>
        <Article>
          <article
            className="blog-post l-container"
            itemScope
            itemType="http://schema.org/Article"
            data-clarity-region="article"
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
            </header>
            <Edit>
              <section itemProp="articleBody">
                {renderAst(post.htmlAst)}
              </section>
            </Edit>

            <div className="c-btn--donation" id="end_of_article">
              <p>お読みいただきありがとうございます。<br/>「銀ねこアトリエ」をより良いブログにするために是非応援してください！</p>
              <a href="https://ofuse.me/o?uid=47415" target="_blank" id="donation" rel="noreferrer"><FontAwesomeIcon icon={faHeart} />銀ねこアトリエを応援する</a>
            </div>
            <Sns url={perfectUrl} title={perfectTitle} />
            <dl className="c-article__tags">
              <dt>Category</dt>
              <dd className="cate">
                <Link to={category.url}>
                  {category.name}
                </Link>
              </dd>
            </dl>

          </article>
          <ol className="c-pager--article p-section l-container">
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
        </Article>
        <Sidebar
          cateId={post.frontmatter.cateId}
          title={post.frontmatter.title}
          tags={post.frontmatter.tags}
          topic={post.tableOfContents}
        />
        <aside className="l-container">
            <section className="p-section u-text-center">
              <h2 className="c-heading--lg">人気のジャンル</h2>
              <Genre />
            </section>
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
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        lead
        hero
        cateId
        tags
        pagetype
        faq
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

// const Feedly = styled.div`
//   height: 150px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: #eee;
//   // border:1px solid #6cc655;
//   flex-direction: column;
//   margin: 0 15px;
//   @media screen and (min-width: 768px) {
//     margin-left: 0;
//     margin-right: 0;
//   }
//   h2 {
//     margin-bottom: 20px;
//   }
//   a {
//     background: #6cc655;
//     font-weight: bold;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 40px;
//     padding: 0 20px;
//     color: #fff;
//     border-radius: 20px;
//     text-decoration: none;
//     svg {
//       margin-right: 10px;
//     }
//   }
// `

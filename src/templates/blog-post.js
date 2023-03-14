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
import BreadCrumbList from "../components/common/bread-crumb-list"
import TagsList from "../components/blogs/tags-blog"
import Sns from "../components/blogs/sns"
import Prof from "../components/blogs/small-prof"
import Toc from "../components/blogs/topic"
import Sidebar from "../components/blogs/sidebar"
import Genre from "../components/common/genre"
import RelativeCard from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Ad from '../components/common/ad'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: RelativeCard,
    msg: Msg,
    prof: Prof,
    ad: Ad,
    toc: Toc
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {

  const post = data.markdownRemark
  const faq = post.frontmatter.faq
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const perfectUrl = `https://ginneko-atelier.com${location.pathname}`
  const perfectTitle = encodeURI(post.frontmatter.title + "|" + siteTitle)

  const category = { url:`/blogs/${post.frontmatter.cateId}/`, name:
    siteMetadata.category.filter(item => {
      return post.frontmatter.cateId === item.slug
        ? item.name
        : ""
    })[0].name
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Header>
        <div
          className={
            `c-article__mainvisual c-article__mainvisual--` +
            post.frontmatter.cateId
          }
        >
          <div className="c-article__img">
            {/* <Category
              name={post.frontmatter.categoryId}
              id={post.frontmatter.cateId}
            /> */}
            <GatsbyImage image={getImage(data.dogImage)} alt={post.frontmatter.title} />
          </div>
        </div>
      </Header>
      <BreadCrumbList type="blog" cate={category} tag={post.frontmatter.tags[0]}/>
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
                {faq && (<h2>FAQ</h2>)}
                {faq && faq.map((item, index) => {
                  return (
                    <dl className="p-faq__item" key={`faq${index}`}>
                      <dt>{item[0]}</dt>
                      <dd>{item[1]}</dd>
                    </dl>
                  )
                })}
              </section>
            </Edit>

            <div className="c-btn--donation" id="end_of_article">
              <p>お読みいただきありがとうございます。<br/>「銀ねこアトリエ」をより良いブログにするために是非応援してください！</p>
              <a href="https://ofuse.me/o?uid=47415" target="_blank" id="donation" rel="noreferrer"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>銀ねこアトリエを応援する</a>
            </div>
            <Sns url={perfectUrl} title={perfectTitle} />
            <Ad location={location.pathname}></Ad>
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
          slug={post.fields.slug}
          location={location.pathname}
        />
        <aside className="l-container">
          <Ad location={location.pathname}></Ad>
          <section className="p-section u-text-center">
            <h2 className="c-heading--lg">人気のジャンル</h2>
            <Genre />
          </section>
        </aside>
      </Body>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data, location }) => {
  const post = data.markdownRemark
  const ogpSrc = data.siteOgImage
    ? `${data.siteOgImage.childImageSharp.resize.src}`
    : "/images/ogp.png"
  const thumnailSrc = data.siteThumnailImage
    ? `${data.siteThumnailImage.childImageSharp.resize.src}`
    : "/images/thumnail.png"
  const seoData = {
    title : post.frontmatter.title,
    description : post.frontmatter.description || post.excerpt,
    date : post.frontmatter.date.replace(/\./g, "-"),
    location : location,
    ogp : ogpSrc,
    faq : post.frontmatter.faq?post.frontmatter.faq : '',
    tag : post.frontmatter.tags[0],
    cateId : post.frontmatter.cateId,
    thumnail: thumnailSrc,
    type : "blog",
    noindex: post.frontmatter.noindex?post.frontmatter.noindex : false,
  }
  return (
    <Seo
      data={seoData}
    />
  )
}

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
          width: 400
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
      htmlAst
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        noindex
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
  aside.l-container .display{
    margin-bottom: 50px;
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
// https://react-mdx-prism-lighter.site/article/625ac3bc-9e19-5e5e-8519-5af935e47523/
//   }
// `

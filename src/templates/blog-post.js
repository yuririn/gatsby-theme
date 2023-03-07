import * as React from "react"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "./../../gatsby-config"

import { Article } from "./../styles/blog-styles/article"
import { Header } from "./../styles/blog-styles/header"
import { Edit } from "./../styles/blog-styles/edit"
import { MDXProvider } from "@mdx-js/react"


import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/common/bread-crumb-list"
// import TagsList from "../components/blog/tags-blog"
import Sns from "../components/blog/sns"
import Prof from "../components/blog/small-prof"
// import Toc from "../components/blogs/topic"
import Sidebar from "../components/blog/sidebar"
// import Genre from "../components/common/genre"
import Card from "../components/blog/card"
import Msg from "../components/blog/msg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Ad from '../components/common/ad'

const shortcodes = { Prof, Msg, Card, Ad}

const BlogPostTemplate = ({ data, location, children }) => {
  const post = data.mdx.frontmatter
  const siteTitle = siteMetadata?.title || `Title`
  const { previous, next } = data
  const perfectUrl = `https://ginneko-atelier.com${location.pathname}`
  const perfectTitle = encodeURI(post.title + "|" + siteTitle)

  const category = { url:`/blogs/${post.cateId}/`, name:
    siteMetadata.category.filter(item => {
      return post.cateId === item.slug
        ? item.name
        : ""
    })[0].name
  }

  return (
    <Layout location={location}>
      <Header>
        <div
          className={
            `c-article__mainvisual c-article__mainvisual--` +
            post.cateId
          }
        >
          <div className="c-article__img">
            <GatsbyImage image={getImage(data.dogImage)} alt={post.title} />
          </div>

        </div>
      </Header>
      <BreadCrumbList type="blog" cate={category} tag={post.tags[0]}/>

      <div className="l-body--article">
        <Article>
          <h1 itemProp="headline" className="c-article__heading">{post.title}</h1>
          <dl className="c-article__date">
            <dt>公開日</dt>
            <dd>
              <time date={post.date.replace(/\./g, "-")}>
                {post.date}
              </time>
            </dd>
            {post.modifieddate ? <dt>メンテナンス日</dt> : ""}
            {post.modifieddate ? (
              <dd>
                <time
                  date={post.modifieddate.replace(/\./g, "-")}
                >
                  {post.modifieddate}
                </time>
              </dd>
            ) : (
              ""
            )}
          </dl>
          <Edit itemProp="articleBody">
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
            {post.faq && (<h2>FAQ</h2>)}
              {post.faq && post.faq.map((item, index) => {
                return (
                  <dl className="p-faq__item" key={`faq${index}`}>
                    <dt>{item[0]}</dt>
                    <dd>{item[1]}</dd>
                  </dl>
                )
              })}
          </Edit>
          <div className="c-btn--donation u-mblg" id="end_of_article">
              <p>お読みいただきありがとうございます。<br/>「銀ねこアトリエ」をより良いブログにするために是非応援してください！</p>
              <a href="https://ofuse.me/o?uid=47415" target="_blank" id="donation" rel="noreferrer"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>銀ねこアトリエを応援する</a>
            </div>
            <Ad></Ad>
            <Sns url={perfectUrl} title={perfectTitle} />
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
          cateId={post.cateId}
          title={post.title}
          tags={post.tags}
          slug={data.mdx.fields.slug}
          toc={data.mdx.tableOfContents.items}
        />
      </div>
      <div className="l-container u-mblg">
      <Ad></Ad>
      </div>
    </Layout>
  )
}

export const Head = ({ data, location }) => {
  const date = data.mdx.frontmatter.modifiledate ? data.mdx.frontmatter.modifiledate : data.mdx.frontmatter.date
 return (<Seo
  data={{
    title: data.mdx.frontmatter.title,
    location: location,
    description: data.mdx.frontmatter.description,
    template: `blog-post`,
    faq : data.mdx.frontmatter.faq ? data.mdx.frontmatter.faq : '',
    noindex : data.mdx.frontmatter.noindex ? true : false,
    ogp: data.siteOgImage.childImageSharp.resize.src,
    thumbnail: data.siteThumnailImage.childImageSharp.resize.src,
    date: date.replace(/\./g, "-"),
    cateId : data.mdx.frontmatter.cateId,
    tag : data.mdx.frontmatter.tags[0],
  }}
 />)
}

export default BlogPostTemplate

// export const Head = ({ data, location }) => {
//   const post = data.markdownRemark
//   const ogpSrc = data.siteOgImage
//     ? `${data.siteOgImage.childImageSharp.resize.src}`
//     : "/images/ogp.png"
//   const thumnailSrc = data.siteThumnailImage
//     ? `${data.siteThumnailImage.childImageSharp.resize.src}`
//     : "/images/thumnail.png"
//   const seoData = {
//     title : post.title,
//     description : post.description || post.excerpt,
//     date : post.date.replace(/\./g, "-"),
//     location : location,
//     ogp : ogpSrc,
//     faq : post.faq?post.faq : '',
//     tag : post.tags[0],
//     cateId : post.cateId,
//     thumnail: thumnailSrc,
//     type : "blog",
//     noindex: post.noindex?post.noindex : false,
//   }
//   return (
//     <Seo
//       data={seoData}
//     />
//   )
// }

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

    mdx(id: { eq: $id }) {
      id
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        modifieddate(formatString: "YYYY.MM.DD")
        description
        hero
        cateId
        tags
        faq
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title

      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

import React from "react"
import {Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"
import RelativeCard from "../components/blogs/blog-parts/relative-card"
import  Msg from "../components/blogs/blog-parts/msg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import AdLayout from "../components/ad-layout"
import { Article } from "./../styles/ad/article"
import AdSidebar from "../components/blogs/ad-sidebar";
import BreadCrumbList from "../components/common/bread-crumb-list"
import Img from "../components/img"
import Seo from "../components/seo"
import Ad from '../components/common/ad'
import { Location } from '@gatsbyjs/reach-router';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    msg: Msg,
    ad: Ad,
  },
}).Compiler

const AdPost = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  return (
    <AdLayout location={location} title={siteTitle}>
      <Article>
        <BreadCrumbList type="ad"/>
        <h1>{post.frontmatter.title}</h1>
       {post.frontmatter.tags.length !== 0 && (
       <dl className="c-tag">
        <dt>カテゴリー</dt>
        {post.frontmatter.tags.map((tag,i) =>{
          return (<dd key={i}><a href={`/choco-blog/tags/${tag}`}>{tag}</a></dd>)
        })}
        </dl>)}
        <dl className="c-article__date">
          <dt>更新日</dt>
          {post.frontmatter.modifieddate ? (
            <dd>
              <time
                date={post.frontmatter.modifieddate.replace(/\./g, "-")}
              >
                {post.frontmatter.modifieddate}
              </time>
            </dd>
          ) : (
            <time date={post.frontmatter.date.replace(/\./g, "-")}>
              {post.frontmatter.date}
            </time>
          )}
        </dl>
        <div className="hero">
          <GatsbyImage image={getImage(data.dogImage)} alt={post.frontmatter.title}/>
        </div>
        <section itemProp="articleBody" className="article-body">
          {renderAst(post.htmlAst)}
        </section>

        <ol className="c-pager">
            {next && (

                <li className="c-pager__next">
                  <Link to={next.fields.slug} rel="next">
                    <figure><Img source={next.frontmatter.hero}></Img></figure>
                    <span>{next.frontmatter.title}</span>
                  </Link>
                </li>
              )}
              { previous&& (
                 <li className="c-pager__prev">
                <Link to={previous.fields.slug} rel="prev">
                  <figure><Img source={previous.frontmatter.hero}></Img></figure>
                  <span>{previous.frontmatter.title}</span>
                </Link>
                </li>
              )}
          </ol>
          <Ad location={location.pathname}></Ad>
      </Article>
      <AdSidebar></AdSidebar>
    </AdLayout>
  )
}
export default AdPost

export const Head = ({ data, location }) => {
  const post = data.markdownRemark
  const ogpSrc = data.siteOgImage
    ? `${data.siteOgImage.childImageSharp.resize.src}`
    : "/images/ogp.png"
  const thumnailSrc = data.siteThumnailImage
    ? `${data.siteThumnailImage.childImageSharp.resize.src}`
    : "/images/thumnail.png"
  const yourData ={
    title : post.frontmatter.title,
    description : post.frontmatter.description || post.excerpt,
    ogp : ogpSrc,
    location : location,
    thumnail: thumnailSrc,
    date : post.frontmatter.date,
    modifieddate : post.frontmatter.modifieddate,
    type : "ad",
    tags: post.frontmatter.tags
  }

  return (
     <Seo
        data={yourData}
      />
  )
}


export const pageQuery = graphql`
  query PagePostBySlug(
      $id: String!
      $hero: String
      $previousPostId: String
      $nextPostId: String
    ) {
    site {
      siteMetadata {
        title
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
          width: 640
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
      html
      htmlAst
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
        hero
        tags
        pagetype
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        hero
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        hero
      }
    }
  }
`

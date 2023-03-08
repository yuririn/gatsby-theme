import React from "react"
import {Link, graphql } from "gatsby"

import  Msg from "../components/blog/msg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Img from "../components/common/img"
import Seo from "../components/seo"
import { MDXProvider } from "@mdx-js/react"
import ChocoLayout from "../components/choco-layout"
import BreadCrumbList from "../components/common/bread-crumb-list"

const shortcodes = { Msg }

const ChocoPost = ({ data, location, children }) => {
  const post = data.mdx
  const { previous, next } = data

  return (
    <ChocoLayout location={location}>
      <section class="l-main">
        <BreadCrumbList type='ad'></BreadCrumbList>
        <article className="l-article">
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
        <section itemProp="articleBody" className="c-article-body"><MDXProvider components={shortcodes}>{children}</MDXProvider></section>
        </article>
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
      </section>
    </ChocoLayout>
  )

}

export default ChocoPost

export const Head = ({ data, location }) => {
  const date = data.mdx.frontmatter.modifiledate ? data.mdx.frontmatter.modifiledate : data.mdx.frontmatter.date
 return (<Seo
  data={{
    title: data.mdx.frontmatter.title,
    location: location,
    description: data.mdx.frontmatter.description,
    template: `choco-post`,
    faq : data.mdx.frontmatter.faq ? data.mdx.frontmatter.faq : '',
    noindex : data.mdx.frontmatter.noindex ? true : false,
    ogp: data.siteOgImage.childImageSharp.resize.src,
    thumbnail: data.siteThumnailImage.childImageSharp.resize.src,
    date: date.replace(/\./g, "-"),
    tag : data.mdx.frontmatter.tags[0],
  }}
 />)
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
    mdx(id: { eq: $id }) {
      id
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
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        hero
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
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

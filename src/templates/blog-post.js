import * as React from "react"
import { Link, graphql } from "gatsby"

import { Article } from "./../styles/blog-styles/article"
import { Header } from "./../styles/blog-styles/header"
import { Edit } from "./../styles/blog-styles/edit"
import styled from "styled-components"
import rehypeReact from "rehype-react"
import RelatedList from "./../components/blogs/related-list"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/common/bread-crumb-list"
import TagsList from "../components/blogs/tags-blog"
import Sns from "../components/blogs/sns"
import Prof from "../components/blogs/small-prof"
import Toc from "../components/common/table-of-contents"
import Kyle from "../components/blogs/blog-parts/kyle"
import Sidebar from "../components/common/sidebar"
import Genre from "../components/common/genre"
import RelativeCard from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Ad from "../components/common/ad"
import { siteMetadata } from "./../../gatsby-config";
import "../scss/objects/components/_page-header.scss"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: RelativeCard,
    msg: Msg,
    prof: Prof,
    ad: Ad,
    kyle: Kyle,
    toc: Toc,
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
    const { slug } = data.markdownRemark.fields
  const post = data.markdownRemark
  const faq = post?.frontmatter.faq
    const siteTitle = siteMetadata.title || `Title`
  const { previous, next } = data
  const perfectUrl = `https://ginneko-atelier.com${location.pathname}`
  const perfectTitle = encodeURI(post.frontmatter.title + "|" + siteTitle)

  const category = {
    url: `/blogs/${post.frontmatter.cateId}/`,
    name: siteMetadata.category.filter(item => {
      return post.frontmatter.cateId === item.slug ? item.name : ""
    })[0].name,
  }
  const breadCrumbList = {
    parents: [
      { path: '/blogs/', name: siteMetadata.blogName },
      { path: `/blogs/${post.frontmatter.cateId}/`, name: category.name },
      { path: `/blogs/tags/${post.frontmatter.tags[0]}/`, name: post.frontmatter.tags[0] }
    ],
    current: post.frontmatter.title
  }

  return (
    <Layout location={location} title={siteTitle}>
      <header className={`c-page-header--${post.frontmatter.cateId} blog`} id="keyvisual">
        <div className="c-page-header__img">
          <GatsbyImage
            image={getImage(data.dogImage)}
            alt={post.frontmatter.title}
          />
        </div>
        <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
      </header>
      <Body>
        <Article>
          <article
            className="blog-post l-container"
            itemScope
            itemType="http://schema.org/Article"
            data-clarity-region="article"
          >
            <header>
                <h1 itemProp="headline" className="c-article__heading" id="keyvisual">
                {post.frontmatter.title}
              </h1>
              <dl className="c-article__date">
                <dt>公開日</dt>
                <dd>
                  <time date={post.frontmatter.date.replace(/\./g, "-")}>
                    {post.frontmatter.date}
                  </time>
                </dd>
                {post.frontmatter.modifiedDate ? <dt>メンテナンス日</dt> : ""}
                {post.frontmatter.modifiedDate ? (
                  <dd>
                    <time
                      date={post.frontmatter.modifiedDate.replace(/\./g, "-")}
                    >
                      {post.frontmatter.modifiedDate}
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
                {faq && <h2>FAQ</h2>}
                {faq &&
                  faq.map((item, index) => {
                    return (
                      <dl className="p-faq__item" key={`faq${index}`}>
                        <dt>{item[0]}</dt>
                        <dd
                            dangerouslySetInnerHTML={{ __html: item[1] }}/>
                      </dl>
                    )
                  })}
              </section>
            </Edit>

            <Sns url={perfectUrl} title={perfectTitle} />
            <Ad location={location.pathname}></Ad>
            <dl className="c-article__tags">
              <dt>Category</dt>
              <dd className="cate">
                <Link to={category.url}>{category.name}</Link>
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
          title={post.frontmatter.title}
          slug={post.fields.slug}
          location={location.pathname}
              ><Toc slug={slug}></Toc></Sidebar>
        <aside className="l-container">
          <RelatedList
            category={post.frontmatter.cateId}
            tags={post.frontmatter.tags}
            slug={post.fields.slug}
          ></RelatedList>
          <Ad location={location.pathname}></Ad>
          <section className="p-section u-text-center">
            <h2 className="p-heading--lg">人気のジャンル</h2>
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
    const { category, blogName } = siteMetadata
    const cate = category.filter(i => i.slug === post.frontmatter.cateId)[0]
    // パンくず
    const list = [
        {
            name: blogName,
            path: '/blogs/',
            type: `WebPage`
        },
        {
            name: cate.name,
            path: `/blogs/${cate.slug}`,
            type: `WebPage`
        },
        {
            name: post.frontmatter.tags[0],
            path: `/blogs/tags/${post.frontmatter.tags[0]}`,
            type: `WebPage`
        },
        {
            name: post.frontmatter.title,
            path: `/blogs/${post.fields.slug}/`,
            type: `BlogPosting`
        }
    ]

    const ogpSrc = data.siteOgImage
        ? `${data.siteOgImage.childImageSharp.resize.src}`
        : "/images/ogp.png"
    const thumbnailSrc = data.siteThumbnailImage
        ? `${data.siteThumbnailImage.childImageSharp.resize.src}`
        : "/images/thumnail.png"
    const blogData = {
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.excerpt,
        ogp: ogpSrc,
        thumbnail: thumbnailSrc,
        date: post.frontmatter.date,
        modifiedDate: post.frontmatter.modifiedDate,
        template: 'blog',
        list: list,
        
        faq: post.frontmatter.faq,
        noindex: post.frontmatter.noindex
    }

    return (
        <Seo
            location={location.pathname}
            data={blogData}
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
    siteOgImage: file(
      relativePath: { eq: $hero }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        resize(width: 1200, height: 900, toFormat: PNG) {
          src
        }
      }
    }
    dogImage: file(
      relativePath: { eq: $hero }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        gatsbyImageData(
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
        pageType
        faq
        modifiedDate(formatString: "YYYY.MM.DD")
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
  aside.l-container .display {
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

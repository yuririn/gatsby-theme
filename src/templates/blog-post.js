import React, { createElement } from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from '../components/layout';
import SideBar from '../components/SideBar';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import rehypeReact from "rehype-react"
import Tags from "../components/posts/Tags"

import Msg from "../components/posts/modueles/msg";
import RelativeCard from "../components/posts/modueles/relative-card";
import Date from '../components/posts/Date';
import Bio from "../components/posts/Bio";
import Sns from "../components/posts/Sns"

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        card: RelativeCard,
        msg: Msg,
        prof: Bio
    },
}).Compiler
    
// console.log(renderAst)
const BlogPostTemplate = ({ data, location }) => {
    const { title, siteUrl, category } = data.site.siteMetadata
    const post = data.markdownRemark.frontmatter
    const slug = data.markdownRemark.fields.slug
    const docImage = data.docImage
    const render = data.markdownRemark.htmlAst;
    const cate = category.filter(i=>i.slug === post.cateId)[0]
    const perfectUrl = `${siteUrl}${location.pathname}`
    const perfectTitle = encodeURI(post.title + "|" + title)
    return (
        <Layout location={location} title={post.title}>
            <header className={`c-blog-header--${cate.slug}`} id="keyvisual">
                <GatsbyImage
                    image={getImage(docImage)}
                    alt={post.title}
                />

            </header>
            <div className="l-section l-container--article">
                <Sns url={perfectUrl} title={perfectTitle}></Sns>
                <article className="c-article">
                    <h1 className="c-article__heading">{post.title}</h1>
                    <Date date={post.date} modifiedDate={post.modifieddate}></Date>
                    <Tags tags={post.tags}></Tags>
                    
                    <section itemProp="articleBody" className="c-post-body">
                        {renderAst(render)}
                    </section>
                    <dl class="c-article__cate">
                        <dt>Category</dt>
                        <dd><Link to={`/blogs/${cate.slug}`}>{cate.name}</Link></dd>
                    </dl>
                </article>
                <SideBar></SideBar>
            </div>
        </Layout>
    )
}

export default BlogPostTemplate

export const Head = ({ data, location }) => {
    const seoData = {}
    return <Seo data={seoData} />
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
        category {
            name
            slug
        }
      }
    }
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
    docImage: file(
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

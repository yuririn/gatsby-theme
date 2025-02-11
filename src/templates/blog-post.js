import React, { createElement } from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo"
import Layout from '../components/layout';
import SideBar from '../components/SideBar';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import rehypeReact from "rehype-react"



import Msg from "../components/posts/modueles/msg";
import RelativeCard from "../components/posts/modueles/relative-card";

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        card: RelativeCard,
        msg: Msg,
    },
}).Compiler
    
// console.log(renderAst)
const BlogPostTemplate = ({ data, location }) => {
    const { title, siteUrl } = data.site.siteMetadata
    const post = data.markdownRemark.frontmatter
    const slug = data.markdownRemark.fields.slug
    const docImage = data.docImage
    const render = data.markdownRemark.htmlAst;
    return (
        <Layout location={location} title={post.title}>
            <div className="l-section l-container--blog">
                <article className="c-blog-header">
                    <GatsbyImage
                        image={getImage(docImage)}
                        alt={post.title}
                    />
                    <h1>{post.title}</h1>
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
                                    date={post.frontmatter.modifieddate.replace(/\./g, "-")}
                                >
                                    {post.frontmatter.modifieddate}
                                </time>
                            </dd>
                        ) : (
                            ""
                        )}
                    </dl>
                    <ul className="c-card__tags">
                        {post.tags.length > 0 && post.tags.map((item)=>{
                            return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
                        })}
                    </ul>
                    <section itemProp="articleBody">
                        {renderAst(render)}
                    </section>
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

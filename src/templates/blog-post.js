import React from "react"
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
import PrevAndNextNav from "../components/posts/PrevAndNextNav";
import Faq from "../components/posts/Faq";
import BreadCrumbList from "../components/common/BreadcrumbList";
import { siteMetadata } from "../../gatsby-config";
import RelatedPosts from "../components/posts/RelatedPosts";

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

    const { title, siteUrl, category, blogName } = siteMetadata
    const post = data.markdownRemark.frontmatter
    const slug = data.markdownRemark.fields.slug
    const docImage = data.docImage
    const render = data.markdownRemark.htmlAst;
    const cate = category.filter(i=>i.slug === post.cateId)[0]
    const perfectUrl = `${siteUrl}${location.pathname}`
    const perfectTitle = encodeURI(post.title + "|" + title)
    const {previous, next } = data;
    const breadCrumbList = {
        parents: [
            { path: '/blogs/', name: blogName },
            { path: `/blogs/${cate.slug}/`, name: cate.name },
            { path: `/blogs/tags/${post.tags[0]}/`, name: post.tags[0] }
        ],
        current: post.title
    }
    return (
        <Layout location={location} title={post.title}>
            <header className={`c-blog-header--${cate.slug}`} id="keyvisual">
                <GatsbyImage
                    image={getImage(docImage)}
                    alt={post.title}
                />

                <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
            </header>
            
            <div className="l-section l-container--article">
                <Sns url={perfectUrl} title={perfectTitle}></Sns>
                <div>

                    <article className="c-article">
                        <h1 className="c-article__heading">{post.title}</h1>
                        <Date date={post.date} modifiedDate={post.modifieddate}></Date>
                        <Tags tags={post.tags}></Tags>
                        
                        <section itemProp="articleBody" className="c-post-body">
                            {renderAst(render)}
                            {post.faq &&<Faq data={post.faq}></Faq>}
                        </section>
                        <dl class="c-article__cate">
                            <dt>Category</dt>
                            <dd><Link to={`/blogs/${cate.slug}`}>{cate.name}</Link></dd>
                        </dl>
                        <PrevAndNextNav prev={previous} next={next}></PrevAndNextNav>
                    </article>
                    <aside>
                        <h2 className="c-heading__aside">関連記事</h2>
                        <RelatedPosts id={slug} category={post.cateId} tags={post.tags}></RelatedPosts>
                    </aside>
                </div>
                <SideBar id={slug}></SideBar>
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

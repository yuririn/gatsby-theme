import React, {useEffect} from "react"
import { Link, graphql } from "gatsby"

import rehypeReact from "rehype-react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/common/bread-crumb-list"
import dateReplace from "../utils/datereplace"
import Sns from "../components/blogs/sns"
import Prof from "../components/blogs/small-prof"
import Toc from "../components/common/table-of-contents"
import Kyle from "../components/blogs/blog-parts/kyle"
import Sidebar from "../components/common/sidebar"
import RelativeCard from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Ad from "../components/common/ad"
import Faq from "../components/blogs/faq";
import { siteMetadata } from "./../../gatsby-config";
import PrevAndNextNav from "../components/blogs/prev-next-nav"
import RelatedPosts from "./../components/blogs/related-list"
import "../scss/objects/components/_page-header.scss"

// カスタムコンポーネントを作成
const TableWrapper = ({ children }) => (
  <div className="table-wrapper"><table>{children}</table></div>
);

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: RelativeCard,
    msg: Msg,
    prof: Prof,
    ad: Ad,
    kyle: Kyle,
    toc: Toc,
    table: TableWrapper,
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
    const { slug } = data.markdownRemark.fields
  const post = data.markdownRemark
  const faq = post?.frontmatter.faq
    const siteTitle = siteMetadata.title || `Title`
  const { previous, next } = data
  const perfectUrl = `${siteMetadata.siteUrl}${location.pathname}`;
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

  useEffect(() => {
    const titles = document.querySelectorAll(".gatsby-code-title");
    titles.forEach((title) => {
      if (!title.querySelector(".gatsby-code--copy")) {
        const button = document.createElement("span");
        button.innerText = "COPY";
        button.className = "gatsby-code--copy";
        button.onclick = () => {
          const codeBlock = title.nextElementSibling.querySelector('pre[class*="language-"]');
          if (codeBlock) {
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(() => {
              button.innerText = "COPIED!";
              setTimeout(() => {
                button.innerText = "COPY";
              }, 2000);
            }).catch((err) => {
              console.error("Failed to copy code: ", err);
            });
          }
        };
        title.appendChild(button);
      }
    });
  }, []);

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
      <div className="l-section l-container--article">
        <Sns url={perfectUrl} title={perfectTitle}></Sns>
        <div>
          <article className="c-article">
            <h1 className="c-article__heading">{post.frontmatter.title}</h1>
            <Date date={post.frontmatter.date} modifiedDate={post.frontmatter.modifiedDate}></Date>
            <Tags tags={post.frontmatter.tags}></Tags>
            <section itemProp="articleBody" className="c-post-body">
              {renderAst(post.htmlAst)}
              {post.frontmatter.faq && <Faq data={post.frontmatter.faq}></Faq>}
            </section>
            <PrevAndNextNav prev={previous} next={next}></PrevAndNextNav>
          </article>
          <aside>
            <Ad location={location.pathname}></Ad>
            <h2 className="c-heading__aside" style={{marginTop:`32px`}}>関連記事</h2>
            <RelatedPosts id={slug} category={post.cateId} tags={post.tags}></RelatedPosts>
          </aside>
        </div>
        <Sidebar
          title={post.frontmatter.title}
          slug={post.fields.slug}
          location={location.pathname}
              ><Toc slug={slug}></Toc>
        </Sidebar>
      </div>
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

const Date = ({ date, modifiedDate }) => {
  return (<dl className="c-article__date">
    <dt>公開日</dt>
    <dd>
      <time date={dateReplace(date)}>
        {date}
      </time>
    </dd>
    {modifiedDate ? <dt>メンテナンス日</dt> : ""}
    {modifiedDate ? (
      <dd>
        <time
          date={dateReplace(modifiedDate)}
        >
          {modifiedDate}
        </time>
      </dd>
    ) : (
      ""
    )}
  </dl>)
}

const Tags = ({ tags }) => {
  return (
    <ul className="c-article__tags">
      {tags.length > 0 && tags.map((item) => {
        return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
      })}
    </ul>
  )
}

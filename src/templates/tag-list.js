import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/img"
import AddTagLink from "../components/common/add-tag-link"
import Pagination from "../components/blogList/pagination"
import BreadCrumbList from "../components/common/bread-crumb-list"
import Tags from "../components/blogs/tag-list"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"

const tags = ({ pageContext, data, location }) => {
  const { current, page, tag } = pageContext

  const posts = data.allMarkdownRemark.nodes
  const yourData = {
    title : tag,
    description : `「${tag}」の記事一覧。${data.site.siteMetadata.description}`,
    location : location,
    type : "tag-list"
  }
  return (
    <Layout location={location} title="銀ねこアトリエ">
      <Seo
        data={yourData}
      />
      <div className="p-pageHeader">
        <div className="p-pageHeader__main">
          <h1 className="p-pageHeader__heading">{tag}</h1>
          <p>現在 {data.allMarkdownRemark.totalCount} 記事あります</p>
        </div>
        <Img
          source="common/ganre_common.jpg"
          className="p-pageHeader__img"
          alt={tag}
        ></Img>
      </div>
      <div className="l-container">
        <BreadCrumbList type="blog" current={tag} />
        <section className="p-section">
          <h2 className="c-heading--lg">最新記事</h2>
          <ol className="c-grid">
            {posts.map((post, index) => {
              return (
                <li
                  className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                  key={`article-${index}`}
                  role="article"
                >

                    <Link to={post.fields.slug} className="p-entryCard__img">
                      {post.frontmatter.hero ? (
                        <Img
                          source={post.frontmatter.hero}
                          alt={post.frontmatter.title}
                        />
                      ) : (
                        <Img
                          source="common/dummy.png"
                          alt={post.frontmatter.title}
                        />
                      )}
                      <div className="p-entryCard__date">
                        <time date={post.frontmatter.date.replace(/\./g, "-")}>
                          {post.frontmatter.date}
                        </time>
                      </div>
                    </Link>
                    <Link to={post.fields.slug} className="p-entryCard__body">
                      <h3 className="p-entryCard__heading">
                        {post.frontmatter.title}
                      </h3>
                    </Link>
                    <div className="p-entryCard__footer">
                      <AddTagLink tags={post.frontmatter.tags} />
                    </div>
                </li>
              )
            })}
          </ol>
        </section>
        {page !== 1 ? (
          <Pagination
            num={page}
            current={current}
            type={`tags/${tag}/`}
          ></Pagination>
        ) : (
          ""
        )}
        <aside className="BigWhite">
          <div className="l-container">
            <section className="p-box--gray p-section u-text-center">
              <h2 className="c-heading--lg">人気のタグ</h2>
              <Tags />
            </section>
          </div>
          <div className="l-container">
            <section className="p-section u-text-center">
              <h2 className="c-heading--lg">人気のジャンル</h2>
              <Genre />
            </section>
          </div>
          <Prof />
        </aside>
      </div>
    </Layout>
  )
}

export default tags

export const pageQuery = graphql`
  query tagsQyery($limit: Int!, $skip: Int!, $tag: [String]) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { pagetype: { eq: "blog" }, tags: { in: $tag } } }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
          description
          cateId
          hero
          tags
        }
      }
    }
  }
`

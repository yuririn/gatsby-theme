import React from "react"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "./../../gatsby-config"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/common/img"
import AddTagLink from "../components/common/add-tag-link"
import Pagination from "../components/blogList/pagination"
import BreadCrumbList from "../components/common/bread-crumb-list"
// import Tags from "../components/blogs/tag-list"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"

const tags = ({ pageContext, data, location }) => {
  const { current, page, tag } = pageContext

  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title="銀ねこアトリエ">
      <div className="p-pageHeader">
              <div className="p-pageHeader__main" id="keyvisual">
          <h1 className="p-pageHeader__heading">{tag}</h1>
          <p>現在 {data.allMarkdownRemark.totalCount} 記事あります</p>
        </div>
        <Img
          source="common/ganre_common.jpg"
          className="p-pageHeader__img"
          alt={tag}
        ></Img>
      </div>
      <BreadCrumbList type="archive" current={tag} />
      <section className="p-section l-container">
          <h2 className="p-heading--lg">最新記事</h2>
          <ol className="c-grid">
            {posts.map((post, index) => {
                const { fields, frontmatter } = post
                const path = `/blogs/${fields.slug}`
              return (
                <li
                  className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                  key={`article-${index}`}
                  role="article"
                >

                    <Link to={path} className="p-entryCard__img">
                      {frontmatter.hero ? (
                        <Img
                          source={frontmatter.hero}
                          alt={frontmatter.title}
                        />
                      ) : (
                        <Img
                          source="common/dummy.png"
                          alt={frontmatter.title}
                        />
                      )}
                      <div className="p-entryCard__date">
                        <time date={frontmatter.date.replace(/\./g, "-")}>
                          {frontmatter.date}
                        </time>
                      </div>
                    </Link>
                    <Link to={path} className="p-entryCard__body">
                      <h3 className="p-entryCard__heading">
                        {frontmatter.title}
                      </h3>
                    </Link>
                    <div className="p-entryCard__footer">
                      <AddTagLink tags={frontmatter.tags} />
                    </div>
                </li>
              );
            })}
          </ol>
          {page !== 1 ? (
            <Pagination
              num={page}
              current={current}
              type={`tags/${tag}/`}
            ></Pagination>
          ) : (
            ""
          )}
      </section>
      <aside className="l-container">
        <section className="p-section u-text-center">
          <h2 className="p-heading--lg">人気のジャンル</h2>
          <Genre />
        </section>
        <Prof />
      </aside>
    </Layout>
  );
}

export default tags

export const Head = ({ location, pageContext }) => {
    const { tag } = pageContext
    const blogName = siteMetadata.blogName
    const blogDescription = siteMetadata.blogDescription
    const list = [
        {
            name: siteMetadata.blogName,
            path: '/blogs/',
            type: `WebPage`
        },
        {
            name: tag,
            path: `/blogs/tags/${tag}`,
            type: `WebPage`
        }
    ]
    return <Seo
        location={location?.pathname.replace(/page\/([0-9])+\//, "")}
        data={{
            title: `${tag} ${blogName}`,
            template: 'archive',
            description: `${tag} に関する記事。${blogDescription}`,
            list: list,
        }}
    />
}


export const pageQuery = graphql`query tagsQyery($limit: Int!, $skip: Int!, $tag: [String]) {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark(
    limit: $limit
    skip: $skip
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {pageType: {eq: "blog"}, tags: {in: $tag}}}
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
}`

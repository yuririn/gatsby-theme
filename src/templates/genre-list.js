import React from "react"

// Components
import Img from "../components/img"
import Layout from "../components/layout"
import Seo from "../components/seo"
import AddTagLink from "../components/common/add-tag-link"
import Pagination from "../components/blogList/pagination"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import BreadCrumbList from "../components/common/bread-crumb-list"
// import TagsList from "../components/blogs/tag-list"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"

const category = ({ pageContext, data, location }) => {
  const { cateSlug, current, page } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  const cateMeta = siteMetadata.category.filter(cate => cate.slug === cateSlug)

  let cateName = cateMeta[0].name
  let cateDescription = cateMeta[0].description
  const yourData = {
    title : `${cateName}`,
    description : `「${cateName}」の記事一覧。${cateDescription}。${data.site.siteMetadata.description}`,
    location : location,
    type : "genre-list"
  }

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Seo
        data={yourData}
      />

      <div className="p-pageHeader">
        <div className="p-pageHeader__main">
          <h1 className="p-pageHeader__heading">{cateName}</h1>
          <p>{cateDescription}</p>
        </div>
        <Img
          source={`common/genre-${cateSlug}.jpg`}
          className="p-pageHeader__img"
        ></Img>
      </div>
      <div className="page-template-archive">
        <div className="l-container">
          <BreadCrumbList type="blog" current={cateName} />
          {totalCount === 0 ? (
            <p className="p-txt-center">
              {category.name}に関する記事はまだありません
            </p>
          ) : (
            ""
          )}
          <section className="p-section">
            <h2 className="c-heading--lg">最新記事</h2>
            <ol className="c-grid">
              {edges.map(({ node }) => {
                const { slug } = node.fields
                const { title, hero, date, tags } = node.frontmatter
                return (
                  <li
                    className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                    key={slug}
                    role="article"
                  >

                      <Link to={slug} className="p-entryCard__img">
                        {hero ? (
                          <Img source={hero} alt={title} />
                        ) : (
                          <Img source="common/dummy.png" alt="" />
                        )}
                        <div className="p-entryCard__date">
                          <time date={date.replace(/\./g, "-")}>{date}</time>
                        </div>
                      </Link>
                      <Link to={slug} className="p-entryCard__body">
                        <h3 className="p-entryCard__heading">{title}</h3>
                      </Link>
                      <div className="p-entryCard__footer">
                        <AddTagLink tags={tags} />
                      </div>

                  </li>
                );
              })}
            </ol>
          </section>
          {page > 1 ? (
            <Pagination
              num={page}
              current={current}
              type={`${cateSlug}/`}
            ></Pagination>
          ) : (
            ""
          )}
        </div>
         <aside className="l-container">
          <section className="p-section u-text-center">
            <h2 className="c-heading--lg">人気のジャンル</h2>
            <Genre />
          </section>
          <Prof />
        </aside>
      </div>
    </Layout>
  );
}

export default category

export const pageQuery = graphql`query ($cateSlug: String, $limit: Int!, $skip: Int!) {
  site {
    siteMetadata {
      description
    }
  }
  allMarkdownRemark(
    limit: $limit
    skip: $skip
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {cateId: {eq: $cateSlug}}}
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
          hero
          cateId
          tags
        }
      }
    }
  }
}`

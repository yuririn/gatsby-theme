import React from "react"
import PropTypes from "prop-types"

// Components
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/common/tagsArchive"
import Pagination from "../components/blogList/pagination"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import BreadCrumbList from "../components/common/breadCrumbList"

const category = ({ pageContext, data, location }) => {
  const { cateSlug, current, page } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  // console.log(siteMetadata.category)
  let cateName = ""
  let cateDescription = ""
  siteMetadata.category.forEach(cate => {
    if (cate.slug === cateSlug) {
      cateDescription = cate.description
      cateName = cate.name
    }
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <SEO
        title={`${cateName}`}
        description={cateDescription}
        location={location}
        type="archive"
      />

      <div className="p-pageHeader">
        <div className="p-pageHeader__main">
          <h1 className="p-pageHeader__heading">{cateName}</h1>
          <p>{cateDescription}</p>
        </div>
        <Image
          filename={`${cateSlug}.jpg`}
          className="p-pageHeader__img"
        ></Image>
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
            <div className="c-grid">
              {edges.map(({ node }) => {
                const { slug } = node.fields
                const { title, hero, date, tags } = node.frontmatter
                return (
                  <article
                    className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
                    key={slug}
                  >
                    <Link to={slug} className="p-entryCard__img">
                      {hero ? (
                        <Image filename={hero} />
                      ) : (
                        <Image filename="common/dummy.png" />
                      )}
                      <div className="p-entryCard__date">
                        <div className="p-entryCard__date">
                          <time date={date.replace(/\./g, "-")}>{date}</time>
                        </div>
                      </div>
                    </Link>
                    <Link to={slug} className="p-entryCard__body">
                      <h3 className="p-entryCard__heading">{title}</h3>
                    </Link>
                    <div className="p-entryCard__footer">
                      <TagList tags={tags} />
                    </div>
                  </article>
                )
              })}
            </div>
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
      </div>
    </Layout>
  )
}

category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default category

export const pageQuery = graphql`
  query($cateSlug: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { cateId: { eq: $cateSlug } } }
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
            category
            tags
          }
        }
      }
    }
  }
`

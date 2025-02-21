import React from "react"

// Components
import Img from "../components/common/img"
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
import "../scss/objects/components/_page-header.scss"
const { category, blogName } = siteMetadata

const genre = ({ pageContext, data, location }) => {
  const { cateSlug, current, page } = pageContext
  const { edges } = data.allMarkdownRemark

  const cateMeta = siteMetadata.category.filter(cate => cate.slug === cateSlug)
  

  const cateName = cateMeta[0].name
  const cateDescription = cateMeta[0].summary
  const slug = cateMeta[0].slug
  const enName = cateMeta[0].enName

  // console.log(`slug ${slug}`)

  const breadCrumbList = {
    parents: [
      { path: '/blogs/', name: blogName },
    ],
    current: cateName
  }

  return (
    <Layout location={location} title={siteMetadata.title}>
      <header className={`c-page-header--${slug}`} id="keyvisual">
        <div>
          <h1 className="en"><span>{enName}</span>{cateName}</h1>
          <p>{cateDescription}</p>
        </div>
        <BreadCrumbList list={breadCrumbList}></BreadCrumbList>
      </header>
        <section className="p-section l-container">
          <h2 className="p-heading--lg">最新記事</h2>
          <ol className="c-grid">
            {edges.map(({ node }) => {
                const path = `/blogs/${node.fields.slug}`
              const { title, hero, date, tags } = node.frontmatter
              return (
                <li
                  className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                      key={path}
                  role="article"
                >

                      <Link to={path} className="p-entryCard__img">
                      {hero ? (
                        <Img source={hero} alt={title} />
                      ) : (
                        <Img source="common/dummy.png" alt="" />
                      )}
                      <div className="p-entryCard__date">
                        <time date={date.replace(/\./g, "-")}>{date}</time>
                      </div>
                    </Link>
                      <Link to={path} className="p-entryCard__body">
                      <h3 className="p-entryCard__heading">{title}</h3>
                    </Link>
                    <div className="p-entryCard__footer">
                      <AddTagLink tags={tags} />
                    </div>

                </li>
              );
            })}
          </ol>
          {page !== 1 ? (
            <Pagination
              num={page}
              current={current}
              type={`${cateSlug}/`}
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

export default genre

/**
 * 
 * @param {String} slug カテゴリーのスラッグ
 * @param {Object} category すべてのカテゴリー
 * @returns slugと一致するカテゴリー
 */
const getCatetory = (slug, category) => {
    if (!slug || !category) return
    return category.filter(item => item.slug === slug)[0]
}

export const Head = ({ location, pageContext }) => {
    const { cateSlug } = pageContext
    const cateItem = getCatetory(cateSlug, category)
    const list = [
        {
            name: siteMetadata.blogName,
            path: '/blogs/',
            type: `WebPage`
        },
        {
            name: cateItem.name,
            path: `/blogs/${cateItem.slug}`,
            type: `WebPage`
        }
    ]
    return <Seo
        location={location.pathname?.replace(/page\/([0-9])+\//, "")}
        data={{
            title: cateItem.name,
            template: 'archive',
            description: cateItem.description,
            list: list,
            headerType: cateItem.slug
        }}
    />
}

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



import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/common/img"
import AddTagLink from "../components/common/add-tag-link"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"
import Pagination from "../components/common/pagination"
import { siteMetadata } from "../../gatsby-config"
import BreadCrumbList from "../components/common/bread-crumb-list"
import Ad from '../components/common/ad'

const blogs = ({ pageContext, data, location }) => {
  const { cateSlug, current, page } = pageContext
  const posts = data.allMdx.nodes
  const cateMeta = siteMetadata.category.filter(cate => cate.slug === cateSlug)
  const cateName = cateMeta[0].name
  const cateDescription = cateMeta[0].description
  return (
    <Layout location={location} title={siteMetadata.title}>
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
      <BreadCrumbList type="blog" current={cateName}/>
      <section className="p-section l-container">
        <ol className="c-grid">
          {posts.map((post, index) => {
            return (
              <li
                className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                key={`article-${index}`} role="article"
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
            );
          })}
        </ol>
        {page !== 1 && (<Pagination num={page} current={current} type={`${cateSlug}/`}></Pagination>)}
      </section>
      <aside className="l-container">
        <div className="u-mblg">
      <Ad></Ad>
      </div>
        <section className="p-section u-text-center">
          <h2 className="c-heading--lg">人気のジャンル</h2>
          <Genre />
        </section>
        <div className="u-mblg">
      <Ad></Ad>
      </div>
        <Prof />
      </aside>
    </Layout>
  );
}

export default blogs

export const Head = ({pageContext, data, location }) => {
  const { cateSlug } = pageContext
  const cateMeta = siteMetadata.category.filter(cate => cate.slug === cateSlug)
  const cateName = cateMeta[0].name
  const cateDescription = cateMeta[0].description
  const yourData = {
    title : cateName,
    description : `${cateName}の記事一覧。${cateDescription}`,
    location : location,
    type : "blog-list"
  }
  return (
    <Seo
      data={yourData}
    />
  )
}

export const pageQuery = graphql`query ($cateSlug: String, $limit: Int!, $skip: Int!) {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMdx(
    limit: $limit
    skip: $skip
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {cateId: {eq: $cateSlug}}}
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

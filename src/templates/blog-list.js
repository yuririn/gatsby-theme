

import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "../components/common/img"
import AddTagLink from "../components/common/add-tag-link"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"
import Pagination from "../components/common/pagination"
import BreadCrumbList from "../components/common/bread-crumb-list"
import Seo from "./../components/seo";
import Ad from "../components/common/ad"

const blogs = ({ pageContext, data, location }) => {
  const { current, page } = pageContext
  const posts = data.allMdx.nodes
  return (
    <Layout location={location} title="ノマドブログ">
      <div className="p-pageHeader">
        <div className="p-pageHeader__main">
          <h1 className="p-pageHeader__heading">ノマドブログ</h1>
          <p>現在 {data.allMdx.totalCount} 記事あります</p>
        </div>
        <Img
          source="common/ganre_common.jpg"
          alt="ノマドブログ"
          className="p-pageHeader__img"
        ></Img>
      </div>
      <BreadCrumbList type="archive"/>
      <section className="p-section l-container">
        <h2 className="c-heading--lg">最新記事</h2>
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
        {page !== 1 && (<Pagination num={page} current={current} type=""></Pagination>)}
      </section>
      <div className="l-container u-mblg">
      <Ad location={location.pathname}></Ad>
      </div>
      <aside className="l-container">
        <section className="p-section u-text-center">
          <h2 className="c-heading--lg">人気のジャンル</h2>
          <Genre />
        </section>
        <div className="u-mblg">
      <Ad location={location.pathname}></Ad>
      </div>
        <Prof />
      </aside>
    </Layout>
  );
}

export default blogs

export const Head = ({ data, location }) => {
  const yourData = {
    title : "ノマドブログ",
    description : `「銀ねこアトリエ」の最新ブログ一覧(現在${data.allMdx.totalCount}記事）。${data.site.siteMetadata.description}`,
    location : location,
  }
  return (
    <Seo
      data={yourData}
    />
  )
}

export const pageQuery = graphql`query blosQyery($limit: Int!, $skip: Int!) {
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
    filter: {frontmatter: {pagetype: {eq: "blog"}}}
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

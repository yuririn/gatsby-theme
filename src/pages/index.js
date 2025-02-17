import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"
import Img from "../components/img"
import Search from "../components/search"

import Layout from "../components/layout"
import FirstView from "../components/top-first-view"
import FovoriteList from "../components/common/favorites"
import AddTagLink from "../components/common/add-tag-link"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"
import Ad from '../components/common/ad'
import dateReplace from "../utils/datereplace"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  let cardClass = "p-entryCard c-grid__item--md6 c-grid__item--lg4"

  return (
    <Layout location={location} title={siteTitle}>
      <FirstView />
          <div className="p-section l-container">
        <h2 className="c-heading--lg">最新の記事</h2>
        <ol className="c-grid">
          {posts.map((post, i) => {
            if (i === 0) {
              cardClass =
                "p-entryCard c-grid__item--md6 c-grid__item--lg4 is-first"
            } else if (i > 2) {
              cardClass =
                "p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
            } else {
              cardClass = "p-entryCard c-grid__item--md6 c-grid__item--lg4"
            }
            const {fields, frontmatter} = post
            const path = `/blogs/${fields.slug}`

            return (
              <>
              { i === 5 ? (
                <>
                <li key={`_post${i}`} className={cardClass}>
                  <Ad location={location.pathname}></Ad>
                </li>
                <li key={`post${i}`} className={cardClass} role="article">
                    <Link to={path} className="p-entryCard__img">
                    <Img
                      source={frontmatter.hero}
                      alt={frontmatter.title}
                      key={frontmatter.title}
                    />
                    <div className="p-entryCard__date">
                      <time
                        date={dateReplace(frontmatter.date)}
                      >
                        {frontmatter.date}
                      </time>
                    </div>
                  </Link>
                    <Link to={path} className="p-entryCard__body">
                    <h3 className="p-entryCard__heading">
                      {frontmatter.title}
                    </h3>
                    {i === 0 ? <p>{post.frontmatter.description}</p> : ""}
                  </Link>
                  <div className="p-entryCard__footer">
                    <AddTagLink tags={frontmatter.tags} />
                  </div>
              </li>
                </>

                )
                :( <li key={`post${i}`} className={cardClass} role="article">
                    <Link to={path} className="p-entryCard__img">
                    <Img
                      source={frontmatter.hero}
                      alt={frontmatter.title}
                      key={frontmatter.title}
                    />
                    <div className="p-entryCard__date">
                      <time
                        date={dateReplace(frontmatter.date)}
                      >
                        {frontmatter.date}
                      </time>
                    </div>
                  </Link>
                  <Link to={`/blogs/${post.frontmatter.slug}`} className="p-entryCard__body">
                    <h3 className="p-entryCard__heading">
                      {frontmatter.title}
                    </h3>
                    {i === 0 ? <p>{frontmatter.description}</p> : ""}
                  </Link>
                  <div className="p-entryCard__footer">
                    <AddTagLink tags={frontmatter.tags} />
                  </div>
              </li>
              )}
              </>
            );
          })}
        </ol>
        <p className="u-text-center u-mblg l-container">
          <Link to="/blogs/" className="p-btn--detail">
            Read More Blog
          </Link>
        </p>
        <h2 className="c-heading--lg">記事を検索する</h2>
        <Search></Search>
        <Ad location={location.pathname}></Ad>
        <FovoriteList type="web" />
        <Ad location={location.pathname}></Ad>
        <FovoriteList type="life" />
        <Ad location={location.pathname}></Ad>
        <FovoriteList type="career" />
        <Ad location={location.pathname}></Ad>
        <h2 className="c-heading--lg">人気のジャンル</h2>
        <Genre />
      </div>
      <Prof></Prof>
      <Ad location={location.pathname}></Ad>
    </Layout>
  );
}

export default BlogIndex

export const Head = ({ data, location }) => (
    <Seo
        location={location.pathname}
        data={
            { template: 'index' }
        }
    />
)

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }

  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    limit: 9
    filter: {frontmatter: {pageType: {eq: "blog"}}}
  ) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        description
        title
        tags
        cateId
        hero
        pageType
      }
    }
  }
}`


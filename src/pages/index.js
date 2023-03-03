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
import Adsense from '../components/common/Ad'

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

            console.log(i === 4)

            return (
              <>
              { i === 4 ? (
                <>
                <li key={`_post${i}`} className={cardClass}>
                  <Adsense type="display"></Adsense>
                </li>
                <li key={`post${i}`} className={cardClass} role="article">
                  <Link to={post.fields.slug} className="p-entryCard__img">
                    <Img
                      source={post.frontmatter.hero}
                      alt={post.frontmatter.title}
                      key={post.frontmatter.title}
                    />
                    <div className="p-entryCard__date">
                      <time
                        date={post.frontmatter.date.replace(/\./g, "-")}
                      >
                        {post.frontmatter.date}
                      </time>
                    </div>
                  </Link>
                  <Link to={post.fields.slug} className="p-entryCard__body">
                    <h3 className="p-entryCard__heading">
                      {post.frontmatter.title}
                    </h3>
                    {i === 0 ? <p>{post.frontmatter.description}</p> : ""}
                  </Link>
                  <div className="p-entryCard__footer">
                    <AddTagLink tags={post.frontmatter.tags} />
                  </div>
              </li>
                </>

                )
                :( <li key={`post${i}`} className={cardClass} role="article">
                  <Link to={post.fields.slug} className="p-entryCard__img">
                    <Img
                      source={post.frontmatter.hero}
                      alt={post.frontmatter.title}
                      key={post.frontmatter.title}
                    />
                    <div className="p-entryCard__date">
                      <time
                        date={post.frontmatter.date.replace(/\./g, "-")}
                      >
                        {post.frontmatter.date}
                      </time>
                    </div>
                  </Link>
                  <Link to={post.fields.slug} className="p-entryCard__body">
                    <h3 className="p-entryCard__heading">
                      {post.frontmatter.title}
                    </h3>
                    {i === 0 ? <p>{post.frontmatter.description}</p> : ""}
                  </Link>
                  <div className="p-entryCard__footer">
                    <AddTagLink tags={post.frontmatter.tags} />
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
        <Adsense type="display"></Adsense>
        <FovoriteList type="web" />
        <Adsense type="display"></Adsense>
        <FovoriteList type="life" />
        <Adsense type="display"></Adsense>
        <FovoriteList type="career" />
        <Adsense type="display"></Adsense>
        <h2 className="c-heading--lg">人気のジャンル</h2>
        <Genre />
      </div>
      <Prof></Prof>
      <Adsense type="display"></Adsense>
    </Layout>
  );
}

export default BlogIndex

export const Head = ({ data, location }) => (
 <Seo
 data={{title:data.site.siteMetadata?.title || `Title`, location:location}}
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
    filter: {frontmatter: {pagetype: {eq: "blog"}}}
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
        pagetype
      }
    }
  }
}`


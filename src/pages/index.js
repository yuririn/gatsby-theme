import * as React from "react"
import { Link, graphql } from "gatsby"

// import Seo from "../components/seo"
import Img from "../components/common/img"
import Search from "../components/search"

import Layout from "../components/layout"
import FirstView from "../components/top-first-view"
// import FovoriteList from "../components/common/favorites"
import AddTagLink from "../components/common/add-tag-link"
import Genre from "../components/common/genre"
import Prof from "../components/common/profile"
import Seo from "./../components/seo";

import { siteMetadata } from "./../../gatsby-config"

const BlogIndex = ({ data, location }) => {
  const siteTitle = siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes
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

              return (
                <>
                { i === 4 ? (
                  <>
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
                        <AddTagLink tags={post.frontmatter.tags} key={`post${i}`}/>
                      </div>
                    </li>
                  </>
                  ):(
                  <>
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
                        <AddTagLink tags={post.frontmatter.tags} key={`post${i}`}/>
                      </div>
                    </li>
                  </>
                )}
              </>
              )
           })}
        </ol>
      </div>
      <p className="u-text-center u-mblg l-container">
        <Link to="/blogs/" className="p-btn--detail">
          Read More Blog
        </Link>
      </p>
      <div className="l-container p-section">
        <h2 className="c-heading--lg">記事を検索する</h2>
          <Search></Search>
        <h2 className="c-heading--lg ">人気のジャンル</h2>
        <Genre />
      </div>
      <Prof></Prof>
    </Layout>
  );
}

export default BlogIndex

export const Head = ({ location }) => (
 <Seo
  data={{location: location}}
 />
)

export const pageQuery = graphql`{
  allMdx(
    sort: {frontmatter: {date: DESC}}
    limit: 9
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        description
        hero
        title
        tags
      }
    }
  }
}`


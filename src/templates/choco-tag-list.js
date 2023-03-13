import * as React from "react"
import { Link, graphql } from "gatsby"

import Img from "../components/common/img";
import Seo from "../components/seo"

import BreadCrumbList from "../components/common/bread-crumb-list"
import ChocoLayout from "../components/choco-layout"
import Ad from "../components/common/ad";

import {siteMetadata} from "../../gatsby-config"

const ChocoTagList = ({ pageContext, data, location }) => {
  const {  tag } = pageContext
  const posts = data.allMdx.nodes
 return (
    <ChocoLayout location={location}>
      <section className="l-main">
      <BreadCrumbList type="ad-tag" current={tag}/>
        <h2 className="c-heading--lg">{tag}に関する記事</h2>
        {posts.length !== 0 && (
          <ul className="c-choco-list">
            { posts.map((post, i) => {
          return (
            <li key={`post${i}`} role="article">
              <Link to={post.fields.slug}>
              <Img
                source={post.frontmatter.hero}
                alt={post.frontmatter.title}
                key={post.frontmatter.title}
              />
              <h3 className="c-choco-list__heading">
                {post.frontmatter.title}
              </h3>
              </Link>
            </li>
          )
         })}
          </ul>
         )}
         <Ad location={location.pathname}></Ad>
        </section>
    </ChocoLayout>
  );
}

export default ChocoTagList

export const Head = ({ data, pageContext, location }) => {
  const { tag } = pageContext
  const meta = siteMetadata.ad
  const yourData = {
    title : `${tag}の記事一覧`,
    description : `${tag}の最新記事一覧(現在${data.allMdx.totalCount}記事）。${meta.description}。`,
    location : location,
    template : "choco-tag-list"
  }
  return (
    <Seo
      data={yourData}
    />
  )
}

export const pageQuery = graphql`query tagsQyery($limit: Int!, $skip: Int!, $tag: [String]) {
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
    filter: {frontmatter: {pagetype: {eq: "ad"}, tags: {in: $tag}}}
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

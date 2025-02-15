import * as React from "react"
import { graphql } from "gatsby"
import Search from "./../components/search"
import Layout from "./../components/layout"
import Seo from "./../components/seo/seo"
import InfiniteScrollComponent from "./../components/posts/infinite-scroll-component";
import { siteMetadata } from "./../../gatsby-config"
import BreadCrumbList from "./../components/common/breadcrumblist"
const { category } = siteMetadata

const CategoryList = ({ data, location, pageContext }) => {
    const { title, totalCount, slug } = pageContext
    const blogName = siteMetadata.blogName
    const headerClass = `c-page-header--${slug}`
    const cateItem = getCatetory(slug, category)
    const posts = data.allMarkdownRemark.nodes;
    const breadCrumbList = {
        parents: [
            { path: '/blogs/', name: blogName },
        ],
        current: title
    }
    return (
        <Layout location={location} title={title}>
            <header className={headerClass} id="keyvisual">
                <div>
                    <h1 className="en"><span>{cateItem.enName}</span>{cateItem.summary}</h1>
                    <p>現在  {totalCount} 記事あります</p>
                </div>
                <BreadCrumbList list={breadCrumbList} ></BreadCrumbList>
            </header>
            <div className="l-section l-container-archive">

                <InfiniteScrollComponent posts={posts} />
                <div className="l-container-archive__sticky-area">
                    <Search></Search>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryList

/**
 * 
 * @param {String} slug カテゴリーのスラッグ
 * @param {Object} category すべてのカテゴリー
 * @returns slugと一致するカテゴリー
 */
const getCatetory = (slug, category) => {
    if(!slug||!category) return 
    return category.filter(item => item.slug === slug)[0]
}
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export const Head = ({  location, pageContext }) => {
    const { slug } = pageContext
    const cateItem = getCatetory(slug, category)
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
        location={location}
        data={{
            title: cateItem.name,
            template: 'archive',
            description: cateItem.description,
            list: list
        }}
    />
}
// data={{
//     template: 'archive',
//     title: cateItem.name,
//     description: siteMetadata.description
// }}
export const query = graphql`
  query CategoryListBySlug(
    $slug: String
  ) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {pageType: {eq: "blog"}, cateId: {eq: $slug}}}
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          tags
          cateId
          hero
        }
      }
    }
  }
`;

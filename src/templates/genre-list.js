import React from "react"
import { graphql } from "gatsby"
import Layout from "./../components/layout"
import Seo from "../components/seo"
import InfiniteScrollComponent from "../components/common/infinite-scroll";
import { siteMetadata } from "../../gatsby-config"
import BreadCrumbList from "../components/common/bread-crumb-list"
const { category } = siteMetadata;

const genre = ({ pageContext, data, location }) => {
  const { title, totalCount, slug } = pageContext
  const { blogName } = siteMetadata
  const cateItem = getCatetory(slug, category);
  const posts = data.allMarkdownRemark.nodes;
  const headerClass = `c-page-header--${slug}`

  const breadCrumbList = {
    parents: [
      { path: '/blogs/', name: blogName },
    ],
    current: title
  }

  return (
    <Layout location={location} title={siteMetadata.title}>
      <header className={headerClass} id="keyvisual">
        <div>
          <h1 className="en"><span>{cateItem.enName}</span>{cateItem.summary}</h1>
          <p>現在  {totalCount} 記事あります</p>
        </div>
        <BreadCrumbList list={breadCrumbList} ></BreadCrumbList>
      </header>
      <div className="l-section l-container-archive">
        <InfiniteScrollComponent posts={posts} location={location} />
      </div>
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

import React from "react";
import PropTypes from "prop-types";

// Components
import Img from "../components/img";
import Layout from "../components/layout";
import Seo from "../components/seo";
import AddTagLink from "../components/common/add-tag-link";
import Pagination from "../components/blogList/pagination";
import { Link, graphql } from "gatsby";
import { siteMetadata } from "../../gatsby-config";
import BreadCrumbList from "../components/common/bread-crumb-list";
import TagsList from "../components/blogs/tag-list";
import Genre from "../components/common/genre";
import ProfBig from "../components/common/profile";

const category = ({ pageContext, data, location }) => {
  const { cateSlug, current, page } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;

  // console.log(siteMetadata.category)
  let cateName = "";
  let cateEnName = "";
  let cateDescription = "";
  siteMetadata.category.forEach((cate) => {
    if (cate.slug === cateSlug) {
      cateDescription = cate.description;
      cateName = cate.name;
      cateEnName = cate.enName;
    }
  });
  return (
    <Layout location={location} title={siteMetadata.title}>
      <Seo
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
        <Img filename={`${cateSlug}.jpg`} className="p-pageHeader__img"></Img>
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
                const { slug } = node.fields;
                const { title, hero, date, tags } = node.frontmatter;
                return (
                  <article
                    className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small"
                    key={slug}
                  >
                    <Link to={slug} className="p-entryCard__img">
                      {hero ? (
                        <Img filename={hero} alt={title} />
                      ) : (
                        <Img filename="common/dummy.png" alt="" />
                      )}
                      <div className="p-entryCard__date">
                        <time date={date.replace(/\./g, "-")}>{date}</time>
                      </div>
                    </Link>
                    <Link to={slug} className="p-entryCard__body">
                      <h3 className="p-entryCard__heading">{title}</h3>
                    </Link>
                    <div className="p-entryCard__footer">
                      <AddTagLink tags={tags} />
                    </div>
                  </article>
                );
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
        <aside className="BigWhite">
          <div className="l-container">
            <section className="p-box--gray p-section u-text-center">
              <h2 className="c-heading--lg">人気のタグ</h2>
              <TagsList />
            </section>
          </div>
          <div className="l-container">
            <section className="p-section u-text-center">
              <h2 className="c-heading--lg">人気のジャンル</h2>
              <Genre />
            </section>
          </div>
          <ProfBig />
        </aside>
      </div>
    </Layout>
  );
};

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
};

export default category;

export const pageQuery = graphql`
  query ($cateSlug: String, $limit: Int!, $skip: Int!) {
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
            cateId
            tags
          }
        }
      }
    }
  }
`;
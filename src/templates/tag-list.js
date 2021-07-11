import React from "react";
import PropTypes from "prop-types";

// Components
import Img from "../components/img";
import Layout from "../components/layout";
import Seo from "../components/seo";
import AddTagLink from "../components/common/add-tag-link";
import { Link, graphql } from "gatsby";
import { siteMetadata } from "../../gatsby-config";
import Pagination from "../components/blogList/pagination";
import BreadCrumbList from "../components/common/bread-crumb-list";
import TagsList from "../components/blogs/tag-list";
import Genre from "../components/common/genre";
import ProfBig from "../components/common/profile";

const Tags = ({ pageContext, data, location }) => {
  const { tag, current, page } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  return (
    <Layout location={`blogs/tags/${tag}`} title={siteMetadata.title}>
      <Seo
        title={`${tag}に関する記事一覧`}
        description={siteMetadata.description}
        location={location}
        type="archive"
      />
      <div className="page-template-archive">
        <div className="p-pageHeader">
          <div className="p-pageHeader__main">
            <h1 className="p-pageHeader__heading">{tag}</h1>
            <p>{totalCount}記事あります</p>
          </div>
          <Img
            filename="common/ganre_common.jpg"
            className="p-pageHeader__img"
            alt={tag}
          ></Img>
        </div>
        <div className="l-container">
          <BreadCrumbList type="blog" current={tag} />
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
                        <Img filename={hero} />
                      ) : (
                        <Img filename="common/dummy.png" />
                      )}
                      <div className="p-entryCard__date">{date}</div>
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
          {page !== 1 ? (
            <Pagination
              num={page}
              current={current}
              type={`tags/${tag}/`}
            ></Pagination>
          ) : (
            ""
          )}
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
      </div>
    </Layout>
  );
};
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
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

export default Tags;

export const pageQuery = graphql`
  query ($tag: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            tags
          }
        }
      }
    }
  }
`;

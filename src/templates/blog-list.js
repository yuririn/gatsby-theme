import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Img from "../components/img";
import AddTagLink from "../components/common/add-tag-link";
import Pagination from "../components/blogList/pagination";
import BreadCrumbList from "../components/common/bread-crumb-list";
import Tags from "../components/blogs/tag-list";
import Genre from "../components/common/genre";
import ProfBig from "../components/common/profile";

const blogs = ({ pageContext, data, location }) => {
  const { current, page } = pageContext;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title="銀ねこアトリエ">
      <Seo
        title="ブログ一覧"
        description="「銀ねこアトリエ」の最新ブログ一覧です。30代で転職し、セブ島に移住。主には仕事で使ったチップスを書きだめています。フロントエンド技術、WordPress、海外移住、キャリアアップ、たまにふざけてます。"
        location={location}
        type="blogs"
      />
      <div className="p-pageHeader">
        <div className="p-pageHeader__main">
          <h1 className="p-pageHeader__heading">ブログ一覧</h1>
          <p>現在 {data.allMarkdownRemark.totalCount} 記事あります</p>
        </div>
        <Img
          filename="common/ganre_common.jpg"
          alt="ブログ一覧"
          className="p-pageHeader__img"
        ></Img>
      </div>
      <div className="l-container">
        <BreadCrumbList type="blogs" current="ブログ一覧" />
        <section className="p-section">
          <h2 className="c-heading--lg">最新記事</h2>
          <div className="c-grid">
            {posts.map((post) => {
              return (
                <article className="p-entryCard c-grid__item--md6 c-grid__item--lg4 is-small">
                  <Link to={post.fields.slug} className="p-entryCard__img">
                    {post.frontmatter.hero ? (
                      <Img
                        filename={post.frontmatter.hero}
                        alt={post.frontmatter.title}
                      />
                    ) : (
                      <Img filename="common/dummy.png" alt="" />
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
                </article>
              );
            })}
          </div>
        </section>
        <Pagination num={page} current={current} type=""></Pagination>
        <aside className="BigWhite">
          <div className="l-container">
            <section className="p-box--gray p-section u-text-center">
              <h2 className="c-heading--lg">人気のタグ</h2>
              <Tags />
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

export default blogs;

export const pageQuery = graphql`
  query blosQyery($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { pagetype: { eq: "blog" } } }
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
  }
`;
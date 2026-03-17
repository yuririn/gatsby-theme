import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import Img from "./common/img"

const PickUpPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          pickup
          category {
            slug
            name
            enName
            description
          }
        }
      }
      # limit: 2000 を追加して、過去のピックアップ記事も取得対象に含める
      # SEO不要なentry415をフィルタリングで除外
      allMarkdownRemark(
        filter: {
          frontmatter: {pageType: {eq: "blog"}},
          fields: {slug: {ne: "entry415"}}
        }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              cateId
              date(formatString: "YYYY.MM.DD")
              modifiedDate(formatString: "YYYY.MM.DD")
              hero
              description
              tags
            }
          }
        }
      }
    }
  `);

  const { pickup, category } = data.site.siteMetadata;

  // スラッシュの有無に関わらず一致判定できるように正規化してフィルタリング
  const articles = data.allMarkdownRemark.edges.filter(edge => {
    const nodeSlug = edge.node.fields.slug.replace(/^\/|\/$/g, '');
    const pickupSlugs = pickup.map(s => s.replace(/^\/|\/$/g, ''));
    return pickupSlugs.includes(nodeSlug);
  });

  return (
    <ul className="l-card-container--pickup">
      {articles.map(({ node }) => {
        // modifiedDate のスペルミス（小文字問題）を修正
        const date = node.frontmatter.modifiedDate || node.frontmatter.date
        const cate = category.find(i => i.slug === node.frontmatter.cateId) || { name: "Other", enName: "Other" }

        return (
          <li key={node.fields.slug}>
            <article className="c-pickup-card">
              <p className="c-pickup-card__sub-title">
                <span>{cate.enName}</span>{cate.name}
              </p>
              <Link to={`/blogs/${node.fields.slug}`} className="c-pickup-card__img">
                <Img
                  source={node.frontmatter.hero}
                  alt={node.frontmatter.title}
                  key={node.frontmatter.title}
                />
              </Link>
              <div className="c-pickup-card__main">
                <Link to={`/blogs/${node.fields.slug}`}>
                  <time className="c-pickup-card__date">{date}</time>
                  <h3 className="c-pickup-card__heading">{node.frontmatter.title}</h3>
                  <p className="c-pickup-card__description">{node.frontmatter.description}</p>
                </Link>
                <ul className="c-card__tags">
                  {node.frontmatter.tags && node.frontmatter.tags.length > 0 && node.frontmatter.tags.map((item) => (
                    <li key={item}>
                      <Link to={`/blogs/tags/${item}`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  );
};

export default PickUpPosts;

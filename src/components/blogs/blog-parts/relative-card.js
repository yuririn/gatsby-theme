import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "../../common/img"
import dateReplace from "../../../utils/datereplace"

const RelativeCard = data => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        # limit: 2000 を追加して、全記事が取得対象に入るように修正
        allMarkdownRemark(
          filter: { frontmatter: { pageType: { eq: "blog" } } }
          limit: 2000
        ) {
          edges {
            node {
              fields {
                slug
              }
              id
              frontmatter {
                description
                hero
                date(formatString: "YYYY.MM.DD")
                modifiedDate(formatString: "YYYY.MM.DD")
                title
              }
            }
          }
        }
      }
    `
  )

  // 1. スラッグを正規化して対象の記事を探す (findを使用)
  const targetSlug = data.slug ? data.slug.replace(/^\/|\/$/g, '') : '';

  const foundEdge = allMarkdownRemark.edges.find(item => {
    const nodeSlug = item.node.fields.slug.replace(/^\/|\/$/g, '');
    return nodeSlug === targetSlug;
  });

  // 2. 記事が見つかった場合の処理
  if (foundEdge) {
    const article = foundEdge.node;

    // 説明文のトリミング
    const description =
      article.frontmatter.description && article.frontmatter.description.length > 60
        ? article.frontmatter.description.substr(0, 60) + "..."
        : article.frontmatter.description;

    // 日付の優先順位（更新日 > 投稿日）
    const date = article.frontmatter.modifiedDate || article.frontmatter.date;

    return (
      <a
        href={`/blogs/${article.fields.slug}/${data.anchor ? '#' + encodeURI(data.anchor) : ''}`}
        className="c-related-post-card"
      >
        <section>
          <div className="c-related-post-card__img">
            <Img
              source={article.frontmatter.hero}
              alt={article.frontmatter.title}
            />
          </div>
          <div className="c-related-post-card__main">
            <p className="c-related-post-card__main__title">
              {article.frontmatter.title}
            </p>
            <time dateTime={dateReplace(date)}>
              {date}
            </time>
            <p className="c-related-post-card__description">{description}</p>
          </div>
        </section>
      </a>
    );
  } else {
    // 記事が見つからない場合は何も表示しない
    return null;
  }
}

export default RelativeCard;

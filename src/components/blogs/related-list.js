import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "../img";
import styled from "styled-components";

const List = ({ item, url }) => {
  const { title, hero } = item;
  return (
    <article className="p-entryCard is-small">
      <Link className="p-entryCard__img" to={url}>
        {hero ? (
          <Img filename={hero} alt={title} />
        ) : (
          <Img filename="common/dummy.png" alt="" />
        )}
        {/* <div className="p-entryCard__date">
					{date}
				</div> */}
      </Link>
      <Link to={url} className="p-entryCard__body">
        <h3 className="p-entryCard__heading">{title}</h3>
      </Link>
    </article>
  );
};

const Lists = ({ category, title, tags }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              id
              frontmatter {
                cateId
                hero
                date(formatString: "YYYY.MM.DD")
                title
                tags
                pagetype
              }
            }
          }
        }
      }
    `
  );
  let posts = allMarkdownRemark.edges.filter((post) => {
    if (post.node.frontmatter.title !== title) {
      // カテゴリーの一致出力
      if (post.node.frontmatter.cateId === category) {
        return post.node.frontmatter.cateId === category;
      }
      // タグの一致出力
      for (const tag of tags) {
        for (const item in post.node.frontmatter.tags) {
          if (tag === post.node.frontmatter.tags[item]) return true;
        }
      }
    }
    return false;
  });

  if (!posts) return;

  function shuffle(list) {
    var i = list.length;

    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      if (i === j) continue;
      var k = list[i];
      list[i] = list[j];
      list[j] = k;
    }

    return list;
  }

  shuffle(posts);

  posts = posts.slice(0, 6);

  return (
    <RelativeList>
      <h2 className="c-heading--lg--side">関連記事</h2>
      <div>
        {posts.map((item) => {
          return (
            <List item={item.node.frontmatter} url={item.node.fields.slug} />
          );
        })}
      </div>
    </RelativeList>
  );
};
export default Lists;

const RelativeList = styled.div`
  @media screen and (min-width: 768px) {
    .p-entryCard:hover .gatsby- Img-wrapper {
      transform: none;
      opacity: 0.8;
    }
    .p-entryCard.is-small {
      margin-left: 0;
      margin-right: 0;
      flex-wrap: wrap;
      display: flex;
      align-items: flex-start;
      position: relative;
      border-bottom: 1px solid #e9e9e9;
      margin-bottom: 10px;
      padding-bottom: 10px;
      .p-entryCard__img {
        width: 30%;
        border-radius: 5px;
        margin-bottom: 0;
      }
      .p-entryCard__body {
        width: 70%;
        box-sizing: border-box;
        padding-left: 10px;
        .p-entryCard__heading {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

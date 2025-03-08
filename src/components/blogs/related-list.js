import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./../common/post";

const RelatedPosts = ({ category, slug, tags }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { pageType: { eq: "blog" } } }
        ) {
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
              }
            }
          }
        }
      }
    `
  )
  let posts = allMarkdownRemark.edges.filter(post => {
    if (post.node.fields.slug !== slug) {
      // カテゴリーの一致出力
      if (post.node.frontmatter.cate === category) return true
      // タグの一致出力
      for (const tag of tags) {
        if (post.node.frontmatter.tags.includes(tag)) return true
      }
    }
    return false
  })
  const result = useMemo(() => {
    if (!posts) return;
    if (posts.length > 5) {
      shuffle(posts);
    }
    return posts.slice(0, 6)
  }, []);
  return (
    <ol className="l-card-container--related-posts">
      {result.map((post, key) => {
        return <Post post={post.node} key={key} hasTag={false} image={[300, 225, 30]} />
      })}
    </ol>
  )
}
export default RelatedPosts

const shuffle = (list) => {
  var i = list.length

  while (--i) {
    var j = Math.floor(Math.random() * (i + 1))
    if (i === j) continue
    var k = list[i]
    list[i] = list[j]
    list[j] = k
  }
  return list
}

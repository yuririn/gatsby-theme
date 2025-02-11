import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { graphql, useStaticQuery } from "gatsby";
import Post from './Post';

const InfiniteScrollComponent = () => {
    const initialData = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 12
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              tags
              hero
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

    const [posts, setPosts] = useState(initialData.allMarkdownRemark.edges);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMorePosts = async () => {
        const res = await fetch(`/___graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
          query {
            allMarkdownRemark(
              sort: { frontmatter: { date: DESC } }
              skip: ${page * 12}
              limit: 12
            ) {
              edges {
                node {
                  frontmatter {
                    title
                    tags
                    hero
                    date(formatString: "MMMM DD, YYYY")
                  }
                  fields {
                    slug
                  }
                  excerpt
                }
              }
            }
          }
        `,
            }),
        });
        const newPosts = await res.json();
        setPosts([...posts, ...newPosts.data.allMarkdownRemark.edges]);
        setHasMore(newPosts.data.allMarkdownRemark.edges.length > 0);
        setPage(page + 1);
    };
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>これ以上記事はありません</p>}
        >
            <ul className="l-card-container">
                {posts.map(( node, key ) => {
                    console.log(node.node)
                    return <Post post={node.node} key={key}></Post>
                })}
            </ul>
        </InfiniteScroll>
    );
}

export default InfiniteScrollComponent;

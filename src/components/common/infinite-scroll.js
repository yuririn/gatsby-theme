import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; 
import Post from './post';
import Ad from "./ad"

const InfiniteScrollComponent = ({ posts, location }) => {
  const num = 12;
  const [showPostIndex, setShowPostIndex] = useState(num);
  const [showPosts, setShowPosts] = useState(posts.slice(0, num));
  const [hasMore, setHasMore] = useState(posts.length > num);

  const fetchMoreData = () => {
    const nextIndex = showPostIndex + num;
    setShowPostIndex(nextIndex);
    setShowPosts(posts.slice(0, nextIndex));
  };

  useEffect(() => {
    setHasMore(showPostIndex < posts.length);
  }, [showPostIndex, posts.length]);

  if (posts.length < num) {
    return (
      <ul className="l-card-container">
        {posts.map((node, key) => (
          <>
            {key === 6 && (<Ad location="location.pathname"></Ad>)}
            <Post post={node} key={`post${num + key}`} archive={true} />
          </>
        ))}
      </ul>
    );
  }

  return (
    <InfiniteScroll
      dataLength={showPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p className="u-center u-font--en">Loading...</p>}
      endMessage={<p className="u-center">全件表示しました</p>}
    >
      <ul className="l-card-container">
        {showPosts.map((node, key) => {
          return <Post post={node} className="fade-in" />;
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;

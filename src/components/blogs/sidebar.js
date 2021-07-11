import React from "react";
import Img from "../img";
import RelatedList from "./related-list";
import { Sidebar } from "./../../styles/blog-styles/sidebar";
import { siteMetadata } from "../../../gatsby-config";
import { Link } from "gatsby";

const bar = ({ cateId, title, tags }) => {
  return (
    <Sidebar>
      <RelatedList category={cateId} title={title} tags={tags}></RelatedList>
      <section classNameName="p-section">
        <h2 classNameName="c-heading--lg--side">ジャンル</h2>
        <ul classNameName="sideCateList">
          {siteMetadata.category.map((item) => {
            return (
              <li>
                <Link to={`/blogs/${item.slug}/`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </section>
      <div className="inner">
        {/* <Search /> */}
        <ul className="side-banner">
          <li>
            <Link to="/about/">
              <Img
                filename="common/about-banner.jpg"
                alt="かみーゆを力一杯紹介"
              />
            </Link>
          </li>
          <li>
            <Link
              to="https://twitter.com/LirioY"
              target="_blank"
              rel="noopener"
            >
              <Img
                filename="common/twitter-banner.jpg"
                alt="Twitterやってるよ"
              />
            </Link>
          </li>
          <li>
            <Link
              to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
              target="_blank"
              rel="noopener"
            >
              <Img
                filename="common/youtube-banner.jpg"
                alt="YouTubeやってるよ"
              />
            </Link>
          </li>

          <li className="iframe">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/videoseries?list=PLRSXt39PZIMWu7Uj5VOOKaCEZMj9k5RHZ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </li>
        </ul>
        <h2>お仕事のご依頼</h2>
        <p className="u-text-center">
          <a className="p-btn--detail" href="/contact/">
            お問い合わせ
          </a>
        </p>
        <p className="u-text-center">
          <small>初見の方、30分無料相談承っております。</small>
        </p>
      </div>
    </Sidebar>
  );
};

export default bar;

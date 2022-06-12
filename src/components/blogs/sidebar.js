import React from "react"
import Img from "../img"
import RelatedList from "./related-list"
import { Sidebar } from "./../../styles/blog-styles/sidebar"
import { siteMetadata } from "../../../gatsby-config"
import { Link } from "gatsby"
import Search from "../search"
import Affili from "../affiliate";

const bar = ({ cateId, title, tags, slug }) => {
  return (
    <Sidebar>
      <RelatedList category={cateId} tags={tags} slug={slug}></RelatedList>
      <Affili size="rectangle" genre={cateId}></Affili>
      <section className="p-section">
        <h2 className="c-heading--lg--side">ジャンル</h2>
        <ul className="sideCateList">
          {siteMetadata.category.map((item, index) => {
            return (
              <li key={`side-ganre${index}`}>
                <Link to={`/blogs/${item.slug}/`}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </section>
      <div className="inner">
        <h2 className="c-heading--lg">記事を探す</h2>
        <Search></Search>

        <ul className="side-banner">
          <li><Affili size="rectangle" genre={cateId}></Affili></li>
          <li>
            <Link to="/about/">
              <Img
                source="common/about-banner.jpg"
                alt="かみーゆを力一杯紹介"
              />
            </Link>
          </li>
          <li>
            <Link to="/blogs/tags/子ども服をセブに送るプロジェクト/">
              <Img
                source="common/cebu-cloths-banner.jpg"
                alt="捨てるなんてもったいない！子ども服をセブに送るプロジェクト"
              />
            </Link>
          </li>
          <li>
            <Link
              to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
              target="_blank"
              rel="noopener"
            >
              <Img source="common/youtube-banner.jpg" alt="YouTubeやってるよ" />
            </Link>
          </li>
        </ul>
        <h2>お仕事のご依頼</h2>
        <p className="u-text-center">
          <a className="p-btn--detail" href="/contact/">
            相談する
          </a>
        </p>
        <p className="u-text-center">
          <small>初見の方、30分無料相談承っております。</small>
        </p>
        <Affili size="rectangle" genre={cateId}></Affili>
      </div>
    </Sidebar>
  )
}

export default bar

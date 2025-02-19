import React from "react"
import Img from "./img"
import { Sidebar } from "../../styles/blog-styles/sidebar"
import { Link } from "gatsby"
import Search from "../search"
import Ad from "./ad"

const SideBar = ({ topic, location, children }) => {
  return (
    <Sidebar>
      <Ad
        location={location}
        style={{ display: `block`, minWidth: `250px` }}
      ></Ad>
      <div className="inner">
        {children}
        {topic && (<div
          className="side-topic"
          dangerouslySetInnerHTML={{
            __html:
              '<h2 class="side-topic--heading">この記事のサマリー</h2>' +
              topic.replace(/(<p>|<\/p>)/gi, ""),
          }}
        ></div>)}
        <section className="p-section search">
          <h2>記事を探す</h2>
          <Search></Search>
        </section>

        <ul className="side-banner">
          <li>
            <Link
              to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
              target="_blank"
              rel="noopener"
            >
              <Img source="common/youtube-banner.jpg" />
            </Link>
          </li>
          <li>
            <Link
              to="https://itnomikai.com/event/cebu"
              target="_blank"
              rel="noopener"
            >
              <Img source="common/it-nomikai-cebu.jpg" alt="セブIT飲み会" />
            </Link>
          </li>
          <li>
            <Link to="/about/">
              <Img
                source="common/about-banner.jpg"
                alt="かみーゆを力一杯紹介"
              />
            </Link>
          </li>
        </ul>
        <h2>お仕事のご依頼</h2>
        <p className="u-text-center">
            {/* 一時的な変更 */}
          <a className="p-btn--detail c-btn--detail" href="/contact/">
            相談する
          </a>
        </p>
        <p className="u-text-center">
          <small>初見の方、30分無料相談承っております。</small>
        </p>
      </div>
    </Sidebar>
  )
}

export default SideBar

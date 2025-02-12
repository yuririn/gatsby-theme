import * as React from "react"
import Search from "./search"
import Img from "./common/img"
import { Link } from "gatsby"
const SideBar =()=>{
    return (
        <aside className="l-container--blog__aside">
            <div className="l-container--blog__aside__inner">
                <h2 className="c-heading__aside">記事を探す</h2>
                <Search></Search>
                <ul className="c-side-banner">
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
                <h2 className="c-heading__aside">お仕事のご依頼</h2>
                <p className="u-center">
                    <a className="c-btn--detail" href="/contact/">
                        相談する
                    </a>
                </p>
                <p className="u-center">
                    <small>初見の方、30分無料相談承っております。</small>
                </p>
            </div>
        </aside>
    )
}

export default SideBar

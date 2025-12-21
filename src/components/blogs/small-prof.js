import React from "react"
import Img from "../common/img"
import { Link } from "gatsby"
import config from "../../../gatsby-config"
import Ad from "../common/ad"
import X from "./../svg/x";
import Insta from "../svg/Insta";
import YouTube from "./../svg/youtube";
import SlideShare from "./../svg/slideshare";

const smallProf = () => {
  const author = config.siteMetadata.author;
  return (
    <>
    <div className="c-bio">
        <span className="c-bio__title">この記事を書いた人</span>
        <Img source="common/camille-pic.jpg" className="c-bio__img"></Img>
        <p className="c-bio__name">{author.name}/フロントエンドエンジニア</p>

        <p className="c-bio__message">資金ゼロからフィリピンで起業したアラフィフ海外ノマドエンジニア。最近は「フィリピンお役立ち情報」「ナチュラルアンチエイジング」「人生から得た哲学」など実体験を発信。最近AIの発達でテックブログはお休みしているけど、IT業界10年以上でテクニカルディレクター（技術責任者）・エンジニア講師・ブリッジSEを経て<a href="https://lenz-ph.com" target="_blank" rel="noopener nofollow">LenzTechnologies Inc.</a>を設立し、代表を務める。
      </p>
        <p className="c-bio__footer">
        <Link
          to="https://twitter.com/LirioY"
          target="_blank"
          rel="noopener nofollow"
          title="Twitter"
          >
          <X></X>
         
        </Link>
        <Link
          to="https://www.instagram.com/yurico.k"
          target="_blank"
          rel="noopener nofollow"
          title="Instagram"
          >
          <Insta></Insta>
        </Link>
        <Link
          to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
          target="_blank"
          rel="noopener nofollow"
          title="YouTube"
          >
          <YouTube></YouTube>
        </Link>
        <Link
          to="https://www2.slideshare.net/yurikamimori"
          target="_blank"
          rel="noopener nofollow"
          title="SlideShare"
          >
          <SlideShare/>
        </Link>
        <Link to="/about/">Read More</Link>
      </p>
    </div>
          </>
  )
}
export default smallProf

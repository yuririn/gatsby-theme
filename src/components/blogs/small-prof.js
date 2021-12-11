import React from "react"
import Img from "../img"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faSlideshare,
} from "@fortawesome/free-brands-svg-icons"

const smallProf = () => {
  return (
    <div className="profile">
      <span className="title">この記事を書いた人</span>
      <Img source="common/camille-pic.jpg" className="prof__img__sm"></Img>
      <p className="name">かみーゆ/フロントエンドエンジニア</p>
      <p className="sns">
        <Link
          to="https://twitter.com/LirioY"
          target="_blank"
          rel="noopener nofollow"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link
          to="https://www.instagram.com/yurico.k"
          target="_blank"
          rel="noopener nofollow"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
          target="_blank"
          rel="noopener nofollow"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </Link>
        <Link
          to="https://www2.slideshare.net/yurikamimori"
          target="_blank"
          rel="noopener nofollow"
        >
          <FontAwesomeIcon icon={faSlideshare} />
        </Link>
      </p>

      <p className="message">
        セブ島在住の気ままな海外ノマドエンジニア。IT業界10年。テクニカルディレクター・エンジニア講師・ブリッジSEを経て今に至る。CMS
        concrete5エバンジェリスト。テックブログ以外も「磨耗しない人生の選択」や「海外生活」のライフスタイルについて発信。好きなものは肉とビール。
      </p>
      <p className="seemore">
        <Link to="/about/">Read More</Link>
      </p>
    </div>
  )
}
export default smallProf

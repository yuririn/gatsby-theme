import React from "react"
import Img from "../img"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import config from "../../../gatsby-config"
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faSlideshare,
} from "@fortawesome/free-brands-svg-icons"

const smallProf = () => {
  const author = config.siteMetadata.author;
  return (
    <div className="profile">
      <span className="title">この記事を書いた人</span>
      <Img source="common/camille-pic.jpg" className="prof__img__sm"></Img>
      <p className="name">{author.name}/フロントエンドエンジニア</p>

      <p className="message">{ author.summary }
      </p>
      <p class="footer">
        <Link
          to="https://twitter.com/LirioY"
          target="_blank"
          rel="noopener nofollow"
          title="Twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link
          to="https://www.instagram.com/yurico.k"
          target="_blank"
          rel="noopener nofollow"
          title="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
          target="_blank"
          rel="noopener nofollow"
          title="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </Link>
        <Link
          to="https://www2.slideshare.net/yurikamimori"
          target="_blank"
          rel="noopener nofollow"
          title="SlideShare"
        >
          <FontAwesomeIcon icon={faSlideshare} />
        </Link>
        <br></br>
        <Link to="/about/">Read More</Link>
      </p>
    </div>
  )
}
export default smallProf

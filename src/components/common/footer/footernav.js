import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faSlideshare,
} from "@fortawesome/free-brands-svg-icons"

const footernav = () => {
  return (
    <div className="c-grid p-footerNav p-section">
      <ul className="p-footerNav__item">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blogs/">Blog</Link>
        </li>
        <li>
          <Link to="/portfolio/">Portfolio</Link>{" "}
        </li>
      </ul>
      <ul className="p-footerNav__item">
        <li>
          <Link to="/about/">About Me</Link>
        </li>
        <li>
          <Link to="/privacy-policy/">Privacy Policy</Link>{" "}
        </li>
        <li>
          <Link to="/socialmedia-policy/">Social Media Policy</Link>{" "}
        </li>
        <li>
          <Link to="/contact/">Contact</Link>{" "}
        </li>
      </ul>
      <ul className="p-footerNav__item--sns">
        <li>
          <Link
            to="https://twitter.com/LirioY"
            target="_blank"
            rel="noopener nofollow"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
        </li>
        <li>
          <Link
            to="https://www.instagram.com/yurico.k"
            target="_blank"
            rel="noopener nofollow"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
        </li>
        <li>
          <Link
            to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
            target="_blank"
            rel="noopener nofollow"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
        </li>
        <li>
          <Link
            to="https://www2.slideshare.net/yurikamimori"
            target="_blank"
            rel="noopener nofollow"
          >
            <FontAwesomeIcon icon={faSlideshare} />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default footernav

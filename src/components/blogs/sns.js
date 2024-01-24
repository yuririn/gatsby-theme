import React from "react"
import { Link } from "gatsby"

const Sns = ({ url, title }) => {
  return (
    <ul className="c-snsBtns u-mblg">
      <li className="c-snsBtns__item">
        <Link
          className="c-snsBtns__item--fb"
          to={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener nofollow"
        >
          <span className="c-snsBtns__label">Facebook</span>
        </Link>
      </li>
      <li className="c-snsBtns__item">
        <Link
          className="c-snsBtns__item--tw"
          to={`http://twitter.com/share?url=${url}&text=${title}`}
          target="_blank"
          rel="noopener nofollow"
        >
          <span className="c-snsBtns__label">X(Twitter)</span>
        </Link>
      </li>
      <li className="c-snsBtns__item">
        <Link
          to={`https://b.hatena.ne.jp/entry/${url}`}
          target="_blank"
          className="c-snsBtns__item--hateb"
          rel="noopener nofollow"
        >
          <span className="c-snsBtns__label">はてB!</span>
        </Link>
      </li>
      <li className="c-snsBtns__item">
        <Link
          className="c-snsBtns__item--pocket"
          to={`http://getpocket.com/edit?url=${url}&text=${title}`}
          target="_blank"
          rel="noopener nofollow"
        >
          <span className="c-snsBtns__label">Pocket</span>
        </Link>
      </li>
    </ul>
  )
}

export default Sns

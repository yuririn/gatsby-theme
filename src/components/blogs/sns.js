import React from "react"
import { Link } from "gatsby"
import Facebook from "../svg/facebook";
import X from "../svg/x";
import Hateb from "../svg/hateb";

const Sns = ({ url, title }) => {
  return (
    <div className="c-sns-btns">
      <dl>
        <dt>SHARE</dt>
        <dd className="c-sns-btns__items">
          <Link
            className="c-sns-btns__fb"
            to={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener nofollow"
          >
            <Facebook></Facebook>
          </Link>
          <Link
            className="c-sns-btns__tw"
            to={`http://twitter.com/share?url=${url}&text=${title}`}
            target="_blank"
            rel="noopener nofollow"
          >
            <X></X>
          </Link>
          <Link
            to={`https://b.hatena.ne.jp/entry/${url}`}
            target="_blank"
            className="c-sns-btns__hateb"
            rel="noopener nofollow"
          >
            <Hateb></Hateb>
          </Link>
        </dd>
      </dl>

    </div>
  )
}

export default Sns

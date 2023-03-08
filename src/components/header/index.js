import * as React from "react"

import Logo from "./logo"
import { Link } from "gatsby"
import GNav from "./nav";

const Header = ({ location }) => {
  return (

      <div className="l-header">
      {location === "/" ? (
        <h1 className="l-header__logo">セブ島海外ノマドエンジニアの日記
          <Logo />
        </h1>
      ) : (
        <Link to="/" className="l-header__logo">
          セブ島海外ノマドエンジニアの日記
          <Logo />
        </Link>
      )}
      <GNav></GNav>
      </div>
  )
}

export default Header

import * as React from "react"

import Logo from "./logo"
import { Link } from "gatsby"
import GNav from "./../nav"

// import Search from "../../search/"
import styled from "styled-components"

const Header = ({ title, location }) => {
  return (
    <HeaderWrapper>
      {location === "/" ? (
        <h1 id="header-logo">
          セブ島海外ノマドエンジニアの日記
          <Logo />
        </h1>
      ) : (
        <Link to="/" id="header-logo">
          セブ島海外ノマドエンジニアの日記
          <Logo />
        </Link>
      )}
      <GNav></GNav>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.header`
    color: #232a41;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background: var(--header-background);
    box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    padding: 0 20px;
      backdrop-filter: blur(3px);

    #header-logo {
    text-decoration: none;
    color: #264785;
    display: block;
    line-height: 1;
    font-size: 1rem;
    white-space: nowrap;
  }
  #header-logo svg {
    height: 34px;
    transition: 0.3s;
    fill: #264785;
    display: block;
    margin-top: 3px;
  }
  a#header-logo {
    display: inline-block;
      @media screen and (min-width: 768px) {
        &:hover svg {
          fill: #1231b8;
          cursor: pointer;
        }
      }
    }
  }
`

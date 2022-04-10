import React, { useEffect } from "react"

import Logo from "./logo"
import { Link } from "gatsby"

// import Search from "../../search/"
import styled from "styled-components"

const Header = ({ title, location }) => {
  useEffect(() => {
    if (document.documentElement.classList.value !== "dark") {
      document.documentElement.classList.toggle("dark")
    }
  })
  const theme =() =>  {
    // Gatsbyのbuildエラー対策
    if (typeof window !== undefined) {
      document.documentElement.classList.toggle("dark")
    }
  }
  return (
    <HeaderWrapper>
      <header className="l-header">
        <div>
          <div id="header-logo">
            <span>セブ島在住海外ノマド フロントエンジニアの日記</span>
            {location === "/" ? (
              <h1>
                <Logo />
              </h1>
            ) : (
              <Link to="/">
                <Logo />
              </Link>
            )}
          </div>
        </div>
      </header>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
  .l-header {
    color: #232a41;
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background: var(--header-background);
    box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    z-index: 100;
    display: flex;
    align-items: center;
  }
  #header-logo span {
    display: block;
    font-size: 1rem;
    padding-left: 15px;
    padding-top: 5px;
    @media screen and (min-width: 768px) {
      padding-left: 30px;
    }
  }
  #header-logo svg {
    height: 34px;
    transition: 0.3s;
    margin-left: 15px;
    fill: #264785;
    @media screen and (min-width: 768px) {
      margin-left: 30px;
    }
  }
  #header-logo a {
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

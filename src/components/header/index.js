import * as React from "react"

import Logo from "./logo"
import { Link } from "gatsby"

// import Search from "../../search/"
import styled from "styled-components"

const Header = ({ title, location }) => {
  return (
    <HeaderWrapper>
      <header className="l-header">
        <div>
          <div id="header-logo">
            {location === "/" ? (
              <h1>
                <span>セブ島在住海外ノマド フロントエンジニアの日記</span>
                <Logo />
              </h1>
            ) : (
              <Link to="/">
                <span>セブ島在住海外ノマド フロントエンジニアの日記</span>
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
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background: hsla(0, 0%, 100%, 0.9);
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
    fill: var(--color-blue);
    @media screen and (min-width: 768px) {
      margin-left: 30px;
    }
  }
  #header-logo a {
    text-decoration: none;
    color: var(--color-blue);
    display: inline-block;
      @media screen and (min-width: 768px) {
        &:hover svg {
          fill: var(--color-link);
          cursor: pointer;
        }
      }
    }
  }
`
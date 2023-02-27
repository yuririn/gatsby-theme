import * as React from "react"

import {
    BaseStyle
} from "./../styles/ad/base"
import {siteMetadata} from "../../gatsby-config"
import styled from "styled-components"
import Img from './img'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath} id="top">
    <BaseStyle></BaseStyle>
     <Header>
        {
            location.pathname === 'add'?(<h1><img src="/images/choco-blog-logo.webp" alt={siteMetadata.ad.title} width="100" height="100"></img></h1>):(<a href="/choco-blog/"><img src="/images/choco-blog-logo.webp" alt={siteMetadata.ad.title} width="100" height="100"></img></a>)
        }
          <ul>
            <li><a href="/choco-blog/">HOME</a></li>
            <li><a href="/contact/">CONTACT</a></li>
          </ul>
        </Header>
        <Main>{children}</Main>
        <Footer>
          <ul>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/about/">About</a></li>
          </ul>
          <p><small>(c) {siteMetadata.ad.title}</small></p>
        </Footer>
    </div>
  )
}

export default Layout


const Main = styled.main`
    max-width: 1120px;
     padding-left: 16px;
     padding-right: 16px;
     margin-bottom: 50px;


     @media only screen and (min-width: 768px) {
        margin-bottom: 80px;
        display: flex;
        flex-wrap: wrap;
        margin-left: auto;
        margin-right: auto;
        padding-left: 32px;
        padding-right: 32px;
    }

    a:not([class]) {
    color: var(--color-sec);
    &:hover {
        text-decoration: none;
    }
`
const Header = styled.header`

text-align: center;
    background: #4b3933;
background-image: repeating-linear-gradient(-45deg, #4f4040, #4f4040 1px, transparent 2px, transparent 5px);
padding: 24px;
h1 {
    margin: 0;
    font-size: 20px;
    color: #fff;
        a {
        color: #fff;
        }

  }
  ul {
    margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 24px;

      li {
        font-weight: bold;
        font-size: 18px;
      }
  }

  a {
    text-decoration: none;
      color: #fff;
  }
`
const Footer = styled.footer`
    text-align: center;
        background: #4b3933;
        background-image: repeating-linear-gradient(-45deg, #4f4040, #4f4040 1px, transparent 2px, transparent 5px);
        padding: 24px 24px 10px;
    color: #fff;
    padding: 24px;

    ul {
        margin-bottom: 24px;
        display: flex;
        gap: 24px;
        justify-content: center;
        li {

        }
    }
    a {
        color: #fff;
    }
`

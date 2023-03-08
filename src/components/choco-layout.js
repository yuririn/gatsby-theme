import * as React from "react"

import { siteMetadata } from "./../../gatsby-config"

import { ChocoCommonStye, ChocoCommonStyle } from "../styles/choco/ChocoCommonStyle"
import { ChocoBody } from '../styles/choco/ChocoBody';
import { ChocoHeader } from '../styles/choco/ChocoHeader';
import { ChocoFooter } from '../styles/choco/ChocoFooter';
import ChocoSidebar from "./choco-parts/choco-sidebar";


const Layout = ({ location, children }) => {
  return (
    <div className="global-wrapper" data-is-root-path={false} id="top">
      <ChocoHeader >
        <div className="l-header">
          {
            location.pathname === '/choco-blog/' ?(<h1><img src="/images/choco-blog-logo.webp" alt={siteMetadata.ad.title} width="100" height="100"></img></h1>):(<a href="/choco-blog/"><img src="/images/choco-blog-logo.webp" alt={siteMetadata.ad.title} width="100" height="100"></img></a>)
          }
          <ul>
            <li><a href="/choco-blog/">HOME</a></li>
            <li><a href="/contact/">CONTACT</a></li>
          </ul>
          </div>
      </ChocoHeader>
      <ChocoCommonStyle/>
      <ChocoBody>
        <div className="l-body">
          {children}
          <ChocoSidebar location={location}></ChocoSidebar>
        </div>
      </ChocoBody>
      <ChocoFooter>
        <div className="l-footer">
          <ul>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/about/">About</a></li>
          </ul>
          <p><small>(c) {siteMetadata.ad.title}</small></p>
        </div>
      </ChocoFooter>
    </div>
  )
}

export default Layout


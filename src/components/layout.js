import * as React from "react"

import { siteMetadata } from "./../../gatsby-config"

import Header from "./header"
import Footer from "./footer"



const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  if( typeof window !== "undefined") {
    const setTheme = newTheme => (document.body.className = newTheme)
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    setTheme(mode)
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath} id="top">
      <Header title={siteMetadata.title} location={location.pathname} />
      {children}
      <Footer title={siteMetadata.title} />
    </div>
  )
}

export default Layout


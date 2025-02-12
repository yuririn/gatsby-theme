import * as React from "react"
import { Link } from "gatsby"
import Header from "./common/Header";
import Footer from "./common/footer";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

    // if (typeof window !== "undefined") {
    //     const setTheme = newTheme => (document.body.className = newTheme)
    //     const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    //     setTheme(mode)
    // }


  return (
    <>
      <Header isRootPath={isRootPath}></Header>
      <main>{children}</main>
          <Footer></Footer>
    </>
  )
}

export default Layout

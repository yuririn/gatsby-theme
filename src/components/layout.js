import * as React from "react"
import { Link } from "gatsby"
import Header from "./common/header";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath


  return (
    <>
      <Header isRootPath={isRootPath}></Header>
      <main>{children}</main>
    </>
  )
}

export default Layout

import React from "react"
import Footer from "./common/footer"
import Header from "./common/header"
import GNav from "../components/common/nav"
import { BaseStyle } from "./../styles/common/base"
import { CommonStyle } from "./../styles/common/common"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <CommonStyle />
      <BaseStyle />
      <Header title={title} />
      <GNav />
      <main className="mb-Lg" id="top">
        {children}
      </main>
      <Footer title={title} />
    </div>
  )
}

export default Layout

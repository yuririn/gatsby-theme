import React from "react"
import Footer from "./common/footer"
import Header from "./common/header"

const Layout = ({ location, title, children }) => {

	return (
		<div>
			<Header title={title} />
			<main className="mb-Lg">{children}</main>
			<Footer title={title} />
		</div>
	)
}

export default Layout

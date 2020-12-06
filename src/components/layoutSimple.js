import React from "react"
import Footer from "../components/common/footer"
import Header from "../components/common/header"
import Profile from "../components/profile"
import Genre from "../components/genre"

const LayoutSimple = ({ location, title, children }) => {

	return (
		<div>
			<Header title={title} />
			<main className="mb-Lg">{children}</main>
			<Footer title={title} />
		</div>
	)
}

export default LayoutSimple

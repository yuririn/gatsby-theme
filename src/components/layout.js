import React from "react"
import Footer from "../components/common/footer"
import Header from "../components/common/header"
import Profile from "../components/profile"
import Genre from "../components/genre"

const Layout = ({ location, title, children }) => {

	return (
		<div>
			<Header title={title} />
			<main>{children}</main>
			<aside>
				<div className="l-container">
					<Genre />
					<Profile />
				</div>
			</aside>
			<Footer title={title} />
		</div>
	)
}

export default Layout

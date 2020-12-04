import React from "react"
import Footer from "../components/common/footer"
import Header from "../components/common/header"
import Profile from "../components/profile"
import Genre from "../components/genre"


const Layout = ({ location, title, children }) => {
	let flag;
	location.pathname.includes('blogs') ? flag = true : flag = false;

	return (
		<div>
			<Header title={title} />
			<main>{children}</main>
			<aside>
				<div className="l-container md-Md">
					{flag ? <Genre /> : ''}
					{flag ? <Profile /> : ''}
				</div>
			</aside>
			<Footer title={title} />
		</div>
	)
}

export default Layout

import React from "react"
import Footer from "../components/common/footer"
import Header from "../components/common/header"

const LayoutS = ({ location, title, children }) => {

	return (
		<div>
			<Header title={title} />
			<main clasName="mb-Lg">{children}</main>
			<Footer title={title} />
			<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		</div>
	)
}

export default LayoutS

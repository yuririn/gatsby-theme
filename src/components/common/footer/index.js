import React from "react"

import FooterNav from "./footernav"

const Footer = ({ title }) => {
	return (
		<footer className="l-footer">
			<div className="l-container">
				<FooterNav />
				<p className="u-text-center" id="copyright"><small>(C) {title}</small></p>
			</div>
		</footer>

	)
}

export default Footer

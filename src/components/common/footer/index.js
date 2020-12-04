import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

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

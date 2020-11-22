import React from "react"
import { Link } from "gatsby"

const footernav = ({ location, title, children }) => {

	return (
		<div className="c-grid p-footerNav p-section">
			<ul class="p-footerNav__item">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/blogs">Blog</Link></li>
				<li><Link to="/portfolio">Portfolio</Link></li >
			</ul >
			<ul class="p-footerNav__item">
				<li><Link to="/about">About Me</Link></li>
				<li><Link to="/privacy">Privacy Policy</Link></li >
				<li><Link to="/social">Social Media Policy</Link></li >
				<li><Link to="/contact">Contact</Link></li >
			</ul >
			<ul class="p-footerNav__item--sns">
				<li><Link to=""><i class="fab fa-twitter"></i></Link></li>
				<li><Link to=""><i class="fab fa-instagram"></i></Link></li>
			</ul>
		</div>
	)
}

export default footernav

import React from "react"
import Logo from "./logo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = ({ title }) => {
	return (
		<header class="l-header">
			<div class="l-container">
				<div class="c-grid--between">
					<div id="header-logo">
						<Link to="/">
							{title}
							<Logo />
						</Link>

					</div>
					<nav className="c-grid--flex">
						<div className="c-nav">
							<input type="checkbox" role="button" id="navBtn"></input>
							<label className="c-nav__btn" for="navBtn">
							</label>
							<div className="c-nav__container" role="navigation">
								<ul className="c-nav__child">
									<li><Link className="c-nav__navLink" to="/">Home</Link></li>
									<li><Link className="c-nav__navLink" to="/blogs/">Blog</Link>
										<ul>
											<li><Link to="/category/cms">CMS</Link></li>
											<li><Link to="/category/front-end-program/">Front End</Link></li>
											<li><Link to="/category/back-end-program/">Back End</Link></li>
											<li><Link to="/category/seo/">SEO</Link></li>
											<li><Link to="/category/it-seminar">IT Seminor</Link></li>
											<li><Link to="/category/ginneko-tsuredure/">Life Hack</Link></li>
										</ul>
									</li>
									<li><Link className="c-nav__navLink" to="/about/">About This Site</Link></li>
									<li><Link className="c-nav__navLink" to="/portfolio/">Portfolio</Link></li>
									{/* <li><Link className="c-nav__navLink" to="/contact">Contact</Link></li> */}
								</ul>
								<div>
									<Link to="https://twitter.com/LirioY" target="_blank" rel="noopener nofollow" class="c-nav__snsBtn"><FontAwesomeIcon icon={faTwitter} /></Link>
									<Link to="https://www.instagram.com/yurico.k" target="_blank" rel="noopener nofollow" class="c-nav__snsBtn"><FontAwesomeIcon icon={faInstagram} /></Link>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>

	)
}

export default Footer

import React from "react"
import { Link } from "gatsby"
import Logo from "../components/logo"
import FooterNav from "../components/footernav"
import Profile from "../components/profile"
import Genre from "../components/genre"

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`
	const isRootPath = location.pathname === rootPath

	return (
		<div className="global-wrapper" data-is-root-path={isRootPath}>
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
										<li><Link className="c-nav__navLink" to="/bloga">Blog</Link>
											<ul>
												<li><Link to="/category/cms">CMS</Link></li>
												<li><Link to="/category/front-end-program">Front End</Link></li>
												<li><Link to="/category/back-end-program">Back End</Link></li>
												<li><Link to="/category/seo">SEO</Link></li>
												<li><Link to="/category/it-seminor">IT Seminor</Link></li>
												<li><Link to="/category/ginneko-tsuredure">Life Hack</Link></li>
											</ul>
										</li>
										<li><Link className="c-nav__navLink" to="/about">About This Site</Link></li>
										<li><Link className="c-nav__navLink" to="/contact">Contact</Link></li>
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</header>
			<main>{children}</main>
			<aside>
				<div class="l-container">
					<Genre />
					<Profile />
				</div>
			</aside>
			<footer class="l-footer">
				<div class="l-container">
					<FooterNav />
					<p class="u-text-center" id="copyright"><small></small>(C) {title}</p>
				</div>
			</footer>
		</div >
	)
}

export default Layout

import React, { useState } from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faYoutube, faSlideshare} from "@fortawesome/free-brands-svg-icons";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import Search from "../search/"
import styled from 'styled-components';

const GlobalNav = ({ title, location }) => {
	const [isOpen, setIsOpen] = useState(false);
	document.body.classList.remove('no-scroll')

	const move = e =>{
		document.body.classList.toggle('no-scroll')
		setIsOpen(!isOpen)
	}

	return (
	<NavWrapper>
					<nav className="c-grid--flex">
						{/* <FontAwesomeIcon icon={faSearch} /> */}
						{/* <Search /> */}
						<div className="c-nav">
							<button type="button" onClick={move} className={(isOpen ? 'c-nav__btn open is-active' : 'c-nav__btn')}></button>
							<div className="c-nav__container" role="navigation">
								<ul className="c-nav__child">
									<li><Link className="c-nav__navLink" to="/" onClick={move}>Home</Link></li>
									<li><Link className="c-nav__navLink" to="/blogs/" onClick={move}>Blog</Link>
										<ul>
											<li><Link to="/blogs/front-end-program/" onClick={move}>Front End</Link></li>
											<li><Link to="/blogs/back-end-program/" onClick={move}>Back End</Link></li>
											<li><Link to="/blogs/seo/" onClick={move}>SEO</Link></li>
											<li><Link to="/blogs/it-seminar" onClick={move}>IT Seminor</Link></li>
											<li><Link to="/blogs/ginneko-tsuredure/" onClick={move}>Life Hack</Link></li>
										</ul>
									</li>
									<li><Link className="c-nav__navLink" to="/about/" onClick={move}>About Me</Link></li>
									<li><Link className="c-nav__navLink" to="/portfolio/" onClick={move}>Portfolio</Link></li>
									<li><Link className="c-nav__navLink" to="/contact">Contact</Link></li>
								</ul>
								<div className="c-nav__sns">
									<Link to="https://twitter.com/LirioY" target="_blank" rel="noopener nofollow" className="c-nav__snsBtn"><FontAwesomeIcon icon={faTwitter} /></Link>
									<Link to="https://www.instagram.com/yurico.k" target="_blank" rel="noopener nofollow" className="c-nav__snsBtn"><FontAwesomeIcon icon={faInstagram} /></Link>
									<Link to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw" target="_blank" rel="noopener nofollow" className="c-nav__snsBtn"><FontAwesomeIcon icon={faYoutube} /></Link>
									<Link to="https://www2.slideshare.net/yurikamimori" target="_blank" rel="noopener nofollow" className="c-nav__snsBtn"><FontAwesomeIcon icon={faSlideshare} /></Link>
									</div>
								</div>

						</div>
					</nav>
	</NavWrapper>
	)
}

export default GlobalNav

const NavWrapper = styled.div`
	.c-nav__btn {
		transform: translateY(-50%);
		position: fixed;
		font-size: 1rem;
		width: 40px;
		height: 40px;
		right: 15px;
		top: 30px;
		display: inline-block;
		transition: .3s;
		background: none;
		border: none;
		outline: none;
		z-index: 200;

		@media only screen and (min-width: 768px) {
			display: none;
		}
	}

	.c-nav__btn::after, .c-nav__btn:before {
		position: absolute;
		top: 10px;
		left: 10px;
		content: "";
		width: 20px;
		height: 2px;
		display: block;
		background-color: var(--color-blue);
		transition: transform .3s;
	}
	.c-nav__btn::after {
		box-shadow: 0 -8px 0 var(--color-blue);
		top: 26px;
		left: 10px;
	}

	.c-nav__btn.is-active:before {
		transform: rotate(45deg) translate(6px, 5px);
		transform-origin: 50% 50%;
	}
	.c-nav__btn.is-active:after {
		box-shadow: none;
		transform: rotate(-45deg) translate(6px,-5px);
		transform-origin: 50% 50%;
	}
	.c-nav {
		position: relative;
		width: 50px;
	}
	.c-grid--flex {
		display: flex;
	}

	.c-nav {
		position: relative;
		width: 50px;
	}

	.c-nav .c-nav__btn.is-active ~ .c-nav__container {
		top: 60px;
		opacity: 1;
		z-index: 200;
	}

	.c-nav__container {
		opacity: 0;
		transition: opacity .3s;
		padding: 30px 15px;
		position: fixed;
		right: 0;
		top: 60px;
		width: 100%;
		height: calc(100% - 60px);
		background: rgba(51,51,51,.8);
		overflow: auto;
		z-index: -9999;

		@media only screen and (min-width: 768px) {
			opacity: 1;
			z-index: 200;
			background: none;
			height: 60px;
			right: 15px;
			width: calc(100% - 200px);
			top: 0;
			padding: 0;
			display: flex;
			justify-content: flex-end;
			overflow: inherit;
		}

		.c-nav__child {
			max-width: 400px;
			width: 100%;
		    margin: auto;

			@media only screen and (min-width: 768px) {
				margin: 0;
				height: 60px;
				max-width: initial;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
			li {
				@media only screen and (min-width: 768px) {
					display:flex;
					align-items: center;
					height: 60px;
					margin-bottom: 0;
					padding: 10px 5px;
					position: relative;

					&:hover {
						&::after {
							width: 70%;
						}
						&::before {
							transform: scale(1,1);
							left: 85%;
						}
					}

					&::before {
						transform: scale(0,0);
						position: absolute;
						bottom: -3px;
						left: 15%;
						content: '';
						display: block;
						height: 6px;
						border-radius: 50%;
						width: 6px;
						background: var(--color-accent);
						transform: scale(0,0);
						transition: .4s;

					}

					&::after {
						position: absolute;
						bottom: 0;
						left: 15%;
						content: '';
						display: block;
						height: 1px;
						width: 0%;
						background: var(--color-accent);
						transition: .4s;
					}

					a {

						&:hover {
							color: var(--color-link);
						}
						display:flex;
						align-items: center;
						border: none;
						background: none;
						font-weight: bold;
						height: 40px;
						padding: 0 10px;

						&::before {
							content: none;
						}
					}
				}
				margin-bottom: 25px;

				ul {
				margin-top: 15px;
				margin-bottom: -5px;
				text-align: center;
				@media only screen and (min-width: 768px) {
					display: none;
				}
			}

			li {
				display: inline-block;
				margin: 0 5px 10px;
				a {
					border: 1px solid var(--color-blue);
					border-radius: 4px;
					color: var(--color-blue);
					display: inline-block;
					padding: 5px 15px;
					font-weight: 400;
					font-size: 1.4rem;
					background: #e3e3e3;
					text-decoration: none;
				}
			}
		}
	}
	.c-nav__sns {
		max-width: 400px;
	    margin: 0 auto;
		text-align: center;

		@media only screen and (min-width: 768px) {
			display: none;
		}

		a {
			background: #fff;
			display: inline-block;
			height: 44px;
			line-height: 44px;
			width: 44px;
			border-radius: 50%;
			color: var(--color-blue);
			border: 1px solid var(--color-blue);
			margin: 0  8px;
		}
	}
`

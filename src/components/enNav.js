import React, { useState } from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faSlideshare,
} from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import { siteMetadata } from "../../gatsby-config"

const GlobalNav = ({ title, location }) => {
  const [isOpen, setIsOpen] = useState(false)

  const move = e => {
    isOpen === false
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll")
    setIsOpen(!isOpen)
  }

  return (
    <NavWrapper>
      <nav className="c-grid--flex">
        <div className="c-nav">
          <button
            type="button"
            onClick={move}
            className={isOpen ? "c-nav__btn open is-active" : "c-nav__btn"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 311.65 104.12">
              <path className="fish" d="M120.23,.4c-20.97,.42-34.81,1.65-43.98,4.53,.4-.07,.78-.15,1.18-.22l-.07,.02V99.44c9.9,2.35,23.77,3.46,42.87,3.96,56.37,1.47,106.64-20.12,139.21-51.5C226.87,20.52,176.61-.73,120.23,.4Z"/><path className="d" d="M0,52.19c11.66,25.5,39.71,40.56,77.37,47.36V4.73l.07-.02C38.83,11.46,14.03,26.86,0,52.19Zm47.66-12c3.04,0,5.5,2.46,5.5,5.5s-2.46,5.5-5.5,5.5-5.5-2.46-5.5-5.5,2.46-5.5,5.5-5.5Z"/><path  className="born" d="M311.65,104.12c-7.97-15.54-15.2-33.27-21.54-52.82,6.13-18.92,13.09-36.13,20.75-51.3-25.62,10.64-48.1,27.29-65.71,48.19h-22.33c-.29-9.17-1.62-18.17-3.99-25.6-2.37,7.44-3.7,16.43-3.99,25.6h-20.83c-.21-12.63-1.07-25.18-3.95-37.61-2.88,12.44-3.74,24.98-3.95,37.61h-20.97c-.18-14.99-1.02-29.9-3.97-44.72-2.95,14.82-3.78,29.73-3.97,44.72h-17.89c-.18-15.84-1-31.61-3.97-47.28-2.97,15.67-3.8,31.44-3.97,47.28h-19.39c-.19-15.84-1.03-31.61-3.96-47.28-2.94,15.68-3.78,31.44-3.96,47.28h-26.69V4.73l.07-.02C38.83,11.46,14.03,26.86,0,52.19c11.66,25.5,39.71,40.56,77.37,47.36V55.19h26.69c.17,15.98,1,31.88,3.97,47.7,2.98-15.81,3.81-31.71,3.97-47.7h19.39c.18,15.58,1.03,31.09,3.97,46.5,2.94-15.41,3.78-30.92,3.96-46.5h17.91c.18,14.83,1.03,29.58,3.96,44.24,2.93-14.66,3.78-29.41,3.96-44.24h20.96c.19,12.78,1.03,25.46,3.96,38.04,2.93-12.58,3.78-25.26,3.96-38.04h20.81c.25,9.32,1.57,18.47,4,26.02,2.42-7.55,3.75-16.7,4-26.02h21.98c17.83,21.31,40.72,38.24,66.83,48.93ZM47.66,51.19c-3.04,0-5.5-2.46-5.5-5.5s2.46-5.5,5.5-5.5,5.5,2.46,5.5,5.5-2.46,5.5-5.5,5.5Z"/>
              </svg>
          </button>
          <div className="c-nav__container" role="navigation">
            <ul className="c-nav__child">
              <li>
                <Link className="c-nav__navLink" to="/" onClick={move}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="c-nav__navLink" to="/blogs/" onClick={move}>
                  Blog
                </Link>
                <ul>
                  {siteMetadata.category.map((item, index) => {
                    return (
                      <li key={`nav${index}`}>
                        <Link to={`/blogs/${item.slug}/`} onClick={move}>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
              <li>
                <Link className="c-nav__navLink" to="/about/" onClick={move}>
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  className="c-nav__navLink"
                  to="/portfolio/"
                  onClick={move}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className="c-nav__navLink" to="/contact" onClick={move}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className="c-nav__sns">
              <Link
                to="https://twitter.com/LirioY"
                target="_blank"
                rel="noopener nofollow"
                className="c-nav__snsBtn"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link
                to="https://www.instagram.com/yurico.k"
                target="_blank"
                rel="noopener nofollow"
                className="c-nav__snsBtn"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link
                to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                target="_blank"
                rel="noopener nofollow"
                className="c-nav__snsBtn"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </Link>
              <Link
                to="https://www2.slideshare.net/yurikamimori"
                target="_blank"
                rel="noopener nofollow"
                className="c-nav__snsBtn"
              >
                <FontAwesomeIcon icon={faSlideshare} />
              </Link>
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
		width: 60px;
		height: 50px;
		right: 10px;
    padding-top: 10px;
		top: 30px;
		display: inline-block;
		transition: .3s;
		background: none;
		border: none;
		outline: none;
		z-index: 200;
    color: #264785;

    path {
      fill: #264785;
    }

    &::after {
      font-weight: bold;
      margin-top: 5px;
      display: inline-block;
      content: 'MENU';
    }
    &.is-active {
      &::after {
        content: 'CLOSE';
      }
      .fish {
        transform-origin: center;
        transform: scaleY(0);
      }

    }

    .fish {
      transition:.5s;
    }
		@media only screen and (min-width: 768px) {
			display: none;
		}
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
@media only screen and (max-width: 769px) {
	.c-nav .c-nav__btn.is-active ~ .c-nav__container {
		top: 60px;
		opacity: 1;
		z-index: 200;
	}
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
		background: var(--nav-bg);
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
            color: #264785;
						&:hover {
							color: #1231b8;
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
					border: 1px solid #264785;
					border-radius: 4px;
					color: #264785;
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
			color: #264785;
			border: 1px solid #264785;
			margin: 0  8px;
		}
	}
`

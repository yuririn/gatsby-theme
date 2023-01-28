import React, { useState } from "react"
import { Link } from "gatsby"
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
      <button
        type="button"
        onClick={move}
        aria-label="メニューボタン"
        className={isOpen ? "c-nav__btn open is-active" : "c-nav__btn"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 311.65 104.12">
          <path className="fish" d="M120.23,.4c-20.97,.42-34.81,1.65-43.98,4.53,.4-.07,.78-.15,1.18-.22l-.07,.02V99.44c9.9,2.35,23.77,3.46,42.87,3.96,56.37,1.47,106.64-20.12,139.21-51.5C226.87,20.52,176.61-.73,120.23,.4Z"/><path className="d" d="M0,52.19c11.66,25.5,39.71,40.56,77.37,47.36V4.73l.07-.02C38.83,11.46,14.03,26.86,0,52.19Zm47.66-12c3.04,0,5.5,2.46,5.5,5.5s-2.46,5.5-5.5,5.5-5.5-2.46-5.5-5.5,2.46-5.5,5.5-5.5Z"/><path  className="born" d="M311.65,104.12c-7.97-15.54-15.2-33.27-21.54-52.82,6.13-18.92,13.09-36.13,20.75-51.3-25.62,10.64-48.1,27.29-65.71,48.19h-22.33c-.29-9.17-1.62-18.17-3.99-25.6-2.37,7.44-3.7,16.43-3.99,25.6h-20.83c-.21-12.63-1.07-25.18-3.95-37.61-2.88,12.44-3.74,24.98-3.95,37.61h-20.97c-.18-14.99-1.02-29.9-3.97-44.72-2.95,14.82-3.78,29.73-3.97,44.72h-17.89c-.18-15.84-1-31.61-3.97-47.28-2.97,15.67-3.8,31.44-3.97,47.28h-19.39c-.19-15.84-1.03-31.61-3.96-47.28-2.94,15.68-3.78,31.44-3.96,47.28h-26.69V4.73l.07-.02C38.83,11.46,14.03,26.86,0,52.19c11.66,25.5,39.71,40.56,77.37,47.36V55.19h26.69c.17,15.98,1,31.88,3.97,47.7,2.98-15.81,3.81-31.71,3.97-47.7h19.39c.18,15.58,1.03,31.09,3.97,46.5,2.94-15.41,3.78-30.92,3.96-46.5h17.91c.18,14.83,1.03,29.58,3.96,44.24,2.93-14.66,3.78-29.41,3.96-44.24h20.96c.19,12.78,1.03,25.46,3.96,38.04,2.93-12.58,3.78-25.26,3.96-38.04h20.81c.25,9.32,1.57,18.47,4,26.02,2.42-7.55,3.75-16.7,4-26.02h21.98c17.83,21.31,40.72,38.24,66.83,48.93ZM47.66,51.19c-3.04,0-5.5-2.46-5.5-5.5s2.46-5.5,5.5-5.5,5.5,2.46,5.5,5.5-2.46,5.5-5.5,5.5Z"/>
          </svg>
      </button>
      <nav role="navigation" className= {
          isOpen ? "is-active": ""
      }

      >
        <ul className="c-nav">
          <li>
            <Link to="/" onClick={move}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs/" onClick={move}>
              Blog
            </Link>
            <ul className="c-nav__child">
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
            <Link to="/about/" onClick={move}>
              About Me
            </Link>
          </li>
          <li>
            <Link

              to="/portfolio/"
              onClick={move}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={move}>
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
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
            </Link>
            <Link
              to="https://www.instagram.com/yurico.k"
              target="_blank"
              rel="noopener nofollow"
              className="c-nav__snsBtn"
            >
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
            </Link>
            <Link
              to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
              target="_blank"
              rel="noopener nofollow"
              className="c-nav__snsBtn"
            >
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
            </Link>
            <Link
              to="https://www2.slideshare.net/yurikamimori"
              target="_blank"
              rel="noopener nofollow"
              className="c-nav__snsBtn"
            >
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="slideshare" className="svg-inline--fa fa-slideshare fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M187.7 153.7c-34 0-61.7 25.7-61.7 57.7 0 31.7 27.7 57.7 61.7 57.7s61.7-26 61.7-57.7c0-32-27.7-57.7-61.7-57.7zm143.4 0c-34 0-61.7 25.7-61.7 57.7 0 31.7 27.7 57.7 61.7 57.7 34.3 0 61.7-26 61.7-57.7.1-32-27.4-57.7-61.7-57.7zm156.6 90l-6 4.3V49.7c0-27.4-20.6-49.7-46-49.7H76.6c-25.4 0-46 22.3-46 49.7V248c-2-1.4-4.3-2.9-6.3-4.3-15.1-10.6-25.1 4-16 17.7 18.3 22.6 53.1 50.3 106.3 72C58.3 525.1 252 555.7 248.9 457.5c0-.7.3-56.6.3-96.6 5.1 1.1 9.4 2.3 13.7 3.1 0 39.7.3 92.8.3 93.5-3.1 98.3 190.6 67.7 134.3-124 53.1-21.7 88-49.4 106.3-72 9.1-13.8-.9-28.3-16.1-17.8zm-30.5 19.2c-68.9 37.4-128.3 31.1-160.6 29.7-23.7-.9-32.6 9.1-33.7 24.9-10.3-7.7-18.6-15.5-20.3-17.1-5.1-5.4-13.7-8-27.1-7.7-31.7 1.1-89.7 7.4-157.4-28V72.3c0-34.9 8.9-45.7 40.6-45.7h317.7c30.3 0 40.9 12.9 40.9 45.7v190.6z"></path></svg>
            </Link>
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
    [role=navigation] {
        @media only screen and (max-width: 767px) {
            height: 0;
            overflow: hidden;
            &.is-active {
                 background: var(--filter);
                left: 0;
                top: 60px;
                position: fixed;
                height: calc(100% - 60px);
                justify-content: center;
                flex-direction: column;
                padding: 15px;
                display: flex;
                align-items: center;
            }
        }
    }
	.c-nav {

        @media only screen and (min-width: 768px) {
            height: auto;
            gap: 24px;
            display: flex;
        }
        & > li {
            @media only screen and (max-width: 767px) {
                margin-bottom: 24px;
            }
            & > a {
                letter-spacing: .15em;
                color: #264785;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                @media only screen and (max-width: 767px) {
                    color: var(--color-blue);
                    padding: 12px 8px;
                    margin: 0 auto;
                    border-radius: 4px;
                    text-shadow: 0 0 2px var(--filter);
                    font-size: 2rem;
                    height: 38px;
                    &::before {
                        content: "";
                        width: 8px;
                        margin-right: 10px;
                        height: 8px;
                        display: inline-block;
                        border: 2px solid var(--color-accent);
                        border-bottom: none;
                        border-left: none;
                        transform: rotate(45deg);
                    }
                }
                @media only screen and (min-width: 768px) {
                    height: 50px;
                    position: relative;

                    &::before {
                        content: '';
                        background: var(--color-accent);
                        position: absolute;
                        bottom: -6px;
                        left: 0%;
                        height: 1px;
                        width: 0;
                        transition: .3s;
                    }
                    &::after {
                        content: '';
                        background: var(--color-accent);
                        position: absolute;
                        bottom: -9px;
                        left: 0;
                        height: 7px;
                        width: 7px;
                        border-radius: 50%;
                        transform: scale(0);
                        transition: .3s;
                    }
                    &:hover {
                        &::before {
                            width: 100%;
                        }
                        &::after {
                            transform: scale(100%);
                            left: 100%;
                        }
                        color: #1231b8;
                    }

                 }
            }
        }
	}
    .c-nav__child {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        gap: 8px;
        li {
            flex-grow: 1;
            a {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 30px;
                text-shadow: 0 0 2px var(--filter);
                font-size: 1.4rem;
                border-radius: 8px;
                text-align: center;
                text-decoration: none;
                padding: 4px 8px;
                border: none;
                color: var(--color-blue);

                border: 1px solid var(--color-blue);
            }
        }
        @media only screen and (min-width: 768px) {
            display: none;
        }
    }
    .c-nav__sns {
         display: flex;
         flex-wrap: wrap;
         gap: 16px;
         font-size: 2rem;
         a {
            border: 1px solid var(--color-blue);
            color: var(--color-blue);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
                width: 20px;
                height: 20px;
            }
         }
        @media only screen and (min-width: 768px) {
            display: none;
        }
    }
	// .c-nav .c-nav__btn.is-active ~ .c-nav__container {
	// 	top: 60px;
	// 	opacity: 1;
	// 	z-index: 200;
	// }
}
	// 	opacity: 0;
	// 	transition: opacity .3s;
	// 	padding: 30px 15px;
	// 	position: fixed;
	// 	right: 0;
	// 	top: 60px;
	// 	width: 100%;
	// 	height: calc(100% - 60px);
	// 	background: var(--nav-bg);
	// 	overflow: auto;
	// 	z-index: -9999;

	// 	@media only screen and (min-width: 768px) {
	// 		opacity: 1;
	// 		z-index: 200;
	// 		background: none;
	// 		height: 60px;
	// 		right: 15px;
	// 		width: calc(100% - 200px);
	// 		top: 0;
	// 		padding: 0;
	// 		display: flex;
	// 		justify-content: flex-end;
	// 		overflow: inherit;
	// 	}
	// 	.c-nav__child {
	// 		max-width: 400px;
	// 		width: 100%;
	// 	    margin: auto;
	// 		@media only screen and (min-width: 768px) {
	// 			margin: 0;
	// 			height: 60px;
	// 			max-width: initial;
	// 			width: 100%;
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: flex-end;
	// 		}
	// 		li {
	// 			@media only screen and (min-width: 768px) {
	// 				display:flex;
	// 				align-items: center;
	// 				height: 60px;
	// 				margin-bottom: 0;
	// 				padding: 10px 5px;
	// 				position: relative;
	// 				&:hover {
	// 					&::after {
	// 						width: 70%;
	// 					}
	// 					&::before {
	// 						transform: scale(1,1);
	// 						left: 85%;
	// 					}
	// 				}
	// 				&::before {
	// 					transform: scale(0,0);
	// 					position: absolute;
	// 					bottom: -3px;
	// 					left: 15%;
	// 					content: '';
	// 					display: block;
	// 					height: 6px;
	// 					border-radius: 50%;
	// 					width: 6px;
	// 					background: var(--color-accent);
	// 					transform: scale(0,0);
	// 					transition: .4s;
	// 				}
	// 				&::after {
	// 					position: absolute;
	// 					bottom: 0;
	// 					left: 15%;
	// 					content: '';
	// 					display: block;
	// 					height: 1px;
	// 					width: 0%;
	// 					background: var(--color-accent);
	// 					transition: .4s;
	// 				}
	// 				a {
    //         color: #264785;
	// 					&:hover {
	// 						color: #1231b8;
	// 					}
	// 					display:flex;
	// 					align-items: center;
	// 					border: none;
	// 					background: none;
	// 					font-weight: bold;
	// 					height: 40px;
	// 					padding: 0 10px;
	// 					&::before {
	// 						content: none;
	// 					}
	// 				}
	// 			}
	// 			margin-bottom: 25px;
	// 			ul {
	// 			margin-top: 15px;
	// 			margin-bottom: -5px;
	// 			text-align: center;
	// 			@media only screen and (min-width: 768px) {
	// 				display: none;
	// 			}
	// 		}
	// 		li {
	// 			display: inline-block;
	// 			margin: 0 5px 10px;
	// 			a {
	// 				border: 1px solid #264785;
	// 				border-radius: 4px;
	// 				color: #264785;
	// 				display: inline-block;
	// 				padding: 5px 15px;
	// 				font-weight: 400;
	// 				font-size: 1.4rem;
	// 				background: #e3e3e3;
	// 				text-decoration: none;
	// 			}
	// 		}
	// 	}
	// }
	// .c-nav__sns {
	// 	max-width: 400px;
	//     margin: 0 auto;
	// 	text-align: center;
	// 	@media only screen and (min-width: 768px) {
	// 		display: none;
	// 	}
	// 	a {
	// 		background: #fff;
	// 		display: inline-block;
	// 		height: 44px;
	// 		line-height: 44px;
	// 		width: 44px;
	// 		border-radius: 50%;
	// 		color: #264785;
	// 		border: 1px solid #264785;
	// 		margin: 0  8px;
	// 	}
	// }

`

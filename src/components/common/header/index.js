import React, { useState } from "react"
import Logo from "./logo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faYoutube, faSlideshare} from "@fortawesome/free-brands-svg-icons";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import Search from "../../search/"
import styled from 'styled-components';

const Header = ({ title, location }) => {

	return (
	<HeaderWrapper>
		<header className="l-header">
			<div>
				 <div id="header-logo">
					<span>セブ島に住むフロントエンドエンジニアの雑記</span>
					{location === '/' ? <h1><Logo /></h1> : <Link to="/"><Logo /></Link>}
				</div>
			</div>
		</header>
	</HeaderWrapper>
	)
}

export default Header

const HeaderWrapper = styled.div`
	.l-header {
		position: fixed;
		left: 0;
		top: 0;
		height: 60px;
		width: 100%;
		background: hsla(0,0%,100%,.9);
		box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
		z-index: 100;
		display: flex;
		align-items: center;

	}
	#header-logo span{
		display: block;
		font-size: 1rem;
		padding-left: 15px;
		margin-bottom: 5px;
		padding-top: 5px;
		@media screen and (min-width: 768px){
			padding-left: 30px;
		}
	}

	#header-logo svg {
    height: 34px;
    transition: .3s;
		margin-left: 15px;
		@media screen and (min-width: 768px){
			margin-left: 30px;
		}
	}
	#header-logo svg {
		fill: var(--color-blue);
	}
`

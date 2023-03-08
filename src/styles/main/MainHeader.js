import styled from "styled-components";

export const MainHeader = styled.header`
.l-header {
	color: #232a41;
	position: fixed;
	left: 0;
	top: 0;
	height: 60px;
	width: 100%;
	background: var(--header-background);
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
	padding: 0 20px;
	-webkit-backdrop-filter: blur(3px);
	backdrop-filter: blur(3px);
}

.l-header__logo {
	text-decoration: none;
	color: #264785;
	display: block;
	line-height: 1;
	font-size: 1rem;
	white-space: nowrap;
}

.l-header__logo svg {
	height: 34px;
	transition: 0.3s;
	fill: #264785;
	display: block;
	margin-top: 3px;
}

.c-nav > li > a {
	letter-spacing: 0.15em;
	color: #264785;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
}

.c-nav__child {
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;
	gap: 8px;
}

.c-nav__child li {
	flex-grow: 1;
}

.c-nav__child li a {
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
	transition: 0.3s;
	background: none;
	border: none;
	outline: none;
	z-index: 200;
	color: #264785;
}

.c-nav__btn path {
	fill: #264785;
}

.c-nav__btn::after {
	font-weight: bold;
	margin-top: 5px;
	display: inline-block;
	content: "MENU";
}

.c-nav__btn.is-active::after {
	content: "CLOSE";
}

.c-nav__btn.is-active .fish {
	transform-origin: center;
	transform: scaleY(0);
}

.c-nav__btn .fish {
	transition: 0.5s;
}

.c-search {
	display: flex;
}

.c-search__btn {
	z-index: 200;
	border: none;
	width: 38px;
	height: 38px;
	border-radius: 50%;
	display: block;
	background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35.997" height="36.004" viewBox="0 0 35.997 36.004"><path id="Icon_awesome-search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z" fill="%23fff"/></svg>') center/20px auto no-repeat #264785;
	border: none;
	position: fixed;
	border: 1px solid #264785;
	right: 15px;
	top: 10px;
	font-size: 0;
	padding-top: 30px;
	transition: 0.3s;
}

.c-search__btn:hover {
	cursor: pointer;
	background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35.997" height="36.004" viewBox="0 0 35.997 36.004"><path id="Icon_awesome-search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z" fill="%23264785"/></svg>') center/20px auto no-repeat #fff;
}

.c-search__bg {
	cursor: pointer;
}

.c-search__form {
	font-size: 16px;
	background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35.997" height="36.004" viewBox="0 0 35.997 36.004"><path id="Icon_awesome-search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z" fill="%23264785"/></svg>') center right 12px/30px auto no-repeat rgba(255, 255, 255, 0.8);
	border: var(--color-blue) 1px solid;
	border-radius: 50px;
	width: 100%;
	border: #264785 2px solid;
}

.c-search__result p {
	margin: 15px 0;
	text-align: center;
	color: var(--color);
}

.c-search__result p strong {
	color: var(--color-accent);
}

.c-search__result ul {
	overflow: auto;
	max-height: 60vh;
	background: var(--pale-gray);
	border-radius: 18px;
	border: 1px solid var(--color-blue);
}

.c-search__result ul a {
	display: block;
	font-weight: normal;
	text-decoration: none;
	line-height: 1.4;
	color: var(--color-blue);
	padding: 8px;
	border-bottom: 1px solid var(--color-blue);
}

.c-search__result ul li {
	padding: 2px 0;
}

.c-search__result ul li:last-child {
	margin-bottom: 16px;
}

.c-search__result ul li:last-child a {
	border-bottom: 0;
}

.c-search__result ul li time {
	display: block;
	font-weight: bold;
}

.is-active .c-search {
	display: block;
}

.is-active .c-search.active + .c-nav {
	display: none;
}

@media screen and (min-width: 768px) {

.l-header__logo:hover svg {
	fill: #1231b8;
	cursor: pointer;
}

.c-nav__wrapper {
	padding-right: 50px;
}

.c-nav > li > a {
	height: 50px;
	position: relative;
}

.c-nav > li > a::before {
	content: "";
	background: var(--color-accent);
	position: absolute;
	bottom: -6px;
	left: 0%;
	height: 1px;
	width: 0;
	transition: 0.3s;
}

.c-nav > li > a::after {
	content: "";
	background: var(--color-accent);
	position: absolute;
	bottom: -9px;
	left: 0;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	transform: scale(0);
	transition: 0.3s;
}

.c-nav > li > a:hover {
	color: #1231b8;
}

.c-nav > li > a:hover::before {
	width: 100%;
}

.c-nav > li > a:hover::after {
	transform: scale(100%);
	left: 100%;
}

.c-nav {
	height: auto;
	gap: 24px;
	display: flex;
}

.c-nav__child {
	display: none;
}

.c-search__inner {
	display: none;
}

.c-search__inner.show {
	z-index: 100;
	flex-direction: column;
	position: fixed;
	left: 0;
	top: 0;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100%;
	display: flex;
	z-index: 100;
}

.c-search__inner.show .c-search__bg {
	z-index: -1;
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	left: 0;
	top: 60px;
	height: calc(100vh - 60px);
	width: 100%;
	display: block;
}

.c-search__form {
	border: #264785 5px solid;
	box-sizing: border-box;
	font-size: 24px;
	padding: 16px 50px 16px 24px;
	max-width: 700px;
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translateX(-50%);
	height: 80px;
}

.c-search__form::-moz-placeholder {
	font-weight: bold;
	color: #000;
	font-size: 16px;
	text-align: center;
}

.c-search__form::placeholder {
	font-weight: bold;
	color: #000;
	font-size: 16px;
	text-align: center;
}

.c-search__result {
	max-width: 700px;
	width: 100%;
	position: absolute;
	top: calc(30% + 100px);
	left: 50%;
	transform: translateX(-50%);
}

.c-search__result p {
	background: var(--pale-gray);
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	padding: 24px;
	border-radius: 16px;
}

.c-search__result p.no-result {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	border-bottom: 1px solid var(--color-blue);
}

.c-search__result ul {
	max-height: 250px;
	border: none;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.c-search__result ul a {
	padding: 8px 16px;
}

body.no-scroll--search {
	overflow: hidden;
}

}

@media only screen and (min-width: 768px) {

.c-nav__btn {
	display: none;
}

}

@media screen and (max-width: 769px) {

.c-nav > li {
	margin-bottom: 8px;
}

.c-nav > li > a {
	color: var(--color-blue);
	padding: 10px 8px;
	margin: 0 auto;
	border-radius: 4px;
	text-shadow: 0 0 2px var(--filter);
	font-size: 1.6rem;
	height: 20px;
}

.c-nav > li > a::before {
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

[role=navigation] {
	height: 0;
	overflow: hidden;
}

[role=navigation].is-active {
	width: 100%;
	background: var(--filter);
	left: 0;
	top: 60px;
	position: fixed;
	height: calc(100vh - 60px);
	flex-direction: column;
	padding: 15px;
	display: flex;
	align-items: center;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
}

.c-search {
	position: relative;
	margin: 20px 0;
	width: 100%;
}

.c-search__btn {
	display: none;
}

.c-search__bg {
	display: none;
}

.c-search__form {
	padding: 4px 50px 4px 16px;
	height: 40px;
	box-sizing: border-box;
}

.c-search__result p:not(.no-result) + ul {
	display: none;
}

.c-search__result ul li:first-child {
	margin-top: 16px;
}

}


`

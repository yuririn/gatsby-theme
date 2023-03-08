import styled from "styled-components";

export const MainFooter = styled.footer`
.l-footer {
	z-index: 10;
	position: relative;
	background: var(--footer-background);
	padding: 50px 0 30px;
	color: #fff;
	line-height: 1;
}

.l-footer [aria-label] {
	position: fixed;
	bottom: 15px;
	right: 15px;
	border: none;
	display: flex;
	width: 50px;
	height: 50px;
	background: var(--move-to);
	border: 1px solid var(--color-blue);
	border-radius: 50%;
	-webkit-backdrop-filter: blur(3px);
	backdrop-filter: blur(3px);
	content: "";
	transition: 0.3s;
	justify-content: center;
	align-items: center;
}

.l-footer [aria-label]::before {
	display: block;
	width: 10px;
	height: 10px;
	content: "";
	left: 50%;
	transform: rotate(45deg);
	border-top: 2px solid var(--color-blue);
	border-left: 2px solid var(--color-blue);
	transition: 0.3s;
}

.l-footer .l-footer__copyright {
	font-size: 1.2rem;
	letter-spacing: 0.1em;
}

.l-footer .p-footerNav {
	margin-bottom: 25px;
}

.l-footer .p-footerNav__item {
	margin-bottom: 25px;
}

.l-footer .p-footerNav__item li + li {
	margin-top: 25px;
}

.l-footer .p-footerNav__item a {
	letter-spacing: 0.15em;
	color: #fff;
	display: block;
	position: relative;
	padding-left: 20px;
	text-decoration: none;
}

.l-footer .p-footerNav__item a:before {
	transition: 0.3s;
	position: absolute;
	content: "";
	width: 5px;
	height: 5px;
	top: 4px;
	left: 0;
	display: block;
	border: 1px solid #fff;
	border-bottom: none;
	border-left: none;
	transform: rotate(45deg);
}

.l-footer .p-footerNav__item--sns {
	margin-top: 40px;
	margin-bottom: 30px;
	text-align: center;
}

.l-footer .p-footerNav__item--sns li {
	display: inline-block;
	margin: 0 20px;
}

.l-footer .p-footerNav__item--sns li a {
	color: #fff;
}

.l-footer svg {
	width: 20px;
	height: 20px;
}

@media screen and (min-width: 768px) {

.l-footer [aria-label] {
	width: 70px;
	height: 70px;
}

.l-footer [aria-label]:hover {
	cursor: pointer;
	background: var(--color-blue);
	transform: translateY(-10px);
}

.l-footer [aria-label]:hover::before {
	border-color: var(--light-color);
}

.l-footer .p-footerNav__item a {
	transition: 0.3s;
}

.l-footer .p-footerNav__item a:hover {
	text-decoration: underline;
}

.l-footer .p-footerNav__item a:hover::before {
	left: 5px;
}

.l-footer .p-footerNav__item--sns {
	margin-top: 0;
	margin-bottom: 0;
	text-align: left;
}

.l-footer .p-footerNav__item--sns a {
	transition: 0.3s;
}

.l-footer .p-footerNav__item--sns a:hover {
	opacity: 0.5;
}

.l-footer .p-footerNav__item--sns li {
	margin-right: 0;
	margin-left: 0;
}

.l-footer .p-footerNav__item--sns li + li {
	margin-left: 20px;
}

.l-footer .p-footerNav {
	display: flex;
	justify-content: space-around;
}

}


`

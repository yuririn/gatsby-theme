import styled from "styled-components";

export const PortFolio = styled.main`
.body {
	background: #e95014;
	overflow: hidden;
	animation: Delete 0.1s 2s forwards;
	color: #333;
}

.body > * {
	opacity: 0;
	animation: loadIn 1s 2s forwards;
}

.body::before {
	position: fixed;
	display: block;
	content: "";
	width: 1px;
	height: 1px;
	display: block;
	top: 50%;
	left: 0;
	transform: translate(0, -50%);
	background: #ffffff;
	animation: boul 2s forwards;
}

.body .bg-gray {
	background: #eee;
	padding-bottom: 50px;
}

.body .p-mw800 {
	max-width: 800px;
	margin: 0 auto 30px;
}

.body .p-mw900 {
	max-width: 900px;
	margin: 0 auto 30px;
}

.body .center {
	text-align: center;
}

main p {
	line-height: 1.8;
}

.l-header {
	position: fixed;
	width: 100%;
	left: 0px;
	top: 0px;
	background-color: rgb(51, 51, 51);
	color: rgb(233, 80, 20);
	border-bottom: 1px solid rgb(233, 80, 20);
	z-index: 10;
	padding: 6px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold; /* メディアクエリ */
}

.l-header .logo {
	margin: 5px 0px 0px;
	float: left;
	padding-left: 15px;
	letter-spacing: 0.1em;
	font-weight: bold;
}

.l-header .nav-btn {
	top: 0;
	position: absolute;
	right: 0;
	display: none;
	display: block;
	width: 44px;
	height: 100%;
	font-size: 10px;
	text-align: center;
	padding-top: 26px;
}

.l-header .nav-btn::after,
.l-header .nav-btn::before {
	content: "";
	position: absolute;
	display: block;
	left: 12px;
	height: 3px;
	width: 20px;
	border-radius: 3px;
	background: #7F6844;
	transition: transform 0.3s;
}

.l-header .nav-btn::after {
	top: 8px;
	box-shadow: 0 7px 0 #3A682A;
}

.l-header .nav-btn::before {
	top: 22px;
}

.l-header .nav-btn.active::after,
.l-header .nav-btn.active::before {
	transform: scaleX(0);
}

.l-header .nav-btn.active svg .pan-bottom {
	animation: fall 0.7s forwards;
}

.l-header .nav-btn.active svg .pan-top {
	animation: fall 0.7s 1s forwards;
}

.l-header .nav-btn.active svg .gu {
	animation: fall 0.7s 0.5s forwards;
}

.l-header .nav-btn svg {
	left: 5px;
	top: 5px;
	width: 32px;
	position: absolute;
}

.l-header .nav-btn svg .pan-bottom,
.l-header .nav-btn svg .pan-top {
	fill: #7F6844;
	opacity: 0;
}

.l-header .nav-btn svg .gu {
	opacity: 0;
}

.l-header .nav-btn svg .lettuce {
	fill: #3A682A;
}

.l-header .nav-btn svg .hanburg {
	fill: #591C09;
}

.l-header nav.is-open ul li {
	text-align: center;
	padding: 20px;
}

.l-header nav.is-open ul li a {
	text-decoration: none;
	font-size: 2rem;
	letter-spacing: 0.1em;
}

.l-footer {
	background: #333;
	text-align: center;
	padding: 15px;
	padding-bottom: 50px;
	color: #ffffff;
}

.l-footer .footer-nav {
	margin-bottom: 10px;
}

.l-footer .footer-nav li {
	display: inline-block;
	margin-left: 10px;
	margin-right: 10px;
}

.l-footer .footer-nav a {
	color: #ffffff;
	padding: 5px;
	font-size: 2rem;
}

.l-footer .footer-btn {
	z-index: 10;
	position: fixed;
	bottom: -35px;
	left: calc(50% - 35px);
	width: 70px;
	height: 70px;
	background: #e95014;
	border-radius: 50%;
}

.l-footer .footer-btn::after {
	content: "";
	display: block;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	border-bottom: 2px solid #e95014;
}

.l-footer svg {
	width: 20px;
	height: 20px;
}

.l-footer .footer-btn::before {
	top: 14px;
	position: relative;
	content: "";
	width: 20px;
	height: 20px;
	border-left: 2px solid #fff;
	border-top: 2px solid #fff;
	transform: rotate(45deg);
	display: inline-block;
}

@media screen and (min-width: 768px) {

.u-text--center--pc {
	text-align: center;
}

.l-header .nav-btn {
	display: none;
}

.l-header .globalNavOpen ul,
.l-header .globalNav ul {
	display: block;
	padding: 0;
	list-style: none;
	text-align: right;
	font-size: 0;
	position: relative;
	z-index: 100;
}

.l-header .globalNavOpen ul li,
.l-header .globalNav ul li {
	text-align: center;
	display: inline-block;
}

.l-header .globalNavOpen ul li a,
.l-header .globalNav a {
	width: 120px;
	display: block;
	padding: 3px 15px;
	font-size: 1.8rem;
	letter-spacing: 0.1em;
	text-decoration: none;
	color: #e95014;
	font-family: "Archivo Black", sans-serif;
	position: relative;
	overflow: hidden;
	transition: 0.3s;
}

.l-header .globalNav a::after {
	content: "";
	position: absolute;
	bottom: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	display: block;
	background: rgba(233, 80, 20, 0.8);
	transition: 0.6s;
	z-index: -1;
}

.l-header .globalNav a:hover {
	color: #333;
}

.l-header .globalNav a:hover::after {
	left: 0;
}

}

@media screen and (min-width: 769px) {

.body .bg-gray {
	padding-bottom: 80px;
}

}

@media screen and (max-width: 769px) {

.l-header .globalNav ul {
	display: none;
	padding: 0 15px;
}

.l-header .globalNavOpen ul {
	display: block;
	position: absolute;
	top: 47px;
	left: 0;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	padding-top: 30px;
}

.l-header .globalNavOpen ul li {
	padding: 10px;
	text-align: center;
}

.l-header .globalNavOpen ul li a {
	box-sizing: border-box;
	text-decoration: none;
	font-weight: bold;
	letter-spacing: 0.1em;
	padding: 15px;
	max-width: 300px;
	font-size: 2rem;
	display: block;
	margin: 0 auto;
	width: 100%;
	color: rgb(233, 80, 20);
	background: rgb(51, 51, 51);
	border: 2px solid rgb(233, 80, 20);
}

}

@keyframes loadIn {

100% {
	opacity: 1;
}

}

@keyframes boul {

50% {
	top: 50%;
	height: 3px;
	width: 100%;
}

100% {
	top: 50%;
	width: 100%;
	height: 100%;
}

}

@keyframes Delete {

100% {
	background: #fff;
}

}

@keyframes irukaShow {

100% {
	transform: scale(1, 1);
}

}

@keyframes fadeIn {

100% {
	transform: translate(0, 0);
	opacity: 1;
}

}

@keyframes fall {

0% {
	opacity: 0;
	transform: translateY(-100%);
}

30% {
	opacity: 1;
	transform: translateY(-100%);
}

90% {
	opacity: 1;
	transform: translateY(0px);
}

95% {
	opacity: 1;
	transform: translateY(10px);
}

100% {
	opacity: 1;
	transform: translateY(0);
}

}

@keyframes loadIn {

100% {
	opacity: 1;
}

}

@keyframes boul {

50% {
	top: 50%;
	height: 3px;
	width: 100%;
}

100% {
	top: 50%;
	width: 100%;
	height: 100%;
}

}


`
import { createGlobalStyle } from "styled-components"

export const MainCommonStye = createGlobalStyle`
body {
	--color: #335;
	--light-color: #fff;
	--font-color: #232a41;
	--color-sec: #464675;
	--color-blue: #264785;
	--color-link: #1231b8;
	--color-d-blue: #18347a;
	--color-accent: #c03363;
	--shadow: 0 0 4px rgba(0, 0, 0, .3);
	--milk: rgba(225, 225, 225, .9);
	--background: #fff;
	--filter: rgba(255, 255, 255, .5);
	--pale-gray: #eeeeee;
	--yellow: #edef5c;
	--header-background: rgba(255, 255, 255, .5);
	--header-color: #264785;
	--footer-background: #264785;
	--move-to: rgba(255, 255, 255, 0.8);
	--nav-bg: rgba(51, 51, 51, .8);
	--border-color: var(--border-color);
	--code-bg: #131a37;
}

body.dark {
	--color: #fff;
	--light-color: #18347a;
	--font-color: #f4fffe;
	--color-blue: #c9e9fc;
	--color-link: #65ceff;
	--color-d-blue: #f9fdff;
	--code-bg: #1b2845;
	--color-sec: #c5fff4;
	--color-accent: #d45c84;
	--background: rgb(21, 21, 21);
	--filter: rgba(21, 21, 21, .8);
	--pale-gray: #373738;
	--yellow: rgba(247, 255, 3, 0.4);
	--header-background: rgba(255, 255, 255, .5);
	--header-color: #264f85;
	--footer-background: #264f85;
	--move-to: rgba(255, 255, 255, 0.1);
	--nav-bg: rgba(58, 58, 58, 0.95);
	--border-color: #787878;
}

hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #cccccc;
	margin: 1em 0;
	padding: 0;
}

main {
	background: var(--background);
}

body {
	color: var(--font-color);
	background: var(--baackground);
}

.l-container,
.l-container--md {
	max-width: 1120px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 16px;
	padding-right: 16px;
}

.l-container--md {
	max-width: 700px;
}

.l-main_contents {
	margin-top: 0;
	margin-bottom: 50px;
}

.l-main_contents.is-page {
	padding-top: 80px;
}

.c-grid {
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
}

.c-grid__item {
	width: 100%;
}

.c-grid__item--md6 {
	margin-bottom: 0;
}

.c-grid__item--lg4 {
	margin-bottom: 0;
}

.c-article__heading {
	font-size: 2.4rem;
	font-weight: 700;
	margin-bottom: 10px;
	color: var(--color-d-blue);
	line-height: 1.4;
}

.l-body--article {
	padding: 0 16px;
}

.l-body--article aside.l-container .display {
	margin-bottom: 50px;
}

.p-localNav__item {
	position: relative;
	height: 130px;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.6);
	margin-bottom: 30px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	background: var(--color-blue);
	font-size: 1.4rem;
	font-weight: bold;
}

.p-localNav__item .gatsby-image-wrapper {
	height: 100%;
	width: 100%;
	transition: 0.3s;
}

.p-localNav__item img {
	-o-object-fit: cover;
	object-fit: cover;
	height: 100%;
	width: 100%;
}

.p-pageHeader {
	position: relative;
	height: 250px;
	overflow: hidden;
	margin-bottom: 20px;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.6), 0 0 12px rgba(0, 0, 0, 0.4);
	background: var(--color-blue);
	font-weight: bold;
}

.p-pageHeader__img {
	opacity: 0.6;
	height: 100%;
	width: 100%;
	filter: blur(2px);
}

.p-pageHeader__img img {
	-o-object-fit: cover;
	object-fit: cover;
}

.p-pageHeader__main {
	position: relative;
	z-index: 1;
	color: #fff;
	height: 100%;
	position: absolute;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	text-align: center;
}

.p-pageHeader__heading {
	padding-top: 50px;
	letter-spacing: 0.1em;
	font-size: 2rem;
	font-weight: 700;
}

.p-pageHeader__heading::after {
	content: "";
	height: 2px;
	width: 30px;
	display: block;
	margin: 15px auto 15px;
	background: #c03363;
}

.p-localNav__main {
	z-index: 1;
	position: absolute;
	color: #fff;
	text-align: center;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 0 15px;
}

.p-localNav__heading {
	color: #fff;
	width: 100%;
	font-size: 1.6rem;
	font-weight: 700;
	margin-bottom: 10px;
	letter-spacing: 0.05em;
}

.p-localNav__heading:after {
	content: "";
	display: block;
	height: 2px;
	width: 20px;
	margin: 10px auto 0;
	background: var(--color-accent);
}

.c-bio {
	line-height: 2;
	max-width: 700px;
	margin: 0 auto;
	padding-bottom: 50px;
}

.c-bio .prfImg {
	width: 200px;
	border-radius: 50%;
	display: block;
	margin: 0 auto 30px;
}

.c-bio .prfImg img {
	border-radius: 50%;
	overflow: hidden;
}

.c-bio ul + *,
.c-bio p + * {
	margin-top: 1em;
}

.c-bio ul {
	list-style: none;
}

.c-bio ul + p {
	margin-bottom: 1em;
}

.c-bio ul > li {
	padding-left: 1.5em;
	position: relative;
	margin-bottom: 0.5em;
}

.c-bio ul > li::before {
	left: 8px;
	top: 6px;
	display: block;
	color: #001d7c;
	content: "";
	width: 0.3em;
	height: 0.6em;
	background: none;
	position: absolute;
	transform: rotate(45deg);
	border: 4px solid var(--color-accent);
	border-width: 0 3px 3px 0;
}

.c-heading--lg {
	font-weight: 700;
	text-align: center;
	margin-bottom: 30px;
	line-height: 1.6;
	font-size: 1.8rem;
	letter-spacing: 0.1em;
}

.c-heading--lg::after {
	content: "";
	display: block;
	width: 30px;
	height: 2px;
	background: var(--color-accent);
	margin: 7px auto 0px;
}

.c-first-view {
	margin-bottom: 50px;
	background: linear-gradient(135deg, rgb(47, 89, 188) 0%, rgb(93, 154, 173) 100%);
	padding-top: 80px;
	padding-bottom: 20px;
	position: relative;
	overflow: hidden;
}

.c-first-view::before {
	position: absolute;
	bottom: -10px;
	left: 0;
	height: 100px;
	content: "";
	opacity: 0.2;
	background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 252.62"><path d="M237.53,36.5C158.35,10.11,79.18-1.95,0,.26V252.62H900V.02c-74.71-.56-149.41,11.58-224.12,36.48-146.12,48.71-292.23,48.71-438.35,0Z" fill="%23fff"/></svg>') bottom/299px repeat-x;
	animation: waveSm linear 10s infinite;
	width: 598px;
}

.c-first-view::after {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 1796px;
	height: 100px;
	content: "";
	opacity: 0.1;
	background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 252.62"><path d="M237.53,36.5C158.35,10.11,79.18-1.95,0,.26V252.62H900V.02c-74.71-.56-149.41,11.58-224.12,36.48-146.12,48.71-292.23,48.71-438.35,0Z" fill="%23fff"/></svg>') bottom/299px repeat-x;
	animation: wave linear 15s 15s infinite;
}

.c-first-view p {
	color: #fff;
	line-height: 1.8;
	text-shadow: 0 0 2px #000;
	text-shadow: 0 0 2px rgb(47, 89, 188);
}

.c-first-view .l-container {
	position: relative;
	z-index: 10;
	max-width: 700px;
}

.c-first-view svg#hero {
	width: 320px;
	margin-bottom: 10px;
}

.c-first-view svg#hero path {
	fill: #264785;
	stroke: #fff;
	stroke-width: 3;
	paint-order: stroke;
}

.u-text-center {
	text-align: center;
}

.u-mblg {
	margin-bottom: 32px;
}

.u-mblg {
	margin-bottom: 32px;
}

.p-section {
	margin-bottom: 50px;
}

.c-form__submit,
.c-nav__navLink,
.p-btn--detail {
	position: relative;
	z-index: 1;
	display: inline-block;
	line-height: 1;
	text-align: center;
	width: 100%;
	padding: 20px 0;
	border: 1px solid var(--color-blue);
	color: var(--color-blue);
	border-radius: 5px;
	letter-spacing: 0.15em;
	font-size: 1.6rem;
	overflow: hidden;
	text-decoration: none;
	background: var(--background);
	max-width: 400px;
}

.c-form__submit:before,
.c-nav__navLink:before,
.p-btn--detail:before {
	transform: skew(-45deg);
	z-index: -1;
	transition: 0.3s;
	position: absolute;
	content: "";
	display: block;
	left: -120%;
	top: 0;
	width: 120%;
	height: 100%;
	background: var(--color-blue);
}

.ads + .p-section {
	margin-top: 50px;
}

@media screen and (min-width: 768px) {

.l-container,
.l-container--md {
	padding-left: 32px;
	padding-right: 32px;
}

.c-grid {
	gap: 32px;
}

.c-grid__item--md6 {
	width: calc(50% - 16px);
}

.c-article__heading {
	margin-bottom: 30px;
	font-size: 2.8rem;
}

.l-body--article {
	padding: 0;
	display: flex;
	position: relative;
	max-width: 1120px;
	margin: 0 auto;
	flex-wrap: wrap;
}

.p-localNav__item:hover .gatsby-image-wrapper {
	opacity: 0.5;
	transform: scale(1.1);
}

.p-pageHeader__heading {
	font-size: 3.2rem;
}

.p-localNav__heading {
	margin-bottom: 15px;
	letter-spacing: 0.1em;
	font-size: 1.88rem;
}

.p-localNav__heading:after {
	margin: 15px auto 0;
}

.c-heading--lg {
	font-size: 2rem;
}

.c-first-view::before {
	width: 300%;
	animation: wave linear 30s infinite;
}

.c-first-view::after {
	width: 300%;
}

.c-first-view {
	text-align: center;
	padding-top: 160px;
	padding-bottom: 30px;
}

.c-first-view svg#hero {
	margin-bottom: 50px;
	width: 100%;
}

.c-first-view::before {
	bottom: -40px;
}

.c-first-view::after {
	bottom: -30px;
}

.u-mblg {
	margin-bottom: 56px;
}

.u-mblg {
	margin-bottom: 56px;
}

.c-form__submit:hover,
.c-nav__navLink:hover,
.p-btn--detail:hover {
	color: var(--background);
}

.c-form__submit:hover::before,
.c-nav__navLink:hover::before,
.p-btn--detail:hover::before {
	left: 0;
}

}

@media screen and (min-width: 970px) {

.c-grid__item--lg4 {
	width: calc(33.33333% - 22px);
}

}

@media screen and (max-width: 769px) {

footer,
main {
	transition: 0.5s;
}

body.no-scroll {
	overflow: hidden;
}

body.no-scroll footer,
body.no-scroll main {
	filter: blur(3px);
	opacity: 0.5;
}

}

@keyframes waveSm {

0% {
	transform: translate(0);
}

50% {
	transform: translate(-100px);
}

100% {
	transform: translate(0px);
}

}

@keyframes wave {

from {
	transform: translate(0);
}

to {
	transform: translate(-66.66%);
}

}


`
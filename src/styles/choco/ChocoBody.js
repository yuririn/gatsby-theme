import styled from "styled-components";

export const ChocoBody = styled.main`
.l-sidebar {
	margin-top: 50px;
}

.l-sidebar .ads {
	margin-top: 30px;
	margin-bottom: 30px;
}

.l-sidebar .title {
	color: #fff;
	text-align: center;
	display: block;
	background: var(--color-deep);
	margin-bottom: 24px;
	font-weight: bold;
	padding: 8px 16px;
	margin-left: -16px;
	margin-right: -16px;
}

.l-sidebar .profile {
	padding: 0 16px 16px;
	background: #fff;
	text-align: center;
	margin-bottom: 32px;
}

.l-sidebar .profile img {
	border-radius: 50%;
	width: 120px;
}

.l-sidebar .profile .name {
	margin-top: 16px;
	margin-bottom: 8px;
	font-weight: bold;
}

.l-sidebar .profile .text {
	text-align: left;
	margin-bottom: 16px;
	font-size: 14px;
	line-height: 1.8;
}

.l-sidebar .profile .sns {
	align-items: center;
	display: flex;
	justify-content: center;
	gap: 16px;
}

.l-sidebar .profile svg {
	color: var(--color-sec);
	width: 24px;
}

.l-sidebar .profile svg:hover {
	text-decoration: none;
}

.l-sidebar a:hover {
	opacity: 0.8;
}

.l-sidebar .search {
	background: #fff;
	padding: 0 16px;
	margin-bottom: 32px;
}

.l-sidebar .search > div {
	margin-bottom: 0;
}

.l-sidebar .search input {
	display: block;
	margin-bottom: 16px;
	border: 1px solid #aaa;
}

.l-sidebar .search .result-inner {
	margin-left: -16px;
	margin-right: -16px;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 0;
}

.l-sidebar .search .result-inner p {
	font-size: 14px;
}

.l-sidebar .search .result-inner ul {
	border-radius: 0;
	padding-bottom: 0;
	margin-bottom: 0;
}

.l-sidebar .search .result-inner li {
	padding: 0;
	margin-left: 0;
	line-height: 1.4;
	margin-bottom: 5px;
}

.l-sidebar .search .result-inner li a {
	background: #fbfafa;
	background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
	border: 2px solid #eee;
	display: block;
	padding: 8px 16px;
	font-size: 14px;
	text-decoration: none;
	transition: 0.3s;
}

.l-sidebar .search .result-inner li a:hover {
	opacity: 0.8;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.l-sidebar .search .result-inner time {
	display: block;
}

.l-body {
	max-width: 1170px;
	width: 100%;
	margin: 0 auto;
	padding: 0 24px;
}

.l-main {
	margin-top: 50px;
	background: #fff;
	border-radius: 16px;
	padding: 16px;
	margin-top: 30px;
}

.l-main .ads {
	margin: 24px 0;
}

.l-main .c-heading--lg {
	font-size: 20px;
	text-align: center;
	margin-bottom: 16px;
}

.c-choco-list {
	flex-wrap: wrap;
	gap: 16px;
	display: flex;
}

.c-choco-list li {
	width: calc(50% - 8px);
}

.c-choco-list li a {
	display: block;
	color: var(--color);
	text-decoration: none;
}

.c-choco-list__heading {
	margin-top: 8px;
	font-size: 16px;
}

.l-article {
	margin-top: 16px;
}

.l-article h1 {
	margin-top: 0;
	font-size: 20px;
	line-height: 1.2;
	margin-bottom: 16px;
}

.l-article .hero {
	text-align: center;
	margin-bottom: 24px;
}

.c-tag {
	margin-bottom: 16px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	position: relative;
}

.c-tag dt {
	display: block;
	color: #4b3933;
	font-size: 14px;
	font-weight: bold;
	margin-right: 18px;
	display: flex;
	width: 100%;
	height: 24px;
	align-items: center;
}

.c-tag dd {
	align-items: center;
	display: flex;
	height: 24px;
	font-size: 14px;
	font-weight: bold;
	border-radius: 8px;
	border: 1px solid #4b3933;
}

.c-tag dd a {
	height: 24px;
	width: 100%;
	align-items: center;
	display: flex;
	color: #4b3933;
	text-decoration: none;
	padding: 0 16px;
}

.c-article__date {
	display: flex;
	margin-top: 10px;
	margin-bottom: 24px;
}

.c-article__date dt {
	width: 80px;
	font-weight: bold;
}

.c-article-body {
	line-height: 2.2;
}

.c-article-body a:not([class]) {
	color: var(--color-sec);
}

.c-article-body a:not([class]):hover {
	text-decoration: none;
}

.c-article-body p {
	margin: 0.8em 0;
}

.c-article-body h4 {
	line-height: 1.4;
	font-size: 18px;
	margin-bottom: 16px;
	margin-top: 24px;
	position: relative;
	color: var(--color-deep);
}

.c-article-body h2 {
	line-height: 1.4;
	border-bottom: var(--color-deep) solid 2px;
	border-top: var(--color-deep) solid 2px;
	font-size: 20px;
	margin-bottom: 24px;
	margin-top: 16px;
	position: relative;
	padding-bottom: 16px;
	padding-top: 16px;
}

.c-article-body h2::before {
	position: absolute;
	content: "";
	bottom: -16px;
	left: 24px;
	border-top: 16px solid var(--color-deep);
	border-left: 16px solid transparent;
	border-right: 16px solid transparent;
}

.c-article-body * ~ h2 {
	margin-top: 32px;
}

.c-article-body .box {
	line-height: 1.8;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
	border: var(--color-deep) solid 2px;
	margin-top: 32px;
	padding: 16px;
	border-radius: 16px;
	background: #fbfafa;
	background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
	background-size: 7px 7px;
	margin-bottom: 32px;
	position: relative;
}

.c-article-body .box p:first-child {
	margin-top: 0;
}

.c-article-body .box .title {
	background: var(--color-deep);
	font-weight: bold;
	color: #fff;
	margin: -16px -16px 16px;
	display: block;
	border-top-left-radius: 11px;
	border-top-right-radius: 11px;
	padding: 4px 16px 4px 40px;
	font-size: 17px;
	position: relative;
}

.c-article-body .box .title::before {
	content: "";
	background: #fff;
	width: 20px;
	top: calc(50% - 10px);
	height: 20px;
	display: block;
	border-radius: 50%;
	left: 16px;
	position: absolute;
}

.c-article-body .box .title::after {
	left: 22px;
	top: calc(50% - 7px);
	transform: rotate(45deg);
	border-bottom: 3px solid var(--color-deep);
	border-right: 3px solid var(--color-deep);
	content: "";
	position: absolute;
	text-indent: 0;
	width: 4px;
	height: 10px;
}

.c-article-body .box ul:last-child,
.c-article-body .box ol:last-child {
	margin-bottom: 0;
}

.c-article-body .box ul li:last-child,
.c-article-body .box ol li:last-child {
	margin-bottom: 0;
}

.c-article-body ul {
	margin-bottom: 16px;
}

.c-article-body ul li {
	padding-left: 20px;
	position: relative;
	margin-bottom: 8px;
}

.c-article-body ul li::before {
	content: "";
	background: #ca1c6d;
	width: 14px;
	top: 8px;
	height: 14px;
	display: block;
	border-radius: 50%;
	left: 0;
	position: absolute;
}

.c-article-body ul li::after {
	left: 5px;
	transform: rotate(45deg);
	top: 10px;
	border-bottom: 2px solid #fff;
	border-right: 2px solid #fff;
	content: "";
	position: absolute;
	text-indent: 0;
	width: 3px;
	height: 6px;
}

.c-article-body iframe {
	display: block;
	margin-bottom: 30px;
	margin-top: 30px;
}

.c-article-body h3 {
	line-height: 1.4;
	font-size: 18px;
	margin-bottom: 16px;
	margin-top: 24px;
	border-bottom: #ddd solid 2px;
	padding-bottom: 16px;
	position: relative;
}

.c-article-body h3::before {
	position: absolute;
	content: "";
	bottom: -2px;
	left: 0;
	width: 80px;
	display: block;
	height: 2px;
	background: var(--color-deep);
}

.c-article-body em {
	font-weight: bold;
	font-style: normal;
	color: #ca1c6d;
}

.c-article-body strong {
	background: linear-gradient(transparent 60%, #ffbed5 60%);
}

.c-article-body table {
	margin-top: 18px;
	margin-bottom: 18px;
	width: 100%;
}

.c-article-body table th {
	background: #666;
	background-image: repeating-linear-gradient(-45deg, #727272, #727272 1px, transparent 2px, transparent 5px);
	background-size: 7px 7px;
	color: #fff;
}

.c-article-body table th,
.c-article-body table td {
	padding: 4px 8px;
	border: 1px solid #aaa;
}

.msg-baloon {
	display: flex;
	margin: 3em 0;
	align-items: flex-start;
}

.msg-baloon .gatsby-image-wrapper.gatsby-image-wrapper-constrained {
	width: 100px;
	height: 100px;
}

.msg-baloon .msg-baloon--img__wrapper {
	text-align: center;
	width: 100px;
	font-size: 1.2rem;
	font-weight: bold;
}

.msg-baloon .msg-baloon--img__wrapper img {
	border-radius: 50%;
	oveflow: hidden;
}

.msg-baloon .msg-baloon--img__wrapper .msg-baloon--img {
	border-radius: 50%;
	margin-bottom: 15px;
}

.msg-baloon > p {
	width: calc(100% - 130px);
	margin-left: 30px;
	border: 2px solid var(--color-deep);
	padding: 15px;
	background: #fbfafa;
	background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
	border-radius: 10px;
	position: relative;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}

.msg-baloon > p span {
	display: block;
}

.msg-baloon > p::before {
	left: -15px;
	top: 15px;
	position: absolute;
	content: "";
	border-right: 15px solid var(--color-deep);
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
}

.msg-baloon--right {
	display: flex;
	margin: 3em 0;
	flex-direction: row-reverse;
	align-items: flex-start;
}

.msg-baloon--right .msg-baloon--img__wrapper {
	text-align: center;
	width: 100px;
	font-size: 1.3rem;
	font-weight: bold;
}

.msg-baloon--right .msg-baloon--img__wrapper img {
	border-radius: 50%;
	oveflow: hidden;
}

.msg-baloon--right .msg-baloon--img__wrapper .msg-baloon--img {
	border-radius: 50%;
	margin-bottom: 15px;
}

.msg-baloon--right > p {
	border: 2px solid #ca1c6d;
	width: calc(100% - 130px);
	margin-right: 30px;
	background: #fbfafa;
	background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
	padding: 15px;
	border-radius: 10px;
	position: relative;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}

.msg-baloon--right > p span {
	display: block;
}

.msg-baloon--right > p::before {
	right: -15px;
	top: 15px;
	position: absolute;
	content: "";
	border-left: 15px solid #ca1c6d;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
}

.c-pager {
	margin-top: 40px;
	margin-bottom: 40px;
	display: flex;
	list-style: none;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 16px;
}

.c-pager__prev,
.c-pager__next {
	line-height: 1.8;
}

.c-pager__prev a,
.c-pager__next a {
	align-items: center;
	border: 2px solid var(--color-deep);
	padding: 15px;
	background: #fbfafa;
	position: relative;
	background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	display: flex;
	flex-wrap: wrap;
	font-weight: bold;
	text-decoration: none;
	color: var(--color-deep);
	min-height: 60px;
}

.c-pager__prev a span,
.c-pager__next a span {
	font-size: 14px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.c-pager__prev a::before,
.c-pager__next a::before {
	z-index: 1;
	font-size: 12px;
	color: #fff;
	background: var(--color-deep);
	position: absolute;
	top: -5px;
	line-height: 1;
	padding: 3px 8px;
}

.c-pager__prev a figure,
.c-pager__next a figure {
	position: absolute;
	display: block;
	height: 60px;
	width: 80px;
	aspect-ratio: 4/3;
}

.c-pager__prev a figure img,
.c-pager__next a figure img {
	-o-object-fit: contain;
	object-fit: contain;
}

.c-pager__prev {
	margin-left: auto;
}

.c-pager__prev a {
	padding-left: 110px;
}

.c-pager__prev a::before {
	position: absolute;
	content: "PREV";
	right: -5px;
	top: -5px;
}

.c-pager__prev figure {
	top: calc(50% - 30px);
	left: 16px;
}

.c-pager__next a {
	padding-right: 110px;
}

.c-pager__next a::before {
	position: absolute;
	content: "NEXT";
	left: -5px;
	top: -5px;
}

.c-pager__next figure {
	top: calc(50% - 30px);
	right: 16px;
}

.c-search {
	background: #fff;
	padding: 16px;
	margin-bottom: 32px;
}

.c-search > div {
	margin-bottom: 0;
}

.c-search__box {
	border-radius: 3px;
	width: 100%;
	padding: 6px;
	box-sizing: border-box;
	display: block;
	margin-bottom: 16px;
	border: 1px solid #aaa;
}

.c-search__list {
	margin-left: -16px;
	margin-right: -16px;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 0;
}

.c-search__list p {
	text-align: center;
	font-size: 14px;
	margin-bottom: 16px;
}

.c-search__list ul {
	border-radius: 0;
	padding-bottom: 0;
	margin-bottom: 0;
}

.c-search__list li {
	padding: 0;
	margin-left: 0;
	line-height: 1.4;
	margin-bottom: 5px;
}

.c-search__list li a {
	color: var(--color-deep);
	background: #fbfafa;
	background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
	border: 2px solid #eee;
	display: block;
	padding: 8px 16px;
	font-size: 14px;
	text-decoration: none;
	transition: 0.3s;
}

.c-search__list li a:hover {
	opacity: 0.8;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.c-search__list time {
	color: #333;
	font-weight: bold;
	display: block;
}

@media screen and (min-width: 768px) {

.l-sidebar {
	width: 250px;
	padding-left: 32px;
}

.l-body {
	padding: 40px;
	display: flex;
	justify-content: space-between;
}

.l-main {
	margin-top: 50px;
	border-radius: 24px;
	width: calc(100% - 250px);
	padding: 32px 32px 40px;
}

.l-main .c-heading--lg {
	font-size: 24px;
	margin-bottom: 32px;
}

.c-choco-list li a:hover {
	opacity: 0.7;
}

.c-choco-list {
	gap: 24px;
}

.c-choco-list a:hover {
	opacity: 0.7;
}

.c-choco-list li {
	width: 100%;
}

.c-choco-list__heading {
	font-size: 20px;
	line-height: 1.4;
}

.l-article h1 {
	font-size: 32px;
}

.c-tag {
	padding-left: 100px;
}

.c-tag dt {
	position: absolute;
	left: 0;
	top: 0;
	width: 100px;
}

.c-article__date {
	margin-bottom: 32px;
}

.c-article-body h2::before {
	left: 40px;
}

.c-article-body h2 {
	margin-bottom: 32px;
	margin-top: 32px;
	font-size: 24px;
	padding-bottom: 24px;
	padding-top: 24px;
}

.c-article-body * ~ h2 {
	margin-top: 40px;
}

.c-article-body .box .title {
	margin: -24px -24px 16px;
	padding: 6px 24px 6px 48px;
}

.c-article-body .box .title ::before {
	left: 20px;
}

.c-article-body .box .title ::after {
	left: 26px;
}

.c-article-body .box {
	padding: 24px;
}

.c-article-body h3 {
	font-size: 22px;
	margin-bottom: 24px;
	margin-top: 40px;
}

.msg-baloon > p {
	font-size: 15px;
}

.msg-baloon--right > p {
	font-size: 15px;
}

.c-pager__prev,
.c-pager__next {
	width: calc(50% - 8px);
}

.c-pager__prev a:hover,
.c-pager__next a:hover {
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
}

}

@media screen and (min-width: 970px) {

.c-choco-list {
	gap: 32px;
}

.c-choco-list li {
	width: calc(50% - 16px);
}

}

@media screen and (min-width: 1020px) {

.l-sidebar {
	width: 300px;
}

.l-main {
	padding: 32px 52px 40px;
}

}


`
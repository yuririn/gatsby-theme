import styled from "styled-components";

export const MainBody = styled.main`
.p-entryCard {
	list-style: none;
	margin-bottom: 20px;
}

.p-entryCard__footer {
	margin-top: 10px;
}

.p-entryCard.is-first .p-entryCard__body p {
	line-height: 1.6;
	font-size: 1.4rem;
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	font-size: 1.2rem;
	margin-bottom: 0px;
}

.p-entryCard.is-first .p-entryCard__heading {
	margin-bottom: 10px;
}

.p-entryCard a {
	color: var(--color-blue);
	text-decoration: none;
}

.p-entryCard__img {
	display: block;
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	margin-bottom: 20px;
	transition: 0.5s;
}

.p-entryCard__img .gatsby-image-wrapper {
	transition: 0.5s;
}

.p-entryCard__img img {
	display: block;
	width: 100%;
	transition: 0.5s;
	border-radius: 8px;
}

.p-entryCard__date {
	transform: skewX(-15deg);
	font-weight: 700;
	background: var(--color-blue);
	padding: 6px 25px;
	letter-spacing: 0.1em;
	font-size: 1.4rem;
	position: absolute;
	z-index: 2;
	left: -5px;
	top: 10px;
	color: var(--background);
}

.p-entryCard__heading {
	font-weight: 700;
	font-size: 1.8rem;
	line-height: 1.2;
	margin-bottom: 5px;
	letter-spacing: 0.1em;
}

.p-entryCard .p-tagList {
	margin-top: 10px;
}

.p-entryCard .p-tagList__item {
	margin-right: 5px;
	margin-bottom: 10px;
	display: inline-block;
}

.p-entryCard .p-tagList__item a {
	font-size: 1rem;
	line-height: 1;
	color: var(--color-blue);
	display: block;
	border-radius: 4px;
	border: 1px solid var(--color-blue);
	background: var(--background);
	transition: 0.3s;
	white-space: nowrap;
	padding: 2px 3px 5px 2px;
}

.p-entryCard .p-tagList__item a:before {
	content: "";
	width: 1em;
	height: 1em;
	vertical-align: -0.2em;
	display: inline-block;
	border-radius: 50%;
	background: var(--background);
	border: 2px solid var(--color-blue);
	transform: scale(0.5);
}

@media screen and (min-width: 768px) {

.p-entryCard {
	margin-bottom: 40px;
}

.p-entryCard.is-first {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	position: relative;
}

.p-entryCard.is-first .p-entryCard__img {
	width: 40%;
}

.p-entryCard.is-first .p-entryCard__img img {
	border-radius: 8px;
}

.p-entryCard.is-first .p-entryCard__body {
	width: 60%;
	padding-left: 30px;
	box-sizing: border-box;
}

.p-entryCard.is-first .p-entryCard__body p {
	font-size: 1.4rem;
}

.p-entryCard.is-first .p-entryCard__heading {
	font-size: 2.2rem;
	margin-bottom: 20px;
}

.p-entryCard.is-first .p-entryCard__footer {
	position: absolute;
	bottom: 10px;
	right: 0;
	width: 60%;
	padding-left: 30px;
}

.p-entryCard:hover .p-entryCard__heading {
	color: var(--color-link);
}

.p-entryCard:hover__img {
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3), 0 0 9px rgba(0, 0, 0, 0.6);
}

.p-entryCard:hover .gatsby-image-wrapper {
	transform: scale(1.2, 1.2) rotate(-2deg);
	opacity: 0.8;
}

.p-entryCard .p-tagList__item a {
	font-size: 1.1rem;
	padding: 3px 3px 5px 3px;
}

.p-entryCard .p-tagList__item a:hover {
	background-color: var(--color-blue);
	color: var(--background);
}

}

@media screen and (max-width: 769px) {

.p-entryCard:not(.is-small) + .is-small {
	padding-top: 20px;
	border-top: 1px solid var(--border-color);
}

.p-entryCard.is-small .p-entryCard__date {
	top: 2px;
	padding: 5px 10px 5px 15px;
}

.p-entryCard.is-small .p-entryCard__heading {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.p-entryCard.is-small .p-entryCard__footer ul {
	-ms-overflow-style: none;
	scrollbar-width: none;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
}

.p-entryCard.is-small .p-entryCard__footer ul::-webkit-scrollbar {
	display: none;
}

.p-entryCard.is-small {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	position: relative;
	border-bottom: 1px solid var(--border-color);
}

.p-entryCard.is-small + .is-small {
	border-bottom: 1px solid var(--border-color);
	border-top: none;
	padding-top: 0;
}

.p-entryCard.is-small .p-entryCard__heading {
	font-size: 1.4rem;
}

.p-entryCard.is-small .p-entryCard__img {
	width: 35%;
	border-radius: 5px;
}

.p-entryCard.is-small .p-entryCard__img img {
	border-radius: 8px;
}

.p-entryCard.is-small .p-entryCard__body {
	width: 65%;
	padding-left: 15px;
	box-sizing: border-box;
}

.p-entryCard.is-small .p-entryCard__footer {
	position: absolute;
	bottom: 10px;
	right: 0;
	width: 65%;
	padding-left: 15px;
}

.p-entryCard.is-small .p-entryCard__date {
	font-size: 1.1rem;
}

}


`
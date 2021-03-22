import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import styled from 'styled-components';

const genre = () => {

	return (
		<Ganre>
		<ul className="p-localNav c-grid">
			<li className="p-localNav__item c-grid__item--md6"><Link to="/blogs/cms/">

				<div className="p-localNav__main">
					<h3 className="p-localNav__heading">Contents Management System</h3>
					<p className="p-localNav__content">WordPressやconcrete5などCMSの記事</p>
				</div>
				<Image filename="genre-cms.jpg" />
			</Link>
			</li>
			<li className="p-localNav__item c-grid__item--md6"><Link to="/blogs/front-end-program/">

				<div className="p-localNav__main">
					<h3 className="p-localNav__heading">Front End</h3>
					<p className="p-localNav__content">HTML、CSS、JSなどの書き留めたチップス</p>
				</div>
				<Image filename="genre-front-end-program.jpg" />
			</Link>
			</li>
			<li className="p-localNav__item c-grid__item--md6"><Link to="/blogs/back-end-program/">

				<div className="p-localNav__main">
					<h3 className="p-localNav__heading">Back End</h3>
					<p className="p-localNav__content">PHP、黒い画面、DBが中心</p>
				</div>
				<Image filename="genre-back-end-program.jpg" />
			</Link>
			</li>
			<li className="p-localNav__item c-grid__item--md6"><Link to="/blogs/seo/">
				<div className="p-localNav__main">
					<h3 className="p-localNav__heading">Search Engine Optimization</h3>
					<p className="p-localNav__content">SEOやコンテンツマーケティングに関する記事</p>
				</div>
				<Image filename="genre-seo.jpg" />
			</Link>
			</li>

			<li className="p-localNav__item c-grid__item--md6"><Link to="/blogs/it-seminar/">

				<div className="p-localNav__main">
					<h3 className="p-localNav__heading">ITセミナー</h3>
					<p className="p-localNav__content">勉強会の開催/登壇について書いてます</p>
				</div>
				<Image filename="genre-it-seminar.jpg" />
			</Link>
			</li>
			<li className="p-localNav__item c-grid__item--md6"><Link to="/blogs/ginneko-tsuredure/">

				<div className="p-localNav__main">
					<h3 className="p-localNav__heading">Life Hack</h3>
					<p className="p-localNav__content">思ったことを気ままに書いてます</p>
				</div>
				<Image filename="genre-ginneko-tsuredure.jpg" />
			</Link>
			</li>
		</ul>
		</Ganre>

	)
}

export default genre

const Ganre = styled.div`

.p-localNav__item {
    position: relative;
    height: 130px;
    text-shadow: 0 0 3px rgb(0,0,0,.8);
    margin-bottom: 30px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 4px rgb(0,0,0,.3);
    background: var(--color-blue);

	.gatsby-image-wrapper {
		height: 100%;
		width: 100%;
		transition: .3s;
	}

	img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
	@media screen and (min-width: 768px) {

	&:hover {
		.gatsby-image-wrapper {
			opacity: 0.5;
			transform: scale(1.1);
		}
	}
	}

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
    letter-spacing: .05em;
	&:after {
		content: "";
		display: block;
		height: 2px;
		width: 20px;
		margin: 10px auto 0;
		background: var(--color-accent);
	}

	@media screen and (min-width: 768px) {
		margin-bottom: 15px;
		letter-spacing: .1em;
		font-size: 1.88rem;
		&:after {
			margin: 15px auto 0;
		}
		}
	}
`

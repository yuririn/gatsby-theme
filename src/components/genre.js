import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"

const genre = () => {

	return (
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

	)
}

export default genre

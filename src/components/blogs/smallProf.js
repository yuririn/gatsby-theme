import React from 'react';
import { Link } from 'gatsby';
import Image from "../image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


const SmallProf = () => (
	<div className="profile">
		<span className="title">この記事を書いた人</span>
		<div className="prof__img__sm" >
			<Image filename="camille.jpg" />
		</div>
		<div>
			<p className="name">かみーゆ/フロントエンドエンジニア</p>
			<p className="sns">
				<Link to="https://twitter.com/LirioY" target="_blank" rel="noopener nofollow"><FontAwesomeIcon icon={faTwitter} /></Link>
				<Link to="https://www.instagram.com/yurico.k" target="_blank" rel="noopener nofollow"><FontAwesomeIcon icon={faInstagram} /></Link>
			</p>
			<p className="message">フリーランス。元テックスクールのエンジニア講師。IT業界10年。CMS conrete5のエバンジェリスト。現在セブ島在住。好きなものは肉とビール。</p>
			<p className="seemore"><Link to="/profile/" >See More</Link></p>
		</div>
	</div>

);

export default SmallProf;

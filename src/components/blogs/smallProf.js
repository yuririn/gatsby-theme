import React from "react"
import Image from "../../components/image"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const smallProf = () => {
	return (

		<div className="profile">
			<span className="title">この記事を書いた人</span>
			<Image filename="common/camille.jpg" className="prof__img__sm"></Image>
			<p className="name">かみーゆ/フロントエンドエンジニア</p>
			<p className="sns"><Link to="https://twitter.com/LirioY" target="_blank" rel="noopener nofollow"><FontAwesomeIcon icon={faTwitter} /></Link><Link to="https://www.instagram.com/yurico.k" target="_blank" rel="noopener nofollow" ><FontAwesomeIcon icon={faInstagram} /></Link></p>

			<p className="message">セブ島在住の気ままなフリーランスエンジニア。テクニカルディレクター・エンジニア講師・ブリッジSEを経て今に至る。CMS concrete5エバンジェリスト。テックブログ以外も「磨耗しない人生の選択」や「海外生活」のライフスタイルについて発信。好きなものは肉とビール。</p>
			<p className="seemore"><Link to="/about/">Read More</Link></p>

		</div>
	)

}
export default smallProf;

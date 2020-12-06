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

			<p className="message">経たエンジニア講師オフショア千人を経て、フリーランスのセブ島在住の気ままなエンジニア。CMS concrete5エバンジェリスト。「納得のいく人生」の	ライフスタイルを発信しています。</p>

		</div>
	)

}
export default smallProf;

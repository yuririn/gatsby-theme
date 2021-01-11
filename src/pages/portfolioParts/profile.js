import React from 'react';
// import VoiceStyles from "./css/voice.module.css"
import CommonStyles from "./css/common.module.css"
import Feature from './feature'
import History from './history'
import Faq from './faq'
import Image from "./../../components/image"

const Voice = () => (
	<section className={CommonStyles.myMd} id="Profile">
		<header className={CommonStyles.headingLg}>
			<h2>Profile</h2>
		</header>
		<div className={CommonStyles.myMd} className="l-container" >
			<div className="c-profile__img u-mblg">
				<Image filename="camille.jpg" className="c-profile__img u-mblg" />
			</div>
			<h3 className={CommonStyles.headingSm}>かみーゆ（ビダンじゃないほう）/フロントエンドエンジニア</h3>
			<p className={CommonStyles.myMd}>広島生まれ広島育ちのIT戦士です。気が付いたらフロントエンドエンジニアになっていました。<br />さらに最近気が付いたのですが、いつの間にかフィリピン・セブ島に来て、しかもロックダウン（コミュニティ単位での隔離）に巻き込まれてます。人生っておもしろい。</p>
		</div>
		<div className={CommonStyles.bg_gray}>
			<Feature />
			<hr className={CommonStyles.hr} />
			<History />
			<hr className={CommonStyles.hr} />
			<Faq />
		</div>
	</section>
);

export default Voice;

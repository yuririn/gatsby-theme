import React from 'react';
import CommonStyles from "./css/common.module.css"
import Feature from './feature'
import History from './history'
import Faq from './faq'

const Voice = () => (
	<section className={CommonStyles.myMd}>
		<header className={CommonStyles.headingLg}>
			<h2>Profile</h2>
		</header>
		<div className={CommonStyles.myMd} class="l-container" >
			<div class="c-profile__img u-mblg">
				<img class="c-profile__img u-mblg" src="/static/b0464912775ee836bf92057ad4afa07f/b4294/my-profile.jpg" alt="かみーゆ" />
			</div>
			<h3 className={CommonStyles.headingSm}>かみーゆ（ビダンじゃないほう）/フロントエンドエンジニア</h3>
			<p>広島生まれ広島育ちのIT戦士です。気が付いたらフロントエンドエンジニアになっていました。<br />さらに最近気が付いたのですが、いつの間にかフィリピン・セブ島に来て、しかもロックダウン（コミュニティ単位での隔離）に巻き込まれてます。人生っておもしろい。</p>
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

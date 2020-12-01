import React from 'react';
// import WorksStyles from "./css/works.module.css"
import CommonStyles from "./css/common.module.css"
// import Link from "gatsby"

const Works = () => (
	<section className={CommonStyles.myMd}>
		<header className={CommonStyles.headingLg}>
			<h2>Works</h2>
		</header>
		<div class="l-container">
			<p className={CommonStyles.center}>ただいま準備中です。今しばらくお待ちください。</p>
			{/* <p className={CommonStyles.center}>今まで作ったコンテンツや作品、やって来た実績をご紹介します｡<br />多少クセの強い作品もございます。心臓の弱い方はご注意ください。</p> */}
		</div>
		<div className="WorksList">
		</div>
	</section>
);

export default Works;

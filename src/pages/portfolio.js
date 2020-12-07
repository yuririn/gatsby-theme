import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
// import Image from "../components/image"

// CSS
import HeaderStyles from "./portfolioParts/css/header.module.css"
import FirstViewStyles from "./portfolioParts/css/firstview.module.css"
import RecomendStyles from "./portfolioParts/css/recomend.module.css"
import CommonStyles from "./portfolioParts/css/common.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from "../components/image"

import Voice from './portfolioParts/voice'
import Works from './portfolioParts/works'
import Profile from './portfolioParts/profile'
import Contact from './portfolioParts/contact'

const Portfolio = ({ location }) => {
	const nav = ['Profile', 'Works', 'Contact']
	return (
		<div className={HeaderStyles.default}>
			<SEO
				title="広島生まれ、広島育ちのIT戦士"
				description="広島のIT戦士・かみーゆを紹介するサイトです。フロントエンドエンジニアかみーゆの魅力を出し惜しみせず力一杯紹介しています。ちょっとクセ強め。"
				image="/static/213311b9bb7be131aae7771033b326b7/ee604/ogp.png"
			/>
			<header className={HeaderStyles.header}>
				<p className={HeaderStyles.headerLogo}>Camille Site</p>
				<span
					className={HeaderStyles.navBtn}
					role="button"
					aria-label="ナビゲーションボタン"
					id="menuBtn"
				>

				</span>
				<nav className={HeaderStyles.globalNav}>
					<ul>
						{
							nav.map((value) => {
								return (
									<li>
										<Link to={`#${value}`}>
											{value}
										</Link>
									</li>
								)
							})
						})

					</ul>
				</nav>
			</header>
			<main id="top">
				<section>
					<div className={FirstViewStyles.firstViewArea}>
						<div className={FirstViewStyles.firstViewArea_main}>
							<h1>広島生まれ、広島育ちのIT戦士</h1>
							<p>納期と平和を守ります。</p>
						</div>
					</div>
				</section>
			</main>
			<section>
				<div class="l-container">
					<header className={CommonStyles.headingLg}>
						<h2>かみーゆをおススメする7つの理由</h2>
					</header>
					<p>かみーゆをおススメする理由を7つにまとめました。</p>
					<ol className={RecomendStyles.recomendList}>
						<li>コーディングが早い。当社比。</li>
						<li>新しい技術への好奇心旺盛！ちょっと息切れしてるけど。</li>
						<li>納期を命がけで守ります。死なんけど。</li>
						<li>クライアントも大切だけど、ユーザーのことを心の底から大事と思っている。</li>
						<li>フロントエンド技術への情熱がハンパない。少し暑苦しいけど。</li>
						<li>バケモノ並みに体力がある。</li>
						<li>ちょっぴりセクシー。知らんけど｡</li>
					</ol>
				</div>
				<div className={CommonStyles.bg_gray}>
					<section class="l-container">
						<header className={CommonStyles.headingMd}>
							<h3><FontAwesomeIcon icon={faBullhorn} /> お喜びの声</h3>
						</header>
						<p className={CommonStyles.center}>かみーゆと一緒に仕事をしたり遊んだりした方たちからたくさんのお喜びの声をいただいております。</p>
						<Voice />
					</section>
				</div>
			</section>
			<Works />
			<Profile />
			<Contact />
			<footer className={CommonStyles.footer}>
				<a href="#top" className={CommonStyles.footerBtn} aria-label="先頭へ戻る"></a>
				<ul className={CommonStyles.footerNav}>
					<li><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
					<li><Link to="https://twitter.com/LirioY" target="_blank" rel="noopener nofollow"><FontAwesomeIcon icon={faTwitter} /></Link></li>
					<li><Link to="https://www.instagram.com/yurico.k" target="_blank" rel="noopener nofollow" ><FontAwesomeIcon icon={faInstagram} /></Link></li>
				</ul>
				<p className={CommonStyles.footerCopy}><small>(c)IT戦士かみーゆを紹介するサイト</small></p>
			</footer>
		</div>
	)
}

export default Portfolio

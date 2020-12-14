import React from 'react';
import WorksStyles from "./css/works.module.css"
import CommonStyles from "./css/common.module.css"
import { Link } from "gatsby"
import Image from "../../components/image"

const Works = () => (
	<section className={CommonStyles.myMd} id="Works">
		<header className={CommonStyles.headingLg}>
			<h2>Works</h2>
		</header>
		<div class="l-container">
			{/* <p className={CommonStyles.center}>ただいま準備中です。今しばらくお待ちください。</p> */}
			<p className={CommonStyles.center}>今まで作ったコンテンツや作品、やって来た実績をご紹介します｡</p>
		</div>
		<div className={WorksStyles.WorksList}>

			<article>

				<section className={WorksStyles.WorkItem}>
					<h3>人材プロジェクトアシ</h3>
					<p>広島県の人材育成プロジェクトのアシスタントをしていました。2年長かったー。</p>
				</section>
				<Image filename="portfolio/hirohata.jpg" className={WorksStyles.WorkItemImg}></Image>

			</article>
			<article>
				<Link to="/blogs/entry279/">
					<section className={WorksStyles.WorkItem}>
						<h3>ITセミナー</h3>
						<p>2018/10/6広島で『Googleに聞きたい！ 検索エンジンQ&A』開催。Google検索エンジンエバンジェリスト金谷氏と「海外SEO情報」の鈴木氏をお迎えし、100名の集客に成功。	</p>
					</section>
					<Image filename="2018/entry279.jpg" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
			<article>
				<Link to="/blogs/tags/CSS/">
					<section className={WorksStyles.WorkItem}>
						<h3>テック記事</h3>
						<p>テック記事で某有名なオンラインスクールからオファーをいただいたこともありました。1記事月間5000pv稼ぐことも。</p>
					</section>
					<Image filename="2020/entry393.png" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>


			<article>
				<section className={WorksStyles.WorkItem}>
					<h3>工作</h3>
					<p>大人が段ボールで鎧をつくったら楽しか会社の同僚とやってみました。面白そうなことがあったら、体を張ります。</p>
				</section>
				<Image filename="portfolio/danball.jpg" className={WorksStyles.WorkItemImg}></Image>

			</article>
			<article>

				<Link to="https://dream-tech.jp/" target="_blank" rel="noopener nofollow">
					<section className={WorksStyles.WorkItem}>
						<h3>保守・運用</h3>
						<p>子どもプログラミングスクールのWebサイトの保守運用を行なっています。</p>
					</section>
					<Image filename="portfolio/happy-chime.jpg" className={WorksStyles.WorkItemImg}></Image>

				</Link>
			</article>

			<article>
				<Link to="/blogs/entry356/">
					<section className={WorksStyles.WorkItem}>
						<h3>ITセミナー登壇</h3>
						<p>2020/2/2に広島に帰省し、オフショアの話しました。コロナの営業で開催が危ぶまれましたが、80人近くの方にご参加いただきました。</p>
					</section>
					<Image filename="2020/entry356.png" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
			<article>
				<Link to="/blogs/entry357/">
					<section className={WorksStyles.WorkItem}>
						<h3>速度改善の提案</h3>
						<p>セブ島のSEO勉強会でWebサイト速度改善方法についてお話しさせていただきました。速度改善で20位以上改善した実績あります。</p>
					</section>
					<Image filename="2020/entry357.jpg" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
			<article>
				<section className={WorksStyles.WorkItem}>
					<h3>爆速コーディング</h3>
					<p>当時勤めていた会社のLPがなくて営業が困っていたので土日返上して2日でLP作成。仲間を思ったかみーゆ最強。</p>
				</section>
				<Image filename="portfolio/nexseed_labo.jpg" className={WorksStyles.WorkItemImg}></Image>
			</article>
			<article>
				<Link to="/blogs/entry369/">
					<section className={WorksStyles.WorkItem}>
						<h3>キャリアアドバイス</h3>
						<p>キャリアに悩んでいる元同僚に対して書いた記事。30才過ぎてもエンジニアに離れる</p>
					</section>
					<Image filename="2020/entry369.jpg" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
			<article>
				<Link to="/blogs/entry389/">
					<section className={WorksStyles.WorkItem}>
						<h3>現地レポート</h3>
						<p>セブ島の台所・カーボンマーケットに潜入し地域の様子を取材してきました。</p>
					</section>
					<Image filename="2020/entry389.jpg" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
			<article>
				<Link to="/">
					<section className={WorksStyles.WorkItem}>
						<h3>静的サイトジェネレーター</h3>
						<p>当「銀ねこアトリエ」をGatsbyJSでフロントエンド魂をかけてリニューアル。GitHubでのデプロイ連携。SPAでもあるので表示サクサク。</p>
					</section>
					<Image filename="portfolio/ginneko.jpg" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
			<article>
				<Link to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw" target="blank" rel="noopener nofollow">
					<section className={WorksStyles.WorkItem}>
						<h3>YouTube配信</h3>
						<p>2021年頭にセブ島でオフショアビジネスを始めるのでYouTube配信始めました。ビジネスパートナーの撮影するクオリティサイコー。</p>
					</section>
					<Image filename="2020/entry415.jpg" className={WorksStyles.WorkItemImg}></Image>
				</Link>
			</article>
		</div>
	</section>
);

export default Works;

import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import LayoutS from "../components/layoutSimple"
import SEO from "../components/seo"
import Image from "../components/image"
import Search from "../components/search/"
import Genre from "../components/genre"
import TagsList from "../components/blogs/tagList"
import BreadCrumbList from "../components/common/breadCrumbList"

const Uranai = ({ value }) => {
	const num = value - 1
	const results = [
		{
			title: '集中力が低がる一日。特に、うっかり怪我に注意。',
			description: '今日は何をやっても集中できない日になりそうです。うっかりで怪我をしそうになるので、おうちでゆっくりしましょう。',
			luckyitem: '鼻メガネ',
			recomend: '広島生まれの私が広島で出会って忘れられないもの5選',
			thumbnail: 'enrty237.jpg',
			link: '/blogs/entry237/',
		},
		{
			title: '絶対モテる！今すぐ合コンへ行くべし。',
			description: '何をやってもモテモテの1日になりそう。シングルのあなたは出会いのチャンスです。カラオケデートがおすすめです。',
			luckyitem: 'マイク',
			recomend: 'カラオケでうろ覚えで歌って90点以上とる方法',
			thumbnail: 'entry212.jpg',
			link: '/blogs/entry212/',
		},
		{
			title: '時は熟した！新しいスタートをきるチャンス！',
			description: '今の会社、仕事にうんざり。。。日々どうしようって思っているあなた。転職のチャンスです。今すぐ転職サイトに登録しましょう。',
			luckyitem: '履歴書',
			recomend: 'セブ島で仕事したかったんでXDで退職届を作った話',
			thumbnail: 'entry368.png',
			link: '/blogs/entry368/',
		},
		{
			title: '動物に癒されて運気アップ！たくさんスキンシップしよう。',
			description: '動物から運気がもらえます。ペットを飼っている方はたくさんかわいがりましょう。飼ってない方はネコカフェがおすすめです。',
			luckyitem: 'ちゅーる',
			recomend: '飼いネコが食中毒！？対処法等の備忘録',
			thumbnail: 'entry278.jpg',
			link: '/blogs/entry278/',
		},
		{
			title: 'ちゃんとした占い師に占ってもらおう',
			description: '怪しい404ページの占いをするより、ちゃんとした占い師に占ってもらいましょう。',
			luckyitem: 'クリスタル',
			recomend: 'セブ島唯一日本人占い師・さくら庵のマイアさんから学ぶかみーゆ流占いとの付き合い方',
			thumbnail: 'entry387.jpg',
			link: '/blogs/entry387/',
		},
	];
	return (
		<div>
			<p className="mb-Md">今日の占いはこちらです!!滅多にお目にかかれない貴重な404ページでの占いは一訪問一回までとさせていただきます。なにとぞご理解ください。</p>
			<dl className="fortune" id="fortune-result">
				<dt className="is-first">今日の占い</dt>
				<dd>{results[num].title}</dd>
				<dt>Remark</dt>
				<dd>{results[num].description}</dd>
				<dt>ラッキーアイテム</dt>
				<dd>{results[num].luckyitem}</dd>
				<dt>あなたにオススメ記事</dt>
				<dd className="is-last">
					<Link to={results[num].link}>
						{
							results[num].thumbnail ? <Image filename={results[num].thumbnail} /> : ''
						}
						<span>{results[num].recomend}</span>
					</Link>
				</dd>
			</dl>
		</div>
	)

}

const Result = prop => {
	let ranNum = Math.floor(Math.random() * 5) + 1;
	const [value, setValue] = useState("")

	const onClick = e => {
		setValue(e.target.value)
	}

	if (prop.value === 'item01') {
		return (
			<div>
				<p className="u-text-center">まずは、トップページに戻って心を落ち着かせましょう。</p><p className="u-text-center"><Link className="p-btn--detail" to="/">トップページヘ</Link></p>
			</div>
		)
	} else if (prop.value === 'item02') {
		return (

			<section className="p-section">
				<h2 className="c-heading--lg">記事のジャンルから探す</h2>
				<p className=" mb-Md">記事のジャンルは計6つあります。ジャンルごとに心がけて整理してあるので、多分読みたい記事が見つかると思うので気長に探してください。</p>
				<Genre />
			</section>
		)
	} else if (prop.value === 'item03') {
		return (

			<section className="p-section">
				<h2 className="c-heading--lg">タグから探す</h2>
				<p className=" mb-Md">それぞれの記事は私かみーゆが思いつきかつ無造作に作られたタグに紐づけられてます。頑張って探してください。</p>
				<ul className="p-tagList--lg u-mblg">
					<TagsList></TagsList>
				</ul>
			</section>
		)
	} else if (prop.value === 'item04') {
		return (
			<div className="result__item__inner l-container--md">
				<div className="l-container--md">
					<div style={value ? { display: `none` } : { desplay: `block` }}>
						<p id="fortune-text">たまには息抜きが必要ですよね。気晴らしに、占いでもしていってください。</p>
						<p className="u-text-center">
							<button
								className="fortune__btn"
								type="button"
								id="fortune-btn"
								value={ranNum}
								onClick={onClick}
							>
								Start
					    </button>
						</p>
					</div>
					{value ? <Uranai value={value} /> : ''}

				</div>
			</div>
		)
	} else {
		return ''
	}
}
const Menu = () => {
	const [value, setValue] = useState("")

	const onChange = e => {
		setValue(e.target.value)
	}
	return (
		<div id="uranai">

			<ul className="uranai__list">
				<li>
					<label>
						<input type="radio" name="item" value="item01" onChange={onChange} /><span>振り出しに戻る（トップページ）</span>
					</label>
				</li>
				<li>
					<label>
						<input type="radio" name="item" value="item02" onChange={onChange} /><span>ジャンルから探す</span>
					</label>
				</li>
				<li>
					<label>
						<input type="radio" name="item" value="item03" onChange={onChange} /><span>タグから探す</span>
					</label>
				</li>
				<li>
					<label>
						<input type="radio" name="item" value="item04" onChange={onChange} /><span>ページを探すのをやめて占いをする</span>
					</label>
				</li>
			</ul>
			<Result value={value}></Result>
			<h2 className="c-heading--lg mt-Lg">記事を探す</h2>
			<p className="u-text-center mb-Md">手っ取り早く記事を検索して探すこともできます。</p>
			<Search />
		</div>
	)
}

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title

	return (
		<LayoutS location={location} title={siteTitle}>
			<SEO
				location={location}
				title="お探しのページは見つかりませんでした"

			/>
			<div className="p-pageHeader">
				<div className="p-pageHeader__main">
					<h1 className="p-pageHeader__heading">404</h1>
					<p className="p-pageHeader__content">お探しのページは見つかりませんでした</p>
				</div>
				<Image filename="common/ganre-404.jpg" className="p-pageHeader__img" />
			</div>
			<section className="c-404">
				<div className="l-container--md">
					<div className="mb-Md mt-Xs"><BreadCrumbList current="お探しのページは見つかりませんでした" /></div>
					<section className="c-editArea">
						<h2>あなたのお探しのページにたどり着けなかったようです</h2>
						<p>大変遺憾ではありますが、管理人がどこかに移動させたか、<em>内容が気に入らないから削除してしまった</em>可能性があります。誠に申し訳ありません。</p>
						<p>でも少し立ち止まって考えてみてください。これってひょっとしたら、普段頑張りすぎているあなたに少し休憩した方がいいっていう神様のアドバイスなのかもしれません。</p>
						<p>そんなあなたのために「銀ねこアトリエ」はいくつかオプションを用意しました。お好きな項目をお選びください。</p>
					</section>
					<Menu></Menu>
				</div>
			</section>
		</LayoutS>
	)
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

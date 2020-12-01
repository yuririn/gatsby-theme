import React from 'react';
import FaqStyles from "./css/faq.module.css"
import CommonStyles from "./css/common.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const Faq = () => (

	<section className="l-container">
		<header className={CommonStyles.headingMd}>
			<h3><FontAwesomeIcon icon={faQuestion} /> よくあるご質問</h3>
		</header>
		<p className={CommonStyles.center}>かみーゆによくある質問をまとめてみました。</p>
		<dl className={FaqStyles.faq}>
			<dt>コーダーになるためにはどうすれば良いですか？</dt>
			<dd>コーダーはスピード命です。なので早くコーディングするためには、ショートカットは必須です。ひたすらコードを書きましょう。お気に入りのサイトを模写してコーディングするのもオススメです。コーダーなりたての頃はよくやっていました。</dd>
			<dt>業界の進歩が早くてついていくのが大変ではないですか？</dt>
			<dd>はい、大変です。<br />置いて行かれないよう、SNSなどで情報収集は欠かさずにやってます。この業界、学ぶことをやめたらやっていけないと思います。泳ぐのをやめたマグロと一緒です。</dd>
			<dt>職種が大きく変わってますが、転職の際不安はありましたか？</dt>
			<dd>はい、ありました。<br />転職するって決めた時、今考えるとWebクリエイターになった自分になりたかったのかもしれません。だんだんクリエイターになるのではなく、もっとキレイなコードを書いたりいろんな実装ができるようになりたいと強く思うようになり、いつのまにかクリエイターになっていました。今では三度の飯よりコードを書くのが好きになりました。</dd>
			<dt>好きな食べ物はなんですか？</dt>
			<dd>肉とビールです。肉があればビールが3杯は飲めます。</dd>
			<dt>バケモノって言われるらしいですが、一体何歳なんですか？</dt>
			<dd>実年齢はお答えできません。精神年齢は13歳で止まりました。</dd>
			<dt>どんなタイプの男性が好きなんですか？</dt>
			<dd>一緒にいて楽しい人がいいですね。強いて言えばムロツヨシや大泉洋です。いい人がいれば紹…</dd>
		</dl>
	</section>
);

export default Faq;

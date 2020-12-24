import React, { useState } from "react"
import { graphql } from "gatsby"

import LayoutSimple from "../components/layoutSimple"
import SEO from "../components/seo"
import Image from "../components/image"
import BreadCrumbList from "../components/common/breadCrumbList"
import ContactStyles from "./css/contact.module.css"

const types = [{ name: 'ウェブサイト作成の依頼', description: '簡易的なLPからWordPressの実装まで実装を承ります。' }, { name: 'テレビ電話で相談したい', description: '大変恐縮ですがヒアリングなしでのお見積もりはいたしません。まずはテレビ電話でご相談ください。' }, { name: '講演依頼', description: 'セミナーでの登壇や講演なども承っております。まずはご相談ください。' }, { name: 'そのほか', description: 'そのほかご相談などございましたらお気軽にお問い合わせください。' }]

const Thanks = () => {
	return (
		<div>
			<p>お問い合わせフォームを送信いたしました。</p>
			<p>5日経っても返信がない場合はお手数ですが、再度ご連絡をお願いします。</p>
		</div>
	)
}

const Detail = ({ name }) => {
	let description = ''
	types.map((value) => {
		if (name == value.name) description = value.description;
		return description;
	})

	return (
		<div>
			{description}
		</div>
	)

}

const Form = () => {
	const [value, setValue] = useState("")

	const onChange = e => {
		setValue(e.target.value)
	}

	return (
		<div>
			<p>銀ねこアトリエでは各種相談を受けつけております。まずはお気軽にご相談ください。</p>
			<div className={ContactStyles.contact}>
				<form name="contact" method="POST" data-netlify="true" action="/contact/thanks/">
					<input type="hidden" name="form-name" value="contact" />
					<dl>
						<dt>ご相談の種類</dt>
						<dd>
							{
								types.map((value) => {
									return (
										<label><input type="radio" name="type" value={value.name} onChange={onChange} />{value.name}</label>
									)
								})

							}
							<Detail name={value}></Detail>
						</dd>
						<dt>お名前</dt>
						<dd><input type="text" name="name" required /></dd>
						<dt>メールアドレス</dt>
						<dd><input type="text" name=" email" required /></dd>
						<dt>相談内容</dt>
						<dd><textarea type="text" name="name" /></dd>
					</dl>
					<p><label><input type="checkbox" name="agreement" /><a href="/privacy-policy/" target="_blank">プライバシーポリシー</a>に同意の上送信する</label></p>
					<div data-netlify-recaptcha="true"></div>
					<button type="submit">送信する</button>
				</form>
			</div>
		</div>
	)
}

const contactTemplate = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const siteDescription = data.site.siteMetadata?.description
	const src = data.allFile.edges[0] ? data.allFile.edges[0].node.childImageSharp.fluid.src : ''

	return (
		<LayoutSimple location={location} title={siteTitle}>

			<SEO
				title={`${siteTitle}`}
				description={siteDescription}
				image={src}
				location={location}
			/>

			<div class="l-main_contents">
				<div class="p-pageHeader">
					<div class="p-pageHeader__main">
						<h1 class="p-pageHeader__heading">お問い合わせ</h1>
						<p class="p-pageHeader__content">お問い合わせはこちらから</p>
					</div>
					<Image filename="common/ganre-404.jpg" className="p-pageHeader__img" />
				</div>
				<section>
					<div class="l-container--md">
						<div class="mb-Md mt-Xs"><BreadCrumbList current="お問い合わせ" /></div>
					</div>
					<div class="l-container--md">
						{location.pathname === `/contact/` ? <Form></Form> : <Thanks />}
					</div>
				</section>
			</div>
		</LayoutSimple>
	)
}

export default contactTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
	}
	allFile(
	filter: {

		sourceInstanceName: {eq: "assets"}

	}){
        edges {
          node {
            name
            relativePath
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

  }
`

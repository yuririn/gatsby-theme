import React from "react"
import { graphql, Link } from "gatsby"

import Layout2 from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import Search from "../components/search/"

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title

	return (
		<Layout2 location={location} title={siteTitle}>
			<SEO title="404 Not Found" />
			<div class="p-pageHeader">
				<div class="p-pageHeader__main">
					<h1 class="p-pageHeader__heading">Page Not Found</h1>
					<p class="p-pageHeader__content">お探しのページは見つかりませんでした</p>
				</div>
				<Image filename="common/ganre-404.jpg" className="p-pageHeader__img" />
			</div>
			<section class="c-404">
				<div class="l-container--md">
					<p class="mb-Md">大変遺憾ではありますが、あなたのお探しのページにたどり着けなかったようです。<br />管理人がどこかに移動させたか、内容が気に入らないから削除してしまったのかもしれません。誠に申し訳ありません。
					</p>
					<p class="u-text-center mb-Md"><Link class="p-btn--detail" to="/">トップページヘ</Link></p>
					<h2 class="c-heading--lg">記事を探す</h2>
					<Search />
				</div>
			</section>
		</Layout2>
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

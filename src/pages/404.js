import React from "react"
import { graphql } from "gatsby"

import LayoutSimple from "../components/layoutSimple"
import SEO from "../components/seo"
import Image from "../components/image"
import Search from "../components/search/"

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title

	return (
		<LayoutSimple location={location} title={siteTitle}>
			<SEO title="404 Page Not Found" />
			<div class="p-pageHeader">
				<div class="p-pageHeader__main">
					<h1 class="p-pageHeader__heading">404</h1>
					<p>お探しのページは見つかりませんでした</p>
				</div>
				<Image filename="common/ganre-404.jpg" className="p-pageHeader__img"></Image>
			</div>
			<section class="c-404">
				<div class="l-container--md">
					<p className="mb-Md">大変遺憾ではありますが、あなたのお探しのページにたどり着けなかったようです。<br />管理人がどこかに移動させたか、内容が気に入らないから削除してしまったのかもしれません。誠に申し訳ありません。</p>
					<div c className="mb-Md">
						<p class="u-text-center"><a class="p-btn--detail" >トップページヘ</a></p>
					</div>
					<Search />
				</div>
			</section>
		</LayoutSimple>
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

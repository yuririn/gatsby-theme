import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import TagList from "../components/common/tagsArchive"
import Pagination from "../components/blogList/pagination"

const blogs = ({ data, location }) => {
	const posts = data.allMarkdownRemark.nodes

	const num = Math.ceil(data.allMarkdownRemark.totalCount / 12);
	let current = location.pathname.replace(/[^0-9]/g, '')
	if (current !== "") current = parseInt(current)

	console.log(data.allMarkdownRemark)

	return (
		<Layout location={location} title="銀ねこアトリエ">
			<SEO title="ブログ一覧"
				description="「銀ねこアトリエ」の最新ブログ一覧です。30代で転職し、セブ島に移住。主には仕事で使ったチップスを書きだめています。フロントエンド技術、WordPress、海外移住、キャリアアップ、たまにふざけてます。"
			/>
			<div class="p-pageHeader">
				<div class="p-pageHeader__main">
					<h1 class="p-pageHeader__heading">最新ブログ一覧</h1>
					<p>現在 {data.allMarkdownRemark.totalCount} 記事あります</p>
				</div>
				<img class="p-pageHeader__img" src={`https://ginneko-atelier.com/packages/newginneko/themes/newginneko/assets/images/common/ganre-common.jpg`} alt=""></img>
			</div>
			<div className="l-container">
				<section className="p-section">
					<h2 className="c-heading--lg">最新記事</h2>
					<div className="c-grid">
						{posts.map(post => {

							return (
								<article
									className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
									itemScope
									itemType="http://schema.org/Article"
								>
									<Link to={post.fields.slug} itemProp="url" className="p-entryCard__img" >
										{post.frontmatter.hero ?

											<Image filename={post.frontmatter.hero} />
											: <Image filename="common/dummy.png" />
										}
										<div class="p-entryCard__date">
											{post.frontmatter.date}
										</div>
									</Link>
									<Link to={post.fields.slug} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{post.frontmatter.title}</h3></Link>
									<div className="p-entryCard__footer">
										<div className="p-entryCard__footer">
											<div className="p-entryCard__footer">
												<TagList tags={post.frontmatter.tags} />
											</div>
										</div>
									</div>
								</article>
							)
						})}
					</div>
				</section>
				<div class="ccm-pagination-wrapper">
					<Pagination num={num} current={current}></Pagination>
				</div>
			</div>
		</Layout>
	)
}


export default blogs

export const pageQuery = graphql`
	query blosQyery(
			$limit: Int!
			$skip: Int!
		) {
			site {
				siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			limit: $limit
			skip: $skip
			sort: {fields: [frontmatter___date], order: DESC }
			filter: {frontmatter: {pagetype: { eq: "blog" } } }
		)
		{

			totalCount
			nodes {
				excerpt
				fields {
					slug
				}
				frontmatter {
				title
				date(formatString: "YYYY.MM.DD")
				description
				category
				cateId
				hero
				tags
				}
			}

		}
  }
`

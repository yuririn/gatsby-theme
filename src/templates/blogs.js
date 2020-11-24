import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import TagList from "../components/common/tagsArchive"

const blogs = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const posts = data.allMarkdownRemark.nodes

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="All posts" />
			<div class="p-pageHeader">
				<div class="p-pageHeader__main">
					<h1 class="p-pageHeader__heading">記事一覧</h1>
					<p>記事一覧</p>
				</div>
				<img class="p-pageHeader__img" src={`https://ginneko-atelier.com/packages/newginneko/themes/newginneko/assets/images/common/ganre-common.jpg`} alt=""></img>
			</div>
			<div className="l-container">
				<section className="p-section">
					<h2 className="c-heading--lg">最新記事</h2>
					<div className="c-grid">
						{posts.map(post => {
							const title = post.frontmatter.title || post.fields.slug

							return (
								<article
									className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
									itemScope
									itemType="http://schema.org/Article"
								>
									<Link to={post.fields.slug} itemProp="url" className="p-entryCard__img" >
										{post.frontmatter.hero ?

											<Image filename={post.frontmatter.hero} />
											: <Image filename="dummy.png" />
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
				<p class="u-text-center u-mblg"><Link to="/blogs" className="p-btn--detail">Read More</Link></p>
			</div>
		</Layout>
	)
}


export default blogs

export const pageQuery = graphql`
  query {
			site {
				siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC }) {

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

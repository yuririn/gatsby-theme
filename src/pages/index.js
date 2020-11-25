import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import FirstView from "../components/firstview"
import TagList from "../components/common/tagsArchive"

const BlogIndex = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const posts = data.allMarkdownRemark.nodes


	if (posts.length === 0) {
		return (
			<Layout location={location} title={siteTitle}>
				<SEO title="All posts" />
				<p>
					No blog posts found. Add markdown posts to "content/blog" (or the
					directory you specified for the "gatsby-source-filesystem" plugin in
					gatsby-config.js).
        </p>
			</Layout>
		)
	}


	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="All posts" />
			<FirstView />
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
											: <Image filename={`dummy.png`} />
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

export default BlogIndex

export const pageQuery = graphql`
  query {
			site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
				sort: {fields: [frontmatter___date], order: DESC }
				limit: 9
				filter: {frontmatter: {pagetype: { eq: "blog" } } }
			) {
			nodes {
				excerpt
					fields {
					slug
				}
				frontmatter {
					title
					pagetype
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

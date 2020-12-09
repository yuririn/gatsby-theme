import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import FirstView from "../components/firstview"
import TagList from "../components/common/tagsArchive"
import FovoriteList from "../components/common/favorites"
import Search from "../components/search/"
import TagsList from "../components/blogs/tagList"

const BlogIndex = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const posts = data.allMarkdownRemark.nodes

	const ogpSrc = data.allFile.edges[0].node.childImageSharp.fluid.src



	if (posts.length === 0) {
		return (
			<Layout location={location} title={siteTitle}>
				<SEO
					title="All posts"
					image={ogpSrc}
					location="/"
				/>
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
			<SEO
				title="セブ島に住む気ままなフロントエンジニアの日記"
				image={ogpSrc}
			/>
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
											: <Image filename={`common/dummy.png`} />
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
				<h2 class="c-heading--lg">記事を探す</h2>
				<Search />

				<FovoriteList type="web" />
				<FovoriteList type="life" />
				<FovoriteList type="career" />
				<section class="p-box--gray p-section u-text-center">
					<h2 class="c-heading--lg">人気のタグ</h2>
					<TagsList />
				</section>
			</div>
		</Layout >
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
		allFile(
		filter: {
			relativePath: {eq: "common/newogp.png"}
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

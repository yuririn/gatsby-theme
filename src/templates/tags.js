import React from "react"
import PropTypes from "prop-types"

// Components
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/common/tagsArchive"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import Pagination from "../components/blogList/pagination"
import BreadCrumbList from "../components/common/breadCrumbList"

const Tags = ({ pageContext, data, location }) => {
	const { tag, current, page } = pageContext
	const { edges, totalCount } = data.allMarkdownRemark

	return (

		<Layout location={`blogs/tags/${tag}`} title={siteMetadata.title}>
			<SEO
				title={`${tag}に関する記事一覧`}
				description={siteMetadata.description}
			/>
			<div className="page-template-archive">
				<div class="p-pageHeader">
					<div class="p-pageHeader__main">
						<h1 class="p-pageHeader__heading">{tag}</h1>
						<p>{totalCount}記事あります</p>
					</div>
					<Image filename="common/ganre_common.jpg" className="p-pageHeader__img"></Image>
				</div>
				<div className="l-container">
					<BreadCrumbList type="blog" current={tag} />
					<section className="p-section">
						<h2 className="c-heading--lg">最新記事</h2>
						<div className="c-grid">
							{edges.map(({ node }) => {
								const { slug } = node.fields
								const { title, hero, date, tags } = node.frontmatter
								return (
									<article
										className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
										itemScope
										itemType="http://schema.org/Article"
										key={slug}
									>
										<Link to={slug} itemProp="url" className="p-entryCard__img" >
											{hero ?

												<Image filename={hero} />
												: <Image filename="common/dummy.png" />
											}
											<div class="p-entryCard__date">
												{date}
											</div>
										</Link>
										<Link to={slug} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{title}</h3></Link>
										<div className="p-entryCard__footer">
											<div className="p-entryCard__footer">
												<TagList tags={tags} />
											</div>
										</div>
									</article>
								)
							})}
						</div>
					</section>
					{page !== 1 ? <Pagination num={page} current={current} type={`tags/${tag}/`}></Pagination> : ''}
				</div>
			</div>
		</Layout>
	)
}
Tags.propTypes = {
	pageContext: PropTypes.shape({
		tag: PropTypes.string.isRequired,
	}),
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			totalCount: PropTypes.number.isRequired,
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						frontmatter: PropTypes.shape({
							title: PropTypes.string.isRequired,
						}),
						fields: PropTypes.shape({
							slug: PropTypes.string.isRequired,
						}),
					}),
				}).isRequired
			),
		}),
	}),
}

export default Tags

export const pageQuery = graphql`
  query(
	  $tag: String
	  $limit: Int!
	  $skip: Int!
	) {
		allMarkdownRemark(
			limit: $limit
			skip: $skip
			sort: {fields: [frontmatter___date], order: DESC }
			filter: {frontmatter: {tags: { in: [$tag] } } }
    ) {
					totalCount
      edges {
					node {
					fields {
					slug
				}
          frontmatter {
			title
			date(formatString: "YYYY.MM.DD")
			hero
			tags
          }
        }
      }
    }
  }
`

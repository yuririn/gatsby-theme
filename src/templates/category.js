import React from "react"
import PropTypes from "prop-types"

import Footer from "../components/common/footer"
import Header from "../components/common/header"
import Profile from "../components/profile"
import Genre from "../components/genre"
import Image from "../components/image"

// Components
import { Link, graphql } from "gatsby"

const category = ({ pageContext, data }) => {
	const category = pageContext
	const { edges, totalCount } = data.allMarkdownRemark
	console.log(edges)
	return (
		<div className="page-template-archive">
			<Header title="銀ねこアトリエ" />
			<main>
				<div class="p-pageHeader">
					<div class="p-pageHeader__main">
						<h1 class="p-pageHeader__heading">{category.name}に関する記事</h1>
						<p>{category.description}</p>
					</div>
					<img class="p-pageHeader__img" src={`https://ginneko-atelier.com/packages/newginneko/themes/newginneko/assets/images/common/ganre-${category.slug}.jpg`} alt=""></img>
				</div>
				<div className="l-container">
					{totalCount == 0 ? <p className="p-txt-center">{category.name}に関する記事はまだありません</p> : ''}
					<section className="p-section">
						<h2 className="c-heading--lg">最新記事</h2>
						<div className="c-grid">
							{edges.map(({ node }) => {
								const { slug } = node.fields
								const { title, image, date, tags } = node.frontmatter
								return (
									<article
										className="p-entryCard c-grid__item--md6 c-grid__item--lg4"
										itemScope
										itemType="http://schema.org/Article"
										key={slug}
									>
										<Link to={slug} itemProp="url" className="p-entryCard__img" >
											{image ?

												<Image filename={image} alt={title} />
												: null
											}
											<div class="p-entryCard__date">
												{date}
											</div>
										</Link>
										<Link to={slug} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{title}</h3></Link>
										<div className="p-entryCard__footer">
											<ul className="p-tagList">
												<li className="p-tagList__item"><Link to={'/tags/' + encodeURI(tags)}>{tags}</Link></li>
											</ul>
										</div>
									</article>
								)
							})}
						</div>
					</section>
				</div>
			</main>
			<aside>
				<div className="l-container">
					<Genre />
					<Profile />
				</div>
			</aside>
			<Footer title="銀ねこアトリエ" />
		</div>
	)
}
category.propTypes = {
	pageContext: PropTypes.shape({
		category: PropTypes.string.isRequired,
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
export default category

export const pageQuery = graphql`
  query($name: String) {
					allMarkdownRemark(
						limit: 2000
      sort: {fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {category: { in: [$name] } } }
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
			image
			category
			tags
          }
        }
      }
    }
  }
`

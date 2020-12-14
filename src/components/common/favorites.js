import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Image from "../image"

const favoritesList = {
	'web': {
		'title': 'Web制作に関する人気の記事',
		'items': ['336', '370', '315', '412', '408']
	},
	'life': {
		'title': 'セブ島・海外移住に関する人気の記事',
		'items': ['405', '417', '387', '389', '365']
	},
	'career': {
		'title': 'キャリアアップ・転職に関する人気の記事',
		'items': ['409', '369', '403', '415', '382']
	},
}

const List = ({ item, url }) => {

	const { title, date, hero } = item
	return (
		<article className="p-entryCard c-grid__item--md6 c-grid__item--lg4">
			<Link className="p-entryCard__img" to={url}>
				{hero ? <Image filename={hero} /> : <Image filename="common/dummy.png" />}
				<div class="p-entryCard__date">
					{date}
				</div>
			</Link>
			<Link to={url} itemProp="url" className="p-entryCard__body"><h3 className="p-entryCard__heading">{title}</h3></Link>
		</article>
	)
}

export default ({ type }) => {
	return (
		<StaticQuery
			query={graphql`
				query {
					allMarkdownRemark {
						edges {
							node {
								fields {
									slug
								}
								id
								frontmatter {
								date(formatString: "YYYY.MM.DD")
								hero
								title
								cateId
								tags
								}
							}
						}
					}
		}
			`}
			render={

				(data) => {
					const { title, items } = favoritesList[type]
					let posts = []

					for (const item of items) {
						if (item) {

							const post = data.allMarkdownRemark.edges.filter(
								(post) => {
									return post.node.fields.slug === `/blogs/entry${item}/`

								}
							)
							// 配列を結合
							posts = [...posts, ...post]
						}
					}

					return (
						<section class="p-section l-container is-view">
							<h2 className="c-heading--lg">{title}</h2>
							<div class="c-grid add-numbering">
								{posts.map(item => {
									return <List item={item.node.frontmatter} url={item.node.fields.slug} key={item.node.fields.slug} />
								}
								)
								}
							</div>
						</section>
					)
				}
			}

		/>
	)
}

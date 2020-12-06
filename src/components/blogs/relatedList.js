import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Image from "../image"

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

export default ({ category, title, tags }) => {
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
								pagetype
								}
							}
						}
					}
		}
			`}
			render={(data) => {
				// タイトルとカテゴリーとタグが記事と一致した時だけ抽出
				let posts = data.allMarkdownRemark.edges.filter(
					(post) => {
						// タグの一致
						for (const tag of tags) {
							if (post.node.frontmatter.title !== title) {
								return post.node.frontmatter.tags.includes(tag)
							} else {
								return false
							}
						}
						if (post.node.frontmatter.cateId === category & post.node.frontmatter.title !== title) {
							return (
								post.node.frontmatter.cateId === category & post.node.frontmatter.title !== title
							)
						}

					}

				)
				if (!posts) return

				function shuffle(list) {
					var i = list.length;

					while (--i) {
						var j = Math.floor(Math.random() * (i + 1));
						if (i === j) continue;
						var k = list[i];
						list[i] = list[j];
						list[j] = k;
					}

					return list;
				}

				shuffle(posts)

				posts = posts.slice(0, 6);

				return (
					<section class="p-section l-container is-view"><h2 class="c-heading--lg">関連記事もあわせてお読みください</h2>
						<div class="c-grid">
							{posts.map(item => {
								return <List item={item.node.frontmatter} url={item.node.fields.slug} />
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

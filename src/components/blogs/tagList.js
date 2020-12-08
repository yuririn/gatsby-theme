import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

export default ({ tags }) => {
	return (
		<StaticQuery
			query={graphql`
				query {
					allMarkdownRemark {
						edges {
							node {
								id
								frontmatter {
								tags
								}
							}
						}
					}
		}
			`}
			render={(data) => {
				// タイトルとカテゴリーとタグが記事と一致した時だけ抽出
				let tags = data.allMarkdownRemark.edges.reduce((tags, edge) => {
					const edgeTags = edge.node.frontmatter.tags;
					return edgeTags ? tags.concat(edgeTags) : tags;
				}, []);

				let counts = {};


				for (var i = 0; i < tags.length; i++) {
					let key = tags[i];
					counts[key] = (counts[key]) ? counts[key] + 1 : 1;
				}
				tags = []
				for (let tag in counts) {
					tags.push({ name: tag, count: counts[tag] })
				}

				if (!tags) return

				return (
					<div>
						{tags.map(tag => {
							return <li class="p-tagList__item"><Link to={`/blogs/tags/${tag.name}/`}>{tag.name}（{tag.count}）</Link></li>
						}
						)
						}

					</div>
				)

			}
			}
		/>
	)
}

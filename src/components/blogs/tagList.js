import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from 'styled-components';

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
					<TagList>
						<ul>
							{tags.map(tag => {
								return <li className="p-tagList__item"><Link to={`/blogs/tags/${tag.name}/`}>{tag.name}（{tag.count}）</Link></li>
							}
							)
							}
						</ul>

					</TagList>
				)

			}
			}
		/>
	)
}

const TagList = styled.div`
	ul {
		list-style: none;
	}
	.p-tagList__item {
		margin-right: 5px;
		margin-bottom: 10px;
		display: inline-block;
	}
	.p-tagList__item a {
		text-decoration: none;
		font-size: 1.2rem;
		line-height: 1;
		padding: 3px 20px 5px 3px;
		color: var(--color-blue);
		display: block;
		border-radius: 4px;
		border: 1px solid var(--color-blue);
		background: #fff;
		transition: .3s;
		white-space: nowrap;

		&:before {
			content: "";
			width: 1em;
			height: 1em;
			vertical-align: -.2em;
			display: inline-block;
			margin-right: 3px;
			border-radius: 50%;
			background: #fff;
			border: 2px solid var(--color-blue);
			transform: scale(.5);
		}
}

`

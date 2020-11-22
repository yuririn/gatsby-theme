import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import Toc from "../components/toc"
import Lifehack from "../components/lifehack"

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const { previous, next } = data
	const decription = post.frontmatter.description

	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				image={"https:://ginneko-demo.netlify.app/content/asset/" + post.frontmatter.image}
			/>
			<article
				className="p-section"
				itemScope
				itemType="http://schema.org/Article"
			>
				<header>
					<div className={`c-article__mainvisual--` + post.frontmatter.cateId}>
						<div className="c-article__img">
							<Lifehack name={post.frontmatter.category} id={post.frontmatter.cateId} />
							{post.frontmatter.image ?

								<Image filename={post.frontmatter.image} alt={post.frontmatter.title} />
								: null
							}
						</div>
					</div>
					<div class="l-container--md">
						<h1 class="c-article__heading">{post.frontmatter.title}</h1>
						<dl className="c-article__date">
							<dt>公開日</dt>
							<dd>{post.frontmatter.date}</dd>
						</dl>
						<p class="c-article__ganre"><Link to={'/tags/' + post.frontmatter.tag}>{post.frontmatter.tag}</Link></p>
						{
							<div class="c-article__description">
								{post.frontmatter.lead.map((item) => (
									<p>{item}</p>
								))}

							</div>
						}
						<ul class="c-snsBtns u-mblg">
							<li class="c-snsBtns__item"><a class="c-snsBtns__item--fb" href=""><span class="c-snsBtns__label">Facebook</span><span class="c-snsBtns__num">0</span></a></li>
							<li class="c-snsBtns__item"><a class="c-snsBtns__item--tw" href=""><span class="c-snsBtns__label">Twitter</span><span class="c-snsBtns__num">0</span></a></li>
							<li class="c-snsBtns__item"><a class="c-snsBtns__item--hateb" href=""><span class="c-snsBtns__label">はてB!</span><span class="c-snsBtns__num">0</span></a></li>
							<li class="c-snsBtns__item"><a class="c-snsBtns__item--pocket" href=""><span class="c-snsBtns__label">Pocket</span><span class="c-snsBtns__num">0</span></a></li>
						</ul>
						<Toc data={data.markdownRemark.tableOfContents} />
					</div>
				</header>
				<div class="l-container--md">
					<section className="c-editArea"
						dangerouslySetInnerHTML={{ __html: post.html }}
						itemProp="articleBody"
					/>
				</div>
			</article>
			<nav className="blog-post-nav">
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav>

		</Layout >
	)
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
	}
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
	  tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
		lead
		image
		category
		cateId
		tag
	  }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

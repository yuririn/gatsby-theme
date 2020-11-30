import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import Toc from "../components/toc"
import Category from "../components/blogs/category"
import Description from "../components/blogs/descriotion"
import TagsList from "../components/blogs/tagsBlog"
import RelatedList from "../components/blogs/relatedList"

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const { previous, next } = data
	const src = data.allFile.edges[0] ? data.allFile.edges[0].node.childImageSharp.fluid.src : ''

	return (
		<Layout location={location} title={siteTitle}>

			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				image={src}
			/>
			<article
				className="p-section"
				itemScope
				itemType="http://schema.org/Article"
			>
				<header>
					<div className={`c-article__mainvisual--` + post.frontmatter.cateId}>
						<div className="c-article__img">
							<Category name={post.frontmatter.categoryId} id={post.frontmatter.cateId} />
							{post.frontmatter.hero ?

								<Image filename={post.frontmatter.hero} />
								: <Image filename="common/dummy.png" />
							}

						</div>
					</div>
					<div class="l-container--md">
						<h1 class="c-article__heading">{post.frontmatter.title}</h1>
						<dl className="c-article__date">
							<dt>公開日</dt>
							<dd>{post.frontmatter.date}</dd>
							{post.frontmatter.modifieddate ?
								<dt>更新日</dt>
								: ''
							}
							{post.frontmatter.modifieddate ?
								<dd>{post.frontmatter.modifieddate}</dd>
								: ''
							}
						</dl>
						<TagsList tags={post.frontmatter.tags} />
						<Description texts={post.frontmatter.lead} />
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
			<RelatedList category={post.frontmatter.cateId} title={post.frontmatter.title} tags={post.frontmatter.tags}></RelatedList>
		</Layout>
	)
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
	$nextPostId: String
	$hero: String
  ) {
    site {
      siteMetadata {
        title
      }
	}
	allFile(
	filter: {
		relativePath: {eq: $hero}
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
		hero
		category
		cateId
		tags
		modifieddate(formatString: "YYYY.MM.DD")
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

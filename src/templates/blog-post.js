import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import Toc from "../components/toc"
import Category from "../components/blogs/category"
import Description from "../components/blogs/descriotion"
import TagsList from "../components/blogs/tagsBlog"
import TagsListFooter from "../components/blogs/tagsBlogFooter"
import RelatedList from "../components/blogs/relatedList"
import FovoriteList from "../components/common/favorites"
import Prof from "../components/blogs/smallProf"
import Tags from "../components/blogs/tagList"
import BreadCrumbList from "../components/common/breadCrumbList"

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const { previous, next } = data
	const src = data.allFile.edges[0] ? data.allFile.edges[0].node.childImageSharp.fluid.src : ''
	const perfectUrl = `https://ginneko-atelier.com${location.pathname}`
	const perfectTitle = encodeURI(post.frontmatter.title + '|' + siteTitle)

	return (
		<Layout location={location} title={siteTitle}>

			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				image={src}
				location={location}
				date={post.frontmatter.date}
				modifieddate={post.frontmatter.modifieddate}
				type='argicle'
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
						<BreadCrumbList type="blog" current={post.frontmatter.title} />
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
							<li class="c-snsBtns__item"><Link class="c-snsBtns__item--fb" to={`https://www.facebook.com/sharer/sharer.php?u=${perfectUrl}`} target="_blank" target="_blank" rel="noopener nofollow"><span class="c-snsBtns__label">Facebook</span></Link></li>
							<li class="c-snsBtns__item"><Link class="c-snsBtns__item--tw" to={`http://twitter.com/share?url=${perfectUrl}&text=${perfectTitle}`} target="_blank" target="_blank" rel="noopener nofollow"><span class="c-snsBtns__label">Twitter</span></Link></li>
							<li class="c-snsBtns__item"><Link to={`https://b.hatena.ne.jp/entry/${perfectUrl}`} target="_blank" class="c-snsBtns__item--hateb" rel="noopener nofollow"><span class="c-snsBtns__label">はてB!</span></Link></li>
							<li class="c-snsBtns__item"><Link class="c-snsBtns__item--pocket" to={`http://getpocket.com/edit?url=${perfectUrl}&text=${perfectTitle}`} target="_blank" target="_blank" rel="noopener nofollow"><span class="c-snsBtns__label">Pocket</span></Link></li>
						</ul>
						<Toc data={data.markdownRemark.tableOfContents} />
						<Prof></Prof>
					</div>
				</header>
				<div class="l-container--md">
					<section className="c-editArea"
						dangerouslySetInnerHTML={{ __html: post.html }}
						itemProp="articleBody"
					/>
				</div>
				<div class="l-container--md">
					<ul class="c-snsBtns u-mblg">
						<li class="c-snsBtns__item"><Link class="c-snsBtns__item--fb" to={`https://www.facebook.com/sharer/sharer.php?u=${perfectUrl}`} target="_blank" target="_blank" rel="noopener nofollow"><span class="c-snsBtns__label">Facebook</span></Link></li>
						<li class="c-snsBtns__item"><Link class="c-snsBtns__item--tw" to={`http://twitter.com/share?url=${perfectUrl}&text=${perfectTitle}`} target="_blank" target="_blank" rel="noopener nofollow"><span class="c-snsBtns__label">Twitter</span></Link></li>
						<li class="c-snsBtns__item"><Link to={`https://b.hatena.ne.jp/entry/${perfectUrl}`} target="_blank" class="c-snsBtns__item--hateb" rel="noopener nofollow"><span class="c-snsBtns__label">はてB!</span></Link></li>
						<li class="c-snsBtns__item"><Link class="c-snsBtns__item--pocket" to={`http://getpocket.com/edit?url=${perfectUrl}&text=${perfectTitle}`} target="_blank" target="_blank" rel="noopener nofollow"><span class="c-snsBtns__label">Pocket</span></Link></li>
					</ul>
					<dl className="c-article__tags">
						<dt>Category</dt>
						<dd class="cate"><Link to={`/blogs/${post.frontmatter.cateId}/`}>{post.frontmatter.category}</Link></dd>
					</dl>
					<dl className="c-article__tags">
						<dt>Tags</dt>
						<dd><TagsListFooter tags={post.frontmatter.tags} /></dd>
					</dl>
				</div>
			</article>
			<nav class="p-section l-container">
				<ol class="c-pager--article">
					<li class="c-pager--article__prev">
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								{previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li class="c-pager--article__next">
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title}
							</Link>
						)}
					</li>
				</ol>
			</nav>

			<RelatedList category={post.frontmatter.cateId} title={post.frontmatter.title} tags={post.frontmatter.tags}></RelatedList>
			<FovoriteList type="web" />
			<FovoriteList type="life" />
			<FovoriteList type="career" />
			<div className="l-container">
				<section class="p-box--gray p-section u-text-center">
					<h2 class="c-heading--lg">人気のタグ</h2>
					<Tags />
				</section>
			</div>

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
  )
  {
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
    markdownRemark(
		id: {eq: $id }
	) {
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
		pagetype
		modifieddate(formatString: "YYYY.MM.DD")
	  }
	}
    previous: markdownRemark(id: {eq: $previousPostId }) {
					fields {
					slug
				}
      frontmatter {
					title

				}
    }
    next: markdownRemark(id: {eq: $nextPostId }) {
			fields {
			slug
		}
		frontmatter {
			title
		}
	}

}
`

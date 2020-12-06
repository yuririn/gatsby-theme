import React from "react"
import { graphql } from "gatsby"

import LayoutSimple from "../components/layoutSimple"
import SEO from "../components/seo"

const PagePostTemplate = ({ data, location }) => {
	const post = data.markdownRemark
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const src = data.allFile.edges[0] ? data.allFile.edges[0].node.childImageSharp.fluid.src : ''

	return (
		<LayoutSimple location={location} title={siteTitle}>

			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				image={src}
			/>

			<div class="l-main_contents">

				<article
					className="l-container--md u-pt-lg"
					itemScope
					itemType="http://schema.org/Article"
				>
					<header>
						<div class="l-container--md">
							<h1 class="c-article__heading">{post.frontmatter.title}</h1>
						</div>
					</header>
					<div class="l-container--md">
						<section className="c-editArea"
							dangerouslySetInnerHTML={{ __html: post.html }}
							itemProp="articleBody"
						/>
					</div>
				</article>
			</div>

		</LayoutSimple>
	)
}

export default PagePostTemplate

export const pageQuery = graphql`
  query PagePostBySlug(
    $id: String!
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
    markdownRemark(
		id: { eq: $id }
	) {
      id
      excerpt(pruneLength: 160)
      html
	  tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        description
		hero
		pagetype
	  }
	}

  }
`

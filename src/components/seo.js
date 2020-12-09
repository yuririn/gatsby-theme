/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import config from "../../gatsby-config"

const SEO = ({ description, lang, meta, title, image, location, modifieddate, date }) => {
	const { site } = useStaticQuery(
		graphql`
		query {
			site {
			siteMetadata {
				title
				description
			}
			}
		}
		`
	)


	const domain = `https://ginneko-atelier.com`
	const metaDescription = description || site.siteMetadata.description
	const defaultTitle = site.siteMetadata?.title
	const ogImage = `${domain}${image}` || site.siteMetadata?.image
	const pageName = `${title} | ${defaultTitle}`;
	let blogUrl = location ? location.href : domain
	const isRoot = domain === blogUrl ? true : false
	let type = isRoot ? 'WebSite' : 'WebPage'
	const modified = modifieddate ? modifieddate : date
	const isArticle = blogUrl.includes('entry') ? true : false
	const isBlog = blogUrl.includes('blogs') ? true : false

	if (blogUrl.includes('page/')) {
		blogUrl = blogUrl.split('page/')[0]
	}


	const author = [
		{
			'@type': 'Person',
			name: config.siteMetadata.author.name,
			description: config.siteMetadata.author.summary,
			'url': domain,
			"sameAs": [
				config.siteMetadata.social.twitter,
				config.siteMetadata.social.instagram,
			]
		}
	];

	const publisher = {
		'@type': 'Organization',
		name: config.siteMetadata.author.name,
		description: config.siteMetadata.description,
		logo: {
			'@type': 'ImageObject',
			url: `${domain}/icons/icon-72x72.png`,
			width: 72,
			height: 72
		}
	}


	// JSON+LDの設定
	const jsonLdConfigs = [
		{
			'@context': 'http://schema.org',
			'@type': type,
			inLanguage: 'ja',
			url: blogUrl,
			name: pageName,
			author,
			publisher,
			image: ogImage,
			description: metaDescription,
		}
	];

	if (isArticle) {
		jsonLdConfigs.push({
			'@context': 'http://schema.org',
			'@type': 'BlogPosting',
			url: blogUrl,
			name: title,
			headline: title,
			image: {
				'@type': 'ImageObject',
				url: ogImage,
			},
			description: description,
			datePublished: date.replace('.', '-').replace('.', '-'),
			dateModified: modified.replace('.', '-').replace('.', '-'),
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': blogUrl
			},
			author,
			publisher
		});
	}

	if (!isRoot) {
		const breadCrumbList = [];
		breadCrumbList.push(
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@id': domain,
					name: 'ホーム',
				},

			})
		if (isArticle || isBlog) {
			breadCrumbList.push(
				{
					'@type': 'ListItem',
					position: 2,
					item: {
						'@id': `${domain}/blogs/`,
						name: `ブログ一覧`,
					},
				},
			)
			breadCrumbList.push(
				{
					'@type': 'ListItem',
					position: 3,
					item: {
						'@id': blogUrl,
						name: title,
					},
				},
			)
		} else {
			breadCrumbList.push(
				{
					'@type': 'ListItem',
					position: 2,
					item: {
						'@id': blogUrl,
						name: title,
					},
				},
			)
		}

		jsonLdConfigs.push({
			'@context': 'http://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadCrumbList
		})
	}




	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={pageName}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og: title`,
					content: title,
				},
				{
					property: `og: description`,
					content: metaDescription,
				},
				{
					property: `og: type`,
					content: `website`,
				},
				{
					name: `og: image`,
					content: ogImage,
				},
				{
					name: `google - site - verification`,
					content: `UmyZdMHGMBc6 - P4rF4Ajx3AhBNeOKT694ba7WGsI3Wc`,
				},
				{
					name: `twitter: card`,
					content: `summary_large_image`,
				},
				{
					name: `thumbnail`,
					content: ogImage,
				},
				{
					name: `twitter: image`,
					content: ogImage,
				},
				{
					name: `twitter: creator`,
					content: site.siteMetadata?.social?.twitter || ``,
				},
				{
					name: `twitter: title`,
					content: title,
				},
				{
					name: `twitter: description`,
					content: metaDescription,
				},
			].concat(meta)}
		>
			<link rel="canonical" href={blogUrl}></link>
			<script type="application/ld+json">{JSON.stringify(jsonLdConfigs)}</script>
		</Helmet>
	)
}

SEO.defaultProps = {
	lang: `ja`,
	meta: [],
	description: ``,
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
	location: PropTypes.string,
	date: PropTypes.string,
	modifieddate: PropTypes.string,
}

export default SEO

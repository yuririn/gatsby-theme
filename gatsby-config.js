module.exports = {
	siteMetadata: {
		title: `銀ねこアトリエ`,
		author: {
			name: `かみーゆ`,
			summary: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニア`,
		},
		description: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニアの気ままな日記です。`,
		siteUrl: `https://ginneko-atelier.com/`,
		image: `https://ginneko-atelier.com/packages/newginneko/themes/newginneko/assets/images/common/newogp2.png`,
		social: [
			{
				name: `Twitter`,
				twitter: `lirioL`,

			},
			{
				name: `instagram`,
				instagram: `yurico.k`,
			},
			{
				name: `GitHub`,
				instagram: `https://github.com/yuririn`,
			}
		],
		pagenation: 12,
	},
	plugins: [
		{
			resolve: `gatsby-theme-blog`,
			options: {
				basePath: `/blogs`,
			},
		},
	],
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,

			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 630,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {

							icon: false,
							maintainCase: true,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				//trackingId: `ADD YOUR TRACKING ID HERE`,
			},
		},
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gatsby Starter Blog`,
				short_name: `GatsbyJS`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/gatsby-icon.png`,
			},
		},
		`gatsby-plugin-react-helmet`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}

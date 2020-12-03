module.exports = {
	plugins: [
		{
			resolve: "gatsby-plugin-google-analytics",
			options: {
				trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
				head: true,
				respectDNT: true,
			}
		},
	],
	siteMetadata: {
		title: `銀ねこアトリエ`,
		author: {
			name: `かみーゆ`,
			summary: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニア`,
		},
		description: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニアの気ままな日記です。`,
		siteUrl: `https://ginneko-atelier.com/`,
		image: `https://ginneko-atelier.com/packages/newginneko/themes/newginneko/assets/images/common/newogp2.png`,
		social: {

			twitter: `lirioL`,
			instagram: `yurico.k`,
		},
		category: [
			{
				slug: 'cms',
				name: 'Contents Management System',
				description: 'WordPressやconcrete5などCMSの記事',
			},
			{
				slug: 'front-end-program',
				name: 'Front End',
				description: 'HTML、CSS、JSなどの書き留めたチップス',
			},
			{
				slug: 'back-end-program',
				name: 'Back End',
				description: 'PHP、黒い画面、DBが中心'
			},
			{
				slug: 'seo',
				name: 'Seaarch Engine Optimization',
				description: 'SEOやコンテンツマーケティングに関する記事'
			},
			{
				slug: 'it-seminar',
				name: 'ITセミナー',
				description: '勉強会の開催/登壇について書いてます'
			},
			{
				slug: 'ginneko-tsuredure',
				name: 'Life Hack',
				description: '思ったことを気ままに書いてます'
			},
		]
	},
	plugins: [
		{
			resolve: `gatsby-theme-blog`,
			options: {
				basePath: `/posts`,
			},
		},
	],
	plugins: [
		{
			resolve: `gatsby-plugin-fontawesome-css`
		}
	],
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/posts`,
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
					{
						resolve: "gatsby-remark-external-links",
						options: {
							target: "_blank",
							rel: "nofollow nopener"
						}
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
				icon: `content/assets/common/icon.png`,
			},
		},
		`gatsby-plugin-react-helmet`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}

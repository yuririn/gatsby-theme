const path = require(`path`)
const Promise = require('bluebird')
const { createFilePath } = require(`gatsby-source-filesystem`)
const slash = require('slash')

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions

	// Define a template for blog post
	const blogPost = path.resolve(`./src/templates/blog-post.js`)
	const blogList = path.resolve(`./src/templates/blogs.js`)

	// Get all markdown blog posts sorted by date
	const result = await graphql(
		`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
			totalCount
			nodes {
					id
					fields {
						slug
					}
					frontmatter {
						tags
						category
						hero
						pagetype
					}
				}
			}
      }
    `
	)

	if (result.errors) {
		reporter.panicOnBuild(
			`There was an error loading your blog posts`,
			result.errors
		)
		return
	}


	const posts = result.data.allMarkdownRemark.nodes
	let count = 0

	// Create blog posts pages
	// But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
	// `context` is available in the template as a prop and as a variable in GraphQL

	if (posts.length > 0) {
		posts.forEach((post, index) => {
			const previousPostId = index === 0 ? null : posts[index - 1].id
			const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
			if (post.fields.slug.includes('entry')) {
				const pagetype = 'blog'
				createPage({
					path: post.fields.slug,
					component: blogPost,
					context: {
						id: post.id,
						previousPostId,
						nextPostId,
						hero: post.frontmatter.hero,
						pagetype
					},
				})
				count = count + 1
			}
		})
		const postsPerPage = 12
		let numPages = Math.ceil(count / postsPerPage)

		for (let index = 0; index < numPages; index++) {
			const withPrefix = pageNumber => pageNumber === 1 ? `/blogs/` : `/blogs/page/${pageNumber}`
			const pageNumber = index + 1
			const pagetype = 'blog'
			createPage({
				path: withPrefix(pageNumber),
				// 上で作成したblogPostList変数を使用します。
				component: blogList,
				context: {
					limit: postsPerPage,
					skip: index * postsPerPage,
					current: pageNumber,
					totalCount: numPages,
					hasNext: pageNumber < numPages,
					nextPath: withPrefix(pageNumber + 1),
					hasPrev: index > 0,
					prevPath: withPrefix(pageNumber - 1),
					pagetype
				}
			})
		}
	}


	//タグを取得
	let tags = posts.reduce((tags, edge) => {
		const edgeTags = edge['frontmatter']['tags'];
		return edgeTags ? tags.concat(edgeTags) : tags;
	}, []);

	tags = Array.from(new Set(tags))

	//タグページを作成
	const tagTemplate = path.resolve(`./src/templates/tags.js`);
	[...new Set(tags)].forEach(tag => {
		const pagetype = 'blog'
		createPage({
			path: `/blogs/tags/${tag}/`,
			component: tagTemplate,
			context: {
				tag,
				pagetype,
			},
		});
	});

	const categories = [
		{
			slug: 'cms',
			name: 'Contents Managemant System',
			description: 'WordPressやconcrete5などCMSの記事'
		},
		{
			slug: 'front-end-program',
			name: 'Front End',
			description: 'WordPressやconcrete5などCMSの記事'
		},
		{
			slug: 'back-end-program',
			name: 'Back End',
			description: 'WordPressやconcrete5などCMSの記事'
		},
		{
			slug: 'seo',
			name: 'Seaarch Engine Optimization',
			description: 'WordPressやconcrete5などCMSの記事'
		},
		{
			slug: 'it-seminar',
			name: 'ITセミナー',
			description: 'WordPressやconcrete5などCMSの記事'
		},
		{
			slug: 'ginneko-tsuredure',
			name: 'Life Hack',
			description: 'WordPressやconcrete5などCMSの記事'
		},
	]

	const categoyTemplate = path.resolve(`./src/templates/category.js`);

	categories.forEach(cate => {
		const cateSlug = cate.slug
		const name = cate.name
		const pagetype = 'blog'
		createPage({
			path: `/blogs/${cate.slug}/`,
			component: categoyTemplate,
			context: {
				cateSlug,
				name,
				pagetype,
			},
		});
	})

}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })

		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions

	// Explicitly define the siteMetadata {} object
	// This way those will always be defined even if removed from gatsby-config.js

	// Also explicitly define the Markdown frontmatter
	// This way the "MarkdownRemark" queries will return `null` even when no
	// blog posts are stored inside "content/blog" instead of returning an error
	createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

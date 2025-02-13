/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const blogList = path.resolve(`./src/pages/blogs.js`)
const categoryList = path.resolve(`./src/templates/category-list-template.js`)
const tagList = path.resolve(`./src/templates/tags-list-template.js`)

const { siteMetadata } = require('./gatsby-config')

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions


  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        totalCount
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
            cateId
            hero
            pageType
            noindex
            modifieddate
            faq
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    const blogPosts = posts.filter(post => post.frontmatter.pageType === "blog")
    
    // 個々のブログ
    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id
      const nextPostId =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].id
      createPage({
        path: `/blogs/${post.fields.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
            
          hero: post.frontmatter.hero
            ? post.frontmatter.hero
            : "common/dummy.png",
        },
      })
    })

    // ブログ一覧出力
    createPage({
        path: '/blogs/',
        component: blogList,
        context: {
            title: siteMetadata.blogName,
            totalCount: blogPosts.length,
            prefix: "blogs",
            slug: "blogs",
        },
    });

    //  カテゴリー一覧出力
    siteMetadata.category.forEach((category) => {
        const count = blogPosts.filter(post => category.slug === post.frontmatter.cateId).length
        createPage({
            path: `/blogs/${category.slug}`,
            component: categoryList,
            context: {
                title: `${category.name}`,
                totalCount: count,
                prefix: "catetory",
                slug: category.slug,
            },
        });
    });

      // タグの一覧作成とカウント
      let tags = blogPosts.reduce((tags, edge) => {
          const edgeTags = edge.frontmatter.tags;
          if (edgeTags) {
              edgeTags.forEach(tag => {
                  const existingTag = tags.find(t => t.name === tag);
                  if (existingTag) {
                      existingTag.count += 1;
                  } else {
                      tags.push({ name: tag, count: 1 });
                  }
              });
          }
          return tags;
      }, []);

      //  List 出力
      tags = [...tags];
      tags.forEach((list)=>{
            const count = list.count
        createPage({
            path: `/blogs/tags/${list.name}/`,
            component: tagList,
            context: {
                title: list.name,
                totalCount: count,
                prefix: list.name,
                slug: list.name
            },
        });
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: 'content/posts' })

    createNodeField({
      name: `slug`,
      node,
      value: value.replace(/\/\d{4}\/entry(\d+)\//, 'entry$1'),
    })
  }
}

// const { exec } = require('child_process');

// /**
//  * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
//  */
// exports.onCreateWebpackConfig = async ({ actions }) => {
//   await new Promise((resolve, reject) => {
//     exec('npm run gulp', (err, stdout, stderr) => {
//       if (err) {
//         console.error('Gulp task failed:', stderr);
//         reject(err);
//       } else {
//         console.log('Gulp task completed successfully:', stdout);
//         resolve();
//       }
//     });
//   });

//   actions.setWebpackConfig({
//     plugins: [],
//   });
// };


/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
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
      modifieddate: Date @dateformat
      tags: [String]
      pageType: String
      cateId: String
      hero: String
      noindex: String
      faq: [[String]]
    }

    type Fields {
      slug: String
    }
  `)
}

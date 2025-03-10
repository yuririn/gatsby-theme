const fs = require('fs');
const path = require('path');
exports.onPreBuild = ({ reporter }) => {
    const branch = process.env.BRANCH || 'unknown';
    let nodeEnv = 'production';
    
    // ブランチが master 以外はすべて development とする
    if (branch !== 'master') {
        nodeEnv = 'development';
    }
    
    // `NODE_ENV`を設定
    process.env.NODE_ENV = nodeEnv;
    reporter.info(`Setting NODE_ENV to ${nodeEnv} for branch ${branch}`);
    console.log(`BASIC_AUTH_ID: ${process.env.BASIC_AUTH_ID}`)
    console.log(`BASIC_AUTH_PASS: ${process.env.BASIC_AUTH_PASS}`)

    const robotsPath = path.join('./static/', 'robots.txt');

    // ファイルが存在するか確認し、ログを出力
    if (fs.existsSync(robotsPath)) {
        // ファイルが存在する場合、その内容を読み取ってログに出力
        const existingContent = fs.readFileSync(robotsPath, 'utf8');
        reporter.info('Existing robots.txt content:');
        reporter.info(existingContent);

        // 上書き確認と処理
        if (nodeEnv === 'development') {
            const robotsContent = 'User-agent: *\nDisallow: /\n';
            fs.writeFileSync(robotsPath, robotsContent, 'utf8');
            reporter.info('Updated robots.txt for development environment');
        }
    } else {
        // ファイルが存在しない場合、新規作成
        if (nodeEnv === 'development') {
            const robotsContent = 'User-agent: *\nDisallow: /\n';
            fs.writeFileSync(robotsPath, robotsContent, 'utf8');
            reporter.info('Created robots.txt for development environment');
        }
    }
};

// Define a template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

const blogList = path.resolve(`./src/pages/blogs.js`)

const tagList = path.resolve(`./src/templates/tag-list.js`)

const genreList = path.resolve(`./src/templates/genre-list.js`)

const pagePost = path.resolve(`./src/templates/page-post.js`)

const contact = path.resolve(`./src/templates/contact.js`)

const { createFilePath } = require(`gatsby-source-filesystem`)
const { siteMetadata } = require('./gatsby-config')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const branchName = process.env.BRANCH || 'unknown-branch';

  if (branchName !== 'master') {

      const authPage = path.resolve('./src/templates/auth.js')
      // ログインページの生成
      createPage({
          path: '/login',
          component: authPage,
      });
  }

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
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
              faq
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

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    const blogPosts = posts.filter(post => post.frontmatter.pageType === "blog")

     // 個々のブログ記事生成
    blogPosts.forEach((post, index) => {
        
        
        const previousPostId = index === 0 ? null : blogPosts[index - 1].id
        const nextPostId =
            index === blogPosts.length - 1 ? null : blogPosts[index + 1].id
        createPage({
            path: `/blogs/${post.fields.slug}/`,
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

    // 記事の分割数
    const postsPerPage = 12

    // ブログ一覧出力
    createPage({
      path: '/blogs/',
      component: blogList,
      context: {
        title: siteMetadata.blogName || "Default Blog Name",
        totalCount: blogPosts.length,
        prefix: "blogs",
        slug: "blogs",
      },
    });

    
    //  カテゴリー一覧出力
    siteMetadata.category.forEach((category) => {
      const count = blogPosts.filter(post => category.slug === post.frontmatter.cateId).length;
      createPage({
        path: `/blogs/${category.slug}/`,
        component: genreList,
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
    tags.forEach((list) => {
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

    // 個別ページの生成
    const pagePosts = posts.filter(
      post =>
        post.frontmatter.pageType !== "blog"
    )

    pagePosts.forEach(post => {
      createPage({
        path: post.fields.slug,
        component: pagePost,
        context: {
          id: post.id,
          hero: post.frontmatter.hero
            ? post.frontmatter.hero
            : "common/dummy.png",
        },
      })
    })
  }

  //お問い合わせ
  createPage({
    path: "/contact/",
    component: contact,
    context: {},
  })

  //サンクス
  createPage({
    path: "/contact/thanks/",
    component: contact,
    context: {},
  })

}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 * 年代別に投稿を整理する
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const pageType = node.frontmatter.pageType;
        const value = createFilePath({ node, getNode, basePath: 'content/posts' })
        if (pageType === 'blog') {
            createNodeField({
                name: `slug`,
                node,
                value: value.replace(/\/\d{4}\/entry(\d+)\//, 'entry$1'),
            })
        } else {
            createNodeField({
                name: `slug`,
                node,
                value,
            })
        }
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
      modifiedDate: Date @dateformat
      tags: [String]
      noindex: Boolean
      pageType: String
      cateId: String
      hero: String
      faq:[[String]]
    }

    type Fields {
      slug: String
    }
  `)
}

/**
 * onPostBuild > ビルド後の確認。
 */

exports.onPostBuild = () => {
    const nodeEnv = process.env.NODE_ENV || 'production';
    console.log('Node Environment:', nodeEnv);

    try {
        const robotsPath = path.join('./public/', 'robots.txt');
        const robotsFileContent = fs.readFileSync(robotsPath, 'utf8');
        console.log('Robots content:', robotsFileContent); // デバッグ用
    } catch (error) {
        console.error('Error reading robots.txt file:', error);
    }
};

exports.onPreBuild = ({ reporter }) => {
    const branch = process.env.BRANCH || 'unknown';
    let nodeEnv = 'production';

    if (branch === 'develop') {
        nodeEnv = 'development';
    }

    // `NODE_ENV`を設定
    process.env.NODE_ENV = nodeEnv;
    reporter.info(`Setting NODE_ENV to ${nodeEnv} for branch ${branch}`);
};

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const adPost = path.resolve(`./src/templates/ad-post.js`)

  const blogList = path.resolve(`./src/templates/blog-list.js`)

  const tagList = path.resolve(`./src/templates/tag-list.js`)

  const adTagList = path.resolve(`./src/templates/ad-tag-list.js`)

  const genreList = path.resolve(`./src/templates/genre-list.js`)

  const pagePost = path.resolve(`./src/templates/page-post.js`)

  const contact = path.resolve(`./src/templates/contact.js`)

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
              pagetype
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
    const blogPosts = posts.filter(post => post.frontmatter.pagetype === "blog")

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

    // 一覧記事生成
    let numPages = Math.ceil(blogPosts.length / postsPerPage)

    for (let index = 0; index < numPages; index++) {
      const withPrefix = pageNumber =>
        pageNumber === 1 ? `/blogs/` : `/blogs/page/${pageNumber}/`
      const pageNumber = index + 1
      createPage({
        path: withPrefix(pageNumber),
        // 上で作成したblogPostList変数を使用します。
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          current: pageNumber,
          page: numPages,
        },
      })
    }

    //重複を排除し、カテゴリーの配列を作成
    //カテゴリーのリスト取得
    let cates = posts.reduce((cates, edge) => {
      const edgeCates = edge.frontmatter.cateId
      return edgeCates ? cates.concat(edgeCates) : cates
    }, [])
    // 重複削除
    cates = [...new Set(cates)]

    // カテゴリー分ページを作成
    cates.forEach(cate => {
      const cateSlug = cate
      const cateCount = posts.filter(
        post => post.frontmatter.cateId === cate
      ).length
      const numPages = Math.ceil(cateCount / postsPerPage) //分割されるページの数

      for (let index = 0; index < numPages; index++) {
        const pageNumber = index + 1
        const withPrefix = pageNumber =>
          pageNumber === 1
            ? `/blogs/${cate}/`
            : `/blogs/${cate}/page/${pageNumber}/`

        createPage({
          path: withPrefix(pageNumber),
          component: genreList,
          context: {
            limit: postsPerPage, //追加
            skip: index * postsPerPage, //追加
            current: pageNumber, //追加
            page: numPages, //追加
            cateSlug,
          },
        })
      }
    })

    //タグの一覧作成
    let tags = blogPosts.reduce((tags, edge) => {
      const edgeTags = edge.frontmatter.tags
      return edgeTags ? tags.concat(edgeTags) : tags
    }, [])
    // 重複削除
    tags = [...new Set(tags)]

    // タグ
    tags.forEach(item => {
      const tag = item
      const tagsCount = blogPosts.filter(post =>
        post.frontmatter.tags.includes(item)
      ).length
      const numPages = Math.ceil(tagsCount / postsPerPage) //分割されるページの数
      for (let index = 0; index < numPages; index++) {
        const pageNumber = index + 1
        const withPrefix = pageNumber =>
          pageNumber === 1
            ? `/blogs/tags/${tag}/`
            : `/blogs/tags/${tag}/page/${pageNumber}/`
        createPage({
          path: withPrefix(pageNumber),
          component: tagList,
          context: {
            limit: postsPerPage, //追加
            skip: index * postsPerPage, //追加
            current: pageNumber, //追加
            page: numPages, //追加
            tag,
          },
        })
      }
    })

    // 個別ページの生成
    const pagePosts = posts.filter(
      post =>
        post.frontmatter.pagetype !== "blog"
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
      modifieddate: Date @dateformat
      tags: [String]
      noindex: Boolean
      pagetype: String
      cateId: String
      hero: String
      faq:[[String]]
    }

    type Fields {
      slug: String
    }
  `)
}
// 処理回数をカウントする変数を定義
let processCount = 0;
const fs = require('fs');

exports.onPostBuild = () => {
    processCount++;
    console.log('onPostBuild called:', processCount, 'times');

    const nodeEnv = process.env.NODE_ENV || 'production';

    // 環境を確認
    console.log('Node Environment:', nodeEnv);

    if (nodeEnv === 'development') {
        const basicAuthId = process.env.BASIC_AUTH_ID || '';
        const basicAuthPass = process.env.BASIC_AUTH_PASS || '';

        // デバッグ用ログ
        console.log('Basic Auth ID:', basicAuthId);
        console.log('Basic Auth Pass:', basicAuthPass);

        const headersPath = path.join(__dirname, 'public', '_headers');
        console.log('Headers Path:', headersPath); // デバッグ用

        const basicAuthHeader = '/*\nBasic-Auth: ' + basicAuthId + ':' + basicAuthPass + '\n*/\n';

        // `_headers` ファイルの内容を全て削除し、Basic認証のみを追加
        const headersContent = basicAuthHeader;

        try {
            // 新しい内容を書き戻す
            fs.writeFileSync(headersPath, headersContent, 'utf8');
            console.log('Headers file updated');
            console.log('Headers content:', headersContent); // デバッグ用

            // 開発環境でのrobots.txt設定
            const robotsPath = path.join(__dirname, 'public', 'robots.txt');
            const robotsContent = 'User-agent: *\nDisallow: /\n';
            fs.writeFileSync(robotsPath, robotsContent, 'utf8');
            console.log('robots.txt file updated');

            // デバッグ用にrobots.txtの内容を出力
            const robotsFileContent = fs.readFileSync(robotsPath, 'utf8');
            console.log('Robots content:', robotsFileContent); // デバッグ用
        } catch (error) {
            if (error.code === 'ENOENT') {
                // ファイルが存在しない場合は新規作成
                fs.writeFileSync(headersPath, headersContent, 'utf8');
                console.log('Created new headers file');
                console.log('Headers content:', headersContent); // デバッグ用

                // 開発環境でのrobots.txt設定
                const robotsPath = path.join(__dirname, 'public', 'robots.txt');
                const robotsContent = 'User-agent: *\nDisallow: /\n';
                fs.writeFileSync(robotsPath, robotsContent, 'utf8');
                console.log('robots.txt file updated');

                // デバッグ用にrobots.txtの内容を出力
                const robotsFileContent = fs.readFileSync(robotsPath, 'utf8');
                console.log('Robots content:', robotsFileContent); // デバッグ用
            } else {
                console.error('Error updating headers file:', error);
            }
        }
    }
};

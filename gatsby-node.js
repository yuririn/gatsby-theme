console.log(` NODE_ENV: ${process.env.BRANCH}`)

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

    const adPosts = posts.filter(post => post.frontmatter.pagetype === "ad")

    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id
      const nextPostId =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].id

      createPage({
        path: post.fields.slug,
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

    adPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : adPosts[index - 1].id
      const nextPostId =
        index === adPosts.length - 1 ? null : adPosts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: adPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          hero: post.frontmatter.hero ? post.frontmatter.hero : "ad/dummy.png",
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

    let adTags = adPosts.reduce((tags, edge) => {
      const edgeTags = edge.frontmatter.tags
      return edgeTags ? tags.concat(edgeTags) : tags
    }, [])
    adTags = [...new Set(adTags)]

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

    // タグ
    adTags.forEach(item => {
      const tag = item
      const tagsCount = adPosts.filter(post =>
        post.frontmatter.tags.includes(item)
      ).length
      const numPages = Math.ceil(tagsCount / postsPerPage) //分割されるページの数
      for (let index = 0; index < numPages; index++) {
        const pageNumber = index + 1
        const withPrefix = pageNumber =>
          pageNumber === 1
            ? `/choco-blog/tags/${tag}/`
            : `/choco-blog/tags/${tag}/page/${pageNumber}/`
        createPage({
          path: withPrefix(pageNumber),
          component: adTagList,
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
        post.frontmatter.pagetype !== "blog" &&
        post.frontmatter.pagetype !== "ad"
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

const fs = require('fs');

exports.onPostBuild = () => {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
        const headersPath = path.join(__dirname, 'public', '_headers');
        const basicAuthHeader = `/*
        Basic-Auth: ${process.env.BASIC_AUTH_ID}:${process.env.BASIC_AUTH_PASS}\n`;

        console.log(basicAuthHeader)

        // 現在の_headersファイルの内容を読み込み
        let headersContent = fs.readFileSync(headersPath, 'utf8');

        // Basic-Authヘッダーを先頭に追加
        headersContent = basicAuthHeader + headersContent;

        console.log(headersContent)

        // 修正された内容を書き戻す
        fs.writeFileSync(headersPath, headersContent, 'utf8');
    }
};

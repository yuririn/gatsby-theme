const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogList = path.resolve(`./src/templates/blog-list.js`);
  const tagList = path.resolve(`./src/templates/tag-list.js`);
  const genreList = path.resolve(`./src/templates/genre-list.js`);
  const pagePost = path.resolve(`./src/templates/page-post.js`);

  const contact = path.resolve(`./src/templates/contact.js`);
  const aboutPost = path.resolve(`./src/pages/about.js`);
  const portfolioPost = path.resolve(`./src/pages/portfolio.js`);

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
              cateId
              hero
              pagetype
            }
          }
        }
      }
    `
  );

  createPage({
    path: "portfolio",
    component: portfolioPost,
    context: {},
  });

  createPage({
    path: "/contact/",
    component: contact,
    context: {},
  });

  createPage({
    path: "/contact/thanks/",
    component: contact,
    context: {},
  });
  createPage({
    path: "/about/",
    component: aboutPost,
    context: {},
  });

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    const blogPosts = posts.filter((post) => {
      if (post.frontmatter.pagetype === "blog") return post;
    });

    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id;
      const nextPostId =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          hero: post.frontmatter.hero,
        },
      });
    });

    // ページの生成
    posts.forEach((post) => {
      if (post.frontmatter.pagetype === "page") {
        createPage({
          path: post.fields.slug,
          component: pagePost,
          context: {
            id: post.id,
            hero: post.frontmatter.hero,
          },
        });
      }
    });

    // 一覧記事生成
    const postsPerPage = 12;
    let numPages = Math.ceil(blogPosts.length / postsPerPage);

    for (let index = 0; index < numPages; index++) {
      const withPrefix = (pageNumber) =>
        pageNumber === 1 ? `/blogs/` : `/blogs/page/${pageNumber}/`;
      const pageNumber = index + 1;
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
      });
    }

    //タグ一覧ページ
    let tags = posts.reduce((tags, edge) => {
      const edgeTags = edge["frontmatter"]["tags"];
      return edgeTags ? tags.concat(edgeTags) : tags;
    }, []);

    let counts = {};

    for (var i = 0; i < tags.length; i++) {
      let key = tags[i];
      counts[key] = counts[key] ? counts[key] + 1 : 1;
    }

    tags = counts;

    for (let tag in tags) {
      const postsPerPage = 12;
      let count = tags[tag];
      numPages = Math.ceil(count / postsPerPage);

      for (let index = 0; index < numPages; index++) {
        const withPrefix = (pageNumber) =>
          pageNumber === 1
            ? `/blogs/tags/${tag}/`
            : `/blogs/tags/${tag}/page/${pageNumber}/`;
        const pageNumber = index + 1;

        createPage({
          path: withPrefix(pageNumber),
          component: tagList,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            current: pageNumber,
            page: numPages,
            tag,
          },
        });
      }
      // console.log(tag, tags[tag])
    }

    //カテゴリー一覧
    let cates = posts.reduce((cates, edge) => {
      const edgeCates = edge["frontmatter"]["cateId"];
      return edgeCates ? cates.concat(edgeCates) : cates;
    }, []);

    let categories = {};

    for (var i = 0; i < cates.length; i++) {
      let key = cates[i];
      categories[key] = categories[key] ? categories[key] + 1 : 1;
    }

    for (cate in categories) {
      const postsPerPage = 12;
      let count = categories[cate];
      numPages = Math.ceil(count / postsPerPage);

      for (let index = 0; index < numPages; index++) {
        const withPrefix = (pageNumber) =>
          pageNumber === 1
            ? `/blogs/${cate}/`
            : `/blogs/${cate}/page/${pageNumber}/`;
        const pageNumber = index + 1;
        const cateSlug = cate;

        createPage({
          path: withPrefix(pageNumber),
          component: genreList,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            current: pageNumber,
            page: numPages,
            cateSlug,
          },
        });
      }
    }
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

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
  `);
};

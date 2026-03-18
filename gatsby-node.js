const fs = require('fs');
const path = require('path');

/**
 * 1. onPreBuild: robots.txt の動的生成
 */
exports.onPreBuild = ({ reporter }) => {
  const branch = process.env.BRANCH || 'master';
  const nodeEnv = branch === 'master' ? 'production' : 'development';
  process.env.NODE_ENV = nodeEnv;

  reporter.info(`[Build Strategy] Branch: ${branch} -> Setting NODE_ENV to ${nodeEnv}`);

  const robotsPath = path.join('./static/', 'robots.txt');
  let robotsContent = '';

  if (nodeEnv === 'development') {
    robotsContent = 'User-agent: *\nDisallow: /\n';
  } else {
    robotsContent = `# 1. Search Engines
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

# 2. Welcome AI Bots
User-agent: GPTBot
User-agent: PerplexityBot
User-agent: GrokBot
User-agent: Applebot-Extended
Allow: /

# 3. Block Data Crawlers
User-agent: CCBot
Disallow: /

# 4. Global Settings
User-agent: *
Allow: /
`;
  }

  try {
    if (!fs.existsSync('./static')) {
      fs.mkdirSync('./static', { recursive: true });
    }
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    reporter.info(`[Success] robots.txt generated for ${nodeEnv}`);
  } catch (err) {
    reporter.error('Failed to write robots.txt', err);
  }
};

/**
 * 2. createPages: 動的ページ生成
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const { siteMetadata } = require('./gatsby-config');

  if ((process.env.BRANCH || 'master') !== 'master') {
    createPage({
      path: '/login',
      component: path.resolve('./src/templates/auth.js'),
    });
  }

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 2000) {
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
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`GraphQL Query Error`, result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    const blogPosts = posts.filter(post => post.frontmatter.pageType === "blog");

    blogPosts.forEach((post, index) => {
      createPage({
        path: `/blogs/${post.fields.slug}/`,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: post.id,
          previousPostId: index === 0 ? null : blogPosts[index - 1].id,
          nextPostId: index === blogPosts.length - 1 ? null : blogPosts[index + 1].id,
          hero: post.frontmatter.hero || "common/dummy.png",
        },
      });
    });

    createPage({
      path: '/blogs/',
      component: path.resolve(`./src/pages/blogs.js`),
      context: {
        title: siteMetadata.blogName || "銀ねこアトリエ",
        totalCount: blogPosts.length,
        prefix: "blogs",
        slug: "blogs",
      },
    });

    siteMetadata.category.forEach((category) => {
      const count = blogPosts.filter(post => category.slug === post.frontmatter.cateId).length;
      createPage({
        path: `/blogs/${category.slug}/`,
        component: path.resolve(`./src/templates/genre-list.js`),
        context: {
          title: category.name,
          totalCount: count,
          prefix: "catetory",
          slug: category.slug,
        },
      });
    });

    const tagCounts = blogPosts.reduce((acc, node) => {
      const tags = node.frontmatter.tags || [];
      tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    Object.keys(tagCounts).forEach(tagName => {
      createPage({
        path: `/blogs/tags/${tagName}/`,
        component: path.resolve(`./src/templates/tag-list.js`),
        context: {
          title: tagName,
          totalCount: tagCounts[tagName],
          prefix: tagName,
          slug: tagName,
        },
      });
    });

    posts.filter(p => p.frontmatter.pageType !== "blog").forEach(post => {
      createPage({
        path: post.fields.slug,
        component: path.resolve(`./src/templates/page-post.js`),
        context: {
          id: post.id,
          hero: post.frontmatter.hero || "common/dummy.png",
        },
      });
    });
  }

  ["/contact/", "/contact/thanks/"].forEach(p => {
    createPage({
      path: p,
      component: path.resolve(`./src/templates/contact.js`),
      context: {},
    });
  });
};

/**
 * 3. onCreateNode: スラッグ正規化
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const { createFilePath } = require(`gatsby-source-filesystem`);
    const value = createFilePath({ node, getNode, basePath: 'content/posts' });
    const slugValue = node.frontmatter.pageType === 'blog'
      ? value.replace(/\/\d{4}\/entry(\d+)\//, 'entry$1')
      : value;
    createNodeField({ name: `slug`, node, value: slugValue });
  }
};

/**
 * 4. createSchemaCustomization: スキーマ定義
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      blogName: String
      category: [Category]
    }

    type Category {
      name: String
      slug: String
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

    # FAQの各項目用の型を定義
    type FaqItem {
      q: String
      a: String
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
      # データの構造に合わせて型を変更
      faq: [FaqItem]
    }

    type Fields {
      slug: String
    }
  `);
};

/**
 * 5. createResolvers: フィールドの値を強制変換
 */
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Frontmatter: {
      tags: {
        resolve(source) {
          return Array.isArray(source.tags) ? source.tags : [];
        },
      },
      faq: {
        resolve(source) {
          // faqがない場合は空配列を返す
          if (!source.faq || !Array.isArray(source.faq)) {
            return [];
          }
          // source.faq はすでにオブジェクトの配列なので、そのまま返す
          // （不正な要素が混じるのを防ぐためフィルタリングを維持）
          return source.faq.filter(item => item && (item.q || item.a));
        },
      },
    },
  });
};

/**
 * 6. onPostBuild
 */
exports.onPostBuild = ({ reporter }) => {
  const nodeEnv = process.env.NODE_ENV || 'production';
  try {
    const robotsPath = path.join('./public/', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      const content = fs.readFileSync(robotsPath, 'utf8');
      reporter.info(`最終的な robots.txt の確認:\n${content}`);
    }
  } catch (error) {
    reporter.warn('public フォルダ内の robots.txt を確認できませんでした');
  }
};

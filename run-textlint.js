const fs = require('fs');
const path = require('path');

/**
 * 1. PreBuild: 開発/本番の環境切り分けとrobots.txtの制御
 */
exports.onPreBuild = ({ reporter }) => {
  // Netlify等の環境変数 BRANCH を参照。なければ production 扱い
  const branch = process.env.BRANCH || 'master';
  let nodeEnv = 'production';

  // master ブランチ以外はすべて開発用として扱う
  if (branch !== 'master') {
    nodeEnv = 'development';
  }

  process.env.NODE_ENV = nodeEnv;
  reporter.info(`[Build Strategy] Branch: ${branch} -> Setting NODE_ENV to ${nodeEnv}`);

  // robots.txt の生成パス（Gatsbyはビルド時に static を public にコピーする）
  const robotsPath = path.join('./static/', 'robots.txt');

  let robotsContent = '';

  if (nodeEnv === 'development') {
    // 開発環境：検索エンジンを完全にブロック
    robotsContent = 'User-agent: *\nDisallow: /\n';
    reporter.info('Development mode: Protecting site with Disallow: /');
  } else {
    // 本番環境：戦略的 AI-Friendly robots.txt
    robotsContent = `# 1. Search Engines
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

# 2. Welcome AI Bots (引用・回答用)
User-agent: GPTBot
User-agent: PerplexityBot
User-agent: GrokBot
User-agent: Applebot-Extended
Allow: /

# 3. Block Data Crawlers (学習データ収集のみのボット)
User-agent: CCBot
Disallow: /

# 4. Global Settings
User-agent: *
Allow: /
`;
    reporter.info('Production mode: Applying Strategic AI-Friendly robots.txt');
  }

  try {
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  } catch (err) {
    reporter.error('Failed to write robots.txt', err);
  }
};

// テンプレートパスの定義
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const blogList = path.resolve(`./src/pages/blogs.js`)
const tagList = path.resolve(`./src/templates/tag-list.js`)
const genreList = path.resolve(`./src/templates/genre-list.js`)
const pagePost = path.resolve(`./src/templates/page-post.js`)
const contact = path.resolve(`./src/templates/contact.js`)

const { createFilePath } = require(`gatsby-source-filesystem`)
const { siteMetadata } = require('./gatsby-config')

/**
 * 2. CreatePages: ページの動的生成
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const branchName = process.env.BRANCH || 'master';

  // masterブランチ以外（プレビュー環境等）のみログインページを生成
  if (branchName !== 'master') {
    const authPage = path.resolve('./src/templates/auth.js')
    createPage({
      path: '/login',
      component: authPage,
    });
  }

  const result = await graphql(`
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
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading blog posts`, result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  if (posts.length > 0) {
    const blogPosts = posts.filter(post => post.frontmatter.pageType === "blog")

    // ブログ個別記事
    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id
      const nextPostId = index === blogPosts.length - 1 ? null : blogPosts[index + 1].id
      createPage({
        path: `/blogs/${post.fields.slug}/`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          hero: post.frontmatter.hero || "common/dummy.png",
        },
      })
    })

    // ブログ一覧
    createPage({
      path: '/blogs/',
      component: blogList,
      context: {
        title: siteMetadata.blogName || "銀ねこアトリエ",
        totalCount: blogPosts.length,
        prefix: "blogs",
        slug: "blogs",
      },
    });

    // カテゴリー別一覧
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

    // タグ別一覧
    let tags = blogPosts.reduce((acc, node) => {
      const nodeTags = node.frontmatter.tags;
      if (nodeTags) {
        nodeTags.forEach(tag => {
          const found = acc.find(t => t.name === tag);
          if (found) found.count += 1;
          else acc.push({ name: tag, count: 1 });
        });
      }
      return acc;
    }, []);

    tags.forEach((tag) => {
      createPage({
        path: `/blogs/tags/${tag.name}/`,
        component: tagList,
        context: {
          title: tag.name,
          totalCount: tag.count,
          prefix: tag.name,
          slug: tag.name
        },
      });
    })

    // 固定ページ
    posts.filter(p => p.frontmatter.pageType !== "blog").forEach(post => {
      createPage({
        path: post.fields.slug,
        component: pagePost,
        context: {
          id: post.id,
          hero: post.frontmatter.hero || "common/dummy.png",
        },
      })
    })
  }

  // お問い合わせ・サンクス
  const staticPages = ["/contact/", "/contact/thanks/"];
  staticPages.forEach(p => createPage({ path: p, component: contact, context: {} }));
}

/**
 * 3. onCreateNode: スラッグの正規化
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const pageType = node.frontmatter.pageType;
    const value = createFilePath({ node, getNode, basePath: 'content/posts' })

    // blogタイプの場合はスラッグから日付/entryプレフィックスを調整
    let slugValue = value;
    if (pageType === 'blog') {
      slugValue = value.replace(/\/\d{4}\/entry(\d+)\//, 'entry$1');
    }

    createNodeField({ name: `slug`, node, value: slugValue })
  }
}

/**
 * 4. createSchemaCustomization: 型定義
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
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
    type Author { name: String; summary: String }
    type Social { twitter: String }
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
      faq: [[String]]
    }
    type Fields { slug: String }
  `)
}

/**
 * 5. PostBuild: ビルド結果の最終確認
 */
exports.onPostBuild = ({ reporter }) => {
  const nodeEnv = process.env.NODE_ENV || 'production';
  reporter.info(`Post-Build Check: Environment is ${nodeEnv}`);

  try {
    const robotsPath = path.join('./public/', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      const content = fs.readFileSync(robotsPath, 'utf8');
      reporter.info(`Final robots.txt content:\n${content}`);
    }
  } catch (error) {
    reporter.warn('Could not verify robots.txt in public folder');
  }
};

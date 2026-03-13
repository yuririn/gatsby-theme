const fs = require('fs');
const path = require('path');

exports.onPreBuild = ({ reporter }) => {
  const branch = process.env.BRANCH || 'master';
  let nodeEnv = 'production';
  if (branch !== 'master') {
    nodeEnv = 'development';
  }
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
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    reporter.info(`Success: robots.txt written for ${nodeEnv}`);
  } catch (err) {
    reporter.error('Failed to write robots.txt', err);
  }
};

const blogPost = path.resolve(`./src/templates/blog-post.js`);
const blogList = path.resolve(`./src/pages/blogs.js`);
const tagList = path.resolve(`./src/templates/tag-list.js`);
const genreList = path.resolve(`./src/templates/genre-list.js`);
const pagePost = path.resolve(`./src/templates/page-post.js`);
const contact = path.resolve(`./src/templates/contact.js`);

const { createFilePath } = require(`gatsby-source-filesystem`);
const { siteMetadata } = require('./gatsby-config');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const branchName = process.env.BRANCH || 'master';

  if (branchName !== 'master') {
    const authPage = path.resolve('./src/templates/auth.js');
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
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error loading blog posts`, result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;
  if (posts.length > 0) {
    const blogPosts = posts.filter(post => post.frontmatter.pageType === "blog");

    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id;
      const nextPostId = index === blogPosts.length - 1 ? null : blogPosts[index + 1].id;
      createPage({
        path: `/blogs/${post.fields.slug}/`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          hero: post.frontmatter.hero || "common/dummy.png",
        },
      });
    });

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
    });

    posts.filter(p => p.frontmatter.pageType !== "blog").forEach(post => {
      createPage({
        path: post.fields.slug,
        component: pagePost,
        context: {
          id: post.id,
          hero: post.frontmatter.hero || "common/dummy.png",
        },
      });
    });
  }

  const staticPages = ["/contact/", "/contact/thanks/"];
  staticPages.forEach(p => createPage({ path: p, component: contact, context: {} }));
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const pageType = node.frontmatter.pageType;
    const value = createFilePath({ node, getNode, basePath: 'content/posts' });
    let slugValue = value;
    if (pageType === 'blog') {
      slugValue = value.replace(/\/\d{4}\/entry(\d+)\//, 'entry$1');
    }
    createNodeField({ name: `slug`, node, value: slugValue });
  }
};

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
  `);
};

exports.onPostBuild = ({ reporter }) => {
  const nodeEnv = process.env.NODE_ENV || 'production';
  try {
    const robotsPath = path.join('./public/', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      const content = fs.readFileSync(robotsPath, 'utf8');
      reporter.info(`Final robots.txt content:\n${content}`);
    }
  } catch (error) {
    reporter.warn('Could not verify robots.txt');
  }
};

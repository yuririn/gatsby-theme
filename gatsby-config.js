/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    pickup: ["entry541","entry533"],
    title: `セブ島海外ノマドエンジニアの日記【銀ねこアトリエ】`,
        blogName: 'セブ島エンジニアのノマドブログ',
    author: {
      name: `かみーゆ`,
      summary: `資金ゼロからフィリピンで起業した海外ノマドエンジニア。IT業界10年以上でテクニカルディレクター（技術責任者）・エンジニア講師・ブリッジSEを経てLenzTechnologies Inc.を設立し、代表を務める。CMS concreteCMSエバンジェリスト。テックブログ以外も「磨耗しない人生」や「海外ノマド」のライフスタイルについて発信。好きなものは肉とハイボール。`,
    },
    description: `セブ島に住む女性フロントエンドエンジニアのライフログ。フロント技術を中心とした「ウェブ制作に関するチップス」、「磨耗しない人生の選択」や「海外ノマド」のライフスタイルについて発信しています。`,
    siteUrl: `https://ginneko-atelier.com`,
    image: `https://ginneko-atelier.com/images/newogp.png`,
    social: {
      twitter: `lirioL`,
      instagram: `yurico.k`,
      youtube: `https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw`,
    },
    category: [
      {
        slug: "web-developer",
        name: "ウェブ制作",
        enName: "Web Developer",
        description: "ウェブ制作に関するチップス",
      },
      {
        slug: "cms",
        name: "CMS",
        enName: "Contents Management System",
        description: "WordPressやconcrete5などCMSの記事",
      },
      {
        slug: "seo",
        name: "SEO対策・デジタルマーケ",
        enName: "Search Engine Optimization",
        description: "SEO対策やデジタルマーケティングに関する記事",
      },
      {
        slug: "overseas-freelancing",
        name: "海外ノマド生活",
        enName: "Overseas Freelancer",
        description: "海外ノマド生活のリアル",
      },
      {
        slug: "career",
        name: "キャリアアップ・勉強",
        enName: "Career Up",
        description: "キャリアアップや勉強したことについて",
      },
      {
        slug: "ginneko-tsuredure",
        name: "かみーゆ徒然記",
        enName: "My Policy",
        description: "信念・思いや感じたことを気ままに綴ってます",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
          rule: {
              include: /src\/images\/svg/ // SVGファイルが保存されているディレクトリを指定
          }
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/`,
        name: `blogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
              {
                  resolve: `gatsby-remark-table-of-contents`,
                  options: {
                      exclude: "目次",
                      tight: false,
                      fromHeading: 2,
                      toHeading: 3
                  },
              },
          {
            resolve: `gatsby-remark-images`,
                options: {
                    maxWidth: 800,
                    quality: 90,
                    withWebp: true,
                    linkImagesToOriginal: false,
                },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
            `gatsby-remark-prismjs-title`,
            `gatsby-remark-prismjs`,
            `gatsby-remark-copy-linked-files`,
            `gatsby-remark-smartypants`,
            "gatsby-remark-component",
            {
                resolve: `gatsby-remark-autolink-headers`,
                options: {
                    offsetY: `30`,
                    icon: false,
                    className: `custom-class`,
                    maintainCase: false,
                },
            },
            {
                resolve: "gatsby-remark-external-links",
                options: {
                    rel: "noopener noreferrer",
                },
            },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
        resolve: 'gatsby-plugin-sharp',
        options: {
            failOn: "none",
        },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

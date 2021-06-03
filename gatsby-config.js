module.exports = {
  siteMetadata: {
    title: `銀ねこアトリエ`,
    author: {
      name: `かみーゆ`,
      summary: `「銀ねこアトリエ」はセブ島に住むフロントエンドエンジニア`,
    },
    description: `セブ島に住む女性フロントエンドエンジニアのライフログ。フロント技術を中心とした「ウェブ制作に関するチップス」、「磨耗しない人生の選択」や「海外ノマド」のライフスタイルについて発信しています。`,
    siteUrl: `https://ginneko-atelier.com`,
    image: `https://ginneko-atelier.com/static/734c25c8328e14e4d8df99abaea453a2/ee604/newogp.png`,
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
        name: "SEOとデジマ",
        enName: "Seaarch Engine Optimization",
        description: "SEOやデジタルマーケティングに関する記事",
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
        name: "私のポリシー",
        enName: "My Policy",
        description: "信念・思いや感じたことを気ままに綴ってます",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_TRACKING_ID,
          process.env.GOOGLE_ADSENSE_ID,
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    //     head: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: process.env.GOOGLE_ADSENSE_ID,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar-tracking`,
      options: {
        includeInDevelopment: false,
        id: 2295862,
        sv: 6,
      },
    },
    {
      resolve: `gatsby-plugin-fontawesome-css`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },

          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: false,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow nopener",
            },
          },
          "gatsby-remark-prismjs-title",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: [
          `/blogs/page/*`,
          `/blogs/tags/*/page/*`,
          `/blogs/*/page/*`,
          `/contact/thanks/`,
        ],
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/common/icon.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-smoothscroll`,
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
            serialize: ({ query: { site, allMarkdownRemark, allFile } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const image = allFile.edges.find(n => {
                  return n.node.relativePath.includes(
                    edge.node.frontmatter.hero
                  )
                })
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  enclosure: {
                    url:
                      site.siteMetadata.siteUrl +
                      image.node.childImageSharp.original.src,
                    size: 1200,
                    type: image.node.childImageSharp.original.src.includes(
                      "png"
                    )
                      ? "image/png"
                      : "image/jpeg",
                  },
                  custom_elements: [
                    {
                      "content:encoded":
                        '<p><img src="' +
                        site.siteMetadata.siteUrl +
                        image.node.childImageSharp.original.src +
                        '" width="1200" height="900" alt="' +
                        edge.node.frontmatter.title +
                        '"></p>' +
                        edge.node.html,
                    },
                  ],
                })
              })
            },
            query: `
              {
                site {
                  siteMetadata {
                    title
                    siteUrl
                  }
                }
                allFile(
                  filter: {
                    sourceInstanceName: { eq: "assets" }
                  }
                ) {
                  edges {
                    node {
                      name
                      relativePath
                      childImageSharp {
                        original {
                          src
                          height
                          width
                        }
                      }
                    }
                  }
                }
                allMarkdownRemark(
                  limit: 20
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: { frontmatter: { pagetype: { eq: "blog" } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        description
                        date
                        hero
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "銀ねこアトリエ RSS Feed",
            feed_url: "https://ginneko-atelier.com/rss.xml",
          },
        ],
      },
    },
  ],
}

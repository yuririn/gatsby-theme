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
        slug: "cms",
        name: "Contents Management System",
        description: "WordPressやconcrete5などCMSの記事",
      },
      {
        slug: "front-end-program",
        name: "Front End",
        description: "HTML、CSS、JSなどの書き留めたチップス",
      },
      {
        slug: "back-end-program",
        name: "Back End",
        description: "PHP、黒い画面、DBが中心",
      },
      {
        slug: "seo",
        name: "Seaarch Engine Optimization",
        description: "SEOやコンテンツマーケティングに関する記事",
      },
      {
        slug: "it-seminar",
        name: "ITセミナー",
        description: "勉強会の開催/登壇について書いてます",
      },
      {
        slug: "ginneko-tsuredure",
        name: "Life Hack",
        description: "思ったことを気ままに書いてます",
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
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded":
                        `<img src="${image.node.childImageSharp.original.src}" height="${image.node.childImageSharp.original.height}" width="${image.node.childImageSharp.original.width}" />` +
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

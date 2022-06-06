module.exports = {
  siteMetadata: {
    title: `セブ島ノマドエンジニアの日記【銀ねこアトリエ】`,
    author: {
      name: `かみーゆ`,
      summary: `セブ島海外ノマドフロントエンドエンジニアです。`,
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
        name: "かみーゆの徒然記事",
        enName: "My Policy",
        description: "信念・思いや感じたことを気ままに綴ってます",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-KPH3R92`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        //自分の好きなファイル名にしたい場合はoutputを追加。デフォルトは「sitemap.xml」
        //除外したいページを指定する。「*」でワイルドカードも使える。
        output: `/`,
        excludes: [
          `/blogs/page/*`,
          `/contact/thanks/`,
          `/404?(.*)`,
          `/blogs/*/page/*`,
          `/blogs/tags/*/page/*`,
          `/portfolioParts/*`,
          `/using-typescript/`,
          `/blogs/entry403/`,
          `/blogs/entry312/`,
          `/blogs/entry285/`,
          `/blogs/entry208/`,
          `/blogs/entry224/`,
          `/blogs/entry214/`,
          `/blogs/entry195/`,
          `/blogs/entry176/`,
          `/blogs/entry272/`,
          `/blogs/entry424/`,
          `/blogs/entry312/`,
          `/blogs/entry414/`,
          `/blogs/entry365/`,
          `/blogs/entry483/`,
          `/blogs/entry244/`,
          `/blogs/entry419/`,
          `/blogs/entry338/`,
          `/blogs/entry204/`,
          `/blogs/entry380/`,
          `/blogs/entry471/`,
          `/blogs/entry355/`,
          `/blogs/entry457/`,
          `/blogs/entry485/`,
          `/blogs/entry364/`,
          `/blogs/entry231/`,
          `/blogs/entry309/`,
          `/blogs/entry274/`,
        ],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
              quarity: 70,
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
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },

    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-twitter`,

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
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
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
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `銀ねこアトリエ | セブ島在住海外ノマド フロントエンジニアの日記`,
        short_name: `銀ねこアトリエ`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

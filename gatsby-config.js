

const headersConfig = {
    '/*.html': [
        'cache-control: public, max-age=0, must-revalidate'
    ],
    '/page-data/app-data.json': [
        'cache-control: public, max-age=0, must-revalidate'
    ],
    '/page-data/*': [
        'cache-control: public, max-age=0, must-revalidate'
    ],
    '/static/*': [
        'cache-control: public, max-age=31536000, immutable'
    ],
    '/fonts/*': [
        'cache-control: public, max-age=31536000, immutable'
    ],
    '/sw.js': [
        'cache-control: public, max-age=0, must-revalidate'
    ],
    '/**/*.js': [
        'cache-control: public, max-age=31536000, immutable'
    ],
    '/**/*.css': [
        'cache-control: public, max-age=31536000, immutable'
    ]
};
module.exports = {
    siteMetadata: {
        pickup: ["entry514", "entry521"],
        title: `セブ島海外ノマドエンジニアの日記【銀ねこアトリエ】`,
        shortName: `銀ねこアトリエ`,
        blogName: '海外ノマドブログ',
        blogDescription: '資金ゼロからフィリピン・セブ島で起業した海外ノマドエンジニアのブログ。IT業界10年以上でテクニカルディレクター（技術責任者）・エンジニア講師・ブリッジSEを経てLenzTechnologies Inc.を設立し、代表を務める。',
        author: {
            name: `神守 由理子`,
            summary: `資金ゼロからフィリピン・セブ島で起業した海外ノマドエンジニア。IT業界10年以上でテクニカルディレクター（技術責任者）・エンジニア講師・ブリッジSEを経てLenzTechnologies Inc.を設立し、代表を務める。CMS concreteCMSエバンジェリスト。テックブログ以外も「磨耗しない人生」や「海外ノマド」のライフスタイルについて発信。好きなものは肉とハイボール。`,
            company: {
                name: 'Lenz Technolozies Inc.',
                url: 'https://lenz-ph.com',
            },
            jobTitle: ['concreteCMS エバンジェリスト', 'CEO', 'エンジニア講師'],
        },
        description: `セブ島に住む女性フロントエンドエンジニアのライフログ。資金ゼロからフィリピン・セブ島で起業。フロント技術を中心とした「ウェブ制作に関するチップス」、「磨耗しない人生の選択」や「海外ノマド」のライフスタイルについて発信しています。`,
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
                enName: "Web Development",
                summary: "ウェブ制作に関するチップス",
                description: "HTML, CSS, JavaScript, React などフロントエンドを中心とした実務で役に立ったチップス。経験したことを備忘録、ナレッジの保管庫として記事をまとめています。",
            },
            {
                slug: "cms",
                name: "CMS",
                enName: "Contents Management System",
                summary: "WordPressやconcreteCMSなどCMSの記事",
                description: "WordPressやconcreteCMSなど中心とした、CMS全般の記事です。普段はWordPressのカスタマイズを業務で行い、concreteCMSのエバンジェリストとしても情報発信しています。",
            },
            {
                slug: "seo",
                name: "SEO対策・デジタルマーケ",
                enName: "Search Engine Optimization",
                summary: "SEO対策やデジタルマーケティングに関する記事",
                description: "SEO対策やデジタルマーケティングに関するチップスを記事として綴っています。エンジニア視点でのGTMやLookerStudioなどの取り扱いについて実務レベルで行ったことを記録しています。",
            },
            {
                slug: "overseas-freelancing",
                name: "海外ノマド生活",
                enName: "Overseas Freelancer",
                summary: "海外ノマド生活のリアル",
                description: "憧れの海外ノマドはそんなに甘くない！生活を行った本音を赤裸々に綴っています。金ゼロからフィリピン・セブ島で起業した海外ノマドエンジニア。海外生活、たくさん失敗して、サバイブした記録。",
            },
            {
                slug: "career",
                name: "キャリアアップ",
                enName: "Career Up",
                summary: "キャリアアップや勉強したことについて",
                description: "元職業訓練校講師ならではの、転職やキャリアアップについて。シングルマザー、低学歴、低所得から40代でフィリピン・セブ島で起業。人税を逆転させるチップスを経験ベースで綴っています。",
            },
            {
                slug: "ginneko-tsuredure",
                name: "かみーゆ徒然記",
                enName: "My Policy",
                summary: "信念・思いや感じたことを気ままに綴ってます",
                description: "信念・思いや感じたことを気ままに心の赴くままに綴っています。いつも真面目だと疲れるので、ふざけたことや面白かったことも含めて気ままに書いています。4人兄弟、家族との関係等赤裸々に書いています。",
            },
        ],
    },
    plugins: [
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
                id: `GTM-KPH3R92`,
            },
        },
        {
            resolve: `gatsby-plugin-lodash`,
            options: {
                disabledFeatures: [`shorthands`, `cloning`],
            },
        },
        process.env.BRANCH === 'develop' ?
            null : {
                resolve: 'gatsby-plugin-netlify',
                options: {
                    headers: headersConfig,
                    allPageHeaders: [],
                    mergeSecurityHeaders: true,
                    mergeCachingHeaders: true,
                    transformHeaders: (headers, path) => headers,
                    generateMatchPathRewrites: true,
                },
            },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                query: `
                {
                    allSitePage(filter: {
                        path: {
                            nin: ["/404/", "/404.html", "/dev-404-page/", "/contact/thanks/"]
                        }
                    }) {
                        nodes {
                        path
                        }
                    }
                    allMarkdownRemark(filter: {frontmatter: {noindex:{ eq: true }}}) {
                        nodes {
                            fields {
                                slug
                            }
                        }
                    }
                }
                `,
                resolveSiteUrl: ({ site }) => {
                    return 'https://ginneko-atelier.com';
                },
                resolvePages: ({
                    allSitePage: { nodes: allSitePage },
                    allMarkdownRemark: { nodes: allMarkdownRemark },
                }) => {
                    // サイトページを作成
                    const allPages = allSitePage.map(node => ({
                        path: node.path,
                        changefreq: node.path === '/' ? 'daily' : 'weekly',
                        priority: node.path === '/' || node.path.includes('entry') ? 0.7 : 0.3,
                    }));

                    // noindex ページを削除
                    const noindexPages = allMarkdownRemark.map(node => node.fields.slug);
                    const filteredPages = allPages.filter(page => !noindexPages.some(slug => page.path.includes(slug)));

                    return filteredPages;
                },
                serialize: ({ site, path, changefreq, priority }) => {
                    return {
                        url: `${path}`,
                        changefreq: changefreq,
                        priority: priority,
                    }
                },
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

        `gatsby-plugin-styled-components`,

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
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ].filter(Boolean)
}

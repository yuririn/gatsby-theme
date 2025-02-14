import * as React from "react"
import { siteMetadata } from "../../../gatsby-config"
import dateReplace from "../../utils/dateReplace"

const JsonLD = ({ data, location }) => {
    const isRoot = location.pathname === '/' ? true : false
    //タイトルとディスクリプション
    const domain = siteMetadata.siteUrl
    //ページデータ用のページタイプ
    const type = isRoot ? 'WebSite' : 'WebPage';
    const list = data.list

    const allData = [pageData(type, domain), Nav(domain)]
    if (!isRoot) allData.push(breadcrumbListData(domain, list, location))
    if (location.pathname.includes('entry')) allData.push(BlogPosting(data,domain,location))
    return <script type="application/ld+json">{JSON.stringify(allData)}</script>
}
export default JsonLD

// サイトナビゲーション
const Nav = (domain) => {
    //Nav 作成
    const { category, blogName, title } = siteMetadata;
    const cate = category.filter(cate => cate.slug !== 'cms' && cate.slug !== 'seo' && cate.slug !== 'ginneko-tsuredure');

    let siteNavigation = [
        {
            "@type": "WebPage",
            name: "ホーム",
            url: domain
        },
        {
            "@type": "CollectionPage",
            name: blogName,
            url: `${domain}/blogs/`
        }
    ]
    cate.map(item => {
        const cateItem = {
            "@type": "CollectionPage",
            name: item.name,
            url: `${domain}/blogs${item.slug}/`
        }
        siteNavigation.push(cateItem)
    })
    siteNavigation.push({
        "@type": "AboutPage",
        name: "海外ノマドエンジニアかみーゆってどんな人？",
        url: `${domain}/about/`
    })
    siteNavigation.push({
        "@type": "ContactPage",
        name: "お問い合わせ",
        url: `${domain}/contact/`
    })
    siteNavigation = {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        hasPart: siteNavigation
    }
    return siteNavigation
}

//ページの基本データ
const pageData = (type, domain) => {
    const { title, description } = siteMetadata;
    return {
        "@context": "http://schema.org",
        "@type": type,
        inLanguage: "ja",
        url: domain,
        name: title,
        author: auther(domain),
        publisher: publisher(domain),
        image: `${domain}/images/ogp.png`,
        description: description
    }
}

// auther
const auther = (domain) => {
    const { author, shortName } = siteMetadata
    return [
        {
            "@type": "Person",
            name: author.name,
            description: author.summary,
            jobTitle: [author.jobTitle],
            affiliation: [
                {
                    "@type": "Organization",
                    name: author.company.name,
                    url: author.company.url,
                },
                {
                    "@type": "Organization",
                    name: shortName,
                    url: domain,
                }
            ],
            url: domain + '/about/',
            sameAs: [
            ],
            award: [
                '2011年スマートフォンアプリ選手権アプリがいっぱい賞チームで優勝',
            ]
        },
    ]
}

const publisher = (domain) => {
    return {
        "@type": "Organization",
        name: siteMetadata.title,
        description: siteMetadata.description,
        logo: {
            "@type": "ImageObject",
            url: `${domain}/images/icon.png`,
            width: 72,
            height: 72,
        },

    }
}

const breadcrumbListData = (domain, list) => {
    const breadcrumb = [{
        "@type": "ListItem",
        "position": 1,
        item: {
            "@type": "WebSite",
            "@id": domain,
            name: "ホーム"
        }
    }]

    list.map((item, i) => {
        const listItem = {
            "@type": "ListItem",
            position: i + 2,
            item: {
                "@type": item.type,
                "@id": `${domain}${item.path}`,
                name: item.name
            }
        }
        breadcrumb.push(listItem)
    })

    return {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb
    }
}

const BlogPosting = (data, domain, location) => {
    const { title, description, ogp,date, modifieddate } = data
    const blogPosting = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        // url: `${domain}${location.pathname}`,
        name: title,
        headline: title,
        image: {
            "@type": "ImageObject",
            url: ogp
        },
        description: description,
        datePublished: dateReplace(date),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${domain}${location.pathname}`
        },
        author: auther(domain),
        publisher: publisher(domain),
    }
    if (modifieddate) {
        blogPosting.datePublished = dateReplace(modifieddate)
        blogPosting.dateModified = dateReplace(modifieddate)
    }
    return blogPosting
}

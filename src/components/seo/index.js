import React from "react"
import config from "../../../gatsby-config"
import PropTypes from "prop-types"

const Seo = ({data, children}) => {
  const domain = config.siteMetadata.siteUrl
  const isAd = data.type === 'ad' || data.type === 'ad-list' || data.location.pathname === '/choco-blog/' ? true : false
  const isRoot = '/' === data.location.pathname || data.location.pathname === '/choco-blog/' ? true : false

  // const domain = config.siteMetadata.siteUrl
  const siteName = isAd ? config.siteMetadata.ad.title : config.siteMetadata?.title
  const siteDescription = data.description || isAd ? config.siteMetadata.ad.description : config.siteMetadata.description

  const pageInfo = {
    siteInfo: {
      url: domain,
      siteName: siteName,
      siteDescription: siteDescription,
      siteType: !isAd ? 'main' : 'sub',
      logoUrl: `${domain}/images/icon.png`
    },
    type: isRoot ? "WebSite" : "WebPage",
    ogSrc: domain + (data.ogp ? data.ogp : isAd ? "/images/choco-ogp.png" :  "/images/ogp.png"),
    thumbnailSrc: domain + (data.thumbnail ? data.thumbnail :isAd ? "/images/choco-thumnail.png" :  "/images/thumnail.png"),
    metaTitle: isRoot ? siteName : data.title + ' - ' + siteName,
    metaDescription : isRoot ? siteDescription : data.description,
    pageName: data.title,
    url: data.location ? domain + data.location.pathname : domain,
    blogUrl: domain + data.location.pathname,
    template: data.template,
    date: data.date,
    faq: data.faq,
    cateInfo: data.cateId ? { url: `${domain}blogs/${data.cateId}/`, name: config.siteMetadata.category.filter(item => {return item.slug === data.cateId })[0].name} : null,
    tag: data.tag
  }
  if (data.templage === "blog-list" || data.templage === "tag-list" || data.type === "category-list" || data.type === "ad-tag-list") {
    pageInfo.blogUrl = String(pageInfo.blogUrl).replace(/page\/([0-9])+\//, "");
  }

  return (
    <>
      <meta content="noindex" name="robots"/>
      <title>{pageInfo.metaTitle}</title>
      <meta name="google-site-verification" content={`UmyZdMHGMBc6-P4rF4Ajx3AhBNeOKT694ba7WGsI3Wc`}/>
      <meta name="description" content={pageInfo.metaDescription} />
      <meta name="thumbnail" content={pageInfo.thumbnailSrc} />
      <meta property="og:title" content={pageInfo.metaTitle} />
      <meta property="og:description" content={pageInfo.metaDescription} />
      <meta property="og:image" content={pageInfo.ogSrc} />
      <meta property="og:type" content={pageInfo.type} />
      <meta property="og:url" content={pageInfo.blogUrl} />
      <meta name="twitter:card" content={`summary_large_image`} />
      <meta name="twitter:creator" content={config.siteMetadata.social.twitter} />
      <meta name="twitter:title" content={pageInfo.pageName} />
      <meta name="twitter:image" content={pageInfo.ogSrc}/>
      <meta name="twitter:description" content={pageInfo.metaDescription} />
      <script type="application/ld+json">{JSON.stringify(jsonLd(pageInfo))}</script>
    </>
  )
}

Seo.defaultProps = {
  meta: [],
  description: ``,
  title: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

const jsonLd = (data) => {

  const siteInfo = data.siteInfo
  const isMain =  siteInfo.siteType === 'main' ? true : false
  const isRoot =  siteInfo.type === 'WebSite' ? true : false

  // 基本情報
  const publisher = {
    "@type": "Organization",
    name: isMain ?  config.siteMetadata.title : config.siteMetadata.ad.title,
    description: isMain ? config.siteMetadata.description : config.siteMetadata.ad.description,
    logo: {
      "@type": "ImageObject",
      url: siteInfo.logoUrl,
      width: 72,
      height: 72,
    },
  }

  const siteNavigation = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "hasPart": [
      {
        "@type": "WebPage",
        "name": "ホーム",
        "url": siteInfo.url
      },
      {
        "@type": "CollectionPage",
        "name": "ウェブ制作",
        "url": `{${siteInfo.url}/blogs/web-developer/}`
      },
      {
        "@type": "CollectionPage",
        "name": "CMS",
        "url": `{${siteInfo.url}/blogs/cms/}`
      },
      {
        "@type": "CollectionPage",
        "name": "海外ノマド生活",
        "url": `{${siteInfo.url}/blogs/overseas-freelancing/}`
      },
      {
        "@type": "AboutPage",
        "name": "かみーゆってどんな人？",
        "url": `{${siteInfo.url}/about/}`
      },
      {
        "@type": "ContactPage",
        "name": "お問い合わせ",
        "url": `{${siteInfo.url}/contact/}`
      }
    ]
  }

  const author = [
    {
      "@type": "Person",
      name: config.siteMetadata.author.name,
      description: isMain ? config.siteMetadata.author.summary : config.siteMetadata.ad.author.summary,
      jobTitle: ['CEO', 'concreteCMS エバンジェリスト'],
      affiliation: [
        {
          "@type": "Organization",
          name: 'Lenz Technolozies Inc.',
        },
        {
          "@type":"Organization",
          name: isMain ? config.siteMetadata.ad.title : '銀ねこアトリエ',
          url: siteInfo.url,
        }
      ],
      url: siteInfo.url + '/about/',
      sameAs: [
        'https://twitter.com/'+config.siteMetadata.social.twitter,
        'https://www.instagram.com/'+config.siteMetadata.social.instagram,
         config.siteMetadata.social.youtube,
      ],
      award: [
        '2011年スマートフォンアプリ選手権アプリがいっぱい賞チームで優勝',
      ]
    },
  ]

  let jsonLdConfigs = [
    {
      "@context": "http://schema.org",
      "@type": data.type,
      inLanguage: "ja",
      url: data.blogUrl,
      name: data.pageName,
      author,
      publisher,
      image: data.ogSrc,
      description: data.metaDescription,
    },
  ]

  if(isMain) jsonLdConfigs = [...jsonLdConfigs, siteNavigation]

  if ( data.template === "blog-post" || data.template === "ad-post") {
    jsonLdConfigs.push({
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: data.blogUrl,
      name: data.metaTitle,
      headline: data.pageName,
      image: {
        "@type": "ImageObject",
        url: data.ogSrc,
      },
      datePublished: data.date,
      dateModified: data.date,
      description: data.metaDescription,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.blogUrl,
      },
      author,
      publisher,
    })
  }

  if( data.faq ) {
    const faqArry = data.faq
    const faqList = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": []
    }
    faqArry.forEach((item)=>{
      const link = item[2] ? '<br>くわしくは<a href="'+item[2]+'">こちら</a>。' : '';
      const entry = {
        "@type": "Question",
        "name": item[0],
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item[1]+link
        }
      }
      faqList['mainEntity'].push(entry);
    })
    jsonLdConfigs.push(faqList);
  }

  if(!isRoot) {
    let breadCrumbList
    const home = {
      "@type": "ListItem",
      position: 1,
      "item": {
        "@type": "WebSite",
        "@id": isMain ?  siteInfo.url : siteInfo.url+ '/choco-blog/',
         name: isMain ?  "ホーム" : siteInfo.siteName,
      }
    }
    const blogList = {
      "@type": "ListItem",
      position: 2,
      "item": {
        "@type": "WebPage",
        "@id": `${siteInfo.url}/blogs/`,
        name: `ノマドブログ`,
      }
    }
    const cateList = data.cateInfo ?{
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "WebPage",
        "@id":  `${data.cateInfo.url}`,
        "name": `${data.cateInfo.name}`,
      }
    }:{}
    const tagList = {
      "@type": "ListItem",
      position: 3,
      "item": {
        "@type": "WebPage",
        "@id": `${siteInfo.url}/tags/${data.tag}`,
        name: data.tag,
      }
    }
    switch (true) {
      case data.template === "genre-list" ||  data.template === "tag-list":
        breadCrumbList = [
          home,
          blogList,
          {
            "@type": "ListItem",
            position:  3,
            "item": {
              "@type": "WebPage",
              "@id":  data.blogUrl,
              "name": data.pageName
            }
          },
        ]
        break;

      case data.template === "blog-post" ||  data.template === "ad-blog-post":
        const num = isMain ? 4 : 3
        breadCrumbList = [
          home,
          cateList,
          tagList,
          {
            "@type": "ListItem",
            "position": num,
            "item": {
              "@type": "BlogPosting",
              "@id":  data.blogUrl,
              "name": data.pageName
            }
          },
        ]
        break;
      default:
        const children = data.template === "blog-list" ?
          blogList : {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebPage",
            "@id":  data.blogUrl,
            "name": data.pageName
          }
        }
        breadCrumbList = [home, children]
        break;
    }
    jsonLdConfigs = [
      ...jsonLdConfigs,
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadCrumbList,
      },
    ]
  }
  return jsonLdConfigs
}

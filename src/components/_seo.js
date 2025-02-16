/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import config from "../../gatsby-config"

const Seo = ({data, children}) => {
  const domain = config.siteMetadata.siteUrl
  const isAd = data.type === 'ad' || data.type === 'ad-list' || data.location.pathname === '/choco-blog/' ? true : false
  const metaDescription = data.description || isAd ? config.siteMetadata.ad.description : config.siteMetadata.description
  const defaultTitle = isAd ? config.siteMetadata.ad.title : config.siteMetadata?.title

  const noindex = data.noindex ? data.noindex : false;

  let blogUrl = data.location ? domain + data.location.pathname : domain
  const isRoot = '/' === data.location.pathname || data.location.pathname === '/choco-blog/' ? true : false
  let page = isRoot ? "WebSite" : "WebPage"
  const pageType = isRoot ? "webSite" : "article"
  const ogSrc = domain + (data.ogp ? data.ogp : isAd ? "/images/choco-ogp.png" :  "/images/ogp.png")
  const thumbnailSrc = domain + (data.thumnail ? data.thumnail :isAd ? "/images/choco-thumnail.png" :  "/images/thumnail.png")
  // const cate = config.siteMetadata.category.filter(cat => cat.name === title)
  let pageName = isRoot ? defaultTitle : `${data.title} - ${defaultTitle}`


  if(data.type === "tags" || data.type === "genre" ||  data.type === "ad-list") {
    pageName = `${data.title} - 記事一覧 - ${defaultTitle}`
  } else if (data.type === "blog") {
    pageName = `${data.title}`
  }
  const canonicalUrl = blogUrl;

  if (data.type === "blogs" || data.type === "tags" || data.type === "genre" || data.type === "ad-list") {
    blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "");
  }

  const cateInfo =  data.cateId ? { url:`/blogs/${data.cateId}/`, name:config.siteMetadata.category.filter(item => {return item.slug === data.cateId })[0].name}:''

  const publisher = {
    "@type": "Organization",
    name: isAd ? config.siteMetadata.ad.title :config.siteMetadata.title,
    description: isAd ? config.siteMetadata.ad.description :config.siteMetadata.description,
    logo: {
      "@type": "ImageObject",
      url: `${domain}/images/icon.png`,
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
        "url": domain
      },
      {
        "@type": "CollectionPage",
        "name": "ウェブ制作",
        "url": `{${domain}/blogs/web-developer/}`
      },
      {
        "@type": "CollectionPage",
        "name": "CMS",
        "url": `{${domain}/blogs/cms/}`
      },
      {
        "@type": "CollectionPage",
        "name": "海外ノマド生活",
        "url": `{${domain}/blogs/overseas-freelancing/}`
      },
      {
        "@type": "AboutPage",
        "name": "かみーゆってどんな人？",
        "url": `{${domain}/about/}`
      },
      {
        "@type": "ContactPage",
        "name": "お問い合わせ",
        "url": `{${domain}/contact/}`
      }
    ]
  }
  const author = [
    {
      "@type": "Person",
      name: config.siteMetadata.author.name,
      description: isAd ? config.siteMetadata.ad.author.summary : config.siteMetadata.author.summary,
      jobTitle: ['CEO', 'concreteCMS エバンジェリスト'],
      affiliation: [
        {
          "@type": "Organization",
          name: 'Lenz Technolozies Inc.',
        },
        {
          "@type":"Organization",
          name: isAd ? config.siteMetadata.ad.title : '銀ねこアトリエ',
          url: domain,
        }
      ],
      url: domain+'/about/',
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
  // JSON+LDの設定
  let jsonLdConfigs = [
    {
      "@context": "http://schema.org",
      "@type": page,
      inLanguage: "ja",
      url: blogUrl,
      name: pageName,
      author,
      publisher,
      image: ogSrc,
      description: metaDescription,
    },

  ]
  if(!isAd) jsonLdConfigs = [...jsonLdConfigs,siteNavigation]

  if ( data.type === "blog" || data.type === "ad") {
    //   console.log(data.modified);
    jsonLdConfigs.push({
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: blogUrl,
      name: pageName,
      headline: data.title,
      image: {
        "@type": "ImageObject",
        url: ogSrc,
      },
      description: data.description ? data.description : metaDescription,
      datePublished: data.modified ? data.modified.replace(/\./g, "-") :  data.date.replace(/\./g, "-"),
      dateModified: data.modified ? data.modified.replace(/\./g, "-") : "",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogUrl,
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
      const link = item[2]?'<br>くわしくは<a href="'+item[2]+'">こちら</a>。':'';
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

  if (!isRoot) {
    let breadCrumbList
    const home = {
      "@type": "ListItem",
      position: 1,
      "item": {
        "@type": "WebSite",
        "@id": isAd ? domain+ '/choco-blog/' : domain,
         name: isAd ? defaultTitle :"ホーム",
      }
    }
    const blogList = {
      "@type": "ListItem",
      position: 2,
      "item": {
        "@type": "WebPage",
        "@id": `${domain}/blogs/`,
        name: `ノマドブログ`,
      }
    }
    const tagList = {
      "@type": "ListItem",
      position: 3,
      "item": {
        "@type": "WebPage",
        "@id": `${domain}/tags/${data.tag}`,
        name: data.tag,
      }
    }
    const cateList = {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "WebPage",
        "@id":  `${domain}${cateInfo.url}`,
        "name": `${cateInfo.name}`,
      }
    }
    if ( data.type === "genre-list" ||  data.type === "tag-list") {
      breadCrumbList = [
        home,
        blogList,
        {
          "@type": "ListItem",
          position:  3,
          "item": {
            "@type": "WebPage",
            "@id":  blogUrl,
            "name": data.title
          }
        },
      ]
    }
    else if ( data.type === "blog") {
      breadCrumbList = [
        home,
        cateList,
        tagList,
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "BlogPosting",
            "@id":  blogUrl,
            "name": data.title
          }
        },
      ]
    } else if ( data.type === "blog-list") {
      breadCrumbList = [home, blogList]
    } else if ( data.type === "ad") {
        let tagList = []
        let num = 1;
        if(data.tags.length !== 0){
          data.tags.forEach( (item) => {
            num++;
            const listItem = {
              "@type": "ListItem",
              position:  num,
              "item": {
                "@type": "WebPage",
                "@id":  item,
                "name": `choco-blog/tags/${item}`
              }
            }
            tagList = [...tagList, listItem]

          })
        }
        breadCrumbList = [home, ...tagList, {
            "@type": "ListItem",
            "position": num+1,
            "item": {
              "@type": "BlogPosting",
              "@id":  blogUrl,
              "name": data.title
            }
          }]
      } else {
      breadCrumbList = [
        home,
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebPage",
            "@id":  blogUrl,
            "name": data.title
          }
        },
      ]
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

  if( typeof window !== "undefined") {
    let lazyloadads = false;
    window.addEventListener("scroll", function() {
     if ((document.documentElement.scrollTop !== 0 && lazyloadads === false) || (document.body.scrollTop !== 0 && lazyloadads === false)) {
        (function() {
            const ad = document.createElement('script');
            ad.setAttribute('data-ad-client', "ca-pub-2820767970621854")
            ad.async = true;
            ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            const sc = document.getElementsByTagName('script')[0];
            sc.parentNode.insertBefore(ad, sc);
        })();
        lazyloadads = true;
    }
  }, true)
  }

  return (
    <>
    <title>{pageName}</title>
    <meta name="description" content={data.description ? data.description : metaDescription} />
    <meta name="thumbnail" content={thumbnailSrc} />
    <meta  property="og:title" content={pageName} />
    <meta  property="og:description" content={data.description ? data.description : metaDescription} />
    <meta property="og:image" content={ogSrc} />
    <meta name="google-site-verification" content={`UmyZdMHGMBc6-P4rF4Ajx3AhBNeOKT694ba7WGsI3Wc`}/>
    <meta  property="og:type" content={pageType} />
    <meta  property="og:url" content={blogUrl} />
    <meta name="twitter:card" content={`summary_large_image`} />
    <meta name="twitter:creator" content={config.siteMetadata?.social?.twitter || ``} />
    <meta name="twitter:title" content={pageName} />
    <meta name="twitter:image" content={ogSrc} />
    <meta name="twitter:description" content={data.description ? data.description : metaDescription} />
    {(noindex||data.location === '404')&&<meta content="noindex" name="robots"/>}
     {(!noindex && data.location !== '404')&&<link rel="canonical" href={canonicalUrl}></link>}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdConfigs)}
      </script>
      {children}
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

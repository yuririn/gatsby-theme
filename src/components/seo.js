/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import config from "../../gatsby-config"

const Seo = ({lang, meta, data}) => {
  const domain = config.siteMetadata.siteUrl
  const metaDescription = data.description || config.siteMetadata.description
  const defaultTitle = config.siteMetadata?.title

  let blogUrl = data.location ? data.location.href : domain
  const isRoot = '/' === data.location.pathname ? true : false
  let page = isRoot ? "WebSite" : "WebPage"
  const pagetype = isRoot ? "webSite" : "article"
  const ogSrc = domain + (data.ogp ? data.ogp : "/images/ogp.png")
  const thumbnailSrc = domain + (data.thumnail ? data.thumnail : "/images/thumnail.png")
  // const cate = config.siteMetadata.category.filter(cat => cat.name === title)
  let pageName = isRoot ? defaultTitle : `${data.title} - ${defaultTitle}`

  if(data.type === "tags" || data.type === "genre") {
    pageName = `${data.title} - 記事一覧 - ${defaultTitle}`
  } else if (data.type === "blog") {
    pageName = `${data.title}`
  }
  const canonicalUrl = blogUrl;
  if (data.type === "blogs" || data.type === "tags" || data.type === "genre") {
    blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "");
  }
  const cateInfo =  data.cateId ? { url:`/blogs/${data.cateId}/`, name:config.siteMetadata.category.filter(item => {return item.slug === data.cateId })[0].name}:''
  const noindex = [`/blogs/entry309/`,
                  `/blogs/entry276/`,
                  `/blogs/entry208/`,
                  `/blogs/entry483/`,
                  `/blogs/entry485/`,
                  `/blogs/entry338/`,
                  `/blogs/entry457/`,
                  `/blogs/entry424/`,
                  `/blogs/entry511/`,
                  `/blogs/entry471/`,
                  `/blogs/entry365/`,
                  `/blogs/entry355/`,
                  `/blogs/entry274/`,
                  `/blogs/entry272/`,
                  `/blogs/entry195/`,
                  `/blogs/entry204/`]

  const publisher = {
    "@type": "Organization",
    name: config.siteMetadata.title,
    description: config.siteMetadata.description,
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
        "@type": "CollectionPage",
        "name": "ABOUT ME",
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
      description: config.siteMetadata.author.summary,
      jobTitle: ['CEO', 'concreteCMS エバンジェリスト'],
      affiliation: [
        {
          "@type": "Organization",
          name: 'Lenz Technolozies Inc.',
        },
        {
          "@type":"Organization",
          name: '銀ねこアトリエ',
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
    siteNavigation
  ]

  if ( data.type === "blog") {
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
      description: metaDescription,
      datePublished: data.date.replace(/\./g, "-"),
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
        "@id": domain,
         name: "ホーム",
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
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageName}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `thumbnail`,
          content: thumbnailSrc,
        },
        {
          property: `og:title`,
          content: pageName,
        },
        {
          property: `og:image`,
          content: ogSrc,
        },
        {
          name: `google-site-verification`,
          content: `UmyZdMHGMBc6-P4rF4Ajx3AhBNeOKT694ba7WGsI3Wc`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: pagetype,
        },
        {
          property: `og:url`,
          content: blogUrl,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },

        {
          name: `twitter:creator`,
          content: config.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: pageName,
        },
        {
          property: `twitter:image`,
          content: ogSrc,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {noindex.includes(data.location.pathname)&&<meta content="noindex" name="robots"/>}
      <link rel="canonical" href={canonicalUrl}></link>
      <script type="application/ld+json">
        {JSON.stringify(jsonLdConfigs)}
      </script>
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
  title: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

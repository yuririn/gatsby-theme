/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import config from "../../gatsby-config"

const Seo = ({
  description,
  lang,
  meta,
  title,
  ogp,
  location,
  modified,
  date,
  cateId = '',
  tag = '',
  type,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )
  const domain = config.siteMetadata.siteUrl
  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  let blogUrl = location ? location.href : domain
  const isRoot = `${domain}/` === blogUrl ? true : false
  let page = isRoot ? "WebSite" : "WebPage"
  const pagetype = isRoot ? "webSite" : "article"
  const ogSrc = domain + (ogp ? ogp : "/images/ogp.png")
  // const cate = config.siteMetadata.category.filter(cat => cat.name === title)
  let pageName = `${title}-${defaultTitle}`
  if(type === "tags" || type === "genre") {
    pageName = `${title}-記事一覧-${defaultTitle}`
  } else if (type === "blog") {
    pageName = title
  } else if (isRoot) {
    pageName = `${defaultTitle}`
  }
  let portfolio = false
  if (location) {
    portfolio = location.pathname === "/portfolio/" ? true : false
  }
  const canonicalUrl = blogUrl;
  if (type === "blogs" || type === "tags" || type === "genre") {
    blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")
  }
  const cateInfo = cateId!==""?{ url:`/blogs/${cateId}/`, name:config.siteMetadata.category.filter(item => {return item.slug === cateId })[0].name}:''
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

  const author = [
    {
      "@type": "Person",
      name: config.siteMetadata.author.name,
      description: config.siteMetadata.author.summary,
      url: domain,
      sameAs: [
        config.siteMetadata.social.twitter,
        config.siteMetadata.social.instagram,
      ],
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

  if (type === "blog") {
    jsonLdConfigs.push({
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: blogUrl,
      name: pageName,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: ogSrc,
      },
      description: metaDescription,
      datePublished: date.replace(/\./g, "-"),
      dateModified: modified ? modified.replace(/\./g, "-") : "",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogUrl,
      },
      author,
      publisher,
    })
  }
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
    {
    "@type": "Question",
    "name": "コーダーになるためにはどうすれば良いですか？",
    "acceptedAnswer": {
    "@type": "Answer",
    "text": "コーダーはスピード命。早くコーディングするために、ショートカットは必須。ひたすらコードを書きましょう。"
    }
    },
    {
    "@type": "Question",
    "name": "IT業界は進歩が早くてついていくのが大変ではないですか？",
    "acceptedAnswer": {
    "@type": "Answer",
    "text": "はい、大変です。置いて行かれないよう、情報収集は欠かしません。学ぶことをやめたら泳ぐのをやめたマグロと一緒です。"
    }
    },
    {
    "@type": "Question",
    "name": "かみーゆさんの好きな食べ物はなんですか？",
    "acceptedAnswer": {
    "@type": "Answer",
    "text": "肉とビールです。肉があればビールが3杯は飲めます。"
    }
    }
    ]
  }

  if (!isRoot) {
    let breadCrumbList
    const home = {
      "@type": "ListItem",
      position: 1,
      item: domain,
      name: "ホーム",
    }
    const blogList = {
      "@type": "ListItem",
      position: 2,
      item: `${domain}/blogs/`,
      name: `ノマドブログ`,
    }
    const tagList = {
      "@type": "ListItem",
      position: 3,
      item: `${domain}/tags/${tag}`,
      name: tag,
    }
    const cateList = {
      "@type": "ListItem",
      position: 2,
      item: `${domain}${cateInfo.url}`,
      name: `${cateInfo.name}`,
    }
    if (type === "genre-list" || type === "tag-list") {
      breadCrumbList = [
        home,
        blogList,
        {
          "@type": "ListItem",
          position:  3,
          item: blogUrl,
          name: title,
        },
      ]
    }
    else if (type === "blog") {
      breadCrumbList = [
        home,
        cateList,
        tagList,
        {
          "@type": "ListItem",
          position: 4,
          item: blogUrl,
          name: title,
        },
      ]
    } else if (type === "blog-list") {
      breadCrumbList = [home, blogList]
    } else {
      breadCrumbList = [
        home,
        {
          "@type": "ListItem",
          position: 2,
          item: blogUrl,
          name: title,
        },
      ]
    }

    jsonLdConfigs = [
      ...jsonLdConfigs,
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadCrumbList,
      },
    ]
  }
  if (portfolio) {
    jsonLdConfigs = [
      ...jsonLdConfigs,
      faq
    ]
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageName}
      // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `thumbnail`,
          content: ogSrc,
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
          content: site.siteMetadata?.social?.twitter || ``,
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
      {noindex.includes(location.pathname)&&<meta content="noindex" name="robots"/>}
      <link rel="canonical" href={canonicalUrl}></link>
      {portfolio ? (
        <link
          href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap"
          rel="stylesheet"
        ></link>
      ) : (
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;700&display=swap"
          rel="stylesheet"
        ></link>
      )}
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
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

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
  const pagetype = isRoot ? "webSite" : "webPage"
  const ogSrc = domain + (ogp ? ogp : "/images/ogp.png")
  const cate = config.siteMetadata.category.filter(cat => cat.name === title)
  let pageName =
    type === "tags" || type === "genre"
      ? `${title}|記事一覧|${defaultTitle}`
      : isRoot
      ? `${defaultTitle}|${title}`
      : `${title}|${defaultTitle}`
  let portfolio = false
  if (location) {
    portfolio = location.pathname === "/portfolio/" ? true : false
  }
  if (type === "blogs" || type === "tags" || type === "genre") {
    blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")
  }

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
  const jsonLdConfigs = [
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

  if (!isRoot) {
    const breadCrumbList = []
    breadCrumbList.push({
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": domain,
        name: "ホーム",
      },
    })
    if (type === "archive") {
      breadCrumbList.push({
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${domain}/blogs/`,
          name: `ブログ一覧`,
        },
      })
    }
    if (type === "genre") {
      breadCrumbList.push({
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${domain}/blogs/`,
          name: `${title}一覧`,
        },
      })
      breadCrumbList.push({
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${domain}/blogs/${cate[0].slug}/`,
          name: title,
        },
      })
    }
    if (type === "tags") {
      breadCrumbList.push({
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${domain}/blogs/`,
          name: `${title}の記事一覧`,
        },
      })
      breadCrumbList.push({
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${domain}/blogs/${encodeURI(title)}/`,
          name: title,
        },
      })
    } else {
      breadCrumbList.push({
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": blogUrl,
          name: title,
        },
      })
    }

    jsonLdConfigs.push({
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadCrumbList,
    })
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
      <link rel="canonical" href={blogUrl}></link>
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

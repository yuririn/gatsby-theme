/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
// import PropTypes from "prop-types"
import { siteMetadata } from "../../../gatsby-config"
import JsonLD from "./JsonLD"

const Seo = ({ data, location }) => {
    const { title, description, template, ogp, thumbnail, noindex } = data
    const { siteUrl } = siteMetadata
    const isRoot = location.pathname === '/' ? true : false
    //タイトルとディスクリプション
    let pageTitle = isRoot ? siteMetadata.title : `${title} - ${siteMetadata.title}`
    let pageDescription = isRoot ? siteMetadata.description : description
    const ogpImageSrc = ogp !== undefined ? `${siteUrl}${ogp}` :`${siteUrl}/images/ogp.png`
    
    const thumbnailImageSrc = thumbnail !== undefined ? `${siteUrl}${thumbnail}` :`${siteUrl}/images/thumbnail.png`

    //404の場合はNoindex
    if(data.is404) {
        return (
            <>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="robots" content="noindex" />
                <link href={`/${template + '-' || 'blog-'}style.css`} rel="stylesheet" />
            </>
        )
    }

    return (
        <>
            {/* Basic SEO Setting */}
            <title>{pageTitle}</title>
            <link rel="preload" href={`/${template + '-' || 'blog-'}style.css`} as="style" />
            <link href={`/${template + '-' || 'blog-'}style.css`} rel="stylesheet" />
            <meta name="description" content={pageDescription} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content={isRoot ? `website` : `webpage`} />
            {/* 画像系 */}
            <meta property="og:image" content={ogpImageSrc} />
            <meta name="thumbnail" content={thumbnailImageSrc} />
            <JsonLD data={data} location={location}></JsonLD>
            {/* X setting */}
            <meta name="twitter:card" content="summary" />
            <link rel="canonical" href={`${siteUrl}${location.pathname}`} />
            <meta
                name="twitter:creator"
                content={siteMetadata?.social?.twitter || ``}
            />
            {noindex && (<meta name="robots" content="noindex" />)}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
        </>
    )
}

export default Seo

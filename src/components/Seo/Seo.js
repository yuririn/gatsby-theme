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
    const { title, description, template } = data
    const isRoot = location.pathname === '/' ? true : false
    //タイトルとディスクリプション
    let pageTitle = isRoot ? siteMetadata.title : `${title} - ${siteMetadata.title}`
    let pageDescription = isRoot ? siteMetadata.description : description

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
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content={isRoot ? `website` : `webpage`} />
            <meta name="twitter:card" content="summary" />
            <meta
                name="twitter:creator"
                content={siteMetadata?.social?.twitter || ``}
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href={`/${template + '-' || 'blog-'}style.css`} rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <JsonLD data={data} location={location}></JsonLD>
        </>
    )
}

export default Seo

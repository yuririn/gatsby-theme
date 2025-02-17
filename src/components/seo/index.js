/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useEffect } from 'react'
// import PropTypes from "prop-types"
import { siteMetadata } from "../../../gatsby-config"
import JsonLD from "./jsonld"

const Seo = ({ data, location }) => {
    const { title, description, template, ogp, thumbnail, noindex } = data
    const { siteUrl } = siteMetadata
    const isRoot = location === '/' || location === '/choco-blog/' ? true : false
    //タイトルとディスクリプション
    let pageTitle = isRoot ? siteMetadata.title : `${title} - ${siteMetadata.title}`
    let pageDescription = isRoot ? siteMetadata.description : description
    const ogpImageSrc = ogp !== undefined ? `${siteUrl}${ogp}` : `${siteUrl}/images/ogp.png`

    const thumbnailImageSrc = thumbnail !== undefined ? `${siteUrl}${thumbnail}` : `${siteUrl}/images/thumbnail.png`

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let lazyloadads = false;

            const handleScroll = () => {
                if (
                    (document.documentElement.scrollTop !== 0 && lazyloadads === false) ||
                    (document.body.scrollTop !== 0 && lazyloadads === false)
                ) {
                    const ad = document.createElement('script');
                    ad.setAttribute('data-ad-client', 'ca-pub-2820767970621854');
                    ad.async = true;
                    ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                    const sc = document.getElementsByTagName('script')[0];
                    sc.parentNode.insertBefore(ad, sc);

                    lazyloadads = true;
                }
            };

            window.addEventListener('scroll', handleScroll, true);

            return () => {
                window.removeEventListener('scroll', handleScroll, true);
            };
        }
    }, []);

    //404の場合はNoindex
    if (data.is404) {
        return (
            <>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="robots" content="noindex" />
                {/* <link href={`/${template + '-' || 'blog-'}style.css`} rel="stylesheet" /> */}
            </>
        )
    }
    const isDev = process.env.NODE_ENV === 'development';
    console.log(`isDev: ${isDev}`, process.env.NODE_ENV)
    return (
        <>
            {isDev && <meta name="robots" content="noindex, nofollow" />}
            {/* Basic SEO Setting */}
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content={isRoot ? `website` : `webpage`} />
            <meta name="google-site-verification" content="UmyZdMHGMBc6-P4rF4Ajx3AhBNeOKT694ba7WGsI3Wc" />
            {/* 画像系 */}
            <meta property="og:image" content={ogpImageSrc} />
            <meta name="thumbnail" content={thumbnailImageSrc} />
            <JsonLD data={data} location={location} isRoot={isRoot}></JsonLD>
            {/* X setting */}
            <meta name="twitter:card" content="summary" />
            <link rel="canonical" href={`${siteUrl}${location}`} />
            <meta
                name="twitter:creator"
                content={siteMetadata?.social?.twitter || ``}
                />
            {noindex && (<meta name="robots" content="noindex" />)}
            {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" /> */}
            {/* <link rel="preload" href={`/${template + '-' || 'blog-'}style.css`} as="style" /> */}
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
        </>
    )
}

export default Seo

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

/**
 * 
 * @param {Object} data ページ情報
 * @param {Object} location　ページスラッグ
 * @returns ヘッド内二出力するSEO情報
 */
const Seo = ({ data, location }) => {
    // localStorage.removeItem("authenticated");
    const isDev = process.env.NODE_ENV === 'development';
    console.log(`isDev: ${isDev}`, process.env.NODE_ENV)
  const { title, description, template, ogp, thumbnail, noindex, headerType } = data
    const { siteUrl } = siteMetadata
    const isRoot = location === '/' ? true : false
    //タイトルとディスクリプション
    let pageTitle = isRoot ? siteMetadata.title : `${title} - ${siteMetadata.title}`
    let pageDescription = isRoot ? siteMetadata.description : description
    const ogpImageSrc = ogp !== undefined ? `${siteUrl}${ogp}` : `${siteUrl}/images/ogp.png`

    const thumbnailImageSrc = thumbnail !== undefined ? `${siteUrl}${thumbnail}` : `${siteUrl}/images/thumbnail.png`

    useEffect(() => {
        if (isDev && typeof window !== "undefined") {
            checkAuthenticationAndRedirect(location);
        }

        if (typeof window !== 'undefined') {
            setupLazyLoadAds();
        }
    }, []);

    //404の場合はNoindex
    if (data.is404) {
        return (
            <>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="robots" content="noindex, nofollow" />
                {/* {<link href={`/${template + '-' || 'blog-'}style.css`} rel="stylesheet" />} */}
            </>
        )
    }
    
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
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            {headerType && (
              <PreloadLink type={headerType}/>
            )}
            {template &&
                (<>
                <link rel="stylesheet" href={`/${template + '-'}style.css`} />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" type='text/css'/>
                    <link rel="preload" href={`/${template}style.css`} as="style" />
                </>)
            }
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
        </>
    )
}

// 認証情報の有効期限を確認し、リダイレクトを行う関数
const checkAuthenticationAndRedirect = (locationPath) => {
    const checkAuthenticationExpiry = () => {
        const authData = JSON.parse(localStorage.getItem("authenticated"));
        if (authData) {
            const currentTime = new Date().getTime();
            const expiryTime = 24 * 60 * 60 * 1000; // 24時間 (ミリ秒)
            if (currentTime - authData.timestamp > expiryTime) {
                localStorage.removeItem("authenticated");
                return false; // 認証情報が期限切れ
            }
            return true; // 認証情報が有効
        }
        return false; // 認証情報が存在しない
    };

    const isAuthenticated = checkAuthenticationExpiry();
    const isOnLoginPage = locationPath === '/login/';

    if (!isAuthenticated && !isOnLoginPage) {
        window.location.href = "/login/";
    }

    if (isAuthenticated && isOnLoginPage) {
        window.location.href = "/";
    }
};

// 広告の遅延読み込みを設定する関数
const setupLazyLoadAds = () => {
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
};
export default Seo

const PreloadLink = ({ type }) => {
  return (
    <>
      {/* スマホ向けの 1x 画像 */}
      <link
        rel="preload"
        href={`/images/genre-${type}-sp@1x.webp`}
        as="image"
        media="(max-width: 768px) and (-webkit-min-device-pixel-ratio: 1), (max-width: 768px) and (min-resolution: 96dpi)"
      />
      {/* スマホ向けの 2x 画像 */}
      <link
        rel="preload"
        href={`/images/genre-${type}-sp@2x.webp`}
        as="image"
        media="(max-width: 768px) and (-webkit-min-device-pixel-ratio: 2), (max-width: 768px) and (min-resolution: 192dpi)"
      />
      {/* デスクトップ向けの画像 */}
      <link
        rel="preload"
        href={`/images/genre-${type}.webp`}
        as="image"
        media="(min-width: 769px)"
      />
    </>
  );
};

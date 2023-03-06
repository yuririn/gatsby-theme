import React from "react"
import config from "../../gatsby-config"
import PropTypes from "prop-types"

const Seo = ({data, children}) => {
  const isAd = data.type === 'ad' || data.type === 'ad-list' || data.location.pathname === '/choco-blog/' ? true : false
  const isRoot = '/' === data.location.pathname || data.location.pathname === '/choco-blog/' ? true : false

  // const domain = config.siteMetadata.siteUrl
  const siteName = isAd ? config.siteMetadata.ad.title : config.siteMetadata?.title
  const siteDescription = data.description || isAd ? config.siteMetadata.ad.description : config.siteMetadata.description
  const metaTitle = isRoot ? siteName : data.title + ' - ' + siteName
  const metaDescription = isRoot ? siteDescription : data.description
  return (
    <>
      <meta content="noindex" name="robots"/>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
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

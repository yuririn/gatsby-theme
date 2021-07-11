var plugins = [{
      name: 'gatsby-plugin-google-tagmanager',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"includeInDevelopment":false,"defaultDataLayer":null,"routeChangeEventName":"gatsby-route-change","enableWebVitalsTracking":false},
    },{
      name: 'gatsby-plugin-fontawesome-css',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-fontawesome-css/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-image',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-image/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-remark-autolink-headers',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"icon":false,"maintainCase":false,"offsetY":0,"className":"anchor"},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"銀ねこアトリエ","short_name":"GatsbyJS","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"content/assets/common/icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"be4f1179516a65b7db51092dad1846ce"},
    },{
      name: 'gatsby-plugin-styled-components',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"topLevelImportPaths":[],"pure":false},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-sitemap',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","exclude":["/blogs/page/*","/blogs/tags/*/page/*","/blogs/*/page/*","/contact/thanks/"]},
    },{
      name: 'gatsby-plugin-feed',
      plugin: require('/Users/kamile/Documents/sourcetree/gatsby-theme/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                site {\n                  siteMetadata {\n                    title\n                    siteUrl\n                  }\n                }\n                allFile(\n                  filter: {\n                    sourceInstanceName: { eq: \"assets\" }\n                  }\n                ) {\n                  edges {\n                    node {\n                      name\n                      relativePath\n                      childImageSharp {\n                        sizes {\n                          src\n                        }\n                      }\n                    }\n                  }\n                }\n                allMarkdownRemark(\n                  limit: 20\n                  sort: { order: DESC, fields: [frontmatter___date] }\n                  filter: { frontmatter: { pagetype: { eq: \"blog\" } } }\n                ) {\n                  edges {\n                    node {\n                      html\n                      fields {\n                        slug\n                      }\n                      frontmatter {\n                        title\n                        description\n                        date\n                        hero\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/rss.xml","title":"銀ねこアトリエ RSS Feed","feed_url":"https://ginneko-atelier.com/rss.xml"}]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}

import Root from "./gatsby-root"

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "ja" })
}

export const wrapRootElement = Root


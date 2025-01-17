import React from "react"
import { MDXProvider } from "@mdx-js/react"

import Code from "./src/components/blog/code" //カスタムコンポーネント

const BasicComponents = {
  pre: ({ children }) => {
    const child = children.props
    if (children.type === "code") {
      const props = child.className ? child.className.replace('language-','') : ''
      const language = props.includes(':'||'{') ? props.replace(/(.*?)(\{.+\}|:).*/,`$1`) : props
      const title =  props.replace(/(.+)title=(.*)/,`$2`)
      // const  highlight = props.includes('{'|| '}') ? props.replace(/.*\{(.*)\}.*/,`$1`): ''
      return (
        <Code
          codeString={child.children.trim()}
          language={language}
          title={title}
          // highlight={highlight}
        />
      )
    } else return null
  },
}
const Root = ({ element }) => {
  return (
    <MDXProvider components={{ ...BasicComponents }}>
      {element}
    </MDXProvider>
  )
}

export default Root

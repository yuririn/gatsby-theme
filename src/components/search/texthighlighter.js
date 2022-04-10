import React from "react"

const TextHighlighter = props => {
  const { str, includes } = props
  const temp = str.toLowerCase()
  const start = temp.indexOf(includes.toLowerCase())
  const end = start + includes.length
  const item = str.slice(start, end)
  const res = str.replace(
    item,
    `<span style="background: linear-gradient(to top, yellow 30%,transparent 30%); color: var(--color-accent)">${item}</span>`
  )
  return <span dangerouslySetInnerHTML={{ __html: res }} />
}

export default TextHighlighter

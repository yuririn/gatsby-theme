import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Img = ({ source, title, className, size }) => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              relativePath
              childImageSharp {
                resize(width: 254, height: 190, toFormat: WEBP, quality: 30, webpQuality: 30) {
                  src
                }
              }
            }
          }
        }
      }
    `
  )
  title = title ? title : ""
  let resource = source ? source : "common/dummy.png"

  let img = allFile.edges.find(img => img.node.relativePath === resource)
  if (img) {
    return (
      <img src={img.node.childImageSharp.resize.src} alt={title} width="254" height="190" loading="lazy" decoding="async">
      </img>
    )
  } else {
    return ""
  }
}
export default Img

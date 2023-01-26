import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Thumbnail = ({ source}) => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 100 }
                  width: 120
                  height: 120
                  quality: 50
                  placeholder: BLURRED
                )
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
      <meta />
    )
  } else {
    return ""
  }
}
export default Thumbnail

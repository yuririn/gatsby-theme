import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ThumbnailSm = ({ source}) => {
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
                  width: 165
                  quality: 30
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

  if (img) {
    return (
      <GatsbyImage
        image={getImage(img.node.childImageSharp.gatsbyImageData)}
        alt={title}
        key={title}
        className={className}
      />
    )
  } else {
    return ""
  }
}
export default ThumbnailSm

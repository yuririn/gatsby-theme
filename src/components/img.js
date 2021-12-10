import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Img = ({ source, title, className, size }) => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              name
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 1200 }
                  width: 1200
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
  let resource =
    source.split("/").length > 1
      ? source.split("/")[source.split("/").length - 1]
      : source
  resource = resource.split(".").length > 1 ? resource.split(".")[0] : resource

  let img = allFile.edges.filter(img => img.node.name === resource)
  if (img[0]) {
    return (
      <GatsbyImage
        image={getImage(img[0].node.childImageSharp.gatsbyImageData)}
        alt={title}
        key={title}
        className={className}
      />
    )
  } else {
    return (
      <GatsbyImage
        image={getImage("dummy.png")}
        alt={title}
        key={title}
        className={className}
      />
    )
  }
}
export default Img

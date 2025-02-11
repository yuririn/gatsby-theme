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
              relativePath
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 100 }
                  width: 640
                  quality: 60
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
export default Img

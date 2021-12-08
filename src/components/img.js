import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

const Img = ({ source, title, className }) => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              name
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 100 }
                  width: 600
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
  let img = allFile.edges.map(img => {
    let resource =
      source.split("/").length > 1
        ? source.split("/")[source.split("/").length - 1]
        : source
    resource =
      resource.split(".").length > 1 ? resource.split(".")[0] : resource
    if (img.node.name === resource) {
      return (
        <GatsbyImage
          image={getImage(img.node.childImageSharp)}
          alt={title}
          key={title}
          className={className}
        />
      )
    }
  })
  if (img) {
    return img
  } else {
    return (
      <StaticImage
        className="bio-avatar"
        layout="constrained"
        formats={["auto", "webp", "avif"]}
        src="../images/common/dummy.png"
        quality={95}
        alt={title}
      />
    )
  }
}
export default Img

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Img = ({ source, title, className, sizes }) => {
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
                  quality: 40
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
        let image;
        if (sizes && sizes.length === 3) {
            const [width, height, quality] = sizes;
            image = getImage({
                ...img.node.childImageSharp.gatsbyImageData,
                width: width, // 動的な幅
                height: height, // 動的な高さ
                quality: quality // 動的なクオリティ
            });
        } else {
            image = getImage(img.node.childImageSharp.gatsbyImageData);
        }

        return (
            <GatsbyImage
                image={image}
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

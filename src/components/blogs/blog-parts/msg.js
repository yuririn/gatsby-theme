import * as React from "react"

import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Msg = data => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              name
              relativePath
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 100 }
                  width: 100
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    `
  )
  let txt = data.txt.split("<br>")
  let src = data.img ? data.img : "common/camille-pic.jpg"
  let name = data.name ? data.name : "かみーゆ"
  let img = allFile.edges.filter(img => img.node.relativePath === src)
  let msgClass = data.cls ? data.cls : "msg-baloon"
  if (img.length == 1) {
    return (
      <div className={msgClass}>
        <p>
          <GatsbyImage
            image={getImage(img[0].node.childImageSharp.gatsbyImageData)}
            alt={name}
            key={name}
            className="msg-baloon--img"
          />
          {name}
        </p>
        <p>
          {txt.map((t, index) => {
            return <span>{t}</span>
          })}
        </p>
      </div>
    )
  } else {
    return ""
  }
}
export default Msg
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
                  blurredOptions: { width: 200 }
                  width: 200
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    `
  )
  let txt = data.txt
  let src = data.img ? data.img : "common/camille-pic.jpg"
  let name = data.name ? data.name : "かみーゆ"
  let img = allFile.edges.find(img => img.node.relativePath === src)
  let msgClass = data.cls ? `msg-baloon--${data.cls}` : "msg-baloon"
  if (img) {
    return (
      <div className={msgClass}>
        <div className="msg-baloon--img__wrapper">
          <GatsbyImage
            image={getImage(img.node.childImageSharp.gatsbyImageData)}
            alt={name}
            key={name}
            className="msg-baloon--img"
          />
          <span>{name}</span>
        </div>
        <p dangerouslySetInnerHTML={{__html:txt}} className="msg-baloon--txt"></p>
      </div>
    )
  } else {
    return ""
  }
}
export default Msg

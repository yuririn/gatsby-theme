import React from "react"
import { Link } from "gatsby"
import Img from "./img"
import styled from "styled-components"
import { siteMetadata } from "../../../gatsby-config"

const genre = () => {
  return (
    <ul className="p-localNav c-grid">
      {siteMetadata.category.map((item, index) => {
        return (
          <li
            className="p-localNav__item c-grid__item--md6"
            key={`genre${index}`}
          >
            <Link to={`/blogs/${item.slug}/`}>
              <div className="p-localNav__main">
                <h3 className="p-localNav__heading">{item.enName}</h3>
                <p className="p-localNav__content">{item.description}</p>
              </div>
              <Img
                source={`common/genre-${item.slug}.jpg`}
                alt={item.enName}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default genre

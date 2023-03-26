import { siteMetadata } from "../../../gatsby-config"
import React from "react"
import styled from "styled-components"

const GenreList = () => {

  return <Ul>
          {siteMetadata.category.map((item, index) => {
              return <li key={`genre${index}`}>
                  <h3><a href={`/blogs/${item.slug}/`}>{item.name}</a></h3>
                  <p>{item.description}</p>
              </li>
          })}
          </Ul>

}
export default GenreList

const Ul = styled.ul`
list-style: none;
padding:0;
li {
    border: 2px solid #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
}
a {
    text-align: center;
    background: #fff;
    text-decoration: none;
    font-size: 20px;
    display: block;
}
`

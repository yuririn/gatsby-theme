import React from "react"
import { Link } from "gatsby"
import Img from "../img"
import styled from "styled-components"
import { siteMetadata } from "../../../gatsby-config"

const genre = () => {
  return (
    <Ganre>
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
                <Img source={`genre-${item.slug}.jpg`} alt={item.enName} />
              </Link>
            </li>
          )
        })}
      </ul>
    </Ganre>
  )
}

export default genre
const Ganre = styled.div`
  .p-localNav__item {
    position: relative;
    height: 130px;
    text-shadow: 0 0 3px rgb(0, 0, 0, 0.8);
    margin-bottom: 30px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 4px rgb(0, 0, 0, 0.3);
    background: var(--color-blue);
    .gatsby-image-wrapper {
      height: 100%;
      width: 100%;
      transition: 0.3s;
    }
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    @media screen and (min-width: 768px) {
      &:hover {
        .gatsby-image-wrapper {
          opacity: 0.5;
          transform: scale(1.1);
        }
      }
    }
  }
  .p-localNav__main {
    z-index: 1;
    position: absolute;
    color: #fff;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
  }
  .p-localNav__heading {
    color: #fff;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: 0.05em;
    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 20px;
      margin: 10px auto 0;
      background: var(--color-accent);
    }
    @media screen and (min-width: 768px) {
      margin-bottom: 15px;
      letter-spacing: 0.1em;
      font-size: 1.88rem;
      &:after {
        margin: 15px auto 0;
      }
    }
  }
`

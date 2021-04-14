import React from "react"

import { createGlobalStyle } from "styled-components"
import { BaseStyle } from "./../styles/common/base"
import { CommonStyle } from "./../styles/common/common"
import { Edit } from "./../styles/blog-styles/edit"
import Footer from "../components/common/footer"
import Header from "../components/common/header"
import GNav from "../components/common/nav"
import Profile from "../components/profile"
import Genre from "../components/genre"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <BaseStyle />
      <CommonStyle />
      <GlobalStyle />
      <Header title={title} location={location.pathname} />
      <GNav />
      <main>{children}</main>
      <aside class="BigWhite">
        <div className="l-container">
          <section className="p-section">
            <h2 className="c-heading--lg">記事のジャンル</h2>
            <Genre />
          </section>
          <Edit>
            <Profile />
          </Edit>
        </div>
      </aside>
      <Footer title={title} />
    </div>
  )
}

export default Layout

const GlobalStyle = createGlobalStyle`

  .p-entryCard {
    margin-bottom: 20px;

    &__footer {
      margin-top: 10px;
    }

    @media screen and (min-width: 768px) {
        margin-bottom: 40px;
      }
      @media screen and (max-width: 769px) {
       &:not(.is-small) + .is-small {
          padding-top: 20px;
          border-top: 1px solid #e9e9e9;
        }
      }

      &.is-small {

        @media screen and (max-width: 769px) {
        .p-entryCard__date {
            top: 2px;
            padding:5px 10px 5px 15px;
          }

          .p-entryCard__heading {
             display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          .p-entryCard__footer {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }


        @media screen and (max-width: 769px) {
          &+ .is-small {
            border-bottom: 1px solid #e9e9e9;
            border-top: none;
            padding-top: 0;
          }
          display: flex;
          flex-wrap:wrap;
          align-items: flex-start;
           position: relative;
           border-bottom: 1px solid #e9e9e9;


           .p-entryCard__heading {
              font-size: 1.6rem;
            }

            .p-entryCard__img {
              width: 33%;
              border-radius: 5px;
            }

            .p-entryCard__body {
              width: 67%;
              padding-left: 15px;
              box-sizing: border-box;
              p {
              }

            }
             .p-entryCard__footer {
              position: absolute;
              bottom: 10px;
              right: 0;
              width: 67%;
              padding-left: 15px;
            }

             .p-entryCard__date {
               font-size: 1.1rem;
             }
        }
      }

      &.is-first {

        .p-entryCard__body {
          p {
            line-height: 1.6;
            font-size: 1.4rem;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-size: 1.2rem;
            margin-bottom: 0px;
          }
        }
        .p-entryCard__heading {
            margin-bottom: 10px;
          }

         @media screen and (min-width: 768px) {
           width: 100%;
           display: flex;
           flex-wrap: wrap;
           align-items: flex-start;
           position: relative;

            .p-entryCard__img {
              width: 40%;

            }

            .p-entryCard__body {
              width: 60%;
              padding-left: 30px;
              box-sizing: border-box;
              p {
                font-size: 1.4rem;
              }

            }

            .p-entryCard__heading {
              font-size: 2.2rem;
              margin-bottom: 20px;
            }

            .p-entryCard__footer {
              position: absolute;
              bottom: 10px;
              right: 0;
              width: 60%;
              padding-left: 30px;
            }

         }

      }



      a {
        color: #335;
        text-decoration: none;
      }

      &__img {
        display: block;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 4px rgb(0,0,0, .3);
        margin-bottom: 20px;
        transition: .5s;

        .gatsby-image-wrapper {
          transition: .5s;
        }

        img {
          display: block;
          width: 100%;
          transition: .5s;
      }
    }
    &__date {
      transform: skewX(-15deg);
      font-weight: 700;
      background: var(--color-blue);
      padding: 6px 25px;
      letter-spacing: .1em;
      font-size: 1.4rem;
      position: absolute;
      z-index: 2;
      left: -5px;
      top: 10px;
      color: #FFF;
    }
    &__heading {
        font-weight: 700;
        font-size: 1.8rem;
        line-height: 1.2;
        margin-bottom: 5px;
        letter-spacing: .1em;
    }

     @media screen and (min-width: 768px) {
       &:hover {

         .p-entryCard__heading {
          color: var(--color-blue);
        }

        &__img {
           box-shadow: 0 0 4px rgb(0,0,0, .3),0 0 9px rgb(0,0,0, .6);
        }

         .gatsby-image-wrapper {
           transform: scale(1.2,1.2) rotate(-2deg);;
           opacity: 0.8;
         }
       }

  }

  .p-tagList{
    margin-top: 10px;
    &__item {
      margin-right: 5px;
      margin-bottom: 10px;
      display: inline-block;

      a {
        font-size: 1rem;
        line-height: 1;
        color: var(--color-blue);
        display: block;
        border-radius: 4px;
        border: 1px solid var(--color-blue);
        background: #fff;
        transition: .3s;
        white-space: nowrap;
        padding: 2px 15px 5px 2px;

        @media screen and (min-width: 768px) {
          font-size: 1.1rem;
          padding: 3px 20px 5px 3px;
          &:hover {
            background-color: var(--color-blue);
            color: #fff;
          }
        }

          &:before {
            content: "";
            width: 1em;
            height: 1em;
            vertical-align: -.2em;
            display: inline-block;
            border-radius: 50%;
            background: #fff;
            border: 2px solid var(--color-blue);
            transform: scale(.5);
        }
      }
    }
  }

`

import React, { useEffect, useState } from 'react';
import { BaseStyle } from "./../styles/common/base"
import { CommonStyle } from "./../styles/common/common"
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import Footer from "./footer"
import ToggleThemeButton from './common/toggle-theme-btn';


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const isRoot = location.pathname === '/'

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                return storedTheme;
            }
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light'; // デフォルトのテーマ
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleLinkClick = (event) => {
            const link = event.target.closest('a[href^="#"]:not([href="#"])');
            if (!link) return;

            event.preventDefault();
            const targetId = decodeURIComponent(link.getAttribute('href').substring(1)); // URLデコード
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.scrollY - 70, // オフセットを調整
                    behavior: 'smooth'
                });
            }
        };

        document.addEventListener('click', handleLinkClick);

        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath} id="top">
        {!isRoot &&
          <>
            <BaseStyle />
            <CommonStyle />
            <GlobalStyle />
            </>
        }
        <Header isRoot={isRoot}/>
      <main>{children}</main>
          <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} /> 
      <Footer title={title} />
    </div>
  )
}

export default Layout

const GlobalStyle = createGlobalStyle`
  .p-section + .ads.display {
       margin-bottom: 50px;
  }
  .p-entryCard {
    list-style: none;
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
          border-top: 1px solid var(--border-color);
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
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .p-entryCard__footer {
            ul {
                -ms-overflow-style: none;
                scrollbar-width: none;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
            }
            ul::-webkit-scrollbar {
                display: none;
            }
          }
        }
        @media screen and (max-width: 769px) {
          &+ .is-small {
            border-bottom: 1px solid var(--border-color);
            border-top: none;
            padding-top: 0;
          }
           display: flex;
            flex-wrap:wrap;
            align-items: flex-start;
            position: relative;
           border-bottom: 1px solid var(--border-color);
           .p-entryCard__heading {
              font-size: 1.4rem;
            }
            .p-entryCard__img {
              width: 35%;
              border-radius: 5px;
              img {
                border-radius: 8px;
              }
            }
            .p-entryCard__body {
              width: 65%;
              padding-left: 15px;
              box-sizing: border-box;
              p {
              }
            }
             .p-entryCard__footer {
              position: absolute;
              bottom: 10px;
              right: 0;
              width: 65%;
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
              img {
                  border-radius: 8px;
              }
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
        color: var(--color-blue);
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
        border-radius: 8px;
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
      color: var(--background);
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
          color: var(--color-link);
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
        background: var(--background);
        transition: .3s;
        white-space: nowrap;
        padding: 2px 3px 5px 2px;

        @media screen and (min-width: 768px) {
          font-size: 1.1rem;
          padding: 3px 3px 5px 3px;
          &:hover {
            background-color: var(--color-blue);
            color: var(--background);
          }
        }
          &:before {
            content: "";
            width: 1em;
            height: 1em;
            vertical-align: -.2em;
            display: inline-block;
            border-radius: 50%;
            background: var(--background);
            border: 2px solid var(--color-blue);
            transform: scale(.5);
        }
      }
    }
  }
`

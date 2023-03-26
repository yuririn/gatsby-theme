import * as React from "react"
import { createGlobalStyle } from "styled-components"

const Layout = ({ location, title, children }) => {
  return (
    <>
        <GlobalStyle/>
        <div className="global-wrapper" id="top">
        {children}
        </div>
    </>
  )
}

export default Layout

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: PixelMplus12-Bold;
        src: url('/fonts/PixelMplus12-Bold.ttf') format("truetype");
    }
    @font-face {
        font-family: PixelMplus12-Regular;
        src: url('/fonts/PixelMplus12-Regular.ttf') format("truetype");
    }
    .global-wrapper {
        font-family: PixelMplus12-Regular;
         @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: 300px 1fr;
        }
        background: #000;
        min-height:100vh;
        position: relative;
    }
    #header {
        text-align: center;
        background: #0013A3;
        border: 1px solid #fff;
        @media screen and (min-width: 768px) {
        border-right: 1px solid #fff;
        }
    }
    header {
        color: #fff;
        padding: 8px;
        position: sticky;
        top: 0;
        left: 0;
         h1 {
            padding: 24px 16px;
             margin: 0 0;
             border: 1px solid #fff;
             font-family: PixelMplus12-Bold;
             margin-bottom: 8px;
             font-size: 18px;
             @media screen and (min-width: 768px) {
                  font-size: 20px;
              }
         }
         nav{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            p {
                width: 100%;
            }
         }
         button, a {
            padding: 8px 16px;
            border: 1px solid #fff;
            display: block;
            text-decoration: none;
            color: #fff;
            width: calc(50% - 4px);
            background: none;
            @media screen and (min-width: 768px) {
                width: 100%;
            }
         }
    }
    footer {
        color: #fff;
        padding: 8px;
        background: #0013A3;
        border-right: 1px solid #fff;
        p {
            border: 1px solid #fff;
            text-align: center;
        }
    }
`

import { createGlobalStyle } from "styled-components";

export const BaseStyle = createGlobalStyle`
  /*
    html5doctor.com Reset Stylesheet
    v1.6.1
    Last Updated: 2010-09-17
    Author: Richard Clark - http://richclarkdesign.com
    Twitter: @rich_clark
  */
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;
  }
  body {
    line-height: 1;
  }
  article,aside,details,figcaption,figure,
  footer,header,hgroup,menu,nav,section {
    display: block;
  }
  ul {
    list-style: none;
  }
  blockquote, q {
    quotes:none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content:'';
    content:none;
  }
    @font-face {
    font-family: 'Raleway',sans-serif;
    display: swap;
    src: url('https://ginneko-atelier.com/fonts/Raleway-Light.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    }
    @font-face {
    font-family: 'Raleway',
    sans-serif;
    display: swap;
    src: url('https://ginneko-atelier.com/fonts/Raleway-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    }

  a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
  }
  /* change colours to suit your needs */
  ins {
      background-color:#ff9;
      color:#000;
      text-decoration:none;
  }
  /* change colours to suit your needs */
  mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
  }
  del {
    text-decoration: line-through;
  }
  abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
  }
  table {
    border-collapse:collapse;
    border-spacing:0;
  }
  /* change border colour to suit your needs */

  html {
    scroll-behavior: smooth;
  }


  body {
    --color: #335;
    --light-color: #fff;
    --font-color: #232a41;
    --color-sec: #464675;
    --color-blue: #264785;
    --color-link: #1231b8;
    --color-d-blue: #18347a;
    --color-accent: #c03363;
    --shadow: 0 0 4px rgba(0,0,0, .3);
    --milk: rgba(225,225,225, .9);
    --background: #fff;
    --filter: rgba(255, 255, 255, .5);
    --pale-gray: #eeeeee;
    --yellow: #edef5c;
    --header-background: rgba(255,255,255, .9);
    --header-color:#264785;
    --footer-background: #264785;
    --move-to: rgba(255, 255, 255, 0.8);
    --nav-bg: rgba(51,51,51,.8);
    --border-color: var(--border-color);
    --code-bg: #131a37;
  }

  body.dark {
    --color: #fff;
    --light-color: #18347a;
    --font-color: #f4fffe;
    --color-blue: #c9e9fc;
    --color-link:#65ceff;
    --color-d-blue: #f9fdff;
    --code-bg: #1b2845;
    --color-sec: #c5fff4;
    --color-accent: #d45c84;
    --background: rgb(21, 21, 21);
    --filter: rgba(21, 21, 21, .8);
    --pale-gray: #373738;
    --yellow: #abae00;
    --header-background: rgba(255,255,255, .6);
    --header-color:#264f85;
    --footer-background: #264f85;
    --move-to: rgba(255, 255, 255, 0.1);
    --nav-bg: rgba(58, 58, 58, 0.95);
    --border-color: #787878;
  }

  hr {
    display:block;
    height:1px;
    border:0;
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
  }
  input, select {
    vertical-align:middle;
  }

  html {
    font-family: 'Raleway', monospace, "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "メイリオ", sans-serif;
    font-size: 62.5%;

  }

  main {
    display: block;
    background: var(--background);
    padding-bottom: 1px;
  }

  body {
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--font-color);
    background: var(--baackground);

    @media screen and (min-width: 768px) {
      font-size: 1.6rem;
    }
  }
  img {
      max-width: 100%;
      height: auto;
      vertical-align: bottom;
  }
`;

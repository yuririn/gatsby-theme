import { createGlobalStyle } from 'styled-components'

export const BaseStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
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

  :root {
    --color: #335;
    --font-color: #232a41;
    --color-sec: #464675;
    --color-blue: #264785;
    --color-link: #1231b8;
    --color-d-blue: #18347a;
    --color-accent: #c03363;
    --shadow: 0 0 4px rgba(0,0,0, .3);
    --milk: rgba(225,225,225, .9);
  }

  html {
    font-family: 'Raleway', monospace, "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "メイリオ", sans-serif;
    font-size: 62.5%;
  }

  main {
    display: block;
    background: #fff;
  }

  body {
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--font-color);

    @media screen and (min-width: 768px) {
      font-size: 1.6rem;
    }
  }
  img {
      max-width: 100%;
      height: auto;
      vertical-align: bottom;
  }
`
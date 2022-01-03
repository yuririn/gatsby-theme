import styled from "styled-components"

export const Edit = styled.section`
  line-height: 2;
  p {
    margin-bottom: 1.5em;
  }
  .p-btn--detail {
    text-decoration: none;
  }
  .prfImg {
    max-width: 300px;
    border-radius: 50%;
    margin-bottom: 20px;
    margin: 0 auto 15px;
    display: block;

    img {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .about-sns {
    display: flex;
    justify-content: space-evenly;
  }
  .about-sns a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-link);
    max-width: 200px;
    height: 44px;
    width: 100%;
    border-radius: 5px;
    color: var(--color-link);
    &:first-child + a {
      margin-left: 20px;
    }
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    background: none;
  }
  code[class*="language-"],
  pre[class*="language-"] {
    color: #fff;
  }
  .text-center {
    text-align: center;
  }
  .bold {
    font-weight: 900;
    font-size: 1.2em;
  }
  .msg-baloon {
    display: flex;
    margin: 3em 0;
    align-items: start;
    .gatsby-image-wrapper.gatsby-image-wrapper-constrained {
      width: 100px;
      height: 100px;
    }
    .msg-baloon--img__wrapper {
      text-align: center;
      width: 100px;
      font-size: 1.2rem;
      font-weight: bold;

      img {
        border-radius: 50%;
        oveflow: hidden;
      }

      .msg-baloon--img {
        border-radius: 50%;
        margin-bottom: 15px;
      }
    }
    & > p {
      width: calc(100% - 130px);
      margin-left: 30px;
      background: #eeeeee;
      padding: 15px;
      border-radius: 10px;
      position: relative;

      span {
        display: block;
      }

      &::before {
        left: -15px;
        top: 15px;
        position: absolute;
        content: "";
        border-right: 15px solid #eeeeee;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
    }
    &--right {
      display: flex;
      margin: 3em 0;
      flex-direction: row-reverse;
      align-items: start;
      .msg-baloon--img__wrapper {
        text-align: center;
        width: 100px;
        font-size: 1.3rem;
        img {
          border-radius: 50%;
          oveflow: hidden;
        }

        .msg-baloon--img {
          border-radius: 50%;
          margin-bottom: 15px;
        }
      }
      & > p {
        width: calc(100% - 130px);
        margin-right: 30px;
        background: #eeeeee;
        padding: 15px;
        border-radius: 10px;
        position: relative;

        span {
          display: block;
        }

        &::before {
          right: -15px;
          top: 15px;
          position: absolute;
          content: "";
          border-left: 15px solid #eeeeee;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
      }
    }
  }
  h2 {
    padding-top: 50px;
    margin-top: -40px;
    color: var(--color-d-blue);
    font-size: 2.08rem;
    font-weight: 700;
    margin-bottom: 20px;

    &:after {
      margin-top: 5px;
      content: "";
      display: block;
      background: #c03363;
      width: 30px;
      height: 2px;
    }
  }

  h3 {
    color: var(--color-d-blue);
    margin-bottom: 15px;
    font-size: 2rem;
    font-weight: 700;
  }
  h4 {
    color: var(--color-blue);
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 1.7rem;
  }
  h2 ~ h2,
  h2 ~ h3,
  h2 ~ h4,
  h3 ~ h2,
  h3 ~ h3,
  h3 ~ h4,
  h4 ~ h2,
  h4 ~ h3,
  h4 ~ h4 {
    padding-top: 70px;
    margin-top: -40px;
  }
  .gatsby-resp-image-wrapper,
  .gatsby-resp-image-image {
    display: inline-block;
    margin-top: 30px;
    margin-bottom: 30px;
    @media screen and (min-width: 768px) {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
  a {
    color: var(--color-link);
    &:hover {
      text-decoration: none;
    }
  }
  ul,
  ol {
    list-style: none;
    p {
      margin-bottom: 0.5em;
    }
  }
  ul > li {
    padding-left: 1.5em;
    position: relative;
    margin-bottom: 0.5em;

    &::before {
      left: 8px;
      top: 6px;
      display: block;
      color: #001d7c;
      content: "";
      width: 0.3em;
      height: 0.6em;
      background: none;
      position: absolute;
      transform: rotate(45deg);
      border: 4px solid var(--color-accent);
      border-width: 0 3px 3px 0;
    }
  }
  ol {
    counter-reset: num;
    ol ol {
      display: none;
    }

    li:first-child {
      margin-top: 0.5em;
    }
    li {
      padding-left: 2.3em;
      position: relative;
      margin-bottom: 0.5em;
    }
    li:before {
      counter-increment: num;
      content: counters(num, ".") ". ";
      position: absolute;
      left: 0;
      text-align: right;
      width: 2em;
      display: inline-block;
      font-weight: 700;
      color: var(--color-blue);
    }
  }
  *:not(pre) > code[class*="language-"] {
    box-shadow: none;
    border: none;
    background: var(--color-d-blue);
    padding: 3px 5px;
  }
  .gatsby-code-title {
    font-weight: bold;
    background: var(--color-blue);
    display: inline-block;
    padding: 6px 15px;
    vertical-align: bottom;
    line-height: 1;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 1.4rem;
    letter-spacing: 0.1em;
  }
  .gatsby-code-title + .gatsby-highlight pre[class*="language-"] {
    margin-top: 0;
    border-top-left-radius: 0;
  }
  .gatsby-highlight-code-line {
    display: block;
    background: rgba(225, 225, 225, 0.2);
    margin: 0 -1em;
    padding: 0 1em;
    position: relative;
    min-width: 1000px;
    min-height: 1em;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      height: 100%;
      width: 0.5em;
      display: block;
      background: var(--color-ac);
    }
  }
  pre[class*="language-"] {
    border-radius: 0.5em;
    border: none;
    background: #131a37;
    box-shadow: none;
    margin: 30px 0 40px;
    overflow: auto;
    padding: 1em;
  }
  .token.tag,
  .token.boolean,
  .token.number,
  .token.deleted {
    color: #81e7a2;
  }
  .token.keyword,
  .token.property,
  .token.selector,
  .token.constant,
  .token.symbol,
  .token.builtin {
    color: #f8aec3;
  }
  .token.attr-name,
  .token.attr-value,
  .token.string,
  .token.char,
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable,
  .token.inserted {
    color: #5bfff1;
  }
  strong {
    font-weight: 700;
    background: linear-gradient(transparent 60%, #edef5c 0);
    font-weight: bolder;
  }
  em {
    color: var(--color-accent);
    font-style: normal;
    font-weight: bolder;
  }
  table {
    td,
    th {
      border: 1px solid #bbb;
      padding: 0.4em 0.7em;
    }
    th {
      font-size: 0.9em;
      background: #eee;
    }
    margin-bottom: 30px;
  }
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
    font-size: 1.4rem;
  }
  blockquote {
    background: #eee;
    padding: 20px 40px 20px 40px;
    margin-bottom: 30px;
    position: relative;
    margin-top: 40px;
    border-radius: 15px;

    p:last-child {
      margin-bottom: 0;
    }

    &::before {
      @media screen and (min-width: 768px) {
        height: 50px;
        width: 8px;
        left: 10px;
      }
      left: 8px;
      height: 30px;
      width: 8px;
      top: -8px;
      display: block;
      content: "";
      transform: skewX(-35deg);
      position: absolute;
      border-left: 8px double #ccc;
    }
    &::after {
      @media screen and (min-width: 768px) {
        height: 50px;
        width: 8px;
        right: 0px;
      }
      right: -2px;
      bottom: -8px;
      height: 30px;
      width: 8px;
      display: block;
      content: "";
      transform: skewX(-35deg);
      position: absolute;
      border-left: 8px double #ccc;
    }
  }

  a.article-link {
    text-decoration: none;
    display: block;
    margin-bottom: 15px;

    @media screen and (min-width: 768px) {
      margin-bottom: 30px;
      margin-top: 20px;
    }

    .article-link__img {
      box-sizing: border-box;
      width: 120px;
      border-radius: 10px;
      overflow: hidden;
      display: block;
      @media screen and (min-width: 768px) {
        width: 150px;
      }
    }

    time {
      font-weight: 700;
      color: var(--color-blue);
    }

    .article-link__main {
      padding-left: 15px;
      font-weight: 700;
      line-height: 1.4;
      box-sizing: border-box;
      width: calc(100% - 120px);

      @media screen and (min-width: 768px) {
        width: calc(100% - 150px);
      }

      .description {
        font-weight: 400;
        display: none;
        line-height: 1.6;
        @media screen and (min-width: 768px) {
          margin-top: 10px;
          display: block;
          font-size: 1.2rem;
          color: var(--font-color);
        }
      }
    }

    section {
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      padding: 15px;
      background: #f7f7f7;
      overflow: hidden;
      border: 1px solid var(--color-blue);
      position: relative;
      z-index: 1;
      transition: 0.3s;
      &:hover {
        @media screen and (min-width: 768px) {
          &::before {
            left: 0;
            top: 0;
          }
          &::after {
            right: 6px;
          }
        }
      }

      &::before {
        z-index: -1;
        position: absolute;
        left: -20px;
        top: -20px;
        content: "";
        display: block;
        border-left: 50px solid transparent;
        border-top: 50px solid transparent;
        border-color: var(--color-blue) transparent transparent
          var(--color-blue);
        border-style: solid;
        border-width: 50px;
        transition: 0.3s;
      }

      &::after {
        bottom: 10px;
        right: 10px;
        position: absolute;
        font-size: 1.4rem;
        letter-spacing: 0.2em;
        transition: 0.3s;
        color: var(--color-link);
        content: "Read More>";
      }
    }
  }
  .box {
    margin-top: 20px;
    h2,
    h3,
    h4 {
      color: var(--color-accent);
    }
    border: 2px solid var(--color-blue);
    padding: 10px 15px;
    border-radius: 8px;
    @media screen and (min-width: 768px) {
      margin-top: 30px;
      padding: 20px 30px;
      border-radius: 15px;
    }
  }
  .w300 {
    margin: 0 auto;
    max-width: 300px;
  }
`

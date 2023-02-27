import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

// CSS
import { BaseStyle } from "./../styles/common/base"
import { CommonStyle } from "./../styles/common/common"
import styled from "styled-components"

// components
import Voice from "../inc/portfolioParts/voice"
import Works from "../inc/portfolioParts/works"
import Profile from "../inc/portfolioParts/profile"
import Contact from "../inc/portfolioParts/contact"

const Portfolio = ({ data, location }) => {
  const nav = ["Profile", "Works", "Contact"]
  const [isOpen, setIsOpen] = useState(false)

  const menuEvent = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Body>

      <Header>
        <CommonStyle />
        <BaseStyle />
        <header>
          <p className="logo">Camille Site</p>
          <span
            onClick={menuEvent}
            className={isOpen ? "nav-btn active" : "nav-btn"}
            role="button"
            id="menuBtn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 100.5">
            <path d="M0,45.5C0,13.83,34.7,0,77.5,0s77.5,13.83,77.5,45.5H0Z" className="pan-top"/>
            <path  d="M0,80.5c0,13.92,34.7,20,77.5,20s77.5-6.08,77.5-20H0Z" className="pan-bottom"/>
            <g className="gu">
            <path className="lettuce" d="M116.13,74.77l-17.82-3.74-20.85,3.73-17.2-3.73-17.87,3.73-19.97-3.74-18.95,3.64c-1.35,.26-2.67-.63-2.93-1.98-.26-1.36,.63-2.67,1.98-2.93l19.88-3.82,19.93,3.73,17.94-3.74,17.27,3.74,20.83-3.73,17.78,3.73,19-3.74,17.38,3.85c1.35,.3,2.2,1.63,1.9,2.98-.3,1.35-1.63,2.2-2.98,1.9l-16.36-3.62-18.97,3.73Z"/>
            <path className="hanburg" d="M148.08,50.31H6.92c-3.04,0-5.5,2.46-5.5,5.5s2.46,5.5,5.5,5.5H148.08c3.04,0,5.5-2.46,5.5-5.5s-2.46-5.5-5.5-5.5Z"/>
            </g>
            </svg>
            {isOpen ? "EAT?" : "MENU"}
          </span>
          <nav className={isOpen ? "globalNavOpen" : "globalNav"}>
            <ul>
              <li>
                <Link to="/" onClick={menuEvent}>
                  Home
                </Link>
              </li>
              {nav.map((value, index) => {
                return (
                  <li key={`lst${index}`}>
                    <Link to={`#${value}`} onClick={menuEvent}>
                      {value}
                    </Link>
                  </li>
                )
              })}
              )
            </ul>
          </nav>
        </header>
      </Header>
      <main id="top">
        <Firstview>
          <div className="main">
            <div>
              <h1>広島生まれ、広島育ちのIT戦士</h1>
              <p>納期と平和を守ります。</p>
            </div>
          </div>
        </Firstview>
        <section>
          <div className="l-container">
            <Heading>
              <h2>かみーゆをおススメする7つの理由</h2>
            </Heading>
            <Recomend>
              <p>かみーゆをおススメする理由を7つにまとめました。</p>
              <ol>
                <li>コーディングが早い。当社比。</li>
                <li>新しい技術への好奇心旺盛！ちょっと息切れしてるけど。</li>
                <li>納期を命がけで守ります。死なんけど。</li>
                <li>
                  クライアントも大切だけど、ユーザーのことを心の底から大事と思っている。
                </li>
                <li>
                  フロントエンド技術への情熱がハンパない。少し暑苦しいけど。
                </li>
                <li>バケモノ並みに体力がある。</li>
                <li>ちょっぴりセクシー。知らんけど｡</li>
              </ol>
            </Recomend>
          </div>
          <div className="bg-gray">
            <section className="l-container">
              <Heading>
                <h3>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bullhorn" className="svg-inline--fa fa-bullhorn fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"></path></svg> お喜びの声
                </h3>
              </Heading>
              <p className="p-mw900">
                かみーゆと一緒に仕事をしたり遊んだりした方たちからたくさんのお喜びの声をいただいております。
              </p>
              <Voice />
            </section>
          </div>
        </section>
        <section id="Works">
          <Heading>
            <h2>Works</h2>
          </Heading>
          <Works />
        </section>
        <section id="profile">
          <Heading>
            <h2>Profile</h2>
          </Heading>
          <Profile />
        </section>
        <section id="contact">
          <Heading>
            <h2>Contact</h2>
          </Heading>
          <Contact />
        </section>
      </main>
      <Footer>
        <footer>
          <a href="#top" aria-label="先頭へ戻る" className="footer-btn"></a>
          <ul className="footer-nav">
            <li>
              <Link to="/">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className="svg-inline--fa fa-home fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>
              </Link>
            </li>
            <li>
              <Link
                to="https://twitter.com/LirioY"
                target="_blank"
                rel="noopener nofollow"
              >
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/yurico.k"
                target="_blank"
                rel="noopener nofollow"
              >
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
              </Link>
            </li>
          </ul>
          <p>
            <small>(c)IT戦士かみーゆを紹介するサイト</small>
          </p>
        </footer>
      </Footer>
    </Body>
  )
}

export default Portfolio

export const Head = ({ data, location }) => {
  const ogp = `${data.allFile.edges[0].node.publicURL}`

  const yourData = {
    title : "広島生まれ、広島育ちのIT戦士を紹介するサイト",
    description : "広島のIT戦士・かみーゆを紹介するサイトです。フロントエンドエンジニアかみーゆの魅力を出し惜しみせず力一杯紹介しています。ちょっとクセ強め。",
    ogp : ogp,
    date : "2021-06-03",
    location : location,
    faq: [['コーダーになるためにはどうすれば良いですか？','コーダーはスピード命です。なので早くコーディングするためには、ショートカットは必須です。ひたすらコードを書きましょう。'],['業界の進歩が早くてついていくのが大変ではないですか？','置いて行かれないよう、SNSなどで情報収集は欠かさずにやってます。この業界、学ぶことをやめたらやっていけないと思います。'],['職種が大きく変わってますが、転職の際不安はありましたか？','転職するって決めた時、今考えるとWebクリエイターになった自分になりたかったのかもしれません。'],['どうやってお問い合わせすればいいですか？','ご用のある方はお手数ですが、Twitter@LirioYまでDMにてご連絡ください。']]
  }

  return (
    <Seo
      data={yourData}
    />
  )
}
export const portfolioQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "portfolio/portfolio-ogp.png" }
      }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`

const Body = styled.div`
  background: #e95014;
  overflow: hidden;
  animation: Delete 0.1s 2s forwards;
  color: #333;

  line-height: 1.8;
   @font-face {
    font-family: 'Archivo Black',
    sans-serif;
    src: url('/fonts/ArchivoBlack-Regular.ttf') format('truetype');
    display: swap;
  }
  main {
    background:#fff;
  }

  .bg-gray {
    background: #eee;
    padding-bottom: 50px;
    @media screen and (min-width: 769px) {
      padding-bottom: 80px;
    }
  }

  .p-mw800 {
    max-width: 800px;
    margin: 0 auto 30px;
  }
  .p-mw900 {
    max-width: 900px;
    margin: 0 auto 30px;
  }

  .center {
    text-align: center;
  }

  & > * {
    opacity: 0;
    -webkit-animation: loadIn 1s 2s forwards;
    animation: loadIn 1s 2s forwards;
  }
  &::before {
    position: fixed;
    display: block;
    content: "";
    width: 1px;
    height: 1px;
    display: block;
    top: 50%;
    left: 0;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    background: #ffffff;
    -webkit-animation: boul 2s forwards;
    animation: boul 2s forwards;
  }
`

const Header = styled.div`
  position: fixed;
  width: 100%;
  left: 0px;
  top: 0px;
  background-color: rgb(51, 51, 51);
  color: rgb(233, 80, 20);
  border-bottom: 1px solid rgb(233, 80, 20);
  z-index: 10;
  padding: 6px;

  .logo {
    margin: 5px 0px 0px;
    float: left;
    font-family: "Archivo Black", serif;
    padding-left: 15px;
    letter-spacing: 0.1em;
  }

  .nav-btn {
    top: 0;
    position: absolute;
    right: 0;
    display: none;
    display: block;
    width: 44px;
    height: 100%;
    font-size: 10px;
    text-align:center;
    padding-top: 26px;
    &::after,
&::before {
  content: '';
  position: absolute;
  display: block;
  left: 12px;
  height: 3px;
  width: 20px;
  border-radius: 3px;
  background: #7F6844;
  transition: transform .3s;
}
&::after {
  top: 8px;
  box-shadow: 0 7px 0 #3A682A;
}
&::before {
  top: 22px;
}
    &.active{

    &::after,

    &::before {
    transform: scaleX(0);
    }
     svg{
         .pan-bottom{
  animation: fall 0.7s forwards;
}
.pan-top {
  animation: fall 0.7s 1s forwards;
}
.gu{
  animation: fall 0.7s 0.5s forwards;
}
     }
    }
    svg {

        left: 5px;
        top: 5px;
        width: 32px;
      position: absolute;
      .pan-bottom,
        .pan-top {
        fill: #7F6844;
        opacity: 0;
        }
        .gu{
        opacity: 0;
        }
        .lettuce {
  fill: #3A682A;
}
.hanburg {
  fill: #591C09;
}
    }
  }

  nav.is-open ul {
  }
  nav.is-open ul li {
    text-align: center;
    padding: 20px;
  }
  nav.is-open ul li a {
    text-decoration: none;
    font-weight: bold;
    font-size: 2rem;
    font-family: "Archivo Black", serif;
    letter-spacing: 0.1em;
  }
  @media screen and (max-width: 769px) {
    .globalNav ul {
      display: none;
      padding: 0 15px;
    }
    .globalNavOpen ul {
      display: block;
      position: absolute;
      top: 47px;
      left: 0;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      padding-top: 30px;
    }

    .globalNavOpen ul li {
      padding: 10px;
      text-align: center;
    }
    .globalNavOpen ul li a {
      box-sizing: border-box;
      text-decoration: none;
      font-family: "Archivo Black", serif;
      letter-spacing: 0.1em;
      padding: 15px;
      max-width: 300px;
      font-size: 2rem;
      display: block;
      margin: 0 auto;
      width: 100%;
      color: rgb(233, 80, 20);
      background: rgb(51, 51, 51);
      border: 2px solid rgb(233, 80, 20);
    }
  }

  /* メディアクエリ */
  @media screen and (min-width: 768px) {
    .nav-btn {
      display: none;
    }
    .globalNavOpen ul,
    .globalNav ul {
      display: block;
      padding: 0;
      list-style: none;
      text-align: right;
      font-size: 0;
      position: relative;
      z-index: 100;
    }

    .globalNavOpen ul li,
    .globalNav ul li {
      text-align: center;
      display: inline-block;
    }
    .globalNavOpen ul li a,
    .globalNav a {
      width: 120px;
      display: block;
      padding: 3px 15px;
      font-size: 1.8rem;
      letter-spacing: 0.1em;
      text-decoration: none;
      color: #e95014;
      font-family: "Archivo Black", sans-serif;
      position: relative;
      overflow: hidden;
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
    .globalNav a::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      display: block;
      background: rgba(233, 80, 20, 0.8);
      transition: 0.6s;
      z-index: -1;
    }
    .globalNav a:hover {
      color: #333;
    }
    .globalNav a:hover::after {
      left: 0;
    }
  }
  @-webkit-keyframes loadIn {
    0% {
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes loadIn {
    0% {
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes boul {
    50% {
      top: 50%;
      height: 3px;
      width: 100%;
    }

    100% {
      top: 50%;
      width: 100%;
      height: 100%;
    }
  }

  @keyframes boul {
    50% {
      top: 50%;
      height: 3px;
      width: 100%;
    }

    100% {
      top: 50%;
      width: 100%;
      height: 100%;
    }
  }

  @-webkit-keyframes Delete {
    0% {
    }

    100% {
      background: #fff;
    }
  }

  @keyframes Delete {
    0% {
    }

    100% {
      background: #fff;
    }
  }

  @-webkit-keyframes irukaShow {
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }

  @keyframes irukaShow {
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }

  @-webkit-keyframes fadeIn {
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes fall{
  0% {
    opacity: 0;
    transform:translateY(-100%);
  }
  30% {
    opacity: 1;
    transform:translateY(-100%);
  }
  90% {
    opacity: 1;
    transform: translateY(0px);
  }
  95% {
    opacity: 1;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform:translateY(0);
  }

}
`

const Firstview = styled.div`
  position: relative;
  height: 0;
  padding-top: 120%;
  text-align: center;
  color: #ffffff;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    padding-top: 50%;
  }

  &::before {
    position: absolute;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    background: url(/images/bg_fire.webp) #f99f03;
    background-size: cover;
    animation: yurayura 4s infinite;
  }
  .main {
    left: 0;
    top: 50%;
    width: 100%;
    padding: 30px;
    padding-top: 20%;
    text-align: center;
    position: absolute;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    background: url(/images/camille.webp) no-repeat top center;
    background-size: contain;

    h1 {
      font-size: 2em;
      font-weight: bold;
      margin: 0.67em 0;
    }
  }

  @keyframes yurayura {
    0% {
      -webkit-transform: skew(0deg) scale(1.2, 1.2);
      transform: skew(0deg) scale(1.2, 1.2);
    }

    20% {
      -webkit-transform: skew(-2deg) scale(1.2, 1.2) translate(5px, 5px);
      transform: skew(-2deg) scale(1.2, 1.2) translate(5px, 5px);
    }

    50% {
      -webkit-transform: skew(1deg) scale(1.2, 1.25) translate(5px, -5px);
      transform: skew(1deg) scale(1.2, 1.25) translate(5px, -5px);
    }

    70% {
      -webkit-transform: skew(-3deg) scale(1.22, 1.2) translate(5px, 5px);
      transform: skew(-3deg) scale(1.22, 1.2) translate(5px, 5px);
    }

    100% {
      -webkit-transform: skew(0deg) scale(1.2, 1.2);
      transform: skew(0deg) scale(1.2, 1.2);
    }
  }
`

const Heading = styled.header`
  text-align: center;
  padding-top: 40px;

  h2 {
    font-weight: bold;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    display: inline-block;
    position: relative;
    font-size: 2.6rem;
    z-index: 1;
    padding: 20px 30px;
    letter-spacing: 0.1em;
    font-family: "Archivo Black", "游ゴシック体", YuGothic, "游ゴシック Medium",
      "Yu Gothic Medium", "游ゴシック", "Yu Gothic", sans-serif;
    font-weight: bold;

    @media screen and (min-width: 768px) {
      padding: 30px 50px;
      margin-bottom: 30px;
      font-size: 3.6rem;
    }

    &::after,
    &::before {
      display: block;
      content: "";
      width: 30px;
      left: 0;
      height: 25px;
      top: 0;
      position: absolute;
      border-top: 4px solid #747070;
      border-left: 4px solid #747070;
    }

    &::after {
      left: calc(100% - 30px);
      top: calc(100% - 25px);
      border-top: 0;
      border-left: 0;
      border-bottom: 4px solid #747070;
      border-right: 4px solid #747070;
    }
  }

  h3 {
    font-weight: bold;
    margin: 0;
    display: inline-block;
    position: relative;
    padding: 0 20px;
    font-size: 2rem;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
      font-size: 2.8rem;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 8%;
      -webkit-transform: rotate(30deg);
      transform: rotate(30deg);
      display: block;
      width: 2px;
      height: 80%;
      background: #333;
      -webkit-box-shadow: 5px -2px 0 #333;
      box-shadow: 5px -2px 0 #333;
    }
    svg {
      width: 30px;
      height: 30px;
      transform: rotate(-15deg);
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 8%;
      -webkit-transform: rotate(-30deg);
      transform: rotate(-30deg);
      display: block;
      width: 2px;
      height: 80%;
      background: #333;
      -webkit-box-shadow: -5px -2px 0 #333;
      box-shadow: -5px -2px 0 #333;
    }
  }
`

const Recomend = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  @media screen and (min-width: 768px) {
    margin-bottom: 80px;
  }

  p {
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.2em;
  }

  ol {
    list-style: none;
    counter-reset: num;
    li {
      font-size: 1.3em;
      font-weight: bold;
      counter-increment: num;
      margin-left: 40px;
      text-indent: -40px;
      margin-bottom: 0.5em;
      &::before {
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: #e95014;
        color: #fff;
        border-radius: 50%;
        display: inline-block;
        width: 30px;
        margin-right: 10px;
        text-indent: 0;
        font-family: "Archivo Black", serif;
        content: counter(num);
      }
    }
  }
`
const Footer = styled.div`
  background: #333;
  text-align: center;
  padding: 15px;
  padding-bottom: 50px;
  color: #ffffff;
  .footer-nav {
    margin-bottom: 10px;
  }
  .footer-nav li {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
  .footer-nav a {
    color: #ffffff;
    padding: 5px;
    font-size: 2rem;
  }
  .footer-btn {
    z-index: 10;
    position: fixed;
    bottom: -35px;
    left: calc(50% - 35px);
    width: 70px;
    height: 70px;
    background: #e95014;
    border-radius: 50%;
  }
  .footer-btn::after {
    content: "";
    display: block;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #e95014;
  }
  svg {
    width:20px;
    height:20px;
  }
  .footer-btn::before {
    top: 14px;
    position: relative;
    content: "";
    width: 20px;
    height: 20px;
    border-left: 2px solid #fff;
    border-top: 2px solid #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    display: inline-block;
  }
`

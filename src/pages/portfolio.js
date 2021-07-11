import React, { useState } from "react";
import { Link } from "gatsby";

import Seo from "../components/seo";

// CSS
import { BaseStyle } from "./../styles/common/base";
import { CommonStyle } from "./../styles/common/common";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

// components
import Voice from "./portfolioParts/voice";
import Works from "./portfolioParts/works";
import Profile from "./portfolioParts/profile";
import Contact from "./portfolioParts/contact";
import firstview from "../components/top-first-view";

const Portfolio = ({ data, location }) => {
  const nav = ["Profile", "Works", "Contact"];
  const [isOpen, setIsOpen] = useState(false);

  // const img = data.allFile.edges[0].node.childImageSharp.fluid.src;
  const img = "";
  const menuEvent = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Body>
      <Seo
        title="広島生まれ、広島育ちのIT戦士を紹介するサイト"
        description="広島のIT戦士・かみーゆを紹介するサイトです。フロントエンドエンジニアかみーゆの魅力を出し惜しみせず力一杯紹介しています。ちょっとクセ強め。"
        image={img}
        location={location}
      />
      <Header>
        <CommonStyle />
        <BaseStyle />
        <header>
          <p className="logo">Camille Site</p>
          <span
            onClick={menuEvent}
            className="nav-btn"
            role="button"
            aria-label="ナビゲーションボタン"
            id="menuBtn"
          ></span>
          <nav className={isOpen ? "globalNavOpen" : "globalNav"}>
            <ul>
              <li>
                <Link to="/" onClick={menuEvent}>
                  Home
                </Link>
              </li>
              {nav.map((value) => {
                return (
                  <li>
                    <Link to={`#${value}`} onClick={menuEvent}>
                      {value}
                    </Link>
                  </li>
                );
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
                  <FontAwesomeIcon icon={faBullhorn} /> お喜びの声
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
                <FontAwesomeIcon icon={faHome} />
                </Link>
                </li>
                <li>
                <Link
                to="https://twitter.com/LirioY"
                target="_blank"
                rel="noopener nofollow"
                >
                <FontAwesomeIcon icon={faTwitter} />
                </Link>
                </li>
                <li>
                <Link
                to="https://www.instagram.com/yurico.k"
                target="_blank"
                rel="noopener nofollow"
                >
                <FontAwesomeIcon icon={faInstagram} />
                </Link>
                </li>
            </ul>
            <p>
            <small>(c)IT戦士かみーゆを紹介するサイト</small>
            </p>
        </footer>
      </Footer>
      </Body>
      );
    };

export default Portfolio;
export const portfolioQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        relativePath: { eq: "portfolio/portfolio-ogp.png" }
        sourceInstanceName: { eq: "assets" }
      }
    ) {
      edges {
        node {
          name
          relativePath
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

const Body = styled.div`
  background: #e95014;
  overflow: hidden;
  animation: Delete 0.1s 2s forwards;
  color: #333;

  line-height: 1.8;

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
`;

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
    background-image: linear-gradient(
      -45deg,
      rgba(233, 80, 20, 0.5) 25%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0) 50%,
      rgba(233, 80, 20, 0.5) 50%,
      rgba(233, 80, 20, 0.5) 75%,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 0)
    );
    background-size: 30px 30px;
    background-position: center 4px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
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
      top: 43px;
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
`;

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
`;

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
    font-family: "Archivo Black","游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic",sans-serif;
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
`;

const Recomend = styled.div`
    max-width:800px;
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
            margin-bottom: .5em;
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
                font-family: "Archivo Black",serif;
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

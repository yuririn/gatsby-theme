import React from "react"
// import VoiceStyles from "./css/voice.module.css"
import Feature from "./feature"
import History from "./history"
import Faq from "./faq"
import Img from "./../../components/img"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFistRaised } from "@fortawesome/free-solid-svg-icons"
import { faWalking } from "@fortawesome/free-solid-svg-icons"
import { faQuestion } from "@fortawesome/free-solid-svg-icons"

const Profile = () => (
  <div>
    <ProfImg>
      <Img source="common/camille-pic.jpg" className="" />
    </ProfImg>
    <div className="l-container">
      <ProfDetail>
        <h3>かみーゆ（ビダンじゃないほう）/フロントエンドエンジニア</h3>
        <p>
          広島生まれ広島育ちのIT戦士です。気が付いたらフロントエンドエンジニアになっていました。
          <br />
          さらに最近気が付いたのですが、いつの間にかフィリピン・セブ島に来て、しかもロックダウン（コミュニティ単位での隔離）に巻き込まれてます。人生っておもしろい。
        </p>
      </ProfDetail>
    </div>
    <div className="bg-gray">
      <section className="l-container">
        <Heading>
          <h3>
            <FontAwesomeIcon icon={faFistRaised} /> こんなことできるよ
          </h3>
        </Heading>
        <p className="p-mw900 center">
          得意、不得意は別としてできることを
          <strong>タグクラウド風</strong>
          にまとめておきます。
        </p>
        <Feature />
      </section>
      <section className="l-container">
        <Heading>
          <h3>
            <FontAwesomeIcon icon={faWalking} /> こんなことできるよ
          </h3>
        </Heading>
        <History />
      </section>
      <section className="l-container">
        <Heading>
          <h3>
            <FontAwesomeIcon icon={faQuestion} /> よくあるご質問
          </h3>
        </Heading>
        <p className="p-mw900 center">
          かみーゆによくある質問をまとめてみました。
        </p>
        <Faq />
      </section>
    </div>
  </div>
)

export default Profile

const ProfImg = styled.div`
  width: 200px;
  border-radius: 50%;
  margin: 20px auto 30px;
  overflow: hidden;

  img {
    border-radius: 50%;
    overflow: hidden;
  }

  @media screen and (min-width: 769px) {
    width: 250px;
  }
`

const ProfDetail = styled.div`
  max-width: 800px;
  margin: 20px auto 30px;

  h3 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`

const Heading = styled.header`
  text-align: center;
  padding-top: 40px;

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
`

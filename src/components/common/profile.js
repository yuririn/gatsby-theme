import React from "react"
import { Link } from "gatsby"
import Img from "../img"
import styled from "styled-components"

const profile = () => {
  return (
    <Profile>
      <h2 className="c-heading--lg">管理人について</h2>

      <Img source="common/camille-pic.jpg" alt="管理人" className="prfImg" />
      <div className="c-profile__content">
        <div className="u-mblg c-editArea">
          <p>
            こんにちは！セブ島在住の気ままな海外ノマドエンジニア・かみーゆです。
          </p>
          <ul>
            <li>日本でフロントエンドを中心に約10年Web制作</li>
            <li>
              2019年4月「MacBook Pro
              とスーツケースだけで生きていこう」と、セブ島に移住
            </li>
            <li>セブ島に転職してエンジニア講師</li>
            <li>2020年オフショア開発担当者</li>
            <li>疲れたので辞めてプータロー</li>
            <li>人生の充電中でセブ島ライフを満喫</li>
            <li>
              2021年セブ島でビジネスを始めるために仲間と奮闘中（←イマココ）
            </li>
          </ul>
          <p>
            {" "}
            好きな人といるだけでパワースポット！今は大好きな仲間と消耗しない働き方をするために計画中。
            13歳の頃から「好きなように生きて好きなように死ぬ」が人生のKPI。
            <br />
            「楽しいか」、「かっこいいか」でやることを判断・取捨択一しています。好きなものは肉とビール。
          </p>
        </div>
        <p className="u-text-center">
          <Link to="/about/" className="p-btn--detail">
            About Me
          </Link>
        </p>
      </div>
    </Profile>
  )
}

export default profile

const Profile = styled.div`
  line-height: 2;
  max-width: 700px;
  margin: 0 auto;
  padding-bottom: 50px;
  .prfImg {
    width: 200px;
    border-radius: 50%;
    display: block;
    margin: 0 auto 30px;
    img {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  ul + *,
  p + * {
    margin-top: 1em;
  }
  ul {
    list-style: none;
    & + p {
      margin-bottom: 1em;
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
`

import React from "react"
import { Link } from "gatsby"
import Img from "./img"

const profile = () => {
  return (
    <section className="l-container--md c-bio">
      <h2 className="c-heading--lg">管理人について</h2>

      <Img source="common/camille-pic.jpg" alt="管理人" className="prfImg" />
      <div className="c-profile__content">
        <div className="u-mblg c-editArea">
          <p>
            こんにちは！セブ島在住の気ままな海外ノマドエンジニア・かみーゆです。
          </p>
          <ul>
            <li>日本でフロントエンドを中心に約10年Web制作</li>
            <li>2019年4月「MacBook Pro とスーツケースだけで生きていこう」と、セブ島に移住</li>
            <li>セブ島に転職してエンジニア講師</li>
            <li>2020年オフショア開発担当者</li>
            <li>疲れたので辞めてプータロー</li>
            <li>人生の充電中でセブ島ライフを満喫</li>
            <li>2021年セブ島でビジネスを始めるために仲間と奮闘</li>
            <li>2022年7月セブ島で法人Lenz Technologies Inc. 設立（←イマココ）</li>
          </ul>
          <p>
            好きな人といるだけでパワースポット！今は大好きな仲間と消耗しない働き方をするためにセブ島に法人設立中。
            13歳の頃から「好きなように生きて好きなように死ぬ」が人生のKPI。
            <br />
            「楽しいか」、「かっこいいか」でやることを判断・取捨択一しています。
          </p>
        </div>
        <p className="u-text-center">
          <Link to="/about/" className="p-btn--detail">
            About Me
          </Link>
        </p>
      </div>
    </section>
  )
}

export default profile


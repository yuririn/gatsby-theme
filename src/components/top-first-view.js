import React from "react"
import Neko from "./svg/neko"
import SiteTitle from "./svg/site-title"
import './../scss/objects/components/key-visual.scss';

/**
 * 
 * @returns ファーストビュー
 */
const firstview = () => {
  return (
      <section className="c-key-visual" id="keyvisual">
        <SiteTitle></SiteTitle>
        <Neko></Neko>
          <p><span>セブ島在住海外ノマド＆女性エンジニアの<br />気ままなライフログ「銀ねこアトリエ」。</span><span>フロント技術を中心とした<br />「ウェブ制作に関するチップス」、</span>
              <span>「磨耗しない人生の選択」や<br />「海外ノマド」の<br />ライフスタイルについて発信しています。</span></p>
      </section>
  )
}

export default firstview


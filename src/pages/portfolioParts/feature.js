import React from "react"
import FearureStyles from "./css/feature.module.css"
import CommonStyles from "./css/common.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFistRaised } from "@fortawesome/free-solid-svg-icons"

const Fearure = () => (
  <section className="l-container">
    <header className={CommonStyles.headingMd}>
      <h3>
        <FontAwesomeIcon icon={faFistRaised} /> こんなことできるよ
      </h3>
    </header>
    <p className={CommonStyles.center}>
      得意、不得意は別としてできることを
      <strong className={CommonStyles.strong}>タグクラウド風</strong>
      にまとめておきます。
    </p>
    <ul className={FearureStyles.recomendPoint}>
      <li className={FearureStyles.S}>イラスト</li>
      <li className={FearureStyles.S}>画像加工</li>
      <li>Adobe XD</li>
      <li className={FearureStyles.SS}>Adobe Illustorator</li>
      <li className={FearureStyles.SS}>Adobe Photoshop</li>
      <li className={FearureStyles.LL}>HTML/CSSのコーディング</li>
      <li className={FearureStyles.L}>Sass(SCSS)</li>
      <li className={FearureStyles.L}>Pug(旧：Jade)</li>
      <li>Gulp</li>
      <li>バニラJS</li>
      <li className={FearureStyles.S}>VueJS</li>
      <li>WordPressサイト構築</li>
      <li className={FearureStyles.L}>concrete5サイト構築</li>
      <li className={FearureStyles.SS}>Vagrant</li>
      <li className={FearureStyles.L}>メイク</li>
      <li className={FearureStyles.LL}>ネイル（ネイリスト検定1級）</li>
      <li className={FearureStyles.L}>おいしいハンバーク料理</li>
      <li>ブリッジ</li>
      <li>前後開脚</li>
      <li className={FearureStyles.LL}>プランク２分以上</li>
      <li>出来損ないの転回</li>
      <li>ビサヤと英語をブレンドしたジョーク</li>
    </ul>
  </section>
)

export default Fearure

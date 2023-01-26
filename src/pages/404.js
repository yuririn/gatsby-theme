import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/img"
import { Edit } from "./../styles/blog-styles/edit"
import BreadCrumbList from "../components/common/bread-crumb-list"
import styled from "styled-components"
import Genre from "../components/common/genre"
import TagsList from "../components/blogs/tag-list"

const Uranai = ({ value }) => {
  const num = value - 1
  const results = [
    {
      title: "集中力が低がる一日。特に、うっかり怪我に注意。",
      description:
        "今日は何をやっても集中できない日になりそうです。うっかりで怪我をしそうになるので、おうちでゆっくりしましょう。",
      luckyitem: "鼻メガネ",
      recomend: "広島生まれの私が広島で出会って忘れられないもの5選",
      thumbnail: "thumbnail/2015/enrty237.jpg",
      link: "/blogs/entry237/",
    },
    {
      title: "絶対モテる！今すぐ合コンへ行くべし。",
      description:
        "何をやってもモテモテの1日になりそう。シングルのあなたは出会いのチャンスです。カラオケデートがおすすめです。",
      luckyitem: "マイク",
      recomend: "カラオケでうろ覚えで歌って90点以上とる方法",
      thumbnail: "thumbnail/2014/entry212.jpg",
      link: "/blogs/entry212/",
    },
    {
      title: "時は熟した！新しいスタートをきるチャンス！",
      description:
        "今の会社、仕事にうんざり。。。日々どうしようって思っているあなた。転職のチャンスです。今すぐ転職サイトに登録しましょう。",
      luckyitem: "履歴書",
      recomend: "セブ島で仕事したかったんでXDで退職届を作った話",
      thumbnail: "thumbnail/2020/entry368.png",
      link: "/blogs/entry368/",
    },
    {
      title: "動物に癒されて運気アップ！たくさんスキンシップしよう。",
      description:
        "動物から運気がもらえます。ペットを飼っている方はたくさんかわいがりましょう。飼ってない方はネコカフェがおすすめです。",
      luckyitem: "ちゅーる",
      recomend: "飼いネコが食中毒！？対処法等の備忘録",
      thumbnail: "thumbnail/2018/entry278.jpg",
      link: "/blogs/entry278/",
    },
    {
      title: "ちゃんとした占い師に占ってもらおう",
      description:
        "怪しい404ページの占いをするより、ちゃんとした占い師に占ってもらいましょう。",
      luckyitem: "クリスタル",
      recomend:
        "セブ島唯一日本人占い師・さくら庵のマイアさんから学ぶかみーゆ流占いとの付き合い方",
      thumbnail: "thumbnail/2020/entry387.jpg",
      link: "/blogs/entry387/",
    },
  ]
  return (
    <div>
      <p className="mb-Md">
        今日の占いはこちらです!!滅多にお目にかかれない貴重な404ページでの占いは一訪問一回までとさせていただきます。なにとぞご理解ください。
      </p>
      <dl className="fortune" id="fortune-result">
        <dt className="is-first">今日の占い</dt>
        <dd>{results[num].title}</dd>
        <dt>Remark</dt>
        <dd>{results[num].description}</dd>
        <dt>ラッキーアイテム</dt>
        <dd>{results[num].luckyitem}</dd>
        <dt>あなたにオススメ記事</dt>
        <dd className="is-last">
          <Link to={results[num].link}>
            {results[num].thumbnail ? (
              <Img source={results[num].thumbnail} alt={results[num].title} />
            ) : (
              ""
            )}
            <span>{results[num].recomend}</span>
          </Link>
        </dd>
      </dl>
    </div>
  )
}

const Result = React.memo( (prop) => {
  let ranNum = Math.floor(Math.random() * 5) + 1
  const [value, setValue] = useState("")

  const onClick = e => {
    setValue(e.target.value)
  }

  if (prop.value === "item01") {
    return (
      <div>
        <p className="u-text-center mb-Md">
          まずは、トップページに戻って心を落ち着かせましょう。
        </p>
        <p className="u-text-center">
          <Link className="p-btn--detail" to="/">
            トップページヘ
          </Link>
        </p>
      </div>
    )
  } else if (prop.value === "item02") {
    return (
      <section className="p-section">
        <h2 className="c-heading--lg">記事のジャンルから探す</h2>
        <p className=" mb-Md">
          記事のジャンルは計6つあります。ジャンルごとに心がけて整理してあるので、多分読みたい記事が見つかると思うので気長に探してください。
        </p>
        <Genre />
      </section>
    )
  } else if (prop.value === "item03") {
    return (
      <section className="p-section">
        <h2 className="c-heading--lg">タグから探す</h2>
        <p className=" mb-Md">
          それぞれの記事は私かみーゆが思いつきかつ無造作に作られたタグに紐づけられてます。頑張って探してください。
        </p>
        <ul className="p-tagList--lg u-mblg">
          <TagsList></TagsList>
        </ul>
      </section>
    )
  } else if (prop.value === "item04") {
    return (
      <div className="result__item__inner l-container">
        <div>
          <div style={value ? { display: `none` } : { desplay: `block` }}>
            <p id="fortune-text" className="u-text-center">
              たまには息抜きが必要ですよね。気晴らしに、占いでもしていってください。
            </p>
            <p className="u-text-center">
              <button
                className="fortune__btn"
                type="button"
                id="fortune-btn"
                value={ranNum}
                onClick={onClick}
              >
                Start
              </button>
            </p>
          </div>
          {value ? <Uranai value={value} /> : ""}
        </div>
      </div>
    )
  } else {
    return ""
  }
})

const Menu =React.memo( () => {
  const [value, setValue] = useState("")

  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <section id="uranai" className="l-container">
      <ul className="uranai__list">
        <li>
          <label>
            <input
              type="radio"
              name="item"
              value="item01"
              onChange={onChange}
            />
            <span>振り出しに戻る（トップページ）</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="item"
              value="item02"
              onChange={onChange}
            />
            <span>ジャンルから探す</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="item"
              value="item03"
              onChange={onChange}
            />
            <span>タグから探す</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="item"
              value="item04"
              onChange={onChange}
            />
            <span>ページを探すのをやめて占いをする</span>
          </label>
        </li>
      </ul>
      <Result value={value}></Result>
    </section>
  )
})

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo data={{location: location, title:"お探しのページは見つかりませんでした"}} />
      <div className="p-pageHeader">
        <div className="p-pageHeader__main">
          <h1 className="p-pageHeader__heading">404</h1>
          <p className="p-pageHeader__content">
            お探しのページは見つかりませんでした
          </p>
        </div>
        <Img source="common/ganre-404.jpg" className="p-pageHeader__img" />
      </div>
      <P404>
        <div className="mb-Md mt-Xs l-container">
          <BreadCrumbList current="お探しのページは見つかりませんでした" />
        </div>
        <Edit>
          <div className="l-container">
            <h2>あなたのお探しのページにたどり着けなかったようです</h2>
            <p>
              大変遺憾ではありますが、管理人がどこかに移動させたか、
              <em>内容が気に入らないから削除してしまった</em>
              可能性があります。誠に申し訳ありません。
            </p>
            <p>
              でも少し立ち止まって考えてみてください。これってひょっとしたら、普段頑張りすぎているあなたに少し休憩した方がいいっていう神様のアドバイスなのかもしれません。
            </p>
            <p>
              そんなあなたのために「銀ねこアトリエ」はいくつかオプションを用意しました。お好きな項目をお選びください。
            </p>
          </div>
        </Edit>
        <Menu></Menu>
      </P404>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const P404 = styled.section`
  margin-bottom: 50px;
  .l-container {
    max-width: 900px;
  }
  input[type="radio"] {
    display: none;
  }
  .mb-Md {
    margin-bottom: 20px;
  }
  .mt-Lg {
    margin-top: 100px;
  }
  .fortune__btn {
    width: 110px;
    height: 96px;
    display: block;
    position: relative;
    z-index: 1;
    font-size: 2rem;
    margin: 10px auto;
    color: #fff;
    font-weight: 700;
    transform: scale(0.8);
    animation: dokidoki 1.8s infinite;
    opacity: 1;
    background: none;
    border: none;
    &:hover {
      animation: dokidoki 0.5s infinite;
      opacity: 0.7;
    }
    &:after {
      z-index: -1;
      position: absolute;
      content: "";
      display: block;
      bottom: 0;
      left: 8px;
      border-left: 47px solid transparent;
      border-top: 45px solid #c03363;
      border-right: 47px solid transparent;
    }
    &:before {
      z-index: -1;
      position: absolute;
      content: "";
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      left: 0;
      top: 0;
      box-shadow: 50px 0 0 #c03364, 20px 20px 0 #c03364;
      background: #c03363;
    }
  }
  .p-section {
    li {
      padding-left: 0;
      &::before {
        content: none;
      }
    }
  }
  .uranai__list {
    margin: 30px auto 0;
    border: 5px solid var(--color);
    color: #335;
    padding: 15px;
    border-radius: 20px;
    margin-bottom: 50px;
    li {
      margin-bottom: 30px;
      padding-left: 0;
      &::before {
        content: none;
      }
    }
    label {
      display: inline-block;
      font-weight: 700;
      padding-left: 25px;
      display: block;
      color:var(--color);

      input[type="radio"]:checked + span:before {
        transform: rotateX(540deg);
        opacity: 1;
      }
      input[type="radio"] + span {
        display: block;
        position: relative;
        width: 100%;
        &:before {
          content: "";
          display: block;
          left: -25px;
          top: 4px;
          position: absolute;
          border-top: 7px solid transparent;
          border-left: 14px solid var(--color-accent);
          border-bottom: 7px solid transparent;
          opacity: 0;
          transition: 0.3s;
        }
      }
      input[type="radio"]:checked + span {
        color: var(--color-accent);
      }
    }
    @media screen and (min-width: 768px) {
      padding: 30px 30px 10px;
      border-radius: 20px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
      }
    }
  }
  .fortune {
    padding: 20px 20px 5px;
    background: var(--pale-gray);
    border-radius: 15px;
    @media screen and (min-width: 768px) {
      padding: 30px 40px 5px;
      border-radius: 20px;
    }
    dt {
      font-weight: 700;
      padding-left: 15px;
      position: relative;
      line-height: 1.4;
      margin-bottom: 15px;
      &:before {
        position: absolute;
        display: block;
        content: "";
        left: 0;
        background: #c03363;
        width: 2px;
        height: 100%;
        top: 0;
      }
      @media screen and (min-width: 768px) {
        margin-bottom: 20px;
      }
    }
    dd {
      margin-bottom: 30px;
    }
    .is-last a {
      display: block;
      padding: 20px;
      background: hsla(0, 0%, 100%, 0.4);
      border-radius: 15px;
      font-weight: 700;
      text-align: center;
      font-size: 1.1em;
      color: #001d7c;
      text-decoration: none;
      span {
        display: block;
        margin-top: 10px;
      }
    }
  }
  @keyframes dokidoki {
    0% {
      transform: scale(0.85);
    }
    5% {
      transform: scale(0.82);
    }
    95% {
      transform: scale(0.82);
    }
    to {
      transform: scale(0.87);
    }
  }
`

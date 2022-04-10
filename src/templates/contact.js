import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/img"
import BreadCrumbList from "../components/common/bread-crumb-list"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons"

const types = [
  {
    name: "ウェブサイト作成・改修・そのほか機能追加の依頼",
    description:
      "簡易的なLPからWordPressの新規作成、既存のウェブサイトの改修、機能追加などを承ります。まずはテレビ電話でヒアリング（30分無料）いたしますので、メッセージに希望日時候補を3つご入力の上メールフォームを送信してください。",
  },
  {
    name: "相談したい",
    description:
      "大変恐縮ですがヒアリングなしでのお見積もりはいたしません。まずはテレビ電話（30分無料）などでご相談を受け付けます。メッセージに相談内容の概要とテレビ電話の希望日時候補を3つご入力の上、メールフォームを送信してください。",
  },
  {
    name: "かみーゆ開発工房",
    description:
      "かみーゆ開発工房では、「こんなの欲しい」「あったらいいな」って要望に応じてWordPressプラグインを作成します（すべてにお答えできかねます）。お問い合わせフォームから、1.欲しいもの 2.欲しい理由 3.ニックネームを記入の上メール送信してください。",
  },
  {
    name: "そのほか",
    description:
      "そのほかご相談などございましたらお気軽にお問い合わせください。",
  },
]

const Thanks = () => {
  return (
    <ThanksArea>
      <h2>お問い合わせフォームが送信されました</h2>
      <p>
        お問い合わせフォームを送信いたしました。内容を拝見し、返信させていただきます。
      </p>
      <p>
        明らかなセールスや、スパムと判断した場合は返信し兼ねますのでご了承ください。
      </p>
      <p>5日経っても返信がない場合はお手数ですが、再度ご連絡をお願いします。</p>
      <p className="u-mblg">
        もしくは、FBページからお問い合わせいただくか、TwitterアカウントにDMをお願いします。
      </p>
      <ul className="u-mblg">
        <li>
          <Link
            to="https://twitter.com/LirioY"
            target="_blank"
            rel="noopener nofollow"
          >
            <FontAwesomeIcon icon={faTwitter} /> LirioY
          </Link>
        </li>
        <li>
          <Link
            to="https://www.facebook.com/ginnekoatelier"
            target="_blank"
            rel="noopener nofollow"
          >
            <FontAwesomeIcon icon={faFacebook} /> 銀ねこアトリエ
          </Link>
        </li>
      </ul>
      <p className="u-text-center u-mblg">
        <a className="p-btn--detail" href="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </a>
      </p>
    </ThanksArea>
  )
}

const Error = ({ name, email, agreement }) => {
  if (name === "" && email === "" && agreement === "") {
    return ""
  } else if (name === true && email === true && agreement === true) {
    return ""
  } else {
    return (
      <p className="error">
        ※ 必須項目に入力が漏れているか、入力に誤りがある可能性があります。
      </p>
    )
  }
}
const Detail = ({ name }) => {
  let description = ""
  types.map(value => {
    if (name === value.name) description = value.description
    return description
  })

  return <div>{description}</div>
}

const Form = () => {
  const [value, setValue] = useState("")
  const [name, getName] = useState("")
  const [email, getMail] = useState("")
  const [emailError, setMailError] = useState("")
  const [agreement, getAgreement] = useState("")

  const onChange = e => {
    setValue(e.target.value)
  }

  const setName = e => {
    getName(e.target.value !== "" ? true : false)
  }

  const setEmail = e => {
    let flag = e.target.value !== "" ? true : false
    const regexp =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
    if (regexp.test(e.target.value) === false && e.target.value !== "") {
      setMailError("※ メールアドレスの形式が正しくありません")
    } else {
      setMailError("")
    }
    flag = regexp.test(e.target.value)
    getMail(flag)
  }

  const setAgreement = e => {
    getAgreement(e.target.checked)
  }

  return (
    <div>
      <ContentArea>
      <p>
        銀ねこアトリエでは各種相談を受けつけております。
        <br />
        <br />
        ウェブサイト作成・改修・機能追加ご希望の方で初めての方へ30分の無料相談を承っております。ご希望の方は、メッセージに希望日時候補を3つご記入ください。
        <br />
        <br />
        銀ねこアトリエ・海外ノマドエンジニアのかみーゆについて知りたい方は先に
        <a href="/about/">About Me</a>
        をお読みいただいた方がスムーズです。
      </p>
      </ContentArea>
      <FormArea>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          action="/contact/thanks/"
        >
          <input type="hidden" name="form-name" value="contact" />
          <dl>
            <dt>ご相談の種類</dt>
            <dd>
              {types.map(value => {
                return (
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value={value.name}
                      onChange={onChange}
                    />
                    <span>{value.name}</span>
                  </label>
                )
              })}
              <Detail name={value}></Detail>
            </dd>
            <dt>
              お名前<span>必須</span>
            </dt>
            <dd>
              <input type="text" name="name" required onChange={setName} />
            </dd>
            <dt>
              メールアドレス<span>必須</span>
            </dt>
            <dd>
              <input type="email" name="email" required onChange={setEmail} />
              <p className="error">{emailError}</p>
            </dd>
            <dt>メッセージ</dt>
            <dd>
              <textarea type="text" name="message" />
            </dd>
          </dl>
          <p className="agreement">
            <label>
              <input
                type="checkbox"
                name="agreement"
                required
                onChange={setAgreement}
              />
              <span className="error"></span>
            </label>
            <a href="/privacy-policy/" target="_blank">
              プライバシーポリシー
            </a>
            に同意の上送信する
          </p>
          <p>
            <button
              type="submit"
              disabled={name && email && agreement ? false : true}
            >
              送信する
            </button>
          </p>
          <div className="hidden-area">
            <label for="message"></label>
            <input type="text" name="bot-field" v-model="botField"/>
          </div>
          <Error name={name} email={email} agreement={agreement}></Error>
        </form>
      </FormArea>
    </div>
  )
}

const contactTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description
  const src = data.allFile.edges[0]
    ? data.allFile.edges[0].node.childImageSharp.fluid.src
    : ""

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="お問い合わせ"
        description={`お問い合わせに関するページです。${siteDescription}`}
        image={src}
        location={location}
      />

      <div className="l-main_contents">
        <div className="p-pageHeader">
          <div className="p-pageHeader__main">
            <h1 className="p-pageHeader__heading">Contact</h1>
            <p className="p-pageHeader__content">お問い合わせ</p>
          </div>
          <Img source="common/contact.jpg" className="p-pageHeader__img" />
        </div>
        <section>
          <div className="l-container">
            <div className="mb-Md mt-Xs">
              <BreadCrumbList current="お問い合わせ" />
            </div>
          </div>
          <div className="l-container">
            {location.pathname === `/contact/thanks/` ? (
              <Thanks />
            ) : (
              <Form></Form>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default contactTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
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
`
const ContentArea = styled.div`
a {
  color: var(--color-link);
}
`
const ThanksArea = styled.div`
  h2 {
    font-size: 2rem;
    padding-bottom: 20px;
    text-align: center;

    @media screen and (min-width: 768px) {
      font-size: 2.4rem;
      padding-bottom: 30px;
    }
  }
  p {
    line-height: 1.8;
  }
  ul {
    text-align: center;
    li {
      display: inline-block;
      padding: 10px;
    }
  }
`
const FormArea = styled.div`
  margin-top: 20px;
  @media screen and (min-width: 768px) {
    margin-top: 40px;

    dl {
      display: flex;
      flex-wrap: wrap;
    }
  }
  a {
    text-decoration: underline;
    color: var(--color-link);
  }
  dt {
    font-weight: bold;
    margin-bottom: 10px;
    @media screen and (min-width: 768px) {
      width: 200px;
      margin-bottom: 15px;
    }
  }
  dd {
    margin-bottom: 25px;
    @media screen and (min-width: 768px) {
      width: calc(100% - 200px);
    }
  }
  input,
  textarea,
  button {
    appearance: none;
    border: none;
    background: none;

  }
  input[type="email"],
  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 3px solid #ccc;
    color: var(--font-color);
  }
  textarea {
    width: 100%;
    padding: 8px;
    border: 3px solid #ccc;
    height: 200px;
    color: var(--font-color);
  }
  dd label input {
    display: none;
  }
  dd label span {
    display: inline-block;
    padding-left: 24px;
    position: relative;
    display: block;
    margin-bottom: 10px;
  }
  dd div {
    margin-top: 30px;
    line-height: 1.8;
  }
  dd label span::after,
  dd label span::before {
    content: "";
    width: 18px;
    height: 18px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background: #ccc;
    border-radius: 50%;
  }
  dd label span::after {
    width: 14px;
    height: 14px;
    left: 2px;
    top: 2px;
    background: #c03363;
    opacity: 0;
    transition: 0.3s;
  }
  textarea,
  button,
  input[type="email"],
  input[type="text"] {
    box-sizing: border-box;
  }
  dd label input:checked + span::after {
    opacity: 1;
  }
  .error {
    color: #8f001d;
    font-size: 1.4rem;
  }
  button {
    display: block;
    height: 60px;
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    margin: 15px auto;
    background: #fff;
    border: 3px solid #c03363;
    color: #c03363;

    @media screen and (min-width: 768px) {
      height: 80px;
      margin-top: 50px;
      transition: 0.3s;
      &:hover {
        background: #c03363;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  button:disabled,
  button[disabled="true"] {
    pointer-events: none;
    opacity: 0.5;
  }
  .agreement input[type="checkbox"] {
    display: none;
  }
  .agreement span {
    width: 30px;
    height: 20px;
    display: block;
    float: left;
    position: relative;
  }
  .agreement span:before,
  .agreement span:after {
    content: "";
    position: absolute;
    top: 4px;
    left: 0;
    width: 18px;
    height: 18px;
    background: #ccc;
    display: block;
  }
  .agreement span:after {
    background: none;
    width: 10px;
    height: 14px;
    top: 1px;
    left: 3px;
    border-bottom: 3px solid #c03363;
    border-right: 3px solid #c03363;
    transform: rotate(45deg);
    opacity: 0;
    transition: 0.3s;
  }
  .agreement input:checked + span:after {
    opacity: 1;
  }
  .hidden-area {
    display: none !important;
  }
  dt span {
    color: #c03363;
    font-size: 1.2rem;
    margin-left: 10px;
  }
  .title {
    font-size: 1.4em;
    margin-bottom: 1em;
    font-weight: bold;
  }
  .title::after {
    margin-top: 5px;
    content: "";
    display: block;
    background: #c03363;
    width: 30px;
    height: 2px;
  }

  .error {
    color: #c03363;
    font-size: 1.4rem;
  }
`

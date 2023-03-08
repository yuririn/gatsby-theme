import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/common/img"
import BreadCrumbList from "../components/common/bread-crumb-list"

import {ContentArea} from "./../styles/main/contact"


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
    name: "ファンレター（お喜びの声）",
    description:
      "あなたのブログの感想をお聞かせください。ニックネーム・年代・性別と感想150文字くらいをメッセージいただきますと、抽選で当ブログで紹介させていただきます。",
  },
  {
    name: "そのほか",
    description:
      "そのほかご相談などございましたらお気軽にお問い合わせください。",
  },
]

const Thanks = () => {
  return (
    <ContentArea>
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
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" hegiht="20"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg> LirioY
          </Link>
        </li>
        <li>
          <Link
            to="https://www.facebook.com/ginnekoatelier"
            target="_blank"
            rel="noopener nofollow"
          >
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" className="svg-inline--fa fa-facebook fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" hegiht="20"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg> 銀ねこアトリエ
          </Link>
        </li>
      </ul>
      <p className="u-text-center u-mblg">
        <a className="p-btn--detail" href="/">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className="svg-inline--fa fa-home fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  width="20" hegiht="20"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg> Home
        </a>
      </p>
    </ContentArea>
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

  return <p>{description}</p>
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
      </p>
      <p>
        ウェブサイト作成・改修・機能追加ご希望の方で <strong>初めての方へ30分の無料相談</strong> を承っております。<br/>ご希望の方は、メッセージに希望日時候補を3つご記入ください。
      </p>
      <p>
        銀ねこアトリエと海外ノマドエンジニアのかみーゆについて知りたい方は先に
        <a href="/about/">About Me</a>
        をお読みいただいた方がスムーズです。
      </p>
      <div className="c-form">
        <form
          name="contact"
          // method="POST"
          // data-netlify="true"
          action="/contact/thanks/"
        >
          <input type="hidden" name="form-name" value="contact" />
          <dl>
            <dt>ご相談の種類</dt>
            <dd>
              {types.map(value => {
                return (
                  <label className='c-form__checkbox'>
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
        </div>
      </ContentArea>
    </div>
  )
}

const contactTemplate = ({ data, location }) => {
  return (
    <Layout location={location} title={`お問い合わせ`}>

      <div className="l-main_contents">
        <div className="p-pageHeader">
          <div className="p-pageHeader__main">
            <h1 className="p-pageHeader__heading">Contact</h1>
            <p className="p-pageHeader__content">お問い合わせ</p>
          </div>
          <Img source="common/contact.jpg" className="p-pageHeader__img" />
        </div>
        <section>

           <BreadCrumbList current="お問い合わせ"  className="mb-Md mt-Xs" />
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

export const Head = ({ data, location }) => {

  const yourData = {
    title: "お問い合わせ",
    description: `お問い合わせに関するページです。`,
    date : "2021-06-03",
    location : location
  }

  return (
     <Seo
        data={yourData}
      />
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

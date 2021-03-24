import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import LayoutSimple from "../components/layoutSimple"
import SEO from "../components/seo"
import Image from "../components/image"
import BreadCrumbList from "../components/common/breadCrumbList"
import ContactStyles from "./css/contact.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons"

const types = [
  {
    name: "ウェブサイト作成の依頼",
    description:
      "簡易的なLPからWordPressの実装まで実装を承ります。まずはテレビ電話でヒアリングいたしますので、メッセージに希望日時候補を3つご入力の上メールフォームを送信してください。",
  },
  {
    name: "相談したい",
    description:
      "大変恐縮ですがヒアリングなしでのお見積もりはいたしません。まずはテレビ電話などでご相談を受け付けます。メッセージに相談内容の概要とテレビ電話の希望日時候補を3つご入力の上、メールフォームを送信してください。",
  },
  {
    name: "講演依頼",
    description:
      "セミナーでの登壇や講演なども承っております。まずはご相談ください。",
  },
  {
    name: "そのほか",
    description:
      "そのほかご相談などございましたらお気軽にお問い合わせください。",
  },
]

const Thanks = () => {
  return (
    <div>
      <h2 className={ContactStyles.title}>
        お問い合わせフォームが送信されました
      </h2>
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
    </div>
  )
}

const Error = ({ name, email, agreement }) => {
  if (name === "" && email === "" && agreement === "") {
    return ""
  } else if (name === true && email === true && agreement === true) {
    return ""
  } else {
    return (
      <p className={ContactStyles.error}>
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
    const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
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
      <p>
        銀ねこアトリエでは各種相談を受けつけております。まずはお気軽にご相談ください。
      </p>
      <div className={ContactStyles.contact}>
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
              <p className={ContactStyles.error}>{emailError}</p>
            </dd>
            <dt>メッセージ</dt>
            <dd>
              <textarea type="text" name="message" />
            </dd>
          </dl>
          <p className={ContactStyles.agreement}>
            <label>
              <input
                type="checkbox"
                name="agreement"
                required
                onChange={setAgreement}
              />
              <span></span>
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
          <div class="p-contact__item" className={ContactStyles.hidearea}>
            <label for="message"></label>
            <input type="text" name="bot-field" v-model="botField" />
          </div>
          <Error name={name} email={email} agreement={agreement}></Error>
        </form>
      </div>
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
    <LayoutSimple location={location} title={siteTitle}>
      <SEO
        title="お問い合わせ"
        description={siteDescription}
        image={src}
        location={location}
      />

      <div className="l-main_contents">
        <div className="p-pageHeader">
          <div className="p-pageHeader__main">
            <h1 className="p-pageHeader__heading">Contact</h1>
            <p className="p-pageHeader__content">お問い合わせ</p>
          </div>
          <Image filename="common/contact.jpg" className="p-pageHeader__img" />
        </div>
        <section>
          <div className="l-container--md">
            <div className="mb-Md mt-Xs">
              <BreadCrumbList current="お問い合わせ" />
            </div>
          </div>
          <div className="l-container--md">
            {location.pathname === `/contact/thanks/` ? (
              <Thanks />
            ) : (
              <Form></Form>
            )}
          </div>
        </section>
      </div>
    </LayoutSimple>
  )
}

export default contactTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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

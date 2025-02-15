import * as React from "react"
import { graphql,Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"
import SideBar from "../components/SideBar"
import BreadCrumbList from "../components/common/BreadcrumbList"
import Msg from "../components/posts/modueles/msg"

const aboutMeta = {
    template: 'page',
    title: 'このページは宇宙の彼方へ消えました',
    description: `お探しのページは見つかりませんでした。`
}

const NotFoundPage = ({ data, location }) => {
    const { title } = aboutMeta
    const breadCrumbList = {
        current: title
    }

  return (
      <Layout location={location}>
          <div className="l-main_contents is-page">
              <header className="c-page-header en" id="keyvisual">
                <div>
                      <h1>404<span>{title}</span></h1>
                  
                </div>
                  <BreadCrumbList list={breadCrumbList} ></BreadCrumbList>
              </header>
              <div className="l-section l-container--page">

                <section itemProp="articleBody" className="c-post-body">
                      <p>まるで探しているページがブラックホールに吸い込まれたかのようです。でも心配しないでください！Webサイトの残りの部分はまだ無事です。</p>
                      <ul>
                          <li>代わりに、ホームページに戻ってみませんか？</li>
                          <li>探したいページを検索機能で探してみてください。PCなら右側、モバイルならスクロールダウンすれば探せますよ！</li>
                          <li>お探しの情報が見つからない場合は、<Link to={`/contact/`}>お問い合わせ</Link>からメッセージをお送りください。気が向いたらお返事します。</li>
                      </ul>
                      <Msg txt="次回、エイリアンがページを持ち去る前に訪れることをわすれないでねーーーーん。"></Msg>
                </section>
                  <SideBar location={location}></SideBar>
              </div>
          </div>
      </Layout>
  )
}

export const Head = ({ location }) => {
    const { title, description } = aboutMeta
    const list = [
        {
            name: '',
            path: '/404/',
            type: `WebPage`
        }
    ]
    return <Seo
        location={location}
        data={{
            template: 'page',
            title: title,
            description: description,
            list: list,
            is404: true
        }}
    />
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

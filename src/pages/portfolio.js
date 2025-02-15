import * as React from "react"
import { graphql } from "gatsby"
import PortfolioLayout from "../components/portfolioLayout";
import Seo from "../components/Seo/Seo"
import Phone from "../components/icon-and-logo/Phone";
import Voice from "../inc/portfolio/voice";
import Works from "../inc/portfolio/works";
import Profile from "../inc/portfolio/profile";


const aboutMeta = {
    template: 'portfolio',
    title: '広島生まれ、広島育ちのIT戦士を紹介するサイト',
    description: `広島のIT戦士・かみーゆを紹介するサイトです。フロントエンドエンジニアかみーゆの魅力を出し惜しみせず力一杯紹介しています。ちょっとクセ強め。`
}

const PortfolioPost = ({ data, location }) => {
    const { title } = aboutMeta

    return (
        <PortfolioLayout location={location} title={title}>
            <div className="first-view">
                <div className="main">
                    <div>
                        <h1>広島生まれ、広島育ちのIT戦士</h1>
                        <p>納期と平和を守ります。</p>
                    </div>
                </div>
            </div>
            <main>
                <header className="portfolio__heading  l-container">
                        <h2>かみーゆをおススメする7つの理由</h2>
                    </header>
                <section className="recomend l-container">

                        <p className="u-center">かみーゆをおススメする理由を7つにまとめました。</p>
                        <ol>
                            <li>コーディングが早い。当社比。</li>
                            <li>新しい技術への好奇心旺盛！ちょっと息切れしてるけど。</li>
                            <li>納期を命がけで守ります。死なんけど。</li>
                            <li>
                                クライアントも大切だけど、ユーザーのことを心の底から大事と思っている。
                            </li>
                            <li>
                                フロントエンド技術への情熱がハンパない。少し暑苦しいけど。
                            </li>
                            <li>バケモノ並みに体力がある。</li>
                            <li>ちょっぴりセクシー。知らんけど｡</li>
                        </ol>
                    </section>
                <section>

                    <div className="bg-gray">
                        <section>
                            <header className="page-header">
                                <h3><Phone></Phone>お喜びの声</h3>
                            </header>
                            <Voice></Voice>
                        </section>
                    </div>
                    <div className="bg-gray" id="Works">
                        <section>
                            <header className="portfolio__heading">
                                <h2>Works</h2>
                            </header>
                            <Works></Works>
                        </section>
                    </div>
                    <div>
                        <section id="Profile">
                            <header className="portfolio__heading">
                                <h2>Profile</h2>
                            </header>
                            <Profile></Profile>
                        </section>
                    </div>
                </section>
            </main>
        </PortfolioLayout>
    )
}

export default PortfolioPost

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ data, location }) => {
    const { title, description } = aboutMeta
    const ogp = `${data.allFile.edges[0].node.publicURL}`
    const list = [
        {
            name: '',
            path: location.pathname,
            type: `WebPage`
        }
    ]
    return <Seo
        location={location}
        data={{
            template: 'portfolio',
            title: title,
            description: description,
            list: list,
            ogp: ogp,
            faq: [
                [
                    "コーダーになるためにはどうすれば良いですか？",
                    "コーダーはスピード命です。なので早くコーディングするためには、ショートカットは必須です。ひたすらコードを書きましょう。",
                ],
                [
                    "業界の進歩が早くてついていくのが大変ではないですか？",
                    "置いて行かれないよう、SNSなどで情報収集は欠かさずにやってます。この業界、学ぶことをやめたらやっていけないと思います。",
                ],
                [
                    "職種が大きく変わってますが、転職の際不安はありましたか？",
                    "転職するって決めた時、今考えるとWebクリエイターになった自分になりたかったのかもしれません。",
                ],
                [
                    "どうやってお問い合わせすればいいですか？",
                    "ご用のある方はお手数ですが、Twitter@LirioYまでDMにてご連絡ください。",
                ],
            ],
        }}
    />
}

export const portfolioQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "portfolio/portfolio-ogp.png" }
      }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`


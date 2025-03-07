import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/common/img"
import { siteMetadata } from "../../gatsby-config"

import BreadCrumbList from "../components/common/bread-crumb-list"
import Card from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"
import "../scss/objects/components/_page-header.scss"
import Sns from "../components/blogs/sns"
import SideBar from "../components/common/sidebar"
import Insta from "../components/svg/Insta";
import X from "../components/svg/x";
import YouTube from "../components/svg/youtube";
import SlideShare from "../components/svg/slideshare";

const aboutMeta = {
  title: '【セブ島海外ノマド】フロントエンドエンジニアかみーゆを力一杯紹介します',
  description:
    "海外ノマドって何？エンジニアってどんな人でもなれるの？プログラマーって子どもいてもバツイチでも30歳過ぎていてもなれるの？生きていれば逆境なんて跳ね除けることはできます。",
  date: "2021-05-05",
  modifiedDate: "2021-05-05"
}

const aboutPost = ({location}) => {
  const pageTitle = aboutMeta.title
  const perfectUrl = `${siteMetadata.siteUrl}${location.pathname}`
  const perfectTitle = encodeURI(aboutMeta.title + "|" + siteMetadata.title)

  const breadCrumbList = {
    current: aboutMeta.title
  }

  return (
    <Layout location={location} title="銀ねこアトリエ">
      <header className={`c-page-header--common blog`} id="keyvisual">
        <div className="c-page-header__img">
          <Img source="common/about.jpg" className="p-pageHeader__img" />
        </div>
        <BreadCrumbList list={breadCrumbList} />
      </header>

      <div className="l-section l-container--article">
        <Sns url={perfectUrl} title={perfectTitle}></Sns>
        <div>
          <article className="c-article">
            <h1 className="c-article__heading">{pageTitle}</h1>
            <section itemProp="articleBody" className="c-post-body">
              <p>
                私はセブ島在住の海外ノマドでフロントエンドエンジニアのかみーゆです。
                <br />
                現在、ウェブサイト制作を中心に仕事をしています。
              </p>
              <Msg txt="このページにたどり着いたってことは少なくとも私・かみーゆに興味を持ってくださったんですね！ありがとうございます^ ^"></Msg>
              <p>よろしければもうちょっと、私のことを知ってみてください。</p>
              <h2>なんでフロントエンドエンジニアをやってるの？</h2>
              <p>
                私がなぜフロントエンドエンジニアの道を歩んだのか、経緯（いきさつ）をお話しさせていただきます。
              </p>
              <p>
                私は最初からエンジニアではなくて、途中キャリアチェンジしたクチです。
              </p>
              <h3>
                20代、イラストレーターになりたかった子どもの頃の夢をネイルに託した
              </h3>
              <p>
                うちは4人兄弟。絵の勉強をしたかったけど金銭的にもムリだと諦め、私でも受かる地元の大学へ行きました。
                <br />
                が、たった1年で中退。
              </p>
              <p>
                辞めた後はお金貯めて、専門学校かどこかでイラストの勉強したいと意気込んでました。
                <br />
                <br />
              </p>
              <p>
                でも、できちゃった婚でイラストレーターの夢を断念。
                <br />
                子育て中にネイルアートに出会いました。
              </p>
              <Msg
                txt="そうだ！！紙に描かなくても爪に描けばいいじゃん！"
                img="about/camille-y.jpg"
                name="かみーゆ（20代）"
              ></Msg>
              <p>夜間のネイリスト養成講座に通い、ネイリストになりました。</p>
              <p>
                ネイリスト1級はもちろん、NAIL EXPO
                2021で入賞することもできました。まあまあ頑張りました。
              </p>
              <p>
                <Img source="about/about1.jpg" />
              </p>
              <p>
                <small>
                  ※
                  古ぼけた写真は、2003年ネイルエキスポ2003にてトータルルックコンテスト4位入賞した時のもの。
                </small>
                <br />
                <br />
              </p>
              <p>
                人生って順調にいかないものですね。うちの子は喘息持ちでした。
                <br />
                <br />
              </p>
              <p>
                私は当時、ネイリスト講師として専門学校やキャリアスクールでもネイルを教えていました。
                <br />
                私の代わりがいないのでおいそれと休めず、おじいちゃん、おばあちゃんに頼りっきりでした。
              </p>
              <p>
                子どもが入院し、病院からスーツを着て出勤した時、自己嫌悪に陥ったこともありました。
              </p>
              <Msg
                txt="なんで私、子どもを犠牲にしてまで働いているんだろう。。。"
                img="about/camille-y.jpg"
                name="かみーゆ（20代）"
              ></Msg>
              <p>
                私じゃなくてもできる仕事ならこんな苦しい思いはしないはず。転職を決意し、しばらく美容インストラクターの仕事を見つけました。
              </p>
              <p>
                <small>※ ちなみにこの頃離婚しました。</small>
              </p>
              {/* <Msg
          txt="美容インストラクターなら今までのキャリアもいかせるかも！？"
          name="かみーゆ（20代）"
          img="about/camille-y.jpg"
        ></Msg> */}
              <p>
                世の中、甘くありませんでした。
                <br />
                業務は「美容インストラクター」とは名ばかりの営業で数字を追う日々でした。
                <br />
                しかし、社会保障と月々安定して入ってくる給料はバツイチ子持ちの私にとっては魅力そのものでした。
              </p>
              <Card id="/blogs/entry382/"></Card>
              <p>
                しばらくしてリーマンショックがありました。当然、私の所属してた会社の空気もサイアクに。
              </p>
              <Msg
                txt="既に死んでしまったキャリアなんてもういらない！<br>どうせなら新しいことを始めようかな。。。"
                img="about/camille-y.jpg"
                name="かみーゆ（20代）"
              ></Msg>
              <h3>
                30代。喘息の子どもに寄り添いたい。IT業界という新しい道へ
              </h3>
              <p>職業訓練校を経てIT業界へ転身しました。</p>
              <Msg
                txt="今はネットが使えどこでも仕事ができる時代。いざとなったら子どものそばにいることができる職種に転身したい！！"
                img="about/camille-m.jpg"
                name="かみーゆ（30代）"
              ></Msg>
              <p>
                EC（ネットショップ）の運用・レタッチャー（写真加工業務）からスタート。バツイチ・子持ち・未経験の私にはいいお給料の仕事はなかなか見つかりませんでした。
              </p>
              <p>
                時給のいい派遣を見つけ働き始めましたが、派遣切りされて泣く泣くフリーランスへ。
              </p>
              <p>
                周りの人と同じことをしていたらお金なんて稼げない。当時少なかった女性エンジニアになる！そしてさらに深く、プログラミングを勉強しました。
                <br />
                こんな無謀な私を見捨てなかった、助けてくれたの周りの人に今でも感謝しています。
              </p>
              <h3>再び、会社員へ</h3>
              <Msg
                txt="フリーランスは不安定だし不安。<br>子どもを最低限は進学させたいし、やっぱり会社員として再び働きたい。"
                img="about/camille-m.jpg"
                name="かみーゆ（30代）"
              ></Msg>
              <p>
                フリーランスで修羅場をくぐったおかげで力はつき、Web制作会社のフロントエンドエンジニアでテクニカルディレクターとして採用され、再び会社員として働くことになりました。
              </p>
              <p>
                <Img source="about/about2.jpg" />
              </p>
              <p>子どもとたくさん思い出も作ることができました。</p>
              <p>
                フリーランス時代も含めたくさんの人に教えられ、助けてもらいました。
              </p>
              <Msg
                txt="たくさんの人に助けてもらったなぁ。これからは教育にも力を注いで恩返ししたいな！"
                img="about/camille-m.jpg"
                name="かみーゆ（30代）"
              ></Msg>
              <p>教育に携わりたいので職業訓練校などの講師も始めました。</p>
              <h3>
                40代。子育てが落ち着いた！！独身の頃にできなかったことにチャレンジ
              </h3>
              <p>
                ひょんなことで、ヘッドハントされました。話すと長くなるので気になるかたはこちらをお読みください。
              </p>
              <Card id="/blogs/entry321/"></Card>

              <p>
                小さい頃、ぼんやり海外で働きたいと思ってたのもあり、好奇心もあり。
                <br />
                フィリピン・セブ島へ移住することにしました。
              </p>
              <Msg
                txt="よし！！<br>この先はMac Book Proとスーツケースだけで生きていこう！！"
                img="about/camille-o.jpg"
                name="かみーゆ（40代）"
              ></Msg>
              <p>
                セブ島ではエンジニア講師として採用されましたが、新規事業オフショア開発部門でブリッジSEへ。オフショア専任に。
              </p>
              <p>ところが、待っていたのは予想以上の激務でした。</p>
              <p>
                <small>※ この頃息子は日本に帰っちゃいました。</small>
              </p>
              <h2>立ち止まり、自分に向き合ったらいろんなものが見えてきた</h2>
              <p>
                私は人生の大半を子育てとキャリアの間で葛藤しつつ、全速力で駆け抜けながら生きてきました。
              </p>
              <p>そんな私に転機が訪れました。</p>
              <p>
                2020年コロナウィルスの蔓延によりフィリピンは世界最長のロックダウン（町の封鎖）を施行。
                <br />
                どこにも行けず、行動が制限されたおかげで自分を見つめ直す時間ができました。
              </p>
              <Msg
                txt="あれ？<br>なんで私、南の島まで来てすり減るほど仕事してるんだろう。。。"
                img="about/camille-o.jpg"
                name="かみーゆ（40代）"
              ></Msg>

              <p>
                数字を追い摩耗して生きていることに気づきました。
                <br />
                そして、退職。
              </p>
              <p>
                3か月限定で貯金を切り崩しながらセブ島で充電生活を満喫しました。
              </p>
              <Card id="/blogs/entry386/"></Card>

              <h2>仕事を辞めて、のんびりしたらやりたいことが見えてきた</h2>
              <p>人間は余裕ができると見えなかったものが見えてきます。</p>
              <p>
                フィリピンの貧困の現実、ロックダウンでさらに失業者増加。セブ島をより深く知ることができました。
              </p>
              <Msg txt="理不尽だなぁ。もっと若者にチャンスがあったらなぁ。"></Msg>

              <p>そんな時、同じ思いの仲間も見つかりました。</p>
              <Msg txt="会社を作れば、若者に雇用を生むことができる！<br>よし、こっちでオフショア会社を作ろう！"></Msg>

              <p>
                現在、仲間とオフショア会社を立ち上げるため奮闘中です。
                <br />
                会社設立の資金を貯めるべく、お仕事絶賛受け付けています。
              </p>
              <h2>私ができること・得意なこと</h2>
              <ol>
                <li>ウェブサイト（ホームページ）を作る</li>
                <li>WordPressやconcrete5などのCMSのカスタマイズ</li>
                <li>
                  Google スプレッドシートなどといろんなツールを連携（GAS）
                </li>
                <li>今あるウェブサイトを改善したり機能を追加</li>
              </ol>
              <h3>今までやってきたことをざっくりご紹介</h3>
              <p>多数ある実績の中からいくつかご紹介させていただきます。</p>
              <div className="box">
                <h4>既存サイトのスピード改善</h4>
                <p>
                  解決したお悩み：運用しているうちに、サイトの表示が遅くなった
                </p>
                <p>
                  重くなる原因を調査し、必要であれば圧縮や削除。結果サイト読み込み速度は7秒台から1秒台へ。
                </p>
                <p>作業期間：1週間程度</p>
              </div>
              <div className="box">
                <h4>複数の人で管理できるサイト</h4>
                <p>
                  解決したお悩み：1このドメインと1つの管理画面から複数の支部のサイトを管理したい
                </p>
                <p>
                  CMS
                  concrete5で権限を振り分け、10支部ぐらいある団体のマルチサイトを作成しました。
                  <br />
                  支部のお知らせ等はメインのサイトに出力できるようカスタマイズしました。
                </p>
                <p>作業期間：4か月程度</p>
              </div>
              <div className="box">
                <h4>WordPressの予約フォームとスプレッドシートを連携</h4>
                <p>
                  解決したお悩み：支店のあるパソコンスクールの予約をまとめるのが大変！
                </p>
                <p>
                  各自が決まった形式で入力できるスプレッドシートを作成。そのデータからカレンダーを生成、予約ができるようWordPressをカスタマイズしました。
                </p>
                <p>作業期間：半月程度</p>
              </div>
              <h2>私がみなさんにお約束できること</h2>
              <p>
                私の考えるプログラミングやウェブ制作とは、みなさんの「
                <strong>しなくていいお仕事を減らすこと</strong>」です。
              </p>
              <Msg txt="雑務に追われて本業に集中できないのはとても勿体無い。<br>そんな時こそ私に頼ってください。"></Msg>
              <p>
                みなさんの雑務を減らし、本業に集中できるような機能をホームページに実装します。
                <br />
                どんな機能がついたら便利か、嬉しいか、雑務が減るか、ぜひ一緒に考えさせてもらえたら幸いです。
              </p>
              <p>
                私はウェブサイト制作の相談を受けると 「
                <strong>どんな目的で制作するのか</strong>」
                、めちゃめちゃ突っ込んで聞きます。
              </p>
              <Msg txt="かっこいいだけじゃダメ！<br>人間もウェブサイトも中身が大事！成果が上がるウェブサイトを一緒に作りましょう。"></Msg>

              <p>
                ご依頼によっては断ることもあります。お金をかけるんだからなんとなく作るのは勿体無いです。
                <br />「
                <strong>どんなホームページが成果の上がるのか？</strong>
                」をぜひ一緒に考えさせてください。
              </p>
              <h2>ウェブサイト制作の仕事をしていて、一番喜しいこと</h2>
              <p>
                「こんな機能ほしかった！」
                <br />
                「提案してくれたおかげでスタッフのモチベーションも上がった！」
              </p>
              <p>やっぱり一番嬉しいのはお客様が喜んでくれた時です。</p>
              <p>
                今はビジネスパートナーとフリーで仕事をしていますが、この先は必ずこのフィリピンで同じ思いで働ける仲間を作る。たくさんの仲間とこの嬉しい気持ちを分かち合いたい。
              </p>
              <p>
                フィリピンでフロント技術ができるエンジニアを育て、
                フェアで対等に働ける環境を作るのが夢です。
              </p>
              <p>
                みなさんに寄り添い、ホームページ作りだけではなくIT技術でお悩みを解決しつつ、少しでもお役に立てるように頑張ります。
              </p>
              <h2>海外ノマドエンジニア・かみーゆはこんな人</h2>
              <div className="c-about-profile">
                <Img source="common/camille-pic.jpg" className="prfImg" />
                  <p className="c-about-profile__name">
                    <span >かみーゆ/ 神守　由理子</span>
                  <br />
                  （かみもり・ゆりこ） <br />
                  <small>かみーゆは「かみもり・ゆりこ」の略</small>
                </p>
                <p className="c-about-profile__roll">
                  フロントエンドエンジニア/会社運営
                </p>
                <p className="text-center">SNSのフォローよろしくお願いします！</p>
                <p className="c-about-profile__sns">
                <Link
                    to="https://twitter.com/LirioY"
                    target="_blank"
                    rel="noopener nofollow"
                    title="Twitter"
                  >
                    <X></X>

                  </Link>
                  <Link
                    to="https://www.instagram.com/yurico.k"
                    target="_blank"
                    rel="noopener nofollow"
                    title="Instagram"
                  >
                    <Insta></Insta>
                  </Link>
                  <Link
                    to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                    target="_blank"
                    rel="noopener nofollow"
                    title="YouTube"
                  >
                    <YouTube></YouTube>
                  </Link>
                  <Link
                    to="https://www2.slideshare.net/yurikamimori"
                    target="_blank"
                    rel="noopener nofollow"
                    title="SlideShare"
                  >
                    <SlideShare />
                  </Link>
                  </p>
              </div>
              <div className="box">
                <ul>
                  <li>4人兄弟の3番目</li>
                  <li>157cm（体重はセブに移住して3年くらい計ってない）</li>
                  <li>ソウルナンバー：33</li>
                  <li>尊敬する人：ラオウ</li>
                  <li>座右の銘：生きたいように生きて死にたいように死ぬ</li>
                  <li>
                    特技：細かい作業（米に字を描くとか）・イラスト・運動神経はいい方
                  </li>
                  <li>
                    好き：動物（特にネコ）・酒・眠る・歴史的建造物・肉・人・暖かいところ・麺類・RPGゲーム・北斗の拳・AKIRA・辛い物・タオラー
                  </li>
                  <li>
                    ニガテ：甘い物・搾取する人・マウント・通勤時間・長い会議・ビジネスメール・噂好き・虫
                  </li>
                  <li>
                    人生最後に迎えたいこと：「かみーゆさんと一緒にいて楽しかったなー」と周りに言われて死ぬ
                  </li>
                </ul>
                <p className="w300">
                  <Img source="about/about3.jpg" />
                </p>
              </div>
            </section>
          </article>
        </div>
        <SideBar
          title={aboutMeta.title}
          slug={'about'}
          location={location.pathname}
        >
        </SideBar>
      </div>
    </Layout>
  )
}

export default aboutPost

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ location }) => {
  const { title, description } = aboutMeta
  const list = [
    {
      name: title,
      path: '/about/',
      type: `WebPage`
    }
  ]
  return <Seo
    location={location.pathname}
    data={{
      // template: 'blog',
      title: title,
      template: 'blog',
      description: description,
      list: list,
      headerType: 'common'
    }}
  />
}


export const portfolioQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "about/about-ogp.jpg" }
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

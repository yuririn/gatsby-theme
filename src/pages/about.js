import React from "react"
import { Link, graphql } from "gatsby"

import { Article } from "../styles/blog-styles/article"
import { Sidebar } from "../styles/blog-styles/sidebar"
import { Edit } from "../styles/blog-styles/edit"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/common/img"
import FovoriteList from "../components/common/favorites"
import { siteMetadata } from "../../gatsby-config"

import BreadCrumbList from "../components/common/bread-crumb-list"
import CvArea from "../components/common/cv-area"
import Card from "../components/blogs/blog-parts/relative-card"
import Msg from "../components/blogs/blog-parts/msg"

const aboutMeta = {
    title: '【セブ島海外ノマド】フロントエンドエンジニアかみーゆを力一杯紹介します',
    description:
        "海外ノマドって何？エンジニアってどんな人でもなれるの？プログラマーって子どもいてもバツイチでも30歳過ぎていてもなれるの？生きていれば逆境なんて跳ね除けることはできます。",
    date: "2021-05-05",
    modifiedDate: "2021-05-05"
}

const aboutPost = () => {
  const pageTitle =
    "【セブ島海外ノマド】フロントエンドエンジニアかみーゆを力一杯紹介します"

  return (
    <Layout location="about" title="銀ねこアトリエ">
      <div className="p-pageHeader">
              <div className="p-pageHeader__main" id="keyvisual">
          <h1 className="p-pageHeader__heading">About Me</h1>
          <p className="p-pageHeader__content">かみーゆってどんな人？</p>
        </div>
        <Img source="common/about.jpg" className="p-pageHeader__img" />
      </div>
      <BreadCrumbList type="blog" />
      <Body>
        <Article>
          <article className="p-section">
            <div className="l-container">
              <h1 className="c-article__heading">{pageTitle}</h1>
            </div>
            <div className="l-container">
              <Edit>
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
                <ProfImg>
                  <Img source="common/camille-pic.jpg" className="prfImg" />
                </ProfImg>
                <p className="text-center">
                  <span className="bold">かみーゆ/ 神守　由理子</span>
                  <br />
                  （かみもり・ゆりこ） <br />
                  <small>かみーゆは「かみもり・ゆりこ」の略</small>
                  <br />
                  <span className="bold">フロントエンドエンジニア</span>
                </p>
                <p className="text-center">
                  SNSのフォローよろしくお願いします！
                </p>
                <p className="text-center about-sns">
                  <Link
                    to="https://twitter.com/LirioY"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="twitter"
                      className="svg-inline--fa fa-twitter fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      hegiht="20"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      ></path>
                    </svg>
                    LirioY
                  </Link>

                  <Link
                    to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="youtube"
                      className="svg-inline--fa fa-youtube fa-w-18 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="20"
                      hegiht="20"
                    >
                      <path
                        fill="currentColor"
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                      ></path>
                    </svg>
                    かみーゆちゃんねる
                  </Link>
                </p>
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
                <CvArea></CvArea>
              </Edit>
            </div>
          </article>
        </Article>

        <Sidebar>
          <section className="p-section">
            <h2 className="p-heading--lg--side">ジャンル</h2>
            <ul className="sideCateList">
              {siteMetadata.category.map(item => {
                return (
                  <li>
                    <Link to={`/blogs/${item.slug}/`}>{item.name}</Link>
                  </li>
                )
              })}
            </ul>
          </section>
          <div className="inner">
            <ul className="side-banner">
              <li>
                <Link
                  to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                  target="_blank"
                  rel="noopener"
                >
                  <Img source="common/youtube-banner.jpg" />
                </Link>
              </li>
              <li>
                <Link
                  to="https://itnomikai.com/event/cebu"
                  target="_blank"
                  rel="noopener"
                >
                  <Img source="common/it-nomikai-cebu.jpg" alt="セブIT飲み会" />
                </Link>
              </li>
              <li>
                <Link to="/about/">
                  <Img
                    source="common/about-banner.jpg"
                    alt="かみーゆを力一杯紹介"
                  />
                </Link>
              </li>
            </ul>
            <h2>お仕事のご依頼</h2>
            <p className="u-text-center">
              <a className="p-btn--detail" href="/contact/">
                相談する
              </a>
            </p>
            <p className="u-text-center">
              <small>初見の方、30分無料相談承っております。</small>
            </p>
          </div>
        </Sidebar>
        <div className="p-section l-container">
          <FovoriteList type="web" />
          <FovoriteList type="life" />
          <FovoriteList type="career" />
        </div>
      </Body>
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
            description: description,
            list: list
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
const ProfImg = styled.div`
  * {
    margin: 0 auto;
  }
`
const Body = styled.div`
  prfImg {
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    position: relative;
    max-width: 1120px;
    margin: 0 auto;
    flex-wrap: wrap;
  }
`

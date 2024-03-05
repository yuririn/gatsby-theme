import React from "react"
import { Link } from "gatsby"
import Img from "../../components/img"

import styled from "styled-components"

const Works = () => (
  <Grid>
    <Article>
      <section>
        <h3>人材プロジェクトアシ</h3>
        <p>
          広島県の人材育成プロジェクトのアシスタントをしていました。2年長かったー。気がついたらいつの間にかドメインMAされていて心の底からおったまげーション。
        </p>
      </section>
      <Img source="portfolio/hirohata.jpg" className="img"></Img>
    </Article>
    <Article>
      <Link to="/blogs/entry279/">
        <section>
          <h3>ITセミナー</h3>
          <p>
            2018/10/6広島で『Googleに聞きたい！
            検索エンジンQ&A』開催。Google検索エンジンエバンジェリスト金谷氏と「海外SEO情報」の鈴木氏をお迎えし、100名の集客に成功。
          </p>
        </section>
        <Img source="thumbnail/2018/entry279.jpg" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link to="/blogs/tags/CSS/">
        <section>
          <h3>テック記事</h3>
          <p>
            テック記事で某有名なオンラインスクールからオファーをいただいたこともありました。1記事月間5000pv稼ぐことも。
          </p>
        </section>
        <Img source="thumbnail/2020/entry393.png" className="img"></Img>
      </Link>
    </Article>

    <Article>
      <section>
        <h3>工作</h3>
        <p>
          大人が段ボールで鎧をつくったら楽しいか検証したくて会社の同僚とやってみました。面白そうなことがあったら、体を張ります。
        </p>
      </section>
      <Img source="portfolio/danball.jpg" className="img"></Img>
    </Article>
    <Article>
      <Link to="https://dream-tech.jp/" target="_blank" rel="noopener nofollow">
        <section>
          <h3>保守・運用</h3>
          <p>
            子どもプログラミングスクールのWebサイトの保守運用を行なっています。大好きなお客様には命がけで寄り添います。
          </p>
        </section>
        <Img source="portfolio/happy-chime.jpg" className="img"></Img>
      </Link>
    </Article>

    <Article>
      <Link to="/blogs/entry356/">
        <section>
          <h3>ITセミナー登壇</h3>
          <p>
            2020/2/2に広島に帰省し、オフショアの話しました。コロナの営業で開催が危ぶまれましたが、80人ぐらいの方にご参加いただきました。
          </p>
        </section>
        <Img source="thumbnail/2020/entry356.png" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link to="/blogs/entry357/">
        <section>
          <h3>速度改善の提案</h3>
          <p>
            セブ島のSEO勉強会でWebサイト速度改善方法についてお話しさせていただきました。速度改善で20位以上改善した実績あります。
          </p>
        </section>
        <Img source="thumbnail/2020/entry357.jpg" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <section>
        <h3>爆速コーディング</h3>
        <p>
          当時勤めていた会社のLPがなくて営業が困っていたので土日返上して2日でLP作成。仲間を思ったかみーゆ最強。
        </p>
      </section>
      <Img source="portfolio/nexseed_labo.jpg" className="img"></Img>
    </Article>
    <Article>
      <Link to="/blogs/entry369/">
        <section>
          <h3>キャリアアドバイス</h3>
          <p>
            キャリアに悩んでいる元同僚に対して書いた記事。自分で限界を決めないで、30才過ぎてもプログラマーになれる。
          </p>
        </section>
        <Img source="thumbnail/2020/entry369.jpg" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link to="/blogs/entry389/">
        <section>
          <h3>現地レポート</h3>
          <p>
            セブ島の台所・カーボンマーケットに潜入し地域の様子を取材してきました。
          </p>
        </section>
        <Img source="thumbnail/2020/entry389.jpg" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link to="/">
        <section>
          <h3>静的サイトジェネレーター</h3>
          <p>
            当「銀ねこアトリエ」をGatsbyでフロントエンド魂をかけてリニューアル。GitHubでのデプロイ連携。SPAでもあるので表示サクサク。
          </p>
        </section>
        <Img source="portfolio/ginneko.jpg" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link
        to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
        target="blank"
        rel="noopener nofollow"
      >
        <section>
          <h3>YouTube配信</h3>
          <p>
            2021年頭にセブ島でオフショアビジネスを始めるのでYouTube配信始めました。ビジネスパートナーの撮影するクオリティサイコー。
          </p>
        </section>
        <Img source="thumbnail/2020/entry415.jpg" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link
        to="https://daredemohero.com/"
        target="blank"
        rel="noopener nofollow"
      >
        <section>
          <h3>ボランティア団体でプロボノ</h3>
          <p>
            セブで一番ハイボールを作るのがうまいボランティア団体の代表に餌付けされてプロボノ活動するようになりました。
          </p>
        </section>
        <Img source="portfolio/daredemo-hero.png" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link to="https://lenz-ph.com/" target="blank" rel="noopener nofollow">
        <section>
          <h3>勢い余って海外で会社設立</h3>
          <p>
            フィリピン・セブ島で勢い余って会社つくっちゃいました。仕事ください。
          </p>
        </section>
        <Img source="portfolio/lenz.png" className="img"></Img>
      </Link>
    </Article>
    <Article>
      <Link to="https://ja-cebu.com/" target="blank" rel="noopener nofollow">
        <section>
          <h3>セブ日本人会のサイト作製</h3>
          <p>
            セブ日本人会の新しい理事長（日系セブ最大英語学校の経営者）に頼まれ、サイトを数日で作りました。死ぬかと思いました。
          </p>
        </section>
        <Img source="portfolio/jac.png" className="img"></Img>
      </Link>
    </Article>
  </Grid>
)

export default Works

const Grid = styled.div`
  margin-top: 30px;
  @media screen and (min-width: 426px) {
    display: flex;
    flex-wrap: wrap;
  }
`
const Article = styled.article`
  padding: 10px 3px 3px;
  border: 8px solid #eee;
  margin-bottom: 4px;

  @media screen and (min-width: 426px) {
    width: 50%;
    padding: 1px;
    position: relative;
    overflow: hidden;
    font-size: 1.4rem;
    border: none;
    margin-bottom: 0;
  }
  @media screen and (min-width: 768px) {
    width: 33.333%;
  }
  @media screen and (min-width: 1200px) {
    width: 25%;
  }
  .img {
    width: 100%;
    display: block;
    margin-top: 10px;
    @media screen and (min-width: 426px) {
      display: block;
      transition: 0.3s;
      margin-top: 0;
    }
  }
  @media screen and (min-width: 768px) {
    &:hover {
      .img {
        transform: scale(1.2) rotate(-5deg);
      }
      section {
        opacity: 1;
      }
    }
  }

  a {
    text-decoration: none;
    color: #333;
  }
  section {
    @media screen and (min-width: 426px) {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      z-index: 1;
      opacity: 0;
      color: #ffffff;
      transition: 0.3s;
      background: rgba(0, 0, 0, 0.8);
      font-size: 1.4rem;
    }
    @media screen and (min-width: 768px) {
      padding: 20px;
      font-size: 1.6rem;
    }
  }
  h3 {
    padding: 10px;
    font-weight: bold;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 5px;
    @media screen and (min-width: 426px) {
      font-size: 1.6rem;
      margin-bottom: 5px;
    }
    @media screen and (min-width: 768px) {
      margin-bottom: 10px;
      font-size: 2rem;
    }
    @media screen and (min-width: 1200px) {
    }
  }
  p {
    padding: 0 10px;
  }
`

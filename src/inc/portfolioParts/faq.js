import React from "react";
import styled from "styled-components";

const Faq = () => (
  <FaqList>
    <dt>コーダーになるためにはどうすれば良いですか？</dt>
    <dd>
      コーダーはスピード命です。なので早くコーディングするためには、ショートカットは必須です。ひたすらコードを書きましょう。お気に入りのサイトを模写してコーディングするのもオススメです。コーダーなりたての頃はよくやっていました。
    </dd>
    <dt>業界の進歩が早くてついていくのが大変ではないですか？</dt>
    <dd>
      はい、大変です。
      <br />
      置いて行かれないよう、SNSなどで情報収集は欠かさずにやってます。この業界、学ぶことをやめたらやっていけないと思います。泳ぐのをやめたマグロと一緒です。
    </dd>
    <dt>職種が大きく変わってますが、転職の際不安はありましたか？</dt>
    <dd>
      はい、ありました。
      <br />
      転職するって決めた時、今考えるとWebクリエイターになった自分になりたかったのかもしれません。だんだんクリエイターになるのではなく、もっとキレイなコードを書いたりいろんな実装ができるようになりたいと強く思うようになり、いつのまにかクリエイターになっていました。今では三度の飯よりコードを書くのが好きになりました。
    </dd>
    <dt>好きな食べ物はなんですか？</dt>
    <dd>肉とビールです。肉があればビールが3杯は飲めます。</dd>
    <dt>バケモノって言われるらしいですが、一体何歳なんですか？</dt>
    <dd>実年齢はお答えできません。精神年齢は13歳で止まりました。</dd>
    <dt>どんなタイプの男性が好きなんですか？</dt>
    <dd>
      一緒にいて楽しい人がいいですね。強いて言えばムロツヨシや大泉洋です。いい人がいれば紹…
    </dd>
  </FaqList>
);

export default Faq;

const FaqList = styled.dl`
  margin-top: 30px;
    background: #fff;
      padding: 30px 30px 1px;
      border-radius: 20px;

      max-width: 900px;
      margin: 0 auto 30px;
  }
  dt {
      margin-bottom: 10px;
      font-size: 2rem;
      font-weight: bold;
      padding-left: 2em;
      position: relative;
  }
  dd {
      margin-bottom: 30px;
      position: relative;
      margin-left: 0;
      padding-left: 36px;
  }
  dt::before {
      font-family: 'Archivo Black', sans-serif;
      top: 3px;
      left: 0;
      border-radius: 50%;
      content: 'Q';
      width: 30px;
      text-align: center;
      line-height: 30px;
      height: 30px;
      color: #fff;
      background: #e95014;
      display: block;
      position: absolute;
      text-align: center;
  }
  dd::before {
      font-family: 'Archivo Black', sans-serif;
      font-weight: bold;
      font-size: 2rem;
      left: 0;
      border-radius: 50%;
      content: 'A';
      width: 28px;
      text-align: center;
      line-height: 28px;
      height: 28px;
      color: #e95014;
      border: 1px solid #e95014;
      background: #fff;
      display: block;
      position: absolute;
      text-align: center;
  }
  /* メディアクエリ */
  @media screen and (min-width: 768px){
    dt {
      margin-bottom: 10px;
      font-size: 2rem;
      font-weight: bold;
      padding-left: 2em;
      position: relative;
    }
    dd {
      margin-bottom: 50px;
      margin-left: 20px;
    }
  }
`;

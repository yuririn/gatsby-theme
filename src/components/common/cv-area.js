import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";

const cvArea = () => {
  return (
    <Area>
      <h2>\ お仕事の依頼はこちら /</h2>
      <p>
        初見の方は必ずオンラインミーティング（30分以内：無料）を実施させていただきます。
        <br />
        本当にその機能や実装が必要かなど、し〜〜っかりお話しさせていただいた上でお見積もりをさせていただきます。
        オンラインミーティング（~30分：無料）の
        <em>ご希望日時の候補を3つ</em>
        ほど「メッセージ」に明記の上お問い合わせフォームをご送信ください。
      </p>
      <p>
        <small>
          ※
          お問い合わせ内容によってはご希望に添えないこともございます。ご了承くださいませ。
        </small>
      </p>
      <p class="u-text-center">
        <Link class="p-btn--detail" to="/contact/">
          無料で相談する
        </Link>
      </p>
    </Area>
  );
};
export default cvArea;

const Area = styled.div`
  margin-top: 30px;
  padding: 40px 40px 10px;
  background: #eeeeee;
  border-radius: 16px;

  h2 {
    padding-top: 30px;
    text-align: center;
    &::after {
      content: none;
    }
  }
`;

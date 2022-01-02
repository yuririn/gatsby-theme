import React from "react";

import styled from "styled-components";

const Fearure = () => {
  return (
        <Lists>
            <li className="S">イラスト</li>
            <li className="S">画像加工</li>
            <li>Adobe XD</li>
            <li className="SS">Adobe Illustorator</li>
            <li className="SS">Adobe Photoshop</li>
            <li className="LL">HTML/CSSのコーディング</li>
            <li className="L">Sass(SCSS)</li>
            <li className="L">Pug(旧：Jade)</li>
            <li>Gulp</li>
            <li>バニラJS</li>
            <li className="S">VueJS</li>
            <li>WordPressサイト構築</li>
            <li className="L">concrete5サイト構築</li>
            <li className="SS">Vagrant</li>
            <li className="L">メイク</li>
            <li className="LL">ネイル（ネイリスト検定1級）</li>
            <li className="L">おいしいハンバーク料理</li>
            <li>ブリッジ</li>
            <li>前後開脚</li>
            <li className="LL">プランク２分以上</li>
            <li>出来損ないの転回</li>
            <li>ビサヤと英語をブレンドしたジョーク</li>
        </Lists>

  );
};

export default Fearure;

const Lists = styled.ul`
    padding: 30px;
    background: #fff;
    border-radius: 15px 20px;
    margin-top: 30px;
    max-width: 900px;
    margin: 0 auto 30px;
    li {
        font-weight: bold;
        display: inline-block;
        margin-right: 10px;
        &::after {
            content: ',';
        }

        &:last-child::after {
            content: none;
        }

        &.SS {
            font-size: 0.7em;
        }
        &.S {
            font-size: 0.9em;
        }
        &.LL {
            font-size: 1.3em;
        }
        &.L {
            font-size: 1.1em;
        }
    }
`


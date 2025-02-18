import React, {useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components"
import AccessCounter from '../inc/404/access-counter'
import Charactors from '../inc/404/charactor'
import ShowMessage from '../inc/404/show-message'
import { P404 } from "./../styles/P404"
import Seo from "../components/seo"

const aboutMeta = {
    template: 'page',
    title: 'このページは宇宙の彼方へ消えました',
    description: `お探しのページは見つかりませんでした。`
}

const NotFoundPage = ({ data, location }) => {
    const [scenario, setScenario] = useState(0);
    const [kyle, getKyle] = useState(3);
    const action = (e) => {
        setScenario(e)
    }

    useEffect(() => {
        if(parseInt(localStorage.getItem('kyle')) >= 0) {
            getKyle(parseInt(localStorage.getItem('kyle')))
        }
    },[kyle])

    return <>
        <GlobalStyle/>
        <div className="global-wrapper" id="top">

            <div id="header">
                <header>
                <h1>銀ねこアトリエ</h1>
                <nav>
                <p>☆めにゅ〜☆</p>
                <a href="/">とっぷぺ〜じ</a>
                <button onClick={()=> action(1)}>ヒントを教えてもらう</button>
                <a href="/blogs">ブログをよむ</a>
                <button onClick={()=> action( kyle > 0 ? 6 : 10)}>Webサイト博物館（工事中）</button>
                <button onClick={()=> action( kyle > 0 ? 2 : 9)}>見習い魔導師を召喚</button>
                {kyle < 3 && kyle > 0 && <button onClick={()=> alert(`カイルのライフは残り ${kyle} です。`)}>カイルのライフ</button>}
                </nav>
                </header>
            </div>
            <main className={scenario === 7 ? 'death':''}>
                <P404>
                    <h2 className="title">お探しのページは見つかりませんでした</h2>
                    <AccessCounter/>
                    <Charactors scenario={scenario}/>
                    <div className="msgBaloon">
                        <ShowMessage scenario={scenario} setScenario={setScenario}getKyle={getKyle}></ShowMessage>
                    </div>
                </P404>
            </main>
        </div>
    </>
}
export default NotFoundPage

export const Head = ({ data, location }) => {
const { title, description } = aboutMeta
const list = [
    {
        name: '',
        path: '/404/',
        type: `WebPage`
    }
]
return <Seo
    location={location.pathname}
    data={{
        // template: 'page',
        title: title,
        description: description,
        list: list,
        is404: true
    }}
/>
}

const GlobalStyle = createGlobalStyle`
    main.death {
        animation: bg .3s infinite;
        & > * {
            animation: butuburu .3s infinite;
        }
    }
    @keyframes bg {
        0% {
            background: #000;

        }

        25% {
            background: #651395;

        }

        50% {
            background: #7e0d94;

        }

        75% {
            background: #651395;

        }

        100% {
            background: #000;

        }
    }
    @keyframes butuburu {
        0% {

            transform: translate(0px, 0px) rotateZ(0deg)
        }

        25% {

            transform: translate(2px, 2px) rotateZ(1deg)
        }

        50% {

            transform: translate(0px, 2px) rotateZ(0deg)
        }

        75% {

            transform: translate(2px, 0px) rotateZ(-1deg)
        }

        100% {

            transform: translate(0px, 0px) rotateZ(0deg)
        }
    }
    @font-face {
        font-family: PixelMplus12-Bold;
        src: url('/fonts/PixelMplus12-Bold.ttf') format("truetype");
    }
    @font-face {
        font-family: PixelMplus12-Regular;
        src: url('/fonts/PixelMplus12-Regular.ttf') format("truetype");
    }
    .global-wrapper {
        font-family: PixelMplus12-Regular;
         @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: 300px 1fr;
        }
        background: #000;
        min-height:100vh;
        position: relative;
    }
    #header {
        text-align: center;
        background: #0013A3;
        border: 1px solid #fff;
        @media screen and (min-width: 768px) {
        border-right: 1px solid #fff;
        }
    }
    header {
        color: #fff;
        padding: 8px;
        position: sticky;
        top: 0;
        left: 0;
         h1 {
            padding: 24px 16px;
             margin: 0 0;
             border: 1px solid #fff;
             font-family: PixelMplus12-Bold;
             margin-bottom: 8px;
             font-size: 18px;
             @media screen and (min-width: 768px) {
                  font-size: 20px;
              }
         }
         nav{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            p {
                width: 100%;
            }
         }
         button, a {
            padding: 8px 16px;
            border: 1px solid #fff;
            display: block;
            text-decoration: none;
            color: #fff;
            width: calc(50% - 4px);
            background: none;
            @media screen and (min-width: 768px) {
                width: 100%;
            }
         }
    }
    footer {
        color: #fff;
        padding: 8px;
        background: #0013A3;
        border-right: 1px solid #fff;
        p {
            border: 1px solid #fff;
            text-align: center;
        }
    }
`

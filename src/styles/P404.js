import styled from "styled-components"

export const P404=styled.section`
width: 100%;
padding: 24px;
color: #fff;
 animation: fadeIn .5s forwards;
 line-height:1.8;
 p {
    line-height: 1.8;
 }
.title {
    text-align: center;
    color: #fff;
    font-size: 24px;
    padding: 24px 16px;
    margin: 0 0;
    font-family: PixelMplus12-Bold;
    @media screen and (min-width: 768px) {
         font-size: 32px;
     }
}
.text--center {
    text-align: center;
}
.hidden {
    display: none;
}
ul {
    padding-left: 0;
}
.p-tagList__item a{
    font-size: 15px;
    background: #fff;
    color: #000;
}

.menu {
    display: block;
    margin-top: 40px;
    li {
        text-align: center;
        list-style: none;
        margin-bottom: 16px;
    }
    a,button {
        text-decoration: none;
        border: none;
        padding: 4px 16px;
        background: yellow;
        &:hover {
            background: rgb(255, 0, 0);
            cursor: pointer;
        }
    }
}
.accessCounter {

    &__wrapper {
        text-align: center;
    }
    display: inline-flex;
    background: linear-gradient(to bottom, #ff0000 0%, #370202 100%);
    span {
        color: #fff;
        border: 1px solid #fff;
        line-height: 1;
        display: block;
        padding: 8px 6px;
        font-size: 18px;
        height: 36px;
        width: 24px;
        box-shadow: inset 0 0 5px #000;
        @media screen and (min-width: 768px) {
            padding: 8px 10px;
            height: 42px;
            width: 32px;

            font-size: 24px;
        }
        & + span {
            border-left: none;
        }
    }
    padding: 4px;
    margin: 0 16px;
    border: 1px solid #fff;
}
.camille {
    margin: 0 auto 32px;
    height: 100px;
    width: 100px;
    display: block;
    animation: camille 1.2s steps(4) infinite;
    background: url(/images/camille.png) 0 0 / 100% auto;
}
.irukaDive__wrapper .camille {
    background: none;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    position: absolute;
    opacity: 0;
    animation: fadeIn .5s 4s forwards;
    span {
         height: 100px;
         width: 100px;
         display: block;
         animation: camille 1.2s steps(4) infinite;
         background: url(/images/camille.png) 0 0 / 100% auto;
    }

}
.fadeIn {
    animation: fadeIn 1s forwards;
}
.iruka {
    position: relative;
    display: block;
    height: 100px;
    width: 100px;
    animation: fadeIn 1s forwards, fuwafuwa 3s infinite;
    margin: 30px auto 0;
}
.iruka span{
    height: 100px;
    width: 100px;
    display: block;
    animation: iruka .8s steps(2) infinite;
    background: url(/images/iruka.png) 0 0 / 100% auto;
}
.irukaDive {
    margin: 0 auto;
    height: 100px;
    width: 100px;
    display: block;
    opacity: 0;
    animation: dive 3s 1;
}
.irukaDive span{
    height: 100px;
    width: 100px;
    display: block;
    animation: iruka .8s steps(2) infinite;
    background: url(/images/iruka.png) 0 0 / 100% auto;
}
.irukaDive__wrapper {
    padding-top: 70px;
    width: 200px;
    margin: 0 auto;
    height: 150px;
    overflow: hidden;
    position: relative;
    z-index: 1;

}
.gameOver {
    text-align:center
}
.splash {
    width: 200px;
    height: 30px;
    margin: 0 auto;
    position: relative;
    &::after {
        opacity: 0;
        animation: splash 2s 1s 2;
        display: block;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        background: radial-gradient(transparent, black);
        content: '';
    }
    &::before {
        opacity: 0;
        animation: splash 2.5s 1s 2;
        content: '';
        left: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        transform: scale(0);
        background: radial-gradient(transparent, black);
        position: absolute;
    }
}
.header {
    opacity: 0;
    margin-top: 50px;
    letter-spacing: 0.5em;
    font-size: 42px;
    text-align: center;
    animation: fadeIn .5s forwards;
}
.msgBaloon {
    padding: 8px 24px;
    max-width: 800px;
    border: 2px solid #fff;
    margin: 0 auto;
    border-radius: 8px;
}
@keyframes camille {
    to {
        background-position: 0 -400px;
    }
}
@keyframes iruka {
    to {
        background-position: 0 -200px;
    }
}
@keyframes fuwafuwa {
    0% {
        transform: translateY(0px);
    }
    50% {

        transform: translateY(5px);
    }
    100% {
        transform: translateY(0px);
    }
}
@keyframes splash {
    50% {
        opacity: 1;
         transform: scale(0);
    }
    100%{
        opacity: 0;
        transform: scale(3);
    }
}
@keyframes dive {
    0% {
        opacity: 1;
        transform: translate(50px,0) rotate(0);
    }
    60% {
        opacity: 1;
        transform: translate(0,-50px) rotate(-120deg);
    }
    100% {
        opacity: 0;
        transform: translate(0,230px) rotate(-110deg);
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
`

import styled from "styled-components"

export const Article = styled.article`
    margin-top: 50px;
    background #fff;
    border-radius:16px;
    padding: 16px;
    margin-top: 30px;
    @media screen and (min-width: 768px) {
         margin-top: 50px;
         border-radius: 24px;
         width: calc(100% - 250px);
         padding: 32px 32px 40px;
        }
        @media screen and (min-width: 1020px) {
         padding: 32px 52px 40px;
     }
     .ads {
      margin: 24px 0;
     }
    .c-pager {
        margin-top: 40px;
        margin-bottom: 40px;
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        justify-content: space-between;
        gap:16px;

    }

    .c-pager__prev,
    .c-pager__next {
        @media screen and (min-width: 768px) {
            width: calc(50% - 8px);
        }
        line-height: 1.8;

        a {
            align-items: center;
            border: 2px solid var(--color-deep);
            padding: 15px;
            background: #fbfafa;
            position: relative;
            background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
            box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
            border-radius: 10px;
            display: flex;
            flex-wrap: wrap;
            font-weight: bold;
            text-decoration: none;
            color: var(--color-deep);
            min-height: 60px;
            span {
                font-size: 14px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            &::before {
                z-index: 1;
                font-size: 12px;
                color: #fff;
                background: var(--color-deep);
                position: absolute;
                top: -5px;
                line-height: 1;
                padding: 3px 8px;
            }
            @media screen and (min-width: 768px) {
                &:hover {
                    box-shadow: 1px 1px 10px rgb(0 0 0 / 20%);
                }
            }
        }
        figure {
            position: absolute;
            display: block;
            height: 60px;
            width: 80px;
            img {
                object-fit: contain;
            }
            aspect-ratio: 4/3;
        }

    }
    .gatsby-resp-image-wrapper {
        margin-bottom: 1.5em;
        margin-top: 1.5em;
    }

    .c-pager__prev {
        margin-left: auto;
        a {
            padding-left: 110px;
            &::before {
                position: absolute;
                content: 'PREV';
                right: -5px;
                top: -5px;
            }
        }
        figure {
            top: calc(50% - 30px);
            left: 16px;
        }
    }
    .c-pager__next {
        a {
            padding-right: 110px;
            &::before {
                position: absolute;
                content: 'NEXT';
                left: -5px;
                top: -5px;
            }
        }
        figure {
            top: calc(50% - 30px);
            right: 16px;
        }

    }

    .c-tag {
        margin-bottom: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        position: relative;
        @media screen and (min-width: 768px) {
        padding-left: 100px;
        }
        dt {
            display: block;
            color: #4b3933;
            font-size: 14px;
            font-weight: bold;
            margin-right: 18px;
            display: flex;
            width: 100%;
            height: 24px;
            @media screen and (min-width: 768px) {
                position: absolute;
                left: 0;
                top: 0;
            }
            align-items: center;
        }
        dd {
            a {
                height: 24px;
                align-items: center;
                display: flex;
                color: #4b3933;
                text-decoration: none;
                padding: 0 16px;
            }
            align-items: center;
            display: flex;
            height: 24px;
            font-size: 14px;
            font-weight: bold;
            display: inline-block;
            border-radius: 8px;
            border: 1px solid #4b3933;
        }
    }




    iframe {
        display: block;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    @media screen and (min-width: 1020px) {
        width: calc(100% - 300px);
    }
    .c-article__date {
        display: flex;
        margin-top: 10px;
        margin-bottom: 24px;

        @media screen and (min-width: 768px) {
            margin-bottom: 32px;
        }

        dt {
            width: 80px;
            font-weight: bold;
        }
    }
    h1 {
        margin-top: 0;
        font-size: 20px;
        line-height: 1.2;
        margin-bottom: 16px;
        @media screen and (min-width: 768px) {
          font-size: 32px;
      }
    }
    .hero {
        text-align: center;
        margin-bottom: 24px;
    }
    .article-body {
            a:not([class]) {
                color: var(--color-sec);

                &:hover {
                    text-decoration: none;
                }
                }
        p {
        margin: 1.5em 0;
        }
        line-height: 2.2;
        h4 {
            line-height: 1.4;
            font-size: 18px;
            margin-bottom: 16px;
            margin-top: 24px;
            position: relative;
            color: var(--color-deep);
        }

        h3 {
        line-height: 1.4;
        font-size: 18px;
         margin-bottom: 16px;
         margin-top: 24px;
          border-bottom: #ddd solid 2px;
          padding-bottom: 16px;
          position: relative;
        &::before {
            position: absolute;
            content: '';
            bottom: -2px;
            left: 0;
            width: 80px;
            display: block;
            height: 2px;
            background: var(--color-deep);
        }
        @media screen and (min-width: 768px) {
          font-size: 22px;
          margin-bottom: 24px;
          margin-top: 40px;
        }//media query
    }
    blockquote {
        background: #eee;
        padding: 16px;
        @media screen and (min-width: 768px) {
            padding: 24px;
        }
        margin-bottom: 24px;
        &> *:last-child {
            margin-bottom: 0;
        }

        h3,
        h4 {
            margin-bottom: 8px;
            margin-top: 0;
            font-size: 17px;
        }
    }
    .box {
        line-height: 1.8;
        box-shadow: 1px 1px 5px rgba(0,0,0, .2);
        border: var(--color-deep) solid 2px;
        margin-top: 32px;
        padding: 16px;
        border-radius: 16px;
        background: #fbfafa;
       background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
       background-size: 7px 7px;
        margin-bottom: 32px;
        position: relative;
        p:first-child {
            margin-top: 0;
        }
        .title {
            background: var(--color-deep);
            font-weight: bold;
            color: #fff;
            margin: -16px -16px 16px;
            display: block;
            border-top-left-radius: 11px;
            border-top-right-radius: 11px;
            padding: 4px 16px 4px 40px;
            font-size: 17px;
            position: relative;
            ::before {
                content: '';
                background: #fff;
                width: 20px;
                top: calc(50% - 10px);
                height: 20px;
                display: block;
                border-radius: 50%;
                left: 16px;
                position: absolute;
            }
            ::after {
                left: 22px;
                top: calc(50% - 7px);
                transform: rotate(45deg);
                border-bottom: 3px solid var(--color-deep);
                border-right: 3px solid var(--color-deep);
                content: '';
                position: absolute;
                text-indent: 0;
                width: 4px;
                height: 10px;
            }
            @media screen and (min-width: 768px) {
                margin: -24px -24px 16px;
               padding: 6px 24px 6px 48px;
               ::before {
                left: 20px;
               }
               ::after {
                   left: 26px;
               }

             }
        }
        ul, ol {
            &:last-child {
                margin-bottom: 0;
            }
            li:last-child {
                margin-bottom: 0;
            }
        }
        @media screen and (min-width: 768px) {
            padding: 24px;
        }
    }

    h2 {
        line-height: 1.4;
        border-bottom: var(--color-deep) solid 2px;
        border-top: var(--color-deep) solid 2px;
        font-size: 20px;
        margin-bottom: 24px;
        margin-top: 16px;
        position: relative;
        padding-bottom: 16px;
        padding-top: 16px;

        &::before {
            position: absolute;
            content: '';
            bottom: -16px;
            left: 24px;
            border-top: 16px solid var(--color-deep);

            border-left: 16px solid transparent;
            border-right: 16px solid transparent;
            @media screen and (min-width: 768px) {
                left: 40px;
            }

        }
        @media screen and (min-width: 768px) {
            margin-bottom: 32px;
            margin-top: 32px;
            font-size: 24px;
            padding-bottom: 24px;
            padding-top: 24px;
        }

    }
     *~h2 {
         margin-top: 32px;

         @media screen and (min-width: 768px) {
             margin-top: 40px;
         }

         //media query
     }
    ul {
        margin-bottom: 1.5em;
        li {
            padding-left: 20px;
            position: relative;
            margin-bottom: 8px;

            &::before {
                content: '';
                background: #ca1c6d;
                width: 14px;
                top: 8px;
                height: 14px;
                display: block;
                border-radius: 50%;
                left: 0;
                position: absolute;
            }
            &::after {
                left: 5px;
                transform: rotate(45deg);
                top: 10px;
                border-bottom: 2px solid #fff;
                border-right: 2px solid #fff;
                content: '';
                position: absolute;
                text-indent: 0;
                width: 3px;
                height: 6px;
            }
        }
    }
    ol {
        margin-bottom: 1.5em;
        list-style: none;
        counter-reset: num;

        li {
            counter-increment: num;
            padding-left: 20px;
            position: relative;
            margin-bottom: 8px;

            &::before {
                font-weight: bold;
                content: counter(num) '.';
                color: #ca1c6d;
                width: 14px;
                top: 0px;
                height: 14px;
                display: block;
                border-radius: 50%;
                left: 0;
                position: absolute;
            }
        }
    }
    p > small {
        font-size: 0.9em;
    }
    em {
        font-weight: bold;
        font-style: normal;
        color: #ca1c6d;
    }
    strong {
       background: linear-gradient(transparent 60%, #ffbed5 60%);
    }
    .msg-baloon {
        display: flex;
        margin: 3em 0;
        align-items: start;

        .gatsby-image-wrapper.gatsby-image-wrapper-constrained {
            width: 100px;
            height: 100px;
        }

        .msg-baloon--img__wrapper {
            text-align: center;
            width: 100px;
            font-size: 1.2rem;
            font-weight: bold;

            img {
                border-radius: 50%;
                oveflow: hidden;
            }

            .msg-baloon--img {
                border-radius: 50%;
                margin-bottom: 15px;
            }
        }


        &>p {
            @media screen and (min-width: 768px) {
                font-size: 15px;
            }
            width: calc(100% - 130px);
            margin-left: 30px;
            border: 2px solid var(--color-deep);
            padding: 15px;
            background: #fbfafa;
            background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
            border-radius: 10px;
            position: relative;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);

            span {
                display: block;
            }

            &::before {
                left: -15px;
                top: 15px;
                position: absolute;
                content: "";
                border-right: 15px solid var(--color-deep);
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
            }
        }

        &--right {
            display: flex;
            margin: 3em 0;
            flex-direction: row-reverse;
            align-items: start;

            .msg-baloon--img__wrapper {
                text-align: center;
                width: 100px;
                font-size: 1.3rem;
                font-weight: bold;

                img {
                    border-radius: 50%;
                    oveflow: hidden;
                }

                .msg-baloon--img {
                    border-radius: 50%;
                    margin-bottom: 15px;
                }
            }

            &>p {
                @media screen and (min-width: 768px) {
                    font-size: 15px;
                }
                border: 2px solid #ca1c6d;
                width: calc(100% - 130px);
                margin-right: 30px;
                background: #fbfafa;
                background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
                padding: 15px;
                border-radius: 10px;
                position: relative;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);

                span {
                    display: block;
                }

                &::before {
                    right: -15px;
                    top: 15px;
                    position: absolute;
                    content: "";
                    border-left: 15px solid #ca1c6d;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                }
            }
        }
    }

     table {
        margin-top: 18px;
        margin-bottom: 1.5em;
        width: 100%;
        th {
            background: #666;
            background-image: repeating-linear-gradient(-45deg, #727272, #727272 1px, transparent 2px, transparent 5px);
            background-size: 7px 7px;
            color: #fff;
        }
        th,td {
            padding: 1em 1em;
            border: 1px solid #aaa;
        }
     }
     }
`

import styled from "styled-components"

export const ContentArea = styled.div`
h2 {
    font-size: 20px;
    @media screen and (min-width: 768px) {
    font-size: 24px;
    margin-bottom: 50px;
    text-align: center;
}
margin-bottom: 32px;

}
ul {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    gap: 24px;
    a {
        color: var(--color-blue);
    }

}
p {
    max-width: 750px;
    line-height: 2.2;
    margin: 0 auto;
    a {
        color: var(--color-blue);
    }
    @media screen and (min-width: 768px) {
        text-align: center;
    }
    & + p{
    margin-top: 16px;
    }
    strong {
        color: var(--color-accent);
    }

}
.c-form {
    &__checkbox {
        display: block;
        margin-bottom: 8px;
        span {
            cursor: pointer;
            display: block;
            padding: 8px 16px 8px 32px;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 8px;
                height: 1em;
                width: 1em;
                background: #fff;
                border-radius: 50%;
            }
            &::after {
                opacity: 0;
                content: '';
                position: absolute;
                left: 2px;
                top: 10px;
                height: calc(1em - 4px);
                width: calc(1em - 4px);
                background: var(--color-accent);
                border-radius: 50%;
            }
        }
        input {
            display: none;
            &:checked + span::after {
                opacity: 1;
            }
        }
    }
    margin-top: 40px;
    background: var(--pale-gray);
    padding: 24px;
    border-radius: 16px;
    @media screen and (min-width: 768px) {
        border-radius: 24px;
        padding: 48px;
    }
    dl {
        @media screen and (min-width: 768px) {
            display: flex;
            flex-wrap: wrap;
        }
        dt {
            @media screen and (min-width: 768px) {
                margin-bottom: 32px;
                width: 220px;
            }
            margin-bottom: 32px;
            font-weight: bold;
            span {
                border-radius: 30px;
                font-size: 10px;
                background: var(--color-accent);
                display: inline-flex;
                margin-left: 16px;
                padding: 2px 8px;
            }
        }
        dd {
            p {
                margin-top: 24px;
                text-align: left;
            }
            textarea,
            input[type=email],
            input[type=text] {
                border-radius: 4px;
                padding: 10px;
                display: block;
                width: 100%;
                box-sizing: border-box;;
                border: none;
                font-size: 16px;
                color: #333;
                font-family: "游ゴシック体",
                YuGothic,
                "游ゴシック",
                "Yu Gothic",
                "Hiragino Kaku Gothic ProN",
                "Hiragino Sans",
                "メイリオ",
                sans-serif;

            }
            textarea {
                height: 150px;
            }
            margin-bottom: 24px;
            @media screen and (min-width: 768px) {
            width: calc(100% - 220px);
            margin-bottom: 32px;
            }
        }
    }
    button[type=submit] {
        display: flex;
        height: 60px;
        max-width: 400px;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin: 0 auto 32px;
        background: var(--color-accent);
        border: none;
        border-radius: 8px;
        font-weight: bold;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        &:disabled {
            cursor: auto;
            opacity: 0.5;
        }
    }
    .hidden-area {
        display: none;
    }
    .error {
        color: var(--color-accent);
    }
    .agreement {
        label {
            vertical-align: -3px;
            width: 1.2em;
            height: 1.2em;
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
            span {
                background: var(--background);
                display: block;
                width: 1.2em;
                height: 1.2em;
                position: relative;
                &::after {
                    opacity: 0;
                    content: '';
                    position: absolute;
                    left: 0px;
                    top: 4px;
                    height: .4em;
                    transform: rotate(-45deg);
                    width: .8em;
                    border-bottom: var(--color-accent) 2px solid;
                    border-left: var(--color-accent) 2px solid;
                }
            }

            input {
                display: none;

                &:checked+span::after {
                    opacity: 1;
                }
            }
        }
    }
}

`

import styled from "styled-components";

export const Sidebar = styled.div`
margin-top: 50px;
@media screen and (min-width: 768px) {
      width: 250px;
      padding-left: 32px;
    }
    @media screen and (min-width: 1020px) {
        width: 300px
    }
    .title {
        color: #fff;
        text-align: center;
        display: block;
        background: var(--color-deep);
        margin-bottom: 24px;
        font-weight: bold;
        padding: 8px 16px;
        margin-left: -16px;
        margin-right: -16px;
    }
    .profile {
        padding: 0 16px 16px;
        background: #fff;
        text-align: center;
        img {
            border-radius: 50%;
            width: 120px;
        }
        .name {
            margin-top: 16px;
            margin-bottom: 8px;
            font-weight: bold;
        }
        .text {
            text-align: left;
            margin-bottom: 16px;
            font-size: 14px;
            line-height: 1.8;
        }
        margin-bottom: 32px;
        .sns {
            align-items: center;
            display: flex;
            justify-content: center;
            gap: 16px;
        }
        svg {
            color: var(--color-sec);

            &:hover {
                text-decoration: none;
            }
            width: 24px;
        }
    }
    a {
        &:hover {
            opacity: 0.8;
        }
    }
    .search {
        background: #fff;
        padding: 0 16px;
        margin-bottom: 32px;

        & > div {
            margin-bottom: 0;
        }
        input {
            display: block;
            margin-bottom: 16px;
            border: 1px solid #aaa;
        }
        .result-inner {
            margin-left: -16px;
            margin-right: -16px;
            border-radius: 0;
            margin-bottom: 0;
            padding-bottom: 0;
            p {
                font-size: 14px;
            }
            ul {
                border-radius: 0;
                padding-bottom: 0;
                margin-bottom: 0;
            }
            li {
                padding: 0;
                margin-left: 0;
                line-height: 1.4;
                margin-bottom: 5px;
                a {
                    background: #fbfafa;
                    background-image: repeating-linear-gradient(-45deg, #ffffff, #ffffff 1px, transparent 2px, transparent 5px);
                    border: 2px solid #eee;
                    display: block;
                    padding: 8px 16px;
                    font-size: 14px;
                    text-decoration: none;
                    transition: .3s;

                    &:hover {
                        opacity: 0.8;
                        box-shadow: 0 0 8px rgba(0,0,0, .2);
                    }

                }
            }
            time {
                display: block;
            }
        }
    }
`;

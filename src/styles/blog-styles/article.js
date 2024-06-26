import styled from "styled-components"

export const Article = styled.div`
  @media screen and (min-width: 768px) {
    width: calc(100% - 250px);
    padding: 0 30px 0 30px;
  }
  @media screen and (min-width: 1020px) {
    width: calc(100% - 300px);
  }
  .cstmreba {
    .kaerebalink-box {
      border: 1px solid #ccc;
      color: #333;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      background: #fff;
      display: flex;
      justify-content: space-between;
    }
    .kaerebalink-image {
      width: 100px;
    }
    .kaerebalink-info {
      width: calc(100% - 132px);
    }
    .kaerebalink-powered-date {
      font-size: 12px;
      margin-bottom: 8px;
    }
    .kaerebalink-name {
      font-weight: bold;
      a {
        color: #444;
      }
    }
    .kaerebalink-link1 {
      display: flex;
      gap: 16px;
      div {
        a {
          font-weight: bold;
          line-height: 1;
          padding: 10px 24px;
          border-radius: 4px;
          color: #fff;
          text-decoration: none;
          display: flex;
        }
      }

      .shoplinkrakuten {
        a {
          background: #bf0000;
          box-shadow: 0 3px 0 #890000;
        }
      }
      .shoplinkamazon {
        a {
          background: #ffa41c;
          box-shadow: 0 3px 0 #d87b01;
        }
      }
    }
  }
  .profile {
    border: 6px solid var(--pale-gray);
    padding: 15px;
    position: relative;
    border-radius: 15px;
    margin-bottom: 30px;
    svg {
      width: 20px;
      height: 20px;
      display: inline-block;
    }

    @media screen and (min-width: 768px) {
      margin: 24px 0 24px;
      padding: 20px 0 0 160px;
    }

    .title {
      position: absolute;
      background: var(--background);
      top: -25px;
      padding: 10px 15px;
      left: 50%;
      white-space: nowrap;
      font-weight: 700;
      transform: translateX(-50%);
      @media screen and (min-width: 768px) {
        left: 20px;
        transform: translateX(0);
      } //media query
    }

    .prof__img__sm {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 25px auto 15px;
      overflow: hidden;
      display: block;

      img {
        overflow: hidden;
        border-radius: 50%;
      }
      @media screen and (min-width: 768px) {
        position: absolute;
        left: 24px;
      }
    }

    .name {
      margin: 10px 0 5px;
      text-align: center;
      font-size: 1.5rem;

      @media screen and (min-width: 768px) {
        margin: 10px 15px 5px;
        font-size: 1.6rem;
        text-align: left;
      }

      font-weight: 700;
    }

    .footer {
      text-align: center;
      margin: 10px 0 5px;
      @media screen and (min-width: 768px) {
        margin: 0 15px 5px;
        text-align: right;
        br {
          display: none;
        }
      }
    }

    .footer a {
      margin: 0 10px 0px 10px;
      display: inline-block;
      color: var(--color-blue);
    }

    .message {
      margin: 10px 0 5px;
      line-height: 1.6;
      font-size: 1.4rem;

      @media screen and (min-width: 768px) {
        margin: 0 15px 5px;
      }
    }

    .seemore {
      margin: 15px 0 0;

      @media screen and (min-width: 768px) {
        margin: 5px 15px 10px;
      }

      text-align: right;

      a {
        text-decoration: none;
        color: var(--color-link);

        &:hover {
          transform: translateX(5px);
        }

        letter-spacing: 0.2em;
        transition: 0.3s;
        font-size: 0.9em;
        display: inline-block;

        &:after {
          font-size: 1.4rem;
          content: ">";
        }
      }
    }
  }

  .c-btn--donation {
    background: var(--pale-gray);
    text-align: center;
    padding: 24px 16px;
    border-radius: 16px;
    @media screen and (min-width: 768px) {
      padding: 24px;
    }
    p {
      line-height: 1.8;
    }

    a {
      margin: 20px auto 0;
      display: flex;
      max-width: 320px;
      width: 100%;
      background: #d45c84;
      border: 1px solid #d45c84 !important;
      color: #fff;
      justify-content: center;
      align-items: center;
      border: none;
      height: 56px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;

      svg {
        margin-right: 8px;
        width: 30px;
        height: 30px;
      }

      @media screen and (min-width: 768px) {
        transition: 0.3s;
        &:hover {
          color: #d45c84;
          background: #fff;
        }
      }
    }
  }
  .l-container {
    @media screen and (min-width: 768px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .c-article {
    margin: 50px auto 0;

    &__heading {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 24px;
      color: var(--color-d-blue);
      line-height: 1.4;
      margin-top: 0;

      @media screen and (min-width: 768px) {
        font-size: 2.8rem;
        margin-bottom: 42px;
      }
    }

    &__date {
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      dt {
        width: 120px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      dd {
        margin-bottom: 5px;
        font-weight: 700;
        width: calc(100% - 120px);
      }
      @media screen and (min-width: 768px) {
        margin-bottom: 20px;
        dt,
        dd {
          width: inherit;
          display: inline-block;
          margin-bottom: 0;
        }
        dt ~ dt {
          margin-left: 15px;
        }
        dd {
          margin-left: 10px;
        }
      }
    }
    &__tags {
      padding-top: 15px;
      display: flex;
      flex-wrap: wrap;
      dt {
        text-align: left;
        width: 100px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      dd {
        width: calc(100% - 100px);
      }

      .cate a {
        border: none;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        padding: 3px 15px;
        color: var(--light-color);
        display: inline-block;
        border-radius: 4px;
        border: 1px solid var(--color-blue);
        background: var(--color-blue);
        transition: 0.3s;
        text-decoration: none;
      }
    }

    &__ganre {
      margin-bottom: 30px;

      a {
        font-weight: 700;
        border: 1px solid var(--color-blue);
        color: var(--color-blue);
        padding: 3px 10px;
        border-radius: 3px;
        font-size: 1.4rem;
        text-decoration: none;

        & ~ a {
          margin-left: 5px;
        }
      }
    }

    &__description {
      line-height: 2;
      margin-bottom: 30px;
    }
  }
  .c-snsBtns {
    margin-top: 50px;
    text-align: center;
    margin-bottom: 50px;

    &__item {
      line-height: 1;
      display: inline-block;
      & ~ .c-snsBtns__item {
        margin-left: 10px;
      }
      a {
        font-weight: 700;
        font-size: 1.2rem;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 10px;
        text-decoration: none;
      }

      &--fb {
        border: 1px solid #3b5998;
        background: #3b5998;
        transition: 0.3s;

        @media screen and (min-width: 768px) {
          &:hover {
            background: #fff;
            color: #3b5998;
          }
        }
      }
      &--tw {
        border: 1px solid #aaa;
        background: #000;
        transition: 0.3s;

        @media screen and (min-width: 768px) {
          &:hover {
            background: #fff;
            color: #000;
          }
        }
      }

      &--hateb {
        border: 1px solid #008fde;
        background: #008fde;
        transition: 0.3s;

        @media screen and (min-width: 768px) {
          &:hover {
            background: #fff;
            color: #008fde;
          }
        }
      }
      &--pocket {
        border: 1px solid #ee4056;
        background: #ee4056;
        transition: 0.3s;

        @media screen and (min-width: 768px) {
          &:hover {
            background: #fff;
            color: #ee4056;
          }
        }
      }
    }
  }

  .c-pager--article {
    padding-top: 30px;
    position: relative;
    margin-bottom: 100px;
    list-style: none;
    .c-pager--article__next {
      text-align: right;
    }
    @media screen and (min-width: 768px) {
      .c-pager--article__next,
      .c-pager--article__prev {
        position: absolute;
        width: 45%;
        top: 0;
      }
      .c-pager--article__prev {
        left: 0;
        a {
          transition: 0.5s;
          &:before {
            transition: 0.5s;
          }
        }
      }
      .c-pager--article__next {
        right: 0;
        a {
          transition: 0.5s;
          &:before {
            transition: 0.5s;
          }
        }
      }

      .c-pager--article__next a:hover,
      .c-pager--article__prev a:hover {
        color: var(--color-blue);
        transition: 0.5s;
      }

      .c-pager--article__prev a:hover:before {
        left: -120%;
      }
      .c-pager--article__next a:hover:before {
        right: -120%;
      }
    }

    &__prev a:before {
      z-index: -1;
      left: 0;
      position: absolute;
      content: "";
      top: 0;
      width: 120%;
      height: 100%;
      display: block;
      background: var(--color-blue);
      transform: skew(-45deg);
    }
    &__next a:before {
      z-index: -1;
      right: 0;
      position: absolute;
      content: "";
      top: 0;
      width: 120%;
      height: 100%;
      display: block;
      background: var(--color-blue);
      transform: skew(45deg);
    }
    a {
      color: var(--light-color);
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      z-index: 1;
      border-radius: 5px;
      background: var(--background);
      border: 1px solid var(--color-blue);
      padding: 15px 20px;
      display: block;
    }

    .c-pager--article__next,
    .c-pager--article__prev {
      margin-bottom: 15px;
    }
  }
`

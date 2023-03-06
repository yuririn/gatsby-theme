import { createGlobalStyle } from "styled-components"

export const CommonStyle = createGlobalStyle`
  body.no-scroll {
      @media only screen and (max-width: 769px) {
        overflow: hidden;
        footer, main {
          filter:blur(3px);
          opacity: .5;
        }
      }
  }
  footer, main {
     @media only screen and (max-width: 769px) {
      transition:.5s
     }
  }
  .google-auto-placed {
    padding: 15px 0;
  }
  small {
    font-size: 1.2rem;
  }

  .var(--pale-gray){
    position:relative;
    background-color:var(--backgrond);
    padding-top: 50px;
    @media screen and (min-width: 768px){
      padding-top: 80px;
    }
  }
  .p-box--gray {
    padding: 20px;
    border-radius: 8px;
    background: var(--pale-gray);
    position: relative;
    overflow: hidden;
  }
  .l-container, .l-container--md {
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;

    padding-left: 15px;
        padding-right: 15px;
    @media only screen and (min-width: 769px) {
        padding-left: 30px;
    padding-right: 30px;

    }
  }
  .l-container--md {
    max-width: 700px;
  }


  .l-main_contents {
    margin-top: 0;
    margin-bottom: 50px;

    &.is-page {
      padding-top: 80px;
    }
  }

  .c-article__heading {
        font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: var( --color-d-blue);
    line-height: 1.4;

    @media screen and (min-width: 768px){
       margin-bottom: 30px;
      font-size: 2.8rem;
    }
  }

  .c-form__submit, .c-nav__navLink, .p-btn--detail {
    position: relative;
    z-index: 1;
    display: inline-block;
    line-height: 1;
    text-align: center;
    width: 100%;
    padding: 20px 0;
    border: 1px solid  var(--color-blue);
    color:  var(--color-blue);
    border-radius: 5px;
    letter-spacing: .15em;
    font-size: 1.6rem;
    overflow: hidden;
    text-decoration: none;
    background: var(--background);
    max-width: 400px;

    &:before {
      transform: skew(
        -45deg
      );
        z-index: -1;
        transition: .3s;
        position: absolute;
        content: "";
        display: block;
        left: -120%;
        top: 0;
        width: 120%;
        height: 100%;
        background: var(--color-blue);
    }

  }
  @media screen and (min-width: 768px) {
    .c-form__submit:hover, .c-nav__navLink:hover, .p-btn--detail:hover{
      color: var(--background);
      &::before {
        left: 0;
      }
    }
  }

  .p-pageHeader {
    position: relative;
    height: 250px;
    overflow: hidden;
    margin-bottom: 20px;
    text-shadow: 0 0 5px rgb(0 0 0 / 60%), 0 0 12px rgb(0 0 0 / 40%);
    background: var(--color-blue);
    font-weight: bold;

    &__img{
      opacity: 0.6;
      height: 100%;
      width: 100%;
      filter:blur(2px);

      img {
        object-fit: cover;
      }
    }

    &__main {
      position: relative;
      z-index: 1;
      color: #fff;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
  }
    &__heading {
      padding-top: 50px;
      letter-spacing: .1em;
      font-size: 2rem;
      font-weight: 700;
      @media screen and (min-width: 768px) {
        font-size: 3.2rem;
      }
        &::after {
          content: "";
          height: 2px;
          width: 30px;
          display: block;
          margin: 15px auto 15px;
          background: #c03363;
      }
    }
  }
  .u-text-center {
    text-align: center;
  }

  .c-heading--lg, .c-heading--xl__sub {
    font-weight: 700;
    text-align: center;
    margin-bottom: 30px;
    line-height: 1.6;
    font-size: 1.8rem;
    letter-spacing: .1em;

    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }

    &::after {
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        background: var(--color-accent);
        margin: 7px auto 0;
    }
  }

  .p-section {
      margin-bottom: 50px;
  }

  .u-mblg {
    margin-bottom: 24px;
  }

  .c-grid {
    @media screen and (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -30px 30px 0;

      &__item--md6 {
          margin-right: 30px;
          width: calc(49.99998% - 30px);
      }

    }

    @media screen and (min-width: 1024px) {
        &__item--lg4 {
          margin-right: 30px;
          width: calc(33.33332% - 30px);
        }
    }
  }
  .google-auto-placed {
    background: #fff;
  }
  @keyframes wave {
    from { transform: translateX(0) }
      to { transform: translateX(-1200px) }
  }
  .c-nav__btn {
      transform: translateY(-50%);
      position: fixed;
      font-size: 1rem;
      width: 60px;
      height: 50px;
      right: 10px;
      padding-top: 10px;
      top: 30px;
      display: inline-block;
      transition: .3s;
      background: none;
      border: none;
      outline: none;
      z-index: 200;
      color: #264785;

      path {
          fill: #264785;
      }

      &::after {
          font-weight: bold;
          margin-top: 5px;
          display: inline-block;
          content: 'MENU';
      }

      &.is-active {
          &::after {
              content: 'CLOSE';
          }

          .fish {
              transform-origin: center;
              transform: scaleY(0);
          }

      }

      .fish {
          transition: .5s;
      }

      @media only screen and (min-width: 768px) {
          display: none;
      }
  }

  [role=navigation] {
      @media only screen and (max-width: 767px) {
          height: 0;
          overflow: hidden;

          &.is-active {
              background: var(--filter);
              left: 0;
              top: 60px;
              position: fixed;
              height: calc(100vh - 60px);
              justify-content: center;
              flex-direction: column;
              padding: 15px;
              display: flex;
              align-items: center;
              backdrop-filter: blur(10px);
          }
      }
  }

  .c-nav {

      @media only screen and (min-width: 768px) {
          height: auto;
          gap: 24px;
          display: flex;
      }

      &>li {
          @media only screen and (max-width: 767px) {
              margin-bottom: 16px;
          }

          &>a {
              letter-spacing: .15em;
              color: #264785;
              display: flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;

              @media only screen and (max-width: 767px) {
                  color: var(--color-blue);
                  padding: 12px 8px;
                  margin: 0 auto;
                  border-radius: 4px;
                  text-shadow: 0 0 2px var(--filter);
                  font-size: 2rem;
                  height: 38px;

                  &::before {
                      content: "";
                      width: 8px;
                      margin-right: 10px;
                      height: 8px;
                      display: inline-block;
                      border: 2px solid var(--color-accent);
                      border-bottom: none;
                      border-left: none;
                      transform: rotate(45deg);
                  }
              }

              @media only screen and (min-width: 768px) {
                  height: 50px;
                  position: relative;

                  &::before {
                      content: '';
                      background: var(--color-accent);
                      position: absolute;
                      bottom: -6px;
                      left: 0%;
                      height: 1px;
                      width: 0;
                      transition: .3s;
                  }

                  &::after {
                      content: '';
                      background: var(--color-accent);
                      position: absolute;
                      bottom: -9px;
                      left: 0;
                      height: 7px;
                      width: 7px;
                      border-radius: 50%;
                      transform: scale(0);
                      transition: .3s;
                  }

                  &:hover {
                      &::before {
                          width: 100%;
                      }

                      &::after {
                          transform: scale(100%);
                          left: 100%;
                      }

                      color: #1231b8;
                  }

              }
          }
      }
  }

  .c-nav__child {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      gap: 8px;

      li {
          flex-grow: 1;

          a {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 30px;
              text-shadow: 0 0 2px var(--filter);
              font-size: 1.4rem;
              border-radius: 8px;
              text-align: center;
              text-decoration: none;
              padding: 4px 8px;
              border: none;
              color: var(--color-blue);

              border: 1px solid var(--color-blue);
          }
      }

      @media only screen and (min-width: 768px) {
          display: none;
      }
  }
  .c-nav {
    &__sns {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 2rem;

      a {
          border: 1px solid var(--color-blue);
          color: var(--color-blue);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
              width: 20px;
              height: 20px;
          }
      }

      @media only screen and (min-width: 768px) {
          display: none;
      }
    }
    }
  .l-header {
    color: #232a41;
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background: var(--header-background);
    box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    padding: 0 20px;
    backdrop-filter: blur(3px);



    &__logo {
         @media screen and (min-width: 768px) {
             &:hover svg {
                 fill: #1231b8;
                 cursor: pointer;
             }
         }
        text-decoration: none;
        color: #264785;
        display: block;
        line-height: 1;
        font-size: 1rem;
        white-space: nowrap;
        svg {
        height: 34px;
        transition: 0.3s;
        fill: #264785;
        display: block;
        margin-top: 3px;
        }

  }
}
}
.l-footer {
    z-index: 10;
    position: relative;

    [aria-label] {
        position: fixed;
        bottom: 15px;
        right: 15px;
        border: none;
        display: flex;
        width: 50px;
        height: 50px;
        background: var(--move-to);
        border: 1px solid var(--color-blue);
        border-radius: 50%;
        backdrop-filter: blur(3px);
        content: "";
        transition: 0.3s;
        justify-content: center;
        align-items: center;

        &::before {
            display: block;
            width: 10px;
            height: 10px;
            content: "";
            left: 50%;
            transform: rotate(45deg);
            border-top: 2px solid var(--color-blue);
            border-left: 2px solid var(--color-blue);
            transition: 0.3s;
        }

        @media screen and (min-width: 768px) {
            width: 70px;
            height: 70px;

            &:hover {
                cursor: pointer;
                background: var(--color-blue);
                transform: translateY(-10px);

                &::before {
                    border-color: var(--light-color);
                }
            }
        }
    }

    background: var(--footer-background);
    padding: 50px 0 30px;
    color: #fff;
    line-height: 1;

    .l-footer__copyright {
        font-size: 1.2rem;
        letter-spacing: 0.1em;
    }

    .p-footerNav {
        margin-bottom: 25px;
    }

    .p-footerNav__item {
        margin-bottom: 25px;

        li+li {
            margin-top: 25px;
        }
    }

    .p-footerNav__item a {
        letter-spacing: 0.15em;
        color: #fff;
        display: block;
        position: relative;
        padding-left: 20px;
        text-decoration: none;

        &:before {
            transition: 0.3s;
            position: absolute;
            content: "";
            width: 5px;
            height: 5px;
            top: 4px;
            left: 0;
            display: block;
            border: 1px solid #fff;
            border-bottom: none;
            border-left: none;
            transform: rotate(45deg);
        }
    }

    .p-footerNav__item--sns {
        margin-top: 40px;
        margin-bottom: 30px;
        text-align: center;
    }

    .p-footerNav__item--sns li {
        display: inline-block;
        margin: 0 20px;

        a {
            color: #fff;
        }
    }

    svg {
        width: 20px;
        height: 20px;
    }

    @media screen and (min-width: 768px) {
        .p-footerNav__item a {
            transition: 0.3s;

            &:hover {
                text-decoration: underline;

                &::before {
                    left: 5px;
                }
            }
        }

        .p-footerNav__item--sns {
            margin-top: 0;
            margin-bottom: 0;
            text-align: left;

            a {
                transition: 0.3s;

                &:hover {
                    opacity: 0.5;
                }
            }

            li {
                margin-right: 0;
                margin-left: 0;

                &+li {
                    margin-left: 20px;
                }
            }
        }

        .p-footerNav {
            display: flex;
            justify-content: space-around;
        }
    }
}
.p-localNav__item {
    position: relative;
    height: 130px;
    text-shadow: 0 0 3px rgb(0, 0, 0, 0.8), 0 0 16px rgb(0, 0, 0, 0.6);
    margin-bottom: 30px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 4px rgb(0, 0, 0, 0.3);
    background: var(--color-blue);
    font-size: 1.4rem;
    font-weight: bold;

    .gatsby-image-wrapper {
        height: 100%;
        width: 100%;
        transition: 0.3s;
    }

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        &:hover {
            .gatsby-image-wrapper {
                opacity: 0.5;
                transform: scale(1.1);
            }
        }
    }
}

.p-localNav__main {
    z-index: 1;
    position: absolute;
    color: #fff;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
}

.p-localNav__heading {
    color: #fff;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: 0.05em;

    &:after {
        content: "";
        display: block;
        height: 2px;
        width: 20px;
        margin: 10px auto 0;
        background: var(--color-accent);
    }

    @media screen and (min-width: 768px) {
        margin-bottom: 15px;
        letter-spacing: 0.1em;
        font-size: 1.88rem;

        &:after {
            margin: 15px auto 0;
        }
    }
}
.p-localNav {

    &+.ads.display {
        max-width: 700px;
        margin: 0 auto 80px;
    }

}
.c-bio {
        line-height: 2;
        max-width: 700px;
        margin: 0 auto;
        padding-bottom: 50px;
        .prfImg {
            width: 200px;
            border-radius: 50%;
            display: block;
            margin: 0 auto 30px;

            img {
                border-radius: 50%;
                overflow: hidden;
            }
        }

        ul+*,
        p+* {
            margin-top: 1em;
        }

        ul {
            list-style: none;

            &+p {
                margin-bottom: 1em;
            }
        }

        ul>li {
            padding-left: 1.5em;
            position: relative;
            margin-bottom: 0.5em;

            &::before {
                left: 8px;
                top: 6px;
                display: block;
                color: #001d7c;
                content: "";
                width: 0.3em;
                height: 0.6em;
                background: none;
                position: absolute;
                transform: rotate(45deg);
                border: 4px solid var(--color-accent);
                border-width: 0 3px 3px 0;
            }
        }
}
.l-body {
    &--article {

        @media screen and (min-width: 768px) {
            display: flex;
            position: relative;
            max-width: 1120px;
            margin: 0 auto;
            flex-wrap: wrap;
        }

        aside.l-container .display {
            margin-bottom: 50px;
        }
    }
}
`

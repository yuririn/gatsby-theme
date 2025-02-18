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

  .p-heading--lg, .c-heading--xl__sub {
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

      &__item--md6 {
          width: calc(49.99998% - 30px);
      }

    }

    @media screen and (min-width: 1024px) {
        &__item--lg4 {
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
}
`

import styled from "styled-components";

export const Header = styled.div`
  .c-article {
    &__mainvisual {
      position: relative;
      z-index: 1;
      background: var(--color-d-blue);
      overflow: hidden;
      margin-bottom: 24px;

      &::before {
        opacity: 0.6;
        filter: blur(2px);
        z-index: -1;
        width: 100%;
        height: 100%;
        content: "";
        display: block;
        position: absolute;
        background: url(/images/bg-main.webp) 50% / cover;
      }

      &--cms:before {
        background-image: url(/images//genre-cms.webp);
      }

      &--web-developer:before {
        background-image: url(/images/genre-web-developer.webp);
      }
      &--ginneko-tsuredure:before {
        background-image: url(/images/genre-ginneko-tsuredure.webp);
      }
      &--cms:before {
        background-image: url(/images/genre-cms.webp);
      }
      &--seo:before {
        background-image: url(/images/genre-seo.webp);
      }
      &--career:before {
        background-image: url(/images/genre-career.webp);
      }
      &--overseas-freelancing:before {
        background-image: url(/images/genre-overseas-freelancing.webp);
      }
    }

    &__img {
      margin: 80px auto 20px;
      max-width: 460px;
      position: relative;
      padding: 0 30px;

      img {
        display: block;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
      }
    }

    &__cat {
      position: absolute;
      fill: #264785;
      stroke: #fff;
      stroke-width: 1px;
      height: 30px;
      right: 0;
      bottom: -15px;
      z-index: 2;
      @media screen and (min-width: 768px) {
        height: 40px;
      }
    }
  }
`;

import styled from "styled-components"

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
        background: url(/static/f06cabea092b70c1fc4d476ab9c36647/14b42/bg-main.jpg)
          50% / cover;
      }

      &--cms:before {
        background-image: url(/static/9fb9fa4df8d1d3da0c6fe1d74cd70712/2244e/genre-cms.jpg);
      }

      &--web-developer:before {
        background-image: url(/static/f684234481e7fc4c2e76afafc9f6f43c/2244e/genre-front-end-program.jpg);
      }
      &--ginneko-tsuredure:before {
        background-image: url(/static/080974e034b1312f6e2e3696e8edd54c/2244e/genre-ginneko-tsuredure.jpg);
      }
      &--cms:before {
        background-image: url(/static/9fb9fa4df8d1d3da0c6fe1d74cd70712/2244e/genre-cms.jpg);
      }
      &--seo:before {
        background-image: url(/static/0f5e983805a492892296241cee4f8db1/2244e/genre-seo.jpg);
      }
      &--career:before {
        background-image: url(/static/3bdad4eadd3fc56e6dc0a573d8195a88/2244e/genre-career.jpg);
      }
      &--overseas-freelancing:before {
        background-image: url(/static/7dc6e0658207e9c08aee9a9e6aea2828/2244e/genre-overseas-freelancing.jpg);
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
      fill: var(--color-blue);
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
`

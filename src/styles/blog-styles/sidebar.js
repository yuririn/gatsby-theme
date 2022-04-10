import styled from "styled-components";

export const Sidebar = styled.div`
  & > div:first-child {
    margin-bottom: 20px;

    padding-left: 15px;
    padding-right: 15px;
    @media screen and (min-width: 768px) {
      padding-left: 0;
      padding-right: 0;
    }
    div {
      margin-bottom: 0;
    }
  }
  .side-banner {
    padding-bottom: 20px;

    li {
      position: relative;
      margin-bottom: 20px;
      a {
        display: block;
        border: 1px solid var(--border-color);
        img {
          width: 100%;
        }
        @media screen and (min-width: 1020px) {
          transition: 0.3s;
          &:hover {
            opacity: 0.5;
          }
        }
      }
      &.iframe {
        position: relative;
        padding-top: 56.25%;
        height: 0;
        overflow: hidden;
        width: 100%;

        iframe {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          width: 100%;
        }
      }
    }
  }
  h2 {
    margin-bottom: 20px;
    font-size: 1.3em;
    color: var(--color-blue);
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    line-height: 1.4;
    letter-spacing: 0.1em;

    &::after {
      content: "";
      display: block;
      width: 4px;
      box-shadow: 10px 0 0 #ccc, -10px 0 0 #ccc;
      height: 4px;
      border-radius: 50%;
      background: #ccc;
      margin: 10px auto 0;
    }
  }
  .p-section {
    margin-top: 60px;
    @media screen and (min-width: 768px) {
      margin-bottom: 20px;
    }
  }
  .inner {
    padding: 0 15px 50px;
  }
  @media screen and (min-width: 768px) {
    div.result-inner {
      margin-bottom: -30px !important;
    }
    width: 250px;
    padding-right: 30px;

    .inner {
      position: sticky;
      top: 0;
      padding: 65px 0 0;
    }
  }
  @media screen and (min-width: 1020px) {
    width: 300px;
  }

  .sideCateList {
    @media screen and (min-width: 768px) {
      padding: 0;
    }

    li {
      text-align: center;
      border-bottom: 1px solid var(--border-color);
    }

    a {
      display: block;
      text-decoration: none;
      color: var(--color-link);
      padding: 20px 15px;
      font-weight: bold;
      letter-spacing: 0.1em;
      font-size: 1.6rem;
      @media screen and (min-width: 768px) {
        padding: 15px;
        font-size: 1.4rem;
      }
    }
  }
  .l-container {
    padding: 0;
  }
`;

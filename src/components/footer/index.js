import React from "react";

import FooterNav from "./footernav";
import styled from "styled-components";
import scrollTo from "gatsby-plugin-smoothscroll";

const Footer = ({ title }) => {
  return (
    <FooterWrapper>
      <footer className="l-footer">
        <div className="l-container">
          <FooterNav />
          <p className="u-text-center l-footer__copyright">
            <small>(C) {title}</small>
          </p>
        </div>
      </footer>
      <button onClick={() => scrollTo("#top")}></button>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  z-index: 10;
  position: relative;
  button {
    position: fixed;
    bottom: 15px;
    right: 15px;
    border: none;
    width: 50px;
    height: 50px;
    background: var(--move-to);
    border: 1px solid var(--color-blue);
    border-radius: 50%;
    content: "";
    transition: 0.3s;
    &::before {
      display: block;
      width: 10px;
      height: 10px;
      content: "";
      position: absolute;
      left: 50%;
      transform: translate(-50%, -30%) rotate(45deg);
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
  .l-footer {
    background: var( --footer-background);
    padding: 50px 0 30px;
    color: #fff;
    line-height: 1;
    &__copyright {
      font-size: 1.2rem;
      letter-spacing: 0.1em;
    }
  }
  .p-footerNav {
    margin-bottom: 25px;
  }
  .p-footerNav__item {
    margin-bottom: 25px;
    li + li {
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
        & + li {
          margin-left: 20px;
        }
      }
    }
    .p-footerNav {
      display: flex;
      justify-content: space-around;
    }
  }
`;

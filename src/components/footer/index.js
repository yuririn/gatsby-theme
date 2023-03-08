import React from "react";
import { Link } from "gatsby";
import FooterNav from "./footernav";
import { MainFooter } from '../../styles/main/MainFooter';

const Footer = ({ title }) => {
  return (
    <MainFooter>
      <div className="l-footer">
          <div className="l-container">
            <FooterNav />
            <p className="u-text-center l-footer__copyright">
              <small>(C) {title}</small>
            </p>
          </div>
        <Link aria-label="戻るボタン" to="#top"></Link>
      </div>
    </MainFooter>
  );
};

export default Footer;

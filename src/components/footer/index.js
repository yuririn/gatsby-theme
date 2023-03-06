import React from "react";
import { Link } from "gatsby";
import FooterNav from "./footernav";

const Footer = ({ title }) => {
  return (
    <footer className="l-footer">
        <div className="l-container">
          <FooterNav />
          <p className="u-text-center l-footer__copyright">
            <small>(C) {title}</small>
          </p>
        </div>
      <Link aria-label="戻るボタン" to="#top"></Link>
    </footer>
  );
};

export default Footer;

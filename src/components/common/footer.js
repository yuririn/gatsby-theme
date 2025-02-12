import React from "react";
import { Link } from "gatsby";
import { siteMetadata } from "../../../gatsby-config";
import X from "../icon-and-logo/X"
import Insta from "../icon-and-logo/Insta";
import YouTube from "../icon-and-logo/YouTube"
import SlideShare from "../icon-and-logo/SlideShare";

const Footer = ()=>{
 return (
    <div className="l-footer">
          <FooterNav />
          <p className="l-footer__copyright"><small>(C){siteMetadata.title}</small></p>
    </div>
 )
}

export default Footer;


const FooterNav = () => {
    return (
        <>
            <ul className="c-footer-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/blogs/">Blog</Link>
                </li>
                <li>
                    <Link to="/portfolio/">Portfolio</Link>
                </li>
            </ul>
            <ul className="c-footer-nav">
                <li>
                    <Link to="/about/">About Me</Link>
                </li>
                <li>
                    <Link to="/privacy-policy/">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/socialmedia-policy/">Social Media Policy</Link>
                </li>
                <li>
                    <Link to="/contact/">Contact</Link>
                </li>
            </ul>
            <ul className="c-footer-nav--sns">
                <li>
                    <Link
                        to="https://twitter.com/LirioY"
                        target="_blank"
                        rel="noopener nofollow"
                    >
                        <X />
                    </Link>
                </li>
                <li>
                    <Link
                        to="https://www.instagram.com/yurico.k"
                        target="_blank"
                        rel="noopener nofollow"
                    >
                        <Insta/>
                    </Link>
                </li>
                <li>
                    <Link
                        to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                        target="_blank"
                        rel="noopener nofollow"
                    >
                        <YouTube/>
                    </Link>
                </li>
                <li>
                    <Link
                        to="https://www2.slideshare.net/yurikamimori"
                        target="_blank"
                        rel="noopener nofollow"
                    >
                        <SlideShare/>
                    </Link>
                </li>
            </ul>
        </>
    );
};

import React, { useEffect } from "react"
import Logo from './../icon-and-logo/logo';
import Nav from './globalnav';
import "./../../scss/header.scss";

const Header = ({isRootPath}) => {
    useEffect(() => {
        if (document.getElementById("keyvisual") === null) return
        const headerElement = document.querySelector(".l-header");
        const keyvisualElement = document.getElementById("keyvisual");
        headerElement.classList.add("is-white");
        const handleScroll = () => {

            if (!keyvisualElement || !headerElement) return;

            const keyvisualBottom = keyvisualElement.getBoundingClientRect().bottom;

            if (keyvisualBottom <= 0) {
                headerElement.classList.remove("is-white");
            } else {
                headerElement.classList.add("is-white");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className="l-header is-white">
            {isRootPath?
            (<h1 className="c-header-logo">セブ島海外ノマドエンジニアの日記<Logo></Logo></h1>)
            :
                (<p className="c-header-logo"><a href="/">セブ島海外ノマドエンジニアの日記<Logo></Logo></a></p>)
            }
            <Nav></Nav>
        </header>
    )
}

export default Header;

import React, { useEffect } from "react"
import '../../scss/header.scss'
import Logo from "../common/svg/logo"
import Nav from "./global-nav"

const Header = ({ isRoot }) => {
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
        {isRoot ?
            (<h1 className="c-header-logo"><span>セブ島海外ノマドエンジニアの日記</span><Logo></Logo></h1>)
            :
              (<p className="c-header-logo"><a href="/"><span>セブ島海外ノマドエンジニアの日記</span><Logo></Logo></a></p>)
        }
          <Nav></Nav>
    </header>
  )
}

export default Header

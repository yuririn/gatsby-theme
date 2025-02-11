

import React, { useState } from "react"
import NavBtn from "./NavBtn";
const Nav = ()=>{
    const [isOpen, setIsOpen] = useState(false)

    const toggleControll = e => {
        isOpen === false
            ? document.body.classList.add("is-fixed")
            : document.body.classList.remove("is-fixed")
        setIsOpen(!isOpen)
    }
    return (
    <>
        <NavBtn onButtonClick={toggleControll} isOpen={isOpen}></NavBtn>
            <nav className={isOpen ? 'c-nav is-opened' : 'c-nav'}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><span>Blog</span>
                    <ul className="c-nav__child">
                        <li><a href="/blogs/">すべて</a></li>
                        <li><a href="/blogs/web-developer/">ウェブ制作</a></li>
                        <li><a href="/blogs/cms/">CMS</a></li>
                        <li><a href="/blogs/seo/">SEO対策・デジタルマーケ</a></li>
                        <li><a href="/blogs/overseas-freelancing/">海外ノマド生活</a></li>
                        <li><a href="/blogs/career/">キャリアアップ・勉強</a></li>
                        <li><a href="/blogs/ginneko-tsuredure/">かみーゆ徒然記</a></li>
                    </ul>
                </li><li><a href="/about/">About Me</a></li>
                <li><a href="/portfolio/">Portfolio</a></li>
                <li><a href="/contact/">Contact</a></li>
            </ul>
        </nav>
        </>
    )
}

export default Nav;

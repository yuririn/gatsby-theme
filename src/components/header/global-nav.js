

import React, { useState } from "react"
import NavBtn from "./navbtn";
import { Link } from "gatsby"
import { siteMetadata } from "../../../gatsby-config";
const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { category } = siteMetadata

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
                            {category.map((li, i) => (<li><Link to={`/blogs/${li.slug}`}>{li.name}</Link></li>)
                            )}
                        </ul>
                    </li>
                    <li><a href="/about/">About Me</a></li>
                    <li><a href="/portfolio/">Portfolio</a></li>
                    <li><a href="/contact/">Contact</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;

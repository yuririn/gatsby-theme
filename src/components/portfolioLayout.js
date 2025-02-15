import React, { useState , useEffect} from "react"
import { Link } from "gatsby"
import Humberger from "./icon-and-logo/Humberger";
import X from "./icon-and-logo/X";
import HomeLogo from "./icon-and-logo/Home";
import Insta from "./icon-and-logo/Insta";

const PortfolioLayout = ({ location, title, children }) => {
    const rootPath = `${__PATH_PREFIX__}/`

    const nav = ["Profile", "Works"]
    const [isOpen, setIsOpen] = useState(false)
        useEffect(() => {
    
            const handleLinkClick = (event) => {
                const link = event.target.closest('a[href^="#"]:not([href="#"])');
                if (!link) return;
    
                event.preventDefault();
                const targetId = decodeURIComponent(link.getAttribute('href').substring(1)); // URLデコード
                const targetElement = document.getElementById(targetId);
    
                if (targetElement) {
                    setIsOpen(isOpen)
                    window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.scrollY - 70, // オフセットを調整
                        behavior: 'smooth'
                    });
                }
            };
    
            document.addEventListener('click', handleLinkClick);
    
            return () => {
                document.removeEventListener('click', handleLinkClick);
            };
        }, []);

    const menuEvent = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="portfolio">
            <header className="header">
                <p className="logo">Camille Site</p>
                <span
                    onClick={menuEvent}
                    className={isOpen ? "nav-btn active" : "nav-btn"}
                    role="button"
                    id="menuBtn"
                >
                    <Humberger></Humberger>
                    {isOpen ? "EAT?" : "MENU"}
                </span>
                <nav className={isOpen ? "globalNavOpen" : "globalNav"}>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        {nav.map((value, index) => {
                            return (
                                <li key={`lst${index}`}>
                                    <a href={`#${value}`}>
                                        {value}
                                    </a>
                                </li>
                            )
                        })}
                        <li>
                            <Link to="/contact/">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            {children}
            <footer>
                <a href="#top" aria-label="先頭へ戻る" className="footer-btn"></a>
                <ul className="footer-nav">
                    <li>
                        <Link to="/">
                            <HomeLogo></HomeLogo>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="https://twitter.com/LirioY"
                            target="_blank"
                            rel="noopener nofollow"
                        >
                            <X></X>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="https://www.instagram.com/yurico.k"
                            target="_blank"
                            rel="noopener nofollow"
                        >
                            <Insta></Insta>
                        </Link>
                    </li>
                </ul>
                <p>
                    <small>(c)IT戦士かみーゆを紹介するサイト</small>
                </p>
            </footer>
        </div>
    );
};

export default PortfolioLayout;

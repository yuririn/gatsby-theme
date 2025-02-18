import React, { useEffect, useState } from 'react';
import Header from "./common/header";
import Footer from "./common/footer";

const Layout = ({ location, title, children }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath;

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }

        const handleLinkClick = (event) => {
            const link = event.target.closest('a[href^="#"]:not([href="#"])');
            if (!link) return;

            event.preventDefault();
            const targetId = decodeURIComponent(link.getAttribute('href').substring(1)); // URLデコード
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
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

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            <Header isRootPath={isRootPath} />
            
            <main>{children}</main>
            <button onClick={toggleTheme} className='c-btn--switch-mode' aria-label={theme === 'light' ? 'ライトモード' : 'ダークモード'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 345.427 345.428">
                    <path id="Icon_metro-sun4" data-name="Icon metro-sun4" d="M178.177,84.534a93,93,0,1,0,93,93,93.113,93.113,0,0,0-93-93Zm0-26.571a13.278,13.278,0,0,0,13.286-13.286V18.106a13.286,13.286,0,1,0-26.571,0V44.677A13.267,13.267,0,0,0,178.177,57.963Zm0,239.142a13.278,13.278,0,0,0-13.286,13.286v26.571a13.286,13.286,0,0,0,26.571,0V310.391A13.289,13.289,0,0,0,178.177,297.105ZM281.487,92.976,300.274,74.19A13.284,13.284,0,1,0,281.487,55.4L262.7,74.19a13.284,13.284,0,0,0,18.787,18.787ZM74.831,262.109,56.046,280.9a13.284,13.284,0,0,0,18.785,18.787L93.618,280.9a13.284,13.284,0,1,0-18.787-18.787ZM58.605,177.534A13.289,13.289,0,0,0,45.32,164.248H18.748a13.286,13.286,0,1,0,0,26.571H45.32A13.278,13.278,0,0,0,58.605,177.534Zm279-13.286H311.033a13.286,13.286,0,0,0,0,26.571H337.6a13.286,13.286,0,0,0,0-26.571ZM74.815,92.976A13.284,13.284,0,1,0,93.6,74.19L74.815,55.4A13.284,13.284,0,0,0,56.028,74.19Zm206.707,169.1a13.284,13.284,0,0,0-18.787,18.787l18.787,18.787a13.284,13.284,0,0,0,18.787-18.787Z" transform="translate(-5.463 -4.82)" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 194.162 217.254">
                    <path id="Icon_awesome-moon" data-name="Icon awesome-moon" d="M110.54,217.254a108.418,108.418,0,0,0,84.38-40.223,5.1,5.1,0,0,0-4.906-8.211A85.1,85.1,0,0,1,131.982,11.249a5.1,5.1,0,0,0-1.594-9.433A108.633,108.633,0,1,0,110.54,217.254Z" transform="translate(-1.913)" />
                </svg>
            </button>
            <Footer />
        </>
    );
};

export default Layout;

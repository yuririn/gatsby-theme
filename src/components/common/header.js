import * as React from "react"
import Logo from './logo';
import Nav from './global-nav';
import "../../scss/header.scss";

const Header = ({isRootPath}) => {
    return (
        <header className="l-header">
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

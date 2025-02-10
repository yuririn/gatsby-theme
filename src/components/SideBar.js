import * as React from "react"
import Search from "./search"
const SideBar =()=>{
    return (
        <aside className="l-container--blog__aside">
            <div className="l-container--blog__aside__inner">
                <h2>記事を探す</h2>
                <Search></Search>
            </div>
        </aside>
    )
}

export default SideBar

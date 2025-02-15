import * as React from "react"; 
import { Link } from "gatsby"
const Tags =({tags})=>{
    return (
        <ul className="c-article__tags">
            {tags.length > 0 && tags.map((item) => {
                return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
            })}
        </ul>
    )
}
export default Tags

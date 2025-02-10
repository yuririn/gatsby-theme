import * as React from "react"
import Img from "../common/img";
import { Link } from "gatsby"
const PostList = ({posts}) =>{
    return (
        <ul className="l-card-container">
        {posts.map((post, i) =>{
            console.log(post.frontmatter.tags )
        return (
            <li key={`article${i}`}>
                <article className="c-card">
                    <Link to={`/blogs/${post.fields.slug}`}>
                    <Img
                        source={post.frontmatter.hero}
                        alt={post.frontmatter.title}
                        key={post.frontmatter.title}
                        className="c-card__img"
                    />
                    <time
                        date={post.frontmatter.date.replace(/\./g, "-")}
                        className="c-card__date"
                    >
                        {post.frontmatter.date}
                    </time>
                    </Link>
                    <h3 className="c-card__title"><Link to={`/blogs/${post.fields.slug}`}>{post.frontmatter.title}</Link></h3>
                    <ul className="c-card__tags">
                        {post.frontmatter.tags.length > 0 && post.frontmatter.tags.map((item)=>{
                            return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
                        })}
                    </ul>
                </article>
            </li>
        )

        })}
        </ul>
    )
    
}
export default PostList;

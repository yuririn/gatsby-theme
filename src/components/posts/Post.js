import * as React from "react";
import Img from "../common/Img";
import { Link } from "gatsby"

const Post = ({ post, key }) => {
    

    return (
        <li key={`article${key}`}>
            <article className="c-card">
                <Link to={`/blogs/${post.fields.slug}`} className="c-card__img">
                    <Img
                        source={post.frontmatter.hero}
                        alt={post.frontmatter.title}
                        key={post.frontmatter.title}
                        sizes={[400,300,40]}
                    />
                </Link> <time
                    date={post.frontmatter.date.replace(/\./g, "-")}
                    className="c-card__date"
                >
                    {post.frontmatter.date}
                </time>
                <div className="c-card__main">
                    <h3 className="c-card__title"><Link to={`/blogs/${post.fields.slug}`}>{post.frontmatter.title}</Link></h3>
                    <ul className="c-card__tags">
                        {post.frontmatter.tags.length > 0 && post.frontmatter.tags.map((item) => {
                            return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
                        })}
                    </ul>
                </div>
            </article>
        </li>

    )

}
export default Post;

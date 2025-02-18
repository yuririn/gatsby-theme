import * as React from "react";
import Img from "../common/img";
import { Link } from "gatsby"
import dateReplace from "../../utils/datereplace";

/**
 * 
 * @param {Object} Markdown 記事データ
 * @param {Number} 処理回数
 * @returns 生成された記事ごとのHTML
 */
const Post = ({ post, key }) => {
    const {title, hero, date, tags } = post.frontmatter
    const pagePath = `/blogs/${post.fields.slug}`

    return (
        <li key={`article${key}`}>
            <article className="c-card">
                <Link to={pagePath} className="c-card__img">
                    <Img
                        source={hero}
                        alt={title}
                        key={title}
                        sizes={[400, 300, 40]}
                    />
                </Link> <time
                    date={dateReplace(date)}
                    className="c-card__date"
                >
                    {date}
                </time>
                <div className="c-card__main">
                    <h3 className="c-card__title"><Link to={`/blogs/${post.fields.slug}`}>{title}</Link></h3>
                    <ul className="c-card__tags">
                        {tags.length > 0 && tags.map((item) => {
                            return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
                        })}
                    </ul>
                </div>
            </article>
        </li>

    )

}
export default Post;

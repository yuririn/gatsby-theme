
import React from "react"
import { Link } from "gatsby"

const PrevAndNextNav = ({prev, next})=>{
    return (
        <ol className="c-pager">
            <li className="c-pager__prev">
                {prev && (
                    <>
                        <span className="c-pager__prev__label">Previous</span>
                        <Link to={`/blogs/${prev.fields.slug}/`} rel="prev">
                            {prev.frontmatter.title}
                        </Link>
                    </>
                )}
            </li>
            <li className="c-pager__next">
                {next && (
                    <>
                    <span className="c-pager__next__label">Next</span>
                    <Link to={`/blogs/${next.fields.slug}/`} rel="next">
                        {next.frontmatter.title}
                    </Link>
                    </>
                )}
            </li>
        </ol>
    )
}

export default PrevAndNextNav;

import { Link } from "gatsby"
import React from "react"

const Li = ({ num, current, path }) => {
	if (current) {
		return (
			<li className="c-pager--archive__current"><span>{num}</span></li>
		)
	} else {
		return (
			<li><Link to={path}>{num}</Link></li>
		)
	}
}

const Prev = ({ num, current, path }) => {
	console.log(current < num)
	if (current === '') {
		return (
			<li className="c-pager--archive__prev not-work"><span>Newer</span></li>
		)
	} else if (current === 2) {
		return (
			<li className="c-pager--archive__prev"><Link to={`/blogs/`}>Newer</Link></li>
		)
	} else {
		return (
			<li className="c-pager--archive__prev"><Link to={`/blogs/page/${current - 1}`}>Newer</Link></li>
		)
	}
}

const Next = ({ num, current, path }) => {
	if (current === num) {
		return (
			<li className="c-pager--archive__next not-work"><span>Older</span></li>
		)
	} else {
		return (
			<li className="c-pager--archive__next"><Link to={`/blogs/page/${current + 1}`}>Older</Link></li>
		)
	}
}

const Pagination = ({ num, current }) => {
	let array = []
	for (let index = 1; index <= num; index++) {
		array.push(index)
	}

	return (
		<div class="ccm-pagination-wrapper">
			<ol className="c-pager--archive p-section">
				<Prev current={current} num={num} />
				{(array || []).map(i => (
					i === 1 ?
						<Li num={i} current={current === ''} path={`/blogs/`} />
						:
						<Li num={i} current={current === i} path={`/blogs/page/${i}`} />

				))
				}
				<Next current={current} num={num} />
			</ol>
		</div>
	)
}

export default Pagination

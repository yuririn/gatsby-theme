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

const Prev = ({ current, type }) => {
	if (current === 1) {
		return (
			<li className="c-pager--archive__prev not-work"><span>Newer</span></li>
		)
	} else if (current === 2) {
		return (
			<li className="c-pager--archive__prev"><Link to={`/blogs/${type}`}>Newer</Link></li>
		)
	} else {
		return (
			<li className="c-pager--archive__prev"><Link to={`/blogs/${type}page/${current - 1}`}>Newer</Link></li>
		)
	}
}

const Next = ({ num, current, type }) => {
	if (current === num) {
		return (
			<li className="c-pager--archive__next not-work"><span>Older</span></li>
		)
	} else {
		return (

			current === '' ? <li className="c-pager--archive__next"><Link to={`/blogs/${type}page/2`}>Older</Link></li> :
				<li className="c-pager--archive__next"><Link to={`/blogs/${type}page/${current + 1}`}>Older</Link></li>
		)
	}
}

const Skip = ({ show }) => {
	return (
		show ? <li>...</li> : ''
	)
}

const Pagination = ({ num, current, type }) => {
	let array = []
	for (let index = 1; index <= num; index++) {
		array.push(index)
	}



	if (num < 6) {
		return (
			<div class="ccm-pagination-wrapper">
				<ol className="c-pager--archive p-section">
					<Prev current={current} num={num} type={type} />
					{(array || []).map(i => (

						i === 1 ? <Li num={i} current={current === i} path={`/blogs/${type}`} type={type} /> : <Li num={i} current={current === i} path={`/blogs/${type}page/${i}`} type={type} />

					)
					)}
					<Next current={current} num={num} type={type} />
				</ol>
			</div>
		)
	} else {
		if (num >= 8) {
			if (current <= 3 || current === '') {
				array = []
				for (let index = 1; index <= 5; index++) {
					array.push(index)
				}

				return (
					<div class="ccm-pagination-wrapper">
						<ol className="c-pager--archive p-section">
							<Prev current={current} num={num} type={type} />
							{(array || []).map(i => (

								i === 1 ? <Li num={i} current={current === i} path={`/blogs/${type}`} type={type} /> : <Li num={i} current={current === i} path={`/blogs/${type}page/${i}`} type={type} />

							))
							}
							<li>...</li>
							<li><Link to={`/blogs/${type}page/${num}`}>{num}</Link></li>
							<Next current={current} num={num} type={type} />
						</ol>
					</div>
				)


			} else if (current >= num - 3) {
				array = []
				for (let index = num - 4; index <= num; index++) {
					array.push(index)
				}
				return (
					<div class="ccm-pagination-wrapper">
						<ol className="c-pager--archive p-section">
							<Prev current={current} num={num} type={type} />
							<li><Link to={`/blogs/${type}`}>1</Link></li>
							<li>...</li>
							{(array || []).map(i => (

								i === 1 ? <Li num={i} current={current === i} path={`/blogs/${type}`} type={type} /> : <Li num={i} current={current === i} path={`/blogs/${type}page/${i}`} type={type} />

							))
							}
							<Next current={current} num={num} type={type} />
						</ol>
					</div>
				)
			} else {
				array = []
				for (let index = current - 2; index <= current + 2; index++) {
					array.push(index)
				}

				return (
					<div class="ccm-pagination-wrapper">
						<ol className="c-pager--archive p-section">
							<Prev current={current} num={num} type={type} />
							<li><Link to={`/blogs/${type}`}>1</Link></li>
							<Skip show={current !== num + (current - 3)} />
							{(array || []).map(i => (
								<Li num={i} current={current === i} path={`/blogs/${type}page/${i}`} />

							))
							}
							<Skip show={current !== num - (current + 2)} />
							<li><Link to={`/blogs/${type}page/${num}`}>{num}</Link></li>
							<Next current={current} num={num} type={type} />
						</ol>
					</div>
				)
			}
		} else {
			return (
				''
			)

		}

	}
}

export default Pagination

import React from 'react';
import { Link } from 'gatsby';

const BreadCrumbList = ({ type, current }) => (
	<ol className="c-breadcramb">
		<li><Link to="/">ホーム</Link></li>
		{type === `blog` ? <li><Link to="/blogs/">ブログ一覧</Link></li> : ''}
		<li>{current}</li>
	</ol>

);

export default BreadCrumbList;

import React from 'react';
import { Link } from 'gatsby';
import { siteMetadata } from "../../../gatsby-config"

const BreadCrumbList = ({ type, current }) => (
	<ol className="c-breadcramb">
		<li><Link to="/">Home</Link></li>
		{type === `blog` ? <li><Link to="/blogs/">blogs</Link></li> : ''}
		<li>{current}</li>
	</ol>

);

export default BreadCrumbList;

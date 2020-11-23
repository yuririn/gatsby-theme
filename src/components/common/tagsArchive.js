import React from 'react';
import { Link } from 'gatsby';

const Tag = ({ tag }) => (
	<li className="p-tagList__item">
		< Link to={`/blogs/tags/${encodeURI(tag)}/`}> {tag}</Link >
	</li>
);

const Tags = ({ tags }) => (
	<ul className="p-tagList">
		{(tags || []).map(tag => (
			<Tag key={tag} tag={tag} />
		))}
	</ul>
);

export default Tags;

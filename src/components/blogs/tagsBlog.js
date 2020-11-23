import React from 'react';
import { Link } from 'gatsby';

const Tag = ({ tag }) => (
	<Link to={`/blogs/tags/${encodeURI(tag)}/`}>{tag}</Link>
);

const Tags = ({ tags }) => (
	<p className="c-article__ganre">
		{(tags || []).map(tag => (
			<Tag key={tag} tag={tag} />
		))}
	</p>
);

export default Tags;

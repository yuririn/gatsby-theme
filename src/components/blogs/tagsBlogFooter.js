import React from 'react';
import { Link } from 'gatsby';

const Tag = ({ tag }) => (
	<dd className="p-tagList__item"><Link to={`/blogs/tags/${encodeURI(tag)}/`}>{tag}</Link></dd>
);

const TagsFooter = ({ tags }) => (
	<dl className="c-article__tags p-tagList--sm.p-section">
		<dt>Tags</dt>
		{(tags || []).map(tag => (
			<Tag key={tag} tag={tag} />
		))}
	</dl>
);

export default TagsFooter;

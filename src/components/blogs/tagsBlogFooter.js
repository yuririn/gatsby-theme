import React from 'react';
import { Link } from 'gatsby';

const Tag = ({ tag }) => (
	<Link to={`/blogs/tags/${encodeURI(tag)}/`}>{tag}</Link>
);

const TagsFooter = ({ tags }) => (
	<dl className="c-article__tags p-tagList--sm.p-section">
		<dt>Tags</dt>
		<dd className="p-tagList__item">
			{(tags || []).map(tag => (
				<Tag key={tag} tag={tag} />
			))}
		</dd>
	</dl>
);

export default TagsFooter;

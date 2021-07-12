import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Tag = ({ tag }) => (
  <li className="p-tagList__item">
    <Link to={`/blogs/tags/${encodeURI(tag)}/`}> {tag}</Link>
  </li>
);

const Tags = ({ tags }) => {
  return (
    <TagList>
      <ul>
        {(tags || []).map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </ul>
    </TagList>
  );
};

export default Tags;

const TagList = styled.div`
  ul {
    list-style: none;
  }
`;

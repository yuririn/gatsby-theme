import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const BreadCrumbList = ({ type, current, cate = '', tag='' }) => {
  return (
    <BreadCrumb className={type === `blog` ? 'blog':''}>
        <li>
          <Link to="/">銀ねこアトリエ</Link>
        </li>
        {type === `blog` ? (
          <li>
            <Link to="/blogs/">ノマドブログ</Link>
          </li>
        ) : (
          ""
        )}
        {cate !== '' ? (
          <li>
            <Link to={cate.url}>{cate.name}</Link>
          </li>
        ) : (
          ""
        )}
        {tag !== '' ? (
          <li>
            <Link to={`/blogs/tags/${tag}`}>{tag}</Link>
          </li>
        ) : (
          ""
          )}
        {type === `blog` ? (
          ""
        ):(
          <li>{current}</li>
        )}
    </BreadCrumb>
  );
};

export default BreadCrumbList;

const BreadCrumb = styled.ol`

    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
        padding-left: 15px;
    padding-right: 15px;
    @media screen and (min-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  list-style: none;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }

    li {
      display: inline-block;
      font-size: 1.4rem;
      margin-bottom: 5px;

      a {
        color: var(--color-blue);
        @media screen and (min-width: 768px) {
          &:hover {
            text-decoration: none;
          }
        }
      }
      &::after {
        content: "";
        margin: 0 13px 0 10px;
        display: inline-block;
        width: 4px;
        height: 4px;
        border-right: 2px solid var(--color-blue);
        border-top: 2px solid var(--color-blue);
        transform: rotate(45deg);
      }
      &:last-child::after {
        content: none;
      }
    }
    &.blog {
      margin-bottom: 10px;
      li:last-child::after {
        content: "";
      }
      @media screen and (min-width: 768px) {
        margin-bottom: 8px;
        margin-top: 36px;
      }
    }

  }
`;

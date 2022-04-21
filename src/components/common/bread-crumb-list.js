import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const BreadCrumbList = ({ type, current, cate = '' }) => {
  return (
    <BreadCrumb>
      <ol>
        <li>
          <Link to="/">ホーム</Link>
        </li>

        {type === `blog` ? (
          <li>
            <Link to="/blogs/">海外ノマドブログ</Link>
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
        <li>{current}</li>
      </ol>
    </BreadCrumb>
  );
};

export default BreadCrumbList;

const BreadCrumb = styled.div`
  ol {
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
      &:last-child::after {
        content: none;
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
    }
  }
`;

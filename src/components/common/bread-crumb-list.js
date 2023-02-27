import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import {siteMetadata} from "../../../gatsby-config"
import Ad from '../../templates/ad-post';

const BreadCrumbList = ({ type, current, cate = '', tag='' }) => {
  const {ad} = siteMetadata
  const thisClass = type === `blog` ? 'blog': (type === `ad` ? `ad`: '')
  return (
    <BreadCrumb className={thisClass}>
      {type === `ad` ? (
          <li>
          <Link to="/choco-blog/">{ad.title}</Link>
          </li>
        ) : (
          <li>
          <Link to="/">銀ねこアトリエ</Link>
          </li>
        )}

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
        {type === `blog` || `ad` ? (
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
    &.blog,&.ad {
      margin-bottom: 10px;
      li:last-child::after {
        content: "";
      }
      @media screen and (min-width: 768px) {
        margin-bottom: 8px;
        margin-top: 36px;
      }
    }
    &.ad {
      padding-left: 0;
      padding-right: 0;
      font-size: 12px;
     margin-top:0;
      margin-bottom: 0;
      a {
        color: var(--color-sec);
      }
      li {
        &::after {
          border-right: var(--color-sec) 2px solid ;
          border-top: var(--color-sec) 2px solid ;
        }
      }
    }

  }
`;

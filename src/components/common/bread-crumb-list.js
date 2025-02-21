import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import {siteMetadata} from "../../../gatsby-config"

const BreadCrumbList = ({ list }) => {
  const { shortName } = siteMetadata
  const { parents, current } = list
  console.log(current)
  const trimText = (text, maxLength) => {
    if (!text) {
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '…';
  };
  return (
    <ol className="c-breadcrumb-list">
      <li>
        <Link to="/">{shortName}</Link>
      </li>
      {parents && parents.map(item => <li><Link to={item.path}>{item.name}</Link></li>)}
      <li>{trimText(current, 20)}</li>
    </ol>
  )
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

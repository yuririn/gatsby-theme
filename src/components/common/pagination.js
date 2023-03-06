import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const Item = ({ num, current, path }) => {
  return current ? (<span>{num}</span>) : (<Link to={path}>{num}</Link>)
}

const Pagination = ({ num, current, type }) => {
  const arr = [...Array(num).keys()].map(i => i + 1)
  if (num > 0) {
    const newwerClass = current === 1 ? 'c-pager--archive__prev not-work' : 'c-pager--archive__prev'
    const newerLink = current === 2 ? `/blogs/${type}` : `/blogs/${type}page/${current - 1}/`
    const newer = (
      <li className={newwerClass} key="pager-newer">
        {current === 1 ? (<span>Newer</span>):(<Link to={newerLink}>Newer</Link>)}
      </li>
    )
    const olderClass = current === num  ? 'c-pager--archive__next not-work' : 'c-pager--archive__next'
    const olderLink = current === "" ? `/blogs/${type}` : `/blogs/${type}page/${current + 1}/`
    const older = (
      <li className={olderClass} key="pager-newer">
        {current === num ? (<span>Older</span>):(<Link to={olderLink}>Older</Link>)}
      </li>
    )
    return (
      <PagerWrapper>
        {newer}
        {arr.map(i => {
          const className = current === i ? "c-pager--archive__current c-pager--archive__num" : "c-pager--archive__num"
          const path = i === 1 ? `/blogs/${type}` : `/blogs/${type}page/${i}/`
          return <li className={className} key={`pager${i}`}><Item
                  num={i}
                  current={current === i}
                  path={path}
                  type={type}
                  key={`item${i}`}
                /></li>
        })}
         {older}
      </PagerWrapper>
    )
  } else {
    return ""
  }
}

export default Pagination

const PagerWrapper = styled.ul`
  min-height: 80px;
  position: relative;
  text-align: center;
  ol {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: var(--background);
  }
  .c-pager--archive__next--current:before,
  .c-pager--archive__next:before {
    right: 0;
    transition: 0.5s;
    transform: skew(45deg);
  }
  li {
    display: inline-block;
    &.skip {
      display: none;
      @media only screen and (min-width: 768px) {
        display: inline-block;
      }
    }
  }
  .c-pager--archive__next,
  .c-pager--archive__next--current,
  .c-pager--archive__prev,
  .c-pager--archive__prev--current {
    z-index: 1;
    overflow: hidden;
    border: 1px solid var(--color-blue);
    top: 0;
    position: absolute;
    border-radius: 5px;
    color: var(--background);
    transition: 0.5s;
  }
  .c-pager--archive__prev--current:before,
  .c-pager--archive__prev:before {
    left: 0;
    transition: 0.5s;
    transform: skew(-45deg);
  }
  @media screen and (min-width: 768px) {
    .c-pager--archive__prev:hover {
      a {
        color: var(--color-blue);
      }
      &:before {
        left: -120%;
      }
    }
    .c-pager--archive__next:hover {
      a {
        color: var(--color-blue);
      }
      &:before {
        right: -120%;
      }
    }
  }
  .c-pager--archive__next--current:before,
  .c-pager--archive__next:before,
  .c-pager--archive__prev--current:before,
  .c-pager--archive__prev::before {
    z-index: -1;
    position: absolute;
    content: "";
    top: 0;
    width: 120%;
    height: 100%;
    display: block;
    background: var(--color-blue);
  }
  .c-pager--archive__next--current a,
  .c-pager--archive__next a {
    color: var(--background);
  }
  .c-pager--archive__prev,
  .c-pager--archive__prev--current {
    left: 0;
    display: inline-block !important;
    a,
    span {
      transition: 0.3s;
      display: block;
      padding: 10px 50px !important;
      @media only screen and (min-width: 768px) {
        padding: 15px 50px !important;
      }
    }
  }
  .c-pager--archive__next,
  .c-pager--archive__next--current {
    right: 0;
    display: inline-block !important;
    a,
    span {
      transition: 0.3s;
      display: block;
      padding: 10px 50px !important;
      @media only screen and (min-width: 768px) {
        padding: 15px 50px !important;
      }
    }
  }
  .not-work {
    opacity: 0.7;
    pointer-events: none;
  }
  .c-pager--archive__num {
    display: none;
    @media only screen and (min-width: 768px) {
      display: inline-block;
    }
    span {
      display: block;
      border-radius: 50%;
      height: 35px;
      font-size: 1.2rem;
      width: 35px;
      border: 1px solid var(--color-blue);
      text-align: center;
      line-height: 33px;
      margin-left: 5px;
      margin-right: 5px;
      color: var(--color-blue);
    }
    a {
      display: block;
      border-radius: 50%;
      height: 35px;
      font-size: 1.2rem;
      width: 35px;
      border: 1px solid var(--color-blue);
      text-align: center;
      line-height: 33px;
      margin-left: 5px;
      margin-right: 5px;
      background: var(--color-blue);
      color:var(--background);
      @media screen and (min-width: 768px) {
        transition: 0.3s;
        &:hover {
          color: var(--color-blue);
          background: var(--background);
        }
      }
    }
  }
`

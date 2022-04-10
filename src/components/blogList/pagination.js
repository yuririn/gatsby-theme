import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const Li = ({ num, current, path }) => {
  if (current) {
    return (
      <li className="c-pager--archive__current c-pager--archive__num">
        <span>{num}</span>
      </li>
    )
  } else {
    return (
      <li className="c-pager--archive__num">
        <Link to={path}>{num}</Link>
      </li>
    )
  }
}
const Skip = ({ num }) => {
  return (
    <li className="skip" key={`pager${num}`}>
      ...
    </li>
  )
}

const Pagination = ({ num, current, type }) => {
  const arr = [...Array(num).keys()].map(i => i + 1)
  const newer =
    current === 1 ? (
      <li className="c-pager--archive__prev not-work" key="pager-newer">
        <span>Newer</span>
      </li>
    ) : current === 2 ? (
      <li className="c-pager--archive__prev" key="pager-newer">
        <Link to={`/blogs/${type}`}>Newer</Link>
      </li>
    ) : (
      <li className="c-pager--archive__prev" key="pager-newer">
        <Link to={`/blogs/${type}page/${current - 1}/`}>Newer</Link>
      </li>
    )
  const older =
    current === num ? (
      <li className="c-pager--archive__next not-work" key="pager-older">
        <span>Newer</span>
      </li>
    ) : current === "" ? (
      <li className="c-pager--archive__next" key="pager-older">
        <Link to={`/blogs/${type}`}>Older</Link>
      </li>
    ) : (
      <li className="c-pager--archive__next" key="pager-older">
        <Link to={`/blogs/${type}page/${current + 1}/`}>Older</Link>
      </li>
    )
  if (num > 0) {
    return (
      <PagerWrapper>
        {newer}
        {arr.map(i => {
          const path = i === 1 ? `/blogs/${type}` : `/blogs/${type}page/${i}/`
          if (num > 6) {

            if (current <= 3 || current === "") {
              if (arr.length === i) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager-first`}
                  ></Li>
                )
              } else if (arr.length - 1 === i) {
                return <Skip key={i}></Skip>
              } else if (i < 6) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager${i}`}
                  ></Li>
                )
              }
            } else if (current >= num - 3) {
              if (i === 1) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager${i}`}
                  ></Li>
                )
              }
              if (i === 2) {
                return <Skip key={i}></Skip>
              } else if (arr.length - 5 < i) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager${i}`}
                  ></Li>
                )
              }
            } else {
              if (i === 1) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager${i}`}
                  ></Li>
                )
              } else if (i === 2) {
                return <Skip key={i}></Skip>
              } else if (current + 3 > i && current - 2 < i) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager${i}`}
                  ></Li>
                )
              } else if (arr.length === i) {
                return (
                  <Li
                    num={i}
                    current={current === i}
                    path={path}
                    type={type}
                    key={`pager${i}`}
                  ></Li>
                )
              } else if (arr.length - 1 === i) {
                return <Skip key={i}></Skip>
              }
            }
          } else {
            return (
              <Li
                num={i}
                current={current === i}
                path={path}
                type={type}
                key={`pager${i}`}
              ></Li>
            )
          }
        })}
        {older}
      </PagerWrapper>
    )
  } else {
    return ""
  }
}

export default Pagination

const PagerWrapper = styled.div`
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

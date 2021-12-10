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

const Prev = ({ current, type }) => {
  if (current === 1) {
    return (
      <li className="c-pager--archive__prev not-work">
        <span>Newer</span>
      </li>
    )
  } else if (current === 2) {
    return (
      <li className="c-pager--archive__prev">
        <Link to={`/blogs/${type}`}>Newer</Link>
      </li>
    )
  } else {
    return (
      <li className="c-pager--archive__prev">
        <Link to={`/blogs/${type}page/${current - 1}/`}>Newer</Link>
      </li>
    )
  }
}

const Next = ({ num, current, type }) => {
  if (current === num) {
    return (
      <li className="c-pager--archive__next not-work">
        <span>Older</span>
      </li>
    )
  } else {
    return current === "" ? (
      <li className="c-pager--archive__next">
        <Link to={`/blogs/${type}page/2/`}>Older</Link>
      </li>
    ) : (
      <li className="c-pager--archive__next">
        <Link to={`/blogs/${type}page/${current + 1}/`}>Older</Link>
      </li>
    )
  }
}

const Skip = ({ show }) => {
  return show ? <li className="skip">...</li> : ""
}

const Pagination = ({ num, current, type }) => {
  let array = []
  for (let index = 1; index <= num; index++) {
    array.push(index)
  }

  if (num < 6) {
    return (
      <PagerWrapper>
        <ol className="c-pager--archive p-section">
          <Prev current={current} num={num} type={type} />
          {(array || []).map(i =>
            i === 1 ? (
              <Li
                num={i}
                current={current === i}
                path={`/blogs/${type}`}
                type={type}
              />
            ) : (
              <Li
                num={i}
                current={current === i}
                path={`/blogs/${type}page/${i}/`}
                type={type}
              />
            )
          )}
          <Next current={current} num={num} type={type} />
        </ol>
      </PagerWrapper>
    )
  } else {
    if (num >= 8) {
      if (current <= 3 || current === "") {
        array = []
        for (let index = 1; index <= 5; index++) {
          array.push(index)
        }

        return (
          <PagerWrapper>
            <ol className="c-pager--archive p-section">
              <Prev current={current} num={num} type={type} />
              {(array || []).map(i =>
                i === 1 ? (
                  <Li
                    num={i}
                    current={current === i}
                    path={`/blogs/${type}`}
                    type={type}
                  />
                ) : (
                  <Li
                    num={i}
                    current={current === i}
                    path={`/blogs/${type}page/${i}/`}
                    type={type}
                  />
                )
              )}
              <li className="skip">...</li>
              <li className="c-pager--archive__num">
                <Link to={`/blogs/${type}page/${num}/`}>{num}</Link>
              </li>
              <Next current={current} num={num} type={type} />
            </ol>
          </PagerWrapper>
        )
      } else if (current >= num - 3) {
        array = []
        for (let index = num - 4; index <= num; index++) {
          array.push(index)
        }
        return (
          <PagerWrapper>
            <ol className="c-pager--archive p-section">
              <Prev current={current} num={num} type={type} />
              <li className="c-pager--archive__num">
                <Link to={`/blogs/${type}`}>1</Link>
              </li>
              <li className="skip">...</li>
              {(array || []).map(i =>
                i === 1 ? (
                  <Li
                    num={i}
                    current={current === i}
                    path={`/blogs/${type}`}
                    type={type}
                  />
                ) : (
                  <Li
                    num={i}
                    current={current === i}
                    path={`/blogs/${type}page/${i}/`}
                    type={type}
                  />
                )
              )}
              <Next current={current} num={num} type={type} />
            </ol>
          </PagerWrapper>
        )
      } else {
        array = []
        for (let index = current - 1; index <= current + 2; index++) {
          array.push(index)
        }

        return (
          <PagerWrapper>
            <ol className="c-pager--archive p-section">
              <Prev current={current} num={num} type={type} />
              <li className="c-pager--archive__num">
                <Link to={`/blogs/${type}`}>1</Link>
              </li>
              <Skip show={current !== num + (current - 3)} />
              {(array || []).map(i => (
                <Li
                  num={i}
                  current={current === i}
                  path={`/blogs/${type}page/${i}/`}
                />
              ))}
              <Skip show={current !== num - (current + 3)} />
              <li className="c-pager--archive__num">
                <Link to={`/blogs/${type}page/${num}/`}>{num}</Link>
              </li>
              <Next current={current} num={num} type={type} />
            </ol>
          </PagerWrapper>
        )
      }
    } else {
      return ""
    }
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
    color: #fff;
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
    color: #fff;
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
    color: #fff;
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
      color: #fff;
      @media screen and (min-width: 768px) {
        transition: 0.3s;
        &:hover {
          color: var(--color-blue);
          background: #fff;
        }
      }
    }
  }
`

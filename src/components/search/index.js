import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import TextHighlighter from "./texthighlighter"
import styled from "styled-components"

const SearchResult =  (props) => {
  // 全記事データ取得 //
  const tempData = useStaticQuery(graphql`
    query SearchData {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY.MM.DD")
              title
              tags
              cateId
              description
              hero
            }
          }
        }
      }
    }
  `)
  const [data, setData] = useState([])
  useEffect(() => {
    const temp = []
    tempData.allMarkdownRemark.edges.map(e => {
      temp.push(e.node)
    })
    setData(temp)
  }, [])

  // 表示非表示の切り替え //
  const [className, setClassName] = useState("")
  useEffect(() => {
    let id
    if (props.focus && props.value !== "") {
      id = setTimeout(() => {
        setClassName("active")
      }, 100)
    } else {
      id = setTimeout(() => {
        setClassName("")
      }, 100)
    }
    return () => {
      clearTimeout(id)
    }
  }, [props.focus, props.value])

  // 検索処理 //
  const [result, setResult] = useState([])
  const search = () => {
    const value = props.value.toLowerCase()
    const temp = data.filter(e => {
      let tags = ""
      let category = ""
      let description = ""
      if (e.frontmatter.tags) {
        tags = e.frontmatter.tags.join(" ").toLowerCase()
      }
      if (e.frontmatter.description) {
        description = e.frontmatter.description.toLowerCase()
      }
      if (e.frontmatter.category) {
        category = e.frontmatter.category.toLowerCase()
      }
      const target = `
				${e.frontmatter.title.toLowerCase()}
				${category}
				${tags}
				${description}
			`
      return target.indexOf(value) !== -1
    })
    setResult(temp)
  }
  useEffect(() => {
    if (props.value !== "") {
      search()
    }
  }, [props.value])

  return (
    <ResultList>
      <div className="result-inner">
        {result !== null && result.length !== 0 ? (
          <p>
            <b>{result.length}</b>件ヒットしました
          </p>
        ) : (
          ""
        )}

        <ul>
          {result.map(e => {
            return (
              <li key={e.fields.slug}>
                <Link to={e.fields.slug}>
                  <time>{e.frontmatter.date}</time>
                  <TextHighlighter
                    str={e.frontmatter.title}
                    includes={props.value}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </ResultList>
  )
}

const Search = props => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState("")
  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setFocus(false)
  }
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <SearchBox>
      <div focus={focus}>
        <input
          type="text"
          placeholder="検索する"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          className="box"
        />
        <SearchResult focus={focus} value={value} />
      </div>
    </SearchBox>
  )
}
export default Search

const SearchBox = styled.div`
  margin-bottom: 20px;

  .box {
    display: block;
    border-radius: 10px;
    padding: 10px;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    background: var(--background);
    color: var(--font-color);
    border: solid 1px var(--color-blue);
    box-sizing: border-box;
    outline: none;
    font-size: 1.6rem;
    box-shadow: none;


  }
`

const ResultList = styled.div`
  .result-inner {
    margin-top: 20px;
    margin-bottom: 50px;

    p {
      text-align: center;
    }
  }
  ul {
    margin-top: 20px;
    background: var(--pale-gray);
    max-height: 300px;
    overflow: auto;
    margin-bottom: 50px;
    border-radius: 10px;
  }
  li {
    padding: 10px 20px;
    margin-bottom: 5px;
    font-weight: bold;
    line-height: 1.8;
  }
  li a {
    color: var(--color-blue);
  }

  li time {
    display: block;
    font-weight: normal;
    font-size: 1.2rem;
  }

  @media screen and (min-width: 768px) {
    li {
      text-indent: -100px;
      margin-left: 100px;
    }
    li a {
      text-decoration: underline;
    }

    li time {
      font-size: 1.4rem;
      width: 100px;
      text-indent: 0;
      display: inline-block;
      font-weight: bold;
      color: var(--font-color);
    }
  }
`

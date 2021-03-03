import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import TextHighlighter from "./texthighlighter"
import style from "./style.module.css"

const SearchResult = props => {
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
              category
              description
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
    <div className={className}>
      <div className="result-inner">
        {result !== null ? (
          <p className={style.result}>
            <b>{result.length}</b>件ヒットしました
          </p>
        ) : (
          ""
        )}

        <ul className={style.resultList}>
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
    </div>
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
    <div focus={focus}>
      <div className={style.searchBox}>
        <input
          type="text"
          placeholder="検索する"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      <SearchResult focus={focus} value={value} />
    </div>
  )
}
export default Search

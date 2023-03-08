import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import TextHighlighter from "./texthighlighter"
import styled from "styled-components"

const SearchResult =  (props) => {
  // 全記事データ取得 //
  const tempData = useStaticQuery(graphql`query ChocoSearchData {
  allMdx(
    sort: {frontmatter: {date: DESC}}
    limit: 1000
    filter: {frontmatter: {pagetype: {eq: "ad"}}}
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
          pagetype
        }
      }
    }
  }
}`)
  const [data, setData] = useState([])
  useEffect(() => {
    const temp = []
    tempData.allMdx.edges.map(e => {
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

      <div className="c-search__list">
        {result !== null && result.length !== 0 ? (
          <p><strong>{result.length}</strong>件ヒットしました</p>

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

  )
}

const ChocoSearch = props => {
  const [value, setValue] = useState("")
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className="c-search">
      <input
        type="text"
        placeholder="検索する"
        onChange={onChange}
        className="c-search__box"
      />
      <SearchResult value={value} pagetype={props.type}/>
    </div>
  )
}
export default ChocoSearch


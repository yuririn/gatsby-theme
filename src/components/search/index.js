import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

const SearchResult =  (props) => {
  // 全記事データ取得 //
    const tempData = useStaticQuery(graphql`query SearchData {
    allMdx(filter: {frontmatter: {pagetype: {ne: "ad"}}},sort: {frontmatter: {date: DESC}}, limit: 1000) {
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
      if(props.pagetype === 'ad') {
        if(e.node.frontmatter.pagetype === 'ad') temp.push(e.node)
      } else {
        if(e.node.frontmatter.pagetype !== 'ad') temp.push(e.node)
      }
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
    <>{
      props.value !== '' && (<div className="c-search__result">
        <p className={props.value !== '' && result.length === 0 ? `` : `no-result`}>
          <strong>{result.length}</strong>件 ヒットしました
        </p>

        <ul>
          {result.map(e => {
            // const temp = props.value.toLowerCase()
            const title = e.frontmatter.title
            const start = title.indexOf(props.value.toLowerCase())
            const end = start + props.value.length
            const item = title.slice(start, end)
            const res = title.replace(
              item,
              `<span style="color: var(--color-accent)">${item}</span>`
            )
            return (
              <li key={e.fields.slug}>
                <Link to={e.fields.slug}>
                  <time>{e.frontmatter.date}</time>
                  <span dangerouslySetInnerHTML={{ __html: res }} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>)
    }
    </>
  )
}

const Search = props => {
  const [value, setValue] = useState("")
  const onChange = e => {
    setValue(e.target.value)
  }
  const [isSearch, showSearch] = useState(false)
  const click = e => {
    isSearch === false
      ? document.body.classList.add("no-scroll--search")
      : document.body.classList.remove("no-scroll--search")
    showSearch(!isSearch)
    setValue('')
  }
  return (
      <div className={`c-search${value? ' active' : ''}`}>
          <button className="c-search__btn" type="button" onClick={click}>Search</button>
        <div className={`c-search__inner${isSearch? ' show' : ''}`} >

          <input
            type="text"
            placeholder="検索する"
            onChange={onChange}
            onKeyUp={onChange}
            className="c-search__form"
            value={value}
          />
          <SearchResult value={value} pagetype={props.type}/>
          <div className={`c-search__bg${isSearch? ' show' : ''}`} onClick={click}></div>
        </div>
      </div>
  )
}
export default Search


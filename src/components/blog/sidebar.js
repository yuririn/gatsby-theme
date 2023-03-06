import React, { useState ,useEffect } from "react"
import Img from "./../common/img"
import RelatedList from "./related-list"
import { Sidebar } from "../../styles/blog-styles/sidebar"
import { siteMetadata } from "../../../gatsby-config"
import { Link } from "gatsby"
import Search from "../search"

const Side = ({ cateId, toc, tags, slug }) => {
  const [topics, setTopics] = useState(toc);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry)=>{
        if(entry.isIntersecting) {
          setTopics(
            topics.map(item => {
              if(`items` in item) {
                item.items.map(child=>{
                  child.target = child.url.replace(/^#/,'') === entry.target.id ? `current` : ``
                  return child
                })
              }
              item.target = item.url.replace(/^#/,'') === entry.target.id ? `current` : ``
              posChange(entry.target.textContent)
              return item
            })
          )
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);

    // // domから監視対象を取得
    let targets = Array.from(document.querySelectorAll('[itemprop=articleBody] h2, [itemprop=articleBody] h3'));

    // 監視対象をオブジェクトにセットする
    targets.forEach((terget) => observer.observe(terget, options));

  },[])

  const posChange =(title)=>{
    let heights = 0
    const topics = document.querySelector("#topic")
    let end = false;
    topics.querySelectorAll('li a').forEach((i, num) =>{
      if(num > 0) {
        let element = topics.querySelectorAll('li a')[num -1]
        if(end) return
        heights += element.clientHeight + 1;
        if(title === i.textContent) end = true
      }
    })
    topics.scrollTop = heights;
  }

  // オプションを定義
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };

  return (
    <Sidebar>
      <RelatedList category={cateId} tags={tags} slug={slug}></RelatedList>
      <section className="p-section">
        <h2 className="c-heading--lg--side">ジャンル</h2>
        <ul className="sideCateList">
          {siteMetadata.category.map((item, index) => {
            return (
              <li key={`side-ganre${index}`}>
                <Link to={`/blogs/${item.slug}/`}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </section>
      <section className="p-section search">
         <h2 className="c-heading--lg">記事を探す</h2>
        <Search></Search>
      </section>
      <div className="inner">
        <div className="side-topic">
          <h2 className="side-topic--heading">目次</h2>
          <ul id="topic">
            {topics.map(item =>{
              return (
                <li key={item.id} className={item.target}><a href={item.url} id={item.id}>{item.title}</a>
                  {item.items && (
                    <ul>
                      {item.items.map(child=><li key={child.id} className={child.target}><a href={child.url} id={child.id} >{child.title}</a></li>)}
                    </ul>
                    )}
                </li>
              )
            })}
          </ul>
        </div>

        <ul className="side-banner">

          <li>
            <Link to="/about/">
              <Img
                source="common/about-banner.jpg"
                alt="かみーゆを力一杯紹介"
              />
            </Link>
          </li>
          <li>
            <Link to="/blogs/tags/子ども服をセブに送るプロジェクト/">
              <Img
                source="common/cebu-cloths-banner.jpg"
                alt="捨てるなんてもったいない！子ども服をセブに送るプロジェクト"
              />
            </Link>
          </li>
          <li>
            <Link
              to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
              target="_blank"
              rel="noopener"
            >
              <Img source="common/youtube-banner.jpg" alt="YouTubeやってるよ" />
            </Link>
          </li>
        </ul>
        <h2>お仕事のご依頼</h2>
        <p className="u-text-center">
          <a className="p-btn--detail" href="/contact/">
            相談する
          </a>
        </p>
        <p className="u-text-center">
          <small>初見の方、30分無料相談承っております。</small>
        </p>
      </div>
    </Sidebar>
  )
}

export default Side

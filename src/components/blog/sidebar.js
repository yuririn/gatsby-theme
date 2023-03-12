import React, { useState ,useEffect } from "react"
import Img from "./../common/img"
import RelatedList from "./related-list"
import { siteMetadata } from "../../../gatsby-config"
import { Link } from "gatsby"
import Ad from '../common/ad'


const Side = ({ cateId, toc, tags, slug, location }) => {
  const [topics, setTopics] = useState(toc);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry, i)=>{

        if(entry.isIntersecting) {
          setTopics( () => {
            let num = 0
            return topics.map((item, i) => {
              item.dataId = num
              num++
              if(`items` in item) {
                item.items.map((child)=>{
                  child.dataId = num
                  num++
                  if(child.url.replace(/^#/,'') === entry.target.id){
                    child.target =  `current`
                  } else {
                    child.target =  ``
                  }
                  return child
                })
              }

              if(item.url.replace(/^#/,'') === entry.target.id){
                item.target =  `current`
                posChange(i)
              } else {
                item.target =  ``
              }
              return item
            })
          }
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

  const posChange = (id)=>{
    let heights = 0
    const lists =  document.querySelectorAll("#topic > li")
    for (let i = 0;  i < id; i++) {
      heights += lists[i].clientHeight + 1;
    }
    document.querySelector("#topic").scrollTop = heights;
  }

  // オプションを定義
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };

  return (
    <div className="l-sidebar">
      <p className="u-text-center contact--sidebar">
        <a className="p-btn--detail" href="/contact/">相談する</a>
         <small>初見の方、30分無料相談承っております。</small>
      </p>
      <div className="inner">
        {topics.map && (
          <div className="side-topic">
            <h2 className="side-topic--heading">目次</h2>
            <ul id="topic">
              {topics.map((item, i) =>{
                return (
                  <li key={item.id} id={`toc${item.dataId}`}><a href={item.url} className={item.target} >{item.title}</a>
                    {item.items && (
                      <ul>
                        {item.items.map(child=><li key={child.id}><a href={child.url} className={child.target}>{child.title}</a></li>)}
                      </ul>
                      )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        <Ad location={location.pathname}></Ad>

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
      </div>
    </div>
  )
}

export default Side

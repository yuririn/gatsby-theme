import React, { useState, useEffect } from "react"
import Img from "../img"
import { Sidebar } from "./../../styles/blog-styles/sidebar"
import { Link } from "gatsby"
import Search from "../search"
import Ad from '../common/ad';

const Bar = ({ topic,location }) => {
  const tableOfContent = topic.replace(/(<p>|<\/p>)/gi, "")
  // const options = {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.5
  // };
  // let lists = tableOfContent.replace(/(\n|<a href="#|<ul>|<\/ul>|<li>|<\/li>)/gi, "").split('<\/a>')
  // lists = lists.map(i => i.split('">'))
  // const array = []
  // let targets = Array.from(document.querySelectorAll('[itemprop=articleBody] h2, [itemprop=articleBody] h3'));
  // useEffect(() => {
  //   const callback = (entries) => {
  //     entries.forEach((entry, i)=>{
  //       console.log(entry.isIntersectin)
  //       if(entry.isIntersecting) {
  //         lists.forEach( id =>{
  //           console.log(id[0])
  //         })
  //       }
  //     })
  //   }
  //   const observer = new IntersectionObserver(callback, options);
  //   targets.forEach((terget) => observer.observe(terget));

  // },[])
  return (
    <Sidebar>
      <Ad location={location} style={{display:`block`, minWidth:`250px`}}></Ad>
      <div className="inner">

        <div
        className="side-topic"
          dangerouslySetInnerHTML={{
          __html: '<h2 class="side-topic--heading">この記事のサマリー</h2>' + tableOfContent,
        }}
        ></div>
        <section className="p-section search">
          <h2 className="c-heading--lg">記事を探す</h2>
          <Search></Search>
        </section>

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

export default Bar

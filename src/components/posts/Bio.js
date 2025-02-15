import React from "react"
import Img from "./../common/img"
import { Link } from "gatsby"
import config from "./../../../gatsby-config"

const Bio = () => {
    const author = config.siteMetadata.author;
    return (
        <>
            <div className="c-bio">
                <span className="c-bio__title">この記事を書いた人</span>
                <Img source="common/camille-pic.jpg" className="c-bio__img"></Img>
                <p className="c-bio__name">{author.name}/フロントエンドエンジニア</p>

                <p className="c-bio__message">資金ゼロからフィリピンで起業した海外ノマドエンジニア。IT業界10年以上でテクニカルディレクター（技術責任者）・エンジニア講師・ブリッジSEを経て<a href="https://lenz-ph.com" target="_blank" rel="noopener nofollow">LenzTechnologies Inc.</a>を設立し、代表を務める。CMS concreteCMSエバンジェリスト。テックブログ以外も「磨耗しない人生」や「海外ノマド」のライフスタイルについて発信。好きなものは肉とハイボール。
                </p>
                <p className="c-bio__footer">
                    <Link
                        to="https://twitter.com/LirioY"
                        target="_blank"
                        rel="noopener nofollow"
                        title="Twitter"
                    >
                        <svg width="26" height="27" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" role="img" fill="currentColor">
                            <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
                        </svg>
                    </Link>
                    <Link
                        to="https://www.instagram.com/yurico.k"
                        target="_blank"
                        rel="noopener nofollow"
                        title="Instagram"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="26" height="27"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                    </Link>
                    <Link
                        to="https://www.youtube.com/channel/UCbSgjkCIPucux8cFTuQcdcw"
                        target="_blank"
                        rel="noopener nofollow"
                        title="YouTube"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="26" height="27"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
                    </Link>
                    <Link
                        to="https://www2.slideshare.net/yurikamimori"
                        target="_blank"
                        rel="noopener nofollow"
                        title="SlideShare"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="slideshare" className="svg-inline--fa fa-slideshare fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="26" height="27"><path fill="currentColor" d="M187.7 153.7c-34 0-61.7 25.7-61.7 57.7 0 31.7 27.7 57.7 61.7 57.7s61.7-26 61.7-57.7c0-32-27.7-57.7-61.7-57.7zm143.4 0c-34 0-61.7 25.7-61.7 57.7 0 31.7 27.7 57.7 61.7 57.7 34.3 0 61.7-26 61.7-57.7.1-32-27.4-57.7-61.7-57.7zm156.6 90l-6 4.3V49.7c0-27.4-20.6-49.7-46-49.7H76.6c-25.4 0-46 22.3-46 49.7V248c-2-1.4-4.3-2.9-6.3-4.3-15.1-10.6-25.1 4-16 17.7 18.3 22.6 53.1 50.3 106.3 72C58.3 525.1 252 555.7 248.9 457.5c0-.7.3-56.6.3-96.6 5.1 1.1 9.4 2.3 13.7 3.1 0 39.7.3 92.8.3 93.5-3.1 98.3 190.6 67.7 134.3-124 53.1-21.7 88-49.4 106.3-72 9.1-13.8-.9-28.3-16.1-17.8zm-30.5 19.2c-68.9 37.4-128.3 31.1-160.6 29.7-23.7-.9-32.6 9.1-33.7 24.9-10.3-7.7-18.6-15.5-20.3-17.1-5.1-5.4-13.7-8-27.1-7.7-31.7 1.1-89.7 7.4-157.4-28V72.3c0-34.9 8.9-45.7 40.6-45.7h317.7c30.3 0 40.9 12.9 40.9 45.7v190.6z"></path></svg>
                    </Link>
                    <br></br>
                    <Link to="/about/">Read More</Link>
                </p>
            </div>
        </>
    )
}
export default Bio

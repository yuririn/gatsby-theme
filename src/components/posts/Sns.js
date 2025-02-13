import React from "react"
import { Link } from "gatsby"

const Sns = ({ url, title }) => {
    return (
        <div className="c-sns-btns">
        <dl>
            <dt>SHARE</dt>
            <dd className="c-sns-btns__items">
                <Link
                    className="c-sns-btns__fb"
                    to={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                    target="_blank"
                    rel="noopener nofollow"
                >
                        <svg xmlns="http://www.w3.org/2000/svg" width="29.733" height="30.199" viewBox="0 0 69.733 130.199">
                            <path id="Icon_awesome-facebook-f" data-name="Icon awesome-facebook-f" d="M66.773,73.237l3.616-23.563H47.779V34.383c0-6.446,3.158-12.73,13.284-12.73H71.342V1.592A125.345,125.345,0,0,0,53.1,0c-18.619,0-30.79,11.286-30.79,31.716V49.674H1.609V73.237h20.7V130.2H47.779V73.237Z" transform="translate(-1.609)" fill="rgb(59, 89, 152)"/>
                        </svg>

                </Link>
                <Link
                    className="c-sns-btns__tw"
                    to={`http://twitter.com/share?url=${url}&text=${title}`}
                    target="_blank"
                    rel="noopener nofollow"
                >
                        <svg width="26" height="27" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" role="img" fill="currentColor"><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" fill="#000"></path></svg>
                </Link>
                <Link
                    to={`https://b.hatena.ne.jp/entry/${url}`}
                    target="_blank"
                    className="c-sns-btns__hateb"
                    rel="noopener nofollow"
                >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 90 90">
                            <rect width="90" height="90" rx="18.342" fill="#00a4de"></rect>
                            <path d="M50.076,46.458a9.682,9.682,0,0,0-6.8-3.06,11,11,0,0,0,5.652-3.114,8.15,8.15,0,0,0,1.764-5.526A9.893,9.893,0,0,0,49.5,29.88a8.788,8.788,0,0,0-3.456-3.348,14.826,14.826,0,0,0-4.716-1.548,69.437,69.437,0,0,0-9.666-.432H20.448v40.9H32a75.167,75.167,0,0,0,10.044-.468,16.364,16.364,0,0,0,5.148-1.6,9.449,9.449,0,0,0,3.942-3.852,11.727,11.727,0,0,0,1.386-5.778A10.476,10.476,0,0,0,50.076,46.458ZM30.816,33.606H33.21q4.158,0,5.58.936a3.584,3.584,0,0,1,1.422,3.24,3.322,3.322,0,0,1-1.53,3.132c-1.008.612-2.9.9-5.652.9H30.816V33.606Zm9.5,23.454c-1.1.666-2.97.99-5.6.99H30.816V49.14h4.068c2.7,0,4.572.342,5.562,1.026a4.064,4.064,0,0,1,1.512,3.6A3.357,3.357,0,0,1,40.3,57.078Z" fill="#fff" class="white"></path>
                            <path d="M64.368,55.1a5.184,5.184,0,1,0,5.184,5.184h0A5.184,5.184,0,0,0,64.368,55.1Z" fill="#fff" class="white"></path>
                            <rect x="59.868" y="24.552" width="9" height="27.274" fill="#fff" class="white"></rect>
                        </svg>
                </Link>
            </dd>
        </dl>
        </div>
    )
}

export default Sns

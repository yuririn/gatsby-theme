import React from "react"
import Img from "../../components/common/Img"
import Goo from "../../components/icon-and-logo/goo"
import Fearure from "./feature"
import History from "./history"
import Faq from "./faq"

const Profile = () => (
    <div>

        <Img source="common/camille-pic.jpg" className="prog-img" />

        <div className="l-container">
            <div className="prof-detail">
                <h3>かみーゆ（ビダンじゃないほう）/フロントエンドエンジニア</h3>
                <p>
                    広島生まれ広島育ちのIT戦士です。気が付いたらフロントエンドエンジニアになっていました。
                    <br />
                    さらに最近気が付いたのですが、いつの間にかフィリピン・セブ島に来て、しかもロックダウン（コミュニティ単位での隔離）に巻き込まれてます。人生っておもしろい。
                </p>
            </div>
        </div>
        <div className="bg-gray  l-container">
        <div className="sm-header">
            <h3 className="page-header"><Goo></Goo>こんなことできるよ</h3>
            <p className="u-center">得意、不得意は別としてできることをタグクラウド風にまとめておきます。</p>
        </div>
        <Fearure></Fearure>
        <div className="sm-header">
                <h3 className="page-header"><Goo></Goo>かみーゆの歩んできた道</h3>
        </div>
            <History></History>
            <div className="sm-header">
            <h3 className="page-header"><Goo></Goo>よくある質問</h3>
        </div>
            <Faq></Faq>
        </div>

    </div>
)

export default Profile

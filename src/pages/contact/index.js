import React, { useState } from "react";
import Layout from "../../components/layout";
import { Link} from "gatsby"
import BreadCrumbList from "../../components/common/BreadcrumbList";
import Form from "./form";
import Thanks from "./thanks";
import SideBar from "../../components/SideBar";
import Seo from "../../components/Seo/Seo";

const contactMeta = {
    title: 'お問い合わせ',
    description: 'お問い合わせに関するページです。'
}

const Contact = ({location}) => {
    const { title } = contactMeta
    const [submitted, setSubmitted] = useState(false);

    const handleFormSubmit = () => {
        setSubmitted(true);
    };
    const breadCrumbList = {
        current: title
    }

    return (
        <Layout location={location}>
            <div className="l-main_contents is-page">
                <header className="c-page-header" id="keyvisual">
                    <h1>{title}</h1>
                    <BreadCrumbList list={breadCrumbList} ></BreadCrumbList>
                </header>
                <div className="l-section l-container--page">
                    <section itemProp="articleBody" className="c-post-body">
                        <p>
                            銀ねこアトリエでは各種相談を受けつけております。
                            <br />
                            <br />
                            ウェブサイト作成・改修・機能追加ご希望の方で初めての方へ<em>30分の無料相談</em>を承っております。ご希望の方は、メッセージに希望日時候補を3つご記入ください。
                            <br />
                            <br />
                            銀ねこアトリエ・海外ノマドエンジニアのかみーゆについて知りたい方は先に
                            <Link to="/about/">About Me</Link>
                            をお読みいただいた方がスムーズです。
                        </p>
                        {!submitted ? (
                            <Form onFormSubmit={handleFormSubmit} />
                        ) : (
                            <Thanks />
                        )}
                    </section>
                    <SideBar></SideBar>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;

export const Head = ({ location }) => {
    const { title,  description } = contactMeta
    console.log(title)
    const list = [
        {
            name: title,
            path: location.pathname,
            type: `WebPage`
        }
    ]

    const pageData = {
        title: title,
        description: description,
        type: "WebPage",
        template: 'page',
        list: list
    }

    return (
        <Seo
            location={location}
            data={pageData}
        />
    )
}

import { useStaticQuery, graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Topic from "../svg/topic";

/**
 * Table of Contents (TOC) コンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.slug - 現在のページのスラッグ
 * @returns {JSX.Element} TOCコンポーネント
 */
const Toc = ({ slug }) => {
    // TOCの開閉状態を管理するためのステート
    const [isOpen, setIsOpen] = useState(false);

    /**
     * 現在の表示がモバイルデバイスかどうかをチェックする関数
     * @returns {boolean} モバイルデバイスの場合はtrue、それ以外はfalse
     */
    const isMobile = () => {
        return typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)").matches;
    }

    // 現在のスラッグに対応する目次データを取得
    const tocArray = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: { frontmatter: { pageType: { eq: "blog" } } }
            ) {
                edges {
                    node {
                        tableOfContents
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    useEffect(() => {
        /**
         * リンククリックイベントを処理する関数
         * モバイルデバイスの場合にTOCを閉じる
         * @param {Event} event - クリックイベント
         */
        
        const handleLinkClick = (event) => {
            if (isMobile()) {
                const link = event.target.closest('.c-toc a');
                if (!link) return;

                document.body.classList.remove("is-fixed");
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleLinkClick);

        /**
         * コンテンツ読み込み時にインターセクションオブザーバーを設定する関数
         */
        const handleContentLoaded = () => {
            if (isMobile()) return;

            const headings = document.querySelectorAll("article section h2, article section h3, article section h4");
            const options = {
                root: null,
                rootMargin: "0px 0px -50% 0px",
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const encodedslug = encodeURIComponent(entry.target.id);
                    const targetLink = document.querySelector(`.c-toc a[href="#${encodedslug}"]`);
                    if (!targetLink) return;

                    if (entry.isIntersecting) {
                        const activeLink = document.querySelector('.c-toc .active');
                        if (activeLink && activeLink !== targetLink) {
                            activeLink.classList.remove("active");
                        }

                        const firstHeadingLink = document.querySelector(`.c-toc a[href="#${encodeURIComponent(headings[0].id)}"]`);
                        if (firstHeadingLink && firstHeadingLink.classList.contains("active")) return;

                        targetLink.classList.add("active");
                        const parent = document.querySelector(".c-toc");
                        parent.scrollTop = targetLink.offsetTop - parent.offsetTop;
                    }
                });
            }, options);

            headings.forEach(heading => {
                observer.observe(heading);
            });

            return () => {
                headings.forEach(heading => {
                    observer.unobserve(heading);
                });
            };
        };

        handleContentLoaded();

        /**
         * ウィンドウリサイズ時にモバイルビューの変更を管理する関数
         */
        const handleResize = () => {
            
            if (document.body.classList.contains("is-fixed") && isMobile()) {
                document.body.classList.remove("is-fixed");
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (isMobile()) {
                document.removeEventListener('click', handleLinkClick);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [slug]); // 依存配列からisMobileを削除

    const tocElement = tocArray.allMarkdownRemark.edges.find(post => post.node.fields.slug === slug);

    /**
     * TOCの開閉状態をトグルする関数
     */
    const toggleControll = () => {
        if (isOpen) {
            document.querySelector('.c-nav__btn').removeAttribute('style');
            document.body.classList.remove("is-fixed");
        } else {
            document.querySelector('.c-nav__btn').setAttribute('style', 'display:none');
            document.body.classList.add("is-fixed");
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={isOpen && isMobile() ? "c-toc__wrapper is-open" : "c-toc__wrapper"}>
                <h2 className="c-heading__assluge">この記事のサマリー</h2>
                <div
                    className="c-toc"
                    dangerouslySetInnerHTML={{
                        __html: tocElement.node.tableOfContents
                    }}
                ></div>
            </div>
            <button type="button" aria-label="目次" className="c-btn--toc" onClick={toggleControll}><Topic /></button>
        </>
    );
};

export default Toc;

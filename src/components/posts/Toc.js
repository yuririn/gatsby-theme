import { useStaticQuery, graphql } from "gatsby";
import React, { useEffect } from "react";

const Toc = ({ id }) => {
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
        const options = {
            root: null,
            rootMargin: "0px 0px -50% 0px", // ウィンドウの下部から50%のマージン
            threshold: 0 // 要素が1ピクセルでも表示されたらコールバックを実行
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const encodedId = encodeURIComponent(entry.target.id);
                const targetLink = document.querySelector(`.c-toc a[href="#${encodedId}"]`);
                if (targetLink === null) return;

                if (entry.isIntersecting) {
                    // 他のアクティブなリンクを無効にする
                    const activeLink = document.querySelector('.c-toc .active');
                    if (activeLink && activeLink !== targetLink) {
                        activeLink.classList.remove("active");
                    }

                    // 最初の要素がアクティブな場合は、新たにアクティブクラスを付けない
                    const firstHeading = document.querySelector("h2, h3, h4");
                    const firstHeadingLink = document.querySelector(`.c-toc a[href="#${encodeURIComponent(firstHeading.id)}"]`);
                    if (firstHeadingLink && firstHeadingLink.classList.contains("active")) return;

                    // 手動でスクロール位置を調整
                    targetLink.classList.add("active");
                    const parent = document.querySelector(".c-toc");
                    parent.scrollTop = targetLink.offsetTop - parent.offsetTop;
                } else {
                    // この部分を削除し、アクティブクラスが消えないようにする
                    // targetLink.classList.remove("active");
                }
            });
        }, options);

        const headings = document.querySelectorAll("h2, h3, h4");
        headings.forEach(heading => {
            observer.observe(heading);
        });

        // Cleanup function to unobserve all entries
        return () => {
            headings.forEach(heading => {
                observer.unobserve(heading);
            });
        };
    }, []);

    const tocElement = tocArray.allMarkdownRemark.edges.filter(post => {
        if (post.node.fields.slug === id) return post.node.tableOfContents;
    })[0];

    return (
        <>
            <h2 className="c-heading__aside">目次</h2>
            <div
                className="c-toc"
                dangerouslySetInnerHTML={{
                    __html: tocElement.node.tableOfContents
                }}
            ></div>
        </>
    );
};

export default Toc;

import { useStaticQuery, graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Topic from "../svg/topic";

/**
 * Table of Contents (TOC) コンポーネント
 * * @param {string} slug - 表示中ページの識別子（entryXXXを含む文字列）
 */
const Toc = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 文字列から "entry+数字" の部分だけを抽出するユーティリティ
  const getEntryId = (str) => {
    if (!str) return null;
    const match = str.match(/entry\d+/);
    return match ? match[0] : null;
  };

  const isMobile = () => {
    return typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)").matches;
  };

  const data = useStaticQuery(graphql`
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

  // 1. 比較用のターゲットIDを取得 (例: entry563)
  const targetId = getEntryId(slug);

  // 2. データの照合 (GraphQL側のslugも同様にID抽出して比較)
  const tocElement = data.allMarkdownRemark.edges.find((post) => {
    return getEntryId(post.node.fields.slug) === targetId;
  });

  useEffect(() => {
    // 該当する目次データがない場合はイベント登録不要
    if (!tocElement) return;

    const handleLinkClick = (event) => {
      if (isMobile()) {
        const link = event.target.closest('.c-toc a');
        if (!link) return;

        const navBtn = document.querySelector('.c-nav__btn');
        if (navBtn) navBtn.removeAttribute('style');
        document.body.classList.remove("is-fixed");
        setIsOpen(false);
      }
    };

    const setupIntersectionObserver = () => {
      if (isMobile()) return null;

      const headings = document.querySelectorAll("article section h2, article section h3, article section h4");
      if (headings.length === 0) return null;

      const options = {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const encodedId = encodeURIComponent(entry.target.id);
            const targetLink = document.querySelector(`.c-toc a[href="#${encodedId}"]`);
            if (!targetLink) return;

            const activeLink = document.querySelector('.c-toc .active');
            if (activeLink) activeLink.classList.remove("active");

            targetLink.classList.add("active");

            const parent = document.querySelector(".c-toc");
            if (parent) {
              parent.scrollTop = targetLink.offsetTop - parent.offsetTop;
            }
          }
        });
      }, options);

      headings.forEach(heading => observer.observe(heading));
      return observer;
    };

    const handleResize = () => {
      if (document.body.classList.contains("is-fixed") && !isMobile()) {
        document.body.classList.remove("is-fixed");
        setIsOpen(false);
      }
    };

    // リスナー登録
    document.addEventListener('click', handleLinkClick);
    window.addEventListener('resize', handleResize);
    const observer = setupIntersectionObserver();

    // クリーンアップ
    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [slug, tocElement]);

  // 目次が見つからない、または中身が空の場合は何も表示しない
  if (!tocElement || !tocElement.node.tableOfContents) {
    return null;
  }

  const toggleControll = () => {
    const navBtn = document.querySelector('.c-nav__btn');
    if (isOpen) {
      if (navBtn) navBtn.removeAttribute('style');
      document.body.classList.remove("is-fixed");
    } else {
      if (navBtn) navBtn.setAttribute('style', 'display:none');
      document.body.classList.add("is-fixed");
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={isOpen && isMobile() ? "c-toc__wrapper is-open" : "c-toc__wrapper"}>
        <h2 className="c-heading__aside">この記事のサマリー</h2>
        <div
          className="c-toc"
          dangerouslySetInnerHTML={{
            __html: tocElement.node.tableOfContents
          }}
        ></div>
      </div>
      <button
        type="button"
        aria-label="目次"
        className="c-btn--toc"
        onClick={toggleControll}
      >
        <Topic />
      </button>
    </>
  );
};

export default Toc;

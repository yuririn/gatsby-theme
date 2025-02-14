import React, { useState, useEffect, useCallback } from "react";
import TextHighlighter from "./texthighlighter";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import SearchInput from "./SearchInput";
import DescriptionHighlighter from "./DescriptionHighlighter";
import Img from "../common/Img";

const SearchResult = (props) => {
    const tempData = useStaticQuery(graphql`
        query SearchData {
            allMarkdownRemark(
                sort: { frontmatter: { date: DESC } },
                 limit: 1000,
                 filter: { frontmatter: { pageType: { eq: "blog" } } }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        excerpt(pruneLength: 1000)
                        frontmatter {
                            date(formatString: "YYYY.MM.DD")
                            title
                            tags
                            cateId
                            description
                            hero
                            pageType
                        }
                    }
                }
            }
        }
    `);

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(tempData.allMarkdownRemark.edges.map((e) => e.node));
    }, [tempData.allMarkdownRemark.edges]);

    // 検索処理 //
    const [result, setResult] = useState([]);

    const search = useCallback(async () => {
        const value = props.value.toLowerCase();
        const temp = data.filter((e) => {
            let tags = "";
            let category = "";
            let description = "";
            if (e.frontmatter.tags) {
                tags = e.frontmatter.tags.join(" ").toLowerCase();
            }
            if (e.frontmatter.description) {
                description = e.frontmatter.description.toLowerCase();
            }
            if (e.frontmatter.category) {
                category = e.frontmatter.category.toLowerCase();
            }
            const target = `
                ${e.frontmatter.title.toLowerCase()}
                ${category}
                ${tags}
                ${description}
            `;
            return target.indexOf(value) !== -1;
        });
        setResult(temp);

        // 検索が始まったら、結果内のフォームにフォーカスを移す
        if (props.resultInputRef.current) {
            props.resultInputRef.current.focus();
        }
    }, [data, props.value, props.resultInputRef]);

    useEffect(() => {
        if (props.value !== "") {
            search();
        }
    }, [props.value, search]);

    // ResultInput の値が空の場合に SearchInput の値も空にする
    useEffect(() => {
        if (props.value === "") {
            props.setValue("");
        }
    }, [props.value]);

    // コンポーネントのマウント時とアンマウント時にクラスを追加・削除
    useEffect(() => {
        document.body.classList.add("is-fixed");

        return () => {
            document.body.classList.remove("is-fixed");
        };
    }, []);

    const handleBlur = () => {
        if (props.resultInputRef.current) {
            props.resultInputRef.current.focus();
        }
    };

    return (
        <div className="c-search__result">
            <div className="c-search__result__inner">
                <SearchInput
                    focus={props.focus}
                    setFocus={props.setFocus}
                    value={props.value}
                    setValue={props.setValue}
                    resultInputRef={props.resultInputRef}
                    getClass="c-search__input"
                    onBlur={handleBlur}
                />
                {result.length > 0 && (
                    <p>
                        <b>{result.length}</b>件ヒットしました
                    </p>
                )}
                <div>
                    <ul>
                        {result.map((e) => {
                            const tags = e.frontmatter.tags.join(", ")
                            return (<li key={e.fields.slug} className="c-search__item">
                                <Link to={`/blogs/${e.fields.slug}/`} className="c-search__item__img">
                                    <Img
                                        source={e.frontmatter.hero}
                                        alt={e.frontmatter.title}
                                        key={e.frontmatter.title}

                                    />
                                </Link>
                                <Link to={`/blogs/${e.fields.slug}/`} className="c-search__item__main">
                                    <h3><TextHighlighter
                                        str={e.frontmatter.title}
                                        includes={props.value}
                                    /></h3>
                                    <DescriptionHighlighter
                                        description={e.excerpt}
                                        searchTerm={props.value}
                                    />
                                    <dl><dt>Tags</dt>
                                        <dd>
                                            <TextHighlighter
                                                str={tags}
                                                includes={props.value}
                                            />
                                        </dd>
                                    </dl>
                                </Link>

                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="c-search__result__close" onClick={props.onClose}></div>
        </div>
    );
};

export default SearchResult;

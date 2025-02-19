import React, { useState, useEffect, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "../common/img";
import { Link } from "gatsby";
import TextHighlighter from "./text-highlighter";
import DescriptionHighlighter from "./description-highlighter";

const SearchResult = (props) => {
    const { value, children } = props;
    const searchValue = value.toLowerCase();
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
          query {
            allMarkdownRemark(
                limit: 1000,
                sort: { frontmatter: { modifiedDate: DESC } },
                filter: { frontmatter: { pageType: { eq: "blog" } } }
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  excerpt(pruneLength: 1000)
                  frontmatter {
                    hero
                    modifiedDate(formatString: "YYYY.MM.DD")
                    title
                    tags
                    cateId
                  }
                }
              }
            }
          }
        `
    );

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(allMarkdownRemark.edges.map((e) => e.node));
    }, [allMarkdownRemark.edges]);

    const [result, setResult] = useState([]);

    const search = useCallback(async () => {
        const searchValue = value.toLowerCase();

        if (searchValue === '') {
            setResult([]);
            return;
        }

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

            const title = e.frontmatter.title.toLowerCase();

            return (
                title.includes(searchValue) ||
                category.includes(searchValue) ||
                tags.includes(searchValue) ||
                description.includes(searchValue)
            );
        });

        setResult(temp);
    }, [data, value]);

    useEffect(() => {
        search();
    }, [value, search]);

    return (
        <div className="c-search__result">
            <div className="c-search__result__inner">
                {children}
                {result.length > 0 && (
                    <p>
                        <b>{result.length}</b>件ヒットしました
                    </p>
                )}
                {value === '' && (
                    <p>検索キーワードを入力してください。</p>
                )}
                <div>
                    <ul>
                        {result.map((e) => {
                            const tags = e.frontmatter.tags.join(", ");
                            return (
                                <li key={e.fields.slug} className="c-search__item">
                                    <Link to={`/blogs/${e.fields.slug}/`} className="c-search__item__img">
                                        <Img
                                            source={e.frontmatter.hero}
                                            alt={e.frontmatter.title}
                                            key={e.frontmatter.title}
                                            sizes={[150, 112, 30]}
                                        />
                                    </Link>
                                    <Link to={`/blogs/${e.fields.slug}/`} className="c-search__item__main">
                                        <h3><TextHighlighter
                                            str={e.frontmatter.title}
                                            includes={value}
                                        /></h3>
                                        <DescriptionHighlighter
                                            description={e.excerpt}
                                            searchTerm={value}
                                        />
                                    </Link>
                                    <dl>
                                        <dt>Tags</dt>
                                        <dd>
                                            <TextHighlighter
                                                str={tags}
                                                includes={value}
                                            />
                                        </dd>
                                    </dl>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="c-search__result__close"></div>
        </div>
    );
};

export default SearchResult;

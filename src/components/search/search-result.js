import React, { useState, useEffect, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";

const SearchResult = ( props ) => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
          query {
            allMarkdownRemark(
                sort: { frontmatter: { modifiedDate: DESC } },
              filter: { frontmatter: { pageType: { eq: "blog" } } }
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  id
                  frontmatter {
                    description
                    hero
                    modifiedDate(formatString: "YYYY.MM.DD")
                    title
                  }
                }
              }
            }
          }
        `
      )
    const [data, setData] = useState([]);

     useEffect(() => {
            setData(allMarkdownRemark.edges.map((e) => e.node));
    }, [allMarkdownRemark.edges]);

    return (
        <div className="c-search__result">
            <div className="c-search__result__inner">
                <div></div>
            </div>
            <div className="c-search__result__close"></div>
        </div>
    )
}
export default SearchResult;

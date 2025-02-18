import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import Img from "./img"

const PickUpPosts = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          pickup
          category {
            slug
            name
            enName
            description
            }
        }
      }
      allMarkdownRemark(filter: {frontmatter: {pageType: {eq: "blog"}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              cateId
              date(formatString: "YYYY.MM.DD")
              modifiedDate(formatString: "YYYY.MM.DD")
              hero
              description
              tags
            }
          }
        }
      }
    }
  `);

    const { pickup, category } = data.site.siteMetadata;
    
    const articles = data.allMarkdownRemark.edges.filter(edge =>
        pickup.includes(edge.node.fields.slug)
    );
    

    return (
            <ul className="l-card-container--pickup">
                {articles.map(({ node }) => {
                    const date = node.frontmatter.modifieddate ? node.frontmatter.modifieddate : node.frontmatter.date
                    const cate = category.filter(i => i.slug === node.frontmatter.cateId)[0]
                    return(
                    <li key={node.fields.slug}>
                            <article className="c-pickup-card">
                            <p className="c-pickup-card__sub-title"><span>{cate.enName}</span>{cate.name}</p>
                                <Link to={`/blogs/${node.fields.slug}`} className="c-pickup-card__img">
                                <Img
                                    source={node.frontmatter.hero}
                                    alt={node.frontmatter.title}
                                    key={node.frontmatter.title}
                                />
                                
                            </Link>
                            <div className="c-pickup-card__main">
                                    <Link to={`/blogs/${node.fields.slug}`}>
                                <time className="c-pickup-card__date">{date}</time>
                                <h3 className="c-pickup-card__heading">{node.frontmatter.title}</h3>
                                <p className="c-pickup-card__description">{node.frontmatter.description}</p>
                                </Link>
                                <ul className="c-card__tags">
                                        {node.frontmatter.tags.length > 0 && node.frontmatter.tags.map((item)=>{
                                                            return <li><Link to={`/blogs/tags/${item}`}>{item}</Link></li>
                                                        })}
                                                    </ul>
                            </div>
                        </article>
                    </li>
                )}
            )}
            </ul>
    );
};

export default PickUpPosts;

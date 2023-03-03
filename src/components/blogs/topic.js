import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Adsense from "../common/Ad"

const Toc = data => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents( maxDepth: 3)
            }
          }
        }
      }
    `
  )
  let tableOfContent = allMarkdownRemark.edges.filter(
    item => item.node.fields.slug === data.id
  )
  tableOfContent = tableOfContent[0].node.tableOfContents;
  tableOfContent = tableOfContent.replace(/(<p>|<\/p>)/gi, "")

  return (
    <>
    <Mokuji>
      <input type="checkbox" className="mokuji" id="mokuji" />
      <label className="c-content__heading" htmlFor="mokuji">
        目次
      </label>
      <div
        className="list"
        dangerouslySetInnerHTML={{
        __html: tableOfContent,
        }}
        ></div>
    </Mokuji>
    <Adsense type="display"></Adsense>
    </>
  )
}

export default Toc

const Mokuji = styled.div`
	padding: 20px;
    border-radius: 8px;
    background: var(--pale-gray);
    position: relative;
    overflow: hidden;
    margin-top: 24px;
    margin-bottom: 50px;
    .list{
        ul {
            counter-reset: cnt;
            margin-bottom: 0;
        }
        li {
            position: relative;
            padding-left: 20px;

            li {
                &:first-child {
                    margin-top: 5px;
                }
                padding-left: 40px;
                margin-bottom: 5px;
            }

            &::before {
                counter-increment: cnt;
                content: counters(cnt, " - ");
                transform: rotate(0);
                border: none;
                font-weight: bold;
                position: absolute;
                left: 0;
                top: 0;
                white-space: nowrap;
                color: var(--blue);
            }
        }
        a {
            color: var(--color-link);

            &:hover {
                text-decoration: none;
            }

        }
    }
	.mokuji {
		display: none;

		&:checked+.c-content__heading{
			&:after {
				transform: rotate(
				90deg
				);
			}
			& + * {
				max-height: 100px;
				position: relative;
				&::after {
					position: absolute;
					content: '';
					height: 2em;
					width: 100%;
					display: block;
					background: linear-gradient(to top,var(--pale-gray) 10%, rgba(238,238,238,0) 100% );
					bottom: 0;
					left: 0;
				}
			}
		}
		& +.c-content__heading {
		position: relative;
		display: block;
        margin-bottom: 5px;
        font-weight:bold;

		& + *{
			max-height: 200vh;
			transition: .3s;
			overflow: hidden;
			font-size: 1.4rem;
		}
		&:before {
			transition: .3s;
			position: absolute;
			content: "";
			width: 30px;
			height: 1px;
			top: 10px;
			right: 0;
			background: var(--color-link);
			display: block;
	}
	&:after {
		transform: rotate(
		0deg
		);
        transition: .3s;
        position: absolute;
        content: "";
        width: 30px;
        height: 1px;
        top: 10px;
        right: 0;
        background: var(--color-blue);
        display: block;
    }
}
`

import React from "react"
import styled from "styled-components"
import { Edit } from "./../../styles/blog-styles/edit"

const Toc = props => {
  let list = props.data.replace(/(<p>|<\/p>)/gi, "")

  return (
    <Mokuji>
      <input type="checkbox" className="mokuji" id="mokuji" />
      <label className="c-content__heading" htmlFor="mokuji">
        目次
      </label>
        <div
          dangerouslySetInnerHTML={{
            __html: list,
          }}
        ></div>
    </Mokuji>
  )
}

export default Toc

const Mokuji = styled.div`
	padding: 20px;
    border-radius: 8px;
    background: var(--pale-gray);
    position: relative;
    overflow: hidden;
		margin-bottom: 50px;
    ul {
      a {
        color: var(--color-link);
        &:hover {
          text-decoration: none;
        }
      }
      counter-reset: num;
      li {
        line-height:1.8;
        padding-left: 3em;
        position: relative;
        margin-bottom: 0.5em;
        &:first-child {
          margin-top: 0.5em;
        }

        &:before {
          counter-increment: num;
          content: counters(num, " - ");
          position: absolute;
          left: 0;
          text-align: center;
          width: 3em;
          padding: 0 5px;
          display: inline-block;
          font-weight: 700;
          color: var(--color-blue);
        }
         li {
           padding-left: 4em;
           &:before {
            width: 4em;
           }
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

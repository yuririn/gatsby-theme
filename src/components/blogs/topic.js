import React from "react"
import styled from "styled-components"
import { Edit } from "./../../styles/blog-styles/edit"

const Toc = props => {
  const list = props.data.replace(/(ul>)/gi, "ol>")

  return (
    <Mokuji>
      <input type="checkbox" className="mokuji" id="mokuji" />
      <label className="c-content__heading" for="mokuji">
        目次
      </label>
      <Edit>
        <div
          dangerouslySetInnerHTML={{
            __html: list,
          }}
        ></div>
      </Edit>
    </Mokuji>
  )
}

export default Toc

const Mokuji = styled.div`
	padding: 20px;
    border-radius: 8px;
    background: #eee;
    position: relative;
    overflow: hidden;
		margin-bottom: 50px;
	.mokuji {
		display: none;
		&:checked+.c-content__heading{
			&:after {
				transform: rotate(
				90deg
				);
			}
			&+ div {
				max-height: 100px;
				position: relative;
				&::after {
					position: absolute;
					content: '';
					height: 2em;
					width: 100%;
					display: block;
					background: linear-gradient(to top,#eee 10%, rgba(238,238,238,0) 100% );
					bottom: 0;
					left: 0;
				}
			}
		}
		& +.c-content__heading {
		position: relative;
		display: block;
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
			background: #464675;
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
    background: #464675;
    display: block;
}
}
`

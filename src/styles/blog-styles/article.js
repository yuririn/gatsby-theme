import styled from 'styled-components';

export const Article = styled.div`
  @media screen and (min-width: 768px){
	  width: calc(100% - 200px);
	  padding:  0 50px  0 30px;
  }
  @media screen and (min-width: 1020px){
	  width: calc(100% - 300px);
  }
  .l-container {
	@media screen and (min-width: 768px) {
		padding-left: 0;
		padding-right: 0;
	}

}
 .c-article{


   	&__heading {
		font-size: 2.4rem;
		font-weight: 700;
		margin-bottom: 10px;
		color: var( --color-d-blue);
		line-height: 1.4;

		@media screen and (min-width: 768px) {
			font-size: 2.8rem;
			margin-bottom: 30px;
		}
	}

	&__date {
		margin-bottom: 20px;
		dt, dd {
			font-weight: 700;
			display: inline-block;
		}
		dd {
			margin-left: 10px;
		}
	}
	&__tags {
		padding-top: 15px;
		display: flex;
		flex-wrap: wrap;
		 dt {
			text-align: left;
			width: 100px;
			font-weight: bold;
			margin-bottom: 30px;
		}
		dd {
				width: calc(100% - 100px);
			}

			.cate a {
				border: none;
				font-size: 1.5rem;
				font-weight: 700;
				line-height: 1;
				padding: 3px 15px;
				color: #fff;
				display: inline-block;
				border-radius: 4px;
				border: 1px solid var(--color-blue);
				background: var(--color-blue);
				transition: .3s;
				text-decoration: none;
			}
	}

	&__ganre {
		margin-bottom: 30px;

		a {
			font-weight: 700;
			border: 1px solid var(--color-blue);
			color: var(--color-blue);
			padding: 3px 10px;
			border-radius: 3px;
			font-size: 1.4rem;
			text-decoration: none;

			& ~  a {
				margin-left: 5px;
			}
		}
	}

	&__description {
		line-height: 2;
		margin-bottom: 30px;
	}
 }
 .c-snsBtns {
	margin-bottom: 24px;
	text-align: center;
	margin-bottom: 50px;

	&__item {
		line-height: 1;
		display: inline-block;
		& ~ .c-snsBtns__item {
			margin-left: 10px;
		}
		a {
			font-weight: 700;
			font-size: 1.2rem;
			color: #fff;
			text-align: center;
			border-radius: 5px;
			padding: 10px;
			text-decoration: none;
		}

		&--fb {
			border: 1px solid #3b5998;
			background: #3b5998;
			transition: .3s;

			@media screen and (min-width: 768px) {
				&:hover {
					background: #fff;
					color: #3b5998;
				}
			}

		}
		&--tw {
			border: 1px solid #04a0f6;
			background: #04a0f6;
			transition: .3s;

			@media screen and (min-width: 768px) {
				&:hover {
					background: #fff;
					color: #04a0f6;
				}
			}
		}

		&--hateb {
			border: 1px solid #008fde;
			background: #008fde;
			transition: .3s;

			@media screen and (min-width: 768px) {
				&:hover {
					background: #fff;
					color: #008fde;
				}
			}
		}
		&--pocket {
			border: 1px solid #ee4056;
			background: #ee4056;
			transition: .3s;

			@media screen and (min-width: 768px) {
				&:hover {
					background: #fff;
					color: #ee4056;
				}
			}
		}
	}
}
.profile {
    margin-top: 30px;
    border: 6px solid #eee;
    padding: 15px;
    position: relative;
    border-radius: 15px;
    margin-bottom: 30px;
	.title {
		position: absolute;
		background: #fff;
		top: -15px;
		padding: 0 15px;
		left: 50%;
		white-space: nowrap;
		font-weight: 700;
		transform: translateX(-50%);
	}
	.prof__img__sm {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		float: left;
		margin-right: 30px;
		overflow: hidden;
	}

	.name {
		margin: 10px 0 15px;
		font-weight: 700;
	}
	.sns a {
		margin: 0 15px 10px 0;
		display: inline-block;
		color: var(--color-blue);
	}
	.message {
		line-height: 1.6;
		font-size: .9em;
	}
	.seemore {
		margin-top: 10px;
		text-align: right;
		a {
			text-decoration: none;
			color: var(--color-link);
			&:hover {
				transform: translateX(5px);
			}
			letter-spacing: .2em;
				transition: .3s;
				font-size: .9em;
				display: inline-block;
				&:after {
					font-size: 1.4rem;
					content: ">";
				}
			}
		}
	}

.c-pager--article {
    padding-top: 30px;
    position: relative;
    margin-bottom: 100px;
	list-style: none;
	.c-pager--article__next {
		text-align: right;
	}
	@media screen and (min-width: 768px){
		.c-pager--article__next, .c-pager--article__prev {
			position: absolute;
			width: 45%;
			top: 0;
		}
		.c-pager--article__prev {
			left: 0;
			a {
				transition: .5s;
				&:before {
					transition: .5s;
				}
			}
		}
		.c-pager--article__next {
			right: 0;
			a {

				transition: .5s;
				&:before {
					transition: .5s;
				}
			}
		}

		.c-pager--article__next a:hover, .c-pager--article__prev a:hover {
			color: var(--color-blue);
			transition: .5s;
		}

		.c-pager--article__prev a:hover:before {
			left: -120%;
		}
		.c-pager--article__next a:hover:before {
			right: -120%;
		}
	}

	&__prev a:before {
		z-index: -1;
		left: 0;
		position: absolute;
		content: "";
		top: 0;
		width: 120%;
		height: 100%;
		display: block;
		background:var(--color-blue);
		transform: skew(
	-45deg
	);
	}
	&__next a:before {
		z-index: -1;
		right: 0;
		position: absolute;
		content: "";
		top: 0;
		width: 120%;
		height: 100%;
		display: block;
		background:var(--color-blue);
		transform: skew(
	45deg
	);
	}
	a {
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		z-index: 1;
		border-radius: 5px;
		background: #fff;
		border: 1px solid var(--color-blue);
		padding: 15px 20px;
		display: block;
		color: #fff;
	}

	.c-pager--article__next, .c-pager--article__prev {
		margin-bottom: 15px;
	};
}
`

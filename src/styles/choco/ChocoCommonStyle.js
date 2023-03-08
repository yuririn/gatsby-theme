import { createGlobalStyle } from "styled-components"

export const ChocoCommonStyle = createGlobalStyle`
body {
	--color: #2e2e2e;
	--color-deep: #0796ba;
	--light-color: #fff;
	--color-sec: #4989b9;
	--color-accent: #4bc180;
}

main {
	display: block;
	padding-bottom: 1px;
	background: #f5f5f5;
}

body {
	font-weight: 400;
	font-size: 1.4rem;
	color: var(--color);
	background: #f5f5f5;
}

img {
	max-width: 100%;
	height: auto;
	vertical-align: bottom;
}

@media screen and (min-width: 768px) {

body {
	font-size: 1.6rem;
}

}


`

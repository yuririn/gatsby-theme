import styled from "styled-components";

export const ChocoHeader = styled.header`
.l-header {
	text-align: center;
	background: #4b3933;
	background-image: repeating-linear-gradient(-45deg, #4f4040, #4f4040 1px, transparent 2px, transparent 5px);
	padding: 24px;
}

.l-header h1 {
	margin: 0;
	font-size: 20px;
	color: #fff;
}

.l-header h1 a {
	color: #fff;
}

.l-header ul {
	margin-top: 30px;
	display: flex;
	justify-content: center;
	gap: 24px;
}

.l-header ul li {
	font-weight: bold;
	font-size: 18px;
}

.l-header a {
	text-decoration: none;
	color: #fff;
}


`
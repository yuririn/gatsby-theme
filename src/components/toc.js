import React from "react";

const Toc = props => {
	const list = props.data.replace(/(ul>)/gi, 'ol>');
	return (
		<div class="p-box--gray u-mblg">
			<h2 className="c-content__heading">この記事のざっくりとした内容</h2>
			<div className="c-editArea">
				<div
					dangerouslySetInnerHTML={{
						__html: list,
					}}
				>
				</div>
			</div>
		</div>
	);
};

export default Toc;

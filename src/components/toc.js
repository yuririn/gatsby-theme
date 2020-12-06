import React from "react";

const Toc = props => {
	return (
		<div class="p-box--gray u-mblg">
			<h2 className="c-content__heading">この記事のざっくりとした内容</h2>
			<div className="c-editArea">
				<div
					dangerouslySetInnerHTML={{
						__html: props.data,
					}}
				>
				</div>
			</div>
		</div>
	);
};

export default Toc;

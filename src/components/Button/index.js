import React from "react";

import "./index.scss";

export default props => {
	const onClickHandler = event => {
		props.onClick();
	};

	return (
		<button
			className={`button pointer ${props.className}`}
			onClick={onClickHandler}
		>
			{props.children}
		</button>
	);
};

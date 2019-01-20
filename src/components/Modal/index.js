import React, { Component } from "react";

import "./index.scss";

export default class Modal extends Component {
	render() {
		const {
			children,
			isOpen,
			closeOnClick,
			hasCloseButton,
			className
		} = this.props;

		if (!isOpen) {
			return null;
		}

		return (
			<div className={`modal-background ${className}`}>
				<div className="modal">
					{hasCloseButton && (
						<div
							className="close-button-wrapper pointer"
							onClick={closeOnClick}
						>
							<i className="fas fa-times-circle" />
							<div className="background-overlay" />
						</div>
					)}
					{children}
				</div>
			</div>
		);
	}
}

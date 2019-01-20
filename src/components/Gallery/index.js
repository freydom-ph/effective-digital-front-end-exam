import React from "react";
import { isEqual } from "lodash/lang";

import "./index.scss";

export default class Gallery extends React.Component {
	constructor() {
		super();

		this.state = {
			minLeft: 0,
			counter: 0,
			currentPosition: 0
		};

		this.thumbnailOnClickHandler = this.thumbnailOnClickHandler.bind(this);
		this.renderGallery = this.renderGallery.bind(this);
		this.rightArrowOnClickHandler = this.rightArrowOnClickHandler.bind(
			this
		);
		this.leftArrowOnClickHandler = this.leftArrowOnClickHandler.bind(this);
		this.animate = this.animate.bind(this);
		this.updateCurrentPosition = this.updateCurrentPosition.bind(this);
	}

	componentDidMount() {
		const galleryImageElement = document.querySelector(
			"div.gallery-images"
		);

		this.galleryImageElement = galleryImageElement;
	}

	componentDidUpdate(prevProps) {
		const {
			getLeftStyleValue,
			animate,
			props: { type },
			state: { maxRight }
		} = this;

		const imageGallery = document.querySelector("div.gallery-images");
		if (!isEqual(prevProps, this.props) && !maxRight) {
			// I could use ref here but since I only need one, I'll just use the vanilla JS querySelctor
			let imageWrapper = document.querySelector(".gallery-item");

			if (imageWrapper) {
				const styles = window.getComputedStyle(imageWrapper);
				this.imageWrapperWidth =
					(imageWrapper.offsetWidth +
						parseFloat(styles.marginLeft) +
						parseFloat(styles.marginRight) +
						parseFloat(styles.paddingLeft) +
						parseFloat(styles.paddingRight)) *
					3;
			}

			// This code will ensure that we have the real width of the image wrapper which will be used in
			// computing for the slide animation
			this.setState({
				maxRight:
					imageGallery &&
					Math.floor(
						imageGallery.offsetWidth / this.imageWrapperWidth
					)
			});
		}

		if (!isEqual(prevProps.type, type)) {
			const left = getLeftStyleValue(imageGallery);

			this.setState({
				finalPosition: 0,
				currentPosition: Number(left),
				counter: 0,
				leftId: setInterval(animate("left"), 10)
			});
		}
	}

	thumbnailOnClickHandler(data) {
		return event => {
			this.props.imageOnClick(data);
		};
	}

	rightArrowOnClickHandler() {
		let {
			galleryImageElement,
			imageWrapperWidth,
			getLeftStyleValue,
			state: { counter, maxRight, rightId }
		} = this;

		if (counter < maxRight && !rightId) {
			const left = getLeftStyleValue(galleryImageElement);

			this.setState({
				counter: ++counter,
				rightId: setInterval(this.animate("right"), 10),
				currentPosition: Number(left),
				finalPosition: Number(left) - imageWrapperWidth
			});
		}
	}

	getLeftStyleValue(galleryImageElement) {
		return galleryImageElement.style.left.replace("px", "");
	}

	animate(type) {
		return () => {
			let {
				galleryImageElement,
				state: { rightId, leftId, currentPosition, finalPosition }
			} = this;

			galleryImageElement.style.left = `${currentPosition}px`;

			if (currentPosition === finalPosition) {
				this.setState({
					rightId: rightId ? clearInterval(rightId) : rightId,
					leftId: leftId ? clearInterval(leftId) : leftId
				});
			}

			this.updateCurrentPosition(type);
		};
	}

	updateCurrentPosition(type) {
		const {
			imageWrapperWidth,
			state: { currentPosition }
		} = this;

		// 16 is a magic number which gives us the value of 14.5
		// So 10ms the position will move 14.5 to the left
		let position = currentPosition;
		if (type === "right") {
			position -= imageWrapperWidth / 16;
		} else if (type === "left") {
			position += imageWrapperWidth / 16;
		}

		this.setState({ currentPosition: position });
	}

	leftArrowOnClickHandler() {
		let {
			imageWrapperWidth,
			getLeftStyleValue,
			galleryImageElement,
			state: { counter, minLeft, leftId }
		} = this;

		if (counter > minLeft && !leftId) {
			const left = getLeftStyleValue(galleryImageElement);

			this.setState({
				counter: --counter,
				leftId: setInterval(this.animate("left"), 10),
				finalPosition: Number(left) + imageWrapperWidth,
				currentPosition: Number(left)
			});
		}
	}

	renderGallery() {
		const { list, type } = this.props;

		return list.map((item, index) => {
			return (
				<div
					key={`gallery-${type}-${index}`}
					className="gallery-item pointer"
				>
					<img
						alt={item.Title}
						title={item.Title}
						src={item.ImageURLs.FullSize}
						onClick={this.thumbnailOnClickHandler(item)}
					/>
					<span>{item.Title}</span>
				</div>
			);
		});
	}

	render() {
		const {
			state: { counter, minLeft, maxRight }
		} = this;

		return (
			<div
				className={`gallery ${
					counter > minLeft ? "gallery-left" : ""
				} ${counter < maxRight ? "gallery-right" : ""}`}
			>
				<div className="gallery-images" style={{ left: "0px" }}>
					{this.renderGallery()}
				</div>
				<div className="controls">
					<div className="left-arrow-wrapper arrow-wrapper">
						<i
							className="fas fa-chevron-circle-left arrow pointer"
							onClick={this.leftArrowOnClickHandler}
						/>
					</div>
					<div className="right-arrow-wrapper arrow-wrapper">
						<i
							className="fas fa-chevron-circle-right arrow pointer"
							onClick={this.rightArrowOnClickHandler}
						/>
					</div>
				</div>
			</div>
		);
	}
}

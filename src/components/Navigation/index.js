import React, { Component } from "react";
import { connect } from "react-redux";

import { getAnimals, getFruitsAndVegetables } from "../../redux/actions/data";

import Button from "../Button/";

import "./index.scss";

class Navigation extends Component {
	render() {
		const {
			props: { getAnimals, getFruitsAndVegetables }
		} = this;
		return (
			<div className="navigation">
				<Button className="nav-button" onClick={getAnimals}>
					Animals
				</Button>
				<Button className="nav-button" onClick={getFruitsAndVegetables}>
					Fruits n' Veggies
				</Button>
			</div>
		);
	}
}

const mapDispatchToProps = {
	getAnimals,
	getFruitsAndVegetables
};

export default connect(
	null,
	mapDispatchToProps
)(Navigation);

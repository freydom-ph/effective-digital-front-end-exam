import axios from "axios";

import { toggleSpinner } from "./modal";

export const FETCH_FRUITS_AND_VEGETABLES = "FETCH_FRUITS_AND_VEGETABLES";
export const SAVE_FRUITS_AND_VEGETABLES = "SAVE_FRUITS_AND_VEGETABLES";

export const FETCH_ANIMALS = "FETCH_ANIMALS";
export const SAVE_ANIMALS = "SAVE_ANIMALS";

export const SET_TABLE_TYPE = "SET_TABLE_TYPE";

const fetchFruitsAndVegetables = () => {
	return axios.get(
		"http://styleguide.effectivedigital.com/interview/api/fruitveg"
	);
};

export const getFruitsAndVegetables = () => {
	return dispatch => {
		dispatch(toggleSpinner());
		fetchFruitsAndVegetables().then(response => {
			dispatch(saveFruitsAndVegetables(response.data));
			dispatch(setTableType("Fruits and Vegetables"));
			dispatch(toggleSpinner());
		});
	};
};

const saveAnimals = data => ({
	type: SAVE_FRUITS_AND_VEGETABLES,
	data
});

const fetchAnimals = () => {
	return axios.get(
		"http://styleguide.effectivedigital.com/interview/api/animals"
	);
};

export const getAnimals = () => {
	return dispatch => {
		dispatch(toggleSpinner());
		fetchAnimals().then(response => {
			dispatch(saveAnimals(response.data));
			dispatch(setTableType("Animals"));
			dispatch(toggleSpinner());
		});
	};
};

const saveFruitsAndVegetables = data => ({
	type: SAVE_FRUITS_AND_VEGETABLES,
	data
});

export const setTableType = type => ({
	type: SET_TABLE_TYPE,
	data: type
});

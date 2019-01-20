import {
	SAVE_ANIMALS,
	SAVE_FRUITS_AND_VEGETABLES,
	SET_TABLE_TYPE
} from "../actions/data";

const defaultState = {
	list: [],
	tableType: "Animals"
};

export default (state = defaultState, action) => {
	const { type, data } = action;

	switch (type) {
		case SAVE_ANIMALS: {
			return {
				...state,
				list: [...data]
			};
		}
		case SAVE_FRUITS_AND_VEGETABLES: {
			return {
				...state,
				list: [...data]
			};
		}
		case SET_TABLE_TYPE: {
			return {
				...state,
				tableType: data
			};
		}
		default: {
			return state;
		}
	}
};

import { TOGGLE_MODAL, SET_MODAL_DATA, TOGGLE_SPINNER } from "../actions/modal";

const defaultState = {
	isOpen: false,
	modalData: {}
};

export default (state = defaultState, action) => {
	const { type, data } = action;

	switch (type) {
		case SET_MODAL_DATA: {
			return {
				...state,
				modalData: data
			};
		}
		case TOGGLE_MODAL: {
			return {
				...state,
				isOpen: !state.isOpen
			};
		}
		case TOGGLE_SPINNER: {
			return {
				...state,
				showSpinner: !state.showSpinner
			};
		}
		default: {
			return state;
		}
	}
};

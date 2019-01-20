export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const TOGGLE_SPINNER = "TOGGLE_SPINNER";
export const SET_MODAL_DATA = "SET_MODAL_DATA";

export const toggleModal = override => {
	return {
		type: TOGGLE_MODAL,
		data: override
	};
};

export const toggleSpinner = override => {
	return {
		type: TOGGLE_SPINNER,
		data: override
	};
};

export const setModalData = data => {
	return {
		type: SET_MODAL_DATA,
		data
	};
};

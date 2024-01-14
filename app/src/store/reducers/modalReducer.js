import { mainTypes } from "../actions/actionTypes";

const initialState = {
	isModalOpen: false,
	modalIndex: null,
	modalAction: null,
};

export function modalReducer(state = initialState, action) {
	switch (action.type) {
		case mainTypes.CHANGE_MODAL_INDEX: {
			const index = action.payload;
			return { ...state, modalIndex: index, isModalOpen: true };
		}
		case mainTypes.CHANGE_MODAL_VISIBILITY: {
			const boolean = action.payload;
			return { ...state, isModalOpen: boolean };
		}
		case mainTypes.CHANGE_MODAL_ACTION: {
			const actionType = action.payload;
			return { ...state, modalAction: actionType };
		}
		default: {
			return state;
		}
	}
}

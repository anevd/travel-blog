import { mainTypes } from "../actions/actionTypes";

const initialState = {
	cuisines: [],
};

export function cuisinesReducer(state = initialState, action) {
	switch (action.type) {
		case mainTypes.GET_CUISINES: {
			const cuisines = action.payload;
			return { ...state, cuisines };
		}
		default: {
			return state;
		}
	}
}

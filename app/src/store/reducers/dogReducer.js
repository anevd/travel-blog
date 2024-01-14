import { mainTypes } from "../actions/actionTypes";

const initialState = {
	dog: {},
};

export function dogReducer(state = initialState, action) {
	switch (action.type) {
		case mainTypes.GET_DOG: {
			const dog = action.payload;
			return { ...state, dog: dog };
		}
		default: {
			return state;
		}
	}
}

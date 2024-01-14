import { mainTypes } from "../actions/actionTypes";

const initialState = {
	points: [],
};

export function mapReducer(state = initialState, action) {
	switch (action.type) {
		case mainTypes.GET_POINTS: {
			const points = action.payload;
			return { ...state, points };
		}
		default: {
			return state;
		}
	}
}

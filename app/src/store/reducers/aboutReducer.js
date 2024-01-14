import { mainTypes } from "../actions/actionTypes";

const initialState = {
	helloData: {},
	carouselData: [],
};

export function aboutReducer(state = initialState, action) {
	switch (action.type) {
		case mainTypes.GET_ABOUT_DATA: {
			const data = action.payload;
			return { ...state, helloData: data };
		}
		case mainTypes.GET_CAROUSEL_DATA: {
			const data = action.payload;
			return { ...state, carouselData: data };
		}
		default: {
			return state;
		}
	}
}
